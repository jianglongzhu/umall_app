<template>
  <div>
    <el-dialog :title="addcon.isAdd?'角色添加':'角色编辑'" :visible.sync="addcon.isshow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="rolePer"
            show-checkbox
            node-key="id"
            ref="tree"
            default-expand-all
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ data}">
              <span>{{data.title }}</span>
            </span>
          </el-tree>
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
import { reqRoleAdd, reqRoleInfo, reqRoleUpdata } from "../../../utils/http";
import { infoAlert, successAlert, errAlert } from "../../../utils/alert";
export default {
  props: ["addcon", "rolePer"],
  data() {
    return {
      form: {
        rolename: "",
        menus: [],
        status: "",
      },
      formLabelWidth: "120px",
      value: "100",
    };
  },
  methods: {
    // 清空
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: "",
      };
    },
    // 设置角色权限
    setCK(arr) {
      this.form = this.$refs.tree.setCheckedKeys(arr);
    },
    // 表单验证
    check() {
      return new Promise((resolve) => {
        if (this.form.rolename == "") {
          errAlert("请填写角色名称");
          return;
        }
        if (this.$refs.tree.getCheckedKeys().length < 1) {
          errAlert("请选择角色权限");
          return;
        }
        resolve();
      });
    },
    // 添加
    add() {
      this.check().then(() => {
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            // 清空选中的角色权限
            this.setCK([]);
            this.$emit("cancel");
            successAlert("添加成功");
            this.empty();
            this.$emit("init");
          }
        });
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    // 获取角色的信息
    getInfo(id) {
      reqRoleInfo(id).then((res) => {
        if (res.data.code == 200) {
          // 设置角色权限
          this.setCK(JSON.parse(res.data.list.menus));
          this.form = res.data.list;
          this.form.id = id;
        }
      });
    },
    // 修改
    updata() {
      this.check().then(() => {
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleUpdata(this.form).then((res) => {
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