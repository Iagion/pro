<template>
  <div>
    <h3 style="text-align: center;">个人信息页面</h3>
    <message
    v-if="avator_state || email_state || password_state"
    @avator_state="avatorState" 
    :avator_state="avator_state"
    @email_state="emailState" 
    :email_state="email_state"
    @password_state="passwordState"
    :password_state="password_state"
    ></message>
    <div class="box">
        <el-button @click="avatorState">更改头像</el-button>
        <el-button @click="emailState">邮箱绑定</el-button>
        <el-button @click="passwordState">密码变更</el-button>
    </div>
  </div>
</template>
<script>
import message from '@/views/zujian/message'
export default {
  data() {
    return {
      avator_state:false,
      email_state:false,
      password_state:false
    };
  },
  components:{
    message
  },
  methods: {
    avatorState(){
      this.avator_state = !this.avator_state
    },
    emailState(){
      this.email_state = !this.email_state
    },
    passwordState(){
      this.password_state = !this.password_state
    }
  }
};
</script>
<style scoped lang="scss">
.box{
  position: fixed;
  top: 20%;
  left: 45%;
  display: flex;
  justify-content: space-between;
}
</style>>