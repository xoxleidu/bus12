<template>
  <div>
    <el-row class="el-row-left">
      <el-col :span="2" v-if="moreSelect" class="deleteAllButton">
        <el-button type="danger" @click="toggleSelection(multipleSelection)">删除选中项</el-button>
      </el-col>
      <el-col :span="2" v-if="moreSelect" class="deleteAllButton">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="inputSearch" @keyup.enter.native="onSubmitSearch"
                  class="input-with-select">
          <el-select v-model="selectSearch" slot="prepend" placeholder="请选择" style="width: 100px;">

            <el-option label="车牌号" value="0"></el-option>
          </el-select>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="success" icon="el-icon-search" @click="onSubmitSearch"></el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="onSubmitAdd">添加车辆信息</el-button>
      </el-col>

      <el-col :span="2">
        <el-button type="primary" @click="onSubmitClear">刷新</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      ref="multipleTable"
      :data="tableData"
      stripe
      border
      :default-sort="{order: 'descending'}"
      @selection-change="handleSelectionChange"
      @row-dblclick="dbClickRow"
      style="width: 98%;margin: 20px;">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="id"-->
        <!--label="ID"-->
        <!--sortable-->
        <!--width="60">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="date"-->
      <!--label="日期"-->
      <!--sortable-->
      <!--width="180">-->
      <!--<template slot-scope="scope">-->
      <!--<i class="el-icon-time"></i>-->
      <!--<span style="margin-left: 10px">{{ scope.row.date }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        label="车辆基本信息"
        width="180"
        align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>车辆登记编号: {{ scope.row.registrationNumber }}</p>

            <p>发动机号: {{ scope.row.engineNumber }}</p>
            <p>厂牌号: {{ scope.row.brandCachet }}</p>
            <!--<p>车身长: {{ scope.row.busLength }} | 车身宽: {{ scope.row.busWide }} | 车身高: {{ scope.row.busHigh }}</p>-->
            <!--<p>车标记: {{ scope.row.airConditioned == 1 ? "空调车":"非空调车"}}</p>-->
            <!--<p>备注: {{ scope.row.busNote }}</p>-->
            <div slot="reference" class="name-wrapper">
              <!--<div v-if="scope.row.operationState == 0" class="avatartablerowfacediv">-->
              <!--<el-tag type="danger">运营中</el-tag>-->
              <!--</div>-->
              <!--<div v-else class="avatartablerowfacediv">-->
              <!--<el-tag type="success">非运营</el-tag>-->
              <!--</div>-->
              <div class="avatartablerownamediv">
                <el-tag size="medium">{{ scope.row.busLicense }}</el-tag>
              </div>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--sortable-->
      <!--prop="pathId"-->
      <!--label="路线"-->
      <!--width="80">-->
      <!--</el-table-column>-->
      <el-table-column

        prop="remarks"
        label="所属公司"
        width="90">
      </el-table-column>
      <!--<el-table-column-->
      <!--label="进出站状态"-->
      <!--width="100">-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.stationStatus == 0 ? "站外" : "站内"}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--label="上下行状态"-->
      <!--width="100">-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.upDownStream == 0 ? "上行" : "下行"}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        align="center"
        prop="brandCachet"
        label="产牌型号"
        width="160">
      </el-table-column>
      <el-table-column
        sortable
        prop="recordDate"
        label="登记日期"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="seating"
        label="座位数"
        width="110">
      </el-table-column>
      <!--<el-table-column-->
      <!--sortable-->
      <!--prop="drivingKm"-->
      <!--label="行驶公里"-->
      <!--width="110">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--sortable-->
      <!--prop="faultid"-->
      <!--label="事故信息"-->
      <!--width="110">-->
      <!--</el-table-column>-->
      <el-table-column

        prop="vehicleExamination"
        label="验车信息"
        width="110">
      </el-table-column>
      <!--<el-table-column-->
      <!--sortable-->
      <!--prop="manufactureDate"-->
      <!--label="出厂日期"-->
      <!--width="110">-->
      <!--</el-table-column>-->

      <!--<el-table-column
        align="center"
        label="体检表"
        width="110">
        <template slot-scope="scope">
          <div v-if="scope.row.healthPath" class="avatartablerowmedicadiv">
            <img :src="scope.row.healthPath">
          </div>
          <div v-else class="avatartablerowmedicadiv">
            <img src="/static/imageDef.jpg">
          </div>
        </template>
      </el-table-column>-->

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--双击弹出层-->
    <el-dialog :visible.sync="dialogImgVisible">
      <el-form ref="imgForm" :rules="rules" :model="temp"
               label-position="left" label-width="70px"
               style="width: 700px; margin:auto; text-align: center;">
        <el-row class="dialogtempimgcard">
          <p>车辆登记编号: {{ temp.registrationNumber }}</p>
          <p>登记日期: {{ temp.recordDate }} | 座位数: {{ temp.seating }} | 油耗: {{ temp.fuelConsumption }}</p>
          <p>车辆识别码: {{ temp.vehicleIdentification }} | 发动机号: {{ temp.engineNumber }}</p>
          <p>厂牌号: {{ temp.brandCachet }}</p>
          <p>车身长: {{ temp.busLength }} | 车身宽: {{ temp.busWide }} | 车身高: {{ temp.busHigh }}</p>
          <p>车标记: {{ temp.airConditioned == 1 ? "空调车":"非空调车"}}</p>
          <p>备注: {{ temp.busNote }}</p>
        </el-row>
      </el-form>
    </el-dialog>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
               style="width: 800px; margin-left:20px;">

        <el-row :gutter="16" class="form_data_label">基本信息</el-row>

        <el-row :gutter="16">
          <el-col :span="2">车牌号</el-col>
          <el-col :span="5">
            <el-input v-model="temp.busLicense" :disabled="dialogStatus==='create'? false : true"/>
          </el-col>
          <el-col :span="2">座位</el-col>
          <el-col :span="4">
            <el-input v-model="temp.seating"/>
          </el-col>
          <!--<el-col :span="2">油耗</el-col>-->
          <!--<el-col :span="4">-->
          <!--<el-input v-model="temp.fuelConsumption"/>-->
          <!--</el-col>-->
        </el-row>

        <el-row :gutter="16">
          <el-col :span="3">车辆识别码</el-col>
          <el-col :span="6">
            <el-input v-model="temp.vehicleIdentification" :disabled="dialogStatus==='create'? false : true"/>
          </el-col>
          <el-col :span="3">发动机号</el-col>
          <el-col :span="6">
            <el-input v-model="temp.engineNumber" :disabled="dialogStatus==='create'? false : true"/>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="2">厂牌号</el-col>
          <el-col :span="6">
            <el-input v-model="temp.brandCachet" :disabled="dialogStatus==='create'? false : true" />
          </el-col>
          <!--<el-col :span="6">-->
          <!--<el-radio-group v-model="temp.airConditioned">-->
          <!--<el-radio-button label="1">空调车</el-radio-button>-->
          <!--<el-radio-button label="2">非空调车</el-radio-button>-->
          <!--</el-radio-group>-->
          <!--</el-col>-->
        </el-row>

        <!--<el-row :gutter="16">-->
        <!--<el-col :span="2">车身长</el-col>-->
        <!--<el-col :span="5">-->
        <!--<el-input v-model="temp.busLength"/>-->
        <!--</el-col>-->
        <!--<el-col :span="2">车身宽</el-col>-->
        <!--<el-col :span="4">-->
        <!--<el-input v-model="temp.busWide"/>-->
        <!--</el-col>-->
        <!--<el-col :span="2">车身高</el-col>-->
        <!--<el-col :span="4">-->
        <!--<el-input v-model="temp.busHigh"/>-->
        <!--</el-col>-->
        <!--</el-row>-->

        <el-row :gutter="16" class="form_data_label">工作信息</el-row>

        <el-row :gutter="16">
          <!--<el-col :span="6">-->
          <!--<el-radio-group v-model="temp.operationState">-->
          <!--<el-radio-button label="0">运营中</el-radio-button>-->
          <!--<el-radio-button label="1">非运营</el-radio-button>-->
          <!--</el-radio-group>-->
          <!--</el-col>-->
          <el-col :span="3">所属公司</el-col>
          <el-col :span="4">
            <el-select v-model="temp.remarks" placeholder="请选择公司">
              <el-option label="一公司" value="一公司"/>
              <el-option label="一公司备用" value="一公司备用"/>
              <el-option label="二公司" value="二公司"/>
              <el-option label="二公司备用" value="二公司备用"/>
              <el-option label="三公司" value="三公司"/>
              <el-option label="三公司备用" value="三公司备用"/>
              <el-option label="四公司" value="四公司"/>
              <el-option label="四公司备用" value="四公司备用"/>
              <el-option label="班线公司" value="班线公司"/>
              <el-option label="办公室" value="办公室"/>
              <el-option label="后勤" value="后勤"/>
              <el-option label="警车" value="警车"/>
              <el-option label="票务" value="票务"/>
              <el-option label="维修中心" value="维修中心"/>

            </el-select>
          </el-col>
          <!--<el-col :span="3">所属路线</el-col>-->
          <!--<el-col :span="4">-->
          <!--<el-select v-model="temp.pathId" placeholder="please select your zone">-->
          <!--<el-option label="Zone one" value="1"/>-->
          <!--<el-option label="Zone two" value="2"/>-->
          <!--</el-select>-->
          <!--</el-col>-->
        </el-row>

        <!--<el-row :gutter="16">-->
        <!--<el-col :span="3">车辆类型</el-col>-->
        <!--<el-col :span="5">-->
        <!--<el-select v-model="temp.vehicleType" placeholder="please select your zone">-->
        <!--<el-option label="Zone one" value="1"/>-->
        <!--<el-option label="Zone two" value="2"/>-->
        <!--</el-select>-->
        <!--</el-col>-->
        <!--<el-col :span="6">-->
        <!--<el-radio-group v-model="temp.stationStatus">-->
        <!--<el-radio-button label="1">站外</el-radio-button>-->
        <!--<el-radio-button label="2">站内</el-radio-button>-->
        <!--</el-radio-group>-->
        <!--</el-col>-->
        <!--<el-col :span="6">-->
        <!--<el-radio-group v-model="temp.upDownStream">-->
        <!--<el-radio-button label="1">上行</el-radio-button>-->
        <!--<el-radio-button label="2">下行</el-radio-button>-->
        <!--</el-radio-group>-->
        <!--</el-col>-->
        <!--</el-row>-->

        <el-row :gutter="16" class="form_data_label">健康信息</el-row>
        <el-row :gutter="16">

          <el-col :span="3">验车时间</el-col>
          <el-col :span="6">
            <el-input v-model="temp.vehicleExamination" :disabled="dialogStatus==='create'? false : true" />
          </el-col>
        </el-row>

        <!--<el-row :gutter="16">-->
        <!--<el-col :span="3">出厂日期</el-col>-->
        <!--<el-col :span="6">-->
        <!--<el-input v-model="temp.manufactureDate" :disabled="true" />-->
        <!--</el-col>-->
        <!--<el-col :span="3">行驶公里</el-col>-->
        <!--<el-col :span="6">-->
        <!--<el-input v-model="temp.drivingKm" :disabled="true" />-->
        <!--</el-col>-->
        <!--</el-row>-->

        <!--<el-row :gutter="16">-->
        <!--<el-col :span="2">备注</el-col>-->
        <!--<el-col :span="16">-->
        <!--<el-input v-model="temp.busNote" type="textarea"/>-->
        <!--</el-col>-->
        <!--</el-row>-->


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Clean</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ dialogbutton }}
        </el-button>
      </div>
    </el-dialog>

  </div>


</template>

<script>
  import {postList, createArticle, updateArticle,deleteArticle,deleteAll} from '@/api/bus'

  export default {
    name: "index",
    data() {
      return {
        moreSelect:false,
        inputSearch: undefined,
        selectSearch: undefined,

        /*{

          "busLicense": "冀R88888",//车牌号
          "pathId": 1,//路线id
          "operationState": -1,//运营状态（0：运营中  -1：非运营）
          "remarks": "中交天枢",//所属公司
          "stationStatus": 1,//进出站状态（0：站外 1：站内）
          "upDownStream": 0,//上下行状态（0：上行  1：下行）
          "vehicleType": "城市公交"//车辆类型
          "drivingKm": 55555,//行驶公里
          "faultid": "1",//事故信息
          "vehicleExamination": "已检验",//验车信息
          "manufactureDate": "2018-10-26",//出厂日期

          "registrationNumber": 22222,//车辆登记编号
          "recordDate": "2018-10-26",//登记日期
          "seating": 40,//座位
          "fuelConsumption": "30L",//油耗
          "vehicleIdentification": "44444",//车辆识别码
          "engineNumber": 33333,//发动机号
          "brandCachet": 111111,//厂牌号
          "busLength": 11530.01,//车长
          "busWide": 2500.01,//车身宽
          "busHigh": 3040.01,//车身高
          "airConditioned": 0,//空调车标记（0：默认  1：空调车  2：非空调车）
          "busNote": "测试信息66666",//车辆备注

          "faultidl": "string",

          "gspid": 0,//经纬度id
          "stationId": 0,//站点id（0：未知）

        }*/

        listLoading: true,
        tableData: [{
          id: 1,
          busLicense: "冀R88888",//车牌号
          line: 1,//路线id
          //operationState: -1,//运营状态（0：运营中  -1：非运营）
          remarks: "中交天枢",//所属公司
          //stationStatus: 1,//进出站状态（0：站外 1：站内）
          //upDownStream: 0,//上下行状态（0：上行  1：下行）
          //vehicleType: "城市公交",//车辆类型
          //drivingKm: 55555,//行驶公里
          //faultid: 1,//事故信息
          vehicleExamination: "已检验",//验车信息
          //manufactureDate: "2018-10-26",//出厂日期

          registrationNumber: 22222,//车辆登记编号
          recordDate: "2018-10-26",//登记日期
          seating: 40,//座位
          //fuelConsumption: "30L",//油耗
          vehicleIdentification: "44444",//车辆识别码
          engineNumber: 33333,//发动机号
          brandCachet: 111111,//厂牌号
          //busLength: 11530.01,//车长
          //busWide: 2500.01,//车身宽
          //busHigh: 3040.01,//车身高
          //airConditioned: 0,//空调车标记（0：默认  1：空调车  2：非空调车）
          //busNote: "测试信息66666",//车辆备注
        }],
        multipleSelection: [],
        total: 5,
        currentPage: undefined,
        pageSize: 5,

        temp: {
          id: undefined,
          busLicense: '',
          line: undefined,

          remarks: '',

          vehicleExamination: '',


          registrationNumber: undefined,
          recordDate: '',
          seating: 0,

          vehicleIdentification: undefined,
          engineNumber: undefined,
          brandCachet: undefined,


        },
        dialogStatus: '',
        dialogFormVisible: false,
        dialogImgVisible: false,
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        querykey:'busLicense',

      }
    },
    created: function () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData();
    },
    methods: {

      resetTemp() {
        this.temp = {
          id: undefined,
          busLicense: '',
          line: undefined,

          remarks: '',

          vehicleExamination: '',


          registrationNumber: undefined,
          recordDate: '',
          seating: 0,

          vehicleIdentification: undefined,
          engineNumber: undefined,
          brandCachet: undefined,

        }
      },

      onSubmitAdd() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogbutton = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },

      dbClickRow(val) {
        /*this.temp.licensePath = val.licensePath;
        this.temp.healthPath = val.healthPath;*/
        this.dialogImgVisible = true
        this.$nextTick(() => {
          this.$refs['imgForm'].clearValidate()
        })
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.fetchData();
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.fetchData();
      },

      toggleSelection(rows) {

        if(rows){

          if (rows.length > 0) {

            this.$confirm('此操作将删除'+ rows.length +'条信息, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {


              deleteAll(rows).then((res) => {

                this.multipleSelection = [];
                this.moreSelect = false;
                this.fetchData()

                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch((res) => {

                this.$message({
                  type: 'warning',
                  message: res.message
                });
              })


            }).catch(() => {

              this.$message({
                type: 'info',
                message: '取消删除'
              });
            });





          }else {
            this.multipleSelection = [];
          }

        }else {
          this.$refs.multipleTable.clearSelection();
          this.moreSelect = false;
        }


      },
      handleSelectionChange(val) {
        this.moreSelect = true;
        this.multipleSelection = [];
        for(var v in val){
          this.multipleSelection.push(val[v].id)
        }

        //this.multipleSelection = val;
        //this.fetchData();
        // console.log(`当前页: ${val}`);
      },


      callbackFunction(result) {
        alert(result + "aaa");
      },
      onSubmitSearch() {
        if(this.selectSearch == undefined) {
          this.$notify({
            title: '警告',
            message: '请选择查询条件',
            type: 'warning',
            duration: 2000
          })
        }else if(this.inputSearch == undefined){
          this.$notify({
            title: '警告',
            message: '请填写查询内容',
            type: 'warning',
            duration: 2000
          })
        }else {
          this.fetchData()
        }
      },

      onSubmitClear(){
        this.currentPage = undefined
        this.selectSearch = undefined
        this.inputSearch = undefined
        this.fetchData()
      },

      fetchData() {
        this.listLoading = true
        postList(this.currentPage, this.pageSize,this.selectSearch,this.inputSearch).then(response => {
          this.listLoading = false
          this.total = response.result.total;
          this.currentPage = response.result.current;
          this.tableData = response.result.records;
        })
      },


      createData() {
        createArticle(this.temp).then((res) => {
          if (res.code == "000") {
            this.temp.id = res.result
            this.tableData.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }else {
            this.$notify({
              title: '失败',
              message: '创建失败',
              type: 'error',
              duration: 4000
            })
          }
        })
      },

      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        //this.temp.timestamp = new Date(this.temp.timestamp)
        /*this.imageFaceUrl = row.photoPath;
        this.imageCardUrl = row.licensePath;
        this.imageMedicalUrl = row.healthPath;*/
        this.dialogbutton = 'update'
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },

      updateData() {
        updateArticle(this.temp).then((res) => {
          if (res.code == "000") {
            for (const v of this.tableData) {
              if (v.id === this.temp.id) {
                const index = this.tableData.indexOf(v)
                this.tableData.splice(index, 1, this.temp)
                break
              }
            }
            //this.tableData.splice(index, 1,this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
          }else {
            this.$notify({
              title: '失败',
              message: '创建失败',
              type: 'error',
              duration: 4000
            })
          }
        })
      },

      handleDelete(row) {
        deleteArticle(row.id).then((res) => {
          if (res.code == "000") {
            const index = this.tableData.indexOf(row)
            this.tableData.splice(index, 1)
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          }else {
            this.$notify({
              title: '失败',
              message: '创建失败',
              type: 'error',
              duration: 4000
            })
          }
        })

        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },

      /*handleAvatarSuccess(res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageFaceUrl = res.result.url;
        this.temp.photoPath = res.result.url;
      },
      handleAvatarSuccess1(res, file) {

        console.log(res)
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageCardUrl = res.result.url;
        this.temp.licensePath = res.result.url
      },
      handleAvatarSuccess2(res, file) {

        console.log(res)
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageMedicalUrl = res.result.url;
        this.temp.healthPath = res.result.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },*/

    }
  }
</script>

<style scoped>

  .form_data_label{
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid #d3dce6;
  }
  .el-row {
    margin: 20px;
  }
  .el-col {
    line-height: 36px;
  }
  .el-row-left {
    margin-left: 20px;
    margin-top: 20px;
    margin-right: 20px;
  }

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .input-with-select select {
    width: 120px;
  }
  .deleteAllButton {
    margin: 0px;
    padding: 0px;
    width: 120px;
  }

</style>
