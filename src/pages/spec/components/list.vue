<template>
  <div>
    <el-table
      :data="manlist"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180"></el-table-column>
      <el-table-column prop="attrs" label="规格属性" sortable width="180">
        <div class="guige" slot-scope="scope">
          <div class="gucon" v-for="item in JSON.parse(scope.row.attrs)" :key="item">{{item}}</div>
        </div>
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
import { reqSpeDel } from "../../../utils/http";
import { isDel, successAlert, infoAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  mounted() {
    this.reqlist();
    this.reqtotal();
  },
  // 获取管理员列表数据
  computed: {
    ...mapGetters({
      manlist: "spec/list",
      size: "spec/size",
      pagetotal: "spec/pageTotal",
    }),
  },
  methods: {
    // 请求管理员列表
    ...mapActions({
      reqlist: "spec/reqList",
      reqtotal: "spec/reqTotal",
      changePage: "spec/changePages",
    }),
    del(id) {
      isDel()
        .then(() => {
          reqSpeDel(id).then((res) => {
            if (res.data.code == 200) {
              successAlert("删除成功");
              this.reqlist();
              this.reqtotal();
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
    // 当前页码数
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.changePage(val);
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
  /* width:10px; */
  height: 25px;
  background-color: rgb(237, 249, 253);
  border: 1px solid rgb(215, 237, 245);
  border-radius: 5px;
  margin-right: 5px;
  color: rgb(62, 84, 180);
}
</style>