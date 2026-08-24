alter table batch_audit
add column entity_new varchar(50);


update batch_audit
set
    entity_new = case entity
        when 0 then 'ROLE'
        when 1 then 'USER'
        when 2 then 'PLANT'
        when 3 then 'AREA'
        when 4 then 'UNIT'
        when 5 then 'EQUIPMENT'
        when 6 then 'MATERIAL'
        when 7 then 'PARAMETER'
        when 8 then 'TRANSITION'
        when 9 then 'ACTION'
        when 10 then 'RECIPE'
        when 11 then 'RECIPE_SOP'
        when 12 then 'CONTROL_RECIPE'
        when 13 then 'CONTROL_RECIPE_SOP'
        when 14 then 'BATCH'
        else null
    end;


alter table batch_audit
drop column entity;


alter table batch_audit
rename column entity_new to entity;


alter table batch_audit
alter column entity
set not null;