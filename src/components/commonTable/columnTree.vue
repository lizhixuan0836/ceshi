<template>
  <el-table-column
    v-if="hasChild"
    :label="column.label"
    :fixed="column.fixed"
    :width="column.width?column.width:'auto'"
    show-overflow-tooltip
  >
    <column-tree v-for="item in column.children" :key="item.key" :column="item" />
  </el-table-column>
  <el-table-column
    v-else
    :type="column.type"
    :label="column.label"
    :fixed="column.fixed"
    :width="column.width?column.width:'auto'"
    :prop="column.prop"
    :formatter="column.formatter?column.formatter:formatter"
    show-overflow-tooltip
  />
</template>

<script>
export default {
  name: 'ColumnTree',
  props: {
    column: Object,
  },
  computed: {
    hasChild() {
      return this.column.children && this.column.children.length;
    },
  },
  methods: {
    formatter(row) {
      const type = this.column.type;
      switch (type) {
        case 'time':
          return row[this.column.prop]
            ? this.$getTimeString(row[this.column.prop], true)
            : '';
        default:
          return row[this.column.prop];
      }
    },
  },
};
</script>
