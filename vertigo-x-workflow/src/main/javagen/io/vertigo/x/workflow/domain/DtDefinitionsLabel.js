/**
 * Attention ce fichier est généré automatiquement !
 * DtDefinitionsLabel
 */

module.exports = {
    wfActivity: {
        wfaId: "Id activity",
        creationDate: "creation date",
        wfwId: "WfWorkflow",
        wfadId: "WfActivityDefinition"
    },
    wfActivityDefinition: {
        wfadId: "Id Activity Definition",
        name: "name",
        level: "level",
        wfmdCode: "WfMultiplicityDefinition",
        wfwdId: "WfWorkflowDefinition"
    },
    wfDecision: {
        wfeId: "Id Decision",
        username: "username",
        choice: "choice",
        decisionDate: "decision date",
        comments: "comments",
        wfaId: "WfActivity"
    },
    wfMultiplicityDefinition: {
        wfmdCode: "Multiplicity code",
        label: "Label"
    },
    wfStatus: {
        wfsCode: "Code Status",
        label: "label"
    },
    wfTransitionDefinition: {
        wftdId: "Id Transition Definition",
        name: "name",
        wfwdId: "WfWorkflowDefinition",
        wfadIdFrom: "transitionFrom",
        wfadIdTo: "transitionTo"
    },
    wfWorkflow: {
        wfwId: "Id Workflow",
        creationDate: "creation date",
        itemId: "itemId",
        username: "username",
        userLogic: "user_logic",
        wfwdId: "WfWorkflowDefinition",
        wfsCode: "WfStatus",
        wfaId2: "current"
    },
    wfWorkflowDefinition: {
        wfwdId: "Id Workflow definition",
        name: "name",
        date: "date",
        wfadId: "startActivity"
    },
    workflowDummy: {
        dummyLong: "dummy long"
    },
    workflowDummyBoolean: {
        dummyBoolean: "dummy boolean"
    }
};
