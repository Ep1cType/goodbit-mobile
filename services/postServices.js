import axios from "axios";

export default class PostServices {
  static async getPostList() {
    return axios.get("https://my-json-server.typicode.com/Ep1cType/goodbit-mobile/posts")
  }
  static async getCommentList() {
    return axios.get("https://my-json-server.typicode.com/Ep1cType/goodbit-mobile/comments")
  }
  static async createPost(post) {
    return axios.post("https://my-json-server.typicode.com/Ep1cType/goodbit-mobile/posts", post)
  }
  static async createComment(comment) {
    return axios.post("https://my-json-server.typicode.com/Ep1cType/goodbit-mobile/comments", comment)
  }
  static async getPost(id) {
    return axios.get(`https://my-json-server.typicode.com/Ep1cType/goodbit-mobile/posts/${id}`)
  }
}
