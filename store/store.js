import {combineReducers, createStore} from "redux";
import postReducer from "./post/postReducer";


let reducers = combineReducers({
  post: postReducer
})

export const store = createStore(reducers)
