/**
 * These metadata are generated automatically.
 * @type {Object}
 */
module.exports = {
        oActivityExecutionUi: {
        aceId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        label: {
            domain: "DO_O_LIBELLE",
            required: false
        },
        beginTime: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        endTime: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        executionTime: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        status: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: false
        },
        workspaceIn: {
            domain: "DO_O_JSON_TEXT",
            required: false
        },
        workspaceOut: {
            domain: "DO_O_JSON_TEXT",
            required: false
        },
        hasLogFile: {
            domain: "DO_O_BOOLEEN",
            required: false
        },
        hasTechnicalLog: {
            domain: "DO_O_BOOLEEN",
            required: false
        }
    },
    oExecutionSummary: {
        proId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        processName: {
            domain: "DO_O_LIBELLE",
            required: true
        },
        processLabel: {
            domain: "DO_O_LIBELLE",
            required: true
        },
        lastExecutionTime: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        nextExecutionTime: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        errorsCount: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        misfiredCount: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        successfulCount: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        runningCount: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        averageExecutionTime: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        health: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: true
        }
    },
    oProcessExecutionUi: {
        preId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        beginTime: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        endTime: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        executionTime: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        status: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: false
        },
        checked: {
            domain: "DO_O_BOOLEEN",
            required: false
        },
        checkingDate: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        checkingComment: {
            domain: "DO_O_TEXT",
            required: false
        },
        hasLogFile: {
            domain: "DO_O_BOOLEEN",
            required: false
        }
    },
    oProcessUi: {
        proId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        name: {
            domain: "DO_O_LIBELLE",
            required: false
        },
        label: {
            domain: "DO_O_LIBELLE",
            required: false
        },
        cronExpression: {
            domain: "DO_O_LIBELLE",
            required: false
        },
        initialParams: {
            domain: "DO_O_JSON_TEXT",
            required: false
        },
        multiExecution: {
            domain: "DO_O_BOOLEEN",
            required: false
        },
        active: {
            domain: "DO_O_BOOLEEN",
            required: true
        },
        rescuePeriod: {
            domain: "DO_O_NOMBRE",
            required: true
        },
        metadatas: {
            domain: "DO_O_METADATAS",
            required: false
        }
    }
};
