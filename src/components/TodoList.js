import React from "react";

const TodoList = props => {
  return (
    <li>
      <p>{props.todoItems.todo}</p>
      <button>Edit</button>
      <button>Delete</button>
    </li>
  );
};

export default TodoList;
