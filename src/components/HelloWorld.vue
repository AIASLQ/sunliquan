<template>
  <div class="demo">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="search" >
          <el-form-item label="一级类别">
            <el-select v-model="classify" clearable filterable @change="mainSelectChange" placeholder="一级类别">
              <el-option v-for="item in selectData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="listData" v-loading="fullscreenLoading" :header-cell-class-name="tableHeaderStyle" :cell-style="tableHeaderStyleCenter"element-loading-text="拼命加载中" border >
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="title" label="标题" min-width="150"></el-table-column>
        <el-table-column prop="" label="创建时间" min-width="150">
          <template scope="scope">
            <div>{{ scope.row.created_time | filterIime }}</div>
          </template>

        </el-table-column>
        <el-table-column prop="content" label="内容" min-width="150"></el-table-column>
        <el-table-column   label="一级类别" min-width="150"></el-table-column>
        <el-table-column   label="二级类别" min-width="150"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import {
    // 数据列表接口
    getCurrentUserInfo,tableDataList
} from "@/api/demo";
import { formatTime } from "@/utils/index";


export default {
  name: 'demo',
  data () {
    return {
      search: {
        type: null,
      },
      selectData:[],//下拉选数据集合
      classify:null,//下拉选选 选中数据
      listData: [],//table表格数据
      fullscreenLoading: false,//加载等待
    }
  },
  methods: {
    // 下拉选change事件
    mainSelectChange(val) { 
      if(!val){
        return false;
      }
      this.fullscreenLoading = true;
      tableDataList([val]).then(response=>{
        if(response.code == 200){
         this.listData = response.data;
         this.fullscreenLoading = false;
        }else{
          this.$message.info(response.msg);
          this.fullscreenLoading = false;
          // 此处为接口请求失败，后台返回错误信息提示
        }  
      }).catch(error => {
         this.fullscreenLoading = false;
      }); 
    },
    // 页面初始加载
    readerData() { 
      getCurrentUserInfo().then(response=>{
        if(response.code == 200){
         this.selectData = response.data; 
        }else{
          this.$message.info(response.msg); 
          // 此处为接口请求失败，后台返回错误信息提示
        } 
      }).catch(error => { });
    },

    tableHeaderStyle({row,rowIndex}){
      return 'table-th'

    },
    tableHeaderStyleCenter({row,column,rowIndex,columnIndex}){
      return 'text-align:center'
    },
    //时间处理
    
  },
  beforCreate() {

  },
  create() {

  },
  beforeMount() {

  },
  mounted() {
    this.readerData()

  },
  beforeDestory() {

  },
  destroyed() {

  },
  filters:{
    filterIime(val){
    return formatTime(val)
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .table-th{
  text-align: center !important;
 }
</style>