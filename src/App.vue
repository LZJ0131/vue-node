<template>
  <div id="app" class="clearfix">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.clearfix::after{
  display: block;
  content:'';
  overflow: hidden;
  clear: both;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #2c3e50;
}

*{
  box-sizing: border-box;
  font-family:"PingFang SC",Helvetica,"Helvetica Neue","Microsoft YaHei","SimSun",Tahoma,Arial,sans-serif;
}
html,body{
  padding: 0;
  margin: 0;
}
ul,li{
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
