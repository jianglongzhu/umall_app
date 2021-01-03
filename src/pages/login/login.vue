<template>
  <div>
    <div class="box">
      <div class="con">
        <h2 class="center">登录</h2>
        <el-form :model="user" :rules="rules" label-width="80px">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="user.username" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" show-password v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {reqLogin}  from "../../utils/http"
import {errAlert}  from "../../utils/alert"
import {mapActions,mapGetters} from "vuex"
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed:{
    ...mapGetters({
        list:"list"
    })
  },
  methods:{
    ...mapActions({
        changelist:"changelist"
    }),
    check(){
      return new Promise((resolve)=>{
        if(this.user.username===""){
             errAlert("请输入用户名")
             return;
        }
        if(this.user.password===""){
            errAlert("请输入密码")
            return;
        }
        resolve();
      })
    },
    login(){
      this.check().then(()=>{
           reqLogin(this.user).then((res)=>{
               if(res.data.code==200){
                   this.changelist(res.data.list);
                   this.$router.push("/")
               }
           })
      })
    }
  }
};
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #533445, #48384e, #323c5d);
}
.con {
  width: 400px;
  height: 260px;
  background-color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
h2 {
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.center {
  text-align: center;
}
.inps {
  margin: 20px;
}
.el-input,
.el-button--primary {
  width: 75%;
}
</style>