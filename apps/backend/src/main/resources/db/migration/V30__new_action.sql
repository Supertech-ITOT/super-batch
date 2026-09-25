ALTER TABLE batch_audit
DROP CONSTRAINT IF EXISTS batch_audit_action_check;

ALTER TABLE batch_audit
ADD CONSTRAINT batch_audit_action_check
CHECK (
    action IN (
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
        'BATCH_COMPLETE',
        'BATCH_READY'
    )
);