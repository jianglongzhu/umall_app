<template>
  <div>
    <div class="box">
      <div class="con">
        <h2 class="center">登录</h2>
        <div class="inps center">
          <el-input placeholder="请输入用户名" v-model="user.username" clearable></el-input>
        </div>
        <div class="inps center">
          <el-input placeholder="请输入密码"  show-password v-model="user.password"></el-input>
        </div>
        <div class="center inps">
          <el-button type="primary">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data(){
        return{
          user:{
            username:"",
            password:""
          }
        }
    },
   

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
h2{
    margin-top:20px;
    font-weight:bold
}
.center {
  text-align: center;
}
.inps{
    margin: 20px;
}
.el-input,.el-button--primary{
    width:75%;
}
</style>