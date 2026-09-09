CREATE TABLE batch_check
(
    id               BIGSERIAL PRIMARY KEY,
    batch_id         BIGINT NOT NULL,
    batch_sop_id     BIGINT NOT NULL,
    loop             INTEGER,
    sample_date_time TIMESTAMP,
    unit_id          BIGINT NOT NULL,

    CONSTRAINT fk_batch_check_batch
        FOREIGN KEY (batch_id)
        REFERENCES batch(id),

    CONSTRAINT fk_batch_check_batch_sop
        FOREIGN KEY (batch_sop_id)
        REFERENCES batch_sop(id),

    CONSTRAINT fk_batch_check_unit
        FOREIGN KEY (unit_id)
        REFERENCES unit(id)
);


CREATE TABLE check_parameter
(
    id          BIGSERIAL PRIMARY KEY,
    code        VARCHAR(50) NOT NULL,
    name        VARCHAR(100) NOT NULL,
    data_type   VARCHAR(255),
    uom         VARCHAR(255),
    deleted     BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at  TIMESTAMP,
    deleted_by_id BIGINT,

    CONSTRAINT fk_check_parameter_deleted_by
        FOREIGN KEY (deleted_by_id)
        REFERENCES users(id)
);

CREATE TABLE batch_check_result
(
    id                   BIGSERIAL PRIMARY KEY,
    batch_check_id       BIGINT NOT NULL,
    check_parameter_id   BIGINT NOT NULL,
    value                VARCHAR(255),
    result_status        VARCHAR(255),
    remark               VARCHAR(255) NOT NULL,

    CONSTRAINT fk_batch_check_result_batch_check
        FOREIGN KEY (batch_check_id)
        REFERENCES batch_check(id),

    CONSTRAINT fk_batch_check_result_check_parameter
        FOREIGN KEY (check_parameter_id)
        REFERENCES check_parameter(id)
);


CREATE TABLE material_correction
(
    id                BIGSERIAL PRIMARY KEY,
    batch_id          BIGINT NOT NULL,
    batch_sop_id      BIGINT NOT NULL,
    loop              INTEGER,
    sample_date_time  TIMESTAMP,
    material_id       BIGINT NOT NULL,
    qty               DOUBLE PRECISION,
    reason            VARCHAR(255) NOT NULL,

    CONSTRAINT fk_material_correction_batch
        FOREIGN KEY (batch_id)
        REFERENCES batch(id),

    CONSTRAINT fk_material_correction_batch_sop
        FOREIGN KEY (batch_sop_id)
        REFERENCES batch_sop(id),

    CONSTRAINT fk_material_correction_material
        FOREIGN KEY (material_id)
        REFERENCES material(id)
);