<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="addcon.isshow">
      <el-form :model="form">
          <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
            <el-switch
              v-model="form.status"
              active-color="#409EFF"
              inactive-color="#C0CCDA"
              :active-value="1"
              :inactive-value="2"
            ></el-switch>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updata">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {reqMemberInfo, reqMemberUpdata } from "../../../utils/http";
import { successAlert, errAlert } from "../../../utils/alert";
export default {
  props: ["addcon",],
  data() {
    return {
      form: {
        uid: 1,
        nickname: "",
        phone:"",
        password: "",
        status:1,
      },
      formLabelWidth: "120px",
      value: "100",
    };
  },
  methods: {
    empty() {
      this.form = {
         uid: 1,
        nickname: "",
        phone:"",
        password: "",
        status:1,
      };
    },
    cancel() {
      this.$emit("cancel");
    },
    getinfo(id) {
      reqMemberInfo(id).then((res) => {
        if (res.data.code == 200) {
          // 清空密码
          res.data.list.password=''
          this.form = res.data.list;
          this.form.uid = id;
        }
      });
    },
    updata() {
      reqMemberUpdata(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          successAlert("修改成功");
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>