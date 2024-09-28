import axios from "axios";
// import localforage from "localforage";
// import { showFailToast } from "vant";

const request = axios.create({
  baseURL: "https://wangyiyun-teal.vercel.app",
});
export default request;
