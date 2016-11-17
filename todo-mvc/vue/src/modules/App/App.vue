<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
import store from '../../vuex/store'

export default {
  store
}
</script>

<style lang="less">
@import '../../styles/reset.less';
@import '../../styles/app.less';
@import '../../node_modules/todomvc-app-css/index.css';
</style>
