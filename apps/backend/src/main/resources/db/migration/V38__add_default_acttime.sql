alter table batch_sop
alter column act_time
set default 0.0;


update batch_sop
set
    act_time = 0.0
where
    act_time is null;


alter table batch_sop
alter column act_time
set not null;