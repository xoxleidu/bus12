<template>

  <div style="height: 800px;">
    <div style="float: left;width: 200px;">

      <!--<div class="tree-node">-->
        <!--<h2 @click="(e)=>{treeToggle(e,line)}">-->
          <!--<span class="el-tree-node__expand-icon"></span>-->
          <!--<input type="checkbox" @click.stop="" @change="(e)=>{treeLineCheck(e,line)}">-->
          <!--{{line.lineName}}-->

          <!--&lt;!&ndash;<i class="el-icon-fa-level-down"></i> {{line.children.filter((car)=>{return car.UpDown==1}).length}}&ndash;&gt;-->
          <!--&lt;!&ndash;/&ndash;&gt;-->
          <!--&lt;!&ndash;<i class="el-icon-fa-level-up"></i> {{line.children.filter((car)=>{return car.UpDown!=1}).length}}&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="badge"></span>&ndash;&gt;-->
        <!--</h2>-->
        <!--<div class="children" v-if="line.id">-->
          <!--<div class="tree-node" v-for="car,index in line.busList"   :id="'id'+car.lineId" :key="index">-->

            <!--<h2 @dblclick="(e)=>{positionCar(e,car)}" >-->
              <!--<span class="el-tree-node__expand-icon"></span>-->
              <!--<input type="checkbox" @change="(e)=>{treeCheck(e,car)}" @click.stop="" />-->
              <!--<i :class="(car.upDown==1?'el-icon-fa-level-down ':'el-icon-fa-level-up ') + 'updown'"></i>-->
              <!--<i class="el-icon-fa-bus"></i>-->
              <!--<span @click="(e)=> {treeToggle(e)}">冀R{{car.vehicleNumber}}  {{car.speed}}km/h</span>-->
            <!--</h2>-->

            <!--<div class="children video-list">-->
              <!--<h3 v-for="i in 8">-->
                <!--<input type="checkbox" @change.navtive="(e)=>{viedeoCheck(e,car,i)}" />-->
                <!--<i class="el-icon-fa-video-camera"></i> 摄像头{{i}}-->
              <!--</h3>-->
            <!--</div>-->

          <!--</div>-->
        <!--</div>-->
      <!--</div>-->




    </div>
    <div style="width:100%;height: 100%;float: right;">
      <!--<div id="JK-map" style="width:100%;height: 100%"></div>-->
    </div>
  </div>

</template>
<script>

  import axios from "axios";
  import {getBusLineList,getBusGPS} from "@/api/table"
  export default {


    data() {
      return {
        lineList:{},

        lineProps: {
          label: 'lineName',
          children: {
            label: 'lineName'
          }
        },
        count: 1      }
    },
    mounted() {

      var that = this;


      // window.mapInit= function(){
      //   var map = that.map = new BMap.Map('JK-map');
      //   map.setCurrentCity("廊坊市");
      //   map.centerAndZoom(new BMap.Point(116.726509,39.53446), 13);
      //
      //   // map.setMapStyle({
      //   //   styleJson:mapStyle
      //   // });
      //   that.map.enableScrollWheelZoom(true);
      //   var traffic = new BMap.TrafficLayer();        // 创建交通流量图层实例
      //   map.addTileLayer(traffic);                    // 将图层添加到地图上
      //
      //
      // }
      // if(!window.BMap){
      //   var script = document.createElement("script");
      //   script.type = "text/javascript";
      //   script.src = "http://api.map.baidu.com/api?v=2.0&ak=C7kiRgh3qZDHrCbpf9vVGjrN3O9Rf10Q&callback=mapInit";
      //   document.body.appendChild(script);
      // }else{
      //   mapInit()
      // }



      getBusLineList().then(response => {
        if(response.code === '000') {
          //返回线路赋值

          var line = response.result;
          // this.$set(this.$data,"lineList",line);
          var allPromise = [];
          var lineList = [];

          for(var i=0;i<line.length;i++){
              allPromise.push(getBusGPS(line[i].runMethod))
          }
          axios.all(allPromise).then(res=>{
            res.map((item,index)=>{
              lineList.push(item.result);
            });

            lineList = [{
              lineName:1,
              upSiteList:[{
                lineName:2
              }]
            }]

            this.$set(this.$data,"lineList",lineList);
            //console.log('this.lineList')
            //console.log(this.lineList)
          });




        }

        this.initReq();

      })








    },
    methods:{

      initReq(){
        console.log('this.lineList')
        console.log(this.lineList)


      },

      handleNodeClick(data) {

        getBusGPS(data.runMethod).then(response => {
          if (response.code === '000') {
            //返回车辆信息赋值
            //console.log(response)


            //this.showLineView = true;
            //this.busLists = response.result;
            this.$set(this.$data,"busLists",response.result);
            console.log('321321');
            console.log(this.busLists);
            //this.$set(this.$data,"currentLine.children",response.result);
            // for (var i in line.busList){
            //
            //   this.$set(line.busList[i],"videoList",response.result);
            // }


          }
          //this.openLine.add(line.runMethod);


        });
      },


      handleCheckChange(data, checked, indeterminate) {

        console.log(data, checked, indeterminate);



      }


    }
  }

</script>

<style lang="less">
  a{ color:inherit;}
  .jiankong-line{overflow-y:auto;background: #FFF; position:relative;left:0;right:0;top:0;bottom:0;}
  .jiankong-line{
    ul,li{ list-style-type: none; margin:0;padding:0;}
    .jiankong-line-item{ cursor: pointer; background: #FFF; border-bottom:1px solid #ddd; height:40px; line-height: 40px; padding-left:20px;}
    .line-list{ position:relative; top:0;left:0; }

  }


  dl,dt,dd{  padding:0;margin:0; list-style-type: none; position:relative; }
  dt{ font-weight:bold;}
  h2{ font-size:20px; font-weight:normal;padding-left:20px;}
  .station-list{clear:both; padding-top:130px;}
  .station-list:after{content:""; display: block; clear:both;}
  .line-item{
    dl{border-bottom:2px solid #ddd;}
    dt{ padding-left:20px; padding-top: 20px;}
    dd{display: flex;justify-content:space-around;}
    .station{flex:1;position: relative;height:200px;
      &:before{content:"";width:10px;height:10px; background: #007ad4; position: absolute; border-radius: 100%;left:50%;top:-20px;transform: translate(-50%,0); z-index:9;}
      &:after{content:"";width:100%;border-bottom:1px solid #007ad4; position: absolute;left:0;top:-15px;transform:translate(50%,0);}
      &.has-bus{
        &:before{background:#de8500;}
        .bus-in{
          .bus{background:#de8500;}
        }
      }
    }
    .station:nth-child(1){
      &:after{padding-left:80px;margin-left:-80px;}
    }
    .station-name{ font-weight:normal; font-size:14px;-webkit-writing-mode: vertical-lr; height:150px;    writing-mode: tb-rl;    writing-mode: vertical-lr;padding:0;margin:0;position:absolute;left:50%;transform: translate(-50%,0);}
    .bus-in{position:absolute; top:-30px;left:50%; transform: translate(-50%,-100%);}
    .bus-out{position:absolute; top:-30px;left:100%;transform: translate(-50%,-100%);}
    .bus{ font-size:12px; font-weight:normal; background:#007ad4; color:#FFF; border-radius: 3px; padding:1px 3px; display: block; white-space: nowrap;  border-radius: 3px; margin-bottom:5px;position:relative;
      &:after{content:"\f207"; display: inline-block;    font: normal normal normal 14px/1 FontAwesome;    font-size: inherit;    text-rendering: auto;    -webkit-font-smoothing: antialiased;    -moz-osx-font-smoothing: grayscale;}
    }
  }
  .station-down{padding:0 0 130px 0;
    .station{height:200px;
      .station-name{position:absolute;bottom:0; height:auto;}
      &:before{content:"";width:10px;height:10px; background: #007ad4; position: absolute; border-radius: 100%;bottom:-20px;top:auto;}
      &:after{content:"";width:100%;border-bottom:1px solid #007ad4; position: absolute;left:0;transform:translate(50%,0);bottom:-15px;top:auto;}
      .bus-in{ top:100%; transform: translate(-50%,35px);}
      .bus-out{top:100%;transform: translate(-50%,35px);}
      .bus{
        &:after{}
      }
    }
  }
  .line-list{
    .el-icon-close{position:absolute; font-size:30px; right:30px; top:0; cursor: pointer;}
  }



  .line-list{
    .line-item{width:100%;overflow-x:hidden;
      .shuangche-warning-next{
        &:before{z-index: 99;}
        &:after{border-color: red;}
        .bus{background: red !important;}
      }

      .shuangche-warning{
        .station-name{ color:red;}
        &:before{z-index: 99;}
        &:before{background: red !important;}
        .bus{background: red !important;}
      }
    }
  }
</style>
