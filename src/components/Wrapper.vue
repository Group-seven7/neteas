<template>
  <div>
    <div class="flex justify-between">
      <span @click="emit('clickTitle')" class="text-[#3e4659] font-bold">{{
        props.title
      }}</span>
      <Icon
        @click="emit('clickMore')"
        icon="ri:more-2-fill"
        class="text-[3.761vw] text-[#9195a1]"
      />
    </div>
    <slot />
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
});

const emit = defineEmits(["clickMore", "clickTitle"]);
</script>
