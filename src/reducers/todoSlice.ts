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
  },
});

export const { add } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
