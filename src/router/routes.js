import { createRouter, createWebHistory } from "vue-router";
import localforage from "localforage";
import HomePage from "@/views/HomePage.vue";
import Songlist from "@/views/playlist/songlist.vue";
import Loginpage from "@/views/LoginPage/loginpage.vue";
import PhoneLogin from "@/views/LoginPage/phonelogin.vue";
import PhonePassword from "@/views/LoginPage/phonepassword.vue";
import PhoneSample from "@/views/LoginPage/phonesample.vue";
// 定义路由配置数组
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/songlist/",
    name: "Songlist",
    component: Songlist,
  },
  {
    path: "/loginpage",
    name: "loginpage",
    component: Loginpage,
  },
  {
    path: "/phonelogin",
    name: "PhoneLogin",
    component: PhoneLogin,
  },
  {
    path: "/phonepassword",
    name: "phonepassword",
    component: PhonePassword,
  },
  {
    path: "/phonesacc",
    name: "PhoneSample",
    component: PhoneSample,
  },
];

// 使用路由配置数组创建路由器实例
// 添加全局导航守卫
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// const loginSuccess = (userData) => {
//   // 将用户信息存储到 localStorage
//   localStorage.setItem("userInfo", JSON.stringify(userData));

//   // 跳转到主页或其他受保护页面
//   router.push({ name: "Home" });
// };
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to.fullPath);
  // 如果还没有登录就跳转至登录页面
  const isAuthenticated = localStorage.getItem("userInfo"); // 从localStorage中获取用户信息
  // 如果目标路由需要认证且未登录，跳转到登录页面
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "loginpage" }); // 跳转到登录页面
  } else {
    next(); // 继续导航
  }
});

// 导出路由器实例
export default router;
