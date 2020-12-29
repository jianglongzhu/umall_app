<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180"></el-table-column>
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
import { reqGoodDel } from "../../../utils/http";
import { successAlert, isDel, infoAlert, errAlert } from "../../../utils/alert";
import {Del}  from "../../../utils/puMethod"
import {mapActions,mapGetters}  from "vuex"
export default {
  mounted(){
    this.reqlist()
  },
  computed:{
    // 获取分类列表的数据
    ...mapGetters({
        list:"cate/list"
    })
  },
  methods: {
    //请求分类列表
    ...mapActions({
       reqlist:"cate/reqList"
    }),
    // 删除
    del(id) {
     isDel()
        .then(() => {
          reqGoodDel(id).then((res) => {
            if (res.data.code == 200) {
              successAlert("删除成功");
              this.reqlist();
              
            }else{
               infoAlert(res.data.msg)
            }
          });
        })
        .catch(() => {
          infoAlert("已取消删除");
        });
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