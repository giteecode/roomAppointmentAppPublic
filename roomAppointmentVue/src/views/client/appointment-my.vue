<template>
    <div class="app-container">
        <div class="table-box">


        </div>

        <el-dialog v-dialogDrag title="编辑" :visible.sync="editorShow" width="80%" :lock-scroll="true" height="800px">
            <el-form v-if="editorShow == true" ref="editModalForm" :rules="editModalFormRules" :model="formData"
                label-width="120px" size="mini">
                <el-tabs v-model="activeName" @tab-click="HandleClick">
                    <el-tab-pane label="基本信息" name="tab1">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-form-item label="图书馆名称" prop="name">
                                    <el-input v-model.trim="formData.name"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="人数容量" prop="capacity">
                                    <el-input v-model.trim="formData.capacity"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="purpose" prop="purpose">
                                    <el-input v-model.trim="formData.purpose"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="封面" prop="imgUrl">
                                    <el-upload-sigle-images :limit="1" v-model="formData.imgUrl"></el-upload-sigle-images>

                                </el-form-item>

                            </el-col>
                        </el-row>
                    </el-tab-pane>

                </el-tabs>

                <el-row type="flex" justify="end" align="bottom">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">确 定</el-button>
                        <el-button @click="editorShow = false">取 消</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-dialog>

        <data-table ref="tableId" url="/make/an/appoint/findByModal" :column="dataColum" :where="where">
            <template v-slot:operate="scope">
                <el-dropdown trigger="hover">

                    <el-button type="primary">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">


                        <div class="el-dropdown-menu-item"><span @click="CancelStatus(scope.row.id)"><i
                                    class="el-icon-delete"></i>取消预约</span>
                        </div>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
        </data-table>
    </div>
</template>

<script>
import store from "@/store";
import Tinymce from "@/components/Tinymce";
import router from '@/router';
import { mapGetters } from "vuex";

// /make/an/appoint/type/
export default {
    name: "article-list",
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
            where: { createdBy: store.getters.userId },
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
                    key: "roomName",
                    title: "图书馆名称",
                    type: store.getters.columnType.SHORTTEXT,

                },
                {
                    key: "roomSeatName",
                    title: "座位名称",
                    type: store.getters.columnType.SHORTTEXT,

                },
                {
                    key: "userName",
                    title: "预约人",
                    type: store.getters.columnType.SHORTTEXT,

                },
                {
                    key: "content",
                    title: "备注",
                    type: store.getters.columnType.SHORTTEXT

                },
                {
                    key: "phone",
                    title: "预留手机",
                    type: store.getters.columnType.SHORTTEXT,
                    templet: function (row) {
                        return row.phone;
                    }
                },
                {
                    key: "status",
                    title: "预约状态",
                    type: store.getters.columnType.SHORTTEXT,
                    templet: function (row) {
                        return ['预约中', '预约成功', '预约失败'][row.status || 0];
                    }
                },


                {
                    key: "appointTime",
                    title: "预约时间",
                    type: store.getters.columnType.DATE,
                    sort: true,

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
                name: [
                    { required: true, message: "请输入图书馆名称", trigger: "blur" }
                ],
                capacity: [
                    { required: true, message: "请输入人数容量", trigger: "blur" }
                ],
                imgUrl: [
                    { required: true, message: "请上传封面", trigger: "blur" }
                ],
                purpose: [
                    { required: true, message: "请填写作者", trigger: "blur" }
                ],

            },
            formData: {
            },
            editorShow: false,
            activeName: "tab1"

        };
    },
    created() {

    },
    methods: {
        async showEditModal(id = 0) {

            let { data } = await this.$post(`/make/an/appoint/detail?id=${id}`, {});
            this.formData = data;
            this.editorShow = true;
            this.activeName = "tab1";
        },
        async submitForm() {
            if (this.lock == 1) return;
            this.$refs.editModalForm.validate(async valid => {
                if (valid) {
                    this.lock = 1;
                    if (this.formData.id > 0) {
                        var { success } = await this.$postLoading(`/make/an/appoint/update`, this.formData);
                    }
                    else {
                        var { success } = await this.$postLoading(`/make/an/appoint/add`, this.formData);

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


            await this.$postDelete(`/make/an/appoint/delete?id=${id}`, {});

            this.$refs.tableId.reload();

        },



        async tableSearch() {
            this.$refs.tableId.reload(this.searchForm);
        },
        async Reset() {
            this.searchForm = {};
        },
        async CancelStatus(id) {
            let { data } = await this.$post(`/make/an/appoint/detail?id=${id}`, {});
            let success = this.$comm.ConfirmMessageBox({ content: "你确定要取消预约吗" });
            if (success) {
                data.status = 2;
                await this.$postLoading(`/make/an/appoint/update`, data);
                this.$refs.tableId.reload();
            }
        },
        async HandleClick() { },


    },
};
</script>
