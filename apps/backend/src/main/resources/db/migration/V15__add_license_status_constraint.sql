alter table license
add constraint chk_license_status check (status in ('INACTIVE', 'ACTIVE', 'REVOKED', 'SUSPENDED', 'EXPIRED'));