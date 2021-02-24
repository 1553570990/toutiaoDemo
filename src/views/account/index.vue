<template>
<el-card v-loading="loading">
  <bread-crumb slot="header">
    <template slot="title">
      账户信息
    </template>
  </bread-crumb>
  <el-upload :http-request="uploadHeadImg" :show-file-list="false">
    <img :src="userInfo.photo || defaultImg" class="head-image" alt="">
  </el-upload>

  <el-form ref="userForm" :model="userInfo" :rules="userRules" label-width="100px">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="userInfo.name" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="intro">
      <el-input v-model="userInfo.intro" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userInfo.email" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="userInfo.mobile" style="width: 300px" disabled></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="saveUserInfo" type="primary">保存</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>
<script>
import eventBus from '../../utils/events'
export default {
  data() {
    return {
      loading:false,
      defaultImg:require('../../assets/avatar.jpg'),
      userInfo: {
        name: "",
        intro: "",
        email: "",
        photo: "",
        mobile: "",
      },
        userRules: {
        name: [{
          required: true,
          message: '用户名不能为空'
        }, {
          min: 2,
          max: 8,
          message: '用户名长度必须为2-8位'
        }],
        email: [{
          pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
          message: '邮箱格式不正确'
        }]
      }
    };
  },
  methods:{
    uploadUserImg(params){
      this.loading = true;
      const data = new FormData();
      data.append('photo',params.file);
      this.$axios({
        url:'/user/photo',
        method:'patch',
        data
      }).then(()=>{
        eventBus.$emit('updateUserInfo')
        this.getUserInfo();
      })
    },
    getUserInfo(){
      this.$axios({
        url:'/user/profile',
      }).then((result)=>{
        this.userInfo = result.data
      })
    },
    saveUserInfo(){
      // console.log(123);
      this.$refs.userForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.userInfo
          }).then(()=>{
            eventBus.$emit('updateUserInfo');
          })
        }
      })
    }
  },
  created(){
    this.getUserInfo();
  }
};
</script>

<style>
  .head-image{
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-left: 500px;
  }
</style>