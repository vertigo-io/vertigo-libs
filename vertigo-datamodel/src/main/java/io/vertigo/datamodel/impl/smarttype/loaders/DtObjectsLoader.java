/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.datamodel.impl.smarttype.loaders;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.ClassSelector;
import io.vertigo.core.lang.ClassSelector.ClassConditions;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataDefinitionBuilder;
import io.vertigo.datamodel.data.definitions.DataField.FieldType;
import io.vertigo.datamodel.data.definitions.DataStereotype;
import io.vertigo.datamodel.data.definitions.association.AssociationNNDefinition;
import io.vertigo.datamodel.data.definitions.association.AssociationNode;
import io.vertigo.datamodel.data.definitions.association.AssociationSimpleDefinition;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtMasterData;
import io.vertigo.datamodel.data.model.DtStaticMasterData;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.Fragment;
import io.vertigo.datamodel.data.model.KeyConcept;
import io.vertigo.datamodel.data.stereotype.DataSpace;
import io.vertigo.datamodel.data.util.AssociationUtil;
import io.vertigo.datamodel.impl.smarttype.dynamic.DynamicDefinition;
import io.vertigo.datamodel.smarttype.annotations.Adapter;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition.Scope;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinitionBuilder;

/**
 * Lecture des annotations présentes sur les objets métier.
 *
 * @author pchretien, mlaroche
 */
public final class DtObjectsLoader implements Loader {

	/**
	 * @return Liste des fichiers Java représentant des objets métiers.
	 */
	private static <F> Set<Class<F>> selectClasses(final String resourcePath, final Class<F> filterClass) {
		final ClassSelector classSelector;
		if (resourcePath.endsWith("*")) {
			//by package
			final String packageName = resourcePath.substring(0, resourcePath.length() - 1);
			classSelector = ClassSelector.from(packageName);
		} else {
			//by Iterable of classes
			final Iterable dataDefinitionsClass = ClassUtil.newInstance(resourcePath, Iterable.class);
			final Iterator<Class> iterator = dataDefinitionsClass.iterator();
			final Set<Class> classes = new HashSet();
			iterator.forEachRemaining(classes::add);
			classSelector = ClassSelector
					.from(classes);
		}
		return classSelector
				.filterClasses(ClassConditions.subTypeOf(filterClass))
				.findClasses()
				.stream()
				.map(clazz -> (Class<F>) clazz)
				.collect(Collectors.toSet());
	}

	/** {@inheritDoc} */
	@Override
	public void load(final String resourcePath, final Map<String, DynamicDefinition> dynamicDefinitions) {
		Assertion.check()
				.isNotBlank(resourcePath)
				.isNotNull(dynamicDefinitions);
		//-----
		//--Enregistrement des fichiers java annotés
		for (final Class<DataObject> javaClass : selectClasses(resourcePath, DataObject.class)) {
			load(javaClass, dynamicDefinitions);
		}
	}

	private static void load(final Class<DataObject> clazz, final Map<String, DynamicDefinition> dslDefinitionRepository) {
		Assertion.check().isNotNull(dslDefinitionRepository);
		//-----
		parseDynamicDefinitionBuilder(clazz, dslDefinitionRepository);
	}

	private static void parseDynamicDefinitionBuilder(final Class<DataObject> clazz, final Map<String, DynamicDefinition> dynamicModelRepository) {
		final String simpleName = clazz.getSimpleName();
		final String packageName = clazz.getPackage().getName();
		final String dataDefinitionName = DataDefinition.PREFIX + simpleName;

		// Le tri des champs et des méthodes par ordre alphabétique est important car classe.getMethods() retourne
		// un ordre relativement aléatoire et la lecture des annotations peut donc changer l'ordre
		// des fields d'une lecture à l'autre (ou d'une compilation à l'autre).
		// Cela devient alors bloquant pour une communication par sérialisation entre 2 instances.

		final List<Field> fields = new ArrayList<>(ClassUtil.getAllFields(clazz));
		fields.sort(Comparator.comparing(Field::getName));
		final Method[] methods = clazz.getMethods();
		Arrays.sort(methods, Comparator.comparing(Method::getName));

		//DefinitionLinks
		final List<String> definitionLinks = extractDefinitionLinks(clazz, fields, methods);

		dynamicModelRepository.put(dataDefinitionName,
				extractDynamicDefinition(clazz, packageName, dataDefinitionName, fields, methods, definitionLinks));

		// Association
		for (final Field field : fields) {
			parseAssociationDefinition(dynamicModelRepository, field);
		}
		for (final Method method : methods) {
			parseAssociationDefinition(dynamicModelRepository, method);
		}

		// SmartType
		parseSmartTypes(clazz, dynamicModelRepository, simpleName, dataDefinitionName);

	}

	private static List<String> extractDefinitionLinks(final Class clazz, final List<Field> fields, final Method[] methods) {
		final List<String> definitionLinks = new ArrayList<>();

		for (final Annotation annotation : clazz.getAnnotations()) {
			if (annotation instanceof io.vertigo.datamodel.data.stereotype.Fragment) {
				definitionLinks.add(io.vertigo.datamodel.data.stereotype.Fragment.class.cast(annotation).fragmentOf());
			}
		}

		for (final Field field : fields) {
			for (final Annotation annotation : field.getAnnotations()) {
				if (annotation instanceof io.vertigo.datamodel.data.stereotype.Field) {
					definitionLinks.add(io.vertigo.datamodel.data.stereotype.Field.class.cast(annotation).smartType());
				}
			}
		}
		for (final Method method : methods) {
			for (final Annotation annotation : method.getAnnotations()) {
				if (annotation instanceof io.vertigo.datamodel.data.stereotype.Field) {
					definitionLinks.add(io.vertigo.datamodel.data.stereotype.Field.class.cast(annotation).smartType());
				}
				//FK are only on getter/setter
				if (annotation instanceof io.vertigo.datamodel.data.stereotype.ForeignKey) {
					definitionLinks.add(io.vertigo.datamodel.data.stereotype.ForeignKey.class.cast(annotation).smartType());
				}
			}
		}
		return definitionLinks;
	}

	private static DynamicDefinition extractDynamicDefinition(final Class<DataObject> clazz, final String packageName, final String dataDefinitionName, final List<Field> fields, final Method[] methods, final List<String> definitionLinks) {
		return new DynamicDefinition(
				dataDefinitionName,
				definitionLinks,
				definitionSpace -> {
					final DataDefinitionBuilder dataDefinitionBuilder = DataDefinition.builder(dataDefinitionName)
							.withPackageName(packageName)
							.withDataSpace(parseDataSpaceAnnotation(clazz));
					if (Fragment.class.isAssignableFrom(clazz)) {
						//Fragments
						extractDynamicDefinitionForFragment(clazz, definitionSpace, dataDefinitionBuilder);
					} else {
						dataDefinitionBuilder.withStereoType(parseStereotype(clazz));
					}
					extractDynamicDefinitionFromFields(fields, definitionSpace, dataDefinitionBuilder);
					extractDynamicDefinitionFromMethods(methods, definitionSpace, dataDefinitionBuilder);
					return dataDefinitionBuilder.build();
				}

		);
	}

	private static void extractDynamicDefinitionForFragment(final Class<DataObject> clazz, final DefinitionSpace definitionSpace, final DataDefinitionBuilder dataDefinitionBuilder) {
		for (final Annotation annotation : clazz.getAnnotations()) {
			if (annotation instanceof io.vertigo.datamodel.data.stereotype.Fragment) {
				dataDefinitionBuilder.withStereoType(DataStereotype.Fragment);
				dataDefinitionBuilder.withFragment(definitionSpace.resolve(((io.vertigo.datamodel.data.stereotype.Fragment) annotation).fragmentOf(), DataDefinition.class));
				break;
			}
		}
	}

	private static void extractDynamicDefinitionFromMethods(final Method[] methods, final DefinitionSpace definitionSpace, final DataDefinitionBuilder dataDefinitionBuilder) {
		for (final Method method : methods) {
			if (method.isAnnotationPresent(io.vertigo.datamodel.data.stereotype.Field.class)) {
				final io.vertigo.datamodel.data.stereotype.Field methodAnnotation = method.getAnnotation(io.vertigo.datamodel.data.stereotype.Field.class);
				final String fieldName = createFieldName(method);
				parseAnnotation(fieldName, dataDefinitionBuilder, methodAnnotation, definitionSpace);
			}
			if (method.isAnnotationPresent(io.vertigo.datamodel.data.stereotype.SortField.class)) {
				dataDefinitionBuilder.withSortField(createFieldName(method));
			}
			if (method.isAnnotationPresent(io.vertigo.datamodel.data.stereotype.DisplayField.class)) {
				dataDefinitionBuilder.withDisplayField(createFieldName(method));
			}
			if (method.isAnnotationPresent(io.vertigo.datamodel.data.stereotype.KeyField.class)) {
				dataDefinitionBuilder.withKeyField(createFieldName(method));
			}
			if (method.isAnnotationPresent(io.vertigo.datamodel.data.stereotype.ForeignKey.class)) {
				//Le nom est automatiquement déduit du nom du champ
				final io.vertigo.datamodel.data.stereotype.ForeignKey foreignKeyAnnotation = method.getAnnotation(io.vertigo.datamodel.data.stereotype.ForeignKey.class);
				dataDefinitionBuilder.addForeignKey(createFieldName(method), foreignKeyAnnotation.label(), definitionSpace.resolve(foreignKeyAnnotation.smartType(), SmartTypeDefinition.class), foreignKeyAnnotation.cardinality(), foreignKeyAnnotation.fkDefinition());
			}
		}
	}

	private static void extractDynamicDefinitionFromFields(final List<Field> fields, final DefinitionSpace definitionSpace, final DataDefinitionBuilder dataDefinitionBuilder) {
		for (final Field field : fields) {
			if (field.isAnnotationPresent(io.vertigo.datamodel.data.stereotype.Field.class)) {
				//Le nom est automatiquement déduit du nom du champ
				final io.vertigo.datamodel.data.stereotype.Field fieldAnnotation = field.getAnnotation(io.vertigo.datamodel.data.stereotype.Field.class);
				parseAnnotation(createFieldName(field), dataDefinitionBuilder, fieldAnnotation, definitionSpace);
			}
			if (field.isAnnotationPresent(io.vertigo.datamodel.data.stereotype.SortField.class)) {
				dataDefinitionBuilder.withSortField(createFieldName(field));
			}
			if (field.isAnnotationPresent(io.vertigo.datamodel.data.stereotype.DisplayField.class)) {
				dataDefinitionBuilder.withDisplayField(createFieldName(field));
			}
			if (field.isAnnotationPresent(io.vertigo.datamodel.data.stereotype.KeyField.class)) {
				dataDefinitionBuilder.withKeyField(createFieldName(field));
			}

		}
	}

	private static void parseSmartTypes(final Class<DataObject> clazz, final Map<String, DynamicDefinition> dynamicModelRepository, final String simpleName, final String dataDefinitionName) {
		final String smartTypeName = SmartTypeDefinition.PREFIX + dataDefinitionName;
		final Adapter[] adapters = clazz.getAnnotationsByType(Adapter.class);
		dynamicModelRepository.putIfAbsent(// smartTypes infered from the dtObject class is only used when no explicit SmartTypeDefinition is registered via a SmartTypesLoader
				smartTypeName,
				new DynamicDefinition(smartTypeName, Collections.emptyList(),
						ds -> {
							final SmartTypeDefinitionBuilder smartTypeDefinitionBuilder = SmartTypeDefinition.builder(smartTypeName, clazz);
							smartTypeDefinitionBuilder
									.withScope(Scope.DATA_TYPE);
							for (final Adapter adapter : adapters) {
								smartTypeDefinitionBuilder.addAdapter(adapter.type(), adapter.clazz(), adapter.targetBasicType());
							}
							return smartTypeDefinitionBuilder.build();
						}));
	}

	private static String parseDataSpaceAnnotation(final Class<?> clazz) {
		final DataSpace[] dataSpaceAnnotations = clazz.getAnnotationsByType(DataSpace.class);
		Assertion.check().isTrue(dataSpaceAnnotations.length <= 1, "Entity {0} can have at max one DataSpace", clazz.getSimpleName());
		// ---
		if (dataSpaceAnnotations.length == 1) {
			return dataSpaceAnnotations[0].value();
		}
		return DataDefinition.DEFAULT_DATA_SPACE;
	}

	private static DataStereotype parseStereotype(final Class<DataObject> clazz) {
		if (DtStaticMasterData.class.isAssignableFrom(clazz)) {
			return DataStereotype.StaticMasterData;
		} else if (DtMasterData.class.isAssignableFrom(clazz)) {
			return DataStereotype.MasterData;
		} else if (KeyConcept.class.isAssignableFrom(clazz)) {
			return DataStereotype.KeyConcept;
		} else if (Entity.class.isAssignableFrom(clazz)) {
			return DataStereotype.Entity;
		}
		return DataStereotype.ValueObject;
	}

	private static void parseAssociationDefinition(final Map<String, DynamicDefinition> dynamicModelRepository, final Field field) {
		for (final Annotation annotation : field.getAnnotations()) {
			parseAssociationDefinition(dynamicModelRepository, annotation);
		}
	}

	private static void parseAssociationDefinition(final Map<String, DynamicDefinition> dynamicModelRepository, final Method method) {
		for (final Annotation annotation : method.getAnnotations()) {
			parseAssociationDefinition(dynamicModelRepository, annotation);
		}
	}

	private static void parseAssociationDefinition(final Map<String, DynamicDefinition> dynamicModelRepository, final Annotation annotation) {
		if (annotation instanceof final io.vertigo.datamodel.data.stereotype.Association association) {
			if (!dynamicModelRepository.containsKey(association.name())) {
				//Les associations peuvent être déclarées sur les deux noeuds de l'association.
				dynamicModelRepository.put(association.name(),
						createAssociationSimpleDefinition(association));
			}
		} else if (annotation instanceof final io.vertigo.datamodel.data.stereotype.AssociationNN association) {
			if (!dynamicModelRepository.containsKey(association.name())) {
				//Les associations peuvent être déclarées sur les deux noeuds de l'association.
				dynamicModelRepository.put(association.name(),
						createAssociationNNDefinition(association));
			}
		}
	}

	private static DynamicDefinition createAssociationSimpleDefinition(final io.vertigo.datamodel.data.stereotype.Association association) {
		return new DynamicDefinition(
				association.name(),
				Arrays.asList(association.primaryDtDefinitionName(), association.foreignDtDefinitionName()),
				definitionSpace -> {

					final String multiplicityA = association.primaryMultiplicity();
					final boolean navigabilityA = association.primaryIsNavigable();
					final String multiplicityB = association.foreignMultiplicity();
					final boolean navigabilityB = association.foreignIsNavigable();
					//---
					Assertion.check()
							.isNotNull(multiplicityA)
							.isNotNull(navigabilityA)
							.isNotNull(multiplicityB)
							.isNotNull(navigabilityB);
					// Vérification que l'on est bien dans le cas d'une association simple de type 1-n
					if (AssociationUtil.isMultiple(multiplicityB) && AssociationUtil.isMultiple(multiplicityA)) {
						//Relation n-n
						throw new IllegalArgumentException("Utiliser la déclaration AssociationNN");
					}
					if (!AssociationUtil.isMultiple(multiplicityB) && !AssociationUtil.isMultiple(multiplicityA)) {
						//Relation 1-1
						throw new IllegalArgumentException("Les associations 1-1 sont interdites");
					}

					final String fkFieldName = association.fkFieldName();

					final DataDefinition dtDefinitionA = definitionSpace.resolve(association.primaryDtDefinitionName(), DataDefinition.class);
					final String roleAOpt = association.primaryRole();
					final String roleA = roleAOpt != null ? roleAOpt : dtDefinitionA.id().shortName();
					final String labelAOpt = association.primaryLabel();
					final String labelA = labelAOpt != null ? labelAOpt : dtDefinitionA.id().shortName();

					final DataDefinition dtDefinitionB = definitionSpace.resolve(association.foreignDtDefinitionName(), DataDefinition.class);
					final String roleBOpt = association.foreignRole();
					final String roleB = roleBOpt != null ? roleBOpt : dtDefinitionB.id().shortName();
					final String labelB = association.foreignLabel();

					final AssociationNode associationNodeA = new AssociationNode(dtDefinitionA, navigabilityA, roleA, labelA, AssociationUtil.isMultiple(multiplicityA), AssociationUtil.isNotNull(multiplicityA));
					final AssociationNode associationNodeB = new AssociationNode(dtDefinitionB, navigabilityB, roleB, labelB, AssociationUtil.isMultiple(multiplicityB), AssociationUtil.isNotNull(multiplicityB));

					return new AssociationSimpleDefinition(association.name(), fkFieldName, associationNodeA, associationNodeB);
				});
	}

	private static DynamicDefinition createAssociationNNDefinition(final io.vertigo.datamodel.data.stereotype.AssociationNN association) {
		return new DynamicDefinition(
				association.name(),
				Arrays.asList(association.dataDefinitionA(), association.dataDefinitionB()),
				definitionSpace -> {
					final DataDefinition dataDefinitionA = definitionSpace.resolve(association.dataDefinitionA(), DataDefinition.class);
					final DataDefinition dataDefinitionB = definitionSpace.resolve(association.dataDefinitionB(), DataDefinition.class);
					final AssociationNode associationNodeA = new AssociationNode(dataDefinitionA, association.navigabilityA(), association.roleA(), association.labelA(), true, false);
					final AssociationNode associationNodeB = new AssociationNode(dataDefinitionB, association.navigabilityB(), association.roleB(), association.labelB(), true, false);
					return new AssociationNNDefinition(association.name(), association.tableName(), associationNodeA, associationNodeB);
				});
	}

	/*
	 * Centralisation du parsing des annotations liées à un champ.
	 */
	private static void parseAnnotation(final String fieldName, final DataDefinitionBuilder dataDefinitionBuilder, final io.vertigo.datamodel.data.stereotype.Field field, final DefinitionSpace definitionSpace) {
		//Si on trouve un smartType on est dans un objet dynamo.
		final FieldType type = FieldType.valueOf(field.type());
		switch (type) {
			case ID:
				dataDefinitionBuilder.addIdField(fieldName, field.label(), definitionSpace.resolve(field.smartType(), SmartTypeDefinition.class));
				break;
			case DATA:
				dataDefinitionBuilder.addDataField(fieldName, field.label(), definitionSpace.resolve(field.smartType(), SmartTypeDefinition.class), field.cardinality(), field.persistent());
				break;
			case COMPUTED:
				//Valeurs renseignées automatiquement parce que l'on est dans le cas d'un champ calculé
				dataDefinitionBuilder.addComputedField(fieldName, field.label(), definitionSpace.resolve(field.smartType(), SmartTypeDefinition.class), field.cardinality());
				break;
			case FOREIGN_KEY:
				throw new IllegalArgumentException("field of type  FOREIGN_KEY must be declared with a method annotated with @ForeignKey");
			default:
				throw new IllegalArgumentException("case " + type + " not implemented");
		}
	}

	/**
	 * Génération du nom du champ (Sous forme de constante) à partir du nom du champ.
	 * @param field champ
	 * @return Constante représentant le nom du champ
	 */
	private static String createFieldName(final Field field) {
		Assertion.check().isNotNull(field);
		//-----
		final String fieldName = field.getName();
		if (StringUtil.isLowerCamelCase(fieldName)) {
			return fieldName;
		}
		throw new IllegalArgumentException(field.getName() + " ne permet pas de donner un nom unique de propriété ");
	}

	/**
	 * Génération du nom du champ (Sous forme de constante) à partir du nom de la méthode.
	 * @param method Method
	 * @return Constante représentant le nom du champ
	 */
	private static String createFieldName(final Method method) {
		Assertion.check().isNotNull(method);
		//-----
		if (method.getName().startsWith("get")) {
			final String propertyName = method.getName().substring("get".length());
			final String fieldName = StringUtil.first2LowerCase(propertyName);
			if (StringUtil.isLowerCamelCase(fieldName)) {
				return fieldName;
			}
		}
		throw new IllegalArgumentException(method.getName() + "ne permet pas de donner un nom unique de propriété ");
	}

	@Override
	public String getType() {
		return "dtobjects";
	}
}
