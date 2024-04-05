<template>
    <div class="app-container">
        <div class="table-box">
            <div class="table-search">
                <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="100px" :style="`flex:1;`">

                </el-form>
                <div class="search-operation">
                    <el-button type="primary" icon="el-icon-search" @click="tableSearch">搜索</el-button>
                    <el-button @click="Reset" icon="el-icon-delete">重置</el-button>
                </div>
            </div>

        </div>
        <div class="tool">
            <el-row :gutter="20" class="marigin-t-b-10">
                <el-col :span="4">
                    <el-button icon="el-icon-edit" @click="ToDayClick()">今日打卡</el-button>
                </el-col>
            </el-row>
        </div>



        <data-table ref="tableId" url="/score/findByModal" :column="dataColum" :where="where">
            <template v-slot:operate="scope">
                <el-dropdown trigger="hover">

                    <el-button type="primary">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">

                    </el-dropdown-menu>
                </el-dropdown>
            </template>
        </data-table>
    </div>
</template>

<script>
import store from '@/store';

export default {
    name: "score-list",
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
            where: {
                userId: store.getters.userId
            },
            lock: 0,
            searchForm: {},
            dataColum: [
                {
                    key: "id",
                    hidden: true,
                    templet: function (row) {
                        return row.id;
                    }
                },
                {
                    key: "score",
                    title: "积分值",
                    type: store.getters.columnType.SHORTTEXT,

                },
                {
                    key: "scoreDesc",
                    title: "积分描述",
                    type: store.getters.columnType.SHORTTEXT,

                },
                {
                    key: "userName",
                    title: "用户名",
                    type: store.getters.columnType.SHORTTEXT,

                },
                {
                    key: "creationTime",
                    title: "创建时间",
                    type: store.getters.columnType.DATE,
                    sort: true,
                    templet: function (row) {
                        return row.createdAt;
                    }
                },
                {
                    title: "操作",
                    type: store.getters.columnType.USERDEFINED,
                },
            ],
            editModalFormRules: {
                roleName: [
                    { required: true, message: "请输入角色名称", trigger: "blur" }

                ]

            },
            formData: {

            },

            editorShow: false,

        };
    },
    created() {

    },
    methods: {
        async showEditModal(id = 0) {

            let { data } = await this.$post(`/score/detail?id=${id}`, {});
            this.formData = data;
            this.editorShow = true;
            this.activeName = "user";
        },
        async submitForm() {
            if (this.lock == 1) return;
            this.$refs.editModalForm.validate(async valid => {
                if (valid) {
                    this.lock = 1;
                    if (this.formData.id > 0) {
                        var { success } = await this.$postLoading(`/score/update`, this.formData);
                    }
                    else {
                        var { success } = await this.$postLoading(`/score/add`, this.formData);

                    }
                    this.lock = 0;
                    if (success) {
                        this.editorShow = false;
                        this.$refs.tableId.reload();
                    }
                }
            })
        },
        async showDeleteModal(id) {


            await this.$postDelete(`/score/delete?id=${id}`, {});

            this.$refs.tableId.reload();

        },
        async ToDayClick() {
            this.formData.score = 2;
            this.formData.scoreDesc = "每日打卡获取2积分";
            this.formData.status = 0;
            this.formData.userId = store.getters.userId;
            var { success } = await this.$postLoading(`/score/add`, this.formData);
            if (success) {
                this.$message({
                    message: '打卡成功',
                    type: 'success'
                });
            }
            this.$refs.tableId.reload();
        },



        async tableSearch() {
            this.$refs.tableId.reload(this.searchForm);
        },
        async Reset() {
            this.searchForm = {};
        },



    },
};
</script>
