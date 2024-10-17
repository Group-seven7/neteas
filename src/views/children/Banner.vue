

<template>
  <div class="h-[23vh]">
    <div v-if="Banners" class="w-[96%] m-auto mt-[10px]">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in Banners" :key="item.targetId">
          <div @click="isClicked(item.targetId)">
            <img class="w-[100%] h-[9rem]  rounded-[1.1rem]" :src="item.imageUrl" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>


</template>
<script setup>
import { ref, watch } from "vue"
import { useRequest } from "vue-request";
import { getBannerImage } from "@/api";
import { useUserStore } from "@/store";

const isClicked = (targetId) => {
  console.log(targetId);
};

const Banners = ref()
const userStore = useUserStore()

const { data: banner } = useRequest(() => getBannerImage({ "timestamp": Date.now(), "cookie": userStore.cookie }))
watch(banner, () => {
  console.log(banner.value.banners);
  Banners.value = banner.value.banners
})
</script>
<style scoped></style>
