<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img v-if="scope.row.img" class="UPimgs" :src="$pre+scope.row.img" alt="">
        </template>
      </el-table-column>
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
import { reqBannerDel } from "../../../utils/http";
import { successAlert, isDel, infoAlert, errAlert } from "../../../utils/alert";
import {Del}  from "../../../utils/puMethod"
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    // 删除
    del(id) {
      Del(reqBannerDel,id,this)
    },
    // 修改编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>
.UPimgs{
  width:100px;
  height:100px;
}
</style>