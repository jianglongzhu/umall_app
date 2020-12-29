<template>
  <div>
    <el-dialog :title="addcon.isAdd?'用户添加':'用户编辑'" :visible.sync="addcon.isshow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option v-for="i in rolelist" :key="i.id" :label="i.rolename" :value="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
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
        <el-button type="primary" v-if="addcon.isAdd" @click="add">确 定</el-button>
        <el-button v-else type="primary" @click="updata">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqManAdd, reqManInfo, reqManUpdata } from "../../../utils/http";
import { successAlert, errAlert } from "../../../utils/alert";
export default {
  props: ["addcon", "rolelist"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: "",
      },
      formLabelWidth: "120px",
      value: "100",
    };
  },
  methods: {
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: "",
      };
    },
    cancel() {
      this.$emit("cancel");
    },
    // 验证表单
    check() {
      return new Promise((resolve) => {
        if (this.form.roleid == "") {
          errAlert("请选择所属角色");
          return;
        }

        if (this.form.username == "") {
          errAlert("请填写用户名");
          return;
        }

        if (this.form.password == "") {
          errAlert("请填写密码");
          return;
        }
        resolve();
      });
    },
    add() {
      this.check().then(() => {
        reqManAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            successAlert("添加成功");
            this.empty();
            this.$emit("init");
          } else {
            errAlert(res.data.msg);
          }
        });
      });
    },
    getinfo(id) {
      reqManInfo(id).then((res) => {
        if (res.data.code == 200) {
          // 清空密码
          res.data.list.password = "";
          this.form = res.data.list;
          this.form.uid = id;
        }
      });
    },
    updata() {
      this.check().then(() => {
        reqManUpdata(this.form).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            successAlert("修改成功");
            this.$emit("init");
          }
        });
      });
    },
  },
};
</script>

<style>
</style>