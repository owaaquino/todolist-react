# Another To Do List App.

**Goal:**

- Our goal is to learn the Create Reade Updaet Delete (C.R.U.D) features of React.js

**Features:**

- Allow users to add items in to-do list.
- Allow users to check/cross-out a completed item/list.

**Techs:**

- React.js
- CSS
- HTML

**Assets:**

- Font -

**Live links:**

- Codepen - not yet
- Hosted with Netlify -[https://another-to-do-list-app.netlify.com/](https://another-to-do-list-app.netlify.com/)

# Notes

Prerequisites:

- Nodejs must be installed in your unit.
- NPM must be installed in your unit
- Install create-react-app in your node modules ( check out [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app) for how to install the framework)
- Have basic understanding of Javascript (ES6)
- Have basic knowledge about React.js framework

### DISCLAIMER: THIS IS NOT A REACT.JS BEGGINNERS GUIDE/TUTORIAL

## 1. Create ADD Function

Let us start by creating a TodoForm.js component for our form with input box and add button.
```javascript
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
After that, we create a "submit" function for the form.

```javascript
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

Then, we need to get the value from the input box and transfer it to our state.

```javascript
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
## 2. Read the new item in the list component.

Initially we create a component that will receive the state value and display it to the list item.

```javascript
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
Then we need to loop into our state object to display all to-do items.
```javascript
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
## 3. Now create a Delete function for the to-do list item.

In the App.js, we create a new function called removeToDoItem and pass it on to our list item as props.
```javascript
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

In our TodoList.js component, we add the props function we created from App.js to the delete button.

```javascript
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
## 4. Add our Update functionality.

In ToDoList.js, we add a function "handlechange" for every update in our to-do item inputbox.

```javascript
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
In our App.js, we create a new function "updateTodos" to set the state's new value.
```javascript
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

## 5. Toggle the To-Do Item checkbox.

Now the last part is to make the checkbox toggle, so that we can set it to complete or incomplete. Then, we create a new function in our TodoList.js called "toggleCheckbox".

However unlike the "handleChange" function, we must update the item "isCompleted" state to true or false.
```javascript
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