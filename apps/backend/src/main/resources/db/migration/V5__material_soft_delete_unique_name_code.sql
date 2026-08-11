alter table material
add column deleted boolean not null default false;


alter table material
add column deleted_at timestamp(6);


alter table material
add column deleted_by_id bigint;


alter table material
add constraint fk_material_deleted_by foreign key (deleted_by_id) references users (id);


alter table material
drop constraint if exists uk_material_name;


alter table material
drop constraint if exists uk_material_code;


create unique index uk_material_name_active on material (lower(name))
where
    deleted = false;


create unique index uk_material_code_active on material (lower(code))
where
    deleted = false;