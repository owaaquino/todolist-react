import React from "react";

class TodoForm extends React.Component {
  todoRef = React.createRef();

  addItemOnList = e => {
    e.preventDefault();
    const todoItem = {
      todo: this.todoRef.current.value
    };
    this.props.addToDoItems(todoItem);
    e.currentTarget.reset();
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
