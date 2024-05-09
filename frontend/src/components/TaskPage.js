import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateTaskId, setUpdateTaskId] = useState('');
  const [updatedTask, setUpdatedTask] = useState('');
  const [message, setMessage] = useState('');
  const [apiCallCount, setApiCallCount] = useState({
    add: 0,
    update: 0,
    delete: 0
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:3001/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  const handleAddTask = () => {
    axios.post('http://localhost:3001/api/tasks', { task: newTask })
      .then(response => {
        setNewTask('');
        setMessage('Task added successfully');
        setApiCallCount(prevState => ({ ...prevState, add: prevState.add + 1 }));
        fetchTasks();
      })
      .catch(error => {
        console.error('Error adding task:', error);
        setMessage('Error adding task');
      });
  };

  const handleUpdateTask = () => {
    axios.put(`http://localhost:3001/api/tasks/${updateTaskId}`, { task: updatedTask })
      .then(response => {
        setUpdatedTask('');
        setMessage('Task updated successfully');
        setApiCallCount(prevState => ({ ...prevState, update: prevState.update + 1 }));
        fetchTasks();
      })
      .catch(error => {
        console.error('Error updating task:', error);
        setMessage('Error updating task');
      });
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:3001/api/tasks/${taskId}`)
      .then(response => {
        setMessage('Task deleted successfully');
        setApiCallCount(prevState => ({ ...prevState, delete: prevState.delete + 1 }));
        fetchTasks();
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        setMessage('Error deleting task');
      });
  };

  const handleCount = () => {
    axios.get('http://localhost:3001/api/count')
      .then(response => {
        console.log(response.data);
        setMessage(`API call count - Add: ${apiCallCount.add}, Update: ${apiCallCount.update}, Delete: ${apiCallCount.delete}`);
      })
      .catch(error => {
        console.error('Error fetching count:', error);
        setMessage('Error fetching count');
      });
  };
  

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Task Management</h1>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter task ID to update"
          value={updateTaskId}
          onChange={e => setUpdateTaskId(e.target.value)}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter updated task"
          value={updatedTask}
          onChange={e => setUpdatedTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleUpdateTask}>Update Task</button>
      </div>

      <button className="btn btn-info mb-3" onClick={handleCount}>Count API Calls</button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.task}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>{message}</p>
    </div>
  );
}

export default TaskPage;
