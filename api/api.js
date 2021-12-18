import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-json-server.typicode.com/Ep1cType/goodbit-mobile/"
});

export default instance;
