<template>
  <el-scrollbar style="height: 100%; width: 100%" class="common-tree">
    <el-tree
      ref="tree"
      :data="data"
      :node-key="nodeKey"
      :render-after-expand="renderAfterExpand"
      :default-expand-all="defaultDxpandAll"
      :default-expanded-keys="defaultExpandedKeys"
      :current-node-key="currentNodeKey"
      :props="defaultProps"
      :expand-on-click-node="expandOnClickNode"
      :highlight-current="true"
      @node-click="handleNodeClick"
      @node-contextmenu="handleNodeContextmenu"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse"
      :filter-node-method="filterNode"
    ></el-tree>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'conmon-tree',
  props: {
    // 树数据
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 唯一标示
    nodeKey: {
      type: String,
      default: '',
    },
    // 是否在第一次展开某个树节点后才渲染其子节点
    renderAfterExpand: {
      type: Boolean,
      default: false,
    },
    // 是否默认展开所有节点
    defaultDxpandAll: {
      type: Boolean,
      default: true,
    },
    // 默认展开的节点的 key 的数组
    defaultExpandedKeys: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 当前选中的节点
    currentNodeKey: {
      type: String,
      default: '',
    },
    // 配置选项
    defaultProps: {
      type: Object,
      default() {
        return {};
      },
    },
    // 是否在点击节点的时候展开或者收缩节点
    expandOnClickNode: {
      type: Boolean,
      default: true,
    },
    // 对树节点进行筛选时执行的方法
    filterNode: {
      type: Function,
    },
  },
  data() {
    return {
      dbAttr: {},
    };
  },
  methods: {
    //   data  节点数据对象
    //   node  节点树结构
    //   tree  整体树结构
    // 节点被点击时的回调
    handleNodeClick(data, node, tree) {
      this.$emit('handleNodeClick', data, node, tree);

      if (!this.nodeKey) return;

      if (this.dbAttr.lastSelectedNodeId) {
        const time = new Date().getTime();
        const t = time - this.dbAttr.lastSelectTime;

        if (this.dbAttr.lastSelectedNodeId === data[this.nodeKey] && t < 500) {
          this.handleNodeDblclick(data, node, tree);
        }
      }

      this.dbAttr = {
        lastSelectedNodeId: data[this.nodeKey],
        lastSelectTime: new Date().getTime(),
      };
    },
    // 双击事件
    handleNodeDblclick(data, node, tree) {
      this.$emit('handleNodeDblclick', data, node, tree);
    },
    // 当某一节点被鼠标右键点击时会触发该事件
    handleNodeContextmenu(event, data, node, tree) {
      this.$emit('handleNodeContextmenu', event, data, node, tree);
    },
    // 节点被展开时触发的事件
    handleNodeExpand(data, node, tree) {
      this.$emit('handleNodeExpand', data, node, tree);
    },
    // 节点被关闭时触发的事件
    handleNodeCollapse(data, node, tree) {
      this.$emit('handleNodeExpand', data, node, tree);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
