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
    oJobEvent: {
        jevId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        jobName: {
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
        startDate: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        endDate: {
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
    oJobExec: {
        jexId: {
            domain: "DO_O_UUID",
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
        jobId: {
            domain: "DO_O_JOB_IDENTIFIANT",
            required: true
        },
        jmoId: {
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
        jobEngineClassName: {
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
        jobId: {
            domain: "DO_O_JOB_IDENTIFIANT",
            required: true
        },
        jexId: {
            domain: "DO_O_UUID",
            required: false
        },
        alive: {
            domain: "DO_O_BOOLEAN",
            required: true
        },
        status: {
            domain: "DO_O_STATUS_CODE",
            required: true
        },
        currentTry: {
            domain: "DO_O_INTEGER",
            required: true
        },
        startDate: {
            domain: "DO_O_TIMESTAMP",
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
        jmoId: {
            domain: "DO_O_IDENTIFIANT",
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
    oNode: {
        nodId: {
            domain: "DO_O_UUID",
            required: true
        },
        lastHeartbeat: {
            domain: "DO_O_TIMESTAMP",
            required: true
        }
    }
};
