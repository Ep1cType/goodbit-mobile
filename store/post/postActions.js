import {
  CREATE_COMMENT,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST, EDIT_COMMENT,
  EDIT_POST,
  SET_COMMENT_LIST,
  SET_POST_LIST
} from "./postTypes";

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
  createComment: (newComment) => ({
    type: CREATE_COMMENT,
    payload: newComment
  }),
  editPost: (id, newPost) => ({
    type: EDIT_POST,
    payload: {id, newPost}
  }),
  editComment: (id, newComment) => ({
    type: EDIT_COMMENT,
    payload: {id, newComment}
  }),
  deletePost: (id) => ({
    type: DELETE_POST,
    payload: {id}
  }),
  deleteComment: (id) => ({
    type: DELETE_COMMENT,
    payload: {id}
  })
}
