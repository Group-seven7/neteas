<!-- 侧边栏框架 -->
<template>
  <div :class="['sidebar', { open: isOpen }]">
    <div class="flex items-center justify-between">
      <div @click="toggleLogin">账号登入</div>
      <button class="close-btn" @click="toggleSidebar">✖️</button>
    </div>
    <nav class="nav">
      <ul>
        <li v-for="item in menuItems" :key="item.id">
          <a :href="item.link">{{ item.name }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

import { useRouter } from "vue-router";
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
const router = useRouter();
const toggleLogin = () => {
  router.push({ path: "/loginpage" });
};

const emits = defineEmits(["close"]);

const menuItems = [
  { id: 1, name: "主页", link: "/" },
  { id: 2, name: "我的音乐", link: "/my-music" },
  { id: 3, name: "收藏", link: "/favorites" },
  { id: 4, name: "设置", link: "/settings" },
];

function toggleSidebar() {
  emits("close"); // Emit close event to the parent component
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -250px; /* 初始隐藏位置 */
  width: 250px;
  height: 100%;
  background-color: #1e1e1e;
  color: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transition: left 0.3s ease; /* 平滑过渡效果 */
  padding: 20px;
  z-index: 1000;
}
.sidebar.open {
  left: 0; /* 打开侧边栏 */
}
.close-btn {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 20px; /* 按钮的字体大小 */
  margin-bottom: 20px; /* 按钮和菜单的间距 */
}
.nav {
  list-style: none; /* 移除默认的列表样式 */
  padding-left: 0; /* 去掉默认的内边距 */
}
.nav li {
  margin: 15px 0; /* 菜单项之间的间距 */
}
.nav a {
  color: #ffffff;
  text-decoration: none; /* 移除下划线 */
}
.nav a:hover {
  color: #ff4081; /* 悬停时的字体颜色 */
}
</style>
