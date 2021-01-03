<template>
  <div class="box">
    <el-dialog :title="addcon.isAdd?'轮播图添加':'轮播图编辑'" :visible.sync="addcon.isshow">
      <el-form :model="form" :rules="rules" v-if="addcon.isshow">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
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

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
            <el-switch
              v-model="form.status"
              active-color="#409EFF"
              inactive-color="#C0CCDA"
              :active-value="1"
              :inactive-value="2"
            >></el-switch>
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
import {
  reqBannerAdd,
  reqBannerInfo,
  reqBannerUpdata,
} from "../../../utils/http";
import { successAlert, infoAlert, errAlert } from "../../../utils/alert";
export default {
  props: ["addcon", "list"],
  data() {
    return {
      routePath,
      dialogTableVisible: false,
      dialogFormVisible: true,
      imageUrl: "http://localhost:3000null",
      form: {
        title: "",
        img: null,
        status: 2,
      },
      formLabelWidth: "120px",
      icons: ["el-icon-s-tools", "el-icon-camera-solid", "el-icon-s-shop"],
      value: "100",
         rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
      }
    };
  },
  methods: {
    // 图片路径处理及图片大小处理
    beforeAvatarUpload(file) {
      let index = file.name.lastIndexOf(".");
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
    cancel() {
      this.$emit("cancel");
    },
    //清空
    empty() {
      (this.form = {
        title: "",
        img: null,
        status: 2,
      }),
        (this.imageUrl = "http://localhost:3000null");
    },
    check() {
      return new Promise((resolve) => {
        if (this.form.title === "") {
          errAlert("请输入标题");
          return;
        }
        if (this.imageUrl === "http://localhost:3000null") {
          errAlert("请插入图片");
          return;
        }
        resolve();
      });
    },
    //添加
    add() {
      this.check().then(() => {
        reqBannerAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            successAlert(res.data.msg);
            this.empty();
            this.$emit("init");
          }
        });
      });
    },
    //获取一条的信息
    getInfo(id){
      reqBannerInfo(id).then((res) => {
        console.log(res.data.list);
        if (res.data.code==200) {
          res.data.list.id = id;
          this.form = res.data.list;
          this.imageUrl = this.$pre + res.data.list.img;
        }
      });
    },
    //编辑
    edit(){
      this.check().then(() => {
        reqBannerUpdata(this.form).then((res) => {
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

<style scoped lang="stylus">
.box >>> .el-upload {
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