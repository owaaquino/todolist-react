import React from "react";

const TodoList = (props) => {
  const handleChange = (event) => {
    const updateTodo = {
      ...props.todoItems,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    console.log(event.currentTarget.value);
    props.updateTodos(props.index, updateTodo);
  };

  const toggleCheckbox = (event) => {
    const updateTodo = {
      ...props.todoItems,
      [event.currentTarget.name]: event.currentTarget.checked,
    };
    this.props.updateTodos(props.index, updateTodo);
  };

  return (
    <li className={props.todoItems.isCompleted ? "done" : null}>
      <input
        type="checkbox"
        name="isCompleted"
        checked={props.todoItems.isCompleted}
        onChange={toggleCheckbox}
      />
      <input
        type="text"
        name="todo"
        value={props.todoItems.todo}
        onChange={handleChange}
      />
      <button
        className="del-btn"
        onClick={() => props.removeToDoItem(props.index)}
      >
        x
      </button>
    </li>
  );
};

export default TodoList;
