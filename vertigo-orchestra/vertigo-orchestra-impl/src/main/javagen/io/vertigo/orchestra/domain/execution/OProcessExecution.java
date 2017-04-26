package io.vertigo.orchestra.domain.execution;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.model.VAccessor;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.lang.Generated;

/**
 * This class is automatically generated.
 */
 @Generated
@io.vertigo.dynamo.domain.stereotype.DataSpace("orchestra")
public final class OProcessExecution implements Entity {
	private static final long serialVersionUID = 1L;

	private Long preId;
	private java.util.Date beginTime;
	private java.util.Date endTime;
	private String engine;
	private Boolean checked;
	private java.util.Date checkingDate;
	private String checkingComment;
	private final VAccessor<io.vertigo.orchestra.domain.definition.OProcess> processAccessor = new VAccessor(io.vertigo.orchestra.domain.definition.OProcess.class);
	private final VAccessor<io.vertigo.orchestra.domain.referential.OExecutionState> executionStateAccessor = new VAccessor(io.vertigo.orchestra.domain.referential.OExecutionState.class);
	private final VAccessor<io.vertigo.orchestra.domain.referential.OUser> userAccessor = new VAccessor(io.vertigo.orchestra.domain.referential.OUser.class);

	/** {@inheritDoc} */
	@Override
	public URI<OProcessExecution> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id de l'execution d'un processus'.
	 * @return Long preId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "ID", required = true, label = "Id de l'execution d'un processus")
	public Long getPreId() {
		return preId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id de l'execution d'un processus'.
	 * @param preId Long <b>Obligatoire</b>
	 */
	public void setPreId(final Long preId) {
		this.preId = preId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date de début'.
	 * @return java.util.Date beginTime <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_TIMESTAMP", required = true, label = "Date de début")
	public java.util.Date getBeginTime() {
		return beginTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date de début'.
	 * @param beginTime java.util.Date <b>Obligatoire</b>
	 */
	public void setBeginTime(final java.util.Date beginTime) {
		this.beginTime = beginTime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date de fin'.
	 * @return java.util.Date endTime
	 */
	@Field(domain = "DO_O_TIMESTAMP", label = "Date de fin")
	public java.util.Date getEndTime() {
		return endTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date de fin'.
	 * @param endTime java.util.Date
	 */
	public void setEndTime(final java.util.Date endTime) {
		this.endTime = endTime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Implémentation effective de l'execution'.
	 * @return String engine
	 */
	@Field(domain = "DO_O_CLASSE", label = "Implémentation effective de l'execution")
	public String getEngine() {
		return engine;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Implémentation effective de l'execution'.
	 * @param engine String
	 */
	public void setEngine(final String engine) {
		this.engine = engine;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Pris en charge'.
	 * @return Boolean checked
	 */
	@Field(domain = "DO_O_BOOLEEN", label = "Pris en charge")
	public Boolean getChecked() {
		return checked;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Pris en charge'.
	 * @param checked Boolean
	 */
	public void setChecked(final Boolean checked) {
		this.checked = checked;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date de prise en charge'.
	 * @return java.util.Date checkingDate
	 */
	@Field(domain = "DO_O_TIMESTAMP", label = "Date de prise en charge")
	public java.util.Date getCheckingDate() {
		return checkingDate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date de prise en charge'.
	 * @param checkingDate java.util.Date
	 */
	public void setCheckingDate(final java.util.Date checkingDate) {
		this.checkingDate = checkingDate;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Commentaire'.
	 * @return String checkingComment
	 */
	@Field(domain = "DO_O_TEXT", label = "Commentaire")
	public String getCheckingComment() {
		return checkingComment;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Commentaire'.
	 * @param checkingComment String
	 */
	public void setCheckingComment(final String checkingComment) {
		this.checkingComment = checkingComment;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Processus'.
	 * @return Long proId
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "FOREIGN_KEY", label = "Processus")
	public Long getProId() {
		return (Long)  processAccessor.getId();
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Processus'.
	 * @param proId Long
	 */
	public void setProId(final Long proId) {
		processAccessor.setId(proId);
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'ExecutionState'.
	 * @return String estCd
	 */
	@Field(domain = "DO_O_CODE_IDENTIFIANT", type = "FOREIGN_KEY", label = "ExecutionState")
	public String getEstCd() {
		return (String)  executionStateAccessor.getId();
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'ExecutionState'.
	 * @param estCd String
	 */
	public void setEstCd(final String estCd) {
		executionStateAccessor.setId(estCd);
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'User'.
	 * @return Long usrId
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "FOREIGN_KEY", label = "User")
	public Long getUsrId() {
		return (Long)  userAccessor.getId();
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'User'.
	 * @param usrId Long
	 */
	public void setUsrId(final Long usrId) {
		userAccessor.setId(usrId);
	}

	/**
	 * Association : ExecutionState.
	 * @return io.vertigo.orchestra.domain.referential.OExecutionState
	 */
	public io.vertigo.orchestra.domain.referential.OExecutionState getExecutionState() {
		return executionStateAccessor.get();
	}

	/**
	 * Retourne l'URI: ExecutionState.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_PRE_EST",
			fkFieldName = "EST_CD",
			primaryDtDefinitionName = "DT_O_EXECUTION_STATE",
			primaryIsNavigable = true,
			primaryRole = "ExecutionState",
			primaryLabel = "ExecutionState",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_PROCESS_EXECUTION",
			foreignIsNavigable = false,
			foreignRole = "ExecutionProcess",
			foreignLabel = "ExecutionProcessus",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.referential.OExecutionState> getExecutionStateURI() {
		return executionStateAccessor.getURI();
	}

	/**
	 * Association : Processus.
	 * @return io.vertigo.orchestra.domain.definition.OProcess
	 */
	public io.vertigo.orchestra.domain.definition.OProcess getProcess() {
		return processAccessor.get();
	}

	/**
	 * Retourne l'URI: Processus.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_PRE_PRO",
			fkFieldName = "PRO_ID",
			primaryDtDefinitionName = "DT_O_PROCESS",
			primaryIsNavigable = true,
			primaryRole = "Process",
			primaryLabel = "Processus",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_PROCESS_EXECUTION",
			foreignIsNavigable = false,
			foreignRole = "ExecutionProcessus",
			foreignLabel = "ExecutionProcessus",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.definition.OProcess> getProcessURI() {
		return processAccessor.getURI();
	}

	/**
	 * Association : User.
	 * @return io.vertigo.orchestra.domain.referential.OUser
	 */
	public io.vertigo.orchestra.domain.referential.OUser getUser() {
		return userAccessor.get();
	}

	/**
	 * Retourne l'URI: User.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_PRE_USR",
			fkFieldName = "USR_ID",
			primaryDtDefinitionName = "DT_O_USER",
			primaryIsNavigable = true,
			primaryRole = "User",
			primaryLabel = "User",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_PROCESS_EXECUTION",
			foreignIsNavigable = false,
			foreignRole = "ExecutionProcess",
			foreignLabel = "ExecutionProcessus",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.referential.OUser> getUserURI() {
		return userAccessor.getURI();
	}


	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
