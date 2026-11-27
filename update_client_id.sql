-- Update client IDs to make them sequential (1,2,3,...) assuming current IDs are 1,4,5
-- This script renumbers client IDs and updates all foreign key references

SET FOREIGN_KEY_CHECKS = 0;

-- Update client IDs: assuming IDs 4 -> 2, 5 -> 3
UPDATE clients SET id = 2 WHERE id = 4;
UPDATE clients SET id = 3 WHERE id = 5;

-- Update foreign key references in invoices
UPDATE invoices SET client_id = 2 WHERE client_id = 4;
UPDATE invoices SET client_id = 3 WHERE client_id = 5;

-- Update foreign key references in tasks
UPDATE tasks SET client_id = 2 WHERE client_id = 4;
UPDATE tasks SET client_id = 3 WHERE client_id = 5;

-- Update foreign key references in reports
UPDATE reports SET client_id = 2 WHERE client_id = 4;
UPDATE reports SET client_id = 3 WHERE client_id = 5;

-- Reset AUTO_INCREMENT to the next value (4 in this case)
ALTER TABLE clients AUTO_INCREMENT = 4;

SET FOREIGN_KEY_CHECKS = 1;

-- Verify the changes
SELECT id, name FROM clients ORDER BY id;
