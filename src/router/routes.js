// import { createRouter, createWebHistory } from "vue-router";
// // import localforage from "localforage";
// import HomePage from "@/views/HomePage.vue";
// import Songlist from "@/views/playlist/songlist.vue";
// import Loginpage from "@/views/LoginPage/loginpage.vue";
// import PhoneLogin from "@/views/LoginPage/phonelogin.vue";
// import PhonePassword from "@/views/LoginPage/phonepassword.vue";
// import PhoneSample from "@/views/LoginPage/phonesample.vue";
// // 定义路由配置数组
// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     component: HomePage,
//   },
//   {
//     path: "/songlist/",
//     name: "Songlist",
//     component: Songlist,
//   },
//   {
//     path: "/loginpage",
//     name: "loginpage",
//     component: Loginpage,
//   },
//   {
//     path: "/phonelogin",
//     name: "PhoneLogin",
//     component: PhoneLogin,
//   },
//   {
//     path: "/phonepassword",
//     name: "phonepassword",
//     component: PhonePassword,
//   },
//   {
//     path: "/phonesacc",
//     name: "PhoneSample",
//     component: PhoneSample,
//   },
// ];

// // 使用路由配置数组创建路由器实例
// // 添加全局导航守卫
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// });

// // const loginSuccess = (userData) => {
// //   // 将用户信息存储到 localStorage
// //   localStorage.setItem("userInfo", JSON.stringify(userData));

// //   // 跳转到主页或其他受保护页面
// //   router.push({ name: "Home" });
// // };
// // 全局前置守卫
// // router.beforeEach((to, from, next) => {
// //   const isAuthenticated = localStorage.getItem("userInfo"); // 检查是否已登录
// //   if (to.meta.requiresAuth && !isAuthenticated) {
// //     next({ name: "loginpage" }); // 如果未登录，跳转到登录页面
// //   } else {
// //     next(); // 继续导航
// //   }
// // });

// // 导出路由器实例
// export default router;
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Songlist from "@/views/playlist/songlist.vue";
import Loginpage from "@/views/LoginPage/loginpage.vue";
import PhoneLogin from "@/views/LoginPage/phonelogin.vue";
import PhonePassword from "@/views/LoginPage/phonepassword.vue";
import PhoneSample from "@/views/LoginPage/phonesample.vue";
import localforage from "localforage";
// import Banner from "@/views/children/Banner.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true }, // 需要登录才能访问
  },
  {
    path: "/songlist/",
    name: "Songlist",
    component: Songlist,
    meta: { requiresAuth: true }, // 需要登录才能访问
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  localforage
    .getItem("userInfo")
    .then((data) => {
      const isLoggedIn = data && data.cookie; // 检查是否有 cookie

      if (to.meta.requiresAuth && !isLoggedIn) {
        next(`/loginpage?originPath=${to.fullPath}`);
      } else {
        next(); // 允许访问
      }
    })
    .catch((err) => {
      console.error("获取用户信息失败:", err);
      next(`/loginpage?originPath=${to.fullPath}`);
    });
}); 
export default router;
