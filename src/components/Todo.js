import React from "react";

const Todo = ({ index, todo, remove, edit, toggle }) => {
  return (
    <li className={todo.isCompleted ? "done" : null}>
      <input
        type="checkbox"
        name="isCompleted"
        checked={todo.isCompleted}
        onChange={() => toggle(index, todo.isCompleted)}
      />
      <input
        type="text"
        name="todo"
        value={todo.text}
        onChange={(e) => edit(index, e.target.value)}
      />
      <button className="del-btn" onClick={() => remove(index)}>
        x
      </button>
    </li>
  );
};

export default Todo;
