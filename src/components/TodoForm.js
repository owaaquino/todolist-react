import React from "react";

class TodoForm extends React.Component {
  todoRef = React.createRef();

  addItemOnList = e => {
    e.preventDefault();
    console.log("beep!");
    const todoItem = {
      todo: this.todoRef.current.value
    };
    this.props.addToDoItems(todoItem);
  };
  render() {
    return (
      <form onSubmit={this.addItemOnList}>
        <input type="text" name="todosTxtbx" ref={this.todoRef} />
        <button>Add +</button>
      </form>
    );
  }
}

export default TodoForm;
