-- ============================================================
--   SGBD      		  :  PotsgreSql                     
-- ============================================================

-- ============================================================
--   Drop                                       
-- ============================================================
drop table IF EXISTS AGENDA cascade;
drop sequence IF EXISTS SEQ_AGENDA;
drop table IF EXISTS CRENEAU cascade;
drop sequence IF EXISTS SEQ_CRENEAU;
drop table IF EXISTS PLAGE_HORAIRE cascade;
drop sequence IF EXISTS SEQ_PLAGE_HORAIRE;
drop table IF EXISTS RESERVATION_CRENEAU cascade;
drop sequence IF EXISTS SEQ_RESERVATION_CRENEAU;
drop table IF EXISTS TRANCHE_HORAIRE cascade;
drop sequence IF EXISTS SEQ_TRANCHE_HORAIRE;




-- ============================================================
--   Sequences                                      
-- ============================================================
create sequence SEQ_AGENDA
	start with 1000 cache 1; 

create sequence SEQ_CRENEAU
	start with 1000 cache 1; 

create sequence SEQ_PLAGE_HORAIRE
	start with 1000 cache 1; 

create sequence SEQ_RESERVATION_CRENEAU
	start with 1000 cache 1; 

create sequence SEQ_TRANCHE_HORAIRE
	start with 1000 cache 1; 


-- ============================================================
--   Table : AGENDA                                        
-- ============================================================
create table AGENDA
(
    AGE_ID      	 NUMERIC     	not null,
    NOM         	 VARCHAR(100)	not null,
    constraint PK_AGENDA primary key (AGE_ID)
);

comment on column AGENDA.AGE_ID is
'Id';

comment on column AGENDA.NOM is
'Nom';

-- ============================================================
--   Table : CRENEAU                                        
-- ============================================================
create table CRENEAU
(
    CRE_ID      	 NUMERIC     	not null,
    TRH_ID      	 NUMERIC     	not null,
    REC_ID      	 NUMERIC     	,
    constraint PK_CRENEAU primary key (CRE_ID)
);

comment on column CRENEAU.CRE_ID is
'Id';

comment on column CRENEAU.TRH_ID is
'Tranche horaire';

comment on column CRENEAU.REC_ID is
'Réservation';

-- ============================================================
--   Table : PLAGE_HORAIRE                                        
-- ============================================================
create table PLAGE_HORAIRE
(
    PLH_ID      	 NUMERIC     	not null,
    DATE_LOCALE 	 DATE        	not null,
    MINUTES_DEBUT	 NUMERIC     	not null,
    MINUTES_FIN 	 NUMERIC     	not null,
    NB_GUICHET  	 NUMERIC     	not null,
    AGE_ID      	 NUMERIC     	not null,
    constraint PK_PLAGE_HORAIRE primary key (PLH_ID)
);

comment on column PLAGE_HORAIRE.PLH_ID is
'Id';

comment on column PLAGE_HORAIRE.DATE_LOCALE is
'Date de la plage';

comment on column PLAGE_HORAIRE.MINUTES_DEBUT is
'Heure de début';

comment on column PLAGE_HORAIRE.MINUTES_FIN is
'Heure de fin';

comment on column PLAGE_HORAIRE.NB_GUICHET is
'Nombre de guichets';

comment on column PLAGE_HORAIRE.AGE_ID is
'Agenda';

-- ============================================================
--   Table : RESERVATION_CRENEAU                                        
-- ============================================================
create table RESERVATION_CRENEAU
(
    REC_ID      	 NUMERIC     	not null,
    DATE_LOCALE 	 DATE        	not null,
    MINUTES_DEBUT	 NUMERIC     	not null,
    MINUTES_FIN 	 NUMERIC     	not null,
    INSTANT_CREATION	 TIMESTAMP   	not null,
    AGE_ID      	 NUMERIC     	not null,
    constraint PK_RESERVATION_CRENEAU primary key (REC_ID)
);

comment on column RESERVATION_CRENEAU.REC_ID is
'Id';

comment on column RESERVATION_CRENEAU.DATE_LOCALE is
'Date du créneau';

comment on column RESERVATION_CRENEAU.MINUTES_DEBUT is
'Heure de début';

comment on column RESERVATION_CRENEAU.MINUTES_FIN is
'Heure de fin';

comment on column RESERVATION_CRENEAU.INSTANT_CREATION is
'Date de réservation';

comment on column RESERVATION_CRENEAU.AGE_ID is
'Agenda';

-- ============================================================
--   Table : TRANCHE_HORAIRE                                        
-- ============================================================
create table TRANCHE_HORAIRE
(
    TRH_ID      	 NUMERIC     	not null,
    DATE_LOCALE 	 DATE        	not null,
    MINUTES_DEBUT	 NUMERIC     	not null,
    MINUTES_FIN 	 NUMERIC     	not null,
    NB_GUICHET  	 NUMERIC     	not null,
    INSTANT_PUBLICATION	 TIMESTAMP   	,
    PLH_ID      	 NUMERIC     	not null,
    AGE_ID      	 NUMERIC     	not null,
    constraint PK_TRANCHE_HORAIRE primary key (TRH_ID)
);

comment on column TRANCHE_HORAIRE.TRH_ID is
'Id';

comment on column TRANCHE_HORAIRE.DATE_LOCALE is
'Date du créneau';

comment on column TRANCHE_HORAIRE.MINUTES_DEBUT is
'Heure de début';

comment on column TRANCHE_HORAIRE.MINUTES_FIN is
'Heure de fin';

comment on column TRANCHE_HORAIRE.NB_GUICHET is
'Nombre de guichets';

comment on column TRANCHE_HORAIRE.INSTANT_PUBLICATION is
'Date publication';

comment on column TRANCHE_HORAIRE.PLH_ID is
'Plage horaire';

comment on column TRANCHE_HORAIRE.AGE_ID is
'Agenda';


alter table CRENEAU
	add constraint FK_A_CRENEAU_TRANCHE_HORAIRE_TRANCHE_HORAIRE foreign key (TRH_ID)
	references TRANCHE_HORAIRE (TRH_ID);

create index A_CRENEAU_TRANCHE_HORAIRE_TRANCHE_HORAIRE_FK on CRENEAU (TRH_ID asc);

alter table PLAGE_HORAIRE
	add constraint FK_A_PLAGE_HORAIRE_AGENDA_AGENDA foreign key (AGE_ID)
	references AGENDA (AGE_ID);

create index A_PLAGE_HORAIRE_AGENDA_AGENDA_FK on PLAGE_HORAIRE (AGE_ID asc);

alter table RESERVATION_CRENEAU
	add constraint FK_A_RESERVATION_CRENEAU_AGENDA_AGENDA foreign key (AGE_ID)
	references AGENDA (AGE_ID);

create index A_RESERVATION_CRENEAU_AGENDA_AGENDA_FK on RESERVATION_CRENEAU (AGE_ID asc);

alter table CRENEAU
	add constraint FK_A_RESERVATION_CRENEAU_CRENEAU_RESERVATION_CRENEAU foreign key (REC_ID)
	references RESERVATION_CRENEAU (REC_ID);

create index A_RESERVATION_CRENEAU_CRENEAU_RESERVATION_CRENEAU_FK on CRENEAU (REC_ID asc);

alter table TRANCHE_HORAIRE
	add constraint FK_A_TRANCHE_HORAIRE_AGENDA_AGENDA foreign key (AGE_ID)
	references AGENDA (AGE_ID);

create index A_TRANCHE_HORAIRE_AGENDA_AGENDA_FK on TRANCHE_HORAIRE (AGE_ID asc);

alter table TRANCHE_HORAIRE
	add constraint FK_A_TRANCHE_PLAGE_HORAIRE_PLAGE_HORAIRE foreign key (PLH_ID)
	references PLAGE_HORAIRE (PLH_ID);

create index A_TRANCHE_PLAGE_HORAIRE_PLAGE_HORAIRE_FK on TRANCHE_HORAIRE (PLH_ID asc);


