<template>
  <div>
    <div style="margin: 20px"></div>
    <el-form label-width="80px" :model="form" ref="form">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <VueEditor
          v-model="form.content"
          :useCustomImageHandler="true"
          @image-added="imgUpload"
        />
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            :label="item.id"
            v-for="(item, index) of categoriesList"
            :key="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="{
            Authorization: 'Bearer ' + token,
          }"
          list-type="picture-card"
          :on-success="coverSuccess"
          :on-remove="coverRemove"
          :file-list="form.cover"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">类型1</el-radio>
          <el-radio :label="2">类型2</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="按钮">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
      categoriesList: [],
      checkList: [],
      token: localStorage.getItem("token"),
    };
  },
  watch: {
    checkList() {
      this.form.categories = this.checkList.map((item) => {
        // console.log(item)
        return {
          id: item,
        };
      });
    },
  },
  created() {
    this.categoriesRender();
    if (this.$route.query.id) {
      this.editRender();
    }
  },
  methods: {
    imgUpload(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      this.$axios({
        method: "post",
        url: "/upload",
        data: formData,
      }).then((res) => {
        // console.log(res);
        Editor.insertEmbed(
          cursorLocation,
          "image",
          this.$axios.defaults.baseURL + res.data.data.url
        );
        resetUploader();
      });
    },
    categoriesRender() {
      this.$axios({
        url: "/category",
      }).then((res) => {
        // console.log(res);
        this.categoriesList = res.data.data.filter((item) => {
          return item.id != 0 && item.id != 999;
        });
      });
    },
    coverSuccess(res, file) {
      // console.log(res, file);
      file.id = res.data.id;
      this.form.cover.push(file);
      // console.log(this.form.cover);
    },
    coverRemove(file, fileList) {
      this.form.cover = fileList;
    },
    submit() {
      // console.log(this.form);
      this.$axios({
        method: "post",
        url: "/post",
        data: this.form,
      }).then((res) => {
        this.$router.push("/postlist");
      });
    },
    editRender() {
      this.$axios({
        url: "/post/" + this.$route.query.id,
      }).then((res) => {
        this.checkList = res.data.data.categories.map((item) => {
          return item.id;
        });
        const newCover = res.data.data.cover.map((img) => {
          const newImg = { ...img };
          if (newImg.url.indexOf("http") == -1) {
            newImg.url = this.$axios.defaults.baseURL + newImg.url;
          }
          return newImg;
        });
        res.data.data.cover = newCover;
        this.form = res.data.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>