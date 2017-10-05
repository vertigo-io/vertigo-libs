/**
 * These metadata are generated automatically.
 * @type {Object}
 */
module.exports = {
        oJobBoard: {
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
            required: false
        },
        maxRetry: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        currentRetry: {
            domain: "DO_O_NOMBRE",
            required: false
        }
    },
    oJobCron: {
        jcrId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        cronExpression: {
            domain: "DO_O_LIBELLE",
            required: false
        },
        params: {
            domain: "DO_O_JSON_TEXT",
            required: false
        },
        jmoId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
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
            domain: "DO_O_CLASSE",
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
        jobname: {
            domain: "DO_O_LIBELLE",
            required: false
        },
        desc: {
            domain: "DO_O_LIBELLE",
            required: false
        },
        classEngine: {
            domain: "DO_O_CLASSE",
            required: false
        },
        maxRetry: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        maxDelay: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        timeout: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        creationDate: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        active: {
            domain: "DO_O_BOOLEEN",
            required: false
        }
    },
    oJobRunning: {
        jid: {
            domain: "DO_O_IDENTIFIANT_JOB",
            required: true
        },
        jobname: {
            domain: "DO_O_LIBELLE",
            required: false
        },
        nodeId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        execDate: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        maxExecDate: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        usrId: {
            domain: "DO_O_IDENTIFIANT",
            required: false
        }
    },
    oJobSchedule: {
        jscId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        scheduleDate: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        params: {
            domain: "DO_O_JSON_TEXT",
            required: false
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
            domain: "DO_O_LIBELLE",
            required: false
        },
        lastName: {
            domain: "DO_O_LIBELLE",
            required: false
        },
        email: {
            domain: "DO_O_LIBELLE",
            required: false
        },
        password: {
            domain: "DO_O_LIBELLE",
            required: false
        },
        mailAlert: {
            domain: "DO_O_BOOLEEN",
            required: false
        },
        active: {
            domain: "DO_O_BOOLEEN",
            required: false
        }
    }
};
