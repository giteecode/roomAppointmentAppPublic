<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- <el-dropdown @command="HandleClick" trigger="hover" placement="top" v-if="tenants!=null&&tenants.length>0">
        <span class="el-dropdown-link">
          {{currentTenant.tenantName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <template v-for="item in tenants">
            <el-dropdown-item :command="item.relativeTenantId">{{item.tenantName}}</el-dropdown-item>
   
          </template>
         
        </el-dropdown-menu>
      </el-dropdown> -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="ShowEditUserModal">
            <span style="display: block">个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="ShowEditPasswordModal">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>

          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog v-dialogDrag title="修改密码" :visible.sync="editorShow" width="80%" append-to-body height="800px">
        <el-form v-if="formData != null" ref="editModalForm" :rules="editModalFormRules" :model="formData"
          label-width="80px" size="mini">
          <el-row :gutter="10">
            <el-form-item label="新密码" prop="password">
              <el-input v-model.trim="formData.password"></el-input>
            </el-form-item>

            <el-form-item :span="12" label="重复密码" prop="twopassword">
              <el-input v-model.trim="formData.twopassword"></el-input>
            </el-form-item>
          </el-row>

          <el-row type="flex" justify="end" align="bottom">
            <el-form-item>
              <el-button type="primary" @click="SubmitForm()">确 定</el-button>
              <el-button @click="editorShow = false">取 消</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>

      <el-dialog v-dialogDrag title="修改用户信息" :visible.sync="editorUserShow" width="80%" append-to-body height="800px">
        <el-form v-if="userFormData != null" ref="editUserModalForm" :rules="editUserModalFormRules"
          :model="userFormData" label-width="80px" size="mini">
          <el-row :gutter="10">
            <el-form-item label="编号" prop="studentNumber">
              <el-input v-model.trim="userFormData.studentNumber"></el-input>
            </el-form-item>

            <el-form-item :span="12" label="邮箱" prop="email">
              <el-input v-model.trim="userFormData.email"></el-input>
            </el-form-item>

            <el-form-item :span="12" label="联系方式" prop="phone">
              <el-input v-model.trim="userFormData.phone"></el-input>
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
              <el-upload-sigle-images :limit="1" v-model="userFormData.avatar"></el-upload-sigle-images>


            </el-form-item>
          </el-row>

          <el-row type="flex" justify="end" align="bottom">
            <el-form-item>
              <el-button type="primary" @click="SubmitUserForm()">确 定</el-button>
              <el-button @click="editorUserShow = false">取 消</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { UserGetApi, UserEditPasswordApi, UserEditApi } from "@/api/identiys"
import UploadImages from "@/components/upload/upload-images"
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import store from "@/store";
export default {
  components: {
    Breadcrumb,
    Hamburger,
    uploadImages: UploadImages
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar", "tenants", "currentTenant"]),
  },
  data() {
    return {
      editorShow: false,
      editModalFormRules: {
        password: [
          { required: true, message: "请输入密码名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        twopassword: [
          { required: true, message: "请输入重复密码名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
      formData: {},

      userFormData: {
        imageUrlList: [],
      },
      editUserModalFormRules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 11 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
      editorUserShow: false,
      uploadUrl: store.getters.uploadUrl,
    };
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    async HandleClick(teantId) {
      console.log("HandleClick", teantId);
      await this.$store.dispatch("user/changeTenant", teantId).then(() => {
        window.location.reload();
      }).catch(() => {

      })
    },
    async ShowEditPasswordModal() {
      let { data } = await this.$post("/user/detailByToken", {})
      this.formData = data;
      this.formData.password = "";
      this.editorShow = true;
    },
    async SubmitForm() {
      this.$refs.editModalForm.validate(async (valid) => {
        if (valid) {
          if (this.formData.password != this.formData.twopassword) {
            this.$message({
              message: "两次输入的密码不一致",
              type: "warning",
            });
            return;
          }

          await this.$post("/user/update", this.userFormData)

          this.editorShow = false;
          await this.logout();
        }
      });
    },


    async ShowEditUserModal() {
      let { data } = await this.$post("/user/detailByToken", {})

      this.userFormData = data;
      this.editorUserShow = true;
    },
    async SubmitUserForm() {
      this.$refs.editUserModalForm.validate(async (valid) => {
        if (valid) {

          await this.$post("/user/update", this.userFormData)
          this.editorUserShow = false;
        }
      });
    },

  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .name {
          padding-left: 15px;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
