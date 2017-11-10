-- ============================================================
--   SGBD      		  :  PostgreSql                     
-- ============================================================

Alter table O_JOB_EXEC
add constraint FK_EXCLUSIVE_EXEC UNIQUE(JMO_ID);
