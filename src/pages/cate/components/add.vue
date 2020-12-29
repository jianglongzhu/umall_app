<template>
  <div class="box">
    <el-dialog :title="addcon.isAdd?'商品分类添加':'商品分类编辑'" :visible.sync="addcon.isshow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid" >
            <el-option label="---请选择---" value="" disabled></el-option>
            <el-option label="顶级分类" :value="0" ></el-option>
            <div v-for="item in list" :key="item.id">
              <el-option :label="item.catename" :value="item.id"></el-option>
              <el-option v-for="i in item.children" :key="i.id" :label="i.catename" :value="i.id"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
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
import { reqGoodAdd, reqGoodInfo, reqGoodUpdata } from "../../../utils/http";
import { successAlert,infoAlert,errAlert } from "../../../utils/alert";
import {mapActions,mapGetters}  from "vuex"
export default {
  props: ["addcon"],
  data() {
    return {
      routePath,
      dialogTableVisible: false,
      dialogFormVisible: true,
      imageUrl: "http://localhost:3000null",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 2,
      },
      formLabelWidth: "120px",
      icons: ["el-icon-s-tools", "el-icon-camera-solid", "el-icon-s-shop"],
      value: "100",
    };
  },
  computed:{
    // 获取列表数据
    ...mapGetters({
      list:"cate/list"
    })
  },
  methods: {
    // 请求列表数据
    ...mapActions({
       reqlist:"cate/reqList"
    }),
    // 图片路径处理及图片大小处理
    beforeAvatarUpload(file) {
      let index=file.name.lastIndexOf('.')
      console.log(file)
      let con=file.name.slice(index)
      let arr=['.jpg','.gif','.jpeg','.png']
      // 1M=1024KB    1KB=1024B
      if(!arr.includes(con)){
        errAlert("请上传图片")
        if(!file.size>=2*1024*1024){
           errAlert("请上传小于2M的图片")
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
        pid: 0,
        catename: "",
        img: null,
        status: 2,
      }),
        (this.imageUrl = "http://localhost:3000null");
    },
    //添加
    add() {
      reqGoodAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          successAlert(res.data.msg);
          this.empty();
          this.reqlist();
        }
      });
    },
    //获取一条的信息
    getInfo(id) {
      reqGoodInfo(id).then((res) => {
        console.log(res.data.list);
        if (res.data.code == 200) {
          res.data.list.id = id;
          this.form = res.data.list;
          this.imageUrl = this.$pre + res.data.list.img;
        }
      });
    },
    //编辑
    edit() {
      reqGoodUpdata(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          successAlert("修改成功");
          this.reqlist();
        }
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