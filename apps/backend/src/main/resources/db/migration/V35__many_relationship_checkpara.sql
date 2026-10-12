with
    duplicates as (
        select
            id,
            name,
            row_number() over (
                partition by
                    lower(name)
                order by
                    id
            ) as rn
        from
            check_parameter
        where
            deleted = false
    )
update check_parameter cp
set
    name = d.name || ' ' || d.id
from
    duplicates d
where
    cp.id = d.id
    and d.rn > 1;


create table
    check_parameter_material (
        check_parameter_id bigint not null,
        material_id bigint not null,
        primary key (check_parameter_id, material_id),
        constraint fk_check_parameter_material_parameter foreign key (check_parameter_id) references check_parameter (id),
        constraint fk_check_parameter_material_material foreign key (material_id) references material (id)
    );


insert into
    check_parameter_material (check_parameter_id, material_id)
select
    id,
    material_id
from
    check_parameter
where
    material_id is not null;


create unique index uk_check_parameter_name on check_parameter (lower(name))
where
    deleted = false;