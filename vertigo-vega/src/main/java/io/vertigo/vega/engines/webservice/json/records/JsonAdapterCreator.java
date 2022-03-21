package io.vertigo.vega.engines.webservice.json.records;

import java.io.Serial;
import java.lang.reflect.Constructor;
import java.lang.reflect.InaccessibleObjectException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
import java.util.Optional;

// See https://github.com/google/gson/issues/1794#issuecomment-919890214

import com.google.gson.annotations.JsonAdapter;

/**
 * Creator for type adapter instances of classes referenced by {@link JsonAdapter @JsonAdapter}.
 *
 * <p>Creator implementations must be thread-safe.
 *
 * @see marcono1234.gson.recordadapter.RecordTypeAdapterFactory.Builder#registerJsonAdapterCreator(JsonAdapterCreator)
 */
// Deprecate once Gson has API for using its InstanceCreators, see https://github.com/google/gson/pull/1968
interface JsonAdapterCreator {
	/**
	 * Exception thrown when creation of a type adapter fails.
	 *
	 * @see JsonAdapterCreator#create(Class)
	 */
	class AdapterCreationException extends Exception {
		@Serial
		private static final long serialVersionUID = 1L;

		@SuppressWarnings("unused")
		public AdapterCreationException(final String message) {
			super(message);
		}

		public AdapterCreationException(final String message, final Throwable cause) {
			super(message, cause);
		}
	}

	/**
	 * A creator which invokes the public no-args constructor of a given class.
	 *
	 * <p>If a class does not have a public no-args constructor or if it is
	 * abstract or non-static no instance will be created and an empty {@code Optional}
	 * is returned.
	 */
	JsonAdapterCreator DEFAULT_CONSTRUCTOR_INVOKER = new JsonAdapterCreator() {
		@Override
		public Optional<Object> create(final Class<?> c) throws AdapterCreationException {
			final int modifiers = c.getModifiers();
			// Cannot create instances of abstract and inner classes
			if (Modifier.isAbstract(modifiers) || !Modifier.isStatic(modifiers)) {
				return Optional.empty();
			}

			Constructor<?> constructor;
			try {
				constructor = c.getConstructor();
			} catch (final NoSuchMethodException e) {
				return Optional.empty();
			}
			try {
				constructor.setAccessible(true);
				return Optional.of(constructor.newInstance());
			} catch (InaccessibleObjectException | IllegalAccessException e) {
				throw new AdapterCreationException("Default constructor of " + c + " is not accessible; open it to this library or register a custom JsonAdapterCreator", e);
			} catch (final InstantiationException e) {
				throw new AdapterCreationException("Failed invoking default constructor for " + c, e);
			} catch (final InvocationTargetException e) {
				throw new AdapterCreationException("Failed invoking default constructor for " + c, e.getCause());
			}
		}

		@Override
		public String toString() {
			return "DEFAULT_CONSTRUCTOR_INVOKER";
		}
	};

	/**
	 * Creates an instance for the given class specified by a {@link JsonAdapter @JsonAdapter} annotation.
	 * The instance has to be a subtype of one of the following types:
	 * <ol>
	 *     <li>{@link com.google.gson.TypeAdapter}</li>
	 *     <li>{@link com.google.gson.TypeAdapterFactory}</li>
	 *     <li>{@link com.google.gson.JsonSerializer} or {@link com.google.gson.JsonDeserializer} (or both)</li>
	 * </ol>
	 *
	 * <p>The returned instance does not have to be a new instance; it may also be a singleton, but it must
	 * be thread-safe.
	 *
	 * <p>If this creator does not support the given class, it can return {@code Optional.empty()} to
	 * let the next creator (if any) try to create an instance. If this creator supports the class but
	 * creation fails an {@link AdapterCreationException} should be thrown.
	 *
	 * <p>A creator is allowed to return an instance whose type is unrelated to the given class, for example
	 * if the given class has a constant field representing the type adapter to use.
	 *
	 * @param c
	 *      class to create an instance for
	 * @return
	 *      {@code Optional} containing the created instance; or empty {@code Optional} if instance creation
	 *      for the given class is not supported
	 * @throws AdapterCreationException
	 *      If instance creation is supported for the given class, but fails
	 */
	Optional<Object> create(Class<?> c) throws AdapterCreationException;
}
