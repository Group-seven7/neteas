<template>
  <div class="fixed-bottom fixed bg-white w-full shadow-md">
    <div class="flex justify-around text-black px-4">
      <div class="flex flex-col items-center w-[15vw]">
        <Icon
          icon="simple-icons:neteasecloudmusic"
          class="w-[9vw] h-[9vw] filter"
        />
        <span class="m-3 text-[4vw] text-[#676c6c]">发现</span>
      </div>
      <div class="flex flex-col items-center w-[15vw]">
        <Icon icon="basil:hotspot-solid" class="w-[9vw] h-[9vw] filter" />
        <span class="m-3 text-[4vw] text-[#676c6c]">博客</span>
      </div>
      <div class="flex flex-col items-center w-[15vw]">
        <Icon icon="mingcute:music-line" class="w-[9vw] h-[9vw] filter" />
        <span class="m-3 text-[4vw] text-[#676c6c]">我的</span>
      </div>
      <div class="flex flex-col items-center w-[15vw]">
        <Icon icon="ic:baseline-group" class="w-[9vw] h-[9vw] filter" />
        <span class="m-3 text-[4vw] text-[#676c6c]">关注</span>
      </div>
      <div class="flex flex-col items-center w-[15vw]">
        <Icon icon="basil:comment-solid" class="w-[9vw] h-[9vw] filter" />
        <span class="m-3 text-[4vw] text-[#676c6c]">社区</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<style scoped>
.filter {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0' /></filter></svg>#colorize");
}
.fixed-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px; /* 紧贴底部 */
  background-color: white;
  z-index: 1000; /* 确保在页面内容上方 */
}
</style>
