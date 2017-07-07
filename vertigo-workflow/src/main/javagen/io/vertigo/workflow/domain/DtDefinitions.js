/**
 * These metadata are generated automatically.
 * @type {Object}
 */
module.exports = {
        wfActivity: {
        wfaId: {
            domain: "DO_WF_ID",
            required: true
        },
        creationDate: {
            domain: "DO_WF_DATE",
            required: false
        },
        wfwId: {
            domain: "DO_WF_ID",
            required: true
        },
        wfadId: {
            domain: "DO_WF_ID",
            required: true
        }
    },
    wfActivityDefinition: {
        wfadId: {
            domain: "DO_WF_ID",
            required: true
        },
        name: {
            domain: "DO_WF_LABEL",
            required: false
        },
        level: {
            domain: "DO_WF_LEVEL",
            required: false
        },
        wfmdCode: {
            domain: "DO_WF_CODE",
            required: false
        },
        wfwdId: {
            domain: "DO_WF_ID",
            required: true
        }
    },
    wfDecision: {
        wfeId: {
            domain: "DO_WF_ID",
            required: true
        },
        username: {
            domain: "DO_WF_USER",
            required: false
        },
        choice: {
            domain: "DO_WF_CHOICE",
            required: false
        },
        decisionDate: {
            domain: "DO_WF_DATE",
            required: false
        },
        comments: {
            domain: "DO_WF_COMMENTS",
            required: false
        },
        wfaId: {
            domain: "DO_WF_ID",
            required: false
        }
    },
    wfMultiplicityDefinition: {
        wfmdCode: {
            domain: "DO_WF_CODE",
            required: true
        },
        label: {
            domain: "DO_WF_LABEL",
            required: false
        }
    },
    wfStatus: {
        wfsCode: {
            domain: "DO_WF_CODE",
            required: true
        },
        label: {
            domain: "DO_WF_LABEL",
            required: false
        }
    },
    wfTransitionDefinition: {
        wftdId: {
            domain: "DO_WF_ID",
            required: true
        },
        name: {
            domain: "DO_WF_LABEL",
            required: true
        },
        wfwdId: {
            domain: "DO_WF_ID",
            required: false
        },
        wfadIdFrom: {
            domain: "DO_WF_ID",
            required: true
        },
        wfadIdTo: {
            domain: "DO_WF_ID",
            required: true
        }
    },
    wfWorkflow: {
        wfwId: {
            domain: "DO_WF_ID",
            required: true
        },
        creationDate: {
            domain: "DO_WF_DATE",
            required: false
        },
        itemId: {
            domain: "DO_WF_WEAK_ID",
            required: false
        },
        username: {
            domain: "DO_WF_USER",
            required: false
        },
        userLogic: {
            domain: "DO_WF_FLAG",
            required: true
        },
        wfwdId: {
            domain: "DO_WF_ID",
            required: true
        },
        wfsCode: {
            domain: "DO_WF_CODE",
            required: true
        },
        wfaId2: {
            domain: "DO_WF_ID",
            required: false
        }
    },
    wfWorkflowDefinition: {
        wfwdId: {
            domain: "DO_WF_ID",
            required: true
        },
        name: {
            domain: "DO_WF_LABEL",
            required: false
        },
        date: {
            domain: "DO_WF_DATE",
            required: false
        },
        wfadId: {
            domain: "DO_WF_ID",
            required: false
        }
    }
};
