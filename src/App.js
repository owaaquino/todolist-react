import React, { Component } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";

class App extends Component {
  state = {
    todoItems: {}
  };

  addToDoItems = item => {
    const items = { ...this.state.todoItems };
    console.log(items);
    items[`item${Date.now()}`] = item;
    this.setState({
      todoItems: items
    });
  };

  render() {
    return (
      <div className="App">
        <TodoForm addToDoItems={this.addToDoItems} />
      </div>
    );
  }
}

export default App;
