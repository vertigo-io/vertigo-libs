-- ============================================================
--   SGBD      		  :  H2                     
-- ============================================================




-- ============================================================
--   Sequences                                      
-- ============================================================


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



