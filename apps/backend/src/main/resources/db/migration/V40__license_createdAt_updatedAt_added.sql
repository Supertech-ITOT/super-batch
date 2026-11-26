alter table license
add column created_at timestamp not null default current_timestamp;


alter table license
add column updated_at timestamp not null default current_timestamp;