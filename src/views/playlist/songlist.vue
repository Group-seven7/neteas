<template>
  <header
    class="bg-gradient-to-b from-blue-500 to-light-blue-500 p-[4vw] text-white"
  >
    <!-- Top Header Icons -->
    <div class="flex justify-between items-center">
      <Icon
        icon="ic:twotone-arrow-back-ios"
        class="w-[6vw] h-[6vw]"
        @click="fnback"
      />
      <div class="text-lg">歌单</div>
      <div class="flex space-x-4">
        <Icon icon="ic:outline-search" class="w-[6vw] h-[6vw]" />
        <Icon icon="mingcute:more-2-line" class="w-[6vw] h-[6vw]" />
      </div>
    </div>
    <!-- Song Detail Section -->
    <div class="flex items-start mt-[3vw]">
      <div class="relative mr-[4vw]">
        <img
          :src="SongDetail.img"
          alt="Song Image"
          class="w-[30vw] h-[30vw] object-cover rounded"
        />
        <!-- <span v-if="SongDetail.playCount" class="absolute bottom-1 right-2 bg-gray-800 text-white text-xs px-1 rounded">
          {{ getMath(SongDetail.playCount) }}次播放
        </span> -->
      </div>
      <div class="flex-1">
        <div class="font-semibold text-lg">{{ SongDetail.name }}</div>
        <div class="flex space-x-2 mt-[1vw]">
          <span
            v-for="tag in SongDetail.tags"
            :key="tag"
            class="bg-gray-600 px-2 py-1 rounded-full text-xs"
            >{{ tag }}</span
          >
        </div>
      </div>
    </div>
    <!-- Song Description -->
    <div class="text-gray-300 mt-2 line-clamp-2 text-sm">
      {{ SongDetail.description }}
    </div>
    <!-- Song Menu -->
    <div class="flex items-center">
      <button class="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        Button
      </button>
      <button class="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        Button
      </button>
      <button class="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        Button
      </button>
    </div>
    <!-- Song List -->
    <div class="mt-4">
      <div class="flex items-center mb-4 text-sm">
        <Icon icon="ic:round-play-circle" class="w-[6vw] h-[6vw] mr-2" />
        <span>播放全部 ({{ songData.length }})</span>
      </div>
      <div class="space-y-6">
        <div
          v-for="(song, index) in songData"
          :key="song.id"
          class="flex justify-between items-center"
        >
          <div class="flex items-start">
            <div class="text-gray-500 w-[6vw]">{{ index + 1 }}</div>
            <div class="flex flex-col w-[70vw]">
              <div class="text-base line-clamp-1">{{ song.name }}</div>
              <div class="text-xs text-gray-400">
                {{ song.ar[0].name }} - {{ song.al.name }}
              </div>
            </div>
          </div>
          <Icon
            icon="mingcute:more-2-line"
            class="text-gray-500 w-[5vw] h-[5vw]"
          />
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getNewSong, getSongDetail } from "@/api/index";

const router = useRouter();
const route = useRoute();
const songData = ref([]);
const SongDetail = ref({
  name: "",
  img: "",
  tags: [],
  description: "",
  playCount: 0,
});
const fnback = () => {
  router.push({ path: "/" });
};
const search = computed(() => {
  return route.query.a || "";
});
console.log("Route Query:", route.query);
// 数据获取
const fetchData = async () => {
  try {
    console.log("搜索参数:", search.value);

    // 并行请求
    const [newSongRes, songDetailRes] = await Promise.all([
      getNewSong(search.value),
      getSongDetail(search.value),
    ]);

    console.log("新歌数据:", newSongRes.data);
    songData.value = newSongRes.data.songs;

    console.log("歌单详情:", songDetailRes?.data);
    if (songDetailRes?.data?.playlist) {
      const { playlist } = songDetailRes.data;
      SongDetail.value = {
        name: playlist.name,
        img: playlist.coverImgUrl,
        tags: playlist.tags,
        description: playlist.description,
        playCount: playlist.playCount,
      };
    } else {
      console.log("Playlist data is not available");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
onMounted(fetchData);
</script>
<style scoped></style>
