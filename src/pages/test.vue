<template>
  <div class="jiankong-line">
    3213
    <!--<ul class="jiankong-line-list">-->
      <!--<li v-for="line in lineList" @click="showLine(line)" class="jiankong-line-item">-->
        <!--{{line.lineName}}-->
      <!--</li>-->
    <!--</ul>-->
    <!--<warning :currentLine="currentLine" v-if="showLineView" @close="hanlderClose"></warning>-->
    <div class="line-list">
      <div class="line-item">
    <dl v-for="lineIndexs,index in busLists">
      <dt>{{index.upSiteList?"上行":"下行"}}</dt>
      <dd >
        <!--<div class="station" v-for="stationIndex in currentLine.children.downSiteList"-->
        <!--:class="(lineItem.stations[stationIndex].bus.length >=2?'shuangche-warning ':'')-->
        <!--+ (lineItem.stations[stationIndex].nextBus.length >=2?'shuangche-warning-next ':'')-->
        <!--+ (lineItem.stations[stationIndex].bus.length?'has-bus ':'')-->
        <!--">-->
        <div class="station" v-for="stationIndex in busLists.downSiteList">
          <h3 class="station-name">{{stationIndex.siteName}}</h3>
          <div>
            <span class="bus" v-for="bus in busLists.downSiteList.busList" :title="bus.vehicleNumber"  :key="bus.vehicleNumber" ></span>

          </div>
          <div class="bus-out" >
							<span class="bus" :title="bus.vehicleNumber" v-for="bus in busLists.downSiteList.busList">

							</span>
          </div>
        </div>
      </dd>
    </dl>
      </div>
    </div>
    <!--<div class="line-list">-->
      <!--<el-button type="primary" icon="arrow-left"  @click="close">返回</el-button>-->
      <!--<div class="line-item" v-for="lineItem,lineItemIndex in lineList">-->
        <!--<h2>{{lineItem.LineName}} 线路 {{lineItemIndex+1}}</h2>-->


      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  //import warning from '../components/layout/warning.vue'
  //import {lineDatas} from "../api/index.js"
  //import {god} from "../api/jiankong-line.js"
  import {getBusLineList,getBusGPS} from "@/api/table"
  export default {
    //components:{warning:warning},
    watch:{
      "$route":function(){
        try{
          var lineId = this.$route.path.replace("/jiankong-line/","");
          this.routeView(lineId);
        }catch(err){

        }
      }
    },
    data() {
      return {
        showLineView:false,
        currentLine:{
          children:[],
          LineName:"",
          round:false
        },
        warningData:{},
        //lineData:Object.freeze(lineData),
        lineList:[],
        busLists:[]
      }
    },
    mounted() {
      var that = this;

      getBusLineList().then(response => {
        if(response.code === '000') {
          //返回线路赋值

          that.lineList = response.result;
          //that.$set(this.$data,"lineList",response.result);
          console.log('lineList')
          console.log(that.lineList)
          console.log('lineList')
        }

        this.initReq();

      })








    },
    methods:{

      initReq(){

        getBusGPS(12).then(response => {
          if (response.code === '000') {
            //返回车辆信息赋值
            //console.log(response)


            //this.showLineView = true;
            this.busLists = response.result;
            //this.$set(this.$data,"currentLine.children",response.result);
            // for (var i in line.busList){
            //
            //   this.$set(line.busList[i],"videoList",response.result);
            // }
            console.log('currentLine.children')
            console.log(this.busLists)
            console.log('currentLine.children')

          }
          //this.openLine.add(line.runMethod);


        });

      },
      // routeView:function(newVal){
      //   if(newVal == "all"){
      //     this.showLineView = false;
      //   }else{
      //     this.lineList.map((line)=>{
      //       if(line.LineId == newVal){
      //         this.showLine(line);
      //       }
      //     })
      //   }
      // },
      // hanlderClose:function(){
      //   this.showLineView = false;
      //   window.location.hash = "/jiankong-line/all";
      // },
      // showLine:function(line){
      //   //window.location.hash = "/jiankong-line/"+line.LineId;
      //   var that = this;
      //   try{
      //     this.showLineView = true;
      //     if(line.round){
      //       //如果是环线
      //       this.currentLine.children = [god.lines[line.lineList[0]],god.lines[line.lineList[1]]]
      //       this.$set(this.currnetLine,"children");
      //     }else{
      //       //如果不是环线
      //       this.currentLine.children = [god.lines[line.LineId]]
      //       this.$set(this.currnetLine,"children");
      //     }
      //   }catch(err){
      //
      //   }
      //
      //
      // }

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
