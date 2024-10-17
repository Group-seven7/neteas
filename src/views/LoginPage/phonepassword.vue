<template>
  <div class="w-full h-full bg-white p-3">
    <div class="flex items-center mt-12">
      <Icon
        icon="lets-icons:arrow-left-light"
        class="w-8 h-8 cursor-pointer"
        @click="back"
      />
      <div class="ml-4 text-xl">验证码登录</div>
    </div>

    <div class="flex items-center mt-5">
      <input
        type="text"
        placeholder="请输入验证码"
        v-model="verificationCode"
        @focus="clearMessage"
        class="flex-1 border-b border-gray-300 p-1 outline-none"
      />
      <van-button
        type="info"
        :disabled="isSending"
        @click="sendCode"
        class="ml-2"
      >
        {{ isSending ? "发送中..." : "获取验证码" }}
      </van-button>
    </div>

    <div v-if="verificationMessage" class="text-red-500 mt-2">
      {{ verificationMessage }}
    </div>

    <div class="flex justify-center mt-12">
      <van-button
        type="default"
        round
        class="text-white font-semibold w-4/5 bg-red-600"
        @click="phonePassword"
      >
        登录
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { showToast } from "vant";
import { ref } from "vue";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { verify, verifyCaptcha, sendValidateCode } from "@/api";

const router = useRouter();
const verificationCode = ref("");
const verificationMessage = ref("");
const isSending = ref(false);
const userStore = useUserStore();
const phone = router.currentRoute.value.query.Phone; // 获取当前路由的手机号

// 返回上一个页面
const back = () => {
  router.back();
};

// 登录逻辑
const phonePassword = async () => {
  try {
    // 先进行验证码验证
    const res = await verifyCaptcha(phone, verificationCode.value);
    console.log("验证码验证的响应:", res); // 输出验证码验证的响应

    if (res.code === 400) {
      showToast({
        message: "验证码错误或已过期",
        position: "bottom",
        forbidClick: true,
      });
      return;
    }

    if (res.code === 200) {
      // 验证码成功后调用 verify 接口进行登录
      const verifyResponse = await verify(phone, verificationCode.value);
      console.log("登录的响应:", verifyResponse); // 输出登录接口响应
      if (verifyResponse.data.code === 200) {
        const userInfo =verifyResponse.data ; // 假设用户信息包括手机号
        const { cookie } = verifyResponse.data; // 从响应中获取 cookie

        console.log("Cookie:", cookie); // 输出 cookie 进行调试

        await userStore.setUserInfo(userInfo, cookie); // 存储用户信息和 cookie

        // 跳转到主页
        router.push("/");
      } else {
        showToast({
          message: verifyResponse.data.message || "登录失败，未知错误",
          position: "bottom",
          forbidClick: true,
        });
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    showToast({
      message: "登录请求失败，请稍后重试",
      position: "bottom",
      forbidClick: true,
    });
  }
};

// 发送验证码逻辑
const sendCode = async () => {
  if (isSending.value || !phone) {
    verificationMessage.value = "手机号无效";
    return;
  }
  try {
    isSending.value = true;
    await sendValidateCode(phone);
    verificationMessage.value = "验证码已发送";
    
    // 设置倒计时逻辑
    let countdown = 60;
    const interval = setInterval(() => {
      if (countdown > 0) {
       countdown -= 1;
      } else {
        clearInterval(interval);
        verificationMessage.value = ""; // 清空提示信息
      }
    }, 1000);
  } catch (err) {
    verificationMessage.value = err.message || "发送验证码失败";
  } finally {
    isSending.value = false;
  }
};

// 清除提示信息
const clearMessage = () => {
  verificationMessage.value = ""; // 清除验证码提示信息
};
</script>

<style scoped>
/* 使用 Tailwind CSS 样式，无需额外的传统 CSS */
</style>
