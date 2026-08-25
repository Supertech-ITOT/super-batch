-- Rename existing columns
alter table license
rename column machine_id to machine_fingerprint;


alter table license
rename column activated_at to activation_date;


alter table license
rename column max_clients to client_activated;


-- Add new license fields
alter table license
add column license_number varchar(100) not null unique,
add column plan_id varchar(100) not null,
add column plan_name varchar(100) not null,
add column plan_description varchar(255),
add column plan_max_user integer not null;


-- Remove fields no longer required
alter table license
drop column plan;


alter table license
drop column version;