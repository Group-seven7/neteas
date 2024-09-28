import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";

// 定义路由配置数组
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
];

// 使用路由配置数组创建路由器实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导出路由器实例
export default router;
