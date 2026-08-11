alter table role
drop constraint if exists uk_role_name;


create unique index uk_role_name_active on role (lower(name))
where
    deleted = false;