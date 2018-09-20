# Another To Do List App.

**Goals:**

- Our main goal here is to learn the C.R.U.D features of React.js

**Features:**

- Allow user to add list items
- Allow user to check/cross out a finish list

**Techs:**

- React.js
- CSS
- HTML

**Assets:**

- Font -

**Live links:**

- Codepen -
- Hosted with Netlify -

# Notes

Some prerequisites:

- Nodejs installed on your unit
- NPM installed on your unit
- create-react-app installed ( check out [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app) for how to install the framework)
- Understanding Javascript (ES6)
- Basic knowledge about React.js framework

## DISCLAIMER: THIS IS NOT A REACT.JS BEGGINNERS GUIDE/TUTORIAL

## 1. Creating the ADD Funciton

Lets start by creating a form with input box and and a add button
```
    import React from "react";

    class TodoForm extends React.Component {

      render() {
        return (
          <form>
            <input type="text" name="todosTxtbx" />
            <button>Add +</button>
          </form>
        );
      }
    }

    export default TodoForm;
```
After that, we create a function for our form when submitted
```
    import React from "react";

    class TodoForm extends React.Component {

    	// this is our fn for the form onSubmit
      addItemOnList = e => {
    		// we prevent default behaviour of our form
        e.preventDefault();
    		// then reset the form after clicking the button
        e.currentTarget.reset();
      };

      render() {
        return (
    			// we added addItemOnList fn. for the submition of the form
          <form onSubmit={this.addItemOnList}>
            <input type="text" name="todosTxtbx" ref={this.todoRef} />
            <button>Add +</button>
          </form>
        );
      }
    }

    export default TodoForm;
```
Next, we needed to get the value from the input box and transfer it to our state
```
    import React from "react";

    class TodoForm extends React.Component {
    	//create a react ref to store data
      todoRef = React.createRef();

      addItemOnList = e => {
        e.preventDefault();
    	// transfer the value of the ref to a object
    	// this is also the time we create an items for our object
      // you see that we added a todo and isCompleted default to false
      // this is our main state when creating a single item
    	// just think that we created a to do item that was not yet completed ;)
        const todoItem = {
          todo: this.todoRef.current.value,
    			isCompleted: false
        };
    	// update the states addToDoItems
        this.props.addToDoItems(todoItem);
        e.currentTarget.reset();
      };

      render() {
        return (
          <form id="todoList-form" onSubmit={this.addItemOnList}>
    			//add ref attribute to our input type so that our todoRef knows where it gets its value
            <input type="text" name="todosTxtbx" ref={this.todoRef} required />
            <button>Add +</button>
          </form>
        );
      }
    }

    export default TodoForm;
```
## 2. Read the new item to the list component

First, lets create a component that will receive the state value and display it to the list item
```
    import React from "react";

    class TodoList extends React.Component {


      render() {
        return (
    			// we create a list item that has a checkbox, textbox, remove button
          <li>
    				// we set our checkbox default state to false
            <input type="checkbox" name="isCompleted" checked={this.props.todoItems.isCompleted}/>
    				// we add the value of the todo state object we have in to the input box
            <input type="text" name="todo" value={this.props.todoItems.todo}/>
            <button>x</button>
          </li>
        );
      }
    }

    export default TodoList;
```
Next, to be able to display all todo items we need to loop into our state object to display every item in it
```
    import React, { Component } from "react";
    import "./App.css";
    import TodoForm from "./components/TodoForm";
    import TodoList from "./components/TodoList";
    class App extends Component {
      state = {
        todoItems: {}
      };

      addToDoItems = item => {
        const items = { ...this.state.todoItems };
    		// to make our new todo item unique we added a date function to it
        items[`item${Date.now()}`] = item;
    		// then we update our state
        this.setState({
          todoItems: items
        });
      };

      render() {
        return (
          <div className="App">
            <TodoForm addToDoItems={this.addToDoItems} />
            <ul>
    				// we iterate all todos we have inthe state todoItems
    				// to be displayed in our app. With Object.keys because we
    				// cannot loop in to an object the we use es6 map
              {Object.keys(this.state.todoItems).map(key => (
                <TodoList
                  key={key}
                  index={key}
                  todoItems={this.state.todoItems[key]}
                />
              ))}
            </ul>
          </div>
        );
      }
    }

    export default App;
```
## 3. Now lets create a Delete function for our to do list item

In our App.js, we create a new function called removeToDoItem and  pass it on to our list item as props.
```
    import React, { Component } from "react";
    import "./App.css";
    import TodoForm from "./components/TodoForm";
    import TodoList from "./components/TodoList";
    class App extends Component {
      state = {
        todoItems: {}
        // isChecked: false
      };

      addToDoItems = item => {
        const items = { ...this.state.todoItems };
        console.log(items);
        items[`item${Date.now()}`] = item;
        this.setState({
          todoItems: items
        });
      };

      removeToDoItem = item => {
        const todos = { ...this.state.todoItems };
        delete todos[item];
        this.setState({ todoItems: todos });
      };

      render() {
        return (
          <div className="App">
            <TodoForm addToDoItems={this.addToDoItems} />
            <ul>
              {Object.keys(this.state.todoItems).map(key => (
                <TodoList
                  key={key} //why do we need to add keys again?
                  index={key}
                  todoItems={this.state.todoItems[key]}
                  removeToDoItem={this.removeToDoItem}
                />
              ))}
            </ul>
          </div>
        );
      }
    }

    export default App;
```
In our TodoList.js component, we added the props function we created from App.js to the delete button we have.
```
    import React from "react";

    class TodoList extends React.Component {

      render() {
        return (
          <li>
            <input
              type="checkbox"
            />
            <input
              type="text"
              name="todo"
              value={this.props.todoItems.todo}
            />
            <button
              className="del-btn"
    					// we called the removeToDoItem props and add the index of
    					// selected this selected item
              onClick={() => this.props.removeToDoItem(this.props.index)}
            >
              x
            </button>
          </li>
        );
      }
    }

    export default TodoList;
```
## 4. Adding our Update functionality.

In ToDoList.js, we added a function handlechange for changes in our to do item inputbox.
```
    import React from "react";

    class TodoList extends React.Component {

      handleChange = event => {
        const updateTodo = {
          ...this.props.todoItems,
    			// this means whenever update an item, change its value to the current target
          [event.currentTarget.name]: event.currentTarget.value
        };
    			// then changes to be added to the App.js function updateTodos
        this.props.updateTodos(this.props.index, updateTodo);
      };

      render() {
        return (
          <li>
            <input
              type="checkbox"
              name="isCompleted"
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
```
In our App.js, we create a new function updateTodos to set the states new value
```
    import React, { Component } from "react";
    import "./App.css";
    import TodoForm from "./components/TodoForm";
    import TodoList from "./components/TodoList";
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

      removeToDoItem = item => {
        const todos = { ...this.state.todoItems };
        delete todos[item];
        this.setState({ todoItems: todos });
      };

      updateTodos = (key, updatedTodo) => {
        const todos = { ...this.state.todoItems };
        todos[key] = updatedTodo;
        this.setState({ todoItems: todos });
      };

      render() {
        return (
          <div className="App">
            <TodoForm addToDoItems={this.addToDoItems} />
            <ul>
              {Object.keys(this.state.todoItems).map(key => (
                <TodoList
                  key={key}
                  index={key}
                  todoItems={this.state.todoItems[key]}
                  removeToDoItem={this.removeToDoItem}
                  updateTodos={this.updateTodos}
                />
              ))}
            </ul>
          </div>
        );
      }
    }

    export default App;
```

## 5. Toggling the To Do Item checkbox

Now the last part is making the checkbox toggle, so we can set it to completed or incomplete. We create a new function in our TodoList.js called toggleCheckbox. Unlike handleChange function we update the item "isCompleted" state to true or false.
```
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
        const updateTodo = {
          ...this.props.todoItems,
          [event.currentTarget.name]: event.currentTarget.checked
        };
        this.props.updateTodos(this.props.index, updateTodo);
      };

      render() {
        return (
    			// for UX i've created a class that when we update the checkbox to true it sets its class to 'done'
          <li className={this.props.todoItems.isCompleted ? "done" : null}>
            <input
              type="checkbox"
              name="isCompleted"
              checked={this.props.todoItems.isCompleted}
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
    ```