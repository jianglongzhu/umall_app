<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#333"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in list.menus" :key="item.id">
            <el-menu-item v-if="!item.children" :index="item.url">{{item.title}}</el-menu-item>
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            <span class="usernames">{{list.username}}</span>
            <el-button type="primary" size="mini" @click="exitLogin">退出登录</el-button>
          </div>
        </el-header>
        <!-- 二级路由出口 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reqMenuList } from "../../utils/http";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      MenuList: [],
    };
  },
  mounted() {
    this.changelist();
    console.log(this.list);
  },
  computed: {
    ...mapGetters({
      list: "list",
    }),
  },
  methods: {
    ...mapActions({
      changelist: "changelist",
    }),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 退出登录
    exitLogin() {
      //清除用户信息
      this.changelist({});
      this.$router.push("/login");
    },
  },
  mounted() {
    reqMenuList().then((res) => {
      this.MenuList = res.data.list;
    });
  },
};
</script>

<style scoped>
.el-aside {
  height: 100vh;
  background-color: #333;
}
.el-header {
  background-color: #ccc;
}
.el-menu {
  height: 100vh;
}
.con {
  margin-top: 20px;
}
.left{
  float: right;
  padding-top:15px;
}
.usernames {
  font-size: 22px;
}
</style>