<template>
  <div class="upload-files-wrap">
    <el-upload :action="uploadUrl" list-type="picture-card" :show-file-list="true"
      :on-success="handleUploadVideoSuccess" :on-remove="handleRemove" :file-list="uploadImagesFileList"
      accept=".jpg,.png,.jpeg" :limit="limit" :multiple="true">
      <i class="el-icon-plus"></i>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-upload>
  </div>
</template>

<script>
import { formatDateTime } from "@/utils/index";
import store from "@/store";
import { array, boolean } from "yargs";
export default {
  filters: {
    formatDateTimefilter: (value) => formatDateTime(value),
  },
  props: {
    value: { type: [Number, String], default: '' },

    limit: {
      type: Number,
      default: 1,
    },
  },
  watch: {

    "value": {
      immediate: true,//该回调将会在侦听开始之后被立即调用
      handler: function (n, o) {
        if (n) {
          this.uploadImagesFileList = n.split(",").map(x => { return { url: x, name: "", status: "success" }; });
        }
      }
    }
  },

  data() {
    return {
      uploadUrl: store.getters.uploadUrl,
      dialogImageUrl: "",
      dialogVisible: false,
      innerUploadImagesFileList: [],
      uploadImagesFileList: []

    };
  },


  methods: {
    FileListConvert(fileList) {
      let list = [];
      if (Array.isArray(fileList)) {
        console.log(fileList);
        fileList.filter(x => x.status == "success").forEach((item) => {
          if (item.response != null) {
            list = [...list, { name: "", url: item.response.data }];
          }
          else {
            list = [...list, item];
          }
        })
      }
      return list;
    },
    async callBackFileList() {
      let url = this.innerUploadImagesFileList.length > 0 ? this.innerUploadImagesFileList.map(x => x.url).join(",") : "";
      console.log("图片返回", url);
      this.$emit('input', url);
    },
    async handleUploadVideoSuccess(response, file, fileList) {

      this.innerUploadImagesFileList = this.FileListConvert(fileList);
      this.callBackFileList();
    },
    async handleRemove(file, fileList) {
      this.innerUploadImagesFileList = this.FileListConvert(fileList);
      this.callBackFileList();
    },

  },
};
</script>

<style scoped>
.uploadImage {
  background-color: transparent;
}

.el-upload--picture-card {
  background-color: transparent !important;
}
</style>
