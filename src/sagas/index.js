import {
  fetchTasksWorkerSaga,
  createTaskWorkerSaga,
  deleteTaskWorkerSaga,
} from './tasks.js'
import {
  debounce,
  fork,
  takeEvery,
  takeLatest,
  throttle,
} from 'redux-saga/effects'
import * as actionTypes from '../constants/action-types'

export const tasksWatcherSaga = function* () {
  yield takeLatest(actionTypes.FETCH_TASKS, fetchTasksWorkerSaga)

  // yield debounce(1000, actionTypes.CREATE_TASK, createTaskWorkerSaga)
  yield throttle(1000 * 3, actionTypes.CREATE_TASK, createTaskWorkerSaga)

  yield takeEvery(actionTypes.DELETE_TASK, deleteTaskWorkerSaga)
}

// receving actions related to "employees" table
export const employeesWatcherSaga = function* () {}

export const rootSaga = function* () {
  console.log('rootSaga invoked')

  yield fork(tasksWatcherSaga)
  yield fork(employeesWatcherSaga)

  //FETCH_TASKS --> fetchTasksWorkerSaga
}
