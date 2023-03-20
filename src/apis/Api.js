import axios from "axios";
import baseURL from "./baseURL"

let Api = axios.create({
  baseURL: baseURL.baseApiURL,
  headers: {
    "Accept": "application/json",
    "Access-Control-Allow-Credentials": true,
  }
});

Api.defaults.withCredentials = true;


export default Api;
