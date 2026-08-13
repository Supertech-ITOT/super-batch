-- =========================================================
-- RECIPE
-- =========================================================
alter table recipe
add column deleted boolean not null default false,
add column deleted_at timestamp(6),
add column deleted_by_id bigint,
add constraint fk_recipe_deleted_by foreign key (deleted_by_id) references users (id);


alter table recipe
drop constraint if exists uk_recipe_name;


create unique index uk_recipe_name_active on recipe (lower(name))
where
    deleted = false;


-- =========================================================
-- CONTROL RECIPE
-- =========================================================
alter table control_recipe
add column deleted boolean not null default false,
add column deleted_at timestamp(6),
add column deleted_by_id bigint,
add constraint fk_control_recipe_deleted_by foreign key (deleted_by_id) references users (id);


-- Remove the existing UNIQUE constraint on batchNo
alter table control_recipe
drop constraint if exists uk_control_recipe_batch_no;


-- Batch number must be unique only for active control recipes
create unique index uk_control_recipe_batch_no_active on control_recipe (batch_no)
where
    deleted = false;