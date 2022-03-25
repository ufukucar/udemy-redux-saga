import { createStore, applyMiddleware } from "redux";
import allReducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reduxPromiseMiddleware from "redux-promise-middleware";

//basic logs
//var logger = createLogger();

//collapse all logs
// var logger = createLogger({
//   collapsed: true
// });

//collapse only FETCH_TASKS_REQUEST
// var logger = createLogger({
//   collapsed: (getState, action, logEntry) => {
//     return action.type === actionTypes.FETCH_TASKS_REQUEST
//   }
// });

//expand only when state has "error" object
// var logger = createLogger({
//   collapsed: (getState, action, logEntry) => {
//     return !logEntry.nextState.tasks.error;
//   }
// });

var logger = createLogger();

//middleware
let middleware = [ reduxThunk, reduxPromiseMiddleware, logger ];

var store = createStore(allReducers, composeWithDevTools(applyMiddleware(...middleware)));
export default store;
