<template>
  <el-container>
    <!--<el-header>-->
    <!--<el-row>-->
    <!--<el-col :span="2" class="line">按路线查询公交</el-col>-->
    <!--<el-col :span="2">-->
    <!--<el-input v-model="busLineName" placeholder="请输入内容" @keyup.enter.native="busLineSearch"></el-input>-->
    <!--</el-col>-->
    <!--<el-col :span="2">-->
    <!--<el-button type="primary" @click="busLineSearch">主要按钮</el-button>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</el-header>-->
    <el-container>
      <el-aside width="200px" style="background-color:#1f2d3d;" v-bind:style="{height: myHeight}">


        <div class="infowindow-list" ref="carMarkerWindow" v-if="carMarkerWindow.runMethod">
          <div class="item">
            <strong>线路:</strong>{{carMarkerWindow.lineId}}
          </div>
          <div class="item">
            <strong>车牌号:</strong>冀R{{carMarkerWindow.vehicleNumber}}
          </div>
          <div class="item">
            <strong >GPS 速度:</strong><span :style="carMarkerWindow.speed >=40 ? 'color:red':''">{{carMarkerWindow.speed}}km/h</span> <el-tag type="danger" v-if="carMarkerWindow.speed >=40">超速</el-tag>
          </div>
          <div class="item">
            <strong>上下行:</strong>{{carMarkerWindow.upDown == 1?"下行":"上行"}}</div>
          <!--<div class="item">-->
          <!--<strong>站点:</strong>{{getStation(carMarkerWindow)}}</div>-->
          <!--<div class="item">-->
          <!--<strong>下一站:</strong>{{getNextStation(carMarkerWindow)}}-->
          <!--</div>-->
          <!--<div class="item">-->
          <!--<strong>日期时间:</strong>-->
          <!--{{String(carMarkerWindow.GPSTime).substring(0,4)}}年{{String(carMarkerWindow.GPSTime).substring(4,6)}}月{{String(carMarkerWindow.GPSTime).substring(6,8)}}日{{String(carMarkerWindow.GPSTime).substring(8,10)}}点{{String(carMarkerWindow.GPSTime).substring(10,12)}}分{{String(carMarkerWindow.GPSTime).substring(12,14)}}秒-->
          <!--</div>-->
        </div>

        <div class="children video-list" style="line-height: 30px;color:#FFF;">
          <h3 v-for="i in 8">
            <input type="checkbox" @change.navtive="(e)=>{viedeoCheck(e,testData,i)}" />
            <i class="el-icon-fa-video-camera"></i> 摄像头{{i}}
          </h3>
        </div>

        <el-row v-for="line in lineList"  :key="line.id" class="line-list">



          <div class="tree-node">
            <h2 @click="(e)=>{treeToggle(e,line)}">
              <span class="el-tree-node__expand-icon"></span>
              <input type="checkbox" @click.stop="" @change="(e)=>{treeLineCheck(e,line)}">
              {{line.lineName}}

              <!--<i class="el-icon-fa-level-down"></i> {{line.children.filter((car)=>{return car.UpDown==1}).length}}-->
              <!--/-->
              <!--<i class="el-icon-fa-level-up"></i> {{line.children.filter((car)=>{return car.UpDown!=1}).length}}-->
              <!--<span class="badge"></span>-->
            </h2>
            <div class="children" v-if="line.id">
              <div class="tree-node" v-for="car,index in line.busList"   :id="'id'+car.lineId" :key="index">

                <h2 @dblclick="(e)=>{positionCar(e,car)}" >
                  <span class="el-tree-node__expand-icon"></span>
                  <input type="checkbox" @change="(e)=>{treeCheck(e,car)}" @click.stop="" />
                  <i :class="(car.upDown==1?'el-icon-fa-level-down ':'el-icon-fa-level-up ') + 'updown'"></i>
                  <i class="el-icon-fa-bus"></i>
                  <span @click="(e)=> {treeToggle(e)}">冀R{{car.vehicleNumber}}  {{car.speed}}km/h</span>
                </h2>

                <div class="children video-list">
                  <h3 v-for="i in 8">
                    <input type="checkbox" @change.navtive="(e)=>{viedeoCheck(e,car,i)}" />
                    <i class="el-icon-fa-video-camera"></i> 摄像头{{i}}
                  </h3>
                </div>

              </div>
            </div>
          </div>

        </el-row>

        <!--<el-tree-->
        <!--:data="lineList"-->
        <!--:props="treebus"-->
        <!--:load="loadNode"-->
        <!--lazy-->
        <!--show-checkbox-->
        <!--@check-change="handleCheckChange"-->
        <!--style="background-color: #f2f6fc ">-->
        <!--</el-tree>-->
      </el-aside>
      <el-main v-bind:style="{height: myHeight}">

        <div class="JK-map">

          <div class="status-window" :style="{bottom:showOverSpeedList?0:'auto'}">
            <!-- 运营总量：{{carList.length}}<br>
            运行车辆：<span style="color:#007ad4;">{{onlineCount}}</span><br>
            离线车辆：<span style="color:#999;">{{offLineCarCount}}</span><br> -->

            运营总量：739<br>
            运行车辆：<span style="color:#85ce61;">{{onlineCount}}</span><br>
            离线车辆：<span style="color:gold;">{{739-onlineCount}}</span><br>
            超速车辆：<span style="color:red;font-weight: bold;"><!--{{overSpeedList.length}}-->23</span> <a href="javascript:;" @click="showOverSpeedList = !showOverSpeedList">[显示详细]</a>

            <!--<ul v-if="showOverSpeedList">-->
              <!--<li v-for="car in overSpeedList">-->
                <!--<div class="overspeed-title">-->
                  <!--<span>{{car.CarCard}}</span> {{car.GPSSpeed}} km/h-->

                  <!--<div class="overspeed-right">-->
                    <!--<a href="javascript:;" @click="car.showOverSpeed = !car.showOverSpeed" >详细</a>-->
                    <!--<a href="javascript:;" @click="()=>{showOverSpeedCar(car)}" >定位</a>-->
                  <!--</div>-->

                <!--</div>-->

                <!--<div v-if="car.showOverSpeed" class="overspeed-info">-->
                  <!--<div class="item">-->
                    <!--<strong>线路:</strong>{{lines[lines.dict[car.RouteId]].LineName}}-->
                  <!--</div>-->
                  <!--<div class="item">-->
                    <!--<strong>车牌号:</strong>{{car.CarCard}}-->
                  <!--</div>-->
                  <!--<div class="item">-->
                    <!--<strong>GPS 速度:</strong>{{car.GPSSpeed}}km/h-->
                  <!--</div>-->
                  <!--<div class="item">-->
                    <!--<strong>上下行:</strong>{{car.UpDown == 1?"下行":"上行"}}</div>-->
                  <!--<div class="item">-->
                    <!--<strong>站点:</strong>{{getStation(car)}}</div>-->
                  <!--<div class="item">-->
                    <!--<strong>下一站:</strong>{{getNextStation(car)}}-->
                  <!--</div>-->
                <!--</div>-->
              <!--</li>-->
            <!--</ul>-->

          </div>



          <div id="JK-map" class="mymap"></div>


          <transition-group tag="div" name="JK-video" :class="$route.name=='shipin'?'shipin-video':'JK-video'">
            <div class="JK-video-item"
                 v-for="(video,index) in videoList"
                 :style="
        $route.name=='shipin'?
        {top:(Math.floor(index/4)*33.33)+'%',left:(parseInt(index%4)*25)+'%'}:{bottom:(parseInt(index%3)*33.33)+'%',right:(parseInt(index/3)*50)+'%'}
        "
                 v-bind:key="video.id">
              <div class="JK-video-container">
                <div class="video-item">
                  <object :id="'v'+video.id" classid="clsid:DB5D6116-F923-4aa0-83D9-D6538F55E174" name="showvideo" style="width:100%;height:100%;">
                    <param name="_Version" value="65536">
                    <param name="_ExtentX" value="10583">
                    <param name="_ExtentY" value="9260">
                    <param name="_StockProps" value="0">
                  </object>
                </div>
                <el-button class="close" @click="removeVideo(video)" type="primary" icon="fa-times" size="small"></el-button>
                <div class="info">
                  {{video.videoName}}
                </div>
              </div>
            </div>
          </transition-group>







        </div>

      </el-main>
    </el-container>
    <el-footer>

      <div class="warning-tips">

        <el-row :gutter="10">
          <el-col :span="8">
            <dl class="elcolw">
              <dt>大间距</dt>
              <dd>
                <span v-for="djj in YujingData.dajianju">
                 <!--<router-link :to="'/jiankong-line/'+djj.lineId.replace('路',1)">{{djj.vehicleNumber}}</router-link>-->
                  <router-link :to="'/mapline/mapline?sendLineName='+djj.runMethod">{{djj.vehicleNumber}}</router-link>
                </span>

              </dd>
            </dl>
          </el-col>
          <el-col :span="8">
            <dl class="elcolw">
              <dt>双车</dt>
              <dd>
                <span v-for="sc in YujingData.shuangche">
                  <router-link :to="'/mapline/mapline?sendLineName='+sc.runMethod">{{sc.vehicleNumber}}</router-link>
                </span>
              </dd>

            </dl>
          </el-col>

          <el-col :span="8">
            <dl class="elcolw">
              <dt>滞站</dt>
              <dd style="height:45px;overflow-y:auto;">
                <span v-for="item in YujingData.zhizhan">
                  <router-link :to="'/mapline?sendLineName='+item.runMethod">
                    {{item.vehicleNumber}}
                    <!--{{item.lineId}}-->
                    <!--{{item.stationId}}-->
                    <!--{{item.vehicleNumber}}-->
                </router-link>
                </span>
              </dd>

            </dl>
          </el-col>

        </el-row>


      </div>



    </el-footer>
  </el-container>

</template>
<script>


  import { getBusLineList,getBusList,getBusYujing } from '@/api/table'

  import $ from 'jQuery'

  export default {

    data () {
      return {
        showOverSpeedList:false,

        testData:{
          CarSign:'1105'
        },
        videoList:[],

        myHeight: (window.innerHeight - 220) + 'px',
        busList:[
          {children: [{
              videoList:''
            }]},
        ],
        reqList:[],
        busLineName:null,
        AMapUI: null,
        AMap: null,
        MapKey: '',
        MapCityName: '',
        openLine:new Set(),//记录当前展开的跑法
        lineList:[
          {        "lineName": "加载中"        }
        ],
        YujingData:[],
        carMarkerWindow:{},
        timer:null
      }
    },
    computed:{
      onlineCount:function(){
        //var count =  this.carList.length - this.offLineCarCount;
        var count =  700 - 20;
        count = count>=0?count:0;
        return count;
      },
      overSpeedList:function(){
        var list = [];
        this.lines.map((line)=>{
          if(line.children){
            list = list.concat(line.children.filter((car)=>{
              return car.GPSSpeed>=40;
            }));
          }
        })
        return list
      }
    },
    mounted(){
      //his.loadmap();     //加载地图和相关组件

      var that = this;
      window.mapInit= function(){
        var map = that.map = new BMap.Map('JK-map');
        map.setCurrentCity("廊坊市");
        map.centerAndZoom(new BMap.Point(116.726509,39.53446), 13);

        // map.setMapStyle({
        //   styleJson:mapStyle
        // });
        that.map.enableScrollWheelZoom(true);
        var traffic = new BMap.TrafficLayer();        // 创建交通流量图层实例
        map.addTileLayer(traffic);                    // 将图层添加到地图上


      }
      if(!window.BMap){
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=C7kiRgh3qZDHrCbpf9vVGjrN3O9Rf10Q&callback=mapInit";
        document.body.appendChild(script);
      }else{
        mapInit()
      }


      getBusLineList().then(response => {
        if(response.code === '000') {
          //返回线路赋值
          this.$set(this.$data,"lineList",response.result);
        }

        this.initReq();

      })





    },
    beforeDestroy(){
      clearInterval(this.timer);
    },
    methods: {
      initReq(){
        window.aa = this.lineList;
        //初始化轮询

        this.timer = setInterval(()=>{
          var runMethods = Array.from(this.openLine.values());
          runMethods.map(runMethod=>{
            getBusList(runMethod).then(response => {
              if (response.code === '000') {
                var busList  = response.result;
                var runMethod = busList[0].runMethod;
                var line = this.lineList.find(line=>{return line.runMethod = runMethod;});

                if(!line){
                  return false;
                }
                for(var license in busList){

                  this.updateBus(line,busList[license])
                }
                // this.$set(line,"busList",response.result);
              }


            })
          });

          //预警信息 注意开启

          // getBusYujing().then(Response => {
          //   if(Response.code === '000') {
          //
          //     // var dajianju = {};
          //     // var shuangche = {};
          //     // var zhizhan = {};
          //     // Response.result.dajianju.map(item=>{
          //     //   dajianju[item.runMethod] = "";
          //     // });
          //     // Response.result.shuangche.map(item=>{
          //     //   //shuangche[item.lineId] = "";
          //     //   shuangche[item.runMethod] = "";
          //     // });
          //     // Response.result.zhizhan.map(item=>{
          //     //   zhizhan[item.runMethod] = "";
          //     // });
          //     // var dajianjuArr = [];
          //     // var shuangcheArr = [];
          //     // var zhizhanArr = [];
          //     // for(var key1 in dajianju){
          //     //   //dajianjuArr.push({'dajianju':key1});
          //     //   dajianjuArr.push(key1);
          //     // }
          //     // for(var key2 in shuangche){
          //     //   shuangcheArr.push(key2);
          //     // }
          //     // for(var key3 in zhizhan){
          //     //   zhizhanArr.push(key3);
          //     // }
          //     // //console.log(dajianjuArr);
          //     //
          //     // this.$set(this.$data.YujingData,"dajianju",dajianjuArr);
          //     // this.$set(this.$data.YujingData,"shuangche",shuangcheArr);
          //     // this.$set(this.$data.YujingData,"zhizhan",zhizhanArr);
          //
          //     this.$set(this.$data.YujingData,"dajianju",Response.result.dajianju);
          //     this.$set(this.$data.YujingData,"shuangche",Response.result.shuangche);
          //     this.$set(this.$data.YujingData,"zhizhan",Response.result.zhizhan);
          //   }
          // }) ;

        },3000)



      },

      updateBus(line,busData){
        var that = this;
        var bus = line.busList.find(item=>{return item.vehicleNumber == busData.vehicleNumber});

        //console.log(bus)
        if(!bus){
          return false;
        }
        //更新车辆信息
        var convertor = new BMap.Convertor();
        var pt = new BMap.Point(busData.longitude,busData.latitude);
        convertor.translate([pt], 1, 5, function(item){
          pt = item.points[0];
          if(bus.marker){
            bus.marker.setRotation(busData.direction)
            bus.marker.setPosition(pt)
          }else{
            var myIcon = new BMap.Icon("../../static/point.svg", new BMap.Size(14,14));
            var label = new BMap.Label(bus.vehicleNumber,{position:pt,offset:new BMap.Size(50,-1)});
            label.setZIndex(1);
            label.setStyle({border:"none",background:"none"});
            label.setContent('<div style="background:#FFF;border-radius:5px; fot-size:15px;padding:2px 5px; border:1px solid #007ed2; color:#007ed2;">\
            <div style="position:absolute;left:-38px;top:10px; width:39px; border-bottom:1px solid #007ed2;"></div><i class="'+(busData.upDown==1?'el-icon-fa-level-down ':'el-icon-fa-level-up ')+' updown"></i>冀R\
          '+ busData.vehicleNumber+'\
          </div>');

            var marker = new BMap.Marker(pt,{title:busData.vehicleNumber,icon:myIcon,rotation:busData.direction});  // 创建标注
            marker.parentbusData = busData;
            marker.setLabel(label);
            marker.addEventListener("click", function(){
              //console.log(this.parentbusData)
              //debugger
              that.$set(that,"carMarkerWindow",this.parentbusData)
              setTimeout(()=>{
                var infoWindow = new BMap.InfoWindow(that.$refs.carMarkerWindow,{width:350});
                this.openInfoWindow(infoWindow); //开启信息窗口
              })
            });
            that.$set(bus,"marker",marker);
            that.map.addOverlay(marker);              // 将标注添加到地图中
          }
        })




      },

      //监控视频
      removeVideo(data,$el){
        //删除指定得视频

        var _index = this.videoList.indexOf(data);
        if(_index !=-1){
          var _video = this.videoList.splice(_index,1);
          _video[0].$el.prop("checked",false);
        }
      },
      createVideo(data,$el){
        //添加视频数据到videoList
        data.$el = $el;
        var maxVideo = 12;
        // if(this.$route.name == "shipin"){
        //   maxVideo = 12
        // }
        if(this.videoList.length==maxVideo){//如果超过6个，删除最后一个
          var delVideo = this.videoList.shift();
          delVideo.$el.trigger("click");
        }
        this.videoList.push(data);
        this.$nextTick(()=>{
          setTimeout(()=>{
            var _l = 5-data.CarSign.length;
            var _CarSign = data.CarSign;
            for(var i=0;i<_l;i++){
              _CarSign = "0"+_CarSign;
            }

            //$("#v"+data.id)[0].SetDeviceInfo(123, "", _CarSign, 5556, window.GJCONFIG.videoIp, window.GJCONFIG.videoPort, "", "");
            $("#v"+data.id)[0].SetDeviceInfo(123, "", _CarSign, 5556, '60.10.59.86', 17891, "", "");
            setTimeout(()=>{
              $("#v"+data.id)[0].OpenVideo(data.i,1)
            },1000);
          },1000)
        })


      },
      viedeoCheck(e,data,i){
        console.log(e)
        console.log(data)
        console.log(i)
        data[data.CarSign+i] = data[data.CarSign+i] || {
          id:data.CarSign+i,
          CarSign:data.CarSign,
          i:i,
          videoName:data.CarCard+"摄像头"+i
        }

        if($(e.target).prop("checked")){
          this.createVideo(data[data.CarSign+i],$(e.target));
        }else{
          this.removeVideo(data[data.CarSign+i]);
        }
      },


      //点击车辆多选框
      treeCheck(e,data){
        if($(e.target).prop("checked")){
          this.createCar(data);
        }else{
          this.removeCar(data);
        }

      },
      //点击线路多选框
      treeLineCheck(e,line){
        var that = this;
        var isChecked = $(e.target).prop("checked");

        if(isChecked){
          that.$set(line,"show",$(e.target).prop("checked"));
        }

        that.$nextTick(function () {
          var $checkboxs = $(e.target).closest(".tree-node").children(".children").find("h2 input[type=checkbox]");
          if(isChecked){
            $checkboxs.each(function(index,el){
              if(!$(el).prop("checked")){
                $(el).trigger("click");
              }
            });

            that.createBusLine(line);
          }else{
            $checkboxs.each(function(index,el){
              if($(el).prop("checked")){
                $(el).trigger("click");
              }
            });
            that.removeBusLine(line);
          }
        })
      },

      treeToggless(e){
        alert(12)
      },

      //点击线路-加载线路下的车辆信息
      treeToggle(e,line){
        // console.log(line.runMethod)
        $(e.target).closest(".tree-node").toggleClass("active");
        var result = $(e.target).closest(".tree-node").hasClass("active");
        if(result){
          getBusList(line.runMethod).then(response => {
            if (response.code === '000') {
              //返回车辆信息赋值
              this.$set(line,"busList",response.result);
              // for (var i in line.busList){
              //
              //   this.$set(line.busList[i],"videoList",response.result);
              // }

            }
            this.openLine.add(line.runMethod);


          });

        }


        // if(line){
        //   this.$set(line,"show",true);
        // }
        // return result;
      },

      //点击车辆定位
      positionCar(e,car){
        var that = this;

        var convertor = new BMap.Convertor();
        var pt = new BMap.Point(car.longitude,car.latitude);
        convertor.translate([pt], 1, 5, function(item){//转换坐标后定位
          pt = item.points[0];
          //定位
          that.map.centerAndZoom(pt, 16);
          //创建Car
          $(e.target).children("input[type=checkbox]").prop("checked","checked");
          that.createCar(car);
        });

      },



      handleCarChange(h,{node,data,store},isChecked){//车辆勾选事件
        var that = this;
        that.$set(data,"show",isChecked)
        if(isChecked){
          this.createCar(data)
        }else{
          this.removeCar(data)
        }
      },
      //移除车辆
      removeCar(line){
        this.map.removeOverlay(line.marker);
        delete line.marker
      },
      //创建车辆
      createCar(data){
        if(!data||data.show){  return false;}
        var that = this;
        var convertor = new BMap.Convertor();
        var pt = new BMap.Point(data.longitude,data.latitude);
        convertor.translate([pt], 1, 5, function(item){
          pt = item.points[0];
          if(data.marker){
            data.marker.setRotation(data.direction)
            data.marker.setPosition(pt)
          }else{
            var myIcon = new BMap.Icon("../../static/point.svg", new BMap.Size(14,14));
            var label = new BMap.Label(data.vehicleNumber,{position:pt,offset:new BMap.Size(50,-1)});
            label.setZIndex(1);
            label.setStyle({border:"none",background:"none"});
            label.setContent('\
          <div style="background:#FFF;border-radius:5px; fot-size:15px;padding:2px 5px; border:1px solid #007ed2; color:#007ed2;">\
            <div style="position:absolute;left:-38px;top:10px; width:39px; border-bottom:1px solid #007ed2;"></div><i class="'+(data.upDown==1?'el-icon-fa-level-down ':'el-icon-fa-level-up ')+' updown"></i>冀R\
          '+ data.vehicleNumber+'\
          </div>');
            //   label.setContent('\
            // <div style="background:#FFF;border-radius:5px; fot-size:15px;padding:2px 5px; border:1px solid #007ed2; color:#007ed2;">\
            //   <div style="position:absolute;left:-38px;top:10px; width:39px; border-bottom:1px solid #007ed2;"></div><i class="'+(data.upDown==1?'el-icon-fa-level-down ':'el-icon-fa-level-up ')+' updown"></i>\
            // '+that.lines[that.lines.dict[data.runMethod]].lineName+'\
            // </div>');
            var marker = new BMap.Marker(pt,{title:data.vehicleNumber,icon:myIcon,rotation:data.direction});  // 创建标注
            marker.parentData = data;
            marker.setLabel(label);
            marker.addEventListener("click", function(){
              that.$set(that,"carMarkerWindow",this.parentData)
              setTimeout(()=>{
                var infoWindow = new BMap.InfoWindow(that.$refs.carMarkerWindow,{width:350});
                this.openInfoWindow(infoWindow); //开启信息窗口
              })
            });
            that.$set(data,"marker",marker);
            that.map.addOverlay(marker);              // 将标注添加到地图中
          }
        })

      },


      createBusLine(line){        //创建线路

        var that = this;
        return new Promise(function(resolve,reject){
          var busLineSearch  = new BMap.BusLineSearch("廊坊市",{
            onGetBusLineComplete:function(busItem){
              //console.log(busItem)
              //debugger
              if(!line.xianluLine){
                that.createXianlu(busItem,line);//创建线路｛线、点｝
              }
            },
            onGetBusListComplete:function(busList){
              //console.log(busList)
              var busItem = busList.getBusListItem(0);
              busLineSearch.getBusLine(busItem);
            }
          });
          var searchName = line.lineName;
          if(searchName == "1路"){
            searchName = "1路a线";
          }
          busLineSearch.getBusList(searchName);
        });
      },
      removeBusLine(line){        //删除线路
        var map = this.map;
        if(line.xianluLine){
          map.removeOverlay(line.xianluLine);
        }
        delete line.xianluLine
      },
      createXianlu(busItem,line){        //创建线路｛线｝
        var map = this.map;
        var arrPois = busItem.getPath();
        //alert('checked4')
        //console.log('createXianlu')
        //console.log(arrPois)
        var color =  "rgb(25,131,211)";
        //创建线
        var mapLine = new BMap.Polyline(arrPois, {strokeColor: color,strokeWeight:7,strokeOpacity:0.6});

        //输出 点、线
        map.addOverlay(mapLine);
        line.xianluLine = mapLine;
      },




    }
  }
</script>
<style lang="less">
  .mymap{
    width: 100%;height: 100%;
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
    margin: 0px;
    padding: 0px;
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


  .JK-map{position:relative;width: 100%;height: 100%;}
  .JK-video{ position: absolute;    right: 0;    bottom: 0;    width: 600px;    top: 0;
    .JK-video-item{ width:50%; height:33.33%;position:absolute;}
    .JK-video-container{position:absolute; width: 100%;height:100%;

    }
  }
  .video-item{position:absolute; width: 100%;top:30px;bottom:0; background: #000;}
  .JK-video-item{ position:absolute; z-index:0;  border-bottom:1px solid rgba(255,255,255,.3); width: 300px; height:250px; background:#fff;}
  .JK-video-container{ text-align: center;
    .close{position:absolute; z-index:3;right:0;top:0; background:rgba(255,255,255,.2); color:#FFF; border:none; border-radius:0; opacity:0;transition:all .2s;z-index:200; height:30px;
      &:hover{ background:rgba(255,255,255,.3);}
    }
    .info{position:absolute;z-index:3; height:30px; line-height:30px;background:rgba(0,0,0,.5); color:rgba(255,255,255,.7); text-align:center; top:0;left:0; right:0;}
    &:hover{
      .close{opacity:1;}
    }
  }

  .tree-node{ height:30px; overflow:hidden; color:#aaa; border-top:1px solid #162433;
    .badge{ background:; color:#fff;position:absolute; right:5px;top:4px; border-radius:100%; width:20px; height:20px; line-height:20px; text-align:center; font-size:12px;}
    h2{ font-weight:normal;font-size:14px; margin:0; height:30px; line-height:30px; cursor:pointer;position:relative;
      input[type=checkbox]{vertical-align:-.15em;
      .divtext {color: #FFF;width: 100%;height: 20px;line-height: 20px;}
      }
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
  .JK-video-item {
    transition: all .5s;
  }
  .JK-video-enter, .JK-video-leave-to
    /* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .JK-video-leave-active {
    position: absolute;
  }
  .infowindow-list{ font-size:14px;
    .item{ border-bottom:1px dotted #ddd; color:#888; padding:3px 0;
      strong{ color:#333;  padding-right:1em; width:5em; display:inline-block;}
    }
  }
  .offline .el-checkbox__label{ color:#888;}
  .online .el-checkbox__label{ color:#09a215;}
  .line-list{
    text-align: left;
    padding-left: 10px;
    .children .tree-node{
      h2{ color:#f2f6fc;}
    }
  }
  .shipin-video{
    .JK-video-item{ width:25%; height:33.3333%;}
  }
  .warning-tips{position:fixed; z-index: 10; bottom:0px;   left:8px;right:8px;
    .elcolw{background: #f5f3f0;height:130px;margin: 0px;padding: 0px;}
    dl,dt,dd{margin:0;padding:0; font-size: 14px;font-weight: bold;color: #1f2d3d;}
    dt{background-color: #dedede; line-height: 26px;height: 26px;padding-left: 10px;}
    dl{padding:10px; }
    dd{padding-top:8px;}
    dd span{ background:#ff4040; border-radius: 3px; font-size:14px; display: inline-block; padding:1px 5px; margin-right:3px;}
  }
  .status-window{border-right:1px solid #999;border-bottom:1px solid #999;position:absolute; z-index:999; background:rgba(0,0,0,0.6);color:#f2f6fc;text-align:left;line-height:24px;left:10px;top:10px;bottom:10px;overflow:auto; padding:10px; font-size:12px;
    a{color:#FFF;}
    ul,li{list-style-type: none;padding:0;}
    ul{}
    .overspeed-info{background:#ddd; padding:8px;}
    .overspeed-title{ position:relative; width:215px; border-bottom:1px solid #ddd;padding: 2px 0;
      span{ display: inline-block; width:90px;}
      .overspeed-right{position:absolute;right:0; top:2px;}

    }
  }
</style>
