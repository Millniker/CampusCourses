import {applyMiddleware, combineReducers, createStore} from "redux";
import userReduser from "./userReduser";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    user:userReduser
})

export const store = createStore(rootReducer,applyMiddleware(thunk))