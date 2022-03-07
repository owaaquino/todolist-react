import React, { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [todoItems, setTodoItems] = useState({});

  const addToDoItems = (item) => {
    const items = { ...todoItems };
    console.log(items);
    items[`item${Date.now()}`] = item;
    setTodoItems(items);
  };

  const removeToDoItem = (item) => {
    const todos = { ...todoItems };
    delete todos[item];
    setTodoItems(todos);
  };

  const updateTodos = (key, updatedTodo) => {
    const todos = { ...todoItems };
    todos[key] = updatedTodo;
    setTodoItems(todos);
  };

  return (
    <div className="App">
      <TodoForm addToDoItems={addToDoItems} />
      <ul>
        {Object.keys(todoItems).map((key) => (
          <TodoList
            key={key}
            index={key}
            todoItems={todoItems[key]}
            removeToDoItem={removeToDoItem}
            updateTodos={updateTodos}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
