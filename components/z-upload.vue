<template>
  <div class="upload-box" @click="handlerClick">
    <template v-if="!source">
      <img
        class="upload-icon"
        :class="{
          video: type == 'video',
        }"
        :src="getIcons(type == 'image' ? 'icon_image.png' : 'icon_video.png')"
        alt
      />
      <p class="upload-label">{{ label }}</p>
    </template>
    <div class="material" v-if="source">
      <div
        class="material-image"
        v-if="type == 'image'"
        :style="{
        backgroundImage: `url(${source})`,
      }"
      ></div>
      <video
        class="material-video"
        v-if="source && type == 'video'"
        :src="source"
        :controls="false"
        initial-time="0.01"
        muted
        :autoplay="false"
        :show-progress="false"
        :show-play-btn="false"
        :show-center-play-btn="false"
        :enable-progress-gesture="false"
        object-fit="cover"
      ></video>
      <img @click.stop="src = ''" class="close-btn" :src="getIcons('icon_close.png')" alt />
    </div>
  </div>
</template>

<script>
import { doUpload } from '@/service/common'

export default {
  name: 'ZUpload',
  props: {
    type: {
      type: String,
      default: 'image',
    },
    label: {
      type: String,
      default: '添加封面',
    },
    source: {
      type: String,
      default: '',
    },
    needClip: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    src: {
      get() {
        return this.source
      },
      set(v) {
        this.$emit('update:source', v)
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    handlerClick() {
      if (this.source) {
      } else {
        this.chooseMaterial()
      }
    },
    // 选择图片或视频
    chooseMaterial() {
      if (this.type == 'image') {
        this.chooseImage()
        return
      }
      this.chooseVideo()
    },
    // 选择图片
    chooseImage() {
      uni.chooseImage({
        count: 1,
        success: async (res) => {
          const { path, size } = res.tempFiles[0]
          if (size > 1024 * 1024 * 5) {
            this.$toast('图片大小应当小于5M')
            return
          }
          this.handlerUploadFile(path)
        },
        fail: (err) => {
          console.log(err, 'err')
        },
      })
    },

    // 选择视频
    chooseVideo() {
      uni.chooseVideo({
        success: (res) => {
          const { tempFilePath, size } = res
          if (size > 1024 * 1024 * 50) {
            this.$toast('图片大小应当小于50M')
            return
          }
          this.handlerUploadFile(tempFilePath)
        },
        fail: (err) => {
          console.log(err, 'err')
        },
      })
    },

    // 上传素材
    async handlerUploadFile(filePath) {
      const res = await doUpload({
        fileType: this.type,
        filePath,
      })
      if (res.fail) return
      this.src = res.url
      if (this.needClip) {
        this.$emit('clip', res.url)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.upload {
  &-box {
    box-sizing: border-box;
    width: 200rpx;
    height: 200rpx;
    border-radius: 30rpx;
    border: 1px dashed #ababab;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 22rpx;
    font-weight: 400;
    color: #8a8a8a;

    .material {
      position: relative;
      width: 200rpx;
      height: 200rpx;
      border-radius: 30rpx;

      &-image {
        width: 100%;
        height: 100%;
        border-radius: 30rpx;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      &-video {
        width: 100%;
        height: 100%;
        border-radius: 30rpx;
      }

      .close-btn {
        position: absolute;
        width: 40rpx;
        height: 40rpx;
        top: -20rpx;
        right: -20rpx;
        z-index: 9;
      }
    }
  }

  &-icon {
    width: 57rpx;
    height: 57rpx;

    &.video {
      width: 69rpx;
      height: 52rpx;
    }
  }
  &-label {
    padding-top: 15rpx;
  }
}
</style>
