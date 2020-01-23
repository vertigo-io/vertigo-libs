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
package io.vertigo.studio.plugins.mda.domain.java.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.util.ListBuilder;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.dynamo.domain.metamodel.StudioDtDefinition;
import io.vertigo.dynamo.domain.metamodel.StudioDtField;
import io.vertigo.dynamo.domain.metamodel.association.StudioAssociationNNDefinition;
import io.vertigo.dynamo.domain.metamodel.association.StudioAssociationNode;
import io.vertigo.dynamo.domain.metamodel.association.StudioAssociationSimpleDefinition;
import io.vertigo.dynamo.domain.stereotype.Association;
import io.vertigo.dynamo.domain.stereotype.AssociationNN;
import io.vertigo.dynamo.domain.stereotype.ForeignKey;
import io.vertigo.dynamo.domain.util.AssociationUtil;

/**
 * Gestion centralisée des annotations sur les objets générés.
 *
 * @author pchretien
 */
class AnnotationWriter {

	/** Chaine d'indentation. */
	private static final String INDENT = "\t\t";

	/**
	 * Ecriture des annotations sur une propriété méta.
	 *
	 * @param propertyName Property Name
	 * @return Liste des lignes de code java à ajouter.
	 */
	List<String> writeAnnotations(final String propertyName) {
		if ("UID".equalsIgnoreCase(propertyName)) {
			return writeUIDAnnotations();
		}
		throw new UnsupportedOperationException("This property (" + propertyName + ") is not supported on domain MDA");
	}

	/**
	 * Ecriture des annotations transient.
	 *
	 * @return Liste des lignes de code java à ajouter.
	 */
	List<String> writeTransientAnnotations() {
		// basic is nothing
		return Collections.emptyList();
	}

	/**
	 * Ectiture des annotations sur une DT_DEFINITION.
	 *
	 * @param dtDefinition DtDefinition
	 * @return Liste des lignes de code java à ajouter.
	 */
	List<String> writeAnnotations(final StudioDtDefinition dtDefinition) {
		final List<String> lines = new ArrayList<>();
		if (dtDefinition.getFragment().isPresent()) {
			// Générations des annotations Dynamo
			final StringBuilder buffer = new StringBuilder()
					.append('@').append(io.vertigo.dynamo.domain.stereotype.Fragment.class.getCanonicalName());
			if (dtDefinition.getFragment().isPresent()) {
				buffer.append('(')
						.append("fragmentOf = \"").append(dtDefinition.getFragment().get().getName()).append('\"')
						.append(')');
			}

			lines.add(buffer.toString());
		}
		if (dtDefinition.isPersistent() && !EntityStoreManager.MAIN_DATA_SPACE_NAME.equals(dtDefinition.getDataSpace())) {
			final String dataSpace = new StringBuilder()
					.append('@').append(io.vertigo.dynamo.domain.stereotype.DataSpace.class.getCanonicalName())
					.append("(\"").append(dtDefinition.getDataSpace()).append("\")")
					.toString();
			lines.add(dataSpace);
		}
		return lines;
	}

	/**
	 * Ectiture des annotations sur un DT_FIELD.
	 *
	 * @param dtField Champ de la DT_DEFINITION
	 * @return Liste des lignes de code java à ajouter.
	 */
	List<String> writeAnnotations(final StudioDtField dtField) {
		// Générations des annotations Dynamo
		// if we are a foreign key
		if (dtField.getType() == StudioDtField.FieldType.FOREIGN_KEY) {
			return Collections.singletonList(new StringBuilder("@").append(ForeignKey.class.getName()).append("(")
					.append("domain = \"").append(dtField.getDomain().getSmartTypeName()).append("\", ")
					.append("label = \"").append(dtField.getLabel().getDisplay()).append("\", ")
					.append("fkDefinition = \"").append("Dt").append(dtField.getFkDtDefinition().getLocalName()).append("\" ")
					.append(")")
					.toString());
		}

		final List<String> lines = new ArrayList<>();
		// we are other type of field
		final StringBuilder buffer = new StringBuilder("@Field(")
				.append("domain = \"").append(dtField.getDomain().getSmartTypeName()).append("\", ");
		if (dtField.getType() != StudioDtField.FieldType.DATA) {
			// "DATA" est la valeur par défaut de type dans l'annotation Field
			buffer.append("type = \"").append(dtField.getType()).append("\", ");
		}
		// The cardinality is always here but OptionalOrNullable is the default in annotation so we skip it to limit verbosity
		if (Cardinality.OPTIONAL_OR_NULLABLE != dtField.getCardinality()) {
			buffer.append("cardinality = ")
					.append(Cardinality.class.getCanonicalName())
					.append('.')
					.append(dtField.getCardinality().name())
					.append(", ");
		}
		if (!dtField.isPersistent()) {
			// On ne précise la persistance que si elle n'est pas gérée
			buffer.append("persistent = false, ");
		}
		buffer.append("label = \"")
				.append(dtField.getLabel().getDisplay())
				.append('\"')
				// on place le label a la fin, car il ne faut pas de ','
				.append(')');
		lines.add(buffer.toString());

		return lines;
	}

	/**
	 * Ectiture des annotations sur le getURI.
	 * @return Liste des lignes de code java à ajouter.
	 */
	List<String> writeUIDAnnotations() {
		return Collections.emptyList();
	}

	/**
	 * Ectiture des annotations sur un DT_FIELD gérant une association.
	 *
	 * @param associationSimple Definition de l'association
	 * @return Liste des lignes de code java à ajouter.
	 */
	List<String> writeSimpleAssociationAnnotation(final StudioAssociationSimpleDefinition associationSimple) {
		final StudioAssociationNode primaryNode = associationSimple.getPrimaryAssociationNode();
		final StudioAssociationNode foreignNode = associationSimple.getForeignAssociationNode();
		final String primaryMultiplicity = AssociationUtil.getMultiplicity(primaryNode.isNotNull(), primaryNode.isMultiple());
		final String foreignMultiplipicity = AssociationUtil.getMultiplicity(foreignNode.isNotNull(), foreignNode.isMultiple());

		return new ListBuilder<String>()
				.add("@" + Association.class.getCanonicalName() + "(")
				.add(INDENT + "name = \"" + "A" + associationSimple.getLocalName() + "\",")
				.add(INDENT + "fkFieldName = \"" + associationSimple.getFKField().getName() + "\",")
				.add(INDENT + "primaryDtDefinitionName = \"" + "Dt" + primaryNode.getDtDefinition().getLocalName() + "\",")
				.add(INDENT + "primaryIsNavigable = " + primaryNode.isNavigable() + ',')
				.add(INDENT + "primaryRole = \"" + primaryNode.getRole() + "\",")
				.add(INDENT + "primaryLabel = \"" + primaryNode.getLabel() + "\",")
				.add(INDENT + "primaryMultiplicity = \"" + primaryMultiplicity + "\",")
				.add(INDENT + "foreignDtDefinitionName = \"" + "Dt" + foreignNode.getDtDefinition().getLocalName() + "\",")
				.add(INDENT + "foreignIsNavigable = " + foreignNode.isNavigable() + ',')
				.add(INDENT + "foreignRole = \"" + foreignNode.getRole() + "\",")
				.add(INDENT + "foreignLabel = \"" + foreignNode.getLabel() + "\",")
				.add(INDENT + "foreignMultiplicity = \"" + foreignMultiplipicity + "\")")
				.build();
	}

	/**
	 * Ectiture des annotations sur un DT_FIELD gérant une association.
	 *
	 * @param associationNN Definition de l'association
	 * @return Liste des lignes de code java à ajouter.
	 */
	List<String> writeNNAssociationAnnotation(final StudioAssociationNNDefinition associationNN) {
		final StudioAssociationNode nodeA = associationNN.getAssociationNodeA();
		final StudioAssociationNode nodeB = associationNN.getAssociationNodeB();

		return new ListBuilder<String>()
				.add("@" + AssociationNN.class.getCanonicalName() + "(")
				.add(INDENT + "name = \"" + "Ann" + associationNN.getLocalName() + "\",")
				.add(INDENT + "tableName = \"" + associationNN.getTableName() + "\",")
				.add(INDENT + "dtDefinitionA = \"" + "Dt" + nodeA.getDtDefinition().getLocalName() + "\",")
				.add(INDENT + "dtDefinitionB = \"" + "Dt" + nodeB.getDtDefinition().getLocalName() + "\",")
				.add(INDENT + "navigabilityA = " + nodeA.isNavigable() + ',')
				.add(INDENT + "navigabilityB = " + nodeB.isNavigable() + ',')
				.add(INDENT + "roleA = \"" + nodeA.getRole() + "\",")
				.add(INDENT + "roleB = \"" + nodeB.getRole() + "\",")
				.add(INDENT + "labelA = \"" + nodeA.getLabel() + "\",")
				.add(INDENT + "labelB = \"" + nodeB.getLabel() + "\")")
				.build();
	}
}
