import { fetchTasksWorkerSaga } from './tasks.js'
import { takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../constants/action-types'

export const rootSaga = function* () {
  console.log('rootSaga invoked')
  yield takeEvery(actionTypes.FETCH_TASKS, fetchTasksWorkerSaga)
  //FETCH_TASKS --> fetchTasksWorkerSaga
}
