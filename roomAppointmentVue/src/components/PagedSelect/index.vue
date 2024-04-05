<template>
    <el-select :disabled="disabled" v-model="selectValue" filterable placeholder="请选择" :filterable="true"
        :loading="loading" :clearable="true" :remote="true" @change="Change" @visible-change="VisibleChange">
        <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
        </el-option>
        <!-- <el-row class="padding-md">
            <el-pagination background @size-change="HandleSizeChange" @current-change="HandleCurrentChange"
                :current-page="pagination.page" :page-sizes="pagination.pageSizes" :page-size="pagination.limit"
                layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
        </el-row> -->

    </el-select>

</template>
  
<script>
import { post } from "@/utils/http";
import { Debounce } from "@/utils/index"
import store from "@/store";
export default {

    props: {

        value: { type: [Number, String], default: '' },
        firstLoad: { type: Boolean, default: true },
        selectText: { type: String, default: '' },
        url: {
            type: String,//默认的请求路径
            default: "",
        },
        searchProp: {//搜索属性
            type: Object
        },
        columnName: {//默认的列属性
            type: String,//默认的请求路径
            default: "",
        },
        columnValue: {
            type: String,//默认的请求路径
            default: "",
        },
        where: {},
        disabled: { type: Boolean, default: false },
        column: {//默认的列属性
            type: Array,
        },


    },
    watch: {
        "value": {
            immediate: true,//该回调将会在侦听开始之后被立即调用
            handler: function (n, o) {
                this.selectValue = n == "0" ? undefined : n;
            }
        }
    },
    data() {
        return {
            firstLoad_: true,//是否首次加载

            loading: false,//是否正在获取数据中
            options: [],
            where_: {},
            pagination: {
                limit: 9999,
                page: 1,
                total: 0,
                pageSizes: [5, 10, 20, 50, 100],
            },
            selectOption: {},
            selectValue: undefined,

        }
    },
    created() {

        this.firstLoad_ = this.firstLoad;
        this.selectValue = this.value;

        this.where_ = this.$props.where;

        this.FetchDataList();

    },
    methods: {

        InitData() {
            this.pagination.limit = 10;
            this.pagination.page = 1;
            this.pagination.total = 0;

            this.where_ = {};
        },
        async FetchDataList() {
            this.loading = true;
            let { data: { list }, total } = await post(this.$props.url, {
                limit: this.pagination.limit,
                size: this.pagination.limit,
                page: this.pagination.page,
                ...this.where_
            });
            this.loading = false;
            let dataList = [];
            list.forEach((item, index) => {
                dataList.push({
                    name: item[`${this.columnName}`],

                    value: item[`${this.columnValue}`],
                });
            });
            this.options = dataList;
            this.pagination.total = total;
        },

        Change(value) {
            this.$emit('input', value);
        },
        async VisibleChange(value) {

            if (!this.firstLoad_ && value) {
                this.firstLoad_ = true;
                await this.FetchDataList();
            }
        }
    }
}
</script>