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

  toggleCheckbox = event => {
    // const updateCheckbox =
    // console.log(event.currentTarget.checked);
    const updateTodo = {
      ...this.props.isChecked,
      [event.currentTarget.name]: event.currentTarget.checked
    };
    // console.log(event.currentTarget.checked);
    this.props.updateTodoToggle(this.props.index, updateTodo);
  };

  render() {
    return (
      <li className={this.props.todoItems.isChecked === true ? "done" : null}>
        <input
          type="checkbox"
          name="isChecked"
          onChange={this.toggleCheckbox}
          checked={this.props.todoItems.isChecked}
        />
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
