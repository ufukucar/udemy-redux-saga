import {
  fetchTasksWorkerSaga,
  createTaskWorkerSaga,
  deleteTaskWorkerSaga,
} from './tasks.js'
import { debounce, takeEvery, takeLatest, throttle } from 'redux-saga/effects'
import * as actionTypes from '../constants/action-types'

export const rootSaga = function* () {
  console.log('rootSaga invoked')
  yield takeLatest(actionTypes.FETCH_TASKS, fetchTasksWorkerSaga)

  // yield debounce(1000, actionTypes.CREATE_TASK, createTaskWorkerSaga)
  yield throttle(1000 * 3, actionTypes.CREATE_TASK, createTaskWorkerSaga)

  yield takeEvery(actionTypes.DELETE_TASK, deleteTaskWorkerSaga)
  //FETCH_TASKS --> fetchTasksWorkerSaga
}
