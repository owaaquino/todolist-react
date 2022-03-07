import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "app/hooks";
import { add } from "reducers/todoSlice";

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const createTodo = (e: FormEvent) => {
    e.preventDefault();

    dispatch(add({ text, isCompleted: false }));
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
