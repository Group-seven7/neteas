/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { defineStore } from "pinia";
import to from "await-to-js";
import { loginByPhone } from "@/api";
import router from "@/router";

export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: null,
    };
  },
  getters: {
    cookie(state) {
      return state.userInfo?.cookie;
    },
  },
  actions: {
    async userLogin(data) {
      const [err, res] = await to(loginByPhone(data));
      if (res) {
        this.userInfo = res.data;
        // router.replace("/");
      }
    },
  },
  persist: true,
});
