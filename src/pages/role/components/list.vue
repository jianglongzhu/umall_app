<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180"></el-table-column>
      <el-table-column label="状态" sortable width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary" size="mini">启用</el-button>
          <el-button v-else type="primary" size="mini" disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqRoleDel } from "../../../utils/http";
import { isDel, successAlert, infoAlert } from "../../../utils/alert";
import {Del}  from "../../../utils/puMethod"
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    // 删除
    del(id) {
      Del( reqRoleDel,id,this);
     /*  isDel()
        .then(() => {
          reqRoleDel(id).then((res) => {
            if (res.data.code == 200) {
              successAlert("删除成功");
              this.$emit("init");
            }
          });
        })
        .catch(() => {
          infoAlert("已取消删除");
        }); */
    },
    // 编辑
    edit(id){
       this.$emit("edit",id)
    }
  },
};
</script>

<style>
</style>