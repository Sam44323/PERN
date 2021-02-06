//cors helps to connect one port with the other( as we will hav nodejs and react in different ports)

const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors()); // enabling cors for all request
app.use(express.json()); // this does the same work as bodyparser, so no worries

//creating middleware

//ROUTES(with postgresql)

//create a todo

app.post('/todos', async (req, res) => {
  try {
    //entering the data to the description coloumn of the todo table
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows[0]); // returning response in JSON format(for api testing purposes)
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo'); // getting the data from the todo table
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get('/todos/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      todoId,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put('/todos/:id', async (req, res) => {
  try {
    const description = req.body.description;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, req.params.id]
    ); // updating the description of the todo of the specific id
    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ]);
    const allTodos = await pool.query('SELECT * FROM todo'); // getting the data from the todo table
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.use('/', (req, res) => {
  res.send('This is a page');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
