<template>
  <div>
    <el-dialog :title="addcon.isAdd?'菜单添加':'菜单编辑'" :visible.sync="addcon.isshow" >
      <el-form :model="form"  :rules="rules" v-if="addcon.isshow">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item v-if="form.type==2" label="菜单地址" :label-width="formLabelWidth" prop="url">
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option v-for="i in routePath" :key="i.path" :label="i.path" :value="i.path"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单图标" :label-width="formLabelWidth">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option :label="item" v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
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
        <el-button v-else type="primary" @click="edit">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { routePath } from "../../../router";
import { reqMenuAdd, reqMenuInfo, reqMenuUpdate } from "../../../utils/http";
import { successAlert, errAlert } from "../../../utils/alert";
export default {
  props: ["addcon", "list"],
  data() {
    return {
      routePath,
      dialogTableVisible: false,
      dialogFormVisible: true,
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 2,
      },
      formLabelWidth: "120px",
      icons: ["el-icon-s-tools", "el-icon-camera-solid", "el-icon-s-shop"],
      value: "100",
      rules: {
          title: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' }
          ],
          pid: [
            { required: true, message: '请选择上级菜单', trigger: 'change' }
          ],
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    empty() {
      this.form = {
        pid: " ",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 2,
      };
    },
    // 表单验证
    check() {
      return new Promise((resolve) => {
        // 验证
        if (this.form.title == "") {
          errAlert("请填写菜单名称");
          return;
        }
        if (this.form.pid === "") {
          errAlert("请选择上级菜单");
          return;
        }
        resolve();
      });
    },
    add() {
      this.check().then(() => {
        reqMenuAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            successAlert(res.data.msg);
            this.empty();
            this.$emit("init");
          }
        });
      });
    },
    getInfo(id) {
      reqMenuInfo(id).then((res) => {
        if (res.data.code == 200) {
          res.data.list.id = id;
          this.form = res.data.list;
        }
      });
    },
    edit() {
      this.check().then(() => {
        reqMenuUpdate(this.form).then((res) => {
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