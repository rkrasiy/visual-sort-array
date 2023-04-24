// import { createStore } from "redux";
// import rootReducer from "./reducers";

// export default createStore(rootReducer);

import { configureStore } from '@reduxjs/toolkit';
import SET_ARRAYReducer from './reducers/array.js';
import SET_RUNNINGReducer from './reducers/running.js';
import SET_SORTEDReducer from './reducers/sorted.js';
import SET_SWAPPERSReducer from './reducers/swappers.js';
import SET_CURRENT_BUBBLETWOReducer from './reducers/bubble-sort.js';
import SET_CURRENT_MergeReducer from './reducers/merge-sort.js';
import SET_CURRENT_HEAPTHREEReducer from './reducers/heap-sort.js';
import SET_PIVOTReducer from './reducers/pivot.js';
import SET_CURRENT_QUICKTWOReducer from './reducers/quick-sort.js';

export default configureStore({
  reducer: {
    array: SET_ARRAYReducer,
    running: SET_RUNNINGReducer,
    swappers: SET_SWAPPERSReducer,
    sorted: SET_SORTEDReducer,
    bubble: SET_CURRENT_BUBBLETWOReducer,
    merge: SET_CURRENT_MergeReducer,
    heap: SET_CURRENT_HEAPTHREEReducer,
    quick: SET_CURRENT_QUICKTWOReducer,
    pivot: SET_PIVOTReducer,
  },
});