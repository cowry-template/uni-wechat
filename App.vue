<script>
export default {
  onLaunch: async function () {
    // await this.$store.dispatch("onLaunch");
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
/*每个页面公共css */

@import './style/base';
@import './style/helper';

::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
