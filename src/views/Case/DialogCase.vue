<template>
  <commin-dialog
    dialogClass="new-dialog"
    ref="commonDialog"
    @closeCallback="closeCallback"
    @openCallback="openCallback"
    titleName="测试弹窗"
  >
    <div slot="dialogContent">
      内容
    </div>
    <div slot="dialogFooter">
      <div slot="footer">
        <el-button type="primary" @click="confirm">提交</el-button>
      </div>
    </div>
  </commin-dialog>
</template>

<script>
import commonDialog from '@/components/commonDialog';

export default {
  components: {
    commonDialog,
  },
  methods: {
    openCallback() {
      this.$refs.comminDialog.showDialog = true;
    },

    closeCallback() {
      this.isShowHigh = false;
    },
    confirm() {},
  },
  created() {
    this.$nextTick(() => {
      this.openCallback();
    });
  },
};
</script>

<style>
</style>
