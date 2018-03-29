/**
 * Attention ce fichier est généré automatiquement !
 * DtDefinitionsLabel
 */

module.exports = {
    oActivity: {
        actId: "Id Activité",
        name: "Nom de l'activité",
        label: "Libellé de l'activité",
        number: "Numéro de l'activité",
        milestone: "Jalon",
        engine: "Implémentation de l'activité",
        proId: "Processus"
    },
    oActivityExecution: {
        aceId: "Id de l'execution d'un processus",
        creationTime: "Date de création",
        beginTime: "Date de début",
        endTime: "Date de fin",
        engine: "Implémentation effective de l'execution",
        token: "Token d'identification",
        actId: "Activity",
        preId: "Processus",
        nodId: "Node",
        estCd: "ExecutionState"
    },
    oActivityExecutionUi: {
        aceId: "Id de l'activité",
        label: "Libellé",
        beginTime: "Nom du processus",
        endTime: "Nom du processus",
        executionTime: "Durée",
        status: "Statut",
        workspaceIn: "Paramètres entrants",
        workspaceOut: "Paramètres sortants",
        hasAttachment: "Fichier de log",
        hasTechnicalLog: "Log technique"
    },
    oActivityLog: {
        aclId: "Id du log",
        log: "Contenu du log",
        attachment: "Fichier joint",
        aceId: "ActivityExecution"
    },
    oActivityWorkspace: {
        acwId: "Id de l'execution d'un processus",
        isIn: "Workspace in/out",
        workspace: "Contenu du workspace",
        aceId: "ActivityExecution"
    },
    oExecutionState: {
        estCd: "Code",
        label: "Libellé"
    },
    oExecutionSummary: {
        proId: "Id du processus",
        processName: "Nom du processus",
        processLabel: "Libellé du processus",
        lastExecutionTime: "Dernière exécution le",
        nextExecutionTime: "Prochaine exécution le",
        errorsCount: "Nombre en erreur",
        misfiredCount: "Nombre non executés",
        successfulCount: "Nombre en succès",
        runningCount: "Nombre en cours",
        averageExecutionTime: "Durée moyenne d'exécution",
        health: "Santé du processus"
    },
    oNode: {
        nodId: "Id du noeud",
        name: "Nom du noeud",
        heartbeat: "Date de dernière activité"
    },
    oProcess: {
        proId: "Id de la definition du processus",
        name: "Nom du processus",
        label: "Libellé du processus",
        cronExpression: "Expression récurrence du processus",
        initialParams: "Paramètres initiaux sous forme de JSON",
        multiexecution: "Accepte la multi-execution",
        activeVersion: "Version active",
        active: "Processus actif",
        rescuePeriod: "Temps de validité d'une planification",
        metadatas: "Meta-données du processus",
        needUpdate: "Doit être mise à jour lors du démarrage",
        trtCd: "TriggerType",
        prtCd: "ProcessType"
    },
    oProcessExecution: {
        preId: "Id de l'execution d'un processus",
        beginTime: "Date de début",
        endTime: "Date de fin",
        engine: "Implémentation effective de l'execution",
        checked: "Pris en charge",
        checkingDate: "Date de prise en charge",
        checkingComment: "Commentaire",
        proId: "Processus",
        estCd: "ExecutionState",
        usrId: "User"
    },
    oProcessExecutionUi: {
        preId: "Id de l'activité",
        beginTime: "Nom du processus",
        endTime: "Nom du processus",
        executionTime: "Durée",
        status: "Statut",
        checked: "Pris en charge",
        checkingDate: "Date de prise en charge",
        checkingComment: "Commentaire",
        hasAttachment: "Fichier de log"
    },
    oProcessPlanification: {
        prpId: "Id Planification",
        expectedTime: "Date d'execution prévue",
        initialParams: "Paramètres initiaux sous forme de JSON",
        proId: "Processus",
        nodId: "Node",
        sstCd: "PlanificationState"
    },
    oProcessType: {
        prtCd: "Code",
        label: "Libellé"
    },
    oProcessUi: {
        proId: "Id du processus",
        name: "Nom du processus",
        label: "Libellé du processus",
        cronExpression: "Expression récurrence du processus",
        initialParams: "Paramètres initiaux sous forme de JSON",
        multiexecution: "Accepte la multi-execution",
        active: "Processus actif",
        rescuePeriod: "Temps de validité d'une planification",
        metadatas: "Métadonnées du processus"
    },
    oSchedulerState: {
        sstCd: "Code",
        label: "Libellé"
    },
    oUser: {
        usrId: "Id",
        firstName: "Nom",
        lastName: "Prénom",
        email: "Email",
        password: "Mot de passe",
        mailAlert: "Alerté en cas d'erreur",
        active: "Compte Actif"
    },
    triggerType: {
        trtCd: "Code",
        label: "Libellé"
    }
};
