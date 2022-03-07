import React, { FC } from "react";
import { useAppDispatch } from "app/hooks";
import { toggle, remove, edit } from "reducers/todoSlice";
import { TodoT } from "types";

type TodoProps = {
  index: number;
  todo: TodoT;
};

const Todo: FC<TodoProps> = ({ index, todo }) => {
  const dispatch = useAppDispatch();

  return (
    <li className={todo.isCompleted ? "done" : ""}>
      <input
        type="checkbox"
        name="isCompleted"
        checked={todo.isCompleted}
        onChange={() => dispatch(toggle(index))}
      />
      <input
        type="text"
        name="todo"
        value={todo.text}
        onChange={(e) => dispatch(edit({ id: index, text: e.target.value }))}
      />
      <button className="del-btn" onClick={() => dispatch(remove(index))}>
        x
      </button>
    </li>
  );
};

export default Todo;
