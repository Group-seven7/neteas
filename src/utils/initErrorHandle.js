import { setGlobalOptions } from "vue-request";
import { showToast } from "vant";

export default function initErrorHandle() {
  setGlobalOptions({
    onError(error) {
      showToast(error.data.message);
    },
  });
}
