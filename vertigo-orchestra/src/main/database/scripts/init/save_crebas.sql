-- ============================================================
--   Nom de SGBD      :  PostgreSql                     
--   Date de création :  5 oct. 2015  11:48:58                     
-- ============================================================

-- ============================================================
--   Drop                                       
-- ============================================================
drop table O_EXECUTION_STATE cascade;
drop table O_PLANIFICATION_STATE cascade;
drop table O_PROCESS cascade;
drop table O_PROCESS_EXECUTION cascade;
drop table O_PROCESS_PLANIFICATION cascade;
drop table O_PROCESS_TYPE cascade;
drop table O_TASK cascade;
drop table O_TASK_EXECUTION cascade;
drop table O_TASK_LOG cascade;
drop table O_TASK_WORKSPACE cascade;
drop table TRIGGER_TYPE cascade;



-- ============================================================
--   Sequences                                      
-- ============================================================
create sequence SEQ_O_EXECUTION_STATE
	start with 1000 cache 20; 

create sequence SEQ_O_PLANIFICATION_STATE
	start with 1000 cache 20; 

create sequence SEQ_O_PROCESS
	start with 1000 cache 20; 

create sequence SEQ_O_PROCESS_EXECUTION
	start with 1000 cache 20; 

create sequence SEQ_O_PROCESS_PLANIFICATION
	start with 1000 cache 20; 

create sequence SEQ_O_PROCESS_TYPE
	start with 1000 cache 20; 

create sequence SEQ_O_TASK
	start with 1000 cache 20; 

create sequence SEQ_O_TASK_EXECUTION
	start with 1000 cache 20; 

create sequence SEQ_O_TASK_LOG
	start with 1000 cache 20; 

create sequence SEQ_O_TASK_WORKSPACE
	start with 1000 cache 20; 

create sequence SEQ_TRIGGER_TYPE
	start with 1000 cache 20; 


-- ============================================================
--   Table : O_EXECUTION_STATE                                        
-- ============================================================
create table O_EXECUTION_STATE
(
    EST_CD      	 VARCHAR(20) 	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_O_EXECUTION_STATE primary key (EST_CD)
);

comment on column O_EXECUTION_STATE.EST_CD is
'Code';

comment on column O_EXECUTION_STATE.LABEL is
'Libellé';

-- ============================================================
--   Table : O_PLANIFICATION_STATE                                        
-- ============================================================
create table O_PLANIFICATION_STATE
(
    PST_CD      	 VARCHAR(20) 	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_O_PLANIFICATION_STATE primary key (PST_CD)
);

comment on column O_PLANIFICATION_STATE.PST_CD is
'Code';

comment on column O_PLANIFICATION_STATE.LABEL is
'Libellé';

-- ============================================================
--   Table : O_PROCESS                                        
-- ============================================================
create table O_PROCESS
(
    PRO_ID      	 NUMERIC     	not null,
    NAME        	 VARCHAR(100)	,
    CRON_EXPRESSION	 VARCHAR(100)	,
    INITIAL_PARAMS	 TEXT        	,
    MULTIEXECUTION	 BOOL        	,
    TRT_CD      	 VARCHAR(20) 	,
    PRT_CD      	 VARCHAR(20) 	,
    constraint PK_O_PROCESS primary key (PRO_ID)
);

comment on column O_PROCESS.PRO_ID is
'Id de la definition du processus';

comment on column O_PROCESS.NAME is
'Nom du processus';

comment on column O_PROCESS.CRON_EXPRESSION is
'Expression récurrence du processus';

comment on column O_PROCESS.INITIAL_PARAMS is
'Paramètres initiaux sous forme de JSON';

comment on column O_PROCESS.MULTIEXECUTION is
'Accepte la multi-execution';

comment on column O_PROCESS.TRT_CD is
'TriggerType';

create index O_PROCESS_TRT_CD_FK on O_PROCESS (TRT_CD asc);
comment on column O_PROCESS.PRT_CD is
'ProcessType';

create index O_PROCESS_PRT_CD_FK on O_PROCESS (PRT_CD asc);
-- ============================================================
--   Table : O_PROCESS_EXECUTION                                        
-- ============================================================
create table O_PROCESS_EXECUTION
(
    PRE_ID      	 NUMERIC     	not null,
    BEGIN_TIME  	 TIMESTAMP   	not null,
    END_TIME    	 TIMESTAMP   	,
    ENGINE      	 VARCHAR(200)	,
    PRO_ID      	 NUMERIC     	,
    EST_CD      	 VARCHAR(20) 	,
    constraint PK_O_PROCESS_EXECUTION primary key (PRE_ID)
);

comment on column O_PROCESS_EXECUTION.PRE_ID is
'Id de l''execution d''un processus';

comment on column O_PROCESS_EXECUTION.BEGIN_TIME is
'Date de début';

comment on column O_PROCESS_EXECUTION.END_TIME is
'Date de fin';

comment on column O_PROCESS_EXECUTION.ENGINE is
'Implémentation effective de l''execution';

comment on column O_PROCESS_EXECUTION.PRO_ID is
'Processus';

create index O_PROCESS_EXECUTION_PRO_ID_FK on O_PROCESS_EXECUTION (PRO_ID asc);
comment on column O_PROCESS_EXECUTION.EST_CD is
'ExecutionState';

create index O_PROCESS_EXECUTION_EST_CD_FK on O_PROCESS_EXECUTION (EST_CD asc);
-- ============================================================
--   Table : O_PROCESS_PLANIFICATION                                        
-- ============================================================
create table O_PROCESS_PLANIFICATION
(
    PRP_ID      	 NUMERIC     	not null,
    EXPECTED_TIME	 TIMESTAMP   	,
    STATE       	 VARCHAR(20) 	,
    INITIAL_PARAMS	 TEXT        	,
    NODE_NAME   	 VARCHAR(100)	,
    PRO_ID      	 NUMERIC     	,
    PST_CD      	 VARCHAR(20) 	,
    constraint PK_O_PROCESS_PLANIFICATION primary key (PRP_ID)
);

comment on column O_PROCESS_PLANIFICATION.PRP_ID is
'Id Planification';

comment on column O_PROCESS_PLANIFICATION.EXPECTED_TIME is
'Date d''execution prévue';

comment on column O_PROCESS_PLANIFICATION.STATE is
'Etat de la planification';

comment on column O_PROCESS_PLANIFICATION.INITIAL_PARAMS is
'Paramètres initiaux sous forme de JSON';

comment on column O_PROCESS_PLANIFICATION.NODE_NAME is
'Nom du noeud';

comment on column O_PROCESS_PLANIFICATION.PRO_ID is
'Processus';

create index O_PROCESS_PLANIFICATION_PRO_ID_FK on O_PROCESS_PLANIFICATION (PRO_ID asc);
comment on column O_PROCESS_PLANIFICATION.PST_CD is
'PlanificationState';

create index O_PROCESS_PLANIFICATION_PST_CD_FK on O_PROCESS_PLANIFICATION (PST_CD asc);
-- ============================================================
--   Table : O_PROCESS_TYPE                                        
-- ============================================================
create table O_PROCESS_TYPE
(
    PRT_CD      	 VARCHAR(20) 	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_O_PROCESS_TYPE primary key (PRT_CD)
);

comment on column O_PROCESS_TYPE.PRT_CD is
'Code';

comment on column O_PROCESS_TYPE.LABEL is
'Libellé';

-- ============================================================
--   Table : O_TASK                                        
-- ============================================================
create table O_TASK
(
    TSK_ID      	 NUMERIC     	not null,
    NAME        	 VARCHAR(100)	,
    NUMBER      	 NUMERIC     	,
    MILESTONE   	 BOOL        	,
    ENGINE      	 VARCHAR(200)	,
    PRO_ID      	 NUMERIC     	,
    constraint PK_O_TASK primary key (TSK_ID)
);

comment on column O_TASK.TSK_ID is
'Id Tache';

comment on column O_TASK.NAME is
'Nom de la tâche';

comment on column O_TASK.NUMBER is
'Numéro de la tâche';

comment on column O_TASK.MILESTONE is
'Jalon';

comment on column O_TASK.ENGINE is
'Implémentation de la tâche';

comment on column O_TASK.PRO_ID is
'Processus';

create index O_TASK_PRO_ID_FK on O_TASK (PRO_ID asc);
-- ============================================================
--   Table : O_TASK_EXECUTION                                        
-- ============================================================
create table O_TASK_EXECUTION
(
    TKE_ID      	 NUMERIC     	not null,
    BEGIN_TIME  	 TIMESTAMP   	not null,
    END_TIME    	 TIMESTAMP   	,
    ENGINE      	 VARCHAR(200)	,
    NODE_NAME   	 VARCHAR(100)	,
    TSK_ID      	 NUMERIC     	,
    PRE_ID      	 NUMERIC     	,
    EST_CD      	 VARCHAR(20) 	,
    constraint PK_O_TASK_EXECUTION primary key (TKE_ID)
);

comment on column O_TASK_EXECUTION.TKE_ID is
'Id de l''execution d''un processus';

comment on column O_TASK_EXECUTION.BEGIN_TIME is
'Date de début';

comment on column O_TASK_EXECUTION.END_TIME is
'Date de fin';

comment on column O_TASK_EXECUTION.ENGINE is
'Implémentation effective de l''execution';

comment on column O_TASK_EXECUTION.NODE_NAME is
'Nom du noeud';

comment on column O_TASK_EXECUTION.TSK_ID is
'Tache';

create index O_TASK_EXECUTION_TSK_ID_FK on O_TASK_EXECUTION (TSK_ID asc);
comment on column O_TASK_EXECUTION.PRE_ID is
'Processus';

create index O_TASK_EXECUTION_PRE_ID_FK on O_TASK_EXECUTION (PRE_ID asc);
comment on column O_TASK_EXECUTION.EST_CD is
'ExecutionState';

create index O_TASK_EXECUTION_EST_CD_FK on O_TASK_EXECUTION (EST_CD asc);
-- ============================================================
--   Table : O_TASK_LOG                                        
-- ============================================================
create table O_TASK_LOG
(
    TKL_ID      	 NUMERIC     	not null,
    LOG         	 TEXT        	,
    TKE_ID      	 NUMERIC     	,
    constraint PK_O_TASK_LOG primary key (TKL_ID)
);

comment on column O_TASK_LOG.TKL_ID is
'Id du log';

comment on column O_TASK_LOG.LOG is
'Contenu du log';

comment on column O_TASK_LOG.TKE_ID is
'TaskExecution';

create index O_TASK_LOG_TKE_ID_FK on O_TASK_LOG (TKE_ID asc);
-- ============================================================
--   Table : O_TASK_WORKSPACE                                        
-- ============================================================
create table O_TASK_WORKSPACE
(
    TKW_ID      	 NUMERIC     	not null,
    IS_IN       	 BOOL        	not null,
    WORKSPACE   	 TEXT        	,
    TKE_ID      	 NUMERIC     	,
    constraint PK_O_TASK_WORKSPACE primary key (TKW_ID)
);

comment on column O_TASK_WORKSPACE.TKW_ID is
'Id de l''execution d''un processus';

comment on column O_TASK_WORKSPACE.IS_IN is
'Workspace in/out';

comment on column O_TASK_WORKSPACE.WORKSPACE is
'Contenu du workspace';

comment on column O_TASK_WORKSPACE.TKE_ID is
'TaskExecution';

create index O_TASK_WORKSPACE_TKE_ID_FK on O_TASK_WORKSPACE (TKE_ID asc);
-- ============================================================
--   Table : TRIGGER_TYPE                                        
-- ============================================================
create table TRIGGER_TYPE
(
    TRT_CD      	 VARCHAR(20) 	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_TRIGGER_TYPE primary key (TRT_CD)
);

comment on column TRIGGER_TYPE.TRT_CD is
'Code';

comment on column TRIGGER_TYPE.LABEL is
'Libellé';



alter table O_PROCESS_EXECUTION
	add constraint FK_PRE_EST foreign key (EST_CD)
	references O_EXECUTION_STATE (EST_CD);

alter table O_PROCESS_EXECUTION
	add constraint FK_PRE_PRO foreign key (PRO_ID)
	references O_PROCESS (PRO_ID);

alter table O_PROCESS
	add constraint FK_PRO_PRT foreign key (PRT_CD)
	references O_PROCESS_TYPE (PRT_CD);

alter table O_PROCESS
	add constraint FK_PRO_TRT foreign key (TRT_CD)
	references TRIGGER_TYPE (TRT_CD);

alter table O_PROCESS_PLANIFICATION
	add constraint FK_PRP_PRO foreign key (PRO_ID)
	references O_PROCESS (PRO_ID);

alter table O_PROCESS_PLANIFICATION
	add constraint FK_PRP_PST foreign key (PST_CD)
	references O_PLANIFICATION_STATE (PST_CD);

alter table O_TASK_EXECUTION
	add constraint FK_TKE_EST foreign key (EST_CD)
	references O_EXECUTION_STATE (EST_CD);

alter table O_TASK_EXECUTION
	add constraint FK_TKE_PRE foreign key (PRE_ID)
	references O_PROCESS_EXECUTION (PRE_ID);

alter table O_TASK_EXECUTION
	add constraint FK_TKE_TSK foreign key (TSK_ID)
	references O_TASK (TSK_ID);

alter table O_TASK_LOG
	add constraint FK_TKL_TKE foreign key (TKE_ID)
	references O_TASK_EXECUTION (TKE_ID);

alter table O_TASK_WORKSPACE
	add constraint FK_TKW_TKE foreign key (TKE_ID)
	references O_TASK_EXECUTION (TKE_ID);

alter table O_TASK
	add constraint FK_TSK_PRO foreign key (PRO_ID)
	references O_PROCESS (PRO_ID);

