<template>
  <div class="mask">
    <div class="newAdd">
      <el-form>
        <el-form-item :label="title" style="color: blue;">
          <input v-model="name" v-focus>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="add(name)" v-if="add_state">
                <slot name="add"></slot>
              </el-button>
            <el-button type="primary" @click="edit" v-if="edit_state">
                <slot name="edit"></slot>
              </el-button>
              <el-button type="primary" @click="addChapter(name)" v-if="addChapter_state">
                <slot name="addChapter"></slot>
              </el-button>
            <el-button type="primary" @click="editChapter(name)" v-if="editChapter_state">
                <slot name="editChapter"></slot>
              </el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { addClass,editClass } from '@/api/subject'
import { addChapter, editChapter } from '@/api/chapter'
export default {
  data() {
    return {
        name: ""
    }
  },
    props:{
        "add_state":Boolean,
        "edit_state":Boolean,
        "edit_edit":Object,
        "title":'',
        "addChapter_state":Boolean,
        "editChapter_state":Boolean,
        "reload":'',
        "chapter_edit_id":'',
        "chapter_add_id":''
    },
  methods:{
    async add(){
        const res = await addClass(this.name)
        this.$emit('add_state')
    },
    cancel(){
        if(this.add_state){
            this.$emit('add_state')
        }else if(this.edit_state){
            this.$emit('edit_state')
        }else if(this.addChapter_state){
          this.$emit('addChapter_state')
        }else if(this.editChapter_state){
          this.$emit('editChapter_state')
        }
    },
    async edit(){
        this.edit_edit.name = this.name
        const res = await editClass(this.edit_edit)
        this.$emit('edit_state')
    },
    async addChapter(name){
      const res = await addChapter(this.reload,name)
      this.cancel()
      this.$emit('reload')
    },
    async editChapter(name){
      const res = await editChapter(this.chapter_edit_id,name)
      this.cancel()
      this.$emit('reload')
    }
  }
}
</script>
<style>
.newAdd {
  position: absolute;
  top: 20%;
  left: 50%;
  width: fit-content;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
.mask{
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background-color:rgba(0, 0, 0, 0.4);
}
input{
    width: 170px;
    height: 30px;
    line-height: 30px;
    outline: none;
}
</style>