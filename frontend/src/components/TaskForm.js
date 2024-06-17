import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [assignee, setAssignee] = useState(0);
  const [users, setUsers] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() && assignee) {
      addTask(task, assignee);
      setTask('');
      setAssignee(0);
    }
  };
  const userList = async () => {
    try {
      await fetch('http://localhost:8080/api/users/').then(async data => {
        let res = await data.json();
        setUsers(res?.data)
      })
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    userList();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <select onChange={(e) => setAssignee(e.target.value)}
        >
          <option selected={assignee == 0 ?true: false}>Select User</option>
          {users?.map((user) => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))
          }
        </select>
        <button className='sub-btn' type="submit">Add Task</button>
      </form>
      <style>
        {`
        input{
          resize: vertical;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          margin-right: 20px;

        }
        select {
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          margin-right: 20px;

        }
        .sub-btn {
          padding: 10px 20px;
          background-color: #007BFF;
          border: none;
          border-radius: 4px;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .sub-btn:hover {
            background-color: #0056b3;
        }
      `}
      </style>
    </>
  );
};

export default TaskForm;
