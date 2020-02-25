<template>
  <common-table
    ref="commonTable"
    type="persistence"
    api="/ops/clusterMetaDb/listClusterMetaDb"
    :list.sync="list"
    method="post"
    :isParams="true"
    :conditions="conditions"
    :columns="columns"
    :handle="handle"
    :create="false"
    :remove="false"
    :other="other"
    @handleEdit="handleEdit"
    @handleOther="handleOther"
  ></common-table>
</template>

<script>
import commonTable from '@/components/commonTable';

export default {
  data() {
    return {
      list: [],
      handle: {},
      workflowTypes: [],
      columns: [
        {
          label: '序号',
          prop: 'id',
        },
        {
          label: '参数名',
          prop: 'name',
        },
        {
          label: '更新时间',
          prop: 'updateTime',
          type: 'time',
        },
      ],
      other: {
        deployButton: [
          {
            type: 'seniorSearch',
            name: '高级搜索',
          },
        ],
        handleButton: [
          {
            name: '停用',
            type: 'stop',
          },
        ],
      },
    };
  },
  computed: {
    conditions() {
      return [
        {
          type: 'input',
          title: '名称',
          label: '名称',
          key: 'name',
        },
        {
          type: 'select',
          title: '类型',
          label: '类型',
          key: 'type',
          options: this.workflowTypes.map(item => ({
            key: item.id,
            label: item.dictCode,
            value: item.dictCode,
          })),
        },
        {
          type: 'datetimerange',
          title: '创建时间',
          label: '创建时间',
          key: 'operateDate',
          startPlaceholder: '创建开始时间',
          endPlaceholder: '创建结束时间',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
        },
      ];
    },
  },
  async created() {
    const res = await this.$api.post(
      '/ops/getMgrDictByPCode',
      { pDictCode: 'duty_type' },
      null,
    );
    if (res) this.workflowTypes = res;

    setTimeout(() => {
      this.list = [
        { id: 1, name: '参数1', updateTime: 1582424637000 },
        { id: 2, name: '参数2', updateTime: 1582424637000 },
      ];
    }, 3000);
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleOther(type, index, row) {
      switch (type) {
        case 'viewDAG':
          console.log(type, index, row);
          break;

        default:
          break;
      }
    },
  },
  components: {
    commonTable,
  },
};
</script>
<style lang="scss">
.workflow-list {
  position: relative;
  background-color: #fff;
  height: calc(100vh - 66px);
  .el-table__body-wrapper {
    overflow-x: auto;
  }
}
</style>
