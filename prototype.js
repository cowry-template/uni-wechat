import Vue from "vue";
import http from "@/utils/http";

Vue.prototype.$http = http;
Vue.prototype.$bg = (url) => {
  return {
    background: `url("${url}")`,
  };
};

Vue.prototype.$toast = async (title, icon = "none") => {
  uni.showToast({
    title,
    icon,
    mask: true,
    duration: 3000,
  });
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
};
Vue.prototype.$delay = async (time = 1500) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
Vue.prototype.$confirm = (str, showCancel = true) => {
  let confirmText = "确定";
  let _showCancel = true;
  if (typeof showCancel === "object") {
    confirmText = showCancel.confirmText;
    _showCancel = showCancel.showCancel;
  }
  let body = {
    title: "提示",
    content: str,
    showCancel: _showCancel,
    confirmText,
  };
  return new Promise(async (resolve, reject) => {
    let res = await uni.showModal(body);
    if (res[1].confirm) {
      resolve(true);
    } else {
      reject(false);
    }
  });
};

Vue.prototype.$amount = (v) => {
  if (!v) {
    return "0.00";
  }
  let res = v.toFixed(2);
  let res2 = res.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
  return res2;
};

// 获取当前页面的fullPath
Vue.prototype.$goLogin = (skipGetPhone = 0) => {
  uni.reLaunch({
    url: `/pages/login`,
  });
};

Vue.prototype.$refresh = (reset = false) => {
  let pages = getCurrentPages();
  let pagesUrl = pages[pages.length - 1];
  const fullPath = pagesUrl.$page.fullPath;
  if (!reset) {
    uni.redirectTo({
      url: fullPath,
    });
  } else {
    uni.reLaunch({
      url: fullPath,
    });
  }
};

Vue.prototype.$getPageQuery = () => {
  // 获取url参数
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  // console.log('page', page);
  return page.options;
};
