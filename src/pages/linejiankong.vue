<template>
  <el-container>

    <el-container>
      <el-aside width="200px" style="background-color:#1f2d3d;">

        <el-row v-for="line in treelist"  :key="line.id" class="line-list">



          <div class="tree-node">
            <h2 @click="(e)=>{treeToggle(e,line)}">
              <span class="el-tree-node__expand-icon"></span>
              <!--<input type="checkbox" @click.stop="" @change="(e)=>{treeLineCheck(e,line)}">-->
              {{line.lineName}}

              <!--<i class="el-icon-fa-level-down"></i> {{line.children.filter((car)=>{return car.UpDown==1}).length}}-->
              <!--/-->
              <!--<i class="el-icon-fa-level-up"></i> {{line.children.filter((car)=>{return car.UpDown!=1}).length}}-->
              <!--<span class="badge"></span>-->
            </h2>
            <!--<div class="children" v-if="line.id">-->
            <!--<div class="tree-node" v-for="car,index in line.busList"   :id="'id'+car.lineId" :key="index">-->
            <!--<h2>-->
            <!--<span @click="(e)=> {treeToggle(e)}"  class="el-tree-node__expand-icon"></span>-->
            <!--<input type="checkbox" @change="(e)=>{treeCheck(e,car)}" @click.stop="" />-->
            <!--<i :class="(car.upDown==1?'el-icon-fa-level-down ':'el-icon-fa-level-up ') + 'updown'"></i>-->
            <!--<i class="el-icon-fa-bus"></i>-->
            <!--冀R{{car.vehicleNumber}}  {{car.speed}}km/h-->
            <!--</h2>-->
            <!--<div class="children video-list">-->
            <!--&lt;!&ndash;<h3 v-for="i in 8"><input type="checkbox" @change.navtive="(e)=>{viedeoCheck(e,car,i)}" />&ndash;&gt;-->
            <!--&lt;!&ndash;<i class="el-icon-fa-video-camera"></i> 摄像头{{i}}&ndash;&gt;-->
            <!--&lt;!&ndash;</h3>&ndash;&gt;-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
          </div>

        </el-row>


      </el-aside>
      <el-main>

        <!--<div class="container">-->

        <!--<ul class="time-horizontal" >-->
        <!--<li v-for="car,index in treebuslist.upSiteList"   :id="'id'+car.id" :key="index"><b></b>{{car.siteName}}</li>-->

        <!--</ul>-->
        <!--</div>-->



        <el-row :gutter="20">
          <el-col :span="12">


            <el-row class="buslistrow" v-if="treebuslist.upSiteList!=null">
              <el-row class="buslistrowbt">
                <el-col :span="3"><span class="buslistrowbt_span">{{treebuslist.lineName}} 上行</span></el-col>
                <!--<el-col :span="2"><el-button type="success">刷新</el-button></el-col>-->
              </el-row>

              <!--<div class='weui-cell-list-heng' v-for="car,index in treebuslist.upSiteList"   :id="'id'+car.id" :key="index">-->
              <div class='weui-cell-list' v-for="car,index in treebuslist.upSiteList"   :id="'id'+car.id" :key="index">

                <div class='weui-cell-circle'></div>
                <!--<div class='weui-cell-line-heng' style="width: 100%;">-->
                <div class='weui-cell-line' style="width: 100%;">

                  <!--<div class="weui-cell-name-heng">{{car.siteName}}</div>-->
                  <div class="weui-cell-name">{{car.siteName}}</div>


                  <div v-if="car.busList != null">

                    <div v-for="gps,index in car.busList" :key="index">


                      <div v-if="gps.stationState == 1">
                        <div class='weui-cell-event'><img src='../../static/buscome.png' class='buscomegoimg' /></div>
                      </div>
                      <div v-if="gps.stationState == 0">
                        <div class='weui-cell-event-on'><img src='../../static/busgo.png' class='buscomegoimg' /></div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </el-row>


          </el-col>
          <el-col :span="12">


            <el-row class="buslistrow" v-if="treebuslist.downSiteList!=null">
              <el-row class="buslistrowbt">
                <el-col :span="3"><span class="buslistrowbt_span">{{treebuslist.lineName}} 下行</span></el-col>
                <!--<el-col :span="2"><el-button type="success">刷新</el-button></el-col>-->
              </el-row>

              <div v-for="car,index in treebuslist.downSiteList"   :id="'id'+car.id" :key="index">
                <div class='weui-cell-list'>
                  <div class='weui-cell-circle'></div>
                  <div class='weui-cell-line' style="width: 100%;">

                    <div class="weui-cell-name">{{car.siteName}}</div>


                    <div v-if="car.busList != null">

                      <div v-for="gps,index in car.busList" :key="index">
                        <div v-if="gps.stationState = 0">
                          <div class='weui-cell-event-heng'><img src='../../static/buscome.png' class='buscomegoimg' /></div>
                        </div>
                        <div v-if="gps.stationState = 1">
                          <div class='weui-cell-event-on'><img src='../../static/busgo.png' class='buscomegoimg' /> </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </el-row>


          </el-col>
        </el-row>






      </el-main>
    </el-container>
    <div class="me-footer"></div>
  </el-container>

</template>
<script>


  import { getBusLineList,getBusList,getBusGPS } from '@/api/table'

  import $ from 'jQuery'

  export default {

    data () {
      return {
        busList:[
          {a:2},
        ],
        reqList:[],
        busLineName:null,
        AMapUI: null,
        AMap: null,
        MapKey: '',
        MapCityName: '',

        //treeList[0].busList.push(busList[0])

        treelist:[{
          "lineName": "加载中"
        }],
        treebuslist:[{
          "lineName": "离线"}],
        treebus: {
          label: 'lineName',
          children: 'vehicleNumber',
          isLeaf: false
        },
        GPSlist:'',
        treeCount: 1,
        timer:null,
        sendLineName:[]
      }
    },
    beforeDestroy(){
      clearInterval(this.timer);
      //alert(1)
    },
    // actived(){
    //   alert(1)
    // },

    mounted(){

      //alert(this.$route.query.sendLineName)

      //this.sendLineName = this.$route.query.sendLineName

      if(this.$route.query.sendLineName){

        this.$set(this.$data.sendLineName,"runMethod",this.$route.query.sendLineName);

        if(this.sendLineName.runMethod){
          getBusLineList().then(response => {
            if(response.code === '000') {

              this.treelist = response.result
            }

            //this.listLoading = false

          })
          this.oneInitReq(this.sendLineName)
        }


      }



      //alert(this.sendLineName)

      //console.log(1231);
      //this.loadmap();     //加载地图和相关组件

      getBusLineList().then(response => {
        if(response.code === '000') {

          this.treelist = response.result
        }

        //this.listLoading = false

      })

      // getBusGPS().then(response => {
      //
      //   if(response.code === '000') {
      //
      //     this.GPSlist = response.result
      //   }
      // })


    },
    methods: {
      initReq(line){

        clearInterval(this.timer);

        this.timer=setInterval(()=>{
          getBusGPS(line.runMethod).then(response => {
            console.log(response.result)
            if (response.code === '000') {

              this.$set(this.$data,"treebuslist",response.result);
              //this.treebuslist=response.result;
              //debugger;
            }
          })
        },3000)


      },

      oneInitReq(line){

        clearInterval(this.timer);
        getBusGPS(line.runMethod).then(response => {
          console.log(response.result)
          if (response.code === '000') {
            this.$set(this.$data,"treebuslist",response.result);
            //this.treebuslist=response.result;
            this.initReq(line)
          }
        })
      },


      treeToggle(e,line){
        console.log(line)

        this.$set(this.$data.sendLineName,"runMethod",null);
        this.oneInitReq(line)



        $(e.target).closest(".tree-node").toggleClass("active");
        var reslult = $(e.target).closest(".tree-node").hasClass("active");
        if(data){
          this.$set(data,"show",true);
        }
        return reslult;
      },



      // 搜索
      busLineSearch: function (event) {
        this.treeToggle(this.busLineName)
      },

      //地图

    }
  }
</script>
<style lang="less">
  .buslistrow{
    background-color: #FFF;
  }
  .buslistrowbt{
    color: #1f2d3d;
    background-color: #dedede;
    height: 50px;
    line-height: 50px;
    margin-bottom: 20px;
  }

  .line {
    font-weight: bold;
  }
  .clearBoth {
    clear: both;
  }
  .el-main {
    background-color: #f5f3f0;
    color: #333;
    text-align: center;
    padding:0px;
    margin: 0px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .searchBanner {
    color: #000;
    font-weight: bold;
  }
  .grid-content span {
    float: left;
    margin: auto 5px;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .line-list{

    text-align: left;
    padding-left: 10px;
    .children .tree-node{

      h2{ color:#00fff0;}
    }
  }
  .tree-node{ height:30px; overflow:hidden; color:#aaa; border-top:1px solid #162433;
    .badge{ background:; color:#fff;position:absolute; right:5px;top:4px; border-radius:100%; width:20px; height:20px; line-height:20px; text-align:center; font-size:12px;}
    h2{ font-weight:normal;font-size:14px; margin:0; height:30px; line-height:30px; cursor:pointer;position:relative;
      input[type=checkbox]{vertical-align:-.15em;}
    }
    h2:hover,h2.selected{ background:#293c51; color:#FFF !important;}
    h2,h3{padding:0;margin:0;}
    .video-list{
      h3{ font-weight:normal; padding-left:34px; height:30px; line-height: 30px; font-size:12px; border-top:1px dotted #162433;}
    }

    .children{display:none; background:rgba(0,149,255,.1);
      .tree-node{
        h2{padding-left: 1em; font-size:13px;}
      }
    }
    .el-tree-node__expand-icon{ transition:all .2s;}
    &.active{height:auto;
      .children{ display:block;}
      &>h2>.el-tree-node__expand-icon{transform:rotate(90deg);}
    }
  }
  .weui-cell-list{
    width: 80%;

    position: relative;

    margin: 0px 50px 0px 150px;
    float: left;
  }
  .weui-cell-list-heng{
    /*width: 80%;*/
    width: 10%;
    position: relative;

    /*margin: 0px 50px 0px 150px;*/
    float: left;
  }
  .weui-cell-line{
    /*float: left;*/
    position: relative;
    margin-left: 5px;
    border-left: 1px solid #bbb;
    height: 40px;
    /*width: 60px;*/

  }
  .weui-cell-line-heng{
    /*float: left;*/
    position: relative;
    margin: -5px 8px 0px 8px;
    border-top: 1px solid #bbb;
    height: 200px;
    width: 60px;

  }
  .weui-cell-circle{
    border: 1px solid #000;
    background-color: rgb(0, 162, 255);
    border-radius: 6px;
    width: 10px;
    height: 10px;
    border-color: rgb(0, 162, 255);
  }
  .weui-cell-name{
    position: absolute;
    font-size:14px;
    top: -15px;
    left: 15px;
  }
  .weui-cell-name-heng{
    position: absolute;
    font-size:14px;
    top: 10px;
    left: -12px;
    width: 20px;

  }
  .weui-cell-event{
    position: absolute;
    top: -20px;
    left: -45px;
    font-size: 16px;

  }
  .weui-cell-event-heng{
    position: absolute;
    top: -45px;
    left: -15px;
    font-size: 16px;

  }
  .weui-cell-event-on{
    position: absolute;
    top: 5px;
    /*left: -115px;*/ /*有字*/
    left: -55px;
    font-size: 12px;
  }
  .weui-cell-event-on-heng{
    position: absolute;
    top: -45px;
    left: -55px;
    font-size: 12px;

  }
  .buscomegoimg{
    width: 30px;
    height: 25px;
    border: none;
    vertical-align: middle;
  }

  /*横向*/
  .time-horizontal {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
  }

  .time-horizontal li {
    float: left;
    position: relative;
    text-align: center;
    border-top: 1px solid #707070;
    padding-top: 10px;
    width: 20px;
  }
  .time-horizontal li b:before {
    content: '';
    position: absolute;
    top: -10px;
    left: 47%;
    width: 12px;
    height: 12px;
    border: 2px solid #4c4c4c;
    border-radius: 8px;
    background: #4c4c4c;
  }
  .me-footer {
    border-top:#e6e6e6 1px solid;
  }

</style>
