import {
  CREATE_COMMENT,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST, EDIT_COMMENT,
  EDIT_POST,
  SET_COMMENT_LIST,
  SET_POST_LIST
} from "./postTypes";

const initialState = {
  postList: [],
  commentList: [],
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POST_LIST: {
      return {
        ...state,
        postList: action.payload
      };
    }
    case SET_COMMENT_LIST: {
      return {
        ...state,
        commentList: action.payload
      }
    }
    case CREATE_POST: {
      return {
        ...state,
        postList: [...state.postList, action.payload]
      };
    }
    case CREATE_COMMENT: {
      return {
        ...state,
        commentList: [...state.commentList, action.payload]
      }
    }
    case EDIT_POST: {
      return {
        ...state,
        postList: state.postList.map((post) => (post.id === action.payload.id ? action.payload.newPost : post))
      };
    }
    case EDIT_COMMENT: {
      return {
        ...state,
        commentList: state.commentList.map((comment) => (comment.id === action.payload.id ? action.payload.newComment : comment))
      }
    }
    case DELETE_POST: {
      return {
        ...state,
        postList: state.postList.filter((post) => post.id !== action.payload.id)
      };
    }
    case DELETE_COMMENT: {
      return {
        ...state,
        commentList: state.commentList.filter((comment) => comment.id !== action.payload.id)
      }
    }
    default:
      return state;
  }
}
