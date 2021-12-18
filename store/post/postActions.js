import {CREATE_POST, DELETE_POST, EDIT_POST, SET_COMMENT_LIST, SET_POST_LIST} from "./postTypes";

export const postActions = {
  setPostList: (postList) => ({
    type: SET_POST_LIST,
    payload: postList,
  }),
  setCommentList: (commentList) => ({
    type: SET_COMMENT_LIST,
    payload: commentList
  }),
  createPost: (newPost) => ({
    type: CREATE_POST,
    payload: newPost,
  }),
  editPost: (id) => ({
    type: EDIT_POST,
    payload: id
  }),
  deletePost: (id) => ({
    type: DELETE_POST,
    payload: {id}
  })
}
