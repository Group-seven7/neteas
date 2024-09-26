import { createApp } from "vue";
import "@/style.css";
import "vant/lib/index.css";
import { Icon } from "@iconify/vue";
import App from "@/App.vue";
import initErrorHandle from "@/utils/initErrorHandle";
import router from "./router";
import pinia from "./store";

initErrorHandle();

createApp(App).use(router).use(pinia).use(Icon).mount("#app");
