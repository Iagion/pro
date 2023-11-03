<template>
  <div>
    <subject
     v-if="add_state || edit_state" 
     @add_state="add_state_subject" @edit_state="edit_state_subject"
     :add_state="add_state" :edit_state="edit_state"
     :edit_edit = 'edit_edit'
     :title = 'title'
     >
      <template v-slot:add>
        <div>确认添加</div>
      </template>
      <template v-slot:edit>
        <div>确认修改</div>
      </template>
    </subject>
    <div class="time">
      <el-date-picker v-model="start_time" type="date" placeholder="选择日期" class="start_time"></el-date-picker>
      <el-date-picker v-model="end_time" type="date" placeholder="选择日期" class="end_time"></el-date-picker>
      <el-button @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <el-button type="primary" @click="add_state_subject">新增课程</el-button>
    <el-table :data="list">
    <el-table-column label="编号" width="200">
      <template slot-scope="scope"><span>{{ scope.row.id }}</span></template>
    </el-table-column>
    <el-table-column label="课程名字" width="250">
      <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
    </el-table-column>
    <el-table-column label="创建时间" width="300">
      <template #default="{row}"><span>{{ new Date(row.create_time).toLocaleString() }}</span></template>
    </el-table-column>
    <el-table-column label="修改时间" width="300">
      <template #default="{row}"><span>{{ new Date(row.update_time).toLocaleString() }}</span></template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="edit_state_subject(scope.row.id,scope.row.name)">编辑</el-button>
        <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="page">
    <el-pagination 
    @size-change="handleSizeChange" 
    @current-change="handleCurrentChange" 
    :current-page="currentPage" 
    :page-sizes="[4, 6, 8, 10]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper" 
    :total="total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
import subject from "@/views/zujian/subject"
import { getClass, delClass } from '@/api/subject'
import Vue from'vue'
export default {
  data () {
    return {
      list:[],
      add_state: false,
      edit_state: false,
      edit_edit:{},
      start_time:null,
      end_time:null,
      currentPage:1,
      cloneList:[],
      pageSize:4,
      title:'课程'
    }
  },
  components: {
    subject
  },
  async created(){
    const {data:{data}} = await getClass()
    this.$store.commit('subject/writeList',data)
    this.list = data
    this.cloneList = this.list
    this.list = this.cloneList.slice(0,4)
  },
  computed:{
    total(){
      return this.cloneList.length
    }
  },
  methods: {
    reload(){
      Vue.nextTick(() =>{
        this.getClass()
      })
    },
    async getClass(){
      const {data:{data}} = await getClass()
      this.list = data
      
    },
    async add_state_subject() {
      this.add_state = !this.add_state
      const {data:{data}} = await getClass()
      this.$store.commit('subject/writeList',data)
      this.list = data
      this.cloneList = this.list
      this.list = this.list.slice(0,this.pageSize)
    },
    async del(id){
      await delClass(id)
      if(this.list.length === 1){
        this.currentPage--
      }
      const {data:{data}} = await getClass()
      this.$store.commit('subject/writeList',data)
      this.list = data
      this.cloneList = this.list
      this.list = this.cloneList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    async edit_state_subject(id,name){
      this.edit_edit.pk = id
      this.edit_edit.name = name
      this.edit_state = !this.edit_state
      const {data:{data}} = await getClass()
      this.$store.commit('subject/writeList',data)
      this.list = data
      this.cloneList = this.list
      this.list = this.cloneList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    search(){
      let startTime = new Date(this.start_time).getTime()
      let endTime = new Date(this.end_time).getTime()
      let newArr = this.$store.state.subject.list.filter(item => {
        let create_time = new Date(item.create_time).getTime()
        if(create_time >= startTime && create_time <= endTime){
          return true
        }
      })
      this.cloneList = newArr
      this.list = this.cloneList.filter((item,index) =>{
        if(index < this.pageSize){
          return true
        }
      })
    },
    async reset(){
      this.start_time = null
      this.end_time = null
      // const {data:{data}} = await getClass()
      // this.$store.commit('subject/writeList',data)
      // this.list = data
      this.cloneList = this.$store.state.subject.list
      this.list = this.cloneList.slice(0,this.pageSize)
      this.currentPage = 1
    },
    handleSizeChange(val) {
      this.list = this.cloneList.slice(0, val)
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.list = this.cloneList.slice((val - 1) * this.pageSize, val * this.pageSize)
      this.currentPage = val
    }
  }
};
</script>
<style>
.time{
  margin-bottom: 20px;
}
.start_time,.end_time{
  margin-right: 20px;
}
.page{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>