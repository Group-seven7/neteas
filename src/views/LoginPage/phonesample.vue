<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen relative bg-cover bg-center"
    style="background-image: url('/src/assets/loginbg.png')"
  >
    <!-- Header -->
    <header
      class="absolute top-4 left-4 w-full flex items-center justify-between"
    >
      <div class="flex items-center space-x-2">
        <Icon
          icon="lets-icons:arrow-left-light"
          class="w-8 h-8"
          @click="back"
        />
      </div>
      <a href="#" class="text-gray-500 text-sm absolute right-4" @click="back">游客登录</a>
    </header>
    <div>
      <span class="text-lg font-semibold text-gray-700">网易云音乐</span>
    </div>
    <!-- QR Section -->
    <div class="flex flex-col items-center justify-center space-y-4">
      <div v-if="img" class="flex flex-col items-center">
        <p>请扫描二维码:</p>
        <img :src="img" alt="QR Code" class="w-48 h-48" />
      </div>
      <button
        @click="generateQR"
        class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
      >
        生成二维码
      </button>
      <p v-if="status" class="text-gray-700">{{ status }}</p>
      <p v-if="loading" class="text-gray-500">加载中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { getQRCoderKey, createQR, checkQRStatus } from "@/api";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store"; // 引入 Pinia 的 userStore

const router = useRouter();
const key = ref("");
const img = ref("");
const status = ref("");
const loading = ref(false);
const userStore = useUserStore(); // 使用 Pinia store

// 生成二维码
const generateQR = async () => {
  loading.value = true;
  try {
    const keyResponse = await getQRCoderKey();
    key.value = keyResponse.data.unikey;

    const qrResponse = await createQR(key.value);
    img.value = qrResponse.data.qrimg;
    status.value = "请扫描二维码以登录";

    pollQRStatus();
  } catch (error) {
    console.error(error.message);
  } finally {
    loading.value = false;
  }
};

// 轮询二维码的扫码状态
const pollQRStatus = () => {
  const intervalId = setInterval(async () => {
    try {
      const statusResponse = await checkQRStatus(key.value);
      if (statusResponse.code === 803) {
        clearInterval(intervalId);
        status.value = "登录成功！";
        
        console.log("Login success, user data:", statusResponse);
        console.log("Status response:", statusResponse);
        
        const userInfo = statusResponse; // 登录成功后的用户数据
        const {cookie} = statusResponse; // 登录成功后的 cookie
        saveUserData(userInfo, cookie); // 保存用户数据和 cookie

        router.push("/");
      } else {
        status.value = getStatusMessage(statusResponse.code);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, 2000);
};

// 保存用户数据和 cookie 到 Pinia 和 localforage
const saveUserData = (userInfo, cookie) => {
  userStore.setUserInfo(userInfo, cookie); // 存储用户信息和 cookie
};

// 处理状态码，返回友好的提示
const getStatusMessage = (code) => {
  switch (code) {
    case 800:
      return "二维码已过期，请重新生成";
    case 801:
      return "等待扫码...";
    case 802:
      return "待确认...";
    default:
      return "状态不明";
  }
};

const back = () => {
  router.back();
};
</script>

