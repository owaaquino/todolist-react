import React, { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";

const App = () => {
  const [todoItems, setTodoItems] = useState([]);

  const handleAdd = (todo) => {
    setTodoItems([todo, ...todoItems]);
  };

  const handleRemove = (id) => {
    todoItems.splice(id, 1);
    setTodoItems([...todoItems]);
  };

  const handleEdit = (id, text) => {
    todoItems[id].text = text;
    setTodoItems([...todoItems]);
  };

  const handleToggle = (id, isCompleted) => {
    todoItems[id].isCompleted = !isCompleted;
    setTodoItems([...todoItems]);
  };

  return (
    <div className="App">
      <TodoForm handleAdd={handleAdd} />
      <ul>
        {todoItems.map((todo, id) => (
          <Todo
            key={id}
            todo={todo}
            index={id}
            remove={handleRemove}
            edit={handleEdit}
            toggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
