<template>
  <div>
    <el-table
      :data="manlist"
      style="width:100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="title" label="活动名称" sortable></el-table-column>
      <el-table-column label="状态" sortable >
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary" size="mini">启用</el-button>
          <el-button v-else type="primary" size="mini" disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqSekillDel } from "../../../utils/http";
import { isDel, successAlert, infoAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  mounted() {
    this.reqlist();
  },
  // 获取管理员列表数据
  computed: {
    ...mapGetters({
      manlist: "seskill/list",
      
    }),
  },
  methods: {
    // 请求管理员列表
    ...mapActions({
      reqlist: "seskill/reqList",
    }),
    del(id) {
      isDel()
        .then(() => {
          reqSekillDel(id).then((res) => {
            if (res.data.code == 200) {
              successAlert("删除成功");
              this.reqlist();
            } else {
              infoAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          infoAlert("已取消删除");
        });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>
.block {
  float: right;
}
.guige {
  display: flex;
}
.gucon {
  
  height: 25px;
  background-color: rgb(237, 249, 253);
  border: 1px solid rgb(215, 237, 245);
  border-radius: 5px;
  margin-right: 5px;
  color: rgb(62, 84, 180);
}
img{
    width:100px;
    height:100px;
}
</style>