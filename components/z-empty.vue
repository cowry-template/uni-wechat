<template>
  <div class="empty" :class="{
      small: size == 'small',
    }">
    <img mode="widthFix" :src="imgUrl" alt />
    <div class="flex vcenter hcenter">
      <div class="line"></div>

      <div class="tips">{{ tips }}</div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import config from '@/config'

export default {
  name: 'Empty',
  props: {
    img: {
      type: String,
      default: '',
    },
    tips: {
      type: String,
      default: '暂无抢购',
    },
    size: {
      type: String,
      default: 'normal',
    },
  },
  computed: {
    imgUrl() {
      const url = this.img || 'common-empty.png'

      if (String(url).indexOf('http') > -1) {
        return url
      }

      return `${config.staticUrl}mini/${url}`
    },
  },
}
</script>

<style lang="scss" scoped>
.empty {
  padding: 200rpx 0 0 0;
  width: 100%;
  text-align: center;
  &.small {
    padding: 0;
    img {
      width: 160rpx;
    }
  }

  img {
    width: 351rpx;
  }
  .line {
    width: 22rpx;
    height: 1px;
    background: #ababab;
    transform: scaleY(0.5);
  }
  .tips {
    padding: 0 10rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #ababab;
    line-height: 40rpx;
    letter-spacing: 1px;
  }
}
</style>
