<template>
  <div>
    <el-dialog :title="addcon.isAdd?'规格添加':'规格编辑'" :visible.sync="addcon.isshow">
      <el-form :model="form" :rules="rules" v-if="addcon.isshow">
        <el-form-item label="规格名称" :label-width="formLabelWidth" prop="specsname">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <div class="new">
            <el-input class="newput" v-model="att" autocomplete="off"></el-input>
            <el-button type="primary" @click="addAtt">新增规格属性</el-button>
          </div>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item,index) in arr"
          :key="item"
        >
          <div class="new">
            <el-input class="newputs" :value="item" autocomplete="off" disabled></el-input>
            <el-button type="danger" size="mini" @click="delAtt(index)">删除</el-button>
          </div>
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
import { reqSpeAdd, reqSpeInfo, reqSpeUpdate } from "../../../utils/http";
import { successAlert, errAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["addcon"],
  data() {
    return {
      form: {
        id: "",
        specsname: "",
        attrs: "",
        status: 1,
      },
      att: "",
      arr: [],
      formLabelWidth: "120px",
      value: "100",
        rules: {
          specsname: [
            { required: true, message: '请输入规格名称', trigger: 'blur' }
          ],
      }
    };
  },
  methods: {
    ...mapActions({
      reqlist: "spec/reqList",
      reqtotal: "spec/reqTotal",
      changePage: "spec/changePages",
    }),
    // 新增规格属性
    addAtt() {
      if (this.arr.indexOf(this.att) !== -1) {
        errAlert("已经添加过此属性");
        this.att = "";
        return;
      }
      if (this.att === "") {
        errAlert("请填写属性");
        return;
      }
      this.arr.push(this.att);
      this.att = "";
    },
    delAtt(index) {
      this.arr.splice(index, 1);
    },
    empty() {
      this.form = {
        id: "",
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.arr=[]
    },
    cancel() {
      this.$emit("cancel");
    },
    // 表单验证
    check() {
      return new Promise((resolve) => {
        if (this.form.specsname === "") {
          errAlert("请输入规格名称");
          return;
        }
        if (this.arr.length == 0) {
          errAlert("请填写规格属性");
          return;
        }
        resolve();
      });
    },
    add() {
      this.check().then(() => {
        this.form.attrs = JSON.stringify(this.arr);
        delete this.form["id"];
        reqSpeAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            successAlert("添加成功");
            this.empty();
            this.reqlist();
            this.reqtotal();
          } else {
            errAlert(res.data.msg);
          }
        });
      });
    },
    getinfo(id) {
      reqSpeInfo(id).then((res) => {
        if (res.data.code == 200) {
          let JSattrs = JSON.parse(res.data.list[0].attrs);
          res.data.list[0].attrs = JSattrs;
          this.form = res.data.list[0];
          this.form.uid = id;
          this.arr = this.form.attrs;
        }
      });
    },
    updata() {
      this.check().then(() => {
        this.form.attrs = JSON.stringify(this.arr);
        reqSpeUpdate(this.form).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            successAlert("修改成功");
            this.reqlist();
            this.reqtotal();
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.new {
  display: flex;
  margin-bottom: 10px;
}
.newput {
  width: 80%;
}
.newputs {
  width: 90%;
}
</style>