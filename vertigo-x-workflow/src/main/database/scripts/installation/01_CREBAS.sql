-- ============================================================
--   Nom de SGBD      :  sqlserver                     
--   Date de création :  4 janv. 2017  18:07:26                     
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

create index WF_ACTIVITY_WFW_ID_FK on WF_ACTIVITY (WFW_ID asc);
comment on column WF_ACTIVITY.WFAD_ID is
'WfActivityDefinition';

create index WF_ACTIVITY_WFAD_ID_FK on WF_ACTIVITY (WFAD_ID asc);
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

create index WF_ACTIVITY_DEFINITION_WFMD_CODE_FK on WF_ACTIVITY_DEFINITION (WFMD_CODE asc);
comment on column WF_ACTIVITY_DEFINITION.WFWD_ID is
'WfWorkflowDefinition';

create index WF_ACTIVITY_DEFINITION_WFWD_ID_FK on WF_ACTIVITY_DEFINITION (WFWD_ID asc);
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

create index WF_DECISION_WFA_ID_FK on WF_DECISION (WFA_ID asc);
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

create index WF_TRANSITION_DEFINITION_WFWD_ID_FK on WF_TRANSITION_DEFINITION (WFWD_ID asc);
comment on column WF_TRANSITION_DEFINITION.WFAD_ID_FROM is
'transitionFrom';

create index WF_TRANSITION_DEFINITION_WFAD_ID_FROM_FK on WF_TRANSITION_DEFINITION (WFAD_ID_FROM asc);
comment on column WF_TRANSITION_DEFINITION.WFAD_ID_TO is
'transitionTo';

create index WF_TRANSITION_DEFINITION_WFAD_ID_TO_FK on WF_TRANSITION_DEFINITION (WFAD_ID_TO asc);
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

create index WF_WORKFLOW_WFWD_ID_FK on WF_WORKFLOW (WFWD_ID asc);
comment on column WF_WORKFLOW.WFS_CODE is
'WfStatus';

create index WF_WORKFLOW_WFS_CODE_FK on WF_WORKFLOW (WFS_CODE asc);
comment on column WF_WORKFLOW.WFA_ID_2 is
'current';

create index WF_WORKFLOW_WFA_ID_2_FK on WF_WORKFLOW (WFA_ID_2 asc);
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

create index WF_WORKFLOW_DEFINITION_WFAD_ID_FK on WF_WORKFLOW_DEFINITION (WFAD_ID asc);


alter table WF_ACTIVITY
	add constraint FK_WFAD_WFA foreign key (WFAD_ID)
	references WF_ACTIVITY_DEFINITION (WFAD_ID);

alter table WF_ACTIVITY_DEFINITION
	add constraint FK_WFAD_WFMD foreign key (WFMD_CODE)
	references WF_MULTIPLICITY_DEFINITION (WFMD_CODE);

alter table WF_DECISION
	add constraint FK_WFE_WFA foreign key (WFA_ID)
	references WF_ACTIVITY (WFA_ID);

alter table WF_TRANSITION_DEFINITION
	add constraint FK_WFT_WFA_FROM foreign key (WFAD_ID_FROM)
	references WF_ACTIVITY_DEFINITION (WFAD_ID);

alter table WF_TRANSITION_DEFINITION
	add constraint FK_WFT_WFA_TO foreign key (WFAD_ID_TO)
	references WF_ACTIVITY_DEFINITION (WFAD_ID);

alter table WF_WORKFLOW_DEFINITION
	add constraint FK_WFWD_WFAD foreign key (WFAD_ID)
	references WF_ACTIVITY_DEFINITION (WFAD_ID);

alter table WF_ACTIVITY_DEFINITION
	add constraint FK_WFWD_WFAD_CURRENT foreign key (WFWD_ID)
	references WF_WORKFLOW_DEFINITION (WFWD_ID);

alter table WF_TRANSITION_DEFINITION
	add constraint FK_WFWD_WFTD foreign key (WFWD_ID)
	references WF_WORKFLOW_DEFINITION (WFWD_ID);

alter table WF_WORKFLOW
	add constraint FK_WFWD_WFW foreign key (WFWD_ID)
	references WF_WORKFLOW_DEFINITION (WFWD_ID);

alter table WF_ACTIVITY
	add constraint FK_WFW_WFA foreign key (WFW_ID)
	references WF_WORKFLOW (WFW_ID);

alter table WF_WORKFLOW
	add constraint FK_WFW_WFA_2 foreign key (WFA_ID_2)
	references WF_ACTIVITY (WFA_ID);

alter table WF_WORKFLOW
	add constraint FK_WFW_WFS foreign key (WFS_CODE)
	references WF_STATUS (WFS_CODE);

