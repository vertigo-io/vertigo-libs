-- we add the new column NODE_ID
alter table O_ACTIVITY_EXECUTION add column NODE_ID text;
alter table O_PROCESS_PLANIFICATION add column NODE_ID text;

-- we keep only the node name
update O_ACTIVITY_EXECUTION ace set
	NODE_ID = (select nod.NAME from O_NODE nod where nod.NOD_ID = ace.NOD_ID);
	
update O_ACTIVITY_EXECUTION ace set
	NODE_ID = (select nod.NAME from O_NODE nod where nod.NOD_ID = ace.NOD_ID);
	
-- we drop the old column
alter table O_ACTIVITY_EXECUTION drop column NOD_ID cascade;
alter table O_PROCESS_PLANIFICATION drop column NOD_ID cascade;

-- we drop the o_node table (no longer linked to orchestra but in vertigo node management)
drop table o_node;
drop sequence SEQ_O_NODE;




