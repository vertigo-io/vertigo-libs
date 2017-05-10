/**
 * These metadata are generated automatically.
 * @type {Object}
 */
module.exports = {
        oActivity: {
        actId: {
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
        number: {
            domain: "DO_O_NOMBRE",
            required: false
        },
        milestone: {
            domain: "DO_O_BOOLEEN",
            required: false
        },
        engine: {
            domain: "DO_O_CLASSE",
            required: false
        },
        proId: {
            domain: "DO_O_IDENTIFIANT",
            required: false
        }
    },
    oActivityExecution: {
        aceId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        creationTime: {
            domain: "DO_O_TIMESTAMP",
            required: true
        },
        beginTime: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        endTime: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        engine: {
            domain: "DO_O_CLASSE",
            required: false
        },
        token: {
            domain: "DO_O_TOKEN",
            required: false
        },
        nodeId: {
            domain: "DO_O_TEXT",
            required: false
        },
        actId: {
            domain: "DO_O_IDENTIFIANT",
            required: false
        },
        preId: {
            domain: "DO_O_IDENTIFIANT",
            required: false
        },
        estCd: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: false
        }
    },
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
        hasAttachment: {
            domain: "DO_O_BOOLEEN",
            required: false
        },
        hasTechnicalLog: {
            domain: "DO_O_BOOLEEN",
            required: false
        }
    },
    oActivityLog: {
        aclId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        log: {
            domain: "DO_O_TEXT",
            required: false
        },
        attachment: {
            domain: "DO_O_TEXT",
            required: false
        },
        aceId: {
            domain: "DO_O_IDENTIFIANT",
            required: false
        }
    },
    oActivityWorkspace: {
        acwId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        isIn: {
            domain: "DO_O_BOOLEEN",
            required: true
        },
        workspace: {
            domain: "DO_O_JSON_TEXT",
            required: false
        },
        aceId: {
            domain: "DO_O_IDENTIFIANT",
            required: false
        }
    },
    oExecutionState: {
        estCd: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: true
        },
        label: {
            domain: "DO_O_LIBELLE",
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
    oProcess: {
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
        multiexecution: {
            domain: "DO_O_BOOLEEN",
            required: false
        },
        activeVersion: {
            domain: "DO_O_BOOLEEN",
            required: true
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
        },
        needUpdate: {
            domain: "DO_O_BOOLEEN",
            required: true
        },
        trtCd: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: false
        },
        prtCd: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: false
        }
    },
    oProcessExecution: {
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
            required: false
        },
        engine: {
            domain: "DO_O_CLASSE",
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
        proId: {
            domain: "DO_O_IDENTIFIANT",
            required: false
        },
        estCd: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: false
        },
        usrId: {
            domain: "DO_O_IDENTIFIANT",
            required: false
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
        hasAttachment: {
            domain: "DO_O_BOOLEEN",
            required: false
        }
    },
    oProcessPlanification: {
        prpId: {
            domain: "DO_O_IDENTIFIANT",
            required: true
        },
        expectedTime: {
            domain: "DO_O_TIMESTAMP",
            required: false
        },
        initialParams: {
            domain: "DO_O_JSON_TEXT",
            required: false
        },
        nodeId: {
            domain: "DO_O_TEXT",
            required: false
        },
        proId: {
            domain: "DO_O_IDENTIFIANT",
            required: false
        },
        sstCd: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: false
        }
    },
    oProcessType: {
        prtCd: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: true
        },
        label: {
            domain: "DO_O_LIBELLE",
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
        multiexecution: {
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
    },
    oSchedulerState: {
        sstCd: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: true
        },
        label: {
            domain: "DO_O_LIBELLE",
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
    },
    triggerType: {
        trtCd: {
            domain: "DO_O_CODE_IDENTIFIANT",
            required: true
        },
        label: {
            domain: "DO_O_LIBELLE",
            required: false
        }
    }
};
