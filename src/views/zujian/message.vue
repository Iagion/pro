<template>
  <div class="container">
    <div class="avator" v-if="avator_state">
        <el-upload
          class="avatar-uploader"
          action="https://www.chengzier.cn:8000/api/changesuperavator"
          name="avator"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :auto-upload="false"
          :before-upload="beforeAvatarUpload"
          ref="upload"
          :headers="headers"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button class="upload_avatar" @click="upload">提交</el-button>
      </div>
    <div class="email" v-if="email_state">
     <div style="margin: 20px;"></div>
     <el-form :label-position="labelPosition">
       <el-form-item label="邮箱号">
         <el-input v-model="name"></el-input>
         <el-button @click="emailCaptcha">发送验证码</el-button>
       </el-form-item>
       <el-form-item label="验证码">
         <el-input v-model="Captcha"></el-input>
       </el-form-item>
       <div class="btn">
           <el-button @click="emailConfim">确认</el-button>
           <el-button @click="cancel">取消</el-button>
       </div>
     </el-form>
  </div>
  <div class="password" v-if="password_state">
     <div style="margin: 20px;"></div>
     <el-form :label-position="labelPosition">
       <el-form-item label="旧密码">
         <el-input v-model="oldPassword"></el-input>
         <el-button @click="passwordCaptcha">发送验证码</el-button>
       </el-form-item>
       <el-form-item label="新密码">
         <el-input v-model="newPassword"></el-input>
       </el-form-item>
       <div class="btn">
           <el-button @click="passwordConfirm">确认</el-button>
           <el-button @click="cancel">取消</el-button>
       </div>
     </el-form>
  </div>
  </div>
</template>
<script>
import { emailCaptcha, emailbind, passwordCaptcha } from '@/api/user'
export default {
    data(){
        return{
            imageUrl: "",
            headers: {
                Authorization: ""
            },
            labelPosition: 'right',
                name: '',
                Captcha: '',
                oldPassword:'',
                newPassword:''
        }
    },
    props:{
        "avator_state":Boolean,
        "email_state":Boolean,
        "password_state":Boolean
    },
    methods:{
        upload() {
          this.headers["Authorization"] = "Bearer " + this.$store.state.token;
          this.$refs.upload.submit();
          this.$emit('avator_state')
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          console.log(this.imageUrl);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === "image/jpeg";
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error("上传头像图片只能是 JPG 格式!");
          }
          if (!isLt2M) {
            this.$message.error("上传头像图片大小不能超过 2MB!");
          }
          return isJPG && isLt2M;
        },
        cancel(){
          if(this.email_state){
            this.$emit('email_state')
          }else if(this.password_state){
            this.$emit('password_state')
          }
        },
        async emailCaptcha(name){
            const res = await emailCaptcha(name)
            console.log(res);
        },
        async emailConfim(){
          const res = await emailbind()
          this.$emit('email_state')
          console.log(res);
        },
        async passwordCaptcha(){
          const res = await passwordCaptcha()
          console.log(res);
        },
        passwordConfirm(){
          this.$emit('password_state')
        },
    }
}
</script>
<style>
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.container {
  display: flex;
}
.btn{
  display: flex;
  justify-content:space-between;
}
.avator,.email,.password{
    width: 300px;
    margin: 100px auto;

}
.upload_avatar{
    margin-left: 50px;
}
</style>