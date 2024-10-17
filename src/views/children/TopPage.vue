<!-- <template>
  <div class="sticky top-0 z-40 bg-white">
    <div class="flex position-relative">
      <div class="flex flex-col items-center w-[20vw]">
        <Icon
          icon="mdi:hamburger-menu"
          class="w-[9vw] h-[9vw]"
          @click="toggleSidebar"
        />
        <Icon
          icon="ph:microphone"
          style="color: black"
          class="w-[9vw] h-[9vw] absolute right-4"
        />
      </div>
      <form
        class="relative flex w-[20vw] max-w-xs"
        action="/search"
        method="GET"
      >
        <input
          type="search"
          class="flex-grow appearance-none shadow rounded-[5vw]"
          placeholder="离别开出花-就是南..."
          name="q"
        />
      </form>
    </div>
    <div>
      <sidebarPage :isOpen="isOpen" @close="toggleSidebar" />
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import sidebarPage from "./sideBar/sidebarPage.vue";

const isOpen = ref(false);
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
</script>
<style scoped>
.filter {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0' /></filter></svg>#colorize");
}
</style> -->
<template>
  <header class="flex items-center w-full"> <!-- 使用 items-center 确保垂直居中 -->
    <!-- <Icon icon="mdi:hamburger-menu" class="w-[1.3em] h-[1.3em] mt-[2px]" /> -->
     
     <sildebarPage></sildebarPage>
    <nav class="flex items-center mx-4 w-70vw">
      <Icon
        icon="material-symbols-light:search"
        width="1.2em"
        height="1.2em"
        style="color: black"
        class="mr-2"
      />
      <div class="flex items-center" @click="focusInput" inert="true">
        <van-cell-group>
          <van-field
            ref="usernameInput"
            v-model="value"
            placeholder="请输入用户名"
            class="w-1/2"
          />
        </van-cell-group>
      </div>
      <Icon
        icon="icon-park:scan-code"
        width="1.2em"
        height="1.2em"
        class="ml-2"
      />
    </nav>
      <Icon icon="ph:microphone" width="1.3em" height="1.3em" class="ml-9"/>
  </header>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import sildebarPage from "@/views/children/sideBar/sidebarPage.vue"

const value = ref("");
const usernameInput = ref(null);  // 创建输入框的引用

function focusInput() {
  usernameInput.value.$el.focus();  // 使用 $el 进行聚焦
}
</script>

<style scoped>
/* 如果需要，可以在此处添加额外的样式 */
</style>