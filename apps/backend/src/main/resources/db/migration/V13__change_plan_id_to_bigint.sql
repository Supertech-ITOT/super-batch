update license
set
    plan_id = '1';


alter table license
alter column plan_id
type bigint using plan_id::bigint;