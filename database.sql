CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"description" varchar(256),
	"completed" boolean DEFAULT false
);

-- CRUD tests
INSERT INTO tasks (description) VALUES ('Clean the kitchen');
SELECT * FROM tasks;
DELETE FROM tasks WHERE id=1;