import React, { useState } from "react";

const TodoForm = (props) => {
  const [text, setText] = useState("");

  const addItemOnList = (e) => {
    e.preventDefault();

    const todoItem = {
      todo: text,
      isCompleted: false,
    };

    props.addToDoItems(todoItem);
    e.currentTarget.reset();
  };

  return (
    <form id="todoList-form" onSubmit={addItemOnList}>
      <input
        type="text"
        name="todosTxtbx"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button>Add +</button>
    </form>
  );
};

export default TodoForm;
