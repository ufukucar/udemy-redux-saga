import {
  fetchTasksWorkerSaga,
  createTaskWorkerSaga,
  deleteTaskWorkerSaga,
} from './tasks.js'
import { takeEvery, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../constants/action-types'

export const rootSaga = function* () {
  console.log('rootSaga invoked')
  yield takeEvery(actionTypes.FETCH_TASKS, fetchTasksWorkerSaga)

  yield takeLatest(actionTypes.CREATE_TASK, createTaskWorkerSaga)

  yield takeEvery(actionTypes.DELETE_TASK, deleteTaskWorkerSaga)
  //FETCH_TASKS --> fetchTasksWorkerSaga
}
