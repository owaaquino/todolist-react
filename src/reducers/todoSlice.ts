import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { TodoT } from "types";

interface TodoState {
  todos: TodoT[];
}

const initialState: TodoState = {
  todos: [{ text: "wash dishes", isCompleted: false }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TodoT>) => {
      state.todos.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.todos.splice(action.payload, 1);
    },
    toggle: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.todos[id].isCompleted = !state.todos[id].isCompleted;
    },
    edit: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const id = action.payload.id;
      state.todos[id].text = action.payload.text;
    },
  },
});

export const { add, remove, toggle, edit } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
