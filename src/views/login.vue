<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref='userForm' :model="user" status-icon :rules="rules">
        <div class="title">xx管理系统</div>
        <el-form-item prop="user_name">
          <el-input type="text" prefix-icon="el-icon-user" v-model="user.user_name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-view" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'login',
  data(){
    return {
      user: {
        user_name: '',
        password: '',
      },
      rules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: blur}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: blur}
        ]
      }
    }
  },
  methods: {
    login(){
      this.$refs.userForm.validate(async (valid) => {
        if(valid){
          let params = {
            ...this.user
          }
          let res = await api.login(params)
          window.localStorage.setItem('token', res.token)
          this.$router.push({
            path: '/'
          })
        } 
      })
    }
  }

}
</script>

<style lang="scss">
.login-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal{
    width: 500px;
    padding: 50px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title{
      font-size: 50px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login{
      width: 100%;
    }
  }
}
</style>