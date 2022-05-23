CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"description" varchar(256),
	"completed" boolean DEFAULT false
);

-- CRUD tests
INSERT INTO tasks (description) VALUES ('Clean the kitchen');
SELECT * FROM tasks;
UPDATE tasks SET completed=true WHERE id=2;
DELETE FROM tasks WHERE id=1;

-- using ORDER BY in READ
SELECT * FROM tasks ORDER BY id ASC;

-- used for toggling the boolean completed to false
UPDATE tasks SET completed=false WHERE id=$1;

-- adding new column for when the task was completed
ALTER TABLE tasks ADD timeCompleted varchar(50);