import {combineReducers, createStore} from "redux";
import postReducer from "./posts/postReducer";


let reducers = combineReducers({
  post: postReducer
})

export const store = createStore(reducers)
