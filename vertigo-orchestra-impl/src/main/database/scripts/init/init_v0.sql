insert into o_execution_state(est_cd, label) values ('WAITING', 'Waiting');
insert into o_execution_state(est_cd, label) values ('RESERVED', 'Reserved');
insert into o_execution_state(est_cd, label) values ('SUBMITTED', 'Submitted');
insert into o_execution_state(est_cd, label) values ('DONE', 'Done');
insert into o_execution_state(est_cd, label) values ('RUNNING', 'Running');
insert into o_execution_state(est_cd, label) values ('ERROR', 'Error');
insert into o_execution_state(est_cd, label) values ('CANCELED', 'Canceled');
insert into o_execution_state(est_cd, label) values ('ABORTED', 'Aborted');
insert into o_execution_state(est_cd, label) values ('PENDING', 'Pending');

insert into o_scheduler_state(sst_cd, label) values ('WAITING', 'Waiting');
insert into o_scheduler_state(sst_cd, label) values ('RESERVED', 'Reserved');
insert into o_scheduler_state(sst_cd, label) values ('TRIGGERED', 'Triggered');
insert into o_scheduler_state(sst_cd, label) values ('MISFIRED', 'Misfired');
insert into o_scheduler_state(sst_cd, label) values ('CANCELED', 'Canceled');
insert into o_scheduler_state(sst_cd, label) values ('RESCUED', 'Rescued');

insert into o_process_type(prt_cd, label) values ('DUMB', 'Dumb');

insert into trigger_type(trt_cd, label) values ('SCHEDULED', 'scheduled');
insert into trigger_type(trt_cd, label) values ('MANUAL', 'manual');