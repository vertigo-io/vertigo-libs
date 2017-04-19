package io.vertigo.orchestra.domain.execution;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données OActivityLog
 */
@io.vertigo.dynamo.domain.stereotype.DataSpace("orchestra")
public final class OActivityLog implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long aclId;
	private String log;
	private String attachment;
	private Long aceId;
	private io.vertigo.orchestra.domain.execution.OActivityExecution activityExecution;

	/** {@inheritDoc} */
	@Override
	public URI<OActivityLog> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id du log'.
	 * @return Long aclId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "ID", required = true, label = "Id du log")
	public Long getAclId() {
		return aclId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id du log'.
	 * @param aclId Long <b>Obligatoire</b>
	 */
	public void setAclId(final Long aclId) {
		this.aclId = aclId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Contenu du log'.
	 * @return String log
	 */
	@Field(domain = "DO_O_TEXT", label = "Contenu du log")
	public String getLog() {
		return log;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Contenu du log'.
	 * @param log String
	 */
	public void setLog(final String log) {
		this.log = log;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Fichier joint'.
	 * @return String attachment
	 */
	@Field(domain = "DO_O_TEXT", label = "Fichier joint")
	public String getAttachment() {
		return attachment;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Fichier joint'.
	 * @param attachment String
	 */
	public void setAttachment(final String attachment) {
		this.attachment = attachment;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'ActivityExecution'.
	 * @return Long aceId
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "FOREIGN_KEY", label = "ActivityExecution")
	public Long getAceId() {
		return aceId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'ActivityExecution'.
	 * @param aceId Long
	 */
	public void setAceId(final Long aceId) {
		this.aceId = aceId;
	}

	/**
	 * Association : ActivityExecution.
	 * @return io.vertigo.orchestra.domain.execution.OActivityExecution
	 */
	public io.vertigo.orchestra.domain.execution.OActivityExecution getActivityExecution() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.execution.OActivityExecution> fkURI = getActivityExecutionURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (activityExecution == null || !fkURI.equals(activityExecution.getURI())) {
			activityExecution = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return activityExecution;
	}

	/**
	 * Retourne l'URI: ActivityExecution.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_ACL_ACE",
			fkFieldName = "ACE_ID",
			primaryDtDefinitionName = "DT_O_ACTIVITY_EXECUTION",
			primaryIsNavigable = true,
			primaryRole = "ActivityExecution",
			primaryLabel = "ActivityExecution",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_ACTIVITY_LOG",
			foreignIsNavigable = false,
			foreignRole = "ActivityLog",
			foreignLabel = "ActivityLog",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.execution.OActivityExecution> getActivityExecutionURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_ACL_ACE", io.vertigo.orchestra.domain.execution.OActivityExecution.class);
	}


	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
