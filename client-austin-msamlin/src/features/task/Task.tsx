import { Link } from 'react-router-dom';
import TaskInput from './TaskInput';
import TaskList from './TaskList';

const Task = () => {
  return (
    <>
      <h1> Task Page </h1>
      <TaskInput />
      <TaskList />
      <p><Link to="/welcome">Go to Welcome Page</Link></p>
    </>
  )
}

export default Task;