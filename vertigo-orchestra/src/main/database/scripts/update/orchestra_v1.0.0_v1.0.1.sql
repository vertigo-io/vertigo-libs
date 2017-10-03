

create sequence SEQ_O_JOB_RUNNING
	start with 1000 cache 20; 


drop sequence SEQ_O_PROCESS_PLANIFICATION;


-- ============================================================
--   Table : O_JOB_RUNNING                                        
-- ============================================================
create table O_JOB_RUNNING
(
    JRU_ID      	 NUMERIC     	not null,
    JOBNAME     	 VARCHAR(100)	,
    NOD_ID      	 NUMERIC     	not null,
    DATE_EXEC   	 TIMESTAMP   	,
    USR_ID      	 NUMERIC     	,
    constraint PK_O_JOB_RUNNING primary key (JRU_ID)
);

comment on column O_JOB_RUNNING.JRU_ID is
'Id de la definition du job';

comment on column O_JOB_RUNNING.JOBNAME is
'Nom du job';

comment on column O_JOB_RUNNING.NOD_ID is
'Id du noeud';

comment on column O_JOB_RUNNING.DATE_EXEC is
'Date de début';

comment on column O_JOB_RUNNING.USR_ID is
'User';

drop table O_PROCESS_PLANIFICATION;

--Don't remove, new state for worm process_execution
insert into o_execution_state(est_cd, label) values ('STARTED', 'Started');

--create UNIQUE INDEX IDX_O_JOB_RUNNING_UNI on O_JOB_RUNNING (JOBNAME asc);


-- TODO REMOVE THIS TIMEOUT
--SET LOCK_TIMEOUT 10000000