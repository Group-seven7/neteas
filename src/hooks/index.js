/* eslint-disable consistent-return */
import { ref, reactive, toRefs, onBeforeUnmount } from "vue";

export function useFullscreen(element) {
  // 元素全屏状态
  const isFullscreen = ref(false);
  // 元素进入全屏状态
  const enterFullScreen = () => {
    element.value
      .requestFullscreen()
      .then(() => {
        isFullscreen.value = true;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 元素退出全屏
  const exitFullscreen = () => {
    document
      .exitFullscreen()
      .then(() => {
        isFullscreen.value = false;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 切换全屏
  const toggleFullscreen = () => {
    if (isFullscreen.value) {
      exitFullscreen();
    } else {
      enterFullScreen();
    }
  };
  return {
    isFullscreen,
    enterFullScreen,
    exitFullscreen,
    toggleFullscreen,
  };
}

// 获取鼠标位置
export function useMousePosition() {
  const position = reactive({ x: 0, y: 0 });
  const handler = (e) => {
    position.x = e.clientX;
    position.y = e.clientY;
  };
  window.addEventListener("mousemove", handler);
  onBeforeUnmount(() => {
    window.removeEventListener("mousemove", handler);
  });
  return toRefs(position);
}

// 获取网络状态
export function useNetworkStatus() {
  const isOnLine = ref(window.navigator.onLine);
  const onLineHandler = () => {
    isOnLine.value = true;
  };
  const offLineHandler = () => {
    isOnLine.value = false;
  };
  window.addEventListener("online", onLineHandler);
  window.addEventListener("offline", offLineHandler);
  onBeforeUnmount(() => {
    window.removeEventListener("online", onLineHandler);
    window.removeEventListener("offline", offLineHandler);
  });
  return isOnLine;
}

// useRequest useHttp
export function useHttp(promiseGenerator, config = {}) {
  // loading 请求是否在进行中/已完成 true/false
  // data 请求成功所获取的数据 请求中时值为undefined 请求完成且成功值为接口返回的值
  // error 导致请求失败的原因
  // config.manual 为true 表示 手动发送请求 返回值增加 run 属性 （触发请求发送的函数）
  if (!(typeof promiseGenerator === "function")) return;
  const defaultConfig = { manual: false };
  const option = Object.assign(defaultConfig, config);
  const loading = ref(true);
  const data = ref(undefined);
  const error = ref(undefined);
  const run = () => {
    const promise = promiseGenerator();
    if (!(promise instanceof Promise)) return;
    promise
      .then((res) => {
        const result =
          typeof option.transformData === "function"
            ? option.transformData(res)
            : res;
        data.value = result;
      })
      .catch((err) => {
        error.value = err;
      })
      .finally(() => {
        loading.value = false;
      });
  };
  // const result = { loading, data, error };
  if (option.manual) {
    return {
      loading,
      data,
      error,
      run,
    };
  }
  return {
    loading,
    data,
    error,
  };
}

// import { getHomePageData } from "@/api";
// useHttp(getHomePageData)
