/*
 * 工作区管理树
 */
<template>
  <div class="workspace-tree">
    <TreeCase></TreeCase>
  </div>
</template>

<script>
import TreeCase from '@/views/Case/TreeCase';

export default {
  name: 'workspace-tree',
  components: {
    TreeCase,
  },
};
</script>

<style lang="scss" scoped>

.workspace-tree {
  height: 100%;
}
</style>
