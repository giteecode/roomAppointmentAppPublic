<template>
  <div>
    <el-row>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in bannerList" :key="item.id" style="width: 100%">
          <el-image style="width: 100%;" :src="item.image" fit="cover"></el-image>
        </el-carousel-item>
      </el-carousel>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;">资讯</span>

          </div>
          <div>
            <el-tabs v-model="activeArticleTypeName" @tab-click="handleAritcleTypeClick">
              <template v-for="(item, index) in articleTypeList">
                <el-tab-pane :label="item.name" :name="item.id">

                </el-tab-pane>
              </template>
              <data-table ref="tableId" url="/article/findByModal" :showSummary="false" :column="dataColum" :where="where"
                @rowClick="ArticleClick">

              </data-table>
            </el-tabs>
          </div>
        </el-card>
      </el-col>

    </el-row>





  </div>
</template>

<script>
import store from "@/store";
import Tinymce from "@/components/Tinymce";
import router from '@/router';
import { formatDateTime, ReplaceImagesHttp } from "@/utils/index";
export default {
  name: "home",
  components: { tinymce: Tinymce },
  filters: {
    formatDateTimefilter: (value) => formatDateTime(value),
  },
  data() {
    return {
      activeName: "first",
      searchForm: {
      },
      bannerList: [

      ],
      where: {},
      activeArticleTypeName: "",
      dataColum: [
        {
          key: "id",
          hidden: true,
          templet: function (row) {
            return row.id;
          }
        },
        {
          key: "title",
          title: "标题",
          type: store.getters.columnType.title,

        },
        {
          key: "articleTypeName",
          title: "类型名称",
          type: store.getters.columnType.SHORTTEXT,
          templet: function (row) {
            return row.articleTypeName;
          }
        },
        {
          key: "author",
          title: "作者",
          type: store.getters.columnType.SHORTTEXT,
          templet: function (row) {
            return row.author;
          }
        },
        {
          key: "likeNum",
          title: "喜欢数",
          type: store.getters.columnType.SHORTTEXT,
          templet: function (row) {
            return row.likeNum;
          }
        },
        {
          key: "viewCount",
          title: "阅读量",
          type: store.getters.columnType.SHORTTEXT,
          templet: function (row) {
            return row.viewCount;
          }
        },
        {
          key: "image",
          title: "封面",
          type: store.getters.columnType.Images,

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

      ],

      articleTypeList: [],

    };
  },

  created() {
    this.BannerList();
    this.ArticleTypeList();


  },
  methods: {
    async ArticleClick({ selectRow }) {
      router.push({
        path: "/home/article", query: {
          id: selectRow.id
        }
      })
    },
    async articleTopClick(id) {
      router.push({
        path: "/home/article", query: {
          id: id
        }
      })
    },


    async BannerList() {

      let { data: { list } } = await this.$post("/cover/findByModal", {});
      this.bannerList = list;

    },

    async ArticleTypeList() {
      let { data: { list } } = await this.$post("/article/type/findByModal", {});

      this.articleTypeList = [{ id: undefined, "name": "全部" }, ...list];

    },



    async handleAritcleTypeClick({ name }) {
      this.activeArticleTypeName = name;
      this.$refs.tableId.reload({ articleTypeId: name });
    },
    async handleStockClick(row) {
      console.log(row);
      router.push({
        path: "/home/stockdetail", query: {
          id: row.id
        }
      })

    },

    async handleClick() {
      await this.StockList();
    },
    async MoreShop() {
      router.push({
        path: "/home/shop-list"
      })
    },




  },
};
</script>
<style scoped lang="scss">
.article-item {
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
