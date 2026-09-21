ALTER TABLE check_parameter
    DROP COLUMN code;

ALTER TABLE check_parameter
    DROP COLUMN data_type;

ALTER TABLE check_parameter
    ADD COLUMN min DOUBLE PRECISION NOT NULL DEFAULT 0;

ALTER TABLE check_parameter
    ADD COLUMN max DOUBLE PRECISION NOT NULL DEFAULT 0;

ALTER TABLE check_parameter
    ADD COLUMN material_id BIGINT NOT NULL;

ALTER TABLE check_parameter
    ADD COLUMN type VARCHAR(255);

ALTER TABLE check_parameter
    ADD CONSTRAINT fk_check_parameter_material
        FOREIGN KEY (material_id)
        REFERENCES material(id);

ALTER TABLE batch_check_result
    DROP COLUMN remark;

ALTER TABLE material_correction
    DROP COLUMN reason;