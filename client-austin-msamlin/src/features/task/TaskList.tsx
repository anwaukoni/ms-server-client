import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppDispatch, RootState } from '../../app/store';
import { editTask, deleteTask, updateSort } from './taskSlice';
import { batchAddTasks, fetchTasks, useBatchAddMutation } from './taskApi';

const  TaskList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();
  const  taskList = useAppSelector((state: RootState)=> state.tasks);
  const [draggedItemIndex, setDraggedItemIndex] = React.useState<number | null>(null);

  const userCheckRef = React.useRef(taskList); // ref to store state value
  const [batchAdd] = useBatchAddMutation();
  React.useEffect(() => {
    userCheckRef.current = taskList; // save tasksUnmounted state value to ref
  }, [taskList]);

  useEffect(() => {
    // if (userCheckRef.current === taskList) return; // if ref value is equal to current state value, do nothing

    return () => {
      // const tasksToSave = userCheckRef.current;



      dispatch(batchAddTasks()); // pass current ref value

    };
  }, [batchAdd, dispatch, taskList]);

  useEffect(() => {
    setLoading(true)
    dispatch(fetchTasks())
    setLoading(false)
  }, [dispatch])
  
  const onDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const onDragOver = (index: number) => {
    if (draggedItemIndex === index || draggedItemIndex === null) return;

    const updatedItems = [...taskList];
    const draggedItem = updatedItems[draggedItemIndex];
    updatedItems.splice(draggedItemIndex, 1);
    updatedItems.splice(index, 0, draggedItem);
    setDraggedItemIndex(index);
    dispatch(updateSort(updatedItems)); // Update items in the Redux store
  };

  const onDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return (
    <div>
      {loading ? 'loading...': taskList.map((task) => (
        <div 
          key={task.sortOrder}
          onDragStart={() => onDragStart(task.sortOrder)}
          onDragOver={() => onDragOver(task.sortOrder)}
          onDragEnd={onDragEnd}
          // draggable
          style={{
            padding: '8px',
            margin: '8px 0',
            backgroundColor: draggedItemIndex === task.sortOrder ? 'green' : 'lightgray',
            cursor: 'grab'
          }}
        >
          <input
            type="text"
            value={task.message}
            onChange={(e) => dispatch(editTask({ id: task.id, message: e.target.value }))} />
          <button onClick={() => dispatch(deleteTask({id: task.id}))}>X</button>
        </div>
      ))
      }
    </div>
  )
}

export default  TaskList;

