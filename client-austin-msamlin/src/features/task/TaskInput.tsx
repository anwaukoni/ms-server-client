import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { addTask } from './taskSlice';

const TaskInput: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch()
  const [input, setInput] = React.useState<string>('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!input.trim()) {
          return;
        }
        dispatch(addTask(input));
        setInput('');
      }}
    >
      <input
        type="text"
        placeholder="Add a task"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>

  )
}

export default TaskInput;
