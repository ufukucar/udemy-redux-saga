import axios from 'axios'
import * as actionTypes from '../constants/action-types'

//FETCH_TASKS_PENDING
//FETCH_TASKS_FULFILLED
//FETCH_TASKS_REJECTED
export const fetchTasks = () => ({
  type: 'FETCH_TASKS',
})

export const createTask = (newTask) => ({
  type: 'CREATE_TASK',
  payload: axios.post('http://localhost:7000/tasks', newTask),
})

export const deleteTask = (taskId) => ({
  type: 'DELETE_TASK',
  payload: axios.delete(`http://localhost:7000/tasks/${taskId}`),
})
