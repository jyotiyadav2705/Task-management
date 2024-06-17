const route = require('express').Router();

const { getAllUsers, addTask, removeTaskById, getAllUserTask } = require('../controllers/manage-task');

//To get list of all users
route.get('/users', getAllUsers);

//To get list of all users' Tasks
route.get('/user-task', getAllUserTask);

//To add task with assignee
route.post('/add-task', addTask);

//To remove assigned task
route.delete('/delete', removeTaskById)

module.exports = route;