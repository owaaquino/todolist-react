import React, { useState } from "react";

const TodoForm = ({ handleAdd }) => {
  const [text, setText] = useState("");

  const createTodo = (e) => {
    e.preventDefault();

    const todoItem = {
      text: text,
      isCompleted: false,
    };

    handleAdd(todoItem);
    e.currentTarget.reset();
  };

  return (
    <form id="todoList-form" onSubmit={createTodo}>
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
