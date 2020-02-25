/*
 * 用户端-侧边栏
 * 包括侧边条和树
 */
<template>
  <div class="admin-aside">
    <div class="bar">
      <el-menu
        :collapse="isCollapse"
        :default-active="activeTree"
        class="menu"
        background-color="#1F2944"
        active-text-color="#1890FF"
        @select="handleSelect"
        collapse-transition
      >
        <el-menu-item
          calss="item"
          :class="{active: (activeTree === item.value)}"
          :index="item.value"
          v-for="item in menu"
          :key="item.value"
        >
          <img class="img" :src="activeTree === item.value ? item.imgUrlActive : item.imgUrl" />
          <span slot="title" class="label">{{item.label}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="info" v-show="isShow">
      <component :is="activeTree"></component>
    </div>
  </div>
</template>

<script>
import FileTree from '@/views/Client/TreeBox/FileTree';
import DataTree from '@/views/Client/TreeBox/DataTree';
import FunctionTree from '@/views/Client/TreeBox/FunctionTree';
import WorkspaceTree from '@/views/Client/TreeBox/WorkspaceTree';

export default {
  name: 'admin-aside',
  components: {
    FileTree,
    DataTree,
    FunctionTree,
    WorkspaceTree,
  },
  created() {
    this.getImage();
  },
  data() {
    return {
      activeTree: '',
      isShow: false,
      isCollapse: true,
      menu: [
        {
          label: '工作区',
          value: 'WorkspaceTree',
        },
        {
          label: '数据管理',
          value: 'DataTree',
        },
        {
          label: '函数管理',
          value: 'FunctionTree',
        },
        {
          label: '文件管理',
          value: 'FileTree',
        },
      ],
    };
  },
  methods: {
    /**
     * 侧边栏点击处理
    */
    handleSelect(val) {
      if (this.activeTree === val) {
        this.isShow = !this.isShow;
      } else {
        this.activeTree = val;
        this.isShow = true;
      }
      console.log(this.isShow);
    },
    /**
     * 获取图片
     * ui只能提供两种颜色的png，无法提供svg
     * 所以采用切换图片方式来切换颜色
    */
    getImage() {
      this.menu.forEach((item) => {
        // eslint-disable-next-line global-require ,no-param-reassign ,import/no-dynamic-require
        item.imgUrl = require(`@/assets/images/img/${item.value}.png`);
        // eslint-disable-next-line global-require ,no-param-reassign ,import/no-dynamic-require
        item.imgUrlActive = require(`@/assets/images/img/${item.value}1.png`);
      });
    },
  },
};
</script>

<style lang="scss" scoped>

.admin-aside {
  display: flex;
  height: 100%;
  background: $mainBgColor;
  .bar {
    z-index: 999;
    .menu {
      width: 60px;
      border-right: 0px;
      .el-menu-item {
        border-left: 3px solid $mainBgColor;
        outline: none;
      }
      .active {
        background: $subBgColor !important;
        border-left: 3px solid $blueColor;
      }
      .img {
        height: 20px;
      }
    }
  }
  .info {
    z-index: 999;
    width: 270px;
    background: $subBgColor;
  }
}
</style>
