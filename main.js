import App from "./App";
import config from "@/config";
import store from "@/store";
import "@/prototype";


const sysInfo = uni.getSystemInfoSync();
const platform = sysInfo.system.startsWith("Android") ? "android" : "ios";

// #ifndef VUE3
import Vue from "vue";
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
  store,
});

Vue.mixin({
  data() {
    return {
      isFullscreen: sysInfo.screenWidth / sysInfo.screenHeight < 0.56,
      staticUrl: config.staticUrl,
      defaultImageUrl: `${config.staticUrl}/img/logo.png`,
      platform,
      loadStatus: "loading",
      timer: null,
    };
  },
  methods: {
    getImgUrl(url, file = "temp") {
      if (!url) return "";
      if (url.indexOf("http") > -1) return url;
      return `${config.staticUrl}${file}/${url}`;
    },
    getIcons(name) {
      return `${config.staticUrl}mini/icons/${name}`;
    },
    go(url) {
      console.log("go", url);
      uni.navigateTo({
        url,
      });
    },
    goReplace(url) {
      // #ifdef  MP-ALIPAY
      my.redirectTo({
        url,
      });
      // #endif

      // #ifdef MP-WEIXIN
      uni.redirectTo({
        url,
      });
      // #endif
    },
    goBack(delta = 1) {
      uni.navigateBack({
        delta,
      });
    },
    goLaunch(url = "/pages/home/index") {
      uni.reLaunch({
        url,
      });
    },
    handlerGetPhoneNumber(e) {
    },
  },
  created() {
    // 隐藏分享等按钮;
    uni.hideShareMenu();
  },
});

app.$mount();

export default app;
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
