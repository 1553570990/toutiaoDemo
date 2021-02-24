<template>
  <el-card class="material">
    <bread-crumb>
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-upload
      class="upload-btn"
      :show-file-list="false"
      :http-request="uploadImg"
    >
      <el-button size="small" type="primary">上传图片</el-button>
    </el-upload>
    <!-- tab -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="" />
            <el-row
              class="operate"
              type="flex"
              justify="space-around"
              align="middle"
            >
              <i @click="collectOrCancel(item)" class="el-icon-star-on" :style="{color:item.is_collected?'red':''}"></i>
              <i @click="delImg(item)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="changePage"
            :current-page="page.page"
            :page-size="page.pageSize"
            :total="page.total"
            layout="prev,pager,next"
            background
          >
          </el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="" />

          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="changePage"
            :current-page="page.page"
            :page-size="page.pageSize"
            :total="page.total"
            layout="prev,pager,next"
            background
          >
          </el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>

export default {
  data() {
    return {
      activeName: "all",
      page: {
        page: 1,
        pageSize: 2,
        total: 0,
      },
      list: [],
    };
  },
  methods: {
    uploadImg(parmas) {
      //   console.log(parmas);
      const obj = new FormData();
      obj.append("image", parmas.file);
      this.$axios({
        url: "/user/images",
        method: "post",
        data: obj,
      }).then(() => {
        // console.log(result);
        this.getMaterial();
      });
    },
    changeTab() {
      this.page.page = 1;
      this.getMaterial();
    },
    delImg(item){
        this.$confirm('确定要删除此素材吗？',"提示").then(()=>{
            this.$axios({
                url:`/user/images/${item.id}`,
                method:'delete'
            }).then(()=>{
                this.getMaterial();
            })
        })
    },
    collectOrCancel(item){
        const mess = item.is_collected ? '取消':'';
         this.$confirm(`确定要${mess}收藏这个素材吗？`)
         this.$axios({
            url:`/user/images/${item.id}`,
            method:'put',
            data:{
                collect:!item.is_collected
            }
        }).then(()=>{
            this.getMaterial()
        })
    },
    getMaterial() {
      this.$axios({
        url: "/user/getImages",
        params: {
          page: this.page.page, //第几页默认第一页
          per_page: this.page.pageSize, //每页几条
          collect: this.activeName === "collect",
        },
      }).then((result)=>{
        //   console.log(result);
        this.list = result.data.results;
        this.page.total = result.data.total_count;
        // console.log(this.list);
      });
    },
    changePage(newPage) {
        this.page.page = newPage;
        this.getMaterial();
    },
  },
  created() {
    this.getMaterial();
  },
};
</script>

<style lang='less' scoped>
.material {
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .img-card {
    width: 180px;
    height: 180px;
    margin: 30px;
    position: relative;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .operate {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 30px;
    font-size: 18px;
    background-color: #f4f5f6;
  }
}
</style>