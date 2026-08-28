alter table license
alter column activation_date
type DATE using activation_date::DATE;


alter table license
alter column activation_date
set not null;


alter table license
add column customer_email varchar(255) not null;