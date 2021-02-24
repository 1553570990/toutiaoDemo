<template>
  <el-row class="layout-header" type="flex" justify="space-between">
      <el-col class="left" :span="6">
          <i class="el-icon-s-unfold icon"></i>
          <span>哈尔滨市布卡科技有限公司</span>
      </el-col>
      <el-col class="right" :span="3">
          <!-- 用户头像 -->
            <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="" class="head-img">
            <el-dropdown trigger="click" @command="handleMenuItem">
                <span class="el-dropdown-link">
                    {{userInfo.name}} <i class="el-icon-arrow-down el-icon-s--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="account">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
      </el-col>
  </el-row>
</template>

<script>
 import {getUserInfo_axios} from '../../api/home.js'
 import eventBus from '../../utils/events'
export default {
   
    data(){
        return{
            userInfo:{
                
            },
            defaultImg:require('../../assets/avatar.jpg')
        }
    },
    methods:{
        handleMenuItem(command){
            if(command === 'account'){
                console.log(123);
            }else if(command === 'git'){
                window.location.href = 'https://github.com/1553570990/toutiaoDemo'
            }else{
                window.localStorage.clear();
                this.$router.push('/login');
            }
        },
        async getUserInfo(){
            const result = await getUserInfo_axios()
            this.userInfo = result.data;

        }
    },
    created(){
        eventBus.$on('updateUserInfo',()=>{
            this.getUserInfo();
        })
        this.getUserInfo()
    }
}
</script>

<style lang='less' scoped>
    .layout-header{
  padding: 8px 0 ;
  .left{
    .icon{
      font-size: 22px;
      margin-right: 5px;
    }
  }
  .right{
    display: flex;
    align-items: center;
    .head-img{
      border-radius: 50%;
      margin-right: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>