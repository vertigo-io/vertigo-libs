/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionUtil;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.core.util.Selector;
import io.vertigo.core.util.Selector.ClassConditions;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.impl.smarttype.dynamic.DynamicDefinition;
import io.vertigo.datamodel.smarttype.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.SmartTypeDefinition.Scope;
import io.vertigo.datamodel.smarttype.SmartTypeDefinitionBuilder;
import io.vertigo.datamodel.smarttype.annotations.Adapter;
import io.vertigo.datamodel.structure.metamodel.ComputedExpression;
import io.vertigo.datamodel.structure.metamodel.DtDefinition;
import io.vertigo.datamodel.structure.metamodel.DtDefinitionBuilder;
import io.vertigo.datamodel.structure.metamodel.DtField.FieldType;
import io.vertigo.datamodel.structure.metamodel.DtStereotype;
import io.vertigo.datamodel.structure.metamodel.association.AssociationNNDefinition;
import io.vertigo.datamodel.structure.metamodel.association.AssociationNode;
import io.vertigo.datamodel.structure.metamodel.association.AssociationSimpleDefinition;
import io.vertigo.datamodel.structure.model.DtMasterData;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.datamodel.structure.model.DtStaticMasterData;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.Fragment;
import io.vertigo.datamodel.structure.model.KeyConcept;
import io.vertigo.datamodel.structure.stereotype.DataSpace;
import io.vertigo.datamodel.structure.util.AssociationUtil;

/**
 * Lecture des annotations présentes sur les objets métier.
 *
 * @author pchretien, mlaroche
 */
public final class DtObjectsLoader implements Loader {
	private static final String DT_DEFINITION_PREFIX = DefinitionUtil.getPrefix(DtDefinition.class);

	/**
	 * @return Liste des fichiers Java représentant des objets métiers.
	 */
	private static <F> Set<Class<F>> selectClasses(final String resourcePath, final Class<F> filterClass) {
		final Selector selector = new Selector();
		if (resourcePath.endsWith("*")) {
			//by package
			final String packageName = resourcePath.substring(0, resourcePath.length() - 1);
			selector.from(packageName);
		} else {
			//by Iterable of classes
			final Iterable dtDefinitionsClass = ClassUtil.newInstance(resourcePath, Iterable.class);
			selector.from(dtDefinitionsClass);
		}
		return selector
				.filterClasses(ClassConditions.subTypeOf(filterClass))
				.findClasses()
				.stream()
				.map(clazz -> (Class<F>) clazz)
				.collect(Collectors.toSet());
	}

	/** {@inheritDoc} */
	@Override
	public List<DynamicDefinition> load(final String resourcePath) {
		Assertion.checkArgNotEmpty(resourcePath);
		//-----
		final Map<String, DynamicDefinition> dynamicDefinitions = new HashMap<>();
		//--Enregistrement des fichiers java annotés
		for (final Class<DtObject> javaClass : selectClasses(resourcePath, DtObject.class)) {
			load(javaClass, dynamicDefinitions);
		}
		return new ArrayList<>(dynamicDefinitions.values());
	}

	private static void load(final Class<DtObject> clazz, final Map<String, DynamicDefinition> dslDefinitionRepository) {
		Assertion.checkNotNull(dslDefinitionRepository);
		//-----
		parseDynamicDefinitionBuilder(clazz, dslDefinitionRepository);
	}

	private static void parseDynamicDefinitionBuilder(final Class<DtObject> clazz, final Map<String, DynamicDefinition> dynamicModelRepository) {
		final String simpleName = clazz.getSimpleName();
		final String packageName = clazz.getPackage().getName();
		final String dtDefinitionName = DT_DEFINITION_PREFIX + simpleName;

		// Le tri des champs et des méthodes par ordre alphabétique est important car classe.getMethods() retourne
		// un ordre relativement aléatoire et la lecture des annotations peut donc changer l'ordre
		// des fields d'une lecture à l'autre (ou d'une compilation à l'autre).
		// Cela devient alors bloquant pour une communication par sérialisation entre 2 instances.

		final List<Field> fields = new ArrayList<>(ClassUtil.getAllFields(clazz));
		fields.sort(Comparator.comparing(Field::getName));
		final Method[] methods = clazz.getMethods();
		Arrays.sort(methods, Comparator.comparing(Method::getName));

		final List<String> definitionLinks = new ArrayList<>();
		//DefinitionLinks
		for (final Field field : fields) {
			for (final Annotation annotation : field.getAnnotations()) {
				if (annotation instanceof io.vertigo.datamodel.structure.stereotype.Field) {
					definitionLinks.add(io.vertigo.datamodel.structure.stereotype.Field.class.cast(annotation).smartType());
				}
			}
		}
		for (final Method method : methods) {
			for (final Annotation annotation : method.getAnnotations()) {
				if (annotation instanceof io.vertigo.datamodel.structure.stereotype.Field) {
					definitionLinks.add(io.vertigo.datamodel.structure.stereotype.Field.class.cast(annotation).smartType());
				}
				//FK are only on getter/setter
				if (annotation instanceof io.vertigo.datamodel.structure.stereotype.ForeignKey) {
					definitionLinks.add(io.vertigo.datamodel.structure.stereotype.ForeignKey.class.cast(annotation).smartType());
				}
			}
		}

		dynamicModelRepository.put(dtDefinitionName,
				new DynamicDefinition(
						dtDefinitionName,
						definitionLinks,
						definitionSpace -> {
							final DtDefinitionBuilder dtDefinitionBuilder = DtDefinition.builder(dtDefinitionName)
									.withPackageName(packageName)
									.withDataSpace(parseDataSpaceAnnotation(clazz));
							if (Fragment.class.isAssignableFrom(clazz)) {
								//Fragments
								for (final Annotation annotation : clazz.getAnnotations()) {
									if (annotation instanceof io.vertigo.datamodel.structure.stereotype.Fragment) {
										dtDefinitionBuilder.withStereoType(DtStereotype.Fragment);
										dtDefinitionBuilder.withFragment(definitionSpace.resolve(((io.vertigo.datamodel.structure.stereotype.Fragment) annotation).fragmentOf(), DtDefinition.class));
										break;
									}
								}
							} else {
								dtDefinitionBuilder.withStereoType(parseStereotype(clazz));
							}
							for (final Field field : fields) {
								if (field.isAnnotationPresent(io.vertigo.datamodel.structure.stereotype.Field.class)) {
									//Le nom est automatiquement déduit du nom du champ
									final io.vertigo.datamodel.structure.stereotype.Field fieldAnnotation = field.getAnnotation(io.vertigo.datamodel.structure.stereotype.Field.class);
									parseAnnotation(createFieldName(field), dtDefinitionBuilder, fieldAnnotation, definitionSpace);
								}
								if (field.isAnnotationPresent(io.vertigo.datamodel.structure.stereotype.SortField.class)) {
									dtDefinitionBuilder.withSortField(createFieldName(field));
								}
								if (field.isAnnotationPresent(io.vertigo.datamodel.structure.stereotype.DisplayField.class)) {
									dtDefinitionBuilder.withDisplayField(createFieldName(field));
								}

							}
							for (final Method method : methods) {
								if (method.isAnnotationPresent(io.vertigo.datamodel.structure.stereotype.Field.class)) {
									final io.vertigo.datamodel.structure.stereotype.Field methodAnnotation = method.getAnnotation(io.vertigo.datamodel.structure.stereotype.Field.class);
									final String fieldName = createFieldName(method);
									parseAnnotation(fieldName, dtDefinitionBuilder, methodAnnotation, definitionSpace);
								}
								if (method.isAnnotationPresent(io.vertigo.datamodel.structure.stereotype.SortField.class)) {
									dtDefinitionBuilder.withSortField(createFieldName(method));
								}
								if (method.isAnnotationPresent(io.vertigo.datamodel.structure.stereotype.DisplayField.class)) {
									dtDefinitionBuilder.withDisplayField(createFieldName(method));
								}
								if (method.isAnnotationPresent(io.vertigo.datamodel.structure.stereotype.ForeignKey.class)) {
									//Le nom est automatiquement déduit du nom du champ
									final io.vertigo.datamodel.structure.stereotype.ForeignKey foreignKeyAnnotation = method.getAnnotation(io.vertigo.datamodel.structure.stereotype.ForeignKey.class);
									dtDefinitionBuilder.addForeignKey(createFieldName(method), foreignKeyAnnotation.label(), definitionSpace.resolve(foreignKeyAnnotation.smartType(), SmartTypeDefinition.class), foreignKeyAnnotation.cardinality(), foreignKeyAnnotation.fkDefinition());

								}

							}
							return dtDefinitionBuilder.build();
						}

				));

		// Association
		for (final Field field : fields) {
			parseAssociationDefinition(dynamicModelRepository, field, packageName);
		}
		for (final Method method : methods) {
			parseAssociationDefinition(dynamicModelRepository, method, packageName);
		}

		// SmartType
		final String smartTypeName = DefinitionUtil.getPrefix(SmartTypeDefinition.class) + dtDefinitionName;
		final Adapter[] adapters = clazz.getAnnotationsByType(Adapter.class);
		dynamicModelRepository.put(
				simpleName,
				new DynamicDefinition(smartTypeName, Collections.emptyList(),
						ds -> {
							final SmartTypeDefinitionBuilder smartTypeDefinitionBuilder = SmartTypeDefinition.builder(smartTypeName, clazz);
							smartTypeDefinitionBuilder
									.withScope(Scope.DATA_OBJECT);
							for (final Adapter adapter : adapters) {
								smartTypeDefinitionBuilder.addAdapter(adapter.type(), adapter.clazz(), adapter.targetBasicType());
							}
							return smartTypeDefinitionBuilder.build();
						}));

	}

	private static String parseDataSpaceAnnotation(final Class<?> clazz) {
		final DataSpace[] dataSpaceAnnotations = clazz.getAnnotationsByType(DataSpace.class);
		Assertion.checkState(dataSpaceAnnotations.length <= 1, "Entity {0} can have at max one DataSpace", clazz.getSimpleName());
		// ---
		if (dataSpaceAnnotations.length == 1) {
			return dataSpaceAnnotations[0].value();
		}
		return DtDefinition.DEFAULT_DATA_SPACE;
	}

	private static DtStereotype parseStereotype(final Class<DtObject> clazz) {
		if (DtStaticMasterData.class.isAssignableFrom(clazz)) {
			return DtStereotype.StaticMasterData;
		} else if (DtMasterData.class.isAssignableFrom(clazz)) {
			return DtStereotype.MasterData;
		} else if (KeyConcept.class.isAssignableFrom(clazz)) {
			return DtStereotype.KeyConcept;
		} else if (Entity.class.isAssignableFrom(clazz)) {
			return DtStereotype.Entity;
		}
		return DtStereotype.ValueObject;
	}

	private static void parseAssociationDefinition(final Map<String, DynamicDefinition> dynamicModelRepository, final Field field, final String packageName) {
		for (final Annotation annotation : field.getAnnotations()) {
			parseAssociationDefinition(dynamicModelRepository, annotation, packageName);
		}
	}

	private static void parseAssociationDefinition(final Map<String, DynamicDefinition> dynamicModelRepository, final Method method, final String packageName) {
		for (final Annotation annotation : method.getAnnotations()) {
			parseAssociationDefinition(dynamicModelRepository, annotation, packageName);
		}
	}

	private static void parseAssociationDefinition(final Map<String, DynamicDefinition> dynamicModelRepository, final Annotation annotation, final String packageName) {
		if (annotation instanceof io.vertigo.datamodel.structure.stereotype.Association) {
			final io.vertigo.datamodel.structure.stereotype.Association association = (io.vertigo.datamodel.structure.stereotype.Association) annotation;
			//============================================================
			//Attention pamc inverse dans oom les déclarations des objets !!

			if (!dynamicModelRepository.containsKey(association.name())) {
				//Les associations peuvent être déclarées sur les deux noeuds de l'association.
				dynamicModelRepository.put(association.name(),
						new DynamicDefinition(
								association.name(),
								Arrays.asList(association.primaryDtDefinitionName(), association.foreignDtDefinitionName()),
								definitionSpace -> {

									final String multiplicityA = association.primaryMultiplicity();
									final Boolean navigabilityA = association.primaryIsNavigable();
									final String multiplicityB = association.foreignMultiplicity();
									final Boolean navigabilityB = association.foreignIsNavigable();
									//---
									Assertion.checkNotNull(multiplicityA);
									Assertion.checkNotNull(navigabilityA);
									Assertion.checkNotNull(multiplicityB);
									Assertion.checkNotNull(navigabilityB);
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

									final DtDefinition dtDefinitionA = definitionSpace.resolve(association.primaryDtDefinitionName(), DtDefinition.class);
									final String roleAOpt = association.primaryRole();
									final String roleA = roleAOpt != null ? roleAOpt : dtDefinitionA.getLocalName();
									final String labelAOpt = association.primaryLabel();
									final String labelA = labelAOpt != null ? labelAOpt : dtDefinitionA.getLocalName();

									final DtDefinition dtDefinitionB = definitionSpace.resolve(association.foreignDtDefinitionName(), DtDefinition.class);
									final String roleBOpt = association.foreignRole();
									final String roleB = roleBOpt != null ? roleBOpt : dtDefinitionB.getLocalName();
									final String labelB = association.foreignLabel();

									final AssociationNode associationNodeA = new AssociationNode(dtDefinitionA, navigabilityA, roleA, labelA, AssociationUtil.isMultiple(multiplicityA), AssociationUtil.isNotNull(multiplicityA));
									final AssociationNode associationNodeB = new AssociationNode(dtDefinitionB, navigabilityB, roleB, labelB, AssociationUtil.isMultiple(multiplicityB), AssociationUtil.isNotNull(multiplicityB));

									return new AssociationSimpleDefinition(association.name(), fkFieldName, associationNodeA, associationNodeB);
								}));
			}
		} else if (annotation instanceof io.vertigo.datamodel.structure.stereotype.AssociationNN) {
			final io.vertigo.datamodel.structure.stereotype.AssociationNN association = (io.vertigo.datamodel.structure.stereotype.AssociationNN) annotation;
			if (!dynamicModelRepository.containsKey(association.name())) {
				//Les associations peuvent être déclarées sur les deux noeuds de l'association.
				dynamicModelRepository.put(association.name(),
						new DynamicDefinition(
								association.name(),
								Arrays.asList(association.dtDefinitionA(), association.dtDefinitionB()),
								definitionSpace -> {
									final DtDefinition dtDefinitionA = definitionSpace.resolve(association.dtDefinitionA(), DtDefinition.class);
									final DtDefinition dtDefinitionB = definitionSpace.resolve(association.dtDefinitionB(), DtDefinition.class);
									final AssociationNode associationNodeA = new AssociationNode(dtDefinitionA, association.navigabilityA(), association.roleA(), association.labelA(), true, false);
									final AssociationNode associationNodeB = new AssociationNode(dtDefinitionB, association.navigabilityB(), association.roleB(), association.labelB(), true, false);
									return new AssociationNNDefinition(association.name(), association.tableName(), associationNodeA, associationNodeB);
								}));
			}
		}
	}

	/*
	 * Centralisation du parsing des annotations liées à un champ.
	 */
	private static void parseAnnotation(final String fieldName, final DtDefinitionBuilder dtDefinitionBuilder, final io.vertigo.datamodel.structure.stereotype.Field field, final DefinitionSpace definitionSpace) {
		//Si on trouve un domaine on est dans un objet dynamo.
		final FieldType type = FieldType.valueOf(field.type());

		switch (type) {
			case ID:

				dtDefinitionBuilder.addIdField(fieldName, field.label(), definitionSpace.resolve(field.smartType(), SmartTypeDefinition.class));
				break;
			case DATA:
				dtDefinitionBuilder.addDataField(fieldName, field.label(), definitionSpace.resolve(field.smartType(), SmartTypeDefinition.class), field.cardinality(), field.persistent());
				break;
			case COMPUTED:
				//Valeurs renseignées automatiquement parce que l'on est dans le cas d'un champ calculé
				dtDefinitionBuilder.addComputedField(fieldName, field.label(), definitionSpace.resolve(field.smartType(), SmartTypeDefinition.class), field.cardinality(), new ComputedExpression(null));
				break;
			case FOREIGN_KEY:
				// TODO : a refaire de toute urgence
				dtDefinitionBuilder.addForeignKey(fieldName, field.label(), definitionSpace.resolve(field.smartType(), SmartTypeDefinition.class), field.cardinality(), "DtWtf");
				break;
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
		Assertion.checkNotNull(field);
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
		Assertion.checkNotNull(method);
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
