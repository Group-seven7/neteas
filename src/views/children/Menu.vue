<template>
  <BetterScoll
    :dep="true"
    :config="{
      scrollX: true,
      scrollY: false,
    }"
  >
    <div
      v-for="(item, index) in Props.data"
      :key="item.name"
      class="flex flex-col items-center w-[20vw]"
    >
      <div class="relative">
        <img :src="item.img" class="filter w-[9vw]" />
        <span
          class="text-[2.5vw] text-white absolute top-[54%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          v-if="index === 0"
          >{{ data }}</span
        >
      </div>
      <span class="text-[2.99vw] text-[#676c6c]">
        {{ item.name }}
      </span>
    </div>
  </BetterScoll>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import BetterScoll from "@/components/BetterScroll.vue";

const Props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["click"]);
console.log(emit);
</script>
<style scoped>
.filter {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0' /></filter></svg>#colorize");
}
</style>
