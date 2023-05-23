import {applyMiddleware, combineReducers, createStore} from "redux";
import userReduser from "./userReduser";
import thunk from "redux-thunk";
import coursesReduser from "./coursesReduser";
import errorReduser from "./errorReduser";

const rootReducer = combineReducers({
    user:userReduser,
    group:coursesReduser,
    error:errorReduser
})

export const store = createStore(rootReducer,applyMiddleware(thunk))