<template>
  <div class="app-container">
    <el-form
      ref="editModalForm"
      :rules="editModalFormRules"
      :model="formData"
      label-width="80px"
      size="mini"
    >
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="账号" prop="userName">
            <el-input v-model.trim="formData.userName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model.trim="formData.password" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="角色">
            <el-paged-select
              v-model="formData.roleId"
              url="/sys/role/findByModal"
              column-name="roleName"
              column-value="id"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="formData.email" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model.trim="formData.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="formData.birthday"
              align="right"
              type="datetime"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="身份证" prop="idCard">
            <el-input v-model.trim="formData.idCard" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系地址" prop="residentialAddress">
            <el-input v-model.trim="formData.residentialAddress" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="我的信誉积分" prop="totalScore">
            <el-input v-model.trim="formData.totalScore" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="头像" prop="avatar">
            <el-upload-sigle-images v-model="formData.avatar" :limit="1" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="end" align="bottom">
        <el-form-item>
          <el-button type="primary" @click="submitForm()"> 确 定 </el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "UserList",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      lock: 0,

      editModalFormRules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      formData: {},

      activeName: "user",
      editorShow: false,
    };
  },
  created() {
    this.showEditModal();
  },
  methods: {
    async showEditModal(id = 0) {
      let { data } = await await this.$postLoading("/user/detailByToken", {});
      this.formData = data;
    },
    async submitForm() {
      if (this.lock == 1) return;
      this.$refs.editModalForm.validate(async (valid) => {
        if (valid) {
          this.lock = 1;
          if (this.formData.id > 0) {
            var { success } = await this.$postLoading(
              `/user/update`,
              this.formData
            );
          } else {
            var { success } = await this.$postLoading(
              `/user/add`,
              this.formData
            );
          }
          this.lock = 0;
          if (success) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
          }
        }
      });
    },
  },
};
</script>
