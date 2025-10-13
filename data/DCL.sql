-- Create the read/write service account
CREATE USER 'rw_service_account'@'localhost' IDENTIFIED BY 'RW$1234service';

-- Give SELECT and INSERT privileges to the read/write service account
GRANT SELECT, INSERT ON complab.* TO 'rw_service_account'@'localhost';

-- DROP USER 'rw_service_account'@'localhost'; -- for testing
