alter table parameter
drop constraint parameter_uom_check;


alter table parameter
add constraint parameter_uom_check check (
    uom in (
        'CELSIUS',
        'BAR',
        'PSI',
        'LITER',
        'KG',
        'RPM',
        'PERCENT',
        'LITER_PER_MINUTE',
        'KG_PER_HOUR',
        'PH',
        'VOLT',
        'AMPERE',
        'KG_PER_CM2'
    )
);