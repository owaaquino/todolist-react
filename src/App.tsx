import React, { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";
import { TodoT } from "types";
import { selectTodos } from "reducers/todoSlice";
import { useAppSelector } from "app/hooks";

const App = () => {
  const todos = useAppSelector(selectTodos);
  // const [todoItems, setTodoItems] = useState<TodoT[]>([]);

  // const handleAdd = (todo: TodoT) => {
  //   setTodoItems([todo, ...todoItems]);
  // };

  // const handleRemove = (id: number) => {
  //   todoItems.splice(id, 1);
  //   setTodoItems([...todoItems]);
  // };

  // const handleEdit = (id: number, text: string) => {
  //   todoItems[id].text = text;
  //   setTodoItems([...todoItems]);
  // };

  // const handleToggle = (id: number, isCompleted: boolean) => {
  //   todoItems[id].isCompleted = !isCompleted;
  //   setTodoItems([...todoItems]);
  // };

  return (
    <div className="App">
      <TodoForm />
      <ul>
        {todos.map((todo, id) => (
          <Todo key={id} todo={todo} index={id} />
        ))}
      </ul>
    </div>
  );
};

export default App;
