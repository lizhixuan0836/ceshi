/*
 * 树Tree使用案例
 */
<template>
  <commonTree
    ref="commonTree"
    :data="data"
    nodeKey="id"
    :filterNode="filterNode"
    @handleNodeDblclick="handleNodeDblclick"
  ></commonTree>
</template>

<script>
import commonTree from '@/components/commonTree';

export default {
  name: 'data-tree',
  data() {
    return {
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1',
            },
            {
              id: 6,
              label: '二级 2-2',
            },
          ],
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
            },
            {
              id: 8,
              label: '二级 3-2',
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleNodeDblclick(data, node, tree) {
      console.log(data, node, tree);
      console.log(data, 'data');
      console.log(node, 'node');
    },
    filterNode(value, element) {
      console.log(value, element);
      return element.id < 3;
    },
  },
  created() {
    setTimeout(() => {
      this.$refs.commonTree.$refs.tree.filter();
    }, 10000);
  },
  components: {
    commonTree,
  },
};
</script>

<style lang="scss" scoped>
</style>
