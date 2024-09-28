<template>
  <Wrapper :title="props.data.name" class="ml-[5vw]">
    <BetterScroll :config="{ scrollX: false, scrollY: true, click: true }">
      <ul v-for="item in props.data.children" :key="item.id" class="mt-[3vw]">
        <li class="flex">
          <img
            class="w-[17vw] h-[17vw] rounded-[3vw]"
            :src="item.imageUrl"
            alt=""
          />
          <div
            class="w-[34vw] h-[10vw] overflow-hidden text-[5vw] ml-[2vw]"
            style="width: 150px; height: 66px; line-height: 66px"
          >
            {{ item.title }}
          </div>
        </li>
      </ul>
    </BetterScroll>
  </Wrapper>
</template>
<script setup>
import { defineProps } from "vue";
import BetterScroll from "@/components/BetterScroll.vue";
import Wrapper from "@/components/Wrapper.vue";

const props = defineProps({
  data: {},
});
</script>
