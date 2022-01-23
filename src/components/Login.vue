<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单登录区 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFromRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="btns">
          <!-- <el-button type="primary" @click="loginWX">登录微信</el-button>
          <el-button type="primary" @click="login2">登录2</el-button> -->
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //   表单验证规则对象
      loginFromRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        // eslint-disable-next-line no-useless-return
        // if (!valid) return
        // const { data: res } = await this.$http.post('login', this.loginForm)
        // if (res.meta.status !== 200) return this.$message.error('登录失败！')
        // this.$message.success('登录成功！')
        // console.log(res)
        // window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },

      login2 () {
      this.$refs.loginFormRef.validate(async valid => {
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        const res = await axios({
        method: 'get',
        url: 'api/cgi-bin/token?grant_type=client_credential&appid=wxf2bf6ec6395716fe&secret=2d0f93777934f157832817e1d0e7c160'
      })
        if (res.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功！')
        console.log(res)
        window.sessionStorage.setItem('access_token', res.data.access_token)
        this.$router.push('/home')
      })
    },
    loginWX () {
      // eslint-disable-next-line no-undef
      axios({
        method: 'get',
        url: 'api/cgi-bin/token?grant_type=client_credential&appid=wxf2bf6ec6395716fe&secret=2d0f93777934f157832817e1d0e7c160'
      }).then(res => {
        console.log(res)
      })
      console.log(111)
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
