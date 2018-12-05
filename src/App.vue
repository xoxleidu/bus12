<template>
  <div id="app" > <!--导航条-->
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="1">
        <router-link to="/busjiankong">车辆监控</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/linejiankong">线路监控</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/guiji">轨迹回放</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/xianluyanshi">线路演示</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/xianluedit">线路管理</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link to="/driverlist">驾驶员管理</router-link>
      </el-menu-item>
      <el-menu-item index="7">
        <router-link to="/buslist">车辆管理</router-link>
      </el-menu-item>
      <!--<el-submenu index="8">-->
        <!--<template slot="title">我的工作台</template>-->
      <!--</el-submenu>-->
      <el-menu-item index="9"><a href="http://localhost:8080/buscenter/swagger-ui.html#/" target="_blank">接口文档</a></el-menu-item>
    </el-menu>
    <br>
    <router-view class="mainX" v-bind:style="{height: myHeight}"></router-view>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        myHeight: (window.innerHeight - 100) + 'px'
      }
    }
  }
</script>
<style>
  body{
    font-family: "Microsoft YaHei";
  }
  #app {
    position: relative;
  }

  .mainX {
    position: relative;
  }

  a {
    text-decoration: none;
  }
</style>

