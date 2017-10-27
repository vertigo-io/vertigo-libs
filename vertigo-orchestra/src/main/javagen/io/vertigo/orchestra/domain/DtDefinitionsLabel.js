/**
 * Attention ce fichier est généré automatiquement !
 * DtDefinitionsLabel
 */

module.exports = {
    oJobCron: {
        jcrId: "id",
        cronExpression: "cron expression",
        params: "init params as JSON",
        jmoId: "JobModel"
    },
    oJobExec: {
        jid: "Id",
        jobName: "Job Name",
        nodeId: "Node Id",
        startExecDate: "Start exec date",
        maxExecDate: "Max date Max execution (start + timeout)",
        usrId: "User"
    },
    oJobExecution: {
        jexId: "Id d'une trace d'execution d'un job",
        jobName: "Status général d'execution",
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
        jmoId: "Id",
        jobName: "Name",
        desc: "Description",
        jobEngineClassName: "Class name of the Job",
        maxRetry: "Max retry limit",
        runMaxDelay: "Max delay in seconds of a run from its scheduled date",
        execTimeout: "Timeout in seconds of a single execution",
        creationDate: "Creation date",
        active: "Active/Inactive"
    },
    oJobRun: {
        jid: "Id",
        status: "Exec status",
        nodeId: "Node Id",
        maxDate: "Max date of the run",
        maxRetry: "Max retry",
        currentTry: "Current try"
    },
    oJobSchedule: {
        jscId: "id",
        scheduleDate: "schedule date",
        params: "init params as JSON",
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
