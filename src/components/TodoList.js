import React from "react";

class TodoList extends React.Component {
  handleChange = event => {
    const updateTodo = {
      ...this.props.todoItems,
      [event.currentTarget.name]: event.currentTarget.value
    };
    console.log(event.currentTarget.value);
    this.props.updateTodos(this.props.index, updateTodo);
  };
  render() {
    return (
      <li>
        <input type="checkbox" name="isChecked" onChange={this.handleChange} />
        <input
          type="text"
          name="todo"
          value={this.props.todoItems.todo}
          onChange={this.handleChange}
        />
        <button>Edit</button>
        <button onClick={() => this.props.removeToDoItem(this.props.index)}>
          Delete
        </button>
      </li>
    );
  }
}

export default TodoList;
