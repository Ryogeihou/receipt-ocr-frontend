<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Service</el-breadcrumb-item>
      <el-breadcrumb-item>Recongnition</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
    margin-bottom: 18px;
}
</style>