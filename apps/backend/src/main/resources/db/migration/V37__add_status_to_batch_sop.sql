alter table batch_sop
add column status varchar(20);


update batch_sop
set
    status = case
        when start_date_time is not null
        and end_date_time is not null then 'COMPLETED'
        when start_date_time is not null
        and end_date_time is null then 'IN_PROGRESS'
        else 'PENDING'
    end;


alter table batch_sop
alter column status
set default 'PENDING';


alter table batch_sop
alter column status
set not null;


alter table batch_sop
add constraint chk_batch_sop_status check (
    status in ('PENDING', 'IN_PROGRESS', 'PAUSED', 'COMPLETED', 'SKIPPED', 'ABORTED')
);