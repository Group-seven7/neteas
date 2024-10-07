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
      <a href="#" class="text-gray-500 text-sm absolute right-4">游客登录</a>
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

const router = useRouter();
const key = ref("");
const img = ref("");
const status = ref("");
const loading = ref(false);

// 生成二维码
const generateQR = async () => {
  loading.value = true; // 设置加载状态
  try {
    const keyResponse = await getQRCoderKey();
    key.value = keyResponse.data.unikey; // 适应返回的数据结构

    const qrResponse = await createQR(key.value);
    img.value = qrResponse.data.qrimg; // 获取 QR 图片
    status.value = "请扫描二维码以登录";

    pollQRStatus(); // 开始轮询状态
  } catch (error) {
    console.error(error.message); // 输出错误信息
  } finally {
    loading.value = false; // 清除加载状态
  }
};

// 轮询二维码的扫码状态
const pollQRStatus = () => {
  const intervalId = setInterval(async () => {
    try {
      const statusResponse = await checkQRStatus(key.value);
      console.log(statusResponse); // 打印所有返回数据，调试用
      if (statusResponse.code === 803) {
        clearInterval(intervalId); // 登录成功，停止轮询
        status.value = "登录成功！"; // 显示登录成功的信息

        // 假设 statusResponse.data 返回了用户的相关信息
        const userData = statusResponse.data; // 示例数据
        saveUserData(userData); // 将用户数据存储到 localStorage

        // 处理登录成功后的逻辑，比如跳转页面
        router.push("/"); // 登录成功后跳转到主页
      } else {
        status.value = getStatusMessage(statusResponse.code); // 更新状态信息
      }
    } catch (error) {
      console.error(error.message); // 输出错误信息
    }
  }, 2000); // 每 2 秒轮询一次
};

// 保存用户数据到 localStorage
const saveUserData = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
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
