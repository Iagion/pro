<template>
  <div class="header">
    <div @click="switch_menu">
      <i :class="classList"></i>
    </div>
    <div style="position:relative">
      <i class="el-icon-plus" @click="state = !state" ></i>
      <div class="mask" @click="cancel" v-if="state"></div>
        <div class="container" v-if="state">
          <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="btn">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </div>
            </el-form-item>
          </el-form>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
            <el-avatar :size="size" :src="url"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user-solid">{{username}}</el-dropdown-item>
          <el-dropdown-item icon="el-icon-message">{{ email }}</el-dropdown-item>
          <el-dropdown-item icon="el-icon-phone-outline">{{phone}}</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button" @click.native="Exit()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import cookie from "js-cookie";
import store from "@/store";
import { generateAccount } from "@/api/user"
export default {
  data() {
    return {
      size: "medium",
      classList: {
        "el-icon-s-fold": true,
        "el-icon-s-unfold": false,
        switch: true
      },
      ruleForm: {
        username: ""
      },
      state:false
    };
  },
  computed: {
    url() {
      return this.$store.state.userProfile.avatar;
    },
    email() {
      return this.$store.state.userProfile.email;
    },
    username() {
      return this.$store.state.userProfile.username;
    },
    phone() {
      return this.$store.state.userProfile.phone
        ? this.$store.state.userProfile.phone
        : "未输入手机号";
    }
  },
  props: {
    isCollapse: {
      // required:true,
      // type:Boolean,
      default() {
        return false;
      }
    }
  },
  created() {
    if (this.$store.state.isCollapse) {
      this.classList["el-icon-s-fold"] = !this.classList["el-icon-s-fold"];
      this.classList["el-icon-s-unfold"] = !this.classList["el-icon-s-unfold"];
    }
  },
  methods: {
    switch_menu() {
      this.$store.commit("reWriteIsCollapse");
      this.classList["el-icon-s-fold"] = !this.classList["el-icon-s-fold"];
      this.classList["el-icon-s-unfold"] = !this.classList["el-icon-s-unfold"];
    },
    Exit() {
      cookie.remove("id");
      store.commit("clear");
      this.$router.replace("/login");
    },
    cancel(){
      this.state = false
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.state = false

    },
    async submitForm(formName) {
      const res = await generateAccount(this.$store.state.token,this.username)
      console.log(res);
      this.state = false
    }
  }
};
</script>

<style scoped>
.header {
  height: 60px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.switch {
  font-size: 28px;
  cursor: pointer;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-plus {
  font-size: 30px;
  cursor: pointer;
  margin-right: 40px;
  position: absolute;
  top: 10%;
  right: 60%;
}
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.container{
    width: 300px;
    border-radius: 5px;
    background-color: #fff;
    padding: 20px 20px 20px 0;
    position: fixed;
    top:50%;
    right:50%;
    transform: translate(60%,-50%);
    z-index: 999;
}
.btn{
  display: flex;
  justify-content: space-between;
}
</style>