<template>
  <div>
    <div>
      <el-button type="primary" size="mini" @click="add">添加</el-button>
      <!-- 引入商品列表 -->
      <v-list :list="list" @init="init" @edit="edit"></v-list>
      <v-add :addcon="addcon" :rolePer="rolePer" @cancel="cancel" @init="init" ref="add"></v-add>
    </div>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqRoleList, reqMenuList } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      list: [],
      addcon: {
        isshow:false,
        isAdd:true
      },
      rolePer: [],
    };
  },
  methods: {
    add(){
      if(this.addcon.isAdd==false){
         this.$refs.add.empty();
      }
      this.addcon.isAdd=true;
      this.addcon.isshow=true;
    },
    init() {
      reqRoleList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    cancel(){
      this.addcon.isshow=false;
    },
    // 编辑
    edit(id){
       this.addcon.isAdd=false
       this.addcon.isshow=true;
       this.$refs.add.getInfo(id)
    }
  },
  mounted() {
    this.init();
    reqMenuList().then((res) => {
      if (res.data.code == 200) {
        this.rolePer = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>