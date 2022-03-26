import {
  fetchTasksWorkerSaga,
  createTaskWorkerSaga,
  deleteTaskWorkerSaga,
} from './tasks.js'
import {
  all,
  debounce,
  fork,
  take,
  takeEvery,
  takeLatest,
  throttle,
  cancel,
  put,
} from 'redux-saga/effects'
import * as actionTypes from '../constants/action-types'

export const tasksWatcherSaga = function* () {
  //yield fork(fetchTasksWatcherSaga)

  yield takeLatest(actionTypes.FETCH_TASKS, fetchTasksWorkerSaga)

  // yield debounce(1000, actionTypes.CREATE_TASK, createTaskWorkerSaga)
  yield throttle(1000 * 3, actionTypes.CREATE_TASK, createTaskWorkerSaga)

  yield take(actionTypes.CREATE_TASK)

  yield takeEvery(actionTypes.DELETE_TASK, deleteTaskWorkerSaga)
}

// receving actions related to "employees" table
export const employeesWatcherSaga = function* () {}

export const rootSaga = function* () {
  console.log('rootSaga invoked')

  yield all([fork(tasksWatcherSaga), fork(employeesWatcherSaga)])

  //   yield fork(tasksWatcherSaga)
  //   yield fork(employeesWatcherSaga)

  //FETCH_TASKS --> fetchTasksWorkerSaga
}

export const fetchTasksWatcherSaga = function* () {
  while (yield take(actionTypes.FETCH_TASKS)) {
    let fetchProcess = yield fork(fetchTasksWorkerSaga)
    //cancel
    yield take(actionTypes.FETCH_TASKS_CANCEL)
    yield cancel(fetchProcess)
    yield put({
      type: actionTypes.FETCH_TASKS_REJECTED,
      payload: { message: 'Cancelled' },
    })
  }
}
