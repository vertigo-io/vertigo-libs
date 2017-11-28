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
    oJobEvent: {
        jevId: "Id d'une trace d'execution d'un job",
        jobName: "Status général d'execution",
        status: "Status général d'execution",
        reason: "Code d'erreur fonctionel de l'execution",
        startInstant: "Début d'execution",
        endInstant: "Fin d'execution",
        classEngine: "Implémentation effective de l'execution",
        workspaceIn: "Workspace d'entrée de l'execution",
        workspaceOut: "Workspace de sortie de l'execution",
        nodId: "Id du noeud"
    },
    oJobExec: {
        jexId: "Id",
        startExecInstant: "Start exec",
        maxExecInstant: "Max execution (start + timeout)",
        jobId: "JobRun",
        jmoId: "JobModel"
    },
    oJobLog: {
        jloId: "Id d'une trace d'execution d'un job",
        timestamp: "Date de la trace",
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
        creationInstant: "Creation date",
        active: "Active/Inactive"
    },
    oJobRun: {
        jobId: "Id",
        jexId: "Exec UUID",
        alive: "alive y/n",
        status: "Exec status",
        currentTry: "Current try",
        startInstant: "Start date of the run",
        maxInstant: "Max date of the run",
        maxRetry: "Max retry",
        jmoId: "JobModel"
    },
    oJobSchedule: {
        jscId: "id",
        scheduleInstant: "schedule date",
        params: "init params as JSON",
        jmoId: "JobModel"
    },
    oNode: {
        nodId: "Id",
        capacity: "capacity",
        used: "used",
        lastHeartbeat: "Last activity"
    }
};
