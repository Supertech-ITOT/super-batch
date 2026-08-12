alter table parameter
add column deleted boolean not null default false,
add column deleted_at timestamp(6),
add column deleted_by bigint,
add constraint fk_parameter_deleted_by foreign key (deleted_by) references users (id),
drop constraint if exists uk_parameter_name;


create unique index uk_parameter_name_active on parameter (lower(name))
where
    deleted = false;


alter table action
add column deleted boolean not null default false,
add column deleted_at timestamp(6),
add column deleted_by bigint,
add constraint fk_action_deleted_by foreign key (deleted_by) references users (id),
drop constraint if exists uk_action_name;


create unique index uk_action_name_active on action (lower(name))
where
    deleted = false;


alter table transition
add column deleted boolean not null default false,
add column deleted_at timestamp(6),
add column deleted_by bigint,
add constraint fk_transition_deleted_by foreign key (deleted_by) references users (id),
drop constraint if exists uk_transition_name;


create unique index uk_transition_name_active on transition (lower(name))
where
    deleted = false;