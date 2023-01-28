import Request from "./request";
import cfg from "@/config";
import store from "@/store";
import app from "@/main";

const http = new Request();
const Loading = false;

const EXCLUDES_URL = [];

http.setConfig((config) => {
  /* 设置全局配置 */
  config.baseUrl = cfg.baseUrl;
  config.useToken = true;
  config.header.Loading = Loading;
  config.header = {
    ...config.header,
  };

  return config;
});

http.validateStatus = (statusCode) => {
  return statusCode === 200;
};

/* 请求之前拦截器 */
http.interceptor.request(async (config, cancel) => {
  if (config.header.Loading) {
    uni.showLoading({
      title: "加载中",
      mask: true,
    });
  }

  if (!config.useToken) return config;

  let token = "";

  if (config.url == "auth/oauth/token") {
    token = "";
  } else {
    await new Promise((resolve) => {
      if (store.state.onLaunch) {
        return resolve();
      }
      let off = store.subscribe((mutation, state) => {
        if (state.onLaunch) {
          resolve();
          off();
        }
      });
    });

    token = "Bearer " + uni.getStorageSync("token");
  }

  config.header = {
    ...config.header,
    Authorization: token,
  };

  return config;
});

http.interceptor.response(
  (response) => {
    uni.hideLoading();
    let { data, header } = response;

    if (typeof data == "string") {
      data = JSON.parse(data);
    }

    if (data.code) {
      uni.showToast({
        title: data.msg,
        icon: "none",
        mask: true,
        duration: 2500,
      });
      return {
        ...data,
        fail: true,
      };
    }

    return data.data;
  },
  async (response) => {
    uni.hideLoading();

    const { header, data, config, statusCode } = response;
    console.log("response", response);

    if ((data.data || "").indexOf("token") > -1 || statusCode == 424) {
      uni.setStorageSync("token", "");
      uni.setStorageSync("userInfo", {});
      if (!EXCLUDES_URL.includes(config.url)) {
        // 登录失效 去登陆
      }
    }

    return Promise.reject({
      ...response,
      fail: true,
    });
  }
);

export default http;
