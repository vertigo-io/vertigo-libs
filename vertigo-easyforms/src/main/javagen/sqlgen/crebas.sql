-- ============================================================
--   SGBD      		  :  PotsgreSql                     
-- ============================================================

-- ============================================================
--   Drop                                       
-- ============================================================
drop table IF EXISTS META_FORMULAIRE cascade;
drop sequence IF EXISTS SEQ_META_FORMULAIRE;
drop table IF EXISTS TAXONOMY cascade;
drop sequence IF EXISTS SEQ_TAXONOMY;
drop table IF EXISTS TAXONOMY_TYPE cascade;
drop sequence IF EXISTS SEQ_TAXONOMY_TYPE;




-- ============================================================
--   Sequences                                      
-- ============================================================
create sequence SEQ_META_FORMULAIRE
	start with 1000 cache 1; 

create sequence SEQ_TAXONOMY
	start with 1000 cache 1; 

create sequence SEQ_TAXONOMY_TYPE
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
--   Table : TAXONOMY                                        
-- ============================================================
create table TAXONOMY
(
    TAX_ID      	 NUMERIC     	not null,
    VALUE       	 VARCHAR(100)	,
    SORT        	 NUMERIC     	not null,
    ACTIVE      	 BOOLEAN     	not null,
    CODE        	 VARCHAR(100)	,
    TAT_ID      	 NUMERIC     	not null,
    constraint PK_TAXONOMY primary key (TAX_ID)
);

comment on column TAXONOMY.TAX_ID is
'Id';

comment on column TAXONOMY.VALUE is
'Valeur';

comment on column TAXONOMY.SORT is
'Ordre';

comment on column TAXONOMY.ACTIVE is
'Actif';

comment on column TAXONOMY.CODE is
'Code';

comment on column TAXONOMY.TAT_ID is
'Taxonomy type';

-- ============================================================
--   Table : TAXONOMY_TYPE                                        
-- ============================================================
create table TAXONOMY_TYPE
(
    TAT_ID      	 NUMERIC     	not null,
    CODE        	 VARCHAR(100)	,
    LABEL       	 VARCHAR(100)	not null,
    ACTIVE      	 BOOLEAN     	not null,
    constraint PK_TAXONOMY_TYPE primary key (TAT_ID)
);

comment on column TAXONOMY_TYPE.TAT_ID is
'Id';

comment on column TAXONOMY_TYPE.CODE is
'Code liste';

comment on column TAXONOMY_TYPE.LABEL is
'Libelle';

comment on column TAXONOMY_TYPE.ACTIVE is
'Actif';


alter table TAXONOMY
	add constraint FK_A_TAXONOMY_VALUE_TYPE_TAXONOMY_TYPE foreign key (TAT_ID)
	references TAXONOMY_TYPE (TAT_ID);

create index A_TAXONOMY_VALUE_TYPE_TAXONOMY_TYPE_FK on TAXONOMY (TAT_ID asc);


