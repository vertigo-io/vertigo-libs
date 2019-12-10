-- ============================================================
--   SGBD      		  :  H2                     
-- ============================================================




-- ============================================================
--   Sequences                                      
-- ============================================================
create sequence SEQ_COMMUNE
	start with 1000 cache 20; 


-- ============================================================
--   Table : COMMUNE                                        
-- ============================================================
create table COMMUNE
(
    ID_INSEE    	 BIGINT      	not null,
    CODE_POSTAL 	 VARCHAR(5)  	not null,
    COMMUNE     	 VARCHAR(100)	not null,
    DEPARTEMENT 	 VARCHAR(100)	not null,
    constraint PK_COMMUNE primary key (ID_INSEE)
);

comment on column COMMUNE.ID_INSEE is
'ID INSEE';

comment on column COMMUNE.CODE_POSTAL is
'Code postal';

comment on column COMMUNE.COMMUNE is
'Commune';

comment on column COMMUNE.DEPARTEMENT is
'Département';



