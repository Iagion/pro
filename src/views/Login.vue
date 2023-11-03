<template>
  <div class="mask">
    <div class="container">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="text">
            <el-input maxlength="4" v-model="ruleForm.text" style="width: 80%;"></el-input>
            <img @click="replaceCodeImg" :src="url" class="text_img">
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
import { v4 as uuid } from 'uuid'
import { login } from '@/api/user'
import cookie from 'js-cookie'
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        if (/\w{6,12}/g.test(value)) {
          callback()
        } else {
          callback(new Error('用户名错误'))
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
        if (/\w{6}/g.test(value)) {
          callback()
        } else {
          callback(new Error('密码错误'))

        }
      };
      var checkText = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }
        if (/\w{4}/g.test(value)) {
          callback()
        } else {
          callback(new Error('验证码错误'))
        }
      };
    return {
      ruleForm: {
        username: '',
        password: '',
        text: ''
      },
      url: '',
      uid: null,
      timer: 0,
      rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          text: [
            { validator: checkText, trigger: 'blur' }
          ]
        }
      };
  },
  created(){
    this.generateCodeImg()
    this.Set_clear()
  },
  methods:{
    generateCodeImg(){
        this.uid = uuid()
        this.url = `https://www.chengzier.cn:8000/api/generateimagecode?uuid=${this.uid}`
    },

    Set_clear(){
        this.timer = setInterval(() => {
        this.generateCodeImg()
        },1000 * 60)
    },

    replaceCodeImg() {
        clearInterval(this.timer)
        this.Set_clear()
        this.generateCodeImg()
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      // $refs 获取标签
        this.$refs[formName].validate(async(valid) => {
          // let obj = Object.assign({uuid: this.uid}, this.ruleForm)
          if (valid) {
            //正则过了 发请求 登录
            try {
              const { data } = await login(Object.assign({uuid: this.uid}, this.ruleForm))
              console.log(data)
              if(data.status == 'error'){
                this.$message.error(data.msg)
              } else {
                // 存储到cookie
                cookie.set('id',data.token, {
                  expires: 1
                })
                //存储到Vuex
                this.$store.commit('writeToken',data.token)
                //跳转到首页
                this.$message({
                  message:'登陆成功',
                  type:'success',
                });
                this.$router.push('/')
              }
            }catch(err){
              this.$message.error('登录异常，请重试')
            }
          } else {
            return false
          }
        });
      },
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container{
    width: 600px;
    border-radius: 5px;
    background-color: #fff;
    padding: 40px 40px 20px 0;
}
.text_img{
    width:20%;
    height: 40px;
    position: absolute;
}
</style>