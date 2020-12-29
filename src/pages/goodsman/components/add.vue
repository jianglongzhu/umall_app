<template>
  <div class="box">
    <el-dialog :title="addcon.isAdd?'商品添加':'商品修改'" :visible.sync="addcon.isshow" @opened="opened">
      {{form}}
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="changefirst">
            <el-option label="---请选择---" value disabled></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid">
            <el-option label="---请选择---" value disabled></el-option>
            <el-option
              v-for="item in secondcate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="form.pid!==0" label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl!=='http://localhost:3000null'" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" @change="changeSpec">
            <el-option label="---请选择---" value disabled></el-option>
            <el-option
              v-for="item in speclist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="---请选择---" value disabled></el-option>
            <el-option v-for="item in specsattrs" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </template>
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
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor" v-if="addcon.isshow"></div>
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
import {
  reqGManAdd,
  reqGoodList,
  reqGManUpdate,
  reqGManinfo,
} from "../../../utils/http";
import { successAlert, errAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import E from "wangeditor";
export default {
  props: ["addcon"],
  data() {
    return {
      imageUrl: "http://localhost:3000null",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      formLabelWidth: "120px",
      value: "100",
      secondcate: [],
      specsattrs: [],
    };
  },
  mounted() {
    this.reqcatelist();
    this.reqspeclist(true);
  },
  computed: {
    ...mapGetters({
      catelist: "cate/list",
      speclist: "spec/list",
    }),
  },
  methods: {
    ...mapActions({
      reqcatelist: "cate/reqList",
      reqspeclist: "spec/reqList",
      reqGmanlist: "goodsman/reqList",
      reqtotal: "goodsman/reqTotal",
    }),
    // 创建富文本编辑器
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      ``;
      //赋值
      this.editor.txt.html(this.form.description);
    },
    //一级分类选择,改变二级分类的选项
    changefirst() {
      //改变之前先清除选框里面的数据
      (this.form.second_cateid = ""),
        reqGoodList({ pid: this.form.first_cateid }).then((res) => {
          if (res.data.code == 200) {
            this.secondcate = res.data.list;
          }
        });
    },
    // 商品规格改变后规格属性的的改变
    changeSpec() {
      let con = this.speclist.find((item) => {
        return item.id == this.form.specsid;
      });
      if (con) {
        con.attrs = JSON.parse(con.attrs);
        this.specsattrs = con.attrs;
      }
    },
    // 图片路径处理及图片大小处理
    beforeAvatarUpload(file) {
      let index = file.name.lastIndexOf(".");
      console.log(file);
      let con = file.name.slice(index);
      let arr = [".jpg", ".gif", ".jpeg", ".png"];
      // 1M=1024KB    1KB=1024B
      if (!arr.includes(con)) {
        errAlert("请上传图片");
        if (!file.size >= 2 * 1024 * 1024) {
          errAlert("请上传小于2M的图片");
          return;
        }
        return;
      }
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imageUrl="http://localhost:3000null"
    },
    cancel() {
      this.$emit("cancel");
    },
    add() {
      // 取出富文本的编辑器的内容，赋值给form
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGManAdd(data).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          successAlert("添加成功");
          this.empty();
          this.reqGmanlist();
          this.reqtotal();
        } else {
          errAlert(res.data.msg);
        }
      });
    },
    getinfo(id) {
      console.log(id);
      reqGManinfo(id).then((res) => {
        if (res.data.code == 200) {
          // 把商品规格属性转换为对象数组形式
          let JSattrs = JSON.parse(res.data.list.specsattr);
          res.data.list.specsattr = JSattrs;
          //  把结果赋值给form表单
          this.form = res.data.list;
          //   给form表单添加id
          this.form.id = id;
          //   给图片路径赋值
          this.imageUrl = this.$pre + res.data.list.img;
          this.specsattrs = this.form.specsattr;
          reqGoodList({ pid: this.form.first_cateid }).then((res) => {
            if (res.data.code == 200) {
              this.secondcate = res.data.list;
            }
          });

          //给富文本编辑器赋值
          if (this.editor) {
            this.editor.txt.html(this.form.description);
          }
        }
      });
    },
    updata() {
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGManUpdate(data).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          successAlert("修改成功");
          this.reqGmanlist();
          this.reqtotal();
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.box >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>