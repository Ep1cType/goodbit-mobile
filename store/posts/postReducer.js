import {CREATE_POST, DELETE_POST, EDIT_POST, SET_POST_LIST} from "./postTypes";

const initialState = {
  postList: [
    {
      id: 1,
      title: "Домашка",
      body: "Ты должен сделать то-то то-то, затем пойти туда то туда то lorem20fasf"
    },
    {
      id: 2,
      title: "Работа",
      body: "Ты должен сделать то-то то-то, затем пойти туда то туда то lorem20fasf.Ты должен сделать то-то то-то, затем пойти туда то туда то lorem20fasfТы должен сделать то-то то-то, затем пойти туда то туда то lorem20fasf"
    }
  ]
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POST_LIST: {
      return {
        ...state,
        postList: action.payload
      };
    }
    case CREATE_POST: {
      return {
        ...state,
        postList: [...state.postList, action.payload]
      };
    }
    case EDIT_POST: {
      return {
        ...state,
        postList: state.postList.map((post) => (post.id === action.payload.id ? action.payload.newPost : post))
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        postList: state.postList.filter((post) => post.id !== action.payload.id)
      };
    }
    default:
      return state;
  }
}
