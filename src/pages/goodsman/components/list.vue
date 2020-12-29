<template>
  <div>
    <el-table
      :data="manlist"
      style="width:100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号" sortable></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable></el-table-column>
      <el-table-column prop="price" label="商品价格" sortable></el-table-column>
      <el-table-column prop="market_price" label="市场价格" sortable></el-table-column>
      <el-table-column label="图片" sortable width="180">
           <template slot-scope="scope">
          <img v-if="scope.row.img" class="UPimgs" :src="$pre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="是否新品" sortable>
        <template slot-scope="scope">
          <el-button v-if="scope.row.isnew==1" type="primary" size="mini">是</el-button>
          <el-button v-else type="danger" size="mini" disabled>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="attrs" label="是否热卖" sortable >
        <template slot-scope="scope">
          <el-button v-if="scope.row.ishot==1" type="primary" size="mini">是</el-button>
          <el-button v-else type="danger" size="mini" disabled>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" sortable width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary" size="mini">启用</el-button>
          <el-button v-else type="primary" size="mini" disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
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
import { reqGMamDel } from "../../../utils/http";
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
      manlist: "goodsman/list",
      size: "goodsman/size",
      pagetotal: "goodsman/pageTotal",
    }),
  },
  methods: {
    // 请求管理员列表
    ...mapActions({
      reqlist: "goodsman/reqList",
      reqtotal: "goodsman/reqTotal",
      changePage: "goodsman/changePages",
    }),
    del(id) {
      isDel()
        .then(() => {
          reqGMamDel(id).then((res) => {
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