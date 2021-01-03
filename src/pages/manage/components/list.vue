<template>
  <div>
    <el-table
      :data="manlist"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180"></el-table-column>
      <el-table-column label="状态" sortable width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary" size="mini">启用</el-button>
          <el-button v-else type="primary" size="mini" disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="size"
        layout="prev, pager, next"
        :total="pagetotal"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {  reqManDel } from "../../../utils/http";
import { isDel, successAlert, infoAlert } from "../../../utils/alert";
import {Del}  from "../../../utils/puMethod"
export default {
  props: ["manlist","pagetotal","size"],
  methods: {
    del(id) {
       Del(reqManDel,id,this)
    },
    edit(id) {
      this.$emit("edit", id);
    },
    // 当前页码数
    handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      this.$emit("pagechange", val);
    },
  },

    
};
</script>

<style scoped>
.block{
  float: right;
}
</style>