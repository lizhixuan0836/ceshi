<template>
  <div class="workspace position-all">
    <el-tabs type="card" class="dataDev-tab">
      <el-tab-pane label="  首  页  " name="home">
        <home></home>
      </el-tab-pane>
      <el-tab-pane label="  首  页  2  " name="home2" :closable="true" @edit="handleTabsEdit">
        <home></home>
      </el-tab-pane>
      <el-tab-pane
        :key="item.name"
        v-for="item in tabList"
        :label="item.title"
        :name="item.name"
      >{{item.content}}</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Home from '@/views/Client/Workspace/components/Home';

export default {
  name: 'workspace',
  components: {
    Home,
  },
  data() {
    return {
      tabList: [],
    };
  },
  methods: {
    handleTabsEdit(targetName, action) {
      console.log(targetName, action);
    },
  },
};
</script>
<style lang="scss">
.dataDev-tab {
  height: 100%;
  .el-tabs__header {
    border: 0px !important;
    .el-tabs__nav-wrap {
      background: $BgColor3;
      border: 0px;
      div {
        border: 0px !important;
        color: #999;
      }
      .el-tabs__item:hover {
      }
      .is-active {
        background: $deepBgColor !important;
        color: $textColor;
      }
    }
  }
  .el-tabs__content {
    height: 100%;
    margin-top: -55px;
    padding-top: 55px;
  }
}
</style>
<style lang="scss" scoped>

.workspace {
}
</style>
