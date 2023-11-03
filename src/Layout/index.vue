<template>
  <el-container>
  <el-aside width="auto">

    <el-menu :collapse="collapse"
     router :default-active="path" class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/darshboard">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/classfiy">
        <i class="el-icon-document"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/chapter">
        <i class="el-icon-setting"></i>
        <span slot="title">章节管理</span>
      </el-menu-item>
      <el-menu-item index="/View">
        <i class="el-icon-setting"></i>
        <span slot="title">视频管理</span>
      </el-menu-item>
      <el-menu-item index="/userInfo">
        <i class="el-icon-setting"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
      <Header @switch_menu="change" :collapse="collapse"></Header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import Header from './Header'
export default {
  components: {
    Header
  },
  data () {
    return {
      path: '/darshboard'
    }
  },
  computed:{
    collapse(){
      return this.$store.state.isCollapse
    }
  },
  watch: {
    $route(newValue){
      document.title = newValue.meta.title
    }
  },
  created () {
    this.path = this.$route.path
  },
  methods:{
    change () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style>
  html,body,#app,.el-container,.el-menu {
    height: 100%;
  }
  .el-header{
    padding: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>