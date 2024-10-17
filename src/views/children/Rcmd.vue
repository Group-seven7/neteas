<template>
  <Wrapper :title="props.data.name" class="ml-[5vw]">
    <BetterScroll :config="{ scrollX: true, scrollY: false, click: true }">
      <div class="flex"> <!-- 使用水平 flex 布局 -->
        <div
          v-for="(item) in props.data.creatives"
          :key="item.id"
          class="flex flex-col items-center p-2 w-64" 
        >
          <div class="h-[1rem] m-1 flex justify-start items-center text-[#828282] text-[12px] font-extrabold">
            {{ item.uiElement.mainTitle.title }}
          </div>
          <div class="flex flex-col items-center">
            <div class="flex flex-col">
              <div
                v-for="inItem in item.resources"
                :key="inItem.id"
                @click="getResourceId(inItem.resourceExtInfo.songData.id)"
                class="flex items-start mb-2 cursor-pointer"
              >
                <img
                  class="rounded-[20px] w-[4rem] p-1"
                  :src="inItem.uiElement.image.imageUrl"
                  alt=""
                />
                <div class="flex flex-col justify-center ml-2 w-[80%]">
                  <div class="text-[#4d4c4c] text-[12px] font-bold">
                    {{ inItem.uiElement.mainTitle.title }}
                  </div>
                  <div class="flex p-1">
                    <div
                      v-if="inItem.uiElement.subTitle.title"
                      class="h-[1rem] flex justify-start p-1 items-center rounded-[6px] bg-[#fff1f1] text-[#ff5c5c] text-[8px]"
                    >
                      <span>{{ inItem.uiElement.subTitle.title }}</span>
                    </div>
                  </div>
                </div>
                <Icon
                  class="text-[#acacac] ml-2"
                  icon="typcn:media-play"
                  width="1.4rem"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BetterScroll>
  </Wrapper>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import BetterScroll from "@/components/BetterScroll.vue";
import Wrapper from "@/components/Wrapper.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// Function to handle resource ID
// const getResourceId = (resourceId) => {
//   emit("transmiteSongId", resourceId);
// };
</script>

<style scoped>
/* 额外样式可以在这里添加 */
</style>