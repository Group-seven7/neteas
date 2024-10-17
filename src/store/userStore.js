// src/stores/userStore.js

import { defineStore } from "pinia";
import localforage from "localforage";

// 定义名为 "user" 的 store
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null, // 存储用户信息
    cookie: "", // 存储用户 cookie
  }),
  actions: {
    // 设置用户信息并存储到 localforage
    async setUserInfo(userInfo, cookie) {
      this.userInfo = userInfo;
      this.cookie = cookie;
      await localforage.setItem("userInfo", userInfo); // 存储用户信息
      await localforage.setItem("cookie", cookie); // 存储 cookie
    },

    // 从 localforage 加载用户信息和 cookie
    async loadUserInfo() {
      const storedUserInfo = await localforage.getItem("userInfo");
      const storedCookie = await localforage.getItem("cookie");
      if (storedUserInfo && storedCookie) {
        this.userInfo = storedUserInfo;
        this.cookie = storedCookie;
      }
    },

    // 清除用户信息并从 localforage 中移除
    async clearUserInfo() {
      this.userInfo = null;
      this.cookie = "";
      await localforage.removeItem("userInfo"); // 移除用户信息
      await localforage.removeItem("cookie"); // 移除 cookie
    },
  },
});
