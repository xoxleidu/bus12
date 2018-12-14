<template>
  <div id="app" > <!--导航条-->
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#1f2d3d" text-color="#fff"
             active-text-color="#00a2ff" router>
      <el-menu-item index="/">
        <img src="../static/logo.png"/>
      </el-menu-item>

        <el-menu-item index="/" class="el-menu-item-demo">
          <i class="fa fa-video-camera" aria-hidden="true"></i>
          <span>车辆监控</span>
        </el-menu-item>




      <el-menu-item index="/linejiankong" class="el-menu-item-demo">
        <i class="fa fa-exchange" aria-hidden="true"></i>

        <span>线路监控</span>
      </el-menu-item>
      <el-menu-item index="/guiji" class="el-menu-item-demo">
        <i class="fa fa-play-circle" aria-hidden="true"></i>
        <span>轨迹回放</span>
      </el-menu-item>
      <el-menu-item index="/xianluyanshi" class="el-menu-item-demo">
        <i class="fa fa-random"></i>
        <span>线路演示</span>
      </el-menu-item>
      <el-menu-item index="/xianluedit" class="el-menu-item-demo">
        <i class="fa fa-align-justify" aria-hidden="true"></i>
        <span>线路管理</span>
      </el-menu-item>
      <el-menu-item index="/driverlist" class="el-menu-item-demo">
        <i class="fa fa-address-card" aria-hidden="true"></i>
        <span>驾驶员管理</span>
      </el-menu-item>
      <el-menu-item index="/buslist" class="el-menu-item-demo">
        <i class="fa fa-bus"></i>
        <span>车辆管理</span>
      </el-menu-item>
      <el-menu-item index="/test" class="el-menu-item-demo">
        <i class="fa fa-bus"></i>
        <span>测试页面</span>
      </el-menu-item>
      <!--<el-submenu index="8">-->
        <!--<template slot="title">我的工作台</template>-->
      <!--</el-submenu>-->
      <!--<el-menu-item class="el-menu-item-demo" index="/"><a href="http://www.baidu.com" target="_blank">接口文档</a></el-menu-item>-->
    </el-menu>

    <router-view class="mainX" v-bind:style="{height: myHeight}"></router-view>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        myHeight: (window.innerHeight - 90) + 'px'
      }
    }
  }
</script>
<style lang="less">
  @import url("../static/font-awesome-4.7.0/less/font-awesome.less");
  body{
    font-family: "Microsoft YaHei";
  }
  #app {
    position: relative;
  }

  .mainX {
    position: relative;
    margin-top: 10px;
  }

  a {
    text-decoration: none;
  }

  .el-menu-item-demo i{
    color: #FFFFFF
  }
  .is-active i {
    color: #00a2ff
  }
  .el-menu-item-demo:hover {
    background-color: #00a2ff !important;
    color: #FFF !important;
  }
  .fa {
    color: #f2f6fc;
  }
</style>

