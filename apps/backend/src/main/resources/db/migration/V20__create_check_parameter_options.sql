CREATE TABLE check_parameter_options
(
    id                  BIGSERIAL PRIMARY KEY,
    check_parameter_id  BIGINT NOT NULL,
    value               VARCHAR(255),
    is_allowed          BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_check_parameter_options_parameter
        FOREIGN KEY (check_parameter_id)
        REFERENCES check_parameter(id)
);