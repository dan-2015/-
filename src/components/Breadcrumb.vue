<template>
  <div>
    <span v-for="(item, index) of $route.matched" :key="index">
      {{ item.meta.breadcrumb }}
      <span v-if="index < $route.matched.length - 1">-></span>
    </span>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route);
    console.log(this.$route.matched);
  },
};
</script>

<style lang="less" scoped>
</style>