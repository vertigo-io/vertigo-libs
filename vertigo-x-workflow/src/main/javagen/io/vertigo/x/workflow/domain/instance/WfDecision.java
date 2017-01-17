package io.vertigo.x.workflow.domain.instance;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données WfDecision
 */
public final class WfDecision implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long wfeId;
	private String username;
	private Integer choice;
	private java.util.Date decisionDate;
	private String comments;
	private Long wfaId;

	/** {@inheritDoc} */
	@Override
	public URI<WfDecision> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id Decision'.
	 * @return Long wfeId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "ID", required = true, label = "Id Decision")
	public Long getWfeId() {
		return wfeId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id Decision'.
	 * @param wfeId Long <b>Obligatoire</b>
	 */
	public void setWfeId(final Long wfeId) {
		this.wfeId = wfeId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'username'.
	 * @return String username
	 */
	@Field(domain = "DO_X_WORKFLOW_USER", label = "username")
	public String getUsername() {
		return username;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'username'.
	 * @param username String
	 */
	public void setUsername(final String username) {
		this.username = username;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'choice'.
	 * @return Integer choice
	 */
	@Field(domain = "DO_X_WORKFLOW_CHOICE", label = "choice")
	public Integer getChoice() {
		return choice;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'choice'.
	 * @param choice Integer
	 */
	public void setChoice(final Integer choice) {
		this.choice = choice;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'decision date'.
	 * @return java.util.Date decisionDate
	 */
	@Field(domain = "DO_TIMESTAMP", label = "decision date")
	public java.util.Date getDecisionDate() {
		return decisionDate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'decision date'.
	 * @param decisionDate java.util.Date
	 */
	public void setDecisionDate(final java.util.Date decisionDate) {
		this.decisionDate = decisionDate;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'comments'.
	 * @return String comments
	 */
	@Field(domain = "DO_X_WORKFLOW_COMMENTS", label = "comments")
	public String getComments() {
		return comments;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'comments'.
	 * @param comments String
	 */
	public void setComments(final String comments) {
		this.comments = comments;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'WfActivity'.
	 * @return Long wfaId
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "FOREIGN_KEY", label = "WfActivity")
	public Long getWfaId() {
		return wfaId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'WfActivity'.
	 * @param wfaId Long
	 */
	public void setWfaId(final Long wfaId) {
		this.wfaId = wfaId;
	}


	// Association : WfActivity non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
