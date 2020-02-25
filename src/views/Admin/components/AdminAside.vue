/**
* 登录页面侧边栏
*/
<template>
  <div class="admin-aside" :style="{width: (isCollapse)? '60px' : '130px'}">
    <el-collapse-transition>
      <el-menu
        :collapse="isCollapse"
        :default-active="activeItem"
        class="menu"
        @select="handleSelect"
        collapse-transition
      >
        <el-menu-item
          calss="item"
          :class="{active: (activeItem === item.value)}"
          :index="item.value"
          v-for="item in menu"
          :key="item.value"
        >
          <img class="img" :src="activeItem === item.value ? item.imgUrlActive : item.imgUrl" />
          <span slot="title" class="label">{{item.label}}</span>
        </el-menu-item>
      </el-menu>
    </el-collapse-transition>
    <div class="collapse" @click="() => {isCollapse = !isCollapse}">
      <i class="icon el-icon-s-unfold" v-if="isCollapse"></i>
      <i class="icon el-icon-s-fold" v-else></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin-aside',
  components: {},
  props: ['menu'],
  created() {
    this.getImage();
    this.getActiveItem();
  },
  data() {
    return {
      activeItem: 'NodeManager',
      isCollapse: false,
    };
  },
  methods: {
    // 侧边栏选择
    handleSelect(val) {
      if (this.activeItem !== val) {
        this.$router.push({ name: val });
      }
      this.activeItem = val;
    },
    // 根据路由获取当前活动项
    getActiveItem() {
      const routeName = this.$route.name;
      this.menu.forEach((item) => {
        if (item.value === routeName) this.activeItem = routeName;
      });
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
  position: relative;
  height: 100%;
  background: $mainBgColor;
  .box {
    width: 130px;
  }
  .menu {
    border-right: 0px;
    .item {
      border-left: 3px solid $mainBgColor;
    }
    .active {
      background: $subBgColor;
      border-left: 3px solid $blueColor;
    }
    .img {
      height: 20px;
    }
  }
  .max {
    width: 130px;
  }
  .collapse {
    border-top: 1px solid rgba($textColor, 0.1);
    position: absolute;
    width: 100%;
    height: 40px;
    padding-left: 20px;
    bottom: 0px;
    .icon {
      margin: 10px 0;
    }
  }
}
</style>
