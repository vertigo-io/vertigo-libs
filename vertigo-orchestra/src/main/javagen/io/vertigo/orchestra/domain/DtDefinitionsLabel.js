/**
 * Attention ce fichier est généré automatiquement !
 * DtDefinitionsLabel
 */

module.exports = {
    oJobBoard: {
        jid: "Id de l'execution du job",
        status: "Status de l'execution",
        nodeId: "Id du noeud",
        maxDate: "Date max d'execution",
        maxRetry: "Nb max de retry",
        currentRetry: "Nb courrant de retry"
    },
    oJobCron: {
        jcrId: "Id de la definition du schedule CRON",
        cronExpression: "Expression récurrence du processus",
        params: "Paramètres initiaux sous forme de JSON",
        jmoId: "JobModel"
    },
    oJobExecution: {
        jexId: "Id d'une trace d'execution d'un job",
        jobname: "Status général d'execution",
        status: "Status général d'execution",
        reason: "Code d'erreur fonctionel de l'execution",
        dateDebut: "Date de début d'execution",
        dateFin: "Date de fin d'execution",
        classEngine: "Implémentation effective de l'execution",
        workspaceIn: "Workspace d'entrée de l'execution",
        workspaceOut: "Workspace de sortie de l'execution",
        nodId: "Id du noeud"
    },
    oJobLog: {
        jloId: "Id d'une trace d'execution d'un job",
        dateTrace: "Date de la trace",
        level: "Niveau de la trace",
        typeExecCd: "Type de trace",
        message: "Message",
        parametre: "Paramètre",
        erreur: "Stacktrace d'erreur",
        proId: "JobExecution"
    },
    oJobModel: {
        jmoId: "Identifiant du Model de Job",
        jobname: "Nom du job",
        desc: "Description du job",
        classEngine: "Classe d'implémentation du Job",
        maxRetry: "Nombre max de retry",
        maxDelay: "Delai max de d'excution/retry",
        timeout: "Délai max de d'attente d'execution",
        creationDate: "Date de création",
        active: "Job Actif/Inactif"
    },
    oJobRunning: {
        jid: "Id de l'execution du job",
        jobname: "Nom du job",
        nodeId: "Id du noeud",
        execDate: "Date d'execution",
        maxExecDate: "Date Max d'execution (Date d'exec + TO)",
        usrId: "User"
    },
    oJobSchedule: {
        jscId: "Id de la definition de la planification à date",
        scheduleDate: "Date d'execution prévue",
        params: "Paramètres initiaux sous forme de JSON",
        jmoId: "JobModel"
    },
    oProcessNextRun: {
        jobname: "Nom du job",
        jobId: "Job Id",
        expectedTime: "Date d'execution prévue",
        initialParams: "Paramètres initiaux sous forme de JSON"
    },
    oUser: {
        usrId: "Id",
        firstName: "Nom",
        lastName: "Prénom",
        email: "Email",
        password: "Mot de passe",
        mailAlert: "Alerté en cas d'erreur",
        active: "Compte Actif"
    }
};
