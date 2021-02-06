import React, { useState } from 'react';

const InputTodo = (props) => {
  const [description, setdescription] = useState('');

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { description: description };
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(response);
      window.location = '/'; // for refreshing the window after the response has been sent for re-rendering all the components in the App component
      setdescription('');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <React.Fragment>
      <h1 className='text-center m-5'>Pern Todo list</h1>
      <form className='d-flex mt-5' onSubmit={(event) => onFormSubmit(event)}>
        <input
          type='text'
          className='form-control'
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <button type='submit' className='btn btn-success'>
          Add
        </button>
      </form>
    </React.Fragment>
  );
};

export default InputTodo;
