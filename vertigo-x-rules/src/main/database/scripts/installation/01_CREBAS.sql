-- ============================================================
--   Nom de SGBD      :  sqlserver                     
--   Date de création :  12 janv. 2017  17:34:24                     
-- ============================================================




-- ============================================================
--   Table : RULE_CONDITION_DEFINITION                                        
-- ============================================================
create table RULE_CONDITION_DEFINITION
(
    ID          	 NUMERIC     	identity,
    EXPRESSION  	 VARCHAR(100)	,
    FIELD       	 VARCHAR(100)	,
    OPERATOR    	 VARCHAR(120)	,
    RUD_ID      	 NUMERIC     	,
    constraint PK_RULE_CONDITION_DEFINITION primary key nonclustered (ID)
);

comment on column RULE_CONDITION_DEFINITION.ID is
'id';

comment on column RULE_CONDITION_DEFINITION.EXPRESSION is
'expression';

comment on column RULE_CONDITION_DEFINITION.FIELD is
'field';

comment on column RULE_CONDITION_DEFINITION.OPERATOR is
'operator';

comment on column RULE_CONDITION_DEFINITION.RUD_ID is
'RuleDefinition';

-- ============================================================
--   Table : RULE_DEFINITION                                        
-- ============================================================
create table RULE_DEFINITION
(
    ID          	 NUMERIC     	identity,
    CREATION_DATE	 DATE        	,
    ITEM_ID     	 NUMERIC     	,
    LABEL       	 VARCHAR(100)	,
    constraint PK_RULE_DEFINITION primary key nonclustered (ID)
);

comment on column RULE_DEFINITION.ID is
'id';

comment on column RULE_DEFINITION.CREATION_DATE is
'creationDate';

comment on column RULE_DEFINITION.ITEM_ID is
'itemId';

comment on column RULE_DEFINITION.LABEL is
'Label';

-- ============================================================
--   Table : RULE_FILTER_DEFINITION                                        
-- ============================================================
create table RULE_FILTER_DEFINITION
(
    ID          	 NUMERIC     	identity,
    EXPRESSION  	 VARCHAR(100)	,
    FIELD       	 VARCHAR(100)	,
    OPERATOR    	 VARCHAR(120)	,
    constraint PK_RULE_FILTER_DEFINITION primary key nonclustered (ID)
);

comment on column RULE_FILTER_DEFINITION.ID is
'id';

comment on column RULE_FILTER_DEFINITION.EXPRESSION is
'expression';

comment on column RULE_FILTER_DEFINITION.FIELD is
'field';

comment on column RULE_FILTER_DEFINITION.OPERATOR is
'operator';

-- ============================================================
--   Table : SELECTOR_DEFINITION                                        
-- ============================================================
create table SELECTOR_DEFINITION
(
    ID          	 NUMERIC     	identity,
    CREATION_DATE	 DATE        	,
    GROUP_ID    	 NUMERIC     	,
    ITEM_ID     	 NUMERIC     	,
    constraint PK_SELECTOR_DEFINITION primary key nonclustered (ID)
);

comment on column SELECTOR_DEFINITION.ID is
'id';

comment on column SELECTOR_DEFINITION.CREATION_DATE is
'creationDate';

comment on column SELECTOR_DEFINITION.GROUP_ID is
'group';

comment on column SELECTOR_DEFINITION.ITEM_ID is
'itemId';


alter table RULE_CONDITION_DEFINITION
	add constraint FK_RUD_COD_RULE_DEFINITION foreign key (RUD_ID)
	references RULE_DEFINITION (ID);

create index RUD_COD_RULE_DEFINITION_FK on RULE_CONDITION_DEFINITION (RUD_ID asc);


