import { combineReducers } from 'redux';

import questionsReducer from "./questionsReducer";

let combinedReducer=combineReducers({
    questions: questionsReducer
});

export default combinedReducer;
