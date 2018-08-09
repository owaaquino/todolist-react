import React from "react";

class TodoList extends React.Component {
  handleChange = event => {
    const updateTodo = {
      ...this.props.todoItems,
      todo: event.currentTarget.value
    };
    console.log(updateTodo);
    this.props.updateTodos(this.props.index, updateTodo);
  };
  render(){
  return (
      <li>
        <input type="checkbox" name="isChecked" />
        <input
          type="text"
          name="todo"
          value={this.props.todoItems.todo}
          onChange={this.handleChange}
        />
        <button>Edit</button>
        <button onClick={() => this.removeToDoItem(this.props.index)}>Delete</button>
      </li>
    );
  }
  
};

export default TodoList;
