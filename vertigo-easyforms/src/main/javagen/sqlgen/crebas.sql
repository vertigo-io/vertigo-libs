-- ============================================================
--   SGBD      		  :  PotsgreSql                     
-- ============================================================

-- ============================================================
--   Drop                                       
-- ============================================================
drop table IF EXISTS META_FORMULAIRE cascade;
drop sequence IF EXISTS SEQ_META_FORMULAIRE;
drop table IF EXISTS TAXONOMIE cascade;
drop sequence IF EXISTS SEQ_TAXONOMIE;
drop table IF EXISTS TAXONOMIE_TYPE cascade;
drop sequence IF EXISTS SEQ_TAXONOMIE_TYPE;




-- ============================================================
--   Sequences                                      
-- ============================================================
create sequence SEQ_META_FORMULAIRE
	start with 1000 cache 1; 

create sequence SEQ_TAXONOMIE
	start with 1000 cache 1; 

create sequence SEQ_TAXONOMIE_TYPE
	start with 1000 cache 1; 


-- ============================================================
--   Table : META_FORMULAIRE                                        
-- ============================================================
create table META_FORMULAIRE
(
    MFO_ID      	 NUMERIC     	not null,
    MODELE      	 JSONB       	,
    constraint PK_META_FORMULAIRE primary key (MFO_ID)
);

comment on column META_FORMULAIRE.MFO_ID is
'Id';

comment on column META_FORMULAIRE.MODELE is
'Modèle';

-- ============================================================
--   Table : TAXONOMIE                                        
-- ============================================================
create table TAXONOMIE
(
    TAX_ID      	 NUMERIC     	not null,
    VALUE       	 VARCHAR(100)	,
    SORT        	 NUMERIC     	not null,
    ACTIVE      	 BOOLEAN     	not null,
    TAT_ID      	 NUMERIC     	not null,
    constraint PK_TAXONOMIE primary key (TAX_ID)
);

comment on column TAXONOMIE.TAX_ID is
'Id';

comment on column TAXONOMIE.VALUE is
'Valeur';

comment on column TAXONOMIE.SORT is
'Ordre';

comment on column TAXONOMIE.ACTIVE is
'Actif';

comment on column TAXONOMIE.TAT_ID is
'Taxonomie type';

-- ============================================================
--   Table : TAXONOMIE_TYPE                                        
-- ============================================================
create table TAXONOMIE_TYPE
(
    TAT_ID      	 NUMERIC     	not null,
    CODE        	 VARCHAR(100)	,
    LABEL       	 VARCHAR(100)	not null,
    ACTIVE      	 BOOLEAN     	not null,
    constraint PK_TAXONOMIE_TYPE primary key (TAT_ID)
);

comment on column TAXONOMIE_TYPE.TAT_ID is
'Id';

comment on column TAXONOMIE_TYPE.CODE is
'Code liste';

comment on column TAXONOMIE_TYPE.LABEL is
'Libelle';

comment on column TAXONOMIE_TYPE.ACTIVE is
'Actif';


alter table TAXONOMIE
	add constraint FK_A_TAXONOMIE_VALUE_TYPE_TAXONOMIE_TYPE foreign key (TAT_ID)
	references TAXONOMIE_TYPE (TAT_ID);

create index A_TAXONOMIE_VALUE_TYPE_TAXONOMIE_TYPE_FK on TAXONOMIE (TAT_ID asc);


