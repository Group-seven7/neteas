import axios from "axios";
// import localforage from "localforage";
// import { showFailToast } from "vant";

const request = axios.create({
  baseURL: "https://neteasecloudmusicapi-main-lovat.vercel.app/",
});
export default request;
