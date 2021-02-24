<template>
  <div class="login">
    <el-tabs
      v-model="activeName"

      type="card"
      class="login-tabs"
      style="margin: 0"
    >
      <el-tab-pane
        label="登录"
        name="login"
        stretch="true"
        style="padding: 10px 20px"
      >
        <!-- <el-card class="login-card"> -->
        <div class="login-card">
          <div class="logo">
            <img src="../../assets/logo_index.png" alt="" />
          </div>
          <el-form
            ref="loginForm"
            :rules="loginRules"
            :model="loginForm"
            style="margin-top: 20px"
          >
            <el-form-item prop="mobile">
              <el-input
                v-model="loginForm.mobile"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                v-model="loginForm.code"
                placeholder="请输入验证码"
                style="width: 280px"
              ></el-input>
              <el-button style="float: right">发送验证码</el-button>
            </el-form-item>
            <el-form-item prop="check">
              <el-checkbox v-model="loginForm.check"
                >我已阅读并同意用户协议和隐私条款</el-checkbox
              >
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- </el-card> -->
      </el-tab-pane>
      <el-tab-pane label="注册" name="register" style="padding: 10px 20px">
        <div class="register-card">
          <div class="logo">
            <img src="../../assets/logo_index.png" alt="" />
          </div>
          <el-form
            ref="registerForm"
            :rules="registerRules"
            :model="registerForm"
            style="margin-top: 20px"
          >
            <el-form-item prop="mobile">
              <el-input
                v-model="registerForm.mobile"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="name">
              <el-input
                v-model="registerForm.name"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                v-model="registerForm.code"
                placeholder="请输入验证码"
                style="width: 280px"
              ></el-input>
              <el-button style="float: right">发送验证码</el-button>
            </el-form-item>
            <el-form-item prop="check">
              <el-checkbox v-model="registerForm.check"
                >我已阅读并同意用户协议和隐私条款</el-checkbox
              >
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="register"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    const validator = function (rule, value, cb) {
      if (value) {
        cb();
      } else {
        cb(new Error("必须同意"));
      }
    };
    return {
      activeName: "login",
      loginForm: {
        mobile: "",
        code: "",
        check: "",
      },
      registerForm: {
        mobile: "",
        code: "",
        check: "",
        name:""
      },
      loginRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[23456789]\d{9}$/,
            message: "手机号格式不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式不正确",
          },
        ],
        check: [
          {
            validator,
          },
        ],
      },
       registerRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[23456789]\d{9}$/,
            message: "手机号格式不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式不正确",
          },
        ],
        check: [
          {
            validator,
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: "/authorizations",
            method: "post",
            data: this.loginForm,
          }).then((result) => {
            window.localStorage.setItem("user-token", result.data.token);
            // console.log(result.data.data.token);
            console.log(result);
            this.$router.push("/home");
          });
        } else {
          alert("发送失败");
        }
      });
    },
    register(){
      this.$refs.registerForm.validate((isOK)=>{
        if(isOK){
          this.$axios({
            url:'/register',
            method:'post',
            data:this.registerForm,
          }).then((result)=>{
              // console.log(result);
              window.localStorage.setItem('user-token',result.data.token);
              this.$router.push('/home');
          })
        }else{
          alert('发送失败')
        }
      })
    }
  },
};
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-tabs {
    // width: 440px;
    // height: 400px;
    background-color: white;
    // padding: 10px 20px;
    border-radius: 5px;
    .login-card {
      width: 440px;
      height: 300px;
      .logo {
        text-align: center;
        img {
          height: 40px;
        }
      }
    }
    .register-card {
      width: 440px;
      height: 360px;
      .logo {
        text-align: center;
        img {
          height: 40px;
        }
      }
    }
  }
}
</style>