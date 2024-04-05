<template>
  <div class="table-box" v-if="columnList.length > 0">
    <!-- <div class="table-search">
      <el-form ref="formRef"  :model="searchProp.searchParam" :inline="true" label-width="100px" :style="`flex:1;max-width: ${1260}px`">
          <template v-for="item in getSearchList" :key="item.prop">
              <el-form-item :label="`${item.label} :`">
                <SearchFormItem :item="item" :searchParam="searchParam"></SearchFormItem>
              </el-form-item>
            </template>   
      </el-form>
      <div class="search-operation">
        <el-button type="primary" icon="Search" @click="search">搜索</el-button>
        <el-button  @click="reset">重置</el-button> -->
    <!-- <el-button type="primary" link class="search-isOpen" >
              合并
          <el-icon class="el-icon--right">
            <component :is="searchShow ? ArrowUp : ArrowDown"></component>
          </el-icon>
        </el-button> -->
    <!-- </div>
    </div> -->

    <div class="tb-body">
      <el-table :show-summary="false" v-loading="listLoading" :data="datalist" @row-click="rowClick"
        element-loading-text="加载数据中~~~" border fit highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>

        <template v-for="(item, idx) in columnList">
          <el-table-column v-if="item.type == '1'" v-bind="item" :key="'PHONE' + idx" align="center" :sortable="item.sort"
            :prop="item.key" :label="item.title" :width="item.width || 'auto'">
            <template slot-scope="{ row }">
              <slot :name="item.key" :row="row"> {{ row[`${item.key}`] }}</slot>
            </template>
          </el-table-column>
          <el-table-column v-else-if="item.type == '2'" v-bind="item" align="center" :key="'DATE' + idx" :prop="item.key"
            :label="item.title" :sortable="item.sort" :width="item.width || 'auto'">
            <template slot-scope="{ row }">
              <slot :name="item.key" :row="row">
                {{ row[`${item.key}`] | formatDateTimefilter }}</slot>
            </template>
          </el-table-column>
          <el-table-column v-else-if="item.type == 4" v-bind="item" align="center" :key="'USERDEFINED' + idx"
            :width="item.width || 100" :prop="item.key" :label="item.title" fixed="right">
            <template slot-scope="{ row }">
              <slot name="operate" :row="row"></slot>
            </template>
          </el-table-column>
          <el-table-column v-else-if="item.type == 8" v-bind="item" align="center" :key="'SHORTTEXT' + idx"
            :prop="item.key" :label="item.title" :width="item.width || 'auto'">
            <template slot-scope="{ row }">
              <el-popover trigger="hover" placement="top">
                <p>{{ row[`${item.key}`] }}</p>
                <div slot="reference" class="text-cut">
                  {{ row[`${item.key}`] }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column v-else-if="item.type == 9" v-bind="item" align="center" :key="item.type" :prop="item.key"
            :label="item.title" :width="item.width || 'auto'">
            <template slot-scope="{ row }">
              <template v-for="(tagItem, tagIndex) in row[item.key]">
                <el-tag type="primary">{{ tagItem }}</el-tag>
              </template>
            </template>
          </el-table-column>
          <el-table-column v-else-if="item.type == 10" v-bind="item" align="center" :key="'POPOVER' + idx"
            :prop="item.key" :label="item.title" :width="item.width || 'auto'">
            <template slot-scope="{ row }">
              <el-popover trigger="hover" placement="top">
                <p>{{ row[`${item.key}`] }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ row[`${item.key}`] }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <template v-else-if="item.type == 11">
          </template>
          <el-table-column v-else-if="item.type == 12" v-bind="item" :key="'Images' + idx" :prop="item.key"
            :label="item.title" :width="item.width || 'auto'">
            <template slot-scope="{ row }">

              <el-image v-for="(image, idx) in row[`${item.key}`]" style="width: 50px; height: 40px" :src="image"
                :preview-src-list="row[`${item.key}`]" fit="scale-down">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>

            </template>
          </el-table-column>
          <el-table-column v-else-if="item.type == 14" v-bind="item" align="center" :key="'CUSTOM' + idx"
            :width="item.width || 'auto'" :prop="item.key" :label="item.title">
            <template slot-scope="{ row }">
              <slot :name="item.key" :row="row"></slot>
            </template>
          </el-table-column>
          <el-table-column v-else v-bind="item" align="center" :key="idx" :prop="item.key" :label="item.title">
            <template slot-scope="{ row }">
              <span>{{ row[`${item.key}`] }}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <div class="custom-pagination">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="pagination.page" :page-sizes="pagination.pageSizes" :page-size="pagination.limit"
          layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "@/utils/http";
import { formatDateTime, ReplaceImagesHttp } from "@/utils/index";
import store from "@/store";
export default {
  filters: {
    formatDateTimefilter: (value) => formatDateTime(value),
  },
  props: {
    url: {
      type: String,//默认的请求路径
      default: "",
    },
    searchProp: {//搜索属性
      type: Object,
    },
    showSummary: {//是否显示统计
      type: Boolean,
      default: true
    },
    column: {//默认的列属性
      type: Array,
    },
    normalLoad: {
      type: Boolean,
      default: true
    },
    where: {
      type: Object,
      default: {}
    },


  },

  data() {
    return {
      selectRow: [],
      datalist: [],
      listLoading: true,
      columnList: [],
      where_: {},
      pagination: {
        limit: 10,
        page: 1,
        total: 0,
        pageSizes: [5, 10, 20, 50, 100, 200, 500, 1000],
      },
    };
  },

  created() {
    this.where_ = this.$props.where;
    this.columnList = this.column.filter((x) => !x.hidden);
    if (this.$props.normalLoad) {
      this.fetchDataList();
    }
  },
  methods: {
    handleCurrentChange(event) {
      this.pagination.page = event;
      this.fetchDataList();
    },
    handleSizeChange(event) {
      this.pagination.limit = event;
      this.pagination.page = 1;

      this.fetchDataList();
    },
    async reload(where) {
      this.pagination.page = 1;
      this.pagination.total = 0;
      if (where) {
        console.log(this.where_, where)
        this.where_ = Object.assign(this.where_, where);
      }
      this.fetchDataList();
    },
    initData() {

      this.pagination.page = 1;
      this.pagination.total = 0;
      this.where_ = {};
    },

    async fetchDataList() {
      this.listLoading = true;
      let { data: {
        list,
        total,
      } } = await post(this.$props.url, {
        limit: this.pagination.limit,
        size: this.pagination.limit,
        page: this.pagination.page,
        ...this.where_
      });
      let dataList = [];
      list.forEach((item, index) => {
        let dataItem = {};
        this.$props.column.forEach((element) => {
          if (element.templet) {
            dataItem[`${element.key}`] = element.templet(item, index);
          } else {
            dataItem[`${element.key}`] = item[`${element.key}`];
          }
          if (element.type == store.getters.columnType.Images) {
            dataItem[`${element.key}`] = dataItem[`${element.key}`]?.split(",");


          }
        });
        dataList.push(dataItem);
      });
      this.datalist = dataList;
      console.log(`请求列表:url:${this.$props.url}`, list);
      this.pagination.total = parseInt(total);
      this.listLoading = false;
      this.$emit("fetchDataSuccess", { items: list, totalCount: total })
    },
    rowClick(row) {
      this.$emit("rowClick", { selectRow: row })
    },
    async handleSelectionChange(rows) {

      this.selectRow = rows;
      this.$emit("rowSelectionChange", { selectRow: rows })
    },
    async GetSelectionRow() {
      return this.selectRow;
    }
  },
};
</script>

<style scoped>
.custom-pagination {
  margin-top: 20px;
}

.tb-body {
  padding: 20px 0px;
}
</style>
