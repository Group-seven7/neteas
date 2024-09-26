<template>
  <div
    ref="wrapper"
    :class="`wrapper overflow-hidden ${props.config.scrollX ? 'flex' : ''}`"
  >
    <div :class="`${props.config.scrollX ? 'flex flex-1' : ''}`">
      <slot />
    </div>
  </div>
</template>
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  defineProps,
  watchEffect,
  nextTick,
} from "vue";
import BScroll from "@better-scroll/core";

const props = defineProps({
  // 当依赖发生变化 那么我就刷新better-scorll
  dep: {
    required: true,
  },
  config: {
    type: Object,
    default() {
      return {
        scrollX: false,
        scrollY: true,
      };
    },
  },
});

const wrapper = ref(null);
let bs = null;

onMounted(() => {
  bs = new BScroll(wrapper.value, props.config);
});

watchEffect(() => {
  console.log(props.dep);
  nextTick(() => bs?.refresh());
});

onBeforeUnmount(() => bs.destroy());
</script>
