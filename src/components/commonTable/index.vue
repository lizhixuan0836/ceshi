<template>
  <div
    v-if="list"
    class="table-page"
  >
    <el-form
      v-if="conditions&&conditions.length>0"
      ref="search"
      class="search-form"
      :model="searchData"
      inline
    >
      <el-form-item
        v-for="item in conditions"
        :key="item.key"
        :label="item.label"
      >
        <el-input
          v-if="item.type==='input'"
          v-model.trim="searchData[item.key]"
          :style="`width:${item.width?item.width+'px':'100%'}`"
          :placeholder="item.title"
          clearable
          :maxlength="item.maxlength?item.maxlength:255"
          @keyup.enter.native="search"
        />
        <el-select
          v-else-if="item.type==='select'"
          v-model="searchData[item.key]"
          :style="`width:${item.width?item.width+'px':'100%'}`"
          :placeholder="item.title"
          clearable
        >
          <el-option
            v-for="option in item.options"
            :key="option.key"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-date-picker
          v-else-if="item.type==='date'"
          v-model="searchData[item.key]"
          :style="`width:${item.width?item.width+'px':'100%'}`"
          type="date"
          :placeholder="item.title"
          :format="item.format?item.format:'yyyy-MM-dd'"
          :picker-options="item.pickerOptions?item.pickerOptions:defualtPickerOptions"
          :value-format="item.valueFormat?item.valueFormat:'timestamp'"
        />
        <el-date-picker
          v-else-if="item.type==='daterange'||item.type==='datetimerange'"
          v-model="searchData[item.key]"
          :style="`width:${item.width?item.width+'px':'100%'}`"
          :type="item.type"
          :start-placeholder="item.startPlaceholder?item.startPlaceholder:''"
          :end-placeholder="item.endPlaceholder?item.endPlaceholder:''"
          :picker-options="item.pickerRangeOptions?item.pickerRangeOptions:defualtPickerRangeOptions"
          :value-format="item.valueFormat?item.valueFormat:'timestamp'"
        />
      </el-form-item>
      <el-form-item style="margin-bottom:0;display:none;">
        <el-input />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="search"
        >
          查询
        </el-button>
      </el-form-item>

      <el-form-item
        v-if="create"
        class="el-form-item--create"
      >
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="handleCreate">
          创建
        </el-button>
      </el-form-item>
      <el-form-item
        v-for="(item,index) in other.deployButton"
        :key="index"
      >
        <el-button
          :type="item.style||'default'"
          @click="handleOther(item.type)"
        >
          {{ item.name }}
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="list"
      tooltip-effect="dark"
    >
      <column-tree
        v-for="item in columns"
        :key="item.key"
        :column="item"
      />
      <el-table-column
        v-if="edit||remove||other.handleButton"
        label="操作"
        :fixed="operationFixed"
        :width="handleWidth"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-if="edit"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-for="(item,index) in other.handleButton"
            :key="index"
            type="text"
            @click="handleOther(item.type,scope.$index, scope.row)"
          >
            {{ item.name }}
          </el-button>
          <el-button
            v-if="remove"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="paging"
      :current-page.sync="baseParams.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="baseParams.pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="changePageSize"
      @current-change="changePage"
    />
  </div>
</template>

<script>
import { getLSItem, setLSItem } from '@/assets/utils/common/ls.js';
import columnTree from './columnTree.vue';

export default {
  name: 'CommonTable',
  components: { columnTree },
  props: {
    // 接口地址
    api: String,
    // 查询接口类型 默认是 get
    method: {
      type: String,
      default: 'get',
    },
    // 列表数据
    list: Array,
    // 搜索条件配置数组
    conditions: Array,
    // table列对象配置数组
    columns: Array,
    // 非标准化数据特殊处理函数挂在对象（不断完善扩展实现）
    handle: Object,
    // 搜索条件类型 query是把筛选条件参数显示到url中 persistence 是持久化到本地保存 normal 是不处理
    type: {
      validator(value) {
        return ['normal', 'query', 'persistence'].indexOf(value) > -1;
      },
      default: 'normal',
    },
    // 是否分页
    paging: {
      type: Boolean,
      default: true,
    },
    // 是否固定操作列
    operationFixed: String,
    // 是否显示创建按钮 具体功能由父组件实现
    create: {
      type: Boolean,
      default: true,
    },
    // 是否显示编辑按钮 具体功能由父组件实现
    edit: {
      type: Boolean,
      default: true,
    },
    // 是否显示删除按钮 具体功能由父组件实现
    remove: {
      type: Boolean,
      default: true,
    },
    // 分页时 参数是否用params包裹
    isParams: {
      type: Boolean,
      default: false,
    },
    /**
     * 其他操作：
     *  deployButton：顶部功能按钮
     *  handleButton：列表项操作按钮
     */
    other: {
      type: Object,
      default: () => {
        return { deployButton: [], handleButton: [] };
      },
    },
  },
  data() {
    return {
      // 参数如果显示在url上的别名 目前实现只支持 pageNum 和 pageSise
      alias: [['pageNum', 'p'], ['pageSize', 's']],
      loading: false,
      total: 0,
      baseParams: {
        pageNum: 1,
        pageSize: 10,
      },
      searchData: this.initSearch(),
      // 是否首次数据加载完成
      loaded: false,
      defualtPickerOptions: {},
      defualtPickerRangeOptions: {},
    };
  },
  computed: {
    query() {
      return this.type === 'persistence'
        ? getLSItem(`${this.$route.path}_search`)
        : this.$route.query;
    },
    handleWidth() {
      return this.other && this.other.handleButton
        ? (this.other.handleButton || []).length * 75 + 150
        : 160;
    },
  },
  watch: {
    query(val) {
      if (this.isNullObject(val)) {
        this.changeQuery();
      }
    },
  },
  created() {
    // this.initSearch()
    if (this.type !== 'normal') {
      this.initParams();
    }
    this.setPageData();
  },
  methods: {
    // 业务无关方法
    isNullObject(obj) {
      return JSON.stringify(obj) === '{}';
    },
    // 业务无关方法
    setObjAttr(target, from, alias = []) {
      const simplify = {};
      alias.forEach(item => {
        simplify[item[0]] = item[1];
      });
      let value;
      for (const key in from) {
        if ({}.hasOwnProperty.call(from, key)) {
          value = from[key];
          if (value) {
            simplify[key]
              ? (target[simplify[key]] = value)
              : (target[key] = value);
          }
        }
      }
    },
    initSearch() {
      const searchData = {};
      this.conditions.forEach(item => {
        searchData[item.key] = undefined;
      });
      return searchData;
    },
    setQuery(query) {
      if (this.type === 'persistence') {
        setLSItem(`${this.$route.path}_search`, query);
        return;
      }
      this.$router.push({ path: this.$router.path, query });
    },
    changeQuery() {
      const query = {};
      this.setObjAttr(query, this.baseParams, this.alias);
      this.setObjAttr(query, this.searchData, this.alias);
      this.setQuery(query);
    },
    // 根据当前参数查询当前列表
    setPageData() {
      // url中参数pageSize手填保护代码
      if (this.baseParams.pageSize > 100) {
        this.baseParams.pageSize = 100;
      }
      const searchData = JSON.parse(JSON.stringify(this.searchData));

      // 对查询参数的特殊处理方法，由引用此组件的父组件实现并通过prop handle 传递
      if (this.handle && typeof this.handle.filterData === 'function') {
        this.handle.filterData(searchData);
      }

      // 把数组类型的参数转换为字符串
      for (const key in searchData) {
        if (Array.isArray(searchData[key])) {
          searchData[key] = searchData[key].toString();
        }
      }

      // 合并 分页参数和查询条件
      const params = !this.paging
        ? searchData
        : this.isParams
          ? ({ ...this.baseParams, params: searchData })
          : ({ ...this.baseParams, ...searchData });

      let api = this.api;

      // 兼容 post 查询 但分页参数在url上的接口
      if (this.paging && this.handle && this.handle.pagePostUrl) {
        api
          += `?pageNum=${
            this.baseParams.pageNum
          }&pageSize=${
            this.baseParams.pageSize}`;
      }

      this.loading = true;
      this.$api[this.method](api, params, null, true)
        .then(res => {
          // 兼容 json类型的返回值
          if (typeof res === 'string') {
            try {
              res = JSON.parse(res);
            } catch (err) {
              this.$webMessage.warning('json解析失败！');
              res = null;
            }
          }

          if (res) {
            // 对不规范或者非约定的返回值特殊处理方法，由引用此组件的父组件实现并通过prop handle 传递
            if (
              this.handle
              && typeof this.handle.adapterResult === 'function'
            ) {
              this.handle.adapterResult(res);
            }
            // this.$emit('update:list', res.list)
            this.$emit('update:list', [{}]);

            this.total = res.total;
          }
        })
        .finally(() => {
          this.loading = false;
          this.loaded = true;
        });
    },
    updatePageData() {
      if (this.type !== 'normal') {
        this.changeQuery();
      }
      this.setPageData();
    },
    // 搜索按钮调用
    search() {
      this.baseParams.pageNum = 1;
      this.updatePageData();
    },
    // 翻页
    changePage() {
      this.updatePageData();
    },
    // 改变pageSize调用
    changePageSize(pageSize) {
      this.baseParams.pageNum = 1;
      this.baseParams.pageSize = pageSize;
      this.updatePageData();
    },
    // 清除查询条件
    clearForm() {
      for (const key in this.searchData) {
        if ({}.hasOwnProperty.call(this.searchData, key)) {
          this.searchData[key] = undefined;
        }
      }
    },
    // 别名转化判断方法
    hasTrueKey(o, k, r) {
      return r[k];
    },
    // 初始化参数或url
    initParams() {
      if (!this.query || this.isNullObject(this.query)) {
        this.changeQuery();
      } else {
        const restore = {};
        this.alias.forEach(item => {
          restore[item[1]] = item[0];
        });
        for (const key in this.query) {
          if ({}.hasOwnProperty.call(this.query, key)) {
            if (this.hasTrueKey(this.baseParams, key, restore)) {
              this.baseParams[restore[key]] = parseInt(this.query[key], 10) || this.query[key];
            }

            if (this.hasTrueKey(this.searchData, key, restore)) {
              this.searchData[restore[key]] = this.query[key];
            }
          }
        }
      }
    },
    handleCreate() {
      this.$emit('handleCreate');
    },
    handleEdit(index, row) {
      this.$emit('handleEdit', index, row);
    },
    handleDelete(index, row) {
      this.$messageBox
        .confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'delete-confirm',
        })
        .then(() => {
          this.$emit('handleDelete', index, row);
        })
        .catch(() => {
          this.$webMessage.info('已取消删除');
        });
    },
    handleOther(type, index, row) {
      this.$emit('handleOther', type, index, row);
    },
  },
};
</script>

<style lang="scss" scope>
.el-message-box.delete-confirm {
  vertical-align: top;
}
.table-page {
  position: relative;
  .el-button--mini {
    padding: 7px 15px;
    line-height: 1;
  }
  .el-pagination {
    float: right;
    margin: 24px 0;
  }
  .el-form-item {
    margin-right: 10px;
    .el-form-item__label {
      margin-right: 10px;
    }
  }

  .el-table__body-wrapper {
    overflow-x: auto;
  }
}
</style>
