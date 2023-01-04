package io.vertigo.vega.engines.webservice.json.records;

import java.lang.reflect.GenericArrayType;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import java.lang.reflect.WildcardType;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.StringJoiner;
import java.util.function.Function;

import com.google.gson.reflect.TypeToken;

/**
 * Internal helper class for resolving record component types.
 */
class ComponentTypeHelper {
	private ComponentTypeHelper() {
	}

	private static Type getUltimateTypeVariableBound(final TypeVariable<?> typeVariable) {
		Type current = typeVariable;
		while (current instanceof final TypeVariable<?> typeVar) {
			current = typeVar.getBounds()[0];
		}
		return current;
	}

	// This implementation matches how the Java Language Specification defines "Type Erasure"
	// And additionally also covers WildcardType
	private static Class<?> getRawType(final Type type) {
		if (type instanceof final Class<?> c) {
			return c;
		} else if (type instanceof final GenericArrayType arrayType) {
			return getRawType(arrayType.getGenericComponentType()).arrayType();
		} else if (type instanceof final ParameterizedType parameterizedType) {
			// cast should be safe, see https://bugs.openjdk.java.net/browse/JDK-8250659
			return (Class<?>) parameterizedType.getRawType();
		} else if (type instanceof final TypeVariable<?> typeVariable) {
			return getRawType(getUltimateTypeVariableBound(typeVariable));
		} else if (type instanceof final WildcardType wildcard) {
			return getRawType(wildcard.getUpperBounds()[0]);
		}
		throw new AssertionError("Unexpected type instance " + type + " of class " + type.getClass().getName());
	}

	/**
	 * Resolves {@code type}, replacing all type variables in {@code toResolve} with their
	 * first upper bound, and tracking recursion using {@code visited}.
	 */
	private static Type resolveTypeVariables(final Type type, final Function<TypeVariable<?>, Type> resolver) {
		if (type instanceof Class) {
			return type;
		} else if (type instanceof final GenericArrayType arrayType) {
			final Type originalComponentType = arrayType.getGenericComponentType();
			final Type newComponentType = resolveTypeVariables(originalComponentType, resolver);
			if (originalComponentType.equals(newComponentType)) {
				return arrayType;
			} else {
				return new GenericArrayTypeImpl(newComponentType);
			}
		} else if (type instanceof final ParameterizedType parameterizedType) {
			final Type originalRawType = parameterizedType.getRawType();
			final Type newRawType = resolveTypeVariables(originalRawType, resolver);
			final Type originalOwnerType = parameterizedType.getOwnerType();
			final Type newOwnerType = originalOwnerType == null ? null : resolveTypeVariables(originalOwnerType, resolver);
			final Type[] originalTypeArguments = parameterizedType.getActualTypeArguments();
			final Type[] newTypeArguments = new Type[originalTypeArguments.length];
			for (int i = 0; i < originalTypeArguments.length; i++) {
				newTypeArguments[i] = resolveTypeVariables(originalTypeArguments[i], resolver);
			}

			if (originalRawType.equals(newRawType) && Objects.equals(originalOwnerType, newOwnerType) && Arrays.equals(originalTypeArguments, newTypeArguments)) {
				return parameterizedType;
			} else {
				return new ParameterizedTypeImpl(newRawType, newOwnerType, newTypeArguments);
			}
		} else if (type instanceof final WildcardType wildcardType) {
			final Type[] originalLowerBounds = wildcardType.getLowerBounds();
			final Type[] newLowerBounds = new Type[originalLowerBounds.length];
			final Type[] originalUpperBounds = wildcardType.getUpperBounds();
			final Type[] newUpperBounds = new Type[originalUpperBounds.length];

			for (int i = 0; i < originalLowerBounds.length; i++) {
				newLowerBounds[i] = resolveTypeVariables(originalLowerBounds[i], resolver);
			}
			for (int i = 0; i < originalUpperBounds.length; i++) {
				newUpperBounds[i] = resolveTypeVariables(originalUpperBounds[i], resolver);
			}

			if (Arrays.equals(originalLowerBounds, newLowerBounds) && Arrays.equals(originalUpperBounds, newUpperBounds)) {
				return wildcardType;
			} else {
				return new WildcardTypeImpl(newLowerBounds, newUpperBounds);
			}
		} else if (type instanceof final TypeVariable<?> typeVariable) {
			return resolver.apply(typeVariable);
		}
		throw new AssertionError("Unexpected type instance " + type + " of class " + type.getClass().getName());
	}

	/**
	 * Resolves a type variable without any context information. Any other referenced
	 * type variables are resolved recursively by calling this method.
	 */
	private static Type resolveTypeVariableRaw(final TypeVariable<?> toResolve) {
		final Function<TypeVariable<?>, Type> resolver = new Function<>() {
			private final Set<TypeVariable<?>> visited = new HashSet<>();

			@Override
			public Type apply(final TypeVariable<?> paramToResolve) {
				final Type bound = getUltimateTypeVariableBound(paramToResolve);
				if (visited.add(paramToResolve)) {
					return resolveTypeVariables(bound, this);
				} else {
					// In case of cyclic recursion use erasure of bound
					return getRawType(bound);
				}
			}
		};
		return resolveTypeVariables(toResolve, resolver);
	}

	private static Map<TypeVariable<?>, Type> getResolvedTypeArguments(final TypeVariable<?>[] typeVariables, final Type type) {
		final Map<TypeVariable<?>, Type> resolvedTypeArguments = new HashMap<>();
		if (type instanceof Class) {
			for (final TypeVariable<?> typeVariable : typeVariables) {
				resolvedTypeArguments.put(typeVariable, resolveTypeVariableRaw(typeVariable));
			}
			return resolvedTypeArguments;
		} else if (type instanceof final ParameterizedType parameterizedType) {
			final Type[] typeArguments = parameterizedType.getActualTypeArguments();
			// Type variables for which a wildcard without upper bound was used as type argument
			final Set<TypeVariable<?>> wildcardsToResolve = new LinkedHashSet<>();
			for (int i = 0; i < typeArguments.length; i++) {
				final Type typeArgument = typeArguments[i];
				final TypeVariable<?> typeVariable = typeVariables[i];
				if (typeArgument instanceof final WildcardType wildcardType) {
					// Trust the upper bound (even though it could be 'illogical', see https://bugs.openjdk.java.net/browse/JDK-8250936)
					final Type upperBound = wildcardType.getUpperBounds()[0];
					if (upperBound != Object.class) {
						// TODO Is resolving unrelated type variables desired (affects behavior of Gson's TypeAdapterRuntimeTypeWrapper)?; at least document it then
						resolvedTypeArguments.put(typeVariable, resolveTypeVariables(upperBound, toResolve -> {
							// In case context captured type variable (which is not related to type variables
							// which are currently resolved!), resolve it as if the declaring type was raw
							return resolveTypeVariableRaw(toResolve);
						}));
					} else {
						wildcardsToResolve.add(typeVariable);
					}
				} else {
					// TODO Is resolving unrelated type variables desired (affects behavior of Gson's TypeAdapterRuntimeTypeWrapper)?; at least document it then
					resolvedTypeArguments.put(typeVariable, resolveTypeVariables(typeArgument, toResolve -> {
						// In case context captured type variable (which is not related to type variables
						// which are currently resolved!), resolve it as if the declaring type was raw
						return resolveTypeVariableRaw(toResolve);
					}));
				}
			}

			// Resolve wildcards without bounds by using bounds of respective type variables
			final Function<TypeVariable<?>, Type> wildcardResolver = new Function<>() {
				@Override
				public Type apply(final TypeVariable<?> toResolve) {
					if (resolvedTypeArguments.containsKey(toResolve)) {
						final Type resolved = resolvedTypeArguments.get(toResolve);
						if (resolved == null) {
							// In case of cyclic recursion use erasure of bound
							return getRawType(toResolve);
						} else {
							return resolved;
						}
					} else {
						// If not resolved yet, argument was wildcard, so resolve using bound of type variable
						// Put null to indicate that variable is currently being resolved, tracking recursion
						resolvedTypeArguments.put(toResolve, null);
						final Type bound = toResolve.getBounds()[0];
						final Type resolved = resolveTypeVariables(bound, this);
						resolvedTypeArguments.put(toResolve, resolved);
						return resolved;
					}
				}
			};
			for (final TypeVariable<?> typeVariable : wildcardsToResolve) {
				// Check if dependent type variable with wildcard argument has already resolved it
				if (!resolvedTypeArguments.containsKey(typeVariable)) {
					// Ignore result, resolver puts entries into resolvedTypeArguments
					wildcardResolver.apply(typeVariable);
				}
			}
			return resolvedTypeArguments;
		}
		throw new AssertionError("Unexpected type instance " + type + " of class " + type.getClass().getName());
	}

	// The logic here does not need to be as extensive as the one of Gson's ReflectiveTypeAdapterFactory or as
	// proposed by https://github.com/google/gson/pull/1952 because records cannot have superclasses and are
	// implicitly static and therefore cannot capture type variables from the enclosing method or type
	public static Type[] resolveComponentTypes(final TypeToken<?> recordContext, final Type[] componentTypes) {
		final TypeVariable<?>[] typeVariables = recordContext.getRawType().getTypeParameters();
		// For non-generic types there is nothing to resolve because records are static and cannot
		// capture type variables form the enclosing method or type
		if (typeVariables.length == 0) {
			return componentTypes;
		}

		Type recordContextType = recordContext.getType();
		if (recordContextType instanceof final WildcardType wildcard) {
			recordContextType = wildcard.getUpperBounds()[0];
		}
		// No `else if`; acts as fall-through when bound of wildcard is type variable
		if (recordContextType instanceof final TypeVariable<?> typeVariable) {
			recordContextType = getUltimateTypeVariableBound(typeVariable);
		}

		final Map<TypeVariable<?>, Type> typeArguments = getResolvedTypeArguments(typeVariables, recordContextType);
		final Type[] resolvedComponentTypes = new Type[componentTypes.length];
		for (int i = 0; i < resolvedComponentTypes.length; i++) {
			resolvedComponentTypes[i] = resolveTypeVariables(componentTypes[i], typeArguments::get);
		}
		return resolvedComponentTypes;
	}

	// Package-private for testing
	static class GenericArrayTypeImpl implements GenericArrayType {
		private final Type componentType;

		GenericArrayTypeImpl(final Type componentType) {
			this.componentType = Objects.requireNonNull(componentType);
		}

		@Override
		public Type getGenericComponentType() {
			return componentType;
		}

		// Must match sun.reflect.generics.reflectiveObjects.GenericArrayTypeImpl
		@Override
		public boolean equals(final Object obj) {
			if (obj == this) {
				return true;
			}
			if (obj instanceof final GenericArrayType other) {
				return Objects.equals(componentType, other.getGenericComponentType());
			}
			return false;
		}

		// Must match sun.reflect.generics.reflectiveObjects.GenericArrayTypeImpl
		@Override
		public int hashCode() {
			return Objects.hashCode(componentType);
		}

		@Override
		public String toString() {
			return componentType.getTypeName() + "[]";
		}

	}

	// Package-private for testing
	static class ParameterizedTypeImpl implements ParameterizedType {
		private final Type rawType;
		private final Type ownerType;
		private final Type[] typeArguments;

		ParameterizedTypeImpl(final Type rawType, final Type ownerType, final Type[] typeArguments) {
			this.rawType = Objects.requireNonNull(rawType);
			this.ownerType = ownerType; // ownerType may be null
			this.typeArguments = typeArguments.clone(); // implicit null check
		}

		@Override
		public Type getRawType() {
			return rawType;
		}

		@Override
		public Type getOwnerType() {
			return ownerType;
		}

		@Override
		public Type[] getActualTypeArguments() {
			// Defensive copy
			return typeArguments.clone();
		}

		// Must match sun.reflect.generics.reflectiveObjects.ParameterizedTypeImpl
		@Override
		public boolean equals(final Object obj) {
			if (obj == this) {
				return true;
			}
			if (obj instanceof final ParameterizedType other) {
				return Objects.equals(ownerType, other.getOwnerType())
						&& Objects.equals(rawType, other.getRawType())
						&& Arrays.equals(typeArguments, other.getActualTypeArguments());
			}
			return false;
		}

		// Must match sun.reflect.generics.reflectiveObjects.ParameterizedTypeImpl
		@Override
		public int hashCode() {
			return Arrays.hashCode(typeArguments)
					^ Objects.hashCode(ownerType)
					^ Objects.hashCode(rawType);
		}

		@Override
		public String toString() {
			final StringBuilder sb = new StringBuilder();
			if (ownerType != null) {
				sb.append(ownerType.getTypeName()).append('$');
				if (rawType instanceof final Class<?> c) {
					sb.append(c.getSimpleName());
				} else {
					// Should not be possible, see https://bugs.openjdk.java.net/browse/JDK-8250659
					// But to be safe fall back to using type name, even though this creates malformed toString() then
					sb.append(rawType.getTypeName());
				}
			} else {
				sb.append(rawType.getTypeName());
			}
			final StringJoiner typeArgumentsJoiner = new StringJoiner(", ", "<", ">");
			typeArgumentsJoiner.setEmptyValue("");
			for (final Type typeArgument : typeArguments) {
				typeArgumentsJoiner.add(typeArgument.getTypeName());
			}
			//noinspection UnnecessaryToStringCall
			sb.append(typeArgumentsJoiner.toString());
			return sb.toString();
		}

	}

	// Package-private for testing
	static class WildcardTypeImpl implements WildcardType {
		private final Type[] lowerBounds;
		private final Type[] upperBounds;

		WildcardTypeImpl(Type[] lowerBounds, Type[] upperBounds) {
			lowerBounds = lowerBounds.clone();
			upperBounds = upperBounds.clone();
			if (upperBounds.length == 0) {
				throw new IllegalArgumentException("At least Object is required as upper bound");
			}

			// If lower bounds are specified, upper bounds must consist only of Object.class
			if (lowerBounds.length > 0 && (upperBounds.length != 1 || upperBounds[0] != Object.class)) {
				throw new IllegalArgumentException("Malformed bounds: lower=" + Arrays.toString(lowerBounds) + ", upper=" + Arrays.toString(upperBounds));
			}

			this.lowerBounds = lowerBounds;
			this.upperBounds = upperBounds;
		}

		@Override
		public Type[] getLowerBounds() {
			// Defensive copy
			return lowerBounds.clone();
		}

		@Override
		public Type[] getUpperBounds() {
			// Defensive copy
			return upperBounds.clone();
		}

		// Must match sun.reflect.generics.reflectiveObjects.WildcardTypeImpl
		@Override
		public boolean equals(final Object obj) {
			if (obj == this) {
				return true;
			}
			if (obj instanceof final WildcardType other) {
				return Arrays.equals(lowerBounds, other.getLowerBounds())
						&& Arrays.equals(upperBounds, other.getUpperBounds());
			}
			return false;
		}

		// Must match sun.reflect.generics.reflectiveObjects.WildcardTypeImpl
		@Override
		public int hashCode() {
			return Arrays.hashCode(lowerBounds) ^ Arrays.hashCode(upperBounds);
		}

		@Override
		public String toString() {
			Type[] bounds;
			final StringBuilder sb = new StringBuilder();
			if (lowerBounds.length > 0) {
				sb.append("? super ");
				bounds = lowerBounds;
			} else if (upperBounds.length == 1 && upperBounds[0] == Object.class) {
				return "?";
			} else {
				sb.append("? extends ");
				bounds = upperBounds;
			}

			final StringJoiner boundsJoiner = new StringJoiner(" & ");
			for (final Type bound : bounds) {
				boundsJoiner.add(bound.getTypeName());
			}
			//noinspection UnnecessaryToStringCall
			sb.append(boundsJoiner.toString());
			return sb.toString();
		}
	}
}
