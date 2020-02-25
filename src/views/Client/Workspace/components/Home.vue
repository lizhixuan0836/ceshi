<template>
  <div class="home">
    <TableCase></TableCase>
  </div>
</template>

<script>
import TableCase from '@/views/Case/TableCase';

export default {
  name: 'home',
  data() {
    return {
      tabList: [],
    };
  },
  components: {
    TableCase,
  },
};
</script>

<style lang="scss" scoped>

.home {
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
