alter table batch_audit
drop constraint if exists batch_audit_action_check;


alter table batch_audit
add constraint batch_audit_action_check check (
    action in (
        'CREATED',
        'UPDATED',
        'DELETED',
        'RECIPE_RELEASED',
        'BATCH_TRANSFERED',
        'BATCH_START',
        'BATCH_STOP',
        'BATCH_RESUME',
        'BATCH_PAUSE',
        'BATCH_ABORT',
        'BATCH_COMPLETE'
    )
);