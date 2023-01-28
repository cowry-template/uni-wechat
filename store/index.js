import Vue from "vue";
import Vuex from "vuex";
import app from "@/main";
import http from "@/utils/http";
import config from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabbar: "home", // home account share
    userInfo: uni.getStorageSync("userInfo") || { grant_type: 1 },
    wxInfo: uni.getStorageSync("wxInfo") || {},
    onLaunch: true,
    token: uni.getStorageSync("token") || "",
  },
  getters: {
    isLogin: (state) => {
      const userId = state.userInfo.user_id || "";
      return state.token && userId;
    },
  },
  mutations: {
    update(state, [key, value]) {
      uni.setStorageSync(key, value);
      state[key] = value;
    },
    set_onLaunch(state) {
      state.onLaunch = true;
    },
    set_wxInfo(state, v) {
      uni.setStorageSync("wxInfo", v);
      state.wxInfo = v;
    },
    set_userInfo(state, v) {
      uni.setStorageSync("userInfo", v);
      state.userInfo = v;
    },
    set_token(state, v) {
      uni.setStorageSync("token", v);
      state.token = v;
    },
    set_tabbar(state, v) {
      state.tabbar = v;
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      });
    },
  },
  actions: {
    async onLaunch({ dispatch, commit, state }) {
      if (!state.onLaunch) {
        try {
          await dispatch("login");
        } catch (error) {}
        commit("set_onLaunch");
      }
    },

    async logout({ dispatch, commit, state }) {
      commit("set_userInfo", {});
      commit("set_token", "");
      commit("set_wxInfo", {});
    },

    login({ dispatch, commit, state }) {
      return new Promise((resolve, reject) => {
        uni.login({
          success: (loginRes) => {
            // login  request
          },
        });
      });
    },
    async changeTabbar({ commit, state }, value) {
      // 如果是跳个人中心，要判断是否登录
      commit("set_tabbar", value);
      return;
    },
    saveWxInfo({ dispatch, commit, state }, value) {
      commit("set_wxInfo", value);
    },
  },
});
