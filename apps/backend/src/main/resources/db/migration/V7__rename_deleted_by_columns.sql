alter table parameter
rename column deleted_by to deleted_by_id;


alter table action
rename column deleted_by to deleted_by_id;


alter table transition
rename column deleted_by to deleted_by_id;