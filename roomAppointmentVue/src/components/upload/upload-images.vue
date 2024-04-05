<template>
  <div class="upload-files-wrap">
    <el-upload :action="uploadUrl" list-type="picture-card" :show-file-list="true"
      :on-success="handleUploadVideoSuccess"  :on-remove="handleRemove" 
      :file-list="uploadImagesFileList"
      accept=".jpg,.png,.jpeg"
       :limit="limit"
        :multiple="true">
      <i class="el-icon-plus"></i>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-upload>
  </div>
</template>

<script>
import { formatDateTime,ReplaceSourceHttp,ReplaceDevlopmentSource,Clone} from "@/utils/index";
import store from "@/store";
import { array, boolean } from "yargs";
export default {
  filters: {
    formatDateTimefilter: (value) => formatDateTime(value),
  },
  props: {
  
    uploadImagesFileList: {
      type: Array,
    },
    limit: {
      type: Number, 
      default:1,
    },
  },
  watch:{
    "uploadImagesFileList":{
      immediate:true,//该回调将会在侦听开始之后被立即调用
      handler:function(n,o){
        if(Array.isArray(n)){
            n.forEach(item=>{
              item.url=ReplaceSourceHttp(item.url);
            })
        }
  
        this.innerUploadImagesFileList=n;
    }
    }
  },

  data() {
    return {
      uploadUrl: store.getters.uploadUrl,
      dialogImageUrl: "",
      dialogVisible: false,
      innerUploadImagesFileList:[]

    };
  },


  methods: {
    FileListConvert(fileList) {
      let list = [];
      if (Array.isArray(fileList)) {
        fileList.forEach((item) => {
          if(item.response&&item.response.success){
          var rs = item.response.data.map(x => { return { name: x.fileName, url: x.url }; });
         list = [...list, ...rs];
         }
         else if(item.url){              
             list.push({ name: item.name, url: item.url });
          }
        
        })   
      }
    
      list.forEach(item=>{
        item.url=ReplaceSourceHttp(item.url);
      })
      return list;
    },
    async callBackFileList(){
      let list=Clone(this.innerUploadImagesFileList);
   
       list.forEach(item=>{
        item.url=ReplaceDevlopmentSource(item.url);
        })
        this.$emit("fileListChange", list);
    },
    async handleUploadVideoSuccess(response, file, fileList) {
      console.log("上传成功返回值",fileList);
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
.uploadImage{
  background-color: transparent;
}
.el-upload--picture-card{
  background-color: transparent !important;
}
</style>
