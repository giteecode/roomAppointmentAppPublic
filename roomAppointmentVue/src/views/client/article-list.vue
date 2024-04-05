<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="18">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bold;">文章</span>

                    </div>
                    <div style="min-height:460px">
                        <el-tabs v-model="activeArticleTypeName" @tab-click="handleAritcleTypeClick">
                            <template v-for="(item, index) in articleTypeList">
                                <el-tab-pane :label="item.name" :name="item.id">
                                    <el-table :data="articleInfoList" style="width: 100%" @cell-click="articleClick">
                                        <el-table-column prop="title" label="标题" width="250">
                                        </el-table-column>
                                        <el-table-column prop="author" label="作者">
                                        </el-table-column>
                                        <el-table-column prop="likeNum" label="喜欢数">
                                        </el-table-column>
                                        <el-table-column prop="viewCount" label="阅读量">
                                        </el-table-column>
                                        <el-table-column prop="creationTime" label="发布时间" width="200">
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                            </template>


                        </el-tabs>
                    </div>
                </el-card>

                <el-card class="box-card" style="margin-top:20px">
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bold;">资讯</span>

                    </div>
                    <div style="min-height:460px">

                        <el-tabs v-model="consultingTypeName" @tab-click="handleConsultingTypeClick">
                            <template v-for="(item, index) in consultingTypeDataList">
                                <el-tab-pane :label="item.name" :name="item.id">
                                    <el-table :data="consultingList" style="width: 100%" @cell-click="ConsultingClick">
                                        <el-table-column prop="title" label="标题" width="250">
                                        </el-table-column>
                                        <el-table-column prop="author" label="作者">
                                        </el-table-column>
                                        <el-table-column prop="likeNum" label="喜欢数">
                                        </el-table-column>
                                        <el-table-column prop="viewCount" label="阅读量">
                                        </el-table-column>
                                        <el-table-column prop="creationTime" label="发布时间" width="200">
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                            </template>


                        </el-tabs>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bold;">视频</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">更多</el-button> -->
                    </div>
                    <div style="min-height:1000px">
                        <div v-for="item in videoList" :key="item" class="text item" @click="videoClick(item.id)">
                            <div class="article-item">
                                <div style="flex:1" class="text-ellipsis">{{ item.title
                                }}</div>
                                <div style="width:80px" class="text-ellipsis">{{ item.author }}</div>
                                <div style="width:20px" class="text-ellipsis">{{ item.viewCount || 0 }}</div>

                            </div>


                        </div>
                    </div>
                </el-card>

            </el-col>
        </el-row>

    </div>
</template>
  
<script>
import store from "@/store";
import router from '@/router';
import { mapGetters } from "vuex";
import { formatDateTime, ReplaceImagesHttp } from "@/utils/index";
export default {
    name: "article-list",
    data() {
        return {
            id: "",
            articleTypeList: [],
            articleInfoList: [],
            videoList: [],
            consultingTypeName: "",
            consultingTypeDataList: [],
            consultingList: [],
            activeArticleTypeName: "",
        };
    },
    computed: {
        ...mapGetters(["name", "token", "userId", "avatar"]),
    },
    created() {

        this.ArticleTypeList();
        this.VideoList();
        this.consultingTypeList();
    },
    methods: {

        async articleClick(row) {
            router.push({
                path: "/home/article", query: {
                    id: row.id
                }
            })
        }, async ArticleTypeList() {
            let { data: { list } } = await this.$post("/article/type/findByModal", {});

            this.articleTypeList = list;

            this.activeArticleTypeName = this.articleTypeList[0].id;
            await this.ArticleInfoList();
        },
        async ArticleInfoList() {

            let { data: { list } } = await this.$post("/article/findByModal", { articleTypeId: this.activeArticleTypeName });
            list.forEach((item) => {
                item.creationTime = formatDateTime(item.createdAt);
            })
            console.log(list);
            this.articleInfoList = list;

        },
        async handleAritcleTypeClick({ name }) {
            this.activeArticleTypeName = name;
            await this.ArticleInfoList();
        },
        async videoClick(id) {
            router.push({
                path: "/home/video", query: {
                    id: id
                }
            })
        },
        async VideoList() {
            let { data: { list } } = await this.$post("/video/findByModal", {});
            this.videoList = list;
        },
        async ConsultingClick(row) {
            router.push({
                path: "/home/consulting", query: {
                    id: row.id
                }
            })
        }, async consultingTypeList() {
            let { data: { list } } = await this.$post("/consulting/type/findByModal", {});

            this.consultingTypeDataList = list;

            this.consultingTypeName = this.consultingTypeDataList[0].id;

            await this.ConsultingListAsnyc();
        },
        async ConsultingListAsnyc() {

            let { data: { list } } = await this.$post("/consulting/findByModal", { consultingTypeId: this.consultingTypeName });
            list.forEach((item) => {
                item.creationTime = formatDateTime(item.createdAt);
            })
            this.consultingList = list;

        },
        async handleConsultingTypeClick({ name }) {
            this.consultingTypeName = name;
            await this.ConsultingListAsnyc();
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
  