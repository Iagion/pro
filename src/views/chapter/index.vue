<template>
  <div class="chapter">
    <div class="tree">
      <el-tree :data="data" @node-click="handleNodeClick"></el-tree>
    </div>
    <subject
     v-if="addChapter_state || editChapter_state" 
     @addChapter_state="addChapter_state_chapter" @editChapter_state="editChapter_state_chapter"
     :addChapter_state="addChapter_state" :editChapter_state="editChapter_state"
     :edit_edit = 'edit_edit'
     :title = 'title'
     :chapter_edit_id='editId'
     :chapter_add_id='addId'
     :reload="reload_id"
     @reload="reload"
     >
      <template v-slot:addChapter>
        <div>确认添加</div>
      </template>
      <template v-slot:editChapter>
        <div>确认修改</div>
      </template>
    </subject>
    <div class="table" style="width:80%">
    <el-button type="primary" @click="addChapter_state_chapter">新增课程</el-button>
      <el-table :data="list" style="width: 100%">
      <el-table-column label="编号" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名字" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="260">
        <template #default="{row}">
          <span>{{ new Date(row.create_time).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="230">
        <template #default="{row}">
          <span>{{ new Date(row.update_time).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editChapter_state_chapter(scope.row.id,scope.row.name)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
import subject from "@/views/zujian/subject"
import { getClass } from "@/api/subject";
import { getChapter, addChapter, editChapter, delChapter } from "@/api/chapter";
export default {
  data() {
    return {
      data: [],
      list: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      addChapter_state:false,
      editChapter_state:false,
      title:'章节',
      edit_edit:{},
      reload_id:Number,
      editId:Number,
      addId:Number
    };
  },
  components: {
    subject
  },
  async created() {
    let list = this.$store.state.subject.chapterList
    if (!list) {
      const res = await getClass();
      this.$store.commit("chapter/writeChapter", res.data.data);
      list = res.data.data;
    }
    list.forEach(item => {
      this.data.push({
        label: item.name,
        id: item.id
      });
      
    });
    const res = await getChapter(this.data[0].id);
    this.reload_id = this.data[0].id
    this.list = res.data.data;
  },
  methods: {
    async handleNodeClick(data) {
      const res = await getChapter(data.id);
      this.$store.commit('chapter/writeChapter',res.data.data)
      this.reload_id = data.id
      this.list = res.data.data;
    },
    async reload(){
      const res = await getChapter(this.reload_id)
      this.list = res.data.data;
    },
    addChapter_state_chapter(chapter_id){
      this.addId = chapter_id
      this.addChapter_state = !this.addChapter_state
    },
    editChapter_state_chapter(id,name){
      this.editId = id
      this.editChapter_state = !this.editChapter_state
    },
    async del(id){
      const res = await delChapter(id)
      this.reload()
    },
  },
};
</script>
<style>
.el-main{
  padding: 0;
  border-top: 1px solid #000;
}
.chapter {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.tree{
  width: 20%;
  height: 100%;
  box-sizing:border-box;
  overflow-y:auto;
  border-right: 1px solid #000;
}
.tree::-webkit-scrollbar-thumb{
  background-color:rgba(0, 0, 0, .3);
}
.tree::-webkit-scrollbar{
  display: none;
  width: 5px;
  height: 5px;
}
.tree::-webkit-scrollbar-track{
  background-color: #fff;
}
</style>