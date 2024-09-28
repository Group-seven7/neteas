<template>
  <!-- <Menu :data="menu" /> -->
  <img />
  <TopPage></TopPage>
  <BlockType
    v-for="item in block"
    :key="item.blockCode"
    :data="item"
    class="mt-[10px]"
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

const block = ref([]);
getDate().then((res) => {
  block.value = res.data.data.blocks;
});
const { data } = useRequest(getDate);
console.log(data);
</script>
