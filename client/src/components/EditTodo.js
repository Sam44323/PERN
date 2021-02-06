import React, { useState } from 'react';

const EditTodo = (props) => {
  const [inputState, setInputState] = useState(props.heading);

  const changeList = async (e) => {
    e.preventDefault();
    try {
      const body = { description: inputState };
      const response = await fetch(`http://localhost:5000/todos/${props.id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(response);
      props.getTheList(); // for rerendering the list compoenent
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <React.Fragment>
      <button
        type='button'
        class='btn btn-warning'
        data-toggle='modal'
        data-target={`#id${props.id}`}
      >
        Edit
      </button>
      <div
        class='modal'
        id={`id${props.id}`}
        onClick={() => setInputState(props.heading)}
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h4 class='modal-title'>{props.heading}</h4>
              <button type='button' class='close' data-dismiss='modal'>
                &times;
              </button>
            </div>

            <div class='modal-body d-flex'>
              <input
                type='text'
                value={inputState}
                className='form-control mr-3'
                onChange={(e) => setInputState(e.target.value)}
              />
              <button
                className='btn btn-success'
                onClick={(e) => {
                  changeList(e);
                  const elId = `id${props.id}`;
                  document.getElementById(elId).click();
                }}
              >
                Change
              </button>
            </div>

            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-danger'
                data-dismiss='modal'
                id={`id${props.id}`} // so that it sets id for each element
                onClick={() => setInputState(props.heading)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditTodo;
