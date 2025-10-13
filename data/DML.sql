BEGIN;

INSERT INTO patient
    ( name, dateofbirth )
VALUES
    ( "Thomodius", NOW() ),
    ( "Aloquecious", NOW() ),
    ( "Bartholomew", "2025-05-08" ),
    ( "William", "2002-02-02" ),
    ( "Bertus", "1984-06-07" )
;

ROLLBACK;
-- COMMIT;
