package io.vertigo.x.rules.domain;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données SelectorDefinition
 */
public final class SelectorDefinition implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long id;
	private java.util.Date creationDate;
	private Long itemId;
	private String groupId;
	private io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.rules.domain.RuleFilterDefinition> ruleFilterDefinition;

	/** {@inheritDoc} */
	@Override
	public URI<SelectorDefinition> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'id'.
	 * @return Long id <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_RULES_ID", type = "ID", required = true, label = "id")
	public Long getId() {
		return id;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'id'.
	 * @param id Long <b>Obligatoire</b>
	 */
	public void setId(final Long id) {
		this.id = id;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'creationDate'.
	 * @return java.util.Date creationDate
	 */
	@Field(domain = "DO_X_RULES_DATE", label = "creationDate")
	public java.util.Date getCreationDate() {
		return creationDate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'creationDate'.
	 * @param creationDate java.util.Date
	 */
	public void setCreationDate(final java.util.Date creationDate) {
		this.creationDate = creationDate;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'itemId'.
	 * @return Long itemId
	 */
	@Field(domain = "DO_X_RULES_WEAK_ID", label = "itemId")
	public Long getItemId() {
		return itemId;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'itemId'.
	 * @param itemId Long
	 */
	public void setItemId(final Long itemId) {
		this.itemId = itemId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'groupId'.
	 * @return String groupId
	 */
	@Field(domain = "DO_X_RULES_FIELD", label = "groupId")
	public String getGroupId() {
		return groupId;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'groupId'.
	 * @param groupId String
	 */
	public void setGroupId(final String groupId) {
		this.groupId = groupId;
	}

	/**
	 * Association : RuleFilterDefinition.
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.rules.domain.RuleFilterDefinition>
	 */
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.rules.domain.RuleFilterDefinition> getRuleFilterDefinitionList() {
//		return this.<io.vertigo.x.rules.domain.RuleFilterDefinition> getList(getRuleFilterDefinitionListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(io.vertigo.x.rules.domain.RuleFilterDefinition.class);
		}
		final io.vertigo.dynamo.domain.model.DtListURI fkDtListURI = getRuleFilterDefinitionDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (ruleFilterDefinition == null) {
			ruleFilterDefinition = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().findAll(fkDtListURI);
		}
		return ruleFilterDefinition;
	}

	/**
	 * Association URI: RuleFilterDefinition.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association (
			name = "A_SEL_FID",
			fkFieldName = "SEL_ID",
			primaryDtDefinitionName = "DT_SELECTOR_DEFINITION",
			primaryIsNavigable = false,
			primaryRole = "SelectorDefinition",
			primaryLabel = "SelectorDefinition",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_RULE_FILTER_DEFINITION",
			foreignIsNavigable = true,
			foreignRole = "RuleFilterDefinition",
			foreignLabel = "RuleFilterDefinition",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForSimpleAssociation getRuleFilterDefinitionDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURIForSimpleAssociation(this, "A_SEL_FID", "RuleFilterDefinition");
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
