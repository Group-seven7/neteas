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
import { useRouter } from "vue-router";
import { verify, sendValidateCode } from "@/api/index.js";

const router = useRouter();
const verificationCode = ref("");
const verificationMessage = ref("");
const isSending = ref(false);

// 从路由中获取手机号的信息
const phone = router.currentRoute.value.query.Phone;
console.log("Phone value:", phone);

const back = () => {
  router.back();
};

const phonePassword = async () => {
  const res = await verify(Number(phone), verificationCode.value);
  if (res.code === 400) {
    showToast({
      message: "验证码错误或已过期",
      position: "bottom",
      forbidClick: true,
    });
  } else if (res.code === 200) {
    router.push("/HomePage");
  }
};

const sendCode = async () => {
  console.log("Phone value before sending code:", phone);

  if (isSending.value || !phone) {
    verificationMessage.value = "手机号无效";
    return;
  }

  try {
    isSending.value = true;
    await sendValidateCode(phone);
    verificationMessage.value = "验证码已发送";
  } catch (err) {
    console.log(err.message);
    verificationMessage.value = err.message || "发送验证码失败";
  } finally {
    isSending.value = false;
  }
};

const clearMessage = () => {
  verificationMessage.value = ""; // 清除验证码提示信息
};
</script>

<style scoped>
/* No traditional CSS styles as we are using Tailwind CSS */
</style>
