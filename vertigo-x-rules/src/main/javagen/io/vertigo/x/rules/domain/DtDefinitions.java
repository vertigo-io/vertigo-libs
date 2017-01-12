package io.vertigo.x.rules.domain;

import java.util.Arrays;
import java.util.Iterator;
import io.vertigo.dynamo.domain.metamodel.DtFieldName;

/**
 * Attention cette classe est générée automatiquement !
 */
public final class DtDefinitions implements Iterable<Class<?>> {
	
	/**
	 * Enumération des DtDefinitions.
	 */
	public enum Definitions {
			/** Objet de données RuleConditionDefinition. */
			RuleConditionDefinition(io.vertigo.x.rules.domain.RuleConditionDefinition.class),
			/** Objet de données RuleDefinition. */
			RuleDefinition(io.vertigo.x.rules.domain.RuleDefinition.class),
			/** Objet de données RuleFilterDefinition. */
			RuleFilterDefinition(io.vertigo.x.rules.domain.RuleFilterDefinition.class),
			/** Objet de données SelectorDefinition. */
			SelectorDefinition(io.vertigo.x.rules.domain.SelectorDefinition.class),
		;
		
		private final Class<?> clazz;
		private Definitions(final Class<?> clazz) {
			this.clazz = clazz;
		}
		
		/** 
		  * Classe associée.
		  * @return Class d'implémentation de l'objet 
		  */
		public Class<?> getDtClass() {
			return clazz;
		}
    }

	/**
	 * Enumération des champs de RuleConditionDefinition.
	 */
	public enum RuleConditionDefinitionFields implements DtFieldName {
		/** Propriété 'id'. */
		ID,
		/** Propriété 'field'. */
		FIELD,
		/** Propriété 'operator'. */
		OPERATOR,
		/** Propriété 'expression'. */
		EXPRESSION,
		/** Propriété 'RuleDefinition'. */
		RUD_ID,
	}

	/**
	 * Enumération des champs de RuleDefinition.
	 */
	public enum RuleDefinitionFields implements DtFieldName {
		/** Propriété 'id'. */
		ID,
		/** Propriété 'creationDate'. */
		CREATION_DATE,
		/** Propriété 'itemId'. */
		ITEM_ID,
		/** Propriété 'Label'. */
		LABEL,
	}

	/**
	 * Enumération des champs de RuleFilterDefinition.
	 */
	public enum RuleFilterDefinitionFields implements DtFieldName {
		/** Propriété 'id'. */
		ID,
		/** Propriété 'field'. */
		FIELD,
		/** Propriété 'operator'. */
		OPERATOR,
		/** Propriété 'expression'. */
		EXPRESSION,
		/** Propriété 'SelectorDefinition'. */
		SEL_ID,
	}

	/**
	 * Enumération des champs de SelectorDefinition.
	 */
	public enum SelectorDefinitionFields implements DtFieldName {
		/** Propriété 'id'. */
		ID,
		/** Propriété 'creationDate'. */
		CREATION_DATE,
		/** Propriété 'itemId'. */
		ITEM_ID,
		/** Propriété 'groupId'. */
		GROUP_ID,
	}

	    
    /** {@inheritDoc} */
    @Override
    public Iterator<Class<?>> iterator() {
        return new Iterator<Class<?>>() {
            private Iterator<Definitions> it = Arrays.asList(Definitions.values()).iterator();

            /** {@inheritDoc} */
            @Override
            public boolean hasNext() {
				return it.hasNext();
            }

            /** {@inheritDoc} */
            @Override
            public Class<?> next() {
            	return it.next().getDtClass();
            }

            /** {@inheritDoc} */
            @Override
            public void remove() {
            	//unsupported
            }
        };
    }                      
}
