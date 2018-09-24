-- ============================================================
--   SGBD      		  :  H2                     
-- ============================================================




-- ============================================================
--   Sequences                                      
-- ============================================================
create sequence SEQ_APPLICATION_USER
	start with 1000 cache 20; 

create sequence SEQ_CASTING
	start with 1000 cache 20; 

create sequence SEQ_COMMUNE
	start with 1000 cache 20; 

create sequence SEQ_MOVIE
	start with 1000 cache 20; 

create sequence SEQ_OUI_NON_CHOICE
	start with 1000 cache 20; 

create sequence SEQ_PEOPLE
	start with 1000 cache 20; 

create sequence SEQ_PROFIL
	start with 1000 cache 20; 

create sequence SEQ_SECURITY_ROLE
	start with 1000 cache 20; 

create sequence SEQ_USER_AUTHENTIFICATION
	start with 1000 cache 20; 


-- ============================================================
--   Table : APPLICATION_USER                                        
-- ============================================================
create table APPLICATION_USER
(
    USR_ID      	 BIGINT      	not null,
    EMAIL       	 VARCHAR(255)	,
    FIRST_NAME  	 VARCHAR(50) 	,
    LAST_NAME   	 VARCHAR(50) 	,
    PRO_ID      	 BIGINT      	,
    constraint PK_APPLICATION_USER primary key (USR_ID)
);

comment on column APPLICATION_USER.USR_ID is
'USR_ID';

comment on column APPLICATION_USER.EMAIL is
'email';

comment on column APPLICATION_USER.FIRST_NAME is
'First Name';

comment on column APPLICATION_USER.LAST_NAME is
'Last Name';

comment on column APPLICATION_USER.PRO_ID is
'Profil';

-- ============================================================
--   Table : CASTING                                        
-- ============================================================
create table CASTING
(
    CAST_ID     	 BIGINT      	not null,
    CHARACTER_NAME	 VARCHAR(250)	,
    MOV_ID      	 BIGINT      	not null,
    PEO_ID      	 BIGINT      	not null,
    constraint PK_CASTING primary key (CAST_ID)
);

comment on column CASTING.CAST_ID is
'Cast_id';

comment on column CASTING.CHARACTER_NAME is
'Character name';

comment on column CASTING.MOV_ID is
'Movie';

comment on column CASTING.PEO_ID is
'People';

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

-- ============================================================
--   Table : MOVIE                                        
-- ============================================================
create table MOVIE
(
    MOV_ID      	 BIGINT      	not null,
    DESCRIPTION 	 TEXT        	,
    POSTER      	 VARCHAR(250)	,
    RATED       	 VARCHAR(250)	,
    RELEASED    	 DATE        	,
    RUNTIME     	 NUMERIC     	,
    TITLE       	 VARCHAR(250)	,
    YEAR        	 NUMERIC     	,
    LAST_MODIFIED  	 DATE     		,
    constraint PK_MOVIE primary key (MOV_ID)
);

comment on column MOVIE.MOV_ID is
'MOV_ID';

comment on column MOVIE.DESCRIPTION is
'Description';

comment on column MOVIE.POSTER is
'Poster';

comment on column MOVIE.RATED is
'rated';

comment on column MOVIE.RELEASED is
'Released';

comment on column MOVIE.RUNTIME is
'Runtime';

comment on column MOVIE.TITLE is
'TITLE';

comment on column MOVIE.YEAR is
'Year';

-- ============================================================
--   Table : OUI_NON_CHOICE                                        
-- ============================================================
create table OUI_NON_CHOICE
(
    KEY         	 BOOLEAN     	not null,
    LIBELLE     	 VARCHAR(100)	not null,
    constraint PK_OUI_NON_CHOICE primary key (KEY)
);

comment on column OUI_NON_CHOICE.KEY is
'Valeur';

comment on column OUI_NON_CHOICE.LIBELLE is
'Libellé';

-- ============================================================
--   Table : PEOPLE                                        
-- ============================================================
create table PEOPLE
(
    PEO_ID      	 BIGINT      	not null,
    FIRST_NAME  	 VARCHAR(50) 	,
    IMDBID      	 VARCHAR(100)	,
    LAST_NAME   	 VARCHAR(50) 	,
    PEO_NAME    	 VARCHAR(250)	,
    constraint PK_PEOPLE primary key (PEO_ID)
);

comment on column PEOPLE.PEO_ID is
'PEO_ID';

comment on column PEOPLE.FIRST_NAME is
'First Name';

comment on column PEOPLE.IMDBID is
'imdbID';

comment on column PEOPLE.LAST_NAME is
'Last Name';

comment on column PEOPLE.PEO_NAME is
'Peo Name';

-- ============================================================
--   Table : PROFIL                                        
-- ============================================================
create table PROFIL
(
    PRO_ID      	 BIGINT      	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_PROFIL primary key (PRO_ID)
);

comment on column PROFIL.PRO_ID is
'PRO_ID';

comment on column PROFIL.LABEL is
'Label';

-- ============================================================
--   Table : SECURITY_ROLE                                        
-- ============================================================
create table SECURITY_ROLE
(
    SRO_CD      	 VARCHAR(30) 	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_SECURITY_ROLE primary key (SRO_CD)
);

comment on column SECURITY_ROLE.SRO_CD is
'SRO_CD';

comment on column SECURITY_ROLE.LABEL is
'Label';

-- ============================================================
--   Table : USER_AUTHENTIFICATION                                        
-- ============================================================
create table USER_AUTHENTIFICATION
(
    AUTH_ID     	 BIGINT      	not null,
    LOGIN       	 VARCHAR(30) 	,
    PASSWORD    	 VARCHAR(250)	,
    USR_ID      	 BIGINT      	not null,
    constraint PK_USER_AUTHENTIFICATION primary key (AUTH_ID)
);

comment on column USER_AUTHENTIFICATION.AUTH_ID is
'AUTH_ID';

comment on column USER_AUTHENTIFICATION.LOGIN is
'Login';

comment on column USER_AUTHENTIFICATION.PASSWORD is
'Password';

comment on column USER_AUTHENTIFICATION.USR_ID is
'Application user';



alter table USER_AUTHENTIFICATION
	add constraint FK_AUTH_USR_APPLICATION_USER foreign key (USR_ID)
	references APPLICATION_USER (USR_ID);

create index AUTH_USR_APPLICATION_USER_FK on USER_AUTHENTIFICATION (USR_ID asc);

alter table CASTING
	add constraint FK_CAST_MOV_MOVIE foreign key (MOV_ID)
	references MOVIE (MOV_ID);

create index CAST_MOV_MOVIE_FK on CASTING (MOV_ID asc);

alter table CASTING
	add constraint FK_CAST_PEO_PEOPLE foreign key (PEO_ID)
	references PEOPLE (PEO_ID);

create index CAST_PEO_PEOPLE_FK on CASTING (PEO_ID asc);

alter table APPLICATION_USER
	add constraint FK_USR_PRO_PROFIL foreign key (PRO_ID)
	references PROFIL (PRO_ID);

create index USR_PRO_PROFIL_FK on APPLICATION_USER (PRO_ID asc);


create table PRO_SRO
(
	PRO_ID      	 BIGINT      	 not null,
	SRO_CD      	 VARCHAR(30) 	 not null,
	constraint PK_PRO_SRO primary key (PRO_ID, SRO_CD),
	constraint FK_PRO_SRO_PROFIL 
		foreign key(PRO_ID)
		references PROFIL (PRO_ID),
	constraint FK_PRO_SRO_SECURITY_ROLE 
		foreign key(SRO_CD)
		references SECURITY_ROLE (SRO_CD)
);

create index PRO_SRO_PROFIL_FK on PRO_SRO (PRO_ID asc);

create index PRO_SRO_SECURITY_ROLE_FK on PRO_SRO (SRO_CD asc);

