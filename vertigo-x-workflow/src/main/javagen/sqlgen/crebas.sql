-- ============================================================
--   Nom de SGBD      :  sqlserver                     
--   Date de création :  12 janv. 2017  15:10:08                     
-- ============================================================




-- ============================================================
--   Table : WF_ACTIVITY                                        
-- ============================================================
create table WF_ACTIVITY
(
    WFA_ID      	 NUMERIC     	identity,
    CREATION_DATE	 DATE        	,
    WFW_ID      	 NUMERIC     	not null,
    WFAD_ID     	 NUMERIC     	not null,
    constraint PK_WF_ACTIVITY primary key nonclustered (WFA_ID)
);

comment on column WF_ACTIVITY.WFA_ID is
'Id activity';

comment on column WF_ACTIVITY.CREATION_DATE is
'creation date';

comment on column WF_ACTIVITY.WFW_ID is
'WfWorkflow';

comment on column WF_ACTIVITY.WFAD_ID is
'WfActivityDefinition';

-- ============================================================
--   Table : WF_ACTIVITY_DEFINITION                                        
-- ============================================================
create table WF_ACTIVITY_DEFINITION
(
    WFAD_ID     	 NUMERIC     	identity,
    NAME        	 VARCHAR(100)	,
    LEVEL       	 NUMERIC     	,
    WFMD_CODE   	 VARCHAR(100)	,
    WFWD_ID     	 NUMERIC     	not null,
    constraint PK_WF_ACTIVITY_DEFINITION primary key nonclustered (WFAD_ID)
);

comment on column WF_ACTIVITY_DEFINITION.WFAD_ID is
'Id Activity Definition';

comment on column WF_ACTIVITY_DEFINITION.NAME is
'name';

comment on column WF_ACTIVITY_DEFINITION.LEVEL is
'level';

comment on column WF_ACTIVITY_DEFINITION.WFMD_CODE is
'WfMultiplicityDefinition';

comment on column WF_ACTIVITY_DEFINITION.WFWD_ID is
'WfWorkflowDefinition';

-- ============================================================
--   Table : WF_DECISION                                        
-- ============================================================
create table WF_DECISION
(
    WFE_ID      	 NUMERIC     	identity,
    USERNAME    	 VARCHAR(100)	,
    CHOICE      	 NUMERIC     	,
    DECISION_DATE	 DATE        	,
    COMMENTS    	 VARCHAR(3000)	,
    WFA_ID      	 NUMERIC     	,
    constraint PK_WF_DECISION primary key nonclustered (WFE_ID)
);

comment on column WF_DECISION.WFE_ID is
'Id Decision';

comment on column WF_DECISION.USERNAME is
'username';

comment on column WF_DECISION.CHOICE is
'choice';

comment on column WF_DECISION.DECISION_DATE is
'decision date';

comment on column WF_DECISION.COMMENTS is
'comments';

comment on column WF_DECISION.WFA_ID is
'WfActivity';

-- ============================================================
--   Table : WF_MULTIPLICITY_DEFINITION                                        
-- ============================================================
create table WF_MULTIPLICITY_DEFINITION
(
    WFMD_CODE   	 VARCHAR(100)	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_WF_MULTIPLICITY_DEFINITION primary key nonclustered (WFMD_CODE)
);

comment on column WF_MULTIPLICITY_DEFINITION.WFMD_CODE is
'Multiplicity code';

comment on column WF_MULTIPLICITY_DEFINITION.LABEL is
'Label';

-- ============================================================
--   Table : WF_STATUS                                        
-- ============================================================
create table WF_STATUS
(
    WFS_CODE    	 VARCHAR(100)	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_WF_STATUS primary key nonclustered (WFS_CODE)
);

comment on column WF_STATUS.WFS_CODE is
'Code Status';

comment on column WF_STATUS.LABEL is
'label';

-- ============================================================
--   Table : WF_TRANSITION_DEFINITION                                        
-- ============================================================
create table WF_TRANSITION_DEFINITION
(
    WFTD_ID     	 NUMERIC     	identity,
    NAME        	 VARCHAR(100)	not null,
    WFWD_ID     	 NUMERIC     	,
    WFAD_ID_FROM	 NUMERIC     	not null,
    WFAD_ID_TO  	 NUMERIC     	not null,
    constraint PK_WF_TRANSITION_DEFINITION primary key nonclustered (WFTD_ID)
);

comment on column WF_TRANSITION_DEFINITION.WFTD_ID is
'Id Transition Definition';

comment on column WF_TRANSITION_DEFINITION.NAME is
'name';

comment on column WF_TRANSITION_DEFINITION.WFWD_ID is
'WfWorkflowDefinition';

comment on column WF_TRANSITION_DEFINITION.WFAD_ID_FROM is
'transitionFrom';

comment on column WF_TRANSITION_DEFINITION.WFAD_ID_TO is
'transitionTo';

-- ============================================================
--   Table : WF_WORKFLOW                                        
-- ============================================================
create table WF_WORKFLOW
(
    WFW_ID      	 NUMERIC     	identity,
    CREATION_DATE	 DATE        	,
    ITEM_ID     	 NUMERIC     	,
    USERNAME    	 VARCHAR(100)	,
    USER_LOGIC  	 bool        	not null,
    WFWD_ID     	 NUMERIC     	not null,
    WFS_CODE    	 VARCHAR(100)	not null,
    WFA_ID_2    	 NUMERIC     	,
    constraint PK_WF_WORKFLOW primary key nonclustered (WFW_ID)
);

comment on column WF_WORKFLOW.WFW_ID is
'Id Workflow';

comment on column WF_WORKFLOW.CREATION_DATE is
'creation date';

comment on column WF_WORKFLOW.ITEM_ID is
'itemId';

comment on column WF_WORKFLOW.USERNAME is
'username';

comment on column WF_WORKFLOW.USER_LOGIC is
'user_logic';

comment on column WF_WORKFLOW.WFWD_ID is
'WfWorkflowDefinition';

comment on column WF_WORKFLOW.WFS_CODE is
'WfStatus';

comment on column WF_WORKFLOW.WFA_ID_2 is
'current';

-- ============================================================
--   Table : WF_WORKFLOW_DEFINITION                                        
-- ============================================================
create table WF_WORKFLOW_DEFINITION
(
    WFWD_ID     	 NUMERIC     	identity,
    NAME        	 VARCHAR(100)	,
    DATE        	 DATE        	,
    WFAD_ID     	 NUMERIC     	,
    constraint PK_WF_WORKFLOW_DEFINITION primary key nonclustered (WFWD_ID)
);

comment on column WF_WORKFLOW_DEFINITION.WFWD_ID is
'Id Workflow definition';

comment on column WF_WORKFLOW_DEFINITION.NAME is
'name';

comment on column WF_WORKFLOW_DEFINITION.DATE is
'date';

comment on column WF_WORKFLOW_DEFINITION.WFAD_ID is
'startActivity';


alter table WF_ACTIVITY
	add constraint FK_WFAD_WFA_WF_ACTIVITY_DEFINITION foreign key (WFAD_ID)
	references WF_ACTIVITY_DEFINITION (WFAD_ID);

create index WFAD_WFA_WF_ACTIVITY_DEFINITION_FK on WF_ACTIVITY (WFAD_ID asc);

alter table WF_ACTIVITY_DEFINITION
	add constraint FK_WFAD_WFMD_WF_MULTIPLICITY_DEFINITION foreign key (WFMD_CODE)
	references WF_MULTIPLICITY_DEFINITION (WFMD_CODE);

create index WFAD_WFMD_WF_MULTIPLICITY_DEFINITION_FK on WF_ACTIVITY_DEFINITION (WFMD_CODE asc);

alter table WF_DECISION
	add constraint FK_WFE_WFA_WF_ACTIVITY foreign key (WFA_ID)
	references WF_ACTIVITY (WFA_ID);

create index WFE_WFA_WF_ACTIVITY_FK on WF_DECISION (WFA_ID asc);

alter table WF_TRANSITION_DEFINITION
	add constraint FK_WFT_WFA_FROM_WF_ACTIVITY_DEFINITION foreign key (WFAD_ID_FROM)
	references WF_ACTIVITY_DEFINITION (WFAD_ID);

create index WFT_WFA_FROM_WF_ACTIVITY_DEFINITION_FK on WF_TRANSITION_DEFINITION (WFAD_ID_FROM asc);

alter table WF_TRANSITION_DEFINITION
	add constraint FK_WFT_WFA_TO_WF_ACTIVITY_DEFINITION foreign key (WFAD_ID_TO)
	references WF_ACTIVITY_DEFINITION (WFAD_ID);

create index WFT_WFA_TO_WF_ACTIVITY_DEFINITION_FK on WF_TRANSITION_DEFINITION (WFAD_ID_TO asc);

alter table WF_WORKFLOW_DEFINITION
	add constraint FK_WFWD_WFAD_WF_ACTIVITY_DEFINITION foreign key (WFAD_ID)
	references WF_ACTIVITY_DEFINITION (WFAD_ID);

create index WFWD_WFAD_WF_ACTIVITY_DEFINITION_FK on WF_WORKFLOW_DEFINITION (WFAD_ID asc);

alter table WF_ACTIVITY_DEFINITION
	add constraint FK_WFWD_WFAD_CURRENT_WF_WORKFLOW_DEFINITION foreign key (WFWD_ID)
	references WF_WORKFLOW_DEFINITION (WFWD_ID);

create index WFWD_WFAD_CURRENT_WF_WORKFLOW_DEFINITION_FK on WF_ACTIVITY_DEFINITION (WFWD_ID asc);

alter table WF_TRANSITION_DEFINITION
	add constraint FK_WFWD_WFTD_WF_WORKFLOW_DEFINITION foreign key (WFWD_ID)
	references WF_WORKFLOW_DEFINITION (WFWD_ID);

create index WFWD_WFTD_WF_WORKFLOW_DEFINITION_FK on WF_TRANSITION_DEFINITION (WFWD_ID asc);

alter table WF_WORKFLOW
	add constraint FK_WFWD_WFW_WF_WORKFLOW_DEFINITION foreign key (WFWD_ID)
	references WF_WORKFLOW_DEFINITION (WFWD_ID);

create index WFWD_WFW_WF_WORKFLOW_DEFINITION_FK on WF_WORKFLOW (WFWD_ID asc);

alter table WF_ACTIVITY
	add constraint FK_WFW_WFA_WF_WORKFLOW foreign key (WFW_ID)
	references WF_WORKFLOW (WFW_ID);

create index WFW_WFA_WF_WORKFLOW_FK on WF_ACTIVITY (WFW_ID asc);

alter table WF_WORKFLOW
	add constraint FK_WFW_WFA_2_WF_ACTIVITY foreign key (WFA_ID_2)
	references WF_ACTIVITY (WFA_ID);

create index WFW_WFA_2_WF_ACTIVITY_FK on WF_WORKFLOW (WFA_ID_2 asc);

alter table WF_WORKFLOW
	add constraint FK_WFW_WFS_WF_STATUS foreign key (WFS_CODE)
	references WF_STATUS (WFS_CODE);

create index WFW_WFS_WF_STATUS_FK on WF_WORKFLOW (WFS_CODE asc);


