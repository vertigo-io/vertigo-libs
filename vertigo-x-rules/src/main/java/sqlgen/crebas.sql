-- ============================================================
--   Table : RULE_DEFINITION                                        
-- ============================================================
create table RULE_DEFINITION
(
    ID     	 	 NUMERIC     	not null,
    LABEL        	 VARCHAR(100)	,
    CREATION_DATE	 DATE        	,
    ITEM_ID     	 NUMERIC     	not null,
    constraint PK_RULE_DEFINITION primary key  (ID)
);

create sequence SEQ_RULE_DEFINITION
	start with 1000 cache 20; 

-- ============================================================
--   Table : RULE_CONDITION_DEFINITION                                       
-- ============================================================
create table RULE_CONDITION_DEFINITION
(
    ID      	 NUMERIC     	not null,
    FIELD        	 VARCHAR(50)	,
    OPERATOR       	 VARCHAR(3)		,
    EXPRESSION       VARCHAR(100)	,
    RUD_ID     	 	 NUMERIC     	not null,
    constraint PK_RULE_CONDITION_DEFINITION primary key  (ID)
);

create sequence SEQ_RULE_CONDITION_DEFINITION
	start with 1000 cache 20; 

alter table RULE_CONDITION_DEFINITION
	add constraint FK_RUD_RCD_WF_RULE_CONDITION_DEFINITION foreign key (RUD_ID)
	references RULE_DEFINITION (RUD_ID);
	
-- ============================================================
--   Table : RULE_FILTER_DEFINITION                                       
-- ============================================================
create table RULE_FILTER_DEFINITION
(
    ID      	 NUMERIC     	not null,
    FIELD        	 VARCHAR(50)	,
    OPERATOR       	 VARCHAR(3)		,
    EXPRESSION       VARCHAR(100)	,
    SEL_ID     	 	 NUMERIC     	not null,
    constraint PK_RULE_CONDITION_DEFINITION primary key  (ID)
);

create sequence SEQ_RULE_FILTER_DEFINITION
	start with 1000 cache 20; 

alter table RULE_FILTER_DEFINITION
	add constraint FK_SEL_ID_RULE_FILTER_DEFINITION foreign key (SEL_ID)
	references SELECTOR_DEFINITION (SEL_ID);

	-- ============================================================
--   Table : RULE_DEFINITION                                        
-- ============================================================
create table SELECTOR_DEFINITION
(
    ID     	 	 NUMERIC     	not null,
    CREATION_DATE	 DATE        	,
    ITEM_ID     	 NUMERIC     	not null,
    GROUP_ID     	 NUMERIC     	not null,
    constraint PK_SELECTOR_DEFINITION primary key  (ID)
);

create sequence SEQ_SELECTOR_DEFINITION
	start with 1000 cache 20; 


