import React from "react";

const TodoList = props => {
  handleChange = event => {
    const updateTodo = {
      ...this.props.todoItems,
      todo: event.currentTarget.value
    };
    console.log(updateTodo);
  };
  return (
    <li>
      <input type="checkbox" name="isChecked" />
      <input
        type="text"
        name="todo"
        value={props.todoItems.todo}
        onChange={handleChange}
      />
      <button>Edit</button>
      <button onClick={() => props.removeToDoItem(props.index)}>Delete</button>
    </li>
  );
};

export default TodoList;
