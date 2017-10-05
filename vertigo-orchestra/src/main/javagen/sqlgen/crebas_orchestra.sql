-- ============================================================
--   SGBD      		  :  PostgreSql                     
-- ============================================================




-- ============================================================
--   Sequences                                      
-- ============================================================
create sequence SEQ_O_JOB_BOARD
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_CRON
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_EXECUTION
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_LOG
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_MODEL
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_RUNNING
	start with 1000 cache 20; 

create sequence SEQ_O_JOB_SCHEDULE
	start with 1000 cache 20; 

create sequence SEQ_O_USER
	start with 1000 cache 20; 


-- ============================================================
--   Table : O_JOB_BOARD                                        
-- ============================================================
create table O_JOB_BOARD
(
    JID         	 VARCHAR(30) 	not null,
    STATUS      	 VARCHAR(1)  	not null,
    NODE_ID     	 NUMERIC     	not null,
    MAX_DATE    	 TIMESTAMP   	,
    MAX_RETRY   	 NUMERIC     	,
    CURRENT_RETRY	 NUMERIC     	,
    constraint PK_O_JOB_BOARD primary key (JID)
);

comment on column O_JOB_BOARD.JID is
'Id de l''execution du job';

comment on column O_JOB_BOARD.STATUS is
'Status de l''execution';

comment on column O_JOB_BOARD.NODE_ID is
'Id du noeud';

comment on column O_JOB_BOARD.MAX_DATE is
'Date max d''execution';

comment on column O_JOB_BOARD.MAX_RETRY is
'Nb max de retry';

comment on column O_JOB_BOARD.CURRENT_RETRY is
'Nb courrant de retry';

-- ============================================================
--   Table : O_JOB_CRON                                        
-- ============================================================
create table O_JOB_CRON
(
    JCR_ID      	 NUMERIC     	not null,
    CRON_EXPRESSION	 VARCHAR(100)	,
    PARAMS      	 TEXT        	,
    JMO_ID      	 NUMERIC     	not null,
    constraint PK_O_JOB_CRON primary key (JCR_ID)
);

comment on column O_JOB_CRON.JCR_ID is
'Id de la definition du schedule CRON';

comment on column O_JOB_CRON.CRON_EXPRESSION is
'Expression récurrence du processus';

comment on column O_JOB_CRON.PARAMS is
'Paramètres initiaux sous forme de JSON';

comment on column O_JOB_CRON.JMO_ID is
'JobModel';

-- ============================================================
--   Table : O_JOB_EXECUTION                                        
-- ============================================================
create table O_JOB_EXECUTION
(
    JEX_ID      	 NUMERIC     	not null,
    JOBNAME     	 VARCHAR(20) 	not null,
    STATUS      	 VARCHAR(20) 	not null,
    REASON      	 VARCHAR(20) 	,
    DATE_DEBUT  	 TIMESTAMP   	not null,
    DATE_FIN    	 TIMESTAMP   	,
    CLASS_ENGINE	 VARCHAR(200)	not null,
    WORKSPACE_IN	 TEXT        	not null,
    WORKSPACE_OUT	 TEXT        	,
    NOD_ID      	 NUMERIC     	not null,
    constraint PK_O_JOB_EXECUTION primary key (JEX_ID)
);

comment on column O_JOB_EXECUTION.JEX_ID is
'Id d''une trace d''execution d''un job';

comment on column O_JOB_EXECUTION.JOBNAME is
'Status général d''execution';

comment on column O_JOB_EXECUTION.STATUS is
'Status général d''execution';

comment on column O_JOB_EXECUTION.REASON is
'Code d''erreur fonctionel de l''execution';

comment on column O_JOB_EXECUTION.DATE_DEBUT is
'Date de début d''execution';

comment on column O_JOB_EXECUTION.DATE_FIN is
'Date de fin d''execution';

comment on column O_JOB_EXECUTION.CLASS_ENGINE is
'Implémentation effective de l''execution';

comment on column O_JOB_EXECUTION.WORKSPACE_IN is
'Workspace d''entrée de l''execution';

comment on column O_JOB_EXECUTION.WORKSPACE_OUT is
'Workspace de sortie de l''execution';

comment on column O_JOB_EXECUTION.NOD_ID is
'Id du noeud';

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
    JOBNAME     	 VARCHAR(100)	,
    DESC        	 VARCHAR(100)	,
    CLASS_ENGINE	 VARCHAR(200)	,
    MAX_RETRY   	 NUMERIC     	,
    MAX_DELAY   	 NUMERIC     	,
    TIMEOUT     	 NUMERIC     	,
    CREATION_DATE	 TIMESTAMP   	,
    ACTIVE      	 BOOL        	,
    constraint PK_O_JOB_MODEL primary key (JMO_ID)
);

comment on column O_JOB_MODEL.JMO_ID is
'Identifiant du Model de Job';

comment on column O_JOB_MODEL.JOBNAME is
'Nom du job';

comment on column O_JOB_MODEL.DESC is
'Description du job';

comment on column O_JOB_MODEL.CLASS_ENGINE is
'Classe d''implémentation du Job';

comment on column O_JOB_MODEL.MAX_RETRY is
'Nombre max de retry';

comment on column O_JOB_MODEL.MAX_DELAY is
'Delai max de d''excution/retry';

comment on column O_JOB_MODEL.TIMEOUT is
'Délai max de d''attente d''execution';

comment on column O_JOB_MODEL.CREATION_DATE is
'Date de création';

comment on column O_JOB_MODEL.ACTIVE is
'Job Actif/Inactif';

-- ============================================================
--   Table : O_JOB_RUNNING                                        
-- ============================================================
create table O_JOB_RUNNING
(
    JID         	 VARCHAR(30) 	not null,
    JOBNAME     	 VARCHAR(100)	,
    NODE_ID     	 NUMERIC     	not null,
    EXEC_DATE   	 TIMESTAMP   	,
    MAX_EXEC_DATE	 TIMESTAMP   	,
    USR_ID      	 NUMERIC     	,
    constraint PK_O_JOB_RUNNING primary key (JID)
);

comment on column O_JOB_RUNNING.JID is
'Id de l''execution du job';

comment on column O_JOB_RUNNING.JOBNAME is
'Nom du job';

comment on column O_JOB_RUNNING.NODE_ID is
'Id du noeud';

comment on column O_JOB_RUNNING.EXEC_DATE is
'Date d''execution';

comment on column O_JOB_RUNNING.MAX_EXEC_DATE is
'Date Max d''execution (Date d''exec + TO)';

comment on column O_JOB_RUNNING.USR_ID is
'User';

-- ============================================================
--   Table : O_JOB_SCHEDULE                                        
-- ============================================================
create table O_JOB_SCHEDULE
(
    JSC_ID      	 NUMERIC     	not null,
    SCHEDULE_DATE	 TIMESTAMP   	,
    PARAMS      	 TEXT        	,
    JMO_ID      	 NUMERIC     	not null,
    constraint PK_O_JOB_SCHEDULE primary key (JSC_ID)
);

comment on column O_JOB_SCHEDULE.JSC_ID is
'Id de la definition de la planification à date';

comment on column O_JOB_SCHEDULE.SCHEDULE_DATE is
'Date d''execution prévue';

comment on column O_JOB_SCHEDULE.PARAMS is
'Paramètres initiaux sous forme de JSON';

comment on column O_JOB_SCHEDULE.JMO_ID is
'JobModel';

-- ============================================================
--   Table : O_USER                                        
-- ============================================================
create table O_USER
(
    USR_ID      	 NUMERIC     	not null,
    FIRST_NAME  	 VARCHAR(100)	,
    LAST_NAME   	 VARCHAR(100)	,
    EMAIL       	 VARCHAR(100)	,
    PASSWORD    	 VARCHAR(100)	,
    MAIL_ALERT  	 BOOL        	,
    ACTIVE      	 BOOL        	,
    constraint PK_O_USER primary key (USR_ID)
);

comment on column O_USER.USR_ID is
'Id';

comment on column O_USER.FIRST_NAME is
'Nom';

comment on column O_USER.LAST_NAME is
'Prénom';

comment on column O_USER.EMAIL is
'Email';

comment on column O_USER.PASSWORD is
'Mot de passe';

comment on column O_USER.MAIL_ALERT is
'Alerté en cas d''erreur';

comment on column O_USER.ACTIVE is
'Compte Actif';



alter table O_JOB_CRON
	add constraint FK_JCR_JMO_O_JOB_MODEL foreign key (JMO_ID)
	references O_JOB_MODEL (JMO_ID);

create index JCR_JMO_O_JOB_MODEL_FK on O_JOB_CRON (JMO_ID asc);

alter table O_JOB_LOG
	add constraint FK_JLO_JEX_O_JOB_EXECUTION foreign key (PRO_ID)
	references O_JOB_EXECUTION (JEX_ID);

create index JLO_JEX_O_JOB_EXECUTION_FK on O_JOB_LOG (PRO_ID asc);

alter table O_JOB_RUNNING
	add constraint FK_JOB_USR_O_USER foreign key (USR_ID)
	references O_USER (USR_ID);

create index JOB_USR_O_USER_FK on O_JOB_RUNNING (USR_ID asc);

alter table O_JOB_SCHEDULE
	add constraint FK_JSC_JMO_O_JOB_MODEL foreign key (JMO_ID)
	references O_JOB_MODEL (JMO_ID);

create index JSC_JMO_O_JOB_MODEL_FK on O_JOB_SCHEDULE (JMO_ID asc);


