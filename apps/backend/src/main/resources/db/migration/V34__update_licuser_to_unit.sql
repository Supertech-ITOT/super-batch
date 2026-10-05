alter table license
rename column user_count to unit_count;
alter table license
rename column plan_max_user to plan_max_units;