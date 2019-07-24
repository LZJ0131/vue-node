<template>
  <div class="news">
      <div class="right_menu">
        <topmenu activeIndex="3"></topmenu>
        <div class="right_menu-newsbox">
          <ul class="news_box clearfix">
            <li>
              <img>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import topmenu from "../components/TopMenu";
export default {
  name:'news',
  components: {
    topmenu: topmenu
  },
}
</script>

<style>
.right_menu-newsbox{
  width: 100%;
  background: #ffffff;
  padding: 20px;
}
.news_box{
  width: 100%;
}
.news_box>li{
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
}
.news_box>li img{
  height: 70px;
  width: 200px;
}
</style>
