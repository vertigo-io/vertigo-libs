-- ============================================================
--   SGBD      		  :  PostgreSql                     
-- ============================================================




-- ============================================================
--   Sequences                                      
-- ============================================================
create sequence SEQ_O_JOB_CRON
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_EVENT
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_EXEC
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_LOG
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_MODEL
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_RUN
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_SCHEDULE
	start with 1000 cache 20; 

create sequence SEQ_O_NODE
	start with 1000 cache 20; 


-- ============================================================
--   Table : O_JOB_CRON                                        
-- ============================================================
create table O_JOB_CRON
(
    JCR_ID      	 NUMERIC     	not null,
    CRON_EXPRESSION	 VARCHAR(100)	not null,
    PARAMS      	 TEXT        	not null,
    JMO_ID      	 NUMERIC     	not null,
    constraint PK_O_JOB_CRON primary key (JCR_ID)
);

comment on column O_JOB_CRON.JCR_ID is
'id';

comment on column O_JOB_CRON.CRON_EXPRESSION is
'cron expression';

comment on column O_JOB_CRON.PARAMS is
'init params as JSON';

comment on column O_JOB_CRON.JMO_ID is
'JobModel';

-- ============================================================
--   Table : O_JOB_EVENT                                        
-- ============================================================
create table O_JOB_EVENT
(
    JEV_ID      	 NUMERIC     	not null,
    JOB_NAME    	 VARCHAR(20) 	not null,
    STATUS      	 VARCHAR(20) 	not null,
    REASON      	 VARCHAR(20) 	,
    START_DATE  	 TIMESTAMP   	not null,
    END_DATE    	 TIMESTAMP   	,
    CLASS_ENGINE	 VARCHAR(200)	not null,
    WORKSPACE_IN	 TEXT        	not null,
    WORKSPACE_OUT	 TEXT        	,
    NOD_ID      	 NUMERIC     	not null,
    constraint PK_O_JOB_EVENT primary key (JEV_ID)
);

comment on column O_JOB_EVENT.JEV_ID is
'Id d''une trace d''execution d''un job';

comment on column O_JOB_EVENT.JOB_NAME is
'Status général d''execution';

comment on column O_JOB_EVENT.STATUS is
'Status général d''execution';

comment on column O_JOB_EVENT.REASON is
'Code d''erreur fonctionel de l''execution';

comment on column O_JOB_EVENT.START_DATE is
'Date de début d''execution';

comment on column O_JOB_EVENT.END_DATE is
'Date de fin d''execution';

comment on column O_JOB_EVENT.CLASS_ENGINE is
'Implémentation effective de l''execution';

comment on column O_JOB_EVENT.WORKSPACE_IN is
'Workspace d''entrée de l''execution';

comment on column O_JOB_EVENT.WORKSPACE_OUT is
'Workspace de sortie de l''execution';

comment on column O_JOB_EVENT.NOD_ID is
'Id du noeud';

-- ============================================================
--   Table : O_JOB_EXEC                                        
-- ============================================================
create table O_JOB_EXEC
(
    JEX_ID      	 CHAR(36)    	not null,
    START_EXEC_DATE	 TIMESTAMP   	not null,
    MAX_EXEC_DATE	 TIMESTAMP   	not null,
    JOB_ID      	 VARCHAR(30) 	not null,
    JMO_ID      	 NUMERIC     	not null,
    constraint PK_O_JOB_EXEC primary key (JEX_ID)
);

comment on column O_JOB_EXEC.JEX_ID is
'Id';

comment on column O_JOB_EXEC.START_EXEC_DATE is
'Start exec date';

comment on column O_JOB_EXEC.MAX_EXEC_DATE is
'Max date Max execution (start + timeout)';

comment on column O_JOB_EXEC.JOB_ID is
'JobRun';

comment on column O_JOB_EXEC.JMO_ID is
'JobModel';

-- ============================================================
--   Table : O_JOB_LOG                                        
-- ============================================================
create table O_JOB_LOG
(
    JLO_ID      	 NUMERIC     	not null,
    DATE_TRACE  	 TIMESTAMP   	not null,
    LEVEL       	 VARCHAR(20) 	not null,
    TYPE_EXEC_CD	 VARCHAR(20) 	not null,
    MESSAGE     	 TEXT        	,
    PARAMETRE   	 TEXT        	,
    ERREUR      	 TEXT        	,
    PRO_ID      	 NUMERIC     	not null,
    constraint PK_O_JOB_LOG primary key (JLO_ID)
);

comment on column O_JOB_LOG.JLO_ID is
'Id d''une trace d''execution d''un job';

comment on column O_JOB_LOG.DATE_TRACE is
'Date de la trace';

comment on column O_JOB_LOG.LEVEL is
'Niveau de la trace';

comment on column O_JOB_LOG.TYPE_EXEC_CD is
'Type de trace';

comment on column O_JOB_LOG.MESSAGE is
'Message';

comment on column O_JOB_LOG.PARAMETRE is
'Paramètre';

comment on column O_JOB_LOG.ERREUR is
'Stacktrace d''erreur';

comment on column O_JOB_LOG.PRO_ID is
'JobExecution';

-- ============================================================
--   Table : O_JOB_MODEL                                        
-- ============================================================
create table O_JOB_MODEL
(
    JMO_ID      	 NUMERIC     	not null,
    JOB_NAME    	 VARCHAR(100)	not null,
    DESC        	 VARCHAR(100)	not null,
    JOB_ENGINE_CLASS_NAME	 VARCHAR(200)	not null,
    MAX_RETRY   	 NUMERIC     	not null,
    RUN_MAX_DELAY	 NUMERIC     	not null,
    EXEC_TIMEOUT	 NUMERIC     	not null,
    CREATION_DATE	 TIMESTAMP   	not null,
    ACTIVE      	 BOOL        	not null,
    constraint PK_O_JOB_MODEL primary key (JMO_ID)
);

comment on column O_JOB_MODEL.JMO_ID is
'Id';

comment on column O_JOB_MODEL.JOB_NAME is
'Name';

comment on column O_JOB_MODEL.DESC is
'Description';

comment on column O_JOB_MODEL.JOB_ENGINE_CLASS_NAME is
'Class name of the Job';

comment on column O_JOB_MODEL.MAX_RETRY is
'Max retry limit';

comment on column O_JOB_MODEL.RUN_MAX_DELAY is
'Max delay in seconds of a run from its scheduled date';

comment on column O_JOB_MODEL.EXEC_TIMEOUT is
'Timeout in seconds of a single execution';

comment on column O_JOB_MODEL.CREATION_DATE is
'Creation date';

comment on column O_JOB_MODEL.ACTIVE is
'Active/Inactive';

-- ============================================================
--   Table : O_JOB_RUN                                        
-- ============================================================
create table O_JOB_RUN
(
    JOB_ID      	 VARCHAR(30) 	not null,
    JEX_ID      	 CHAR(36)    	,
    ALIVE       	 BOOL        	not null,
    STATUS      	 CHAR(1)     	not null,
    CURRENT_TRY 	 NUMERIC     	not null,
    START_DATE  	 TIMESTAMP   	not null,
    MAX_DATE    	 TIMESTAMP   	not null,
    MAX_RETRY   	 NUMERIC     	not null,
    JMO_ID      	 NUMERIC     	not null,
    constraint PK_O_JOB_RUN primary key (JOB_ID)
);

comment on column O_JOB_RUN.JOB_ID is
'Id';

comment on column O_JOB_RUN.JEX_ID is
'Exec UUID';

comment on column O_JOB_RUN.ALIVE is
'alive y/n';

comment on column O_JOB_RUN.STATUS is
'Exec status';

comment on column O_JOB_RUN.CURRENT_TRY is
'Current try';

comment on column O_JOB_RUN.START_DATE is
'Start date of the run';

comment on column O_JOB_RUN.MAX_DATE is
'Max date of the run';

comment on column O_JOB_RUN.MAX_RETRY is
'Max retry';

comment on column O_JOB_RUN.JMO_ID is
'JobModel';

-- ============================================================
--   Table : O_JOB_SCHEDULE                                        
-- ============================================================
create table O_JOB_SCHEDULE
(
    JSC_ID      	 NUMERIC     	not null,
    SCHEDULE_DATE	 TIMESTAMP   	not null,
    PARAMS      	 TEXT        	not null,
    JMO_ID      	 NUMERIC     	not null,
    constraint PK_O_JOB_SCHEDULE primary key (JSC_ID)
);

comment on column O_JOB_SCHEDULE.JSC_ID is
'id';

comment on column O_JOB_SCHEDULE.SCHEDULE_DATE is
'schedule date';

comment on column O_JOB_SCHEDULE.PARAMS is
'init params as JSON';

comment on column O_JOB_SCHEDULE.JMO_ID is
'JobModel';

-- ============================================================
--   Table : O_NODE                                        
-- ============================================================
create table O_NODE
(
    NOD_ID      	 CHAR(36)    	not null,
    CAPACITY    	 NUMERIC     	not null,
    USED        	 NUMERIC     	not null,
    LAST_HEARTBEAT	 TIMESTAMP   	not null,
    constraint PK_O_NODE primary key (NOD_ID)
);

comment on column O_NODE.NOD_ID is
'Id';

comment on column O_NODE.CAPACITY is
'capacity';

comment on column O_NODE.USED is
'used';

comment on column O_NODE.LAST_HEARTBEAT is
'Last activity';



alter table O_JOB_CRON
	add constraint FK_JCR_JMO_O_JOB_MODEL foreign key (JMO_ID)
	references O_JOB_MODEL (JMO_ID);

create index JCR_JMO_O_JOB_MODEL_FK on O_JOB_CRON (JMO_ID asc);

alter table O_JOB_EXEC
	add constraint FK_JEX_JMO_O_JOB_MODEL foreign key (JMO_ID)
	references O_JOB_MODEL (JMO_ID);

create index JEX_JMO_O_JOB_MODEL_FK on O_JOB_EXEC (JMO_ID asc);

alter table O_JOB_EXEC
	add constraint FK_JEX_JRN_O_JOB_RUN foreign key (JOB_ID)
	references O_JOB_RUN (JOB_ID);

create index JEX_JRN_O_JOB_RUN_FK on O_JOB_EXEC (JOB_ID asc);

alter table O_JOB_LOG
	add constraint FK_JLO_JEV_O_JOB_EVENT foreign key (PRO_ID)
	references O_JOB_EVENT (JEV_ID);

create index JLO_JEV_O_JOB_EVENT_FK on O_JOB_LOG (PRO_ID asc);

alter table O_JOB_RUN
	add constraint FK_JRN_JMO_O_JOB_MODEL foreign key (JMO_ID)
	references O_JOB_MODEL (JMO_ID);

create index JRN_JMO_O_JOB_MODEL_FK on O_JOB_RUN (JMO_ID asc);

alter table O_JOB_SCHEDULE
	add constraint FK_JSC_JMO_O_JOB_MODEL foreign key (JMO_ID)
	references O_JOB_MODEL (JMO_ID);

create index JSC_JMO_O_JOB_MODEL_FK on O_JOB_SCHEDULE (JMO_ID asc);


