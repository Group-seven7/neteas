/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import { defineStore } from "pinia";

export const useCountStore = defineStore("count", {
  state() {
    return {
      count: 1,
      ratio: 2,
    };
  },
  // 定义派生数据
  getters: {
    powCount(state) {
      return state.count ** 2;
    },
  },
  actions: {
    increase() {
      this.count++;
    },
    setValue(value) {
      this.count = value;
    },
  },
  // 开启数据持久化
  persist: {
    // 保存在本地存储中的key
    key: "countStore",
    storage: sessionStorage,
    pick: ["count"],
  },
});
