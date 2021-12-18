import instance from "../api/api";

export default class PostServices {
  static async getPostList() {
    return instance.get("/posts")
  }
  static async getCommentList() {
    return instance.get("/comments")
  }
  static async createPost(post) {
    return instance.post("/posts", post)
  }
  static async createComment(comment) {
    return instance.post("/comments", comment)
  }
  static async getPost(id) {
    return instance.get(`/posts/${id}`)
  }
  static async deletePost(id) {
    return instance.delete(`/posts/${id}`)
  }
  static async deleteComment(id) {
    return instance.delete(`/comments/${id}`)
  }
  static async editPost(id, newPost) {
    return instance.put(`https://my-json-server.typicode.com/Ep1cType/goodbit-mobile/posts/${id}`, newPost)
  }
  static async editComment(id, newComment) {
    return instance.put(`https://my-json-server.typicode.com/Ep1cType/goodbit-mobile/comments/${id}`, newComment)
  }
}
