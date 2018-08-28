import React from "react";

class TodoList extends React.Component {
  state = {
    isChecked: false
  };

  handleChange = event => {
    const updateTodo = {
      ...this.props.todoItems,
      [event.currentTarget.name]: event.currentTarget.value
    };
    console.log(event.currentTarget.value);
    this.props.updateTodos(this.props.index, updateTodo);
  };

  toggleCheckbox = event => {
    // const updateTodo = {
    //   ...this.props.todoItems,
    //   [event.currentTarget.name]: event.currentTarget.checked
    // };
    // this.props.updateTodoToggle(this.props.index, updateTodo);

    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  render() {
    return (
      <li className={this.state.isChecked === true ? "done" : null}>
        <input
          type="checkbox"
          name="isChecked"
          checked={this.state.isChecked}
          onChange={this.toggleCheckbox}
          // checked={this.props.todoItems.isChecked}
        />
        <input
          type="text"
          name="todo"
          value={this.props.todoItems.todo}
          onChange={this.handleChange}
        />
        {/* <button>Edit</button> */}
        <button
          className="del-btn"
          onClick={() => this.props.removeToDoItem(this.props.index)}
        >
          x
        </button>
      </li>
    );
  }
}

export default TodoList;
