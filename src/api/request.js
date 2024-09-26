import axios from "axios";
import { useUserStore } from "@/store";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});
// 配置请求拦截器(回调函数)
// 在服务器还没有接收到数据之前 拦截器先拿到
// 只有通过拦截器后 请求才得以发送出去
http.interceptors.request.use(async (config) => {
  // 在请求拦截器需要获取登陆凭证（cookie、token） userStore => localStorage
  // 在组件外使用需要注意：使用useXXXStore()一定需要在app.use(pinia)之后
  const userStore = useUserStore();
  /*
  const extParams = {};
  if (userStore.cookie) extParams.cookie = userStore.cookie;
  // get请求没有通过params传递参数 config是不存在params这个属性的
  config.params = Object.assign(config.params || {}, extParams);
  */
  config.headers.set("Cookie", userStore.cookie);
  return config;
});
// 配置响应拦截器（回调函数）
// 在开发者还没有拿到响应数据前 拦截器先拿到
// 只有通过拦截器 响应才能获得
http.interceptors.response.use(
  (response) => {
    // 请求成功
    if (response.data.code !== 200) {
      // 业务不成功
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    console.log(error.data.code);
  }
);

// 拦截器作用是：改写请求参数 和 响应数据

export default http;
