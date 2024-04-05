<template>
  <div class="app-container">
    <div class="table-box">
      <div class="table-search">
        <el-form
          ref="searchFormRef"
          :model="searchForm"
          :inline="true"
          label-width="100px"
          :style="`flex:1;`"
        >
          <el-form-item label="账户" prop="userName">
            <el-input v-model.trim="searchForm.userName" />
          </el-form-item>
        </el-form>
        <div class="search-operation">
          <el-button type="primary" icon="el-icon-search" @click="tableSearch">
            搜索
          </el-button>
          <el-button icon="el-icon-delete" @click="Reset"> 重置 </el-button>
        </div>
      </div>
    </div>
    <div class="tool">
      <el-row :gutter="20" class="marigin-t-b-10">
        <el-col :span="4">
          <el-button icon="el-icon-edit" @click="showEditModal()">
            新增
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      v-dialogDrag
      title="用户编辑"
      :visible.sync="editorShow"
      width="80%"
      :lock-scroll="true"
      height="800px"
    >
      <el-form
        v-if="editorShow == true"
        ref="editModalForm"
        :rules="editModalFormRules"
        :model="formData"
        label-width="80px"
        size="mini"
      >
        <el-tabs v-model="activeName" @tab-click="HandleClick">
          <el-tab-pane label="基本信息" name="user">
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
                  <el-select v-model="formData.roleId" placeholder="请选择">
                    <el-option
                      v-for="item in roleIdOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
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
                <el-form-item label="头像" prop="avatar">
                  <el-upload-sigle-images
                    v-model="formData.avatar"
                    :limit="1"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>

        <el-row type="flex" justify="end" align="bottom">
          <el-form-item>
            <el-button type="primary" @click="submitForm()"> 确 定 </el-button>
            <el-button @click="editorShow = false"> 取 消 </el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>

    <data-table ref="tableId" url="/user/findByModal" :column="dataColum">
      <template v-slot:operate="scope">
        <el-dropdown trigger="hover">
          <el-button type="primary">
            操作<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <div class="el-dropdown-menu-item">
              <span @click="showEditModal(scope.row.id)"
                ><i class="el-icon-edit" />修改</span
              >
            </div>
            <div class="el-dropdown-menu-item">
              <span @click="showDeleteModal(scope.row.id)"
                ><i class="el-icon-delete" />删除</span
              >
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </data-table>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters([
      "name",
      "token",
      "userId",
      "roleId",
      "roleIdOptions",
      "avatar",
    ]),
  },
  data() {
    return {
      lock: 0,
      options: [
        {
          name: "管理员",
          value: 0,
          label: "管理员",
        },
        {
          name: "用户",
          value: 1,
          label: "用户",
        },
        {
          name: "商家",
          value: 2,
          label: "商家",
        },
        {
          name: "供应商",
          value: 3,
          label: "供应商",
        },
      ],
      searchForm: {},
      dataColum: [
        {
          key: "id",
          hidden: true,
          templet: function (row) {
            return row.id;
          },
        },
        {
          key: "userName",
          title: "账号",
          type: store.getters.columnType.SHORTTEXT,
          templet: function (row) {
            return row.userName;
          },
        },
        {
          key: "password",
          title: "密码",
          type: store.getters.columnType.SHORTTEXT,
          templet: function (row) {
            return row.password;
          },
        },
        {
          key: "roleId",
          title: "角色",
          type: store.getters.columnType.SHORTTEXT,
          templet: function (row) {
            return store.getters.roleIdOptions.filter(
              (x) => x.value == row.roleId
            )[0].name;
          },
        },
        {
          key: "email",
          title: "邮箱",
          type: store.getters.columnType.SHORTTEXT,
          templet: function (row) {
            return row.email;
          },
        },
        {
          key: "avatar",
          title: "头像",
          type: store.getters.columnType.Images,
          templet: function (row) {
            return row.avatar;
          },
        },

        {
          key: "score",
          title: "我的信誉积分",
          type: store.getters.columnType.SHORTTEXT,
          templet: function (row) {
            return row.score;
          },
        },

        {
          key: "phone",
          title: "手机号",
          type: store.getters.columnType.PHONE,
          templet: function (row) {
            return row.phone;
          },
        },
        // {
        //   key: "roleNames",
        //   title: "所属角色",
        //   type: store.getters.columnType.SPLIT,
        //   templet: function (row) {
        //     return row.appRoles.map(x => x.name);
        //   }
        // },
        {
          key: "creationTime",
          title: "创建时间",
          type: store.getters.columnType.DATE,
          sort: true,
          templet: function (row) {
            return row.createdAt;
          },
        },
        {
          title: "操作",
          type: store.getters.columnType.USERDEFINED,
        },
      ],
      editModalFormRules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      formData: {},
      editorShow: false,
      activeName: "user",
    };
  },
  created() {},
  methods: {
    async showEditModal(id = 0) {
      if (id != 0) {
        let { data } = await this.$post(`/user/detail?id=${id}`, {});
        this.formData = data;
      } else {
        this.formData = {};
      }
      this.editorShow = true;
      this.activeName = "user";
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
            console.log("111");
            this.$refs.editModalForm.resetFields();
            this.$refs.tableId.reload();
            this.editorShow = false;
          }
        }
      });
    },
    async showDeleteModal(id) {
      await this.$postDelete(`/user/delete?id=${id}`, {});

      this.$refs.tableId.reload();
    },

    async HandleClick() {},

    async tableSearch() {
      this.$refs.tableId.reload(this.searchForm);
    },
    async Reset() {
      this.searchForm = {};
    },
  },
};
</script>
