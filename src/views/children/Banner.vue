<template>
  <Swiper autoplay loop pagination :modules="[Autoplay, Pagination]">
    <SwiperSlide v-for="item in props.data" :key="item">
      <img :src="item.img" alt="" />
    </SwiperSlide>
  </Swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import { defineProps } from "vue";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const props = defineProps({
  data: {
    type: Array,
    Required: true,
  },
});
</script>
