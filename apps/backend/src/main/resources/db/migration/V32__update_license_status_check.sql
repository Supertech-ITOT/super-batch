alter table license
drop constraint if exists chk_license_status;


alter table license
drop constraint if exists license_status_check;


alter table license
add constraint license_status_check check (status in ('INACTIVE', 'ACTIVE', 'REVOKED', 'SUSPENDED', 'EXPIRED'));