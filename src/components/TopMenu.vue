<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">用户管理中心</el-menu-item>
    <el-menu-item index="2">我的工作台</el-menu-item>
    <el-menu-item index="3">消息中心</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "TopMenu",
  data() {
    return {

  };
  },
  props:{
    activeIndex:String
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-menu-demo{
  margin-bottom: 20px;
  padding: 0 20px;
}
</style>
