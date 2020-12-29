<template>
  <div>
    <el-button type="primary" size="mini" @click="add()">添加</el-button>
    <!-- 引入商品列表 -->
    <v-list  @edit="edit($event)"></v-list>
    <v-add :addcon="addcon"  @cancel="cancel"  ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import {mapActions,mapGetters}  from "vuex"
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      addcon: {
        isshow: false,
        isAdd:true
      },
    };
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
  },
};
</script>

<style>
</style>