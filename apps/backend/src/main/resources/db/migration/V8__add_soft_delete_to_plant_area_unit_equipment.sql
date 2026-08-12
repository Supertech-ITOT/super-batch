-- =========================================================
-- PLANT
-- =========================================================
alter table plant
add column deleted boolean not null default false,
add column deleted_at timestamp(6),
add column deleted_by_id bigint,
add constraint fk_plant_deleted_by foreign key (deleted_by_id) references users (id);


alter table plant
drop constraint if exists uk_plant_name;


create unique index uk_plant_name_active on plant (lower(name))
where
    deleted = false;


-- =========================================================
-- AREA
-- =========================================================
alter table area
add column deleted boolean not null default false,
add column deleted_at timestamp(6),
add column deleted_by_id bigint,
add constraint fk_area_deleted_by foreign key (deleted_by_id) references users (id);


alter table area
drop constraint if exists uk_area_plant_name;


create unique index uk_area_plant_name_active on area(plant_id, lower(name))
where
    deleted = false;


-- =========================================================
-- UNIT
-- =========================================================
alter table unit
add column deleted boolean not null default false,
add column deleted_at timestamp(6),
add column deleted_by_id bigint,
add constraint fk_unit_deleted_by foreign key (deleted_by_id) references users (id);


alter table unit
drop constraint if exists uk_unit_area_name;


alter table unit
drop constraint if exists uk_unit_code;


create unique index uk_unit_area_name_active on unit (area_id, lower(name))
where
    deleted = false;


create unique index uk_unit_code_active on unit (lower(code))
where
    deleted = false;


-- =========================================================
-- EQUIPMENT
-- =========================================================
alter table equipment
add column deleted boolean not null default false,
add column deleted_at timestamp(6),
add column deleted_by_id bigint,
add constraint fk_equipment_deleted_by foreign key (deleted_by_id) references users (id);


alter table equipment
drop constraint if exists uk_equipment_code;


create unique index uk_equipment_name_active on equipment (lower(name))
where
    deleted = false;


create unique index uk_equipment_code_active on equipment (lower(code))
where
    deleted = false;