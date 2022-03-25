import axios from 'axios'
import * as actionTypes from '../constants/action-types'
import { put } from 'redux-saga/effects'

// put = dispatch

// executes when the component dispatches FETCH_TASKS action
export const fetchTasksWorkerSaga = function* () {
  // http requests
  yield put({ type: actionTypes.FETCH_TASKS_PENDING })

  try {
    let response = yield axios.get('http://localhost:7000/tasks')

    console.log('response: ', response)
    yield put({
      type: actionTypes.FETCH_TASKS_FULFILLED,
      payload: response,
    })
  } catch (error) {
    yield put({ type: actionTypes.FETCH_TASKS_REJECTED, payload: error })
  }
}

// PENDING
// FULFILLED
// REJECTED
