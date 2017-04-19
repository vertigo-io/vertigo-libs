package io.vertigo.orchestra.domain;

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
		/** Objet de données OActivity. */
		OActivity(io.vertigo.orchestra.domain.definition.OActivity.class),
		/** Objet de données OActivityExecution. */
		OActivityExecution(io.vertigo.orchestra.domain.execution.OActivityExecution.class),
		/** Objet de données OActivityExecutionUi. */
		OActivityExecutionUi(io.vertigo.orchestra.monitoring.domain.uiexecutions.OActivityExecutionUi.class),
		/** Objet de données OActivityLog. */
		OActivityLog(io.vertigo.orchestra.domain.execution.OActivityLog.class),
		/** Objet de données OActivityWorkspace. */
		OActivityWorkspace(io.vertigo.orchestra.domain.execution.OActivityWorkspace.class),
		/** Objet de données OExecutionState. */
		OExecutionState(io.vertigo.orchestra.domain.referential.OExecutionState.class),
		/** Objet de données OExecutionSummary. */
		OExecutionSummary(io.vertigo.orchestra.monitoring.domain.summary.OExecutionSummary.class),
		/** Objet de données ONode. */
		ONode(io.vertigo.orchestra.domain.execution.ONode.class),
		/** Objet de données OProcess. */
		OProcess(io.vertigo.orchestra.domain.definition.OProcess.class),
		/** Objet de données OProcessExecution. */
		OProcessExecution(io.vertigo.orchestra.domain.execution.OProcessExecution.class),
		/** Objet de données OProcessExecutionUi. */
		OProcessExecutionUi(io.vertigo.orchestra.monitoring.domain.uiexecutions.OProcessExecutionUi.class),
		/** Objet de données OProcessPlanification. */
		OProcessPlanification(io.vertigo.orchestra.domain.planification.OProcessPlanification.class),
		/** Objet de données OProcessType. */
		OProcessType(io.vertigo.orchestra.domain.referential.OProcessType.class),
		/** Objet de données OProcessUi. */
		OProcessUi(io.vertigo.orchestra.monitoring.domain.uidefinitions.OProcessUi.class),
		/** Objet de données OSchedulerState. */
		OSchedulerState(io.vertigo.orchestra.domain.referential.OSchedulerState.class),
		/** Objet de données OUser. */
		OUser(io.vertigo.orchestra.domain.referential.OUser.class),
		/** Objet de données TriggerType. */
		TriggerType(io.vertigo.orchestra.domain.referential.TriggerType.class),
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
	 * Enumération des champs de OActivity.
	 */
	public enum OActivityFields implements DtFieldName<io.vertigo.orchestra.domain.definition.OActivity> {
		/** Propriété 'Id Activité'. */
		ACT_ID,
		/** Propriété 'Nom de l'activité'. */
		NAME,
		/** Propriété 'Libellé de l'activité'. */
		LABEL,
		/** Propriété 'Numéro de l'activité'. */
		NUMBER,
		/** Propriété 'Jalon'. */
		MILESTONE,
		/** Propriété 'Implémentation de l'activité'. */
		ENGINE,
		/** Propriété 'Processus'. */
		PRO_ID,
	}

	/**
	 * Enumération des champs de OActivityExecution.
	 */
	public enum OActivityExecutionFields implements DtFieldName<io.vertigo.orchestra.domain.execution.OActivityExecution> {
		/** Propriété 'Id de l'execution d'un processus'. */
		ACE_ID,
		/** Propriété 'Date de création'. */
		CREATION_TIME,
		/** Propriété 'Date de début'. */
		BEGIN_TIME,
		/** Propriété 'Date de fin'. */
		END_TIME,
		/** Propriété 'Implémentation effective de l'execution'. */
		ENGINE,
		/** Propriété 'Token d'identification'. */
		TOKEN,
		/** Propriété 'Activity'. */
		ACT_ID,
		/** Propriété 'Processus'. */
		PRE_ID,
		/** Propriété 'Node'. */
		NOD_ID,
		/** Propriété 'ExecutionState'. */
		EST_CD,
	}

	/**
	 * Enumération des champs de OActivityExecutionUi.
	 */
	public enum OActivityExecutionUiFields implements DtFieldName<io.vertigo.orchestra.monitoring.domain.uiexecutions.OActivityExecutionUi> {
		/** Propriété 'Id de l'activité'. */
		ACE_ID,
		/** Propriété 'Libellé'. */
		LABEL,
		/** Propriété 'Nom du processus'. */
		BEGIN_TIME,
		/** Propriété 'Nom du processus'. */
		END_TIME,
		/** Propriété 'Durée'. */
		EXECUTION_TIME,
		/** Propriété 'Statut'. */
		STATUS,
		/** Propriété 'Paramètres entrants'. */
		WORKSPACE_IN,
		/** Propriété 'Paramètres sortants'. */
		WORKSPACE_OUT,
		/** Propriété 'Fichier de log'. */
		HAS_ATTACHMENT,
		/** Propriété 'Log technique'. */
		HAS_TECHNICAL_LOG,
	}

	/**
	 * Enumération des champs de OActivityLog.
	 */
	public enum OActivityLogFields implements DtFieldName<io.vertigo.orchestra.domain.execution.OActivityLog> {
		/** Propriété 'Id du log'. */
		ACL_ID,
		/** Propriété 'Contenu du log'. */
		LOG,
		/** Propriété 'Fichier joint'. */
		ATTACHMENT,
		/** Propriété 'ActivityExecution'. */
		ACE_ID,
	}

	/**
	 * Enumération des champs de OActivityWorkspace.
	 */
	public enum OActivityWorkspaceFields implements DtFieldName<io.vertigo.orchestra.domain.execution.OActivityWorkspace> {
		/** Propriété 'Id de l'execution d'un processus'. */
		ACW_ID,
		/** Propriété 'Workspace in/out'. */
		IS_IN,
		/** Propriété 'Contenu du workspace'. */
		WORKSPACE,
		/** Propriété 'ActivityExecution'. */
		ACE_ID,
	}

	/**
	 * Enumération des champs de OExecutionState.
	 */
	public enum OExecutionStateFields implements DtFieldName<io.vertigo.orchestra.domain.referential.OExecutionState> {
		/** Propriété 'Code'. */
		EST_CD,
		/** Propriété 'Libellé'. */
		LABEL,
	}

	/**
	 * Enumération des champs de OExecutionSummary.
	 */
	public enum OExecutionSummaryFields implements DtFieldName<io.vertigo.orchestra.monitoring.domain.summary.OExecutionSummary> {
		/** Propriété 'Id du processus'. */
		PRO_ID,
		/** Propriété 'Nom du processus'. */
		PROCESS_NAME,
		/** Propriété 'Libellé du processus'. */
		PROCESS_LABEL,
		/** Propriété 'Dernière exécution le'. */
		LAST_EXECUTION_TIME,
		/** Propriété 'Prochaine exécution le'. */
		NEXT_EXECUTION_TIME,
		/** Propriété 'Nombre en erreur'. */
		ERRORS_COUNT,
		/** Propriété 'Nombre non executés'. */
		MISFIRED_COUNT,
		/** Propriété 'Nombre en succès'. */
		SUCCESSFUL_COUNT,
		/** Propriété 'Nombre en cours'. */
		RUNNING_COUNT,
		/** Propriété 'Durée moyenne d'exécution'. */
		AVERAGE_EXECUTION_TIME,
		/** Propriété 'Santé du processus'. */
		HEALTH,
	}

	/**
	 * Enumération des champs de ONode.
	 */
	public enum ONodeFields implements DtFieldName<io.vertigo.orchestra.domain.execution.ONode> {
		/** Propriété 'Id du noeud'. */
		NOD_ID,
		/** Propriété 'Nom du noeud'. */
		NAME,
		/** Propriété 'Date de dernière activité'. */
		HEARTBEAT,
	}

	/**
	 * Enumération des champs de OProcess.
	 */
	public enum OProcessFields implements DtFieldName<io.vertigo.orchestra.domain.definition.OProcess> {
		/** Propriété 'Id de la definition du processus'. */
		PRO_ID,
		/** Propriété 'Nom du processus'. */
		NAME,
		/** Propriété 'Libellé du processus'. */
		LABEL,
		/** Propriété 'Expression récurrence du processus'. */
		CRON_EXPRESSION,
		/** Propriété 'Paramètres initiaux sous forme de JSON'. */
		INITIAL_PARAMS,
		/** Propriété 'Accepte la multi-execution'. */
		MULTIEXECUTION,
		/** Propriété 'Version active'. */
		ACTIVE_VERSION,
		/** Propriété 'Processus actif'. */
		ACTIVE,
		/** Propriété 'Temps de validité d'une planification'. */
		RESCUE_PERIOD,
		/** Propriété 'Meta-données du processus'. */
		METADATAS,
		/** Propriété 'Doit être mise à jour lors du démarrage'. */
		NEED_UPDATE,
		/** Propriété 'TriggerType'. */
		TRT_CD,
		/** Propriété 'ProcessType'. */
		PRT_CD,
	}

	/**
	 * Enumération des champs de OProcessExecution.
	 */
	public enum OProcessExecutionFields implements DtFieldName<io.vertigo.orchestra.domain.execution.OProcessExecution> {
		/** Propriété 'Id de l'execution d'un processus'. */
		PRE_ID,
		/** Propriété 'Date de début'. */
		BEGIN_TIME,
		/** Propriété 'Date de fin'. */
		END_TIME,
		/** Propriété 'Implémentation effective de l'execution'. */
		ENGINE,
		/** Propriété 'Pris en charge'. */
		CHECKED,
		/** Propriété 'Date de prise en charge'. */
		CHECKING_DATE,
		/** Propriété 'Commentaire'. */
		CHECKING_COMMENT,
		/** Propriété 'Processus'. */
		PRO_ID,
		/** Propriété 'ExecutionState'. */
		EST_CD,
		/** Propriété 'User'. */
		USR_ID,
	}

	/**
	 * Enumération des champs de OProcessExecutionUi.
	 */
	public enum OProcessExecutionUiFields implements DtFieldName<io.vertigo.orchestra.monitoring.domain.uiexecutions.OProcessExecutionUi> {
		/** Propriété 'Id de l'activité'. */
		PRE_ID,
		/** Propriété 'Nom du processus'. */
		BEGIN_TIME,
		/** Propriété 'Nom du processus'. */
		END_TIME,
		/** Propriété 'Durée'. */
		EXECUTION_TIME,
		/** Propriété 'Statut'. */
		STATUS,
		/** Propriété 'Pris en charge'. */
		CHECKED,
		/** Propriété 'Date de prise en charge'. */
		CHECKING_DATE,
		/** Propriété 'Commentaire'. */
		CHECKING_COMMENT,
		/** Propriété 'Fichier de log'. */
		HAS_ATTACHMENT,
	}

	/**
	 * Enumération des champs de OProcessPlanification.
	 */
	public enum OProcessPlanificationFields implements DtFieldName<io.vertigo.orchestra.domain.planification.OProcessPlanification> {
		/** Propriété 'Id Planification'. */
		PRP_ID,
		/** Propriété 'Date d'execution prévue'. */
		EXPECTED_TIME,
		/** Propriété 'Paramètres initiaux sous forme de JSON'. */
		INITIAL_PARAMS,
		/** Propriété 'Processus'. */
		PRO_ID,
		/** Propriété 'Node'. */
		NOD_ID,
		/** Propriété 'PlanificationState'. */
		SST_CD,
	}

	/**
	 * Enumération des champs de OProcessType.
	 */
	public enum OProcessTypeFields implements DtFieldName<io.vertigo.orchestra.domain.referential.OProcessType> {
		/** Propriété 'Code'. */
		PRT_CD,
		/** Propriété 'Libellé'. */
		LABEL,
	}

	/**
	 * Enumération des champs de OProcessUi.
	 */
	public enum OProcessUiFields implements DtFieldName<io.vertigo.orchestra.monitoring.domain.uidefinitions.OProcessUi> {
		/** Propriété 'Id du processus'. */
		PRO_ID,
		/** Propriété 'Nom du processus'. */
		NAME,
		/** Propriété 'Libellé du processus'. */
		LABEL,
		/** Propriété 'Expression récurrence du processus'. */
		CRON_EXPRESSION,
		/** Propriété 'Paramètres initiaux sous forme de JSON'. */
		INITIAL_PARAMS,
		/** Propriété 'Accepte la multi-execution'. */
		MULTIEXECUTION,
		/** Propriété 'Processus actif'. */
		ACTIVE,
		/** Propriété 'Temps de validité d'une planification'. */
		RESCUE_PERIOD,
		/** Propriété 'Métadonnées du processus'. */
		METADATAS,
	}

	/**
	 * Enumération des champs de OSchedulerState.
	 */
	public enum OSchedulerStateFields implements DtFieldName<io.vertigo.orchestra.domain.referential.OSchedulerState> {
		/** Propriété 'Code'. */
		SST_CD,
		/** Propriété 'Libellé'. */
		LABEL,
	}

	/**
	 * Enumération des champs de OUser.
	 */
	public enum OUserFields implements DtFieldName<io.vertigo.orchestra.domain.referential.OUser> {
		/** Propriété 'Id'. */
		USR_ID,
		/** Propriété 'Nom'. */
		FIRST_NAME,
		/** Propriété 'Prénom'. */
		LAST_NAME,
		/** Propriété 'Email'. */
		EMAIL,
		/** Propriété 'Mot de passe'. */
		PASSWORD,
		/** Propriété 'Alerté en cas d'erreur'. */
		MAIL_ALERT,
		/** Propriété 'Compte Actif'. */
		ACTIVE,
	}

	/**
	 * Enumération des champs de TriggerType.
	 */
	public enum TriggerTypeFields implements DtFieldName<io.vertigo.orchestra.domain.referential.TriggerType> {
		/** Propriété 'Code'. */
		TRT_CD,
		/** Propriété 'Libellé'. */
		LABEL,
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
