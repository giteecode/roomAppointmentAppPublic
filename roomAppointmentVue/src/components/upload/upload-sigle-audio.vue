<template>
  <div class="upload-files-wrap">
    <el-upload :action="uploadUrl" :show-file-list="true" :on-success="handleUploadVideoSuccess"
      :on-remove="handleRemove" :before-upload="beforeUpload" :file-list="uploadFileList" :limit="limit"
      :multiple="true">
      <el-button slot="trigger" size="small" type="primary">点击上传音频</el-button>
      <div slot="tip" class="el-upload__tip">只能上传mp4/mp3/wav等文件，且不超过1gb</div>
    </el-upload>
  </div>
</template>

<script>
import { formatDateTime } from "@/utils/index";
import store from "@/store";
import { array, boolean } from "yargs";
import { checkSize } from "@/utils/index";
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
          this.uploadFileList = n.split(",").map(x => { return { url: x, name: "", status: "success" }; });
        }
      }
    }
  },

  data() {
    return {
      uploadUrl: store.getters.uploadAudioUrl,
      dialogImageUrl: "",
      dialogVisible: false,
      inneruploadFileList: [],
      uploadFileList: []

    };
  },


  methods: {
    FileListConvert(fileList) {
      console.log("执行音频上传", this.uploadUrl, fileList)
      let list = [];
      if (Array.isArray(fileList)) {
        fileList.filter(x => x.status == "success").forEach((item) => {
          if (item.response != null) {
            console.log("执行到", item.response.data[0].oldFileName)
            list = [...list, { name: item.response.data[0].oldFileName, url: item.response.data[0].url }];
          }
          else {
            list = [...list, item];
          }
        })
      }
      return list;
    },
    async callBackFileList() {
      let url = this.inneruploadFileList.length > 0 ? this.inneruploadFileList.map(x => x.url).join(",") : "";
      this.$emit('input', url);
    },
    async handleUploadVideoSuccess(response, file, fileList) {


      this.inneruploadFileList = this.FileListConvert(fileList);
      this.callBackFileList();
    },
    async handleRemove(file, fileList) {

      this.inneruploadFileList = this.FileListConvert(fileList);
      this.callBackFileList();
    },
    async beforeUpload(file) {
      let { duration } = await checkSize([file], false);
      console.log("计算的时间", duration);
      this.$emit('uploadTotalSecondWatch', parseInt(duration * 1000));
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
