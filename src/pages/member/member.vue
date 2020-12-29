<template>
  <div>
    <v-list
      @init="init"
      :manlist="manlist"
      @edit="edit"
    ></v-list>
    <v-add :addcon="addcon"  @cancel="cancel" @init="init" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import {  reqMemberList} from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      addcon: {
        isshow:false,
      },
      manlist: [],
    };
  },
  methods:{
    cancel() {
      this.addcon.isshow = false;
    },
    edit(id) {
      this.addcon.isshow = true;
      this.$refs.add.getinfo(id);
    },
    getList() {
      reqMemberList().then((res) => {
        if (res.data.code == 200) {
          this.manlist = res.data.list;
        }
      });
    },
    init() {
      this.getList();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>