import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Task {
  [x: string]: any;
  id: number;
  message: string;
  sortOrder: number;
}

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {
    addTasks: (state, action: PayloadAction<Task[]>) => {
      return action.payload;
    },
    addTask: (state, action: PayloadAction<string>) => {
      const previousTasks = state;
      const highestId = previousTasks.length > 0 ? previousTasks.sort((a,b) => b.sortOrder - a.sortOrder)[0] : 0;

      state.push({
        id: highestId ? highestId.sortOrder + 1 : highestId ,
        message: action.payload,
        sortOrder: state.length,
      })
    },
    deleteTask: (state, action: PayloadAction<{ id: number }>) => {
      return state.filter((task) => task.id !== action.payload.id)
    },
    editTask: (state, action: PayloadAction<{ id: number, message: string }>) => {
      const { id, message } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.message = message;
      } else {
        return state;
      }
    },
    updateSort: (state, action: PayloadAction<Task[]>) => {
      return action.payload;
      // const { id, newPosition } = action.payload;
      // const activeTodo = state.find((task) => task.id === id);
      // if (activeTodo) {
      //   const currentPosition = activeTodo.sortOrder;
      //   if (currentPosition > newPosition) {
      //     // move sort order up
      //     state.forEach((task) => {
      //       if (task.sortOrder >= newPosition && task.sortOrder < currentPosition + 1) {
      //         task.sortOrder = task.sortOrder + 1; // move down
      //       } else if (task.sortOrder === currentPosition) {
      //         task.sortOrder = newPosition; // move to new position
      //       }
      //     })

      //     state.splice(newPosition, 0, activeTodo); // insert at new position
      //     state.splice(currentPosition, 1); // remove from old position
      //   } else {
      //     // move sort order down
      //     state.forEach((task) => {
      //       if (task.sortOrder <= newPosition && task.sortOrder > currentPosition - 1) {
      //         task.sortOrder = task.sortOrder - 1; // move up
      //       } else if (task.sortOrder === currentPosition) {
      //         task.sortOrder = newPosition; // move to new position
      //       }
      //     })
      //     state.splice(newPosition, 0, activeTodo); // insert at new position
      //     state.splice(currentPosition, 1); // remove from old position
      //   }
      // }
    }
  }
});

export const { addTasks, addTask, deleteTask, editTask, updateSort } = taskSlice.actions;

export default taskSlice.reducer;