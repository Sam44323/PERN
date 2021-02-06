/*for creating a new sql database with the native SQL command*/

CREATE DATABASE perntodos;

/*creating a table by specifying the schema
SERIAL will increase the value of the id key for every new entry
*/

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
);