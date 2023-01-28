<template>
  <view class="navbar" :class="{ border }">
    <div class="holderbar"></div>
    <view
      class="header"
      :class="{
        fixed: navFixed,
        absolute: type == 'transback_whiteimgparent',
        colorWhite: isWhite,
        sp: sp,
      }"
      :style="{
        paddingTop: statusBarHeight + 'px',
        background: navBgColor,
        color: navFontColor,
        opacity: transparentValue,
      }"
    >
      <view class="left_box 12">
        <slot name="left">
          <!-- #ifdef MP-WEIXIN -->
          <view class="left_info line1">
            <view v-if="back || $slots.left" class="back" @click.native="onBackPage">
              <img v-if="staticUrl && backColor == 'black'" src="@/static/icons/back.svg" />
              <img v-if="staticUrl && backColor == 'white'" src="@/static/icons/back_white.svg" />
            </view>
            <view
              class="title line1"
              :class="{ noMarginLeft: !back, sp: sp }"
              :style="{ color: navFontColor }"
            >
              <slot>{{ navTitle }}</slot>
            </view>
          </view>
          <!-- #endif -->
        </slot>
        <view class="right">
          <slot name="right"></slot>
        </view>
      </view>
    </view>
    <view
      class="header transparentFixed fixed"
      :class="{ colorWhite: isWhite }"
      v-if="type == 'transparentFixed'"
      :style="{
        paddingTop: statusBarHeight + 'px',
        color: navTransparentFixedFontColor,
        opacity: 1 - transparentValue,
        zIndex: transparentValue < 0.3 ? 100 : 90,
      }"
    >
      <view class="left_box">
        <view class="left_info line1" v-if="back || $slots.left">
          <slot name="transparentFixedLeft">
            <view class="back" @click.native="onBackPage">back</view>
          </slot>
          <view class="title line1" v-if="$slots.default || navTitle">
            <slot name="transparentFixed">{{ navTitle }}</slot>
          </view>
        </view>
      </view>
    </view>
    <view v-if="type == 'fixed'" :style="{ paddingTop: statusBarHeight + 'px' }" class="station"></view>
  </view>
</template>
<script>
// 主页页面的页面路径
// 关联功能：打开的页面只有一个的时候右上角自动显示返回首页按钮，下面这个数组是排除显示返回首页的页面。
// 主页使用场景：小程序分享出去的页面，用户点击开是分享页面，很多情况下是没有返回首页按钮的
const mainPagePath = []
//返回首页的地址
const homePath = '/pages/navList'
//白色表达值
const whiteList = [
  '#FFF',
  '#FFFFFF',
  'white',
  'rgb(255,255,255)',
  'rgba(255,255,255,1)',
]
export default {
  props: {
    //是否显示返回按钮
    back: {
      type: Boolean,
      default: function () {
        return true
      },
    },
    customBack: {
      type: Boolean,
      default: function () {
        return false
      },
    },
    border: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: function () {
        return '#FFF'
      },
    },
    // 返回箭头的颜色，使用不同的图片svg
    backColor: {
      type: String,
      default: 'black',
    },
    //导航字体颜色，字体颜色为白色的时候会把手机状态栏设置为白色，否则为黑色
    fontColor: {
      type: String,
      default: function () {
        return '#000'
      },
    },
    //标题
    title: {
      type: String,
      default: function () {
        return ''
      },
    },
    //类型 fixed为固定 默认
    // ordinary 普通的 不固定
    // transparent 透明不固定的
    // transparentFixed  透明固定的
    // rgbaTransition 背景色从透明到指定颜色，内容不变，只改动rgba中的a值
    type: {
      type: String,
      default: function () {
        return 'fixed'
      },
    },
    //透明固定的时候字体颜色
    transparentFixedFontColor: {
      type: String,
      default: function () {
        return '#000'
      },
    },
    sp: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //状态栏高度
      statusBarHeight: 0,
      //当前页面是否是第一个页面
      firstPage: false,
      //透明度值
      transparentValue: 1,
      //标题
      navTitle: '',
      //字体色
      navFontColor: '#000',
      //透明底字体色
      navTransparentFixedFontColor: '#000',
      navBgColor: '',
      alpha: 0,
    }
  },
  computed: {
    //导航固定
    navFixed() {
      return ['transparentFixed', 'fixed', 'rgbaTransition'].includes(this.type)
    },
    //导航底部线是否显示
    navLine() {
      return this.type !== 'transparent' && whiteList.includes(this.navBgColor)
    },
    //导航字体是否是白色颜色
    isWhite() {
      return whiteList.includes(this.navFontColor)
    },
  },
  watch: {
    title(val) {
      this.navTitle = val
    },
    fontColor(val) {
      this.navFontColor = val
      this.settingColor()
    },
    bgColor(val) {
      this.navBgColor = val
    },
    transparentFixedFontColor(val) {
      this.navTransparentFixedFontColor = val
    },
  },
  //第一次加载
  created() {
    this.navTitle = this.title
    this.navFontColor = this.fontColor
    this.navBgColor = this.bgColor

    if (this.type == 'rgbaTransition') {
      this.navBgColor = 'rgba(0, 167, 74, 0)'
    }

    this.navTransparentFixedFontColor = this.transparentFixedFontColor
    const _this = this
    if (this.type == 'transparentFixed') {
      this.transparentValue = 0
    }
    this.settingColor()
    //获取手机状态栏高度
    this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
    //获取所有页面
    let currentPages = getCurrentPages()
    let pageLen = currentPages.length
    //判断是否是第一个页面，如果是有设置back为true的页面，将不显示返回箭头，而现实返回首页按钮
    if (pageLen == 1 && !mainPagePath.includes(currentPages[0].route)) {
      this.firstPage = true
    }
    //监听页面滚动，type为transparentFixed的时候页面向下滚动的时候导航逐渐变白
    if (this.type == 'transparentFixed') {
      // #ifndef H5
      currentPages[pageLen - 1].onPageScroll = function (e) {
        _this.$emit('scroll', e)
        if (e.scrollTop > 180) {
          _this.transparentValue = 1
        } else {
          _this.transparentValue = e.scrollTop / 180
        }
      }
      // #endif
      // #ifdef H5
      window.onscroll = function (e) {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        _this.$emit('scroll', { scrollTop: scrollTop })
        if (scrollTop > 180) {
          _this.transparentValue = 1
        } else {
          _this.transparentValue = scrollTop / 180
        }
      }
      // #endif
    }
    if (this.type == 'rgbaTransition') {
      currentPages[pageLen - 1].onPageScroll = function (e) {
        _this.$emit('scroll', e)
        if (e.scrollTop > 180) {
          _this.alpha = 1
        } else {
          _this.alpha = e.scrollTop / 180
        }
        _this.navBgColor = `rgba(0, 167, 74, ${_this.alpha})`
      }
    }
  },
  //方法
  methods: {
    //返回上一页面
    onBackPage() {
      this.$emit('back')
      console.log('back', this.customBack)
      if (this.customBack) {
        return
      }

      if (this.firstPage) {
        console.log('firstPage', this.firstPage)
        uni.reLaunch({
          url: '/pages/home/index',
        })
      } else {
        console.log('navigateBack')
        uni.navigateBack()
      }
    },
    //设置手机状态栏颜色
    settingColor() {
      //判断导航栏颜色
      if (whiteList.includes(this.navFontColor)) {
        // 改变手机状态栏颜色
        uni.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: this.navBgColor,
        })
      } else {
        // 改变手机状态栏颜色
        uni.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: this.navBgColor,
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.navbar {
  position: relative;
  overflow: hidden;
}
.border ::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2rpx;
  background: #f2f2f2;
  content: '';
  display: block;
}
.holderbar {
  height: 100%;
}
.station {
  box-sizing: content-box;
  height: 88upx;
}
.header {
  display: flex;
  align-items: flex-end;
  position: relative;
  justify-content: space-between;
  box-sizing: content-box;
  height: 88upx;
  /* #ifdef MP */
  padding-right: 190upx;
  /* #endif */

  &.sp {
    padding-right: 0;
  }
  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  &.absolute {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: transparent !important;
  }
  &.line {
    //需要显示线条的在这打开
    // border-bottom: 2upx solid #f5f5f5;
    box-shadow: 0 0 6upx 0 #ddd;
  }
  &.transparentFixed {
    border-bottom: 0;
    background-color: initial;
    background-image: initial;
    .title,
    .left_info {
      color: #fff;
    }
  }
  //颜色白色
  &.colorWhite {
    .left_info {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
  .left_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  $height: 56upx;
  .left_info {
    // margin-right: 30upx;
    overflow: hidden;

    display: flex;
    align-items: center;
    height: $height;
    transition: all 0.6s;
    padding-left: 20rpx;
    .back {
      padding: 10rpx 20rpx;
      font-size: 32rpx;
      transform: translateX(-20rpx);
      display: flex;
      align-items: center;
      img {
        width: 36rpx;
        height: 30rpx;
      }
      .iconfont {
        font-weight: bold;
        font-size: 32rpx;
      }
    }
  }
  .title {
    text-align: left;
    letter-spacing: 2rpx;
    width: 100%;
    height: 88upx;
    margin-left: 97upx;
    font-weight: bold;
    // padding-left: 54rpx;
    font-size: 36rpx;
    // color: $uni-text-color;
    white-space: nowrap;
    line-height: 88rpx;
    box-sizing: border-box;
    /* #ifndef APP-PLUS||H5 */
    max-width: 55vw;
    /* #endif */
    position: absolute;
    bottom: 0;
    left: 0%;
    color: #000;
    &.noMarginLeft {
      margin-left: 40rpx;
    }
    &.sp {
      max-width: 100vw;
      // padding-right: 50rpx;
      margin-left: 0 !important;
      text-align: center;
    }
  }
}
</style>
