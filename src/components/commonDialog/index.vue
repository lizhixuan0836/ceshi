
<template>
  <el-dialog
    :title="titleName"
    :class="dialogClass"
    :width="width"
    :fullscreen="fullscreen"
    :append-to-body="appendToBody"
    :destroy-on-close="destroyOnClose"
    ref="dialog"
    :visible.sync="showDialog"
    :close-on-click-modal="false"
    @open="openCallback"
    @close="closeCallback"
  >
  <div slot="title" class="dialog-title-default">
    <slot name="dialogTitle">{{titleName}}</slot>
  </div>
  <slot name="dialogContent"></slot>
  <div slot="footer">
    <slot name="dialogFooter"></slot>
  </div>
  </el-dialog>
</template>

<style lang="scss">

</style>

<script>

export default {
  name: 'common-dialog',
  props: {
    // Dialog 的标题
    titleName: String,
    // 弹窗class类名
    dialogClass: String,
    // 弹窗的宽度
    width: String,
    // 是否为全屏 Dialog
    fullscreen: {
      type: Boolean,
      default: false,
    },
    // 嵌套弹窗
    appendToBody: {
      type: Boolean,
      default: false,
    },
    // 关闭时销毁 Dialog 中的元素
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {},
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    // 打开弹窗回调
    openCallback() {
      this.$emit('openCallback');
    },

    // 关闭弹窗回调
    closeCallback() {
      this.$emit('closeCallback');
    },
  },
  created() {},
  mounted() {},
  components: {},
};
</script>
