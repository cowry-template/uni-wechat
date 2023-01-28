<template>
  <div class="page bgCover">
    <z-nav :back="back" :bg-color="'transparent'"></z-nav>
    <div>index page</div>

    <ZEmpty />
  </div>
</template>

<script>
import ZNav from '@/components/z-nav.vue'
import ZEmpty from '@/components/z-empty.vue'

export default {
  name: 'Index',
  components: {
    ZNav,
    ZEmpty,
  },
  data() {
    return {
      back: false,
      agree: true,

      loginStatus: 'pending', // pending login logout
    }
  },
  methods: {},
  onShow() {},
}
</script>

<style lang="scss" scoped>
.page {
  box-sizing: border-box;
  height: 100vh;
}
</style>
