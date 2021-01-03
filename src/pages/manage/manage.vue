<template>
  <div>
    <el-button type="primary" size="mini" @click="add">添加</el-button>
    <v-list
      @init="init"
      :manlist="manlist"
      @edit="edit"
      @pagechange="pagechange"
      :pagetotal="pagetotal"
      :size="size"
    ></v-list>
    <v-add :addcon="addcon" :rolelist="rolelist" @cancel="cancel" @init="init" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqManTotal, reqManList, reqRoleList } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      addcon: {
        isshow: false,
        isAdd: true,
      },
      rolelist: [],
      manlist: [],
      size: 3,
      page: 1,
      pagetotal: 0,
    };
  },
  methods: {
    add() {
      if (this.addcon.isAdd == false) {
        this.$refs.add.empty();
      }
      this.addcon.isAdd = true;
      this.addcon.isshow = true;
    },
    cancel() {
      this.addcon.isshow = false;
    },
    edit(id) {
      this.addcon.isAdd = false;
      this.addcon.isshow = true;
      this.$refs.add.getinfo(id);
    },
    getList() {
      console.log(this.size, this.page);
      reqManList({ size: 3, page: this.page }).then((res) => {
        if (res.data.code == 200) {
            /*
            如果删除了最后一页的最后一条，那么当前页就会收到空数据；这个时候如果有上一页的话，就应该取上一页
           */
          if (res.data.list.length == 0 && this.page > 1) {
            this.page--;
            this.getList();
            return;
          }
          this.manlist = res.data.list;
        }
      });
    },
    init() {
      this.getList();
      reqManTotal().then((res) => {
        if (res.data.code == 200) {
          this.pagetotal = res.data.list[0].total;
        }
      });
    },
    // 改变页面的页码
    pagechange(val) {
      this.page = val;
      this.getList();
    },
  },
  mounted() {
    this.init();
    reqRoleList().then((res) => {
      if (res.data.code == 200) {
        this.rolelist = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>