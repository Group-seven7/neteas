<template>
  <div class="bg-red-600 w-full h-screen flex flex-col items-center justify-center">
    <van-popup
      v-model:show="showCenter"
      round
      class="p-6 w-11/12"
    >
      <div class="flex flex-col w-full h-full text-sm leading-6">
        <div class="font-semibold mb-4 text-base">服务条款和隐私政策提示</div>
        <div class="mb-4 text-gray-500">欢迎使用网易云音乐!</div>
        <div class="text-gray-500 mb-4">
          在您使用网易云音乐前，请您认真阅读并了解
          <a href="#" class="text-blue-600">《服务条款》</a> 和
          <a href="#" class="text-blue-600">《隐私政策》。</a>
        </div>
        <div class="text-gray-500 mb-4">
          如您未满14周岁，您还需通知您的监护人，共同阅读
          <a href="#" class="text-blue-600">《儿童隐私政策》</a>，
          点击“同意”即表示您和您的监护人已阅读并同意全部条款。
        </div>
        <div class="mb-4">
          <van-button
            type="default"
            round
            hairline
            @click="agree"
            class="bg-red-600 text-white font-semibold w-full"
          >
            同意
          </van-button>
        </div>
        <div @click="Close" class="text-blue-600 cursor-pointer text-center">
          不同意退出APP>>
        </div>
      </div>
    </van-popup>

    <!-- Logo 部分 -->
    <div class="relative flex justify-center mb-6 mt-4">
      <div class="border border-red-600 rounded-full w-64 h-64 flex items-center justify-center">
        <div class="border border-white rounded-full w-40 h-40 flex items-center justify-center">
          <div class="bg-white border border-white rounded-full w-16 h-16 flex items-center justify-center">
            <Icon
              icon="ri:netease-cloud-music-fill"
              class="text-red-600 w-14 h-14"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 登录按钮 -->
    <div class="flex justify-center mt-6 w-full">
      <van-button
        type="default"
        round
        class="text-red-600 font-semibold w-3/5"
        @click="phoneLogin"
      >
        手机号登录
      </van-button>
    </div>

    <div class="flex justify-center mt-4 w-full">
      <van-button
        type="default"
        round
        hairline
        class="bg-red-600 text-white font-semibold w-3/5"
      >
        立即体验
      </van-button>
    </div>

    <!-- 社交登录 -->
   <div class="flex justify-center mt-6">
  <div class="flex justify-between w-3/5 text-gray-200 gap-4">
    <div class="w-10 h-10 border border-red-600 rounded-full relative cursor-pointer">
      <Icon
        icon="mdi:wechat"
        class="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    <div class="w-10 h-10 border border-red-600 rounded-full relative cursor-pointer">
      <Icon
        icon="mingcute:qq-fill"
        class="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    <div class="w-10 h-10 border border-red-600 rounded-full relative cursor-pointer">
      <Icon
        icon="ri:weibo-fill"
        class="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    <div class="w-10 h-10 border border-red-600 rounded-full relative cursor-pointer">
      <Icon
        icon="mdi:qrcode-scan"
        class="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        @click="Phonesample"
      />
    </div>
  </div>
</div>

    <!-- 协议部分 -->
    <div class="flex justify-center mt-6">
      <div class="flex items-center text-xs">
        <van-checkbox
          v-model="checked"
          @click="CheckedStatus"
          shape="square"
          class="w-2.5 h-2.5 text-red-800 mr-1"
          icon-size="0.6rem"
        ></van-checkbox>
        <div class="text-red-600">同意</div>
        <a href="#" class="text-red-400">《用户协议》</a>
        <a href="#" class="text-red-400">《隐私政策》</a>
        <a href="#" class="text-red-400">《儿童隐私政策》</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
// import Phonesample from "./phonesample.vue";

const router = useRouter();
const checked = ref(false);
const showCenter = ref(false);

const CheckedStatus = () => {
  // console.log(checked.value);
};

const phoneLogin = (path) => {
  if (!showCenter.value) {
    showCenter.value = true;
  }
  if (checked.value) {
    router.push(path);
    router.push({ name: "PhoneLogin" });
  }
};
const Phonesample = () => {
  router.push({name: "PhoneSample"});
};
const agree = () => {
  showCenter.value = false;
  checked.value = true;
};

const Close = () => {
  window.location.href = "about:blank";
  window.close();
};
</script>