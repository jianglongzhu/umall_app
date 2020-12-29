<template>
  <div>
    <el-button type="primary" size="mini" @click="add()">添加</el-button>
    <!-- 引入商品列表 -->
    <v-list :list="menuList" @init="init" @edit="edit($event)"></v-list>
    <v-add :addcon="addcon" :list="menuList" @cancel="cancel" @init="init" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqMenuList } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      menuList: [],
      addcon: {
        isshow: false,
        isAdd:true
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 点击添加按钮
    add(){
      if(this.addcon.isAdd==false){
        this.$refs.add.empty();
      }
      this.addcon.isAdd=true;
      this.addcon.isshow = true;
    },
    edit(id){
      this.addcon.isshow=true;
      this.addcon.isAdd=false;
      this.$refs.add.getInfo(id);
    },
    cancel(){
      this.addcon.isshow = false;
    },
    init() {
      // 请求菜单列表
      reqMenuList().then((res) => {
        this.menuList = res.data.list;
      });
    },
  },
};
</script>

<style>
</style>