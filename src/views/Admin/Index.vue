/*
 * 后台管理页面
 */
<template>
  <div class="admin-home">
    <!-- <div class="header">
      <data-dev-header></data-dev-header>
    </div> -->
    <div class="main">
      <div class="aside">
        <admin-aside :menu="menu"></admin-aside>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import DataDevHeader from '@/components/Header';
import AdminAside from '@/views/Admin/components/AdminAside';

export default {
  name: 'datadev-admin',
  components: { AdminAside },
  data() {
    return {
      menu: [
        {
          label: '节点管理',
          value: 'NodeManager',
        },
        {
          label: '参数管理',
          value: 'ParamManager',
        },
        {
          label: '函数管理',
          value: 'FunManager',
        },
        {
          label: '关键字管理',
          value: 'KeywordManager',
        },
        {
          label: '编辑器管理',
          value: 'EditorManager',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

.admin-home {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .header {
    height: 70px;
  }
  .main {
    flex: 1;
    display: flex;
    align-items: stretch;
    .aside {
    }
    .content {
      flex: 1;
      background: $subBgColor;
    }
  }
}
</style>
