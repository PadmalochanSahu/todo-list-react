import React from "react";

const Todo = (props) => {
  return (
    <>
      <li>{props.todo}</li>
      <div className="icons">
      <i className="fa-solid fa-pen-to-square" onClick={() => {
          props.onEdit(props.id);}}></i>
      <i className="fa-solid fa-trash deleteBtn"  onClick={() => {
          props.onDelete(props.id);
        }}></i>
      </div>
    </>
  );
};

export default Todo;
