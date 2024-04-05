<template>
  <div class="upload-files-wrap">
    <el-upload class="upload-demo" :action="uploadVideoUrl" :show-file-list="true"
      :on-success="handleUploadVideoSuccess" :on-remove="handleRemove" :limit="limit" :multiple="true"
      :file-list="innerUploadVideoFileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频资源文件</div>
    </el-upload>
  </div>
</template>

<script>
import { formatDateTime, ReplaceSourceHttp, ReplaceDevlopmentSource, Clone } from "@/utils/index";
import store from "@/store";
import { boolean, number } from "yargs";
export default {
  filters: {
    formatDateTimefilter: (value) => formatDateTime(value),
  },
  props: {
    uploadVideoFileList: {
      type: Array,
    },
    limit: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    "uploadVideoFileList": {
      immediate: true,//该回调将会在侦听开始之后被立即调用
      handler: function (n, o) {
        if (Array.isArray(n)) {
          n.forEach(item => {
            item.url = ReplaceSourceHttp(item.url);
          })
        }
        this.innerUploadVideoFileList = n;
      }
    }
  },

  data() {
    return {
      uploadVideoUrl: store.getters.uploadVideoUrl,
      innerUploadVideoFileList: []
    };
  },

  created() {

  },
  methods: {
    FileListConvert(fileList) {
      let list = [];
      if (Array.isArray(fileList)) {
        fileList.forEach((item) => {
          if (item.response && item.response.success) {
            var rs = item.response.data.map(x => { return { name: x.fileName, url: x.url }; });
            list = [...list, ...rs];
          }
          else if (item.url) {
            list.push({ name: item.name, url: item.url });
          }

        })
      }

      list.forEach(item => {
        console.log("查看", item);
        item.url = ReplaceSourceHttp(item.url);
      })
      return list;
    },
    async callBackFileList() {
      let list = Clone(this.innerUploadVideoFileList);

      list.forEach(item => {
        item.url = ReplaceDevlopmentSource(item.url);
      })
      this.$emit("fileListChange", list);
    },
    async handleUploadVideoSuccess(response, file, fileList) {
      this.innerUploadVideoFileList = this.FileListConvert(fileList);
      this.callBackFileList();
    },
    async handleRemove(file, fileList) {
      this.innerUploadVideoFileList = this.FileListConvert(fileList);
      this.callBackFileList();
    },
  },
};
</script>

<style scoped>

</style>
