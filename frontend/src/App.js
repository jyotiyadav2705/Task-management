import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const taskList = async () => {
    try {
      await fetch('http://localhost:8080/api/user-task').then(async data => {
        let res = await data.json();
        setTasks(res?.data)
      })
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    taskList();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:8080/api/delete?taskId=${taskId}`, {
        method: "DELETE",
      }).then(async data => {
        let res = await data.json();
        alert(`${res?.message}`);
        if (!res.error) {
          taskList();
        }
      })
    } catch (error) {
      console.error(error);
    }
  }
  const addTask = async (taskName, userId) => {
    try {
      const data = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName, userId
        })
      }
      await fetch('http://localhost:8080/api/add-task/', data).then(async data => {
        let res = await data.json();
        alert(`${res?.message}`);
        if (!res.error) {
          taskList();
        }
      })
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="App">
      <h1>Task Management Application</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
