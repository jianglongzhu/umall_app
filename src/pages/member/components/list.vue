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
      <el-table-column prop="nickname" label="昵称" sortable width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180"></el-table-column>
      <el-table-column label="状态" sortable width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary" size="mini">启用</el-button>
          <el-button v-else type="primary" size="mini" disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { isDel, successAlert, infoAlert } from "../../../utils/alert";
import {Del}  from "../../../utils/puMethod"
export default {
  props: ["manlist"],
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
  },

    
};
</script>

<style scoped>
.block{
  float: right;
}
</style>