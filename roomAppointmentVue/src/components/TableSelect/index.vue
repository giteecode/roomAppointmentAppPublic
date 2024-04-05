<template>
    <el-select v-model="selectValue" filterable placeholder="请选择" :filterable="true" :loading="loading" :clearable="true"
        :remote="true" :remote-method="Search" @change="Change" @visible-change="VisibleChange" >
        <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
        </el-option>
        <el-row class="padding-md">
            <el-pagination background @size-change="HandleSizeChange" @current-change="HandleCurrentChange"
                :current-page="pagination.page" :page-sizes="pagination.pageSizes" :page-size="pagination.limit"
                layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
        </el-row>

    </el-select>

</template>
  
<script>
import { post } from "@/utils/http";
import { Debounce } from "@/utils/index"
import store from "@/store";
export default {

    props: {
        value: {type: String,default: ''},
        selectText: {type: String,default: ''},
        url: {
            type: String,//默认的请求路径
            default: "",
        },
        searchProp: {//搜索属性
            type: Object
        },
        column: {//默认的列属性
            type: Array,
        },
        where: {},


    },
    data() {
        return {
            firstLoad:true,//是否首次加载
            loading: false,//是否正在获取数据中
            options: [],
            where_: {},
            pagination: {
                limit: 10,
                page: 1,
                total: 0,
                pageSizes: [5, 10, 20, 50],
            },
            selectOption:{},
            selectValue:undefined,

        }
    },
    created() {
       
        this.selectValue=this.value=="0"?undefined:this.value;
       if(this.selectValue!=undefined){
            this.options=[{
                name:this.selectText,
                value:this.selectValue,
            }]
       }
        this.where_ = this.$props.where;
    },
    methods: {
        HandleCurrentChange(event) {
            this.pagination.page = event;
            this.FetchDataList();
        },
        HandleSizeChange(event) {
            this.pagination.limit = event;
            this.pagination.page = 1;
            this.pagination.total = 0;
            this.FetchDataList();
        },
        InitData() {
            this.pagination.limit = 10;
            this.pagination.page = 1;
            this.pagination.total = 0;
            
            this.where_ = {};
        },
        async FetchDataList() {
            this.loading = true;
            let { data } = await post(this.$props.url, {
                limit: this.pagination.limit,
                size: this.pagination.limit,
                page: this.pagination.page,
                ...this.where_
            });
            this.loading = false;
           
            this.options = data.items;
            this.pagination.total = data.totalCount;
        },
        Search: Debounce(async function(query) {
 
          
                this.pagination.limit = 10;
                this.pagination.page = 1;
                this.where_.keywords = query;
                await this.FetchDataList();
            

        }, 400),
        Change(value){  
            this.$emit('input',value)
        },
        async VisibleChange(value){
            if(this.firstLoad&&value){
                this.firstLoad=false;
                await this.FetchDataList();
            }
        }
    }
}
</script>