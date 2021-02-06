import React, { useEffect, useState } from 'react';

import EditTodo from './EditTodo';

const ListTodo = (props) => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const jsonData = await response.json(); //fetching the json data from the response and parsing
      jsonData.sort(function (a, b) {
        return a.todo_id - b.todo_id;
      });
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const listDeleteHandler = async (id) => {
    try {
      let response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });
      response = await response.json();
      setTodos(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <React.Fragment>
      {!todos.length ? (
        <h1
          style={{
            textAlign: 'center',
            color: 'slategray',
            fontFamily: 'revert',
            fontSize: '37px',
          }}
        >
          Sorry No items Yet!
        </h1>
      ) : (
        <table class='table mt-5 text-center'>
          <thead>
            <tr>
              <td>Description</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((listEl) => {
              return (
                <tr key={listEl.todo_id}>
                  <td className='text-left'>{listEl.description}</td>
                  <td>
                    <EditTodo
                      heading={listEl.description}
                      id={listEl.todo_id}
                      getTheList={getTodos}
                    />
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={() => listDeleteHandler(listEl.todo_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

export default ListTodo;
