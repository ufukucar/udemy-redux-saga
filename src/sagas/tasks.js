import axios from 'axios'
import * as actionTypes from '../constants/action-types'
import { put, call, retry, race, take, select } from 'redux-saga/effects'

import * as api from '../api/tasks'
import { act } from '@testing-library/react'

// put = dispatch

// executes when the component dispatches FETCH_TASKS action
export const fetchTasksWorkerSaga = function* () {
  // http requests

  yield select((state) => {
    console.log('state saga tasks: ', state)
  })
  yield put({ type: actionTypes.FETCH_TASKS_PENDING })

  try {
    // call the promise and wait for its completion
    // let response = yield call(api.fetchTasks)

    let { response, fetchCancel } = yield race({
      response: call(api.fetchTasks),
      fetchCancel: take(actionTypes.FETCH_TASKS_CANCEL),
    })

    if (fetchCancel) {
      yield put({
        type: actionTypes.FETCH_TASKS_REJECTED,
        payload: { message: 'Canceled' },
      })
    } else {
      yield put({
        type: actionTypes.FETCH_TASKS_FULFILLED,
        payload: response,
      })
    }
    yield select((state) => {
      console.log('state saga state task data: ', state.tasks.data)
    })
    // retry ( maxTries, delay, worker, ...args )
    //let response = yield retry(3, 4 * 1000, api.fetchTasks)

    //console.log('response: ', response)
  } catch (error) {
    yield put({ type: actionTypes.FETCH_TASKS_REJECTED, payload: error })
  }
}

// executes when the component dispatches CREATE_TASK action
export const createTaskWorkerSaga = function* (action) {
  // http requests
  yield put({ type: actionTypes.CREATE_TASK_PENDING })

  try {
    let response = yield axios.post(
      'http://localhost:7000/tasks',
      action.payload,
    )

    //console.log('response: ', response)
    yield put({
      type: actionTypes.CREATE_TASK_FULFILLED,
      payload: response,
    })
  } catch (error) {
    yield put({ type: actionTypes.CREATE_TASK_REJECTED, payload: error })
  }
}

// executes when the component dispatches DELETE_TASK action
export const deleteTaskWorkerSaga = function* (action) {
  // http requests
  yield put({ type: actionTypes.DELETE_TASK_PENDING })

  try {
    yield axios.delete(`http://localhost:7000/tasks/${action.payload}`)

    // console.log('response: ', response)
    yield put({
      type: actionTypes.DELETE_TASK_FULFILLED,
      payload: action.payload,
    })
  } catch (error) {
    yield put({ type: actionTypes.DELETE_TASK_REJECTED, payload: error })
  }
}

// PENDING
// FULFILLED
// REJECTED
