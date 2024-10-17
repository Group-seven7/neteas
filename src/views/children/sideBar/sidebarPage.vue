<template>
  <van-badge class="flex items-start" @click="showPopup">
    <!-- 点击按钮时弹出 -->
    <Icon icon="mdi:hamburger-menu" class="w-[1.3em] h-[1.3em] mt-[2px]" />
  </van-badge>

  <van-popup
    v-model:show="showleft"
    position="left"
    :style="{
      width: '80vw',
      height: '100vh',
      backgroundColor: 'rgba(255,255,255,0.2)',
    }"
    @close="onClose"
  >
    <header>
      <!-- 第一行 -->
      <el-row :gutter="20" class="flex items-start justify-between">
        <el-col :span="16">
          <div class="grid-content ep-bg-purple flex items-center">
            <img
              :src="
                status?.value?.data?.profile?.avatarUrl|| defaultAvatar
               "
              alt=""
              class="mr-2 rounded-full w-[1.3em] h-[1.3em]"
            />
            <span class="text-white" >{{
               status.data.profile.nickname  ||"请登入"
            }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div
            class="grid-content ep-bg-purple flex items-center justify-center"
          >
            <Icon
              icon="icon-park:scan-code"
              class="w-[1.3em] h-[1.3em] mt-[2px]"
            />
          </div>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <div class="w-full rounded-xl h-[30vw]">
        <div
          class="mx-auto w-[76vw] h-[27.66vw] bg-gradient-to-r from-[#3b3b3b] to-[#5f5050] px-[3.96vw] text-[#9e8f8f] rounded-[20px] pointer-events-auto"
        >
          <div class="h-[10vw] flex justify-between items-center">
            <h1 class="text-[3.6vw] text-[#ffeeeb]">开通黑胶VIP</h1>
            <div
              class="w-[15.78vw] h-[6.56vw] leading-[6vw] text-center rounded-full border border-[#9e8f8f] text-[2.5vw] mt-[3vw]"
            >
              会员中心
            </div>
          </div>
          <div class="h-[7vw] border-b border-[#494443]">
            <p class="text-[2.73vw]">点击恢复超21项专属特权</p>
          </div>
          <div
            class="h-[11vw] leading-[11vw] flex justify-between items-center mr-[4.45vw]"
          >
            <div class="text-[2.5vw]">受邀专享，黑胶VIP低至0.27元/天!</div>
            <div class="w-[8vw] scale-50">
              <div
                class="w-[22vw] h-[22vw] rounded-[10px] bg-[#e54701] text-white pl-[3vw] text-[8vw] scale-50"
              >
                受邀专享
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="dark:bg-[#2c2c2c] rounded-[15px] bg-white w-[76vw] mx-auto mt-[4vw] pointer-events-auto"
      ></div>
      <!-- 第三行 -->
      <div>
        <van-cell title="我的消息" is-link />
        <van-cell value="内容" icon="shop-o" is-link>
          <template v-slot:title> </template>
        </van-cell>
         <!--核心几个功能   -->
        <van-cell title="退出账号" is-link @click="showLogoutPopup" />
        
        <!-- 退出确认弹窗 -->
        <van-popup v-model:show="showLogout" :style="{ padding: '20px' }">
          <div class="w-40vw h-40vw bg-amber-300">
            <p>您确定要退出账号吗？</p>
            <button @click="logout">确认退出</button>
          </div>
        </van-popup>
      </div>
    </header>
  </van-popup>
</template>

<script setup>
import  { getLoginStatus,getLogout} from "@/api";
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store";
import router from "@/router/routes";

const userStore = useUserStore();
const status = ref();
const showleft = ref(false); // 初始化为布尔值
const showLogout = ref(false);
const defaultAvatar="http://p1.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg"
function showPopup() {
  showleft.value = true; // 点击时设置为 true
}
// 登入相关
const checkLoginStatus = async () => {
  const {cookie} = userStore; // 获取 cookie
   status.value = await getLoginStatus(cookie); // 获取登录状态
  // console.log(userStore.cookie);
  // console.log(userStore);
console.log(status.value.data.profile.nickname);
  if (status.value) {
    console.log("登录状态:", status.value);
    // 根据状态做进一步处理
    if (status.value.data.code === 200) { // 假设 200 表示已登录
      console.log("用户已登录");
    } else {
      console.log("用户未登录或状态异常", status.value);
    }
  } else {
    console.error("未能获取到登录状态");
  }
};



onMounted(async () => {
 await userStore.loadUserInfo(); // 从 localforage 加载用户信息
  if (userStore.cookie) {
    await checkLoginStatus(); // 如果 cookie 存在，检查登录状态
  } else {
    console.error("Cookie 为空，未能获取登录状态");
  }
});

function onClose() {
  showleft.value = false; // 关闭时设置为 false
}
// 显示退出确认弹窗
function showLogoutPopup() {
  showLogout.value = true;
}

// 处理退出逻辑
const logout = async () => {
  try {
    await getLogout(); // 调用登出 API
    userStore.clearUserInfo(); // 清理用户信息
    showLogout.value = false; // 关闭弹窗，导航回主界面或更新状态
    console.log("用户已退出登录");
    router.push("/");
  } catch (error) {
    console.error("退出登录失败:", error);
    // 可以根据需要显示用户友好的错误提示
  }
};

</script>

<style scoped>
/* 添加你需要的样式 */
</style>
