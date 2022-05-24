CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"description" varchar(256),
	"completed" boolean DEFAULT false
	-- might also add "timecompleted" varchar(50) DEFAULT '' (I think, not sure the syntax because I added this column in after the table was created)
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

-- adding new column for when the task was completed and set the default value
ALTER TABLE tasks ADD timeCompleted varchar(50);
ALTER TABLE tasks ALTER timecompleted SET DEFAULT '';

-- add current time to database when task is completed
UPDATE tasks SET timecompleted='05/23/2022 at 6:45pm' WHERE id=37;

-- update completed boolean and time completed in one query
UPDATE tasks SET completed=false, timecompleted='05/23/2022 at 6:57pm' WHERE id=36;