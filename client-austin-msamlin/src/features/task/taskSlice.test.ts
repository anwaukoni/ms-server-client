import taskReducer, { addTasks, addTask, deleteTask, editTask, updateSort, Task } from './taskSlice';

describe('task reducer', () => {
  const initialState: Task[] = [];

  it('should handle initial state', () => {
    expect(taskReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addTasks action', () => {
    const tasks: Task[] = [{ id: 1, message: 'Task 1', sortOrder: 0 }, { id: 2, message: 'Task 2', sortOrder: 1 }];
    expect(taskReducer(initialState, addTasks(tasks))).toEqual(tasks);
  });
  
  it('should handle addTask action', () => {
    let currentState = initialState;
    currentState = taskReducer(currentState, addTask('New Task'));
    expect(currentState).toEqual([{ id: 0, message: 'New Task', sortOrder: 0 }]);
  });

  it('should handle deleteTask action', () => {
    const startingState: Task[] = [{ id: 1, message: 'Task 1', sortOrder: 0 }];
    expect(taskReducer(startingState, deleteTask({ id: 1 }))).toEqual([]);
  });

  it('should handle editTask action', () => {
    const startingState: Task[] = [{ id: 1, message: 'Task 1', sortOrder: 0 }];
    expect(taskReducer(startingState, editTask({ id: 1, message: 'Updated Task 1' })))
      .toEqual([{ id: 1, message: 'Updated Task 1', sortOrder: 0 }]);
  });

  it('should handle updateSort action', () => {
    const startingState: Task[] = [{ id: 2, message: 'Task 2', sortOrder: 1 }];
    const updatedTasks: Task[] = [{ id: 2, message: 'Task 2', sortOrder: 0 }];
    expect(taskReducer(startingState, updateSort(updatedTasks))).toEqual(updatedTasks);
  });
});