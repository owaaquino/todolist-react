import React from "react";

const TodoList = props => {
  return (
    <li>
      <input type="checkbox" />
      <p>{props.todoItems.todo}</p>
      <button>Edit</button>
      <button onClick={() => props.removeToDoItem(props.index)}>Delete</button>
    </li>
  );
};

export default TodoList;
