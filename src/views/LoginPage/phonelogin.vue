<template>
  <div class="w-full h-full bg-white pt-12 px-6">
    <div class="flex items-center">
      <Icon icon="lets-icons:arrow-left-light" class="w-8 h-8" @click="back" />
      <div class="ml-4 text-xl">手机号登录</div>
    </div>
    <div class="text-sm text-gray-500 mt-14">
      未注册的手机号登录后将自动创建账号
    </div>
    <div class="flex items-center mt-14 border-b border-gray-300 pb-4">
      <div class="mr-2">+86</div>
      <input
        type="text"
        placeholder="请输入手机号"
        v-model="phone"
        @input="validatePhone"  
        @focus="clearError"
        @keyup.enter="phonePassword"
        maxlength="11"
        class="flex-1 border-0 outline-none"
      />
    </div>
    <div v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</div>
    <div class="flex justify-center mt-12">
      <van-button
        type="default"
        round
        class="bg-red-500 text-white font-semibold w-10/12"
        @click="phonePassword"
      >
        下一步
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();
const phone = ref("");
const errorMessage = ref("");

const validatePhone = () => {
  // 清除错误信息
  errorMessage.value = "";

  // 正则表达式验证
  const phoneRegex = /^1[3-9]\d{9}$/;
  
  if (!phoneRegex.test(phone.value)) {
    if (phone.value.length === 0) {
      errorMessage.value = "手机号不能为空";
    } else if (phone.value.length < 11) {
      errorMessage.value = "手机号必须为11位";
    } else {
      errorMessage.value = "手机号码格式有误，请重填";
    }
  }
};

const clearError = () => {
  errorMessage.value = ""; // 清除错误信息
};

const phonePassword = () => {
  validatePhone(); // 进行验证
  if (errorMessage.value) return; // 如果有错误，阻止继续
  router.push({ name: "phonepassword", query: { Phone: phone.value } });
};

const back = () => {
  router.back();
};
</script>
