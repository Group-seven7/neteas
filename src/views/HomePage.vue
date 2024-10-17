<template>
  <!-- <Menu :data="menu" /> -->
  <!-- <img /> -->
  <TopPage></TopPage>
  <Banner/>
  <BlockType
    v-for="item in block"
    :key="item.blockCode"
    :data="item"
    class="mt-[10px] mb-[55px]"
  ></BlockType>
  <TabBar></TabBar>
</template>
<script setup>
import { ref } from "vue";
import { useRequest } from "vue-request";
import { getDate } from "@/api/index";
import BlockType from "@/views/children/BlockType.vue";
import TopPage from "./children/TopPage.vue";
import TabBar from "./children/TabBar.vue";
import Banner from "./children/Banner.vue";

const block = ref([]);
getDate().then((res) => {
  block.value = res.data.data.blocks;
});
const { data } = useRequest(getDate);
console.log(data);
</script>
