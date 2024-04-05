<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
.uploadImages {
  width: 164px;
  height: 164px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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

.text-center {
  text-align: center;
}

/**xs、sm、md、lg */
.margin-top-xs {
  margin-top: 10px;
}

.flex {
  display: flex;
  flex-direction: row;
}


.flex-reverse {
  display: flex;
  flex-direction: row-reverse;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.justify-content-center {
  justify-content: center;
}

.justify-space-between {
  justify-content: space-between;
}

.padding-xs {}

.padding-sm {}

.padding-md {
  padding: 20px;
}

.margin-md {
  margin: 20px;
}

.margin-b-md {
  margin-bottom: 20px;
}

.margin-b-sm {
  margin-bottom: 10px;
}


.flex-1 {
  flex: 1;
}

.flex-2 {
  flex: 2;
}

.flex-3 {
  flex: 3;
}

.flex-4 {
  flex: 4;
}

.flex-5 {
  flex: 5;
}

.padding-l-5 {
  padding-left: 5px;
}

.padding-l-10 {
  padding-left: 10px;
}

.padding-l-15 {
  padding-left: 15px;
}

.padding-l-20 {
  padding-left: 20px;
}

.padding-r-5 {
  padding-right: 5px;
}

.padding-r-10 {
  padding-right: 10px;
}

.padding-r-15 {
  padding-right: 15px;
}

.padding-r-20 {
  padding-right: 20px;
}

.padding-b-5 {
  padding-bottom: 5px;
}

.padding-b-10 {
  padding-bottom: 10px;
}

.padding-b-15 {
  padding-bottom: 15px;
}

.padding-b-20 {
  padding-bottom: 20px;
}

.margin-b-5 {
  margin-bottom: 5px;
}

.margin-b-10 {
  margin-bottom: 10px;
}

.margin-b-15 {
  margin-bottom: 15px;
}

.margin-b-20 {
  margin-bottom: 20px;
}

.margin-l-5 {
  margin-left: 5px;
}

.margin-l-10 {
  margin-left: 10px;
}

.margin-l-15 {
  margin-left: 15px;
}

.margin-l-20 {
  margin-left: 20px;
}

.margin-t-5 {
  margin-top: 5px;
}

.margin-t-10 {
  margin-top: 10px;
}

.margin-t-15 {
  margin-top: 15px;
}

.margin-t-20 {
  margin-top: 20px;
}

.table-box {
  .table-search {
    display: flex;
    margin-bottom: 10px;

    .search-operation {
      margin-left: 15px;
      white-space: nowrap;

      .search-isOpen {
        margin-left: 20px;
      }
    }
  }
}

.el-upload--picture-card {
  background-color: transparent !important;
}

.el-dropdown-menu-item {
  list-style: none;
  line-height: 36px;
  padding: 0 20px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  outline: 0;

}

.el-dropdown-menu-item:not(.is-disabled):hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}
</style>
