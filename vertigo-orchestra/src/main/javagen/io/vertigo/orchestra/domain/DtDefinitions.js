/**
 * These metadata are generated automatically.
 * @type {Object}
 */
module.exports = {
        oJobCron: {
        jcrId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        cronExpression: {
            domain: "DO_O_LABEL",
            required: true
        },
        params: {
            domain: "DO_O_JSON_TEXT",
            required: true
        },
        jmoId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        }
    },
    oJobExec: {
        jid: {
            domain: "DO_O_IDENTIFIANT_JOB",
            required: true
        },
        jobName: {
            domain: "DO_O_LABEL",
            required: true
        },
        nodeId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        startExecDate: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        maxExecDate: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        usrId: {
            domain: "DO_O_IDENTIFIANT",
            required: false
        }
    },
    oJobExecution: {
        jexId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        jobname: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: true
        },
        status: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: true
        },
        reason: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: false
        },
        dateDebut: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        dateFin: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        classEngine: {
            domain: "DO_O_CLASS",
            required: true
        },
        workspaceIn: {
            domain: "DO_O_JSON_TEXT",
            required: true
        },
        workspaceOut: {
            domain: "DO_O_JSON_TEXT",
            required: false
        },
        nodId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        }
    },
    oJobLog: {
        jloId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        dateTrace: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        level: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: true
        },
        typeExecCd: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: true
        },
        message: {
            domain: "DO_O_TEXT",
            required: false
        },
        parametre: {
            domain: "DO_O_TEXT",
            required: false
        },
        erreur: {
            domain: "DO_O_TEXT",
            required: false
        },
        proId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        }
    },
    oJobModel: {
        jmoId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        jobName: {
            domain: "DO_O_LABEL",
            required: true
        },
        desc: {
            domain: "DO_O_LABEL",
            required: true
        },
        classEngine: {
            domain: "DO_O_CLASS",
            required: true
        },
        maxRetry: {
            domain: "DO_O_INTEGER",
            required: true
        },
        runMaxDelay: {
            domain: "DO_O_INTEGER",
            required: true
        },
        execTimeout: {
            domain: "DO_O_INTEGER",
            required: true
        },
        creationDate: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        active: {
            domain: "DO_O_BOOLEAN",
            required: true
        }
    },
    oJobRun: {
        jid: {
            domain: "DO_O_IDENTIFIANT_JOB",
            required: true
        },
        status: {
            domain: "DO_O_STATUS_CODE",
            required: true
        },
        nodeId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        maxDate: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        maxRetry: {
            domain: "DO_O_INTEGER",
            required: true
        },
        currentTry: {
            domain: "DO_O_INTEGER",
            required: true
        }
    },
    oJobSchedule: {
        jscId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        scheduleDate: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        params: {
            domain: "DO_O_JSON_TEXT",
            required: true
        },
        jmoId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        }
    },
    oProcessNextRun: {
        jobname: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: false
        },
        jobId: {
            domain: "DO_O_IDENTIFIANT_JOB",
            required: true
        },
        expectedTime: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        initialParams: {
            domain: "DO_O_JSON_TEXT",
            required: false
        }
    },
    oUser: {
        usrId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        firstName: {
            domain: "DO_O_LABEL",
            required: false
        },
        lastName: {
            domain: "DO_O_LABEL",
            required: false
        },
        email: {
            domain: "DO_O_LABEL",
            required: false
        },
        password: {
            domain: "DO_O_LABEL",
            required: false
        },
        mailAlert: {
            domain: "DO_O_BOOLEAN",
            required: false
        },
        active: {
            domain: "DO_O_BOOLEAN",
            required: false
        }
    }
};
