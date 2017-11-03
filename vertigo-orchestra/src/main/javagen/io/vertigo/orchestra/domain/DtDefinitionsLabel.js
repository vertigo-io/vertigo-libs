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
        jevtId: "Id d'une trace d'execution d'un job",
        jobName: "Status général d'execution",
        status: "Status général d'execution",
        reason: "Code d'erreur fonctionel de l'execution",
        startDate: "Date de début d'execution",
        endDate: "Date de fin d'execution",
        classEngine: "Implémentation effective de l'execution",
        workspaceIn: "Workspace d'entrée de l'execution",
        workspaceOut: "Workspace de sortie de l'execution",
        nodId: "Id du noeud"
    },
    oJobExec: {
        jobId: "Id",
        jobExecUuid: "Exec UUID",
        startExecDate: "Start exec date",
        maxExecDate: "Max date Max execution (start + timeout)",
        jobName: "Job Name",
        nodeId: "Node Id"
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
        jobId: "Id",
        jobExecUuid: "Exec UUID",
        status: "Exec status",
        currentTry: "Current try",
        maxDate: "Max date of the run",
        maxRetry: "Max retry"
    },
    oJobSchedule: {
        jscId: "id",
        scheduleDate: "schedule date",
        params: "init params as JSON",
        jmoId: "JobModel"
    }
};
