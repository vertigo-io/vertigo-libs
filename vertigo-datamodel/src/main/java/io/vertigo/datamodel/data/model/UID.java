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
package io.vertigo.datamodel.data.model;

import java.io.Serializable;
import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.util.DtObjectUtil;
import io.vertigo.datamodel.smarttype.SmartTypeManager;

/**
 * Représente l'identifiant ABSOLU d'une ressource.
 * Une ressource posséde une définition (sa classe), et une clé.
 * L'URI propose une URN, c'est é dire la transcription sous forme de chaine.
 * L'URI peut étre recomposée é partir de cette URN.
 *
 * Le générique utilisé pour caractériser l'URI dépend de la ressource et non de la définition.
 * Cela permet de créer des UID plus intuitive comme UID<Personne> qui est un identifiant de personne.
 *
 * @author  pchretien
 * @param <E> the type of entity
 */
public final class UID<E extends Entity> implements Serializable {
	private static final long serialVersionUID = -1L;
	private static final char SEPARATOR = '@';

	/**
	 * Expression réguliére vérifiée par les URN.
	 */
	private static final Pattern REGEX_URN = Pattern.compile("[a-zA-Z0-9_:@$-]{5,80}");

	private final DefinitionId<DataDefinition> definitionId;
	private final Serializable id;

	/** URN de la ressource (Nom complet).*/
	private final String urn;

	/**
	 * Constructor.
	 * @param definition the entity definition
	 * @param id the entity id
	 */
	private UID(final DataDefinition definition, final Object id) {
		Assertion.check()
				.isNotNull(id)
				.isNotNull(definition);
		final SmartTypeManager smartTypeManager = Node.getNode().getComponentSpace().resolve(SmartTypeManager.class);
		smartTypeManager.checkType(definition.getIdField().get().smartTypeDefinition(), Cardinality.ONE, id);
		//-----
		this.id = Serializable.class.cast(id);
		this.definitionId = definition.id();
		//---
		//Calcul de l'urn
		urn = toURN(this);
		Assertion.check().isTrue(UID.REGEX_URN.matcher(urn).matches(), "urn {0} doit matcher le pattern {1}", urn, UID.REGEX_URN);
	}

	/**
	 * Parses URI from URN.
	 * @param urn URN to parse
	 * @return URI to result
	 */
	public static <E extends Entity> UID<E> of(final String urn) {
		Assertion.check().isNotNull(urn);
		//-----
		final int i = urn.indexOf(SEPARATOR);
		final String dname = urn.substring(0, i);
		final Object id = stringToId(urn.substring(i + 1));

		//On ne type pas, la seule chose que l'on sait est qu'il s'agit d'une définition.
		final DataDefinition definition = Node.getNode().getDefinitionSpace().resolve(dname, DataDefinition.class);
		return new UID(definition, id);
	}

	/**
	 * Builds an UID for an entity defined by
	 * - an id
	 * - a definition
	 *
	 * @param definition the entity definition
	 * @param id the entity id
	 * @return the entity UID
	 */
	public static <E extends Entity> UID<E> of(final DataDefinition definition, final Object id) {
		return new UID(definition, id);
	}

	/**
	 * Builds an UID for an entity defined by
	 * - an object
	
	 * @param entity the entity
	 * @param <E> the entity type
	 * @return the entity UID
	 */
	public static <E extends Entity> UID<E> of(final E entity) {
		Assertion.check().isNotNull(entity);
		//-----
		final DataDefinition dataDefinition = DtObjectUtil.findDtDefinition(entity);
		return new UID<>(dataDefinition, DtObjectUtil.getId(entity));
	}

	/**
	 * Builds an UID for an entity defined by
	 * - a class
	 * - an id
	
	 * @param entityClass the entity class
	 * @param id the entity id
	 * @param <E> the entity type
	 * @return the entity UID
	 */
	public static <E extends Entity> UID<E> of(final Class<E> entityClass, final Object uriValue) {
		final DataDefinition dataDefinition = DtObjectUtil.findDtDefinition(entityClass);
		return new UID<>(dataDefinition, uriValue);
	}

	/**
	 * Il est nécessaire de passer la classe de la définition attendue.
	 *
	 * @return Définition de la ressource.
	 */
	public DataDefinition getDefinition() {
		return definitionId.get();
	}

	/**
	 * Récupére l'URN é partir de l'URI.
	 * Une URN est la  représentation unique d'une UID sous forme de chaine de caractéres.
	 * Cette chaine peut s'insérer telle que dans une URL en tant que paramétre
	 * et ne contient donc aucun caractére spécial.
	 * Une URN respecte la regex exprimée ci dessus.
	 * @return URN de la ressource.
	 */
	public String urn() {
		return urn;
	}

	/**
	 * @param <K> the type of key
	 * @return the entity id
	 */
	public <K extends Serializable> K getId() {
		return (K) id;
	}

	/** {@inheritDoc} */
	@Override
	public int hashCode() {
		return urn.hashCode();
	}

	/** {@inheritDoc} */
	@Override
	public boolean equals(final Object o) {
		if (o instanceof UID) {
			return ((UID) o).urn.equals(this.urn);
		}
		return false;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		//on surcharge le toString car il est utilisé dans les logs d'erreur. et celui par défaut utilise le hashcode.
		return "urn[" + getClass().getName() + "]::" + urn;
	}

	//=========================================================================
	//=============================STATIC======================================
	//=========================================================================

	private static String toURN(final UID<?> uri) {
		final String idAsText = idToString(uri.getId());
		return uri.getDefinition().getName() + SEPARATOR + idAsText;
	}

	/**
	 * Converti une clé en chaine.
	 * Une clé vide est considérée comme nulle.
	 * @param id the entity id
	 * @return Chaine représentant la clé
	 */
	private static String idToString(final Serializable id) {
		Assertion.check().isNotNull(id);
		//---
		if (id instanceof String) {
			return StringUtil.isBlank((String) id) ? null : "s-" + ((String) id).trim();
		} else if (id instanceof Integer) {
			return "i-" + id;
		} else if (id instanceof Long) {
			return "l-" + id;
		}
		throw new IllegalArgumentException(id + " not supported by URI");
	}

	/**
	 * Converti une chaine en clé.
	 * @param strValue Valeur
	 * @return Clé lue é partir de la chaine
	 */
	private static Serializable stringToId(final String strValue) {
		Assertion.check().isNotBlank(strValue);
		//---
		if (strValue.startsWith("s-")) {
			return strValue.substring(2);
		} else if (strValue.startsWith("i-")) {
			return Integer.valueOf(strValue.substring(2));
		} else if (strValue.startsWith("l-")) {
			return Long.valueOf(strValue.substring(2));
		}
		throw new IllegalArgumentException(strValue + " not supported by URI");
	}
}
