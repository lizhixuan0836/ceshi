/*
 * 工作区主页
 */
<template>
  <div class="workspace flex flex-column">
    <!-- <data-dev-header></data-dev-header> -->
    <div class="main flex flex-item">
      <div class="aside">
        <data-dev-aside></data-dev-aside>
      </div>
      <div class="content flex-item">
        <workspace></workspace>
      </div>
    </div>
  </div>
</template>

<script>
// import DataDevHeader from '@/components/Header';
import DataDevAside from '@/views/Client/components/Aside';
import Workspace from '@/views/Client/Workspace/Index';

export default {
  name: 'datadev-client',
  components: { DataDevAside, Workspace },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>

.workspace {
  height: 100%;
  width: 100%;
  .main {
    .aside {
    }
    .content {
      position: relative;
      background: $deepBgColor;
    }
  }
}
</style>
