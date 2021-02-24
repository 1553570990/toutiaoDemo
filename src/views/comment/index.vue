<template>
  <el-card v-loading="loading">
    <bread-crumb>
      <template slot="title">评论管理</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column label="标题" prop="title" width="700"></el-table-column>
      <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button size="samll" type="text" @click="openOrClose(obj.row)">{{
            obj.row.comment_status ? "关闭评论" : "打开评论"
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin: 10px 0">
      <!--      分页插件   current-page  当前页码每页显示多少条    @current-change 实际上就是一个方法   page-size    total 总数-->
      <el-pagination
        @current-change="changePage"
        :current-page="page.page"
        :page-size="page.pageSize"
        :total="page.total"
        background
        layout="prev,pager,next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import { getComments_axios } from "../../api/comment.js";
import { openOrClose_comment } from "../../api/comment.js";
export default {
  data() {
    return {
      loading: false,
      list: [
        {
          title: "",
          comment_status: "",
          total_comment_count: "",
          fans_comment_count: "",
        },
      ],
      page: {
        page: 1,
        pageSize: 4,
        total: 0,
      },
    };
  },
  methods: {
      formatter(row){
        return row.comment_status ? "正常" :"关闭"
      },
    async getComments() {
      this.loading = true;
      let result = await getComments_axios({
        response_type: "comment",
        page: this.page.page,
        per_page: this.page.pageSize,
      });
    //   console.log(result);
      this.loading = false;
      this.list = result.results;
      this.page.total = result.total_count;
      //   console.log(this.list);
    },
    async openOrClose(row){
        const mess = row.comment_status ? "关闭":"打开"
        await this.$confirm(`是否要${mess}评论`,"提示");
        await openOrClose_comment({article_id:row.id},{allow_comment:!row.comment_status})
        this.getComments()
    },
    changePage(newPage) {
        this.page.page = newPage;
        this.getComments();
    },
  },
  created() {
    this.getComments();
  },
};
</script>

<style>
</style>