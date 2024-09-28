import { createApp } from "vue";
import "@/style.css";
import "vant/lib/index.css";
import { Icon } from "@iconify/vue";
import App from "@/App.vue";
import initErrorHandle from "@/utils/initErrorHandle";
import router from "./router/routes";
// import pinia from "./store";

initErrorHandle();

createApp(App).use(router).use(Icon).mount("#app");
