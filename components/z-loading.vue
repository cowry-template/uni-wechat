<template>
  <div class="loading-wrap">
    <div class="loading-box">
      <img class="loading-icon" :src="getIcons('icon_spin.png')" />
      <p class="loading-txt">{{ label }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZLoading",
  props: {
    label: {
      type: String,
      default: "身份切换中，稍作等待…",
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  &-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background: transparent;
    animation: fadeIn 0.3s ease-in-out;
  }
  &-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 280rpx;
    height: 300rpx;
    background: rgba(#000, 0.88);
    border-radius: 16rpx;
    text-align: center;
  }
  &-icon {
    display: block;
    margin: 80rpx auto 30rpx;
    width: 100rpx;
    height: 100rpx;
    animation: loading-spin 1.3s infinite cubic-bezier(0, 0, 1, 1);
  }
  &-txt {
    height: 80rpx;
    font-size: 20rpx;
    font-weight: 400;
    color: #ffffff;
  }
}

@keyframes loading-spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
