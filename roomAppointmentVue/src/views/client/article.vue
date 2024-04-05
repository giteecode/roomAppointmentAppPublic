<template>
    <div>

        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="#">文章信息</a></el-breadcrumb-item>
        </el-breadcrumb>
        <h2 style="text-align: center;">{{ article.title }}</h2>
        <div>
            <p>作者:{{ article.author }}
                <span style="float: right; padding: 3px 0;color: gray;">{{ article.createdAt | formatDateTime
                }}</span>
            </p>
            <p> <span style="float: right; padding: 3px 0;color: gray;">浏览量:{{ article.viewCount || 0 }}</span></p>

        </div>
        <!-- <div style="height:20px">
                        <p> <span style="padding: 3px 0;color: royalblue;" @click="Concern()">添加关注</span></p>
                    </div> -->

        <h3 style="text-align: center;margin-top:70px">文章详情</h3>
        <div style="min-height:400px" v-html="article.content"></div>
        <p> <span style="float: right; padding: 3px 0;color: royalblue;" @click="Raise()">{{ article.likeState != 1 ?
            '给我点一个赞!' : '取消点赞!'
        }}</span></p>

        <!-- <div style="margin-top:100px">
                <el-form ref="editModalForm" :rules="editModalFormRules" :model="formData" label-width="80px" size="mini">
                    <el-col :span="24">
                        <el-form-item label="发表评论" prop="comment">
                            <el-input type="textarea" maxlength="10" :autosize="{ minRows: 1, maxRows: 10 }"
                                v-model.trim="formData.comment"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <p>
                            <el-button style="float: right;" :disabled="!formData.comment" type="primary"
                                @click="Send()">发送</el-button>
                        </p>

                    </el-col>

                </el-form>
            </div> -->
        <!-- <h2>评论列表</h2>
                    <div>
                        <template v-for="(item, index) in article.momentCommentList">
                            <div class="comment-item">
                                <div style="margin-bottom:10px">用户:{{ item.userName }}</div>
                                <div>评论内容:{{ item.comment }}
                                    <span style="float: right; padding: 3px 0;color: gray;">{{ item.createdAt | formatDateTime
                                        }}</span>
                                </div>
                            </div>

                        </template>

                    </div> -->


    </div>
</template>
  
<script>
import store from "@/store";
import Tinymce from "@/components/Tinymce";
import router from '@/router';
import { mapGetters } from "vuex";

export default {
    name: "article",
    components: { tinymce: Tinymce },
    data() {
        return {
            id: "",
            article: {},
            formData: {}

        };
    },
    computed: {
        ...mapGetters(["name", "token", "userId", "avatar"]),
    },
    created() {

        this.Get();
    },
    methods: {

        async Get() {

            let { data } = await this.$post("/article/detail?id=" + this.$route.query.id, {});
            console.log(data);
            this.article = data;

        },
        async Raise() {

            await this.$post("/moment/like/addOrCancel", {
                subjectId: this.$route.query.id,
                userName: this.name,
                avatar: this.avatar,
                state: 1,
                status: this.article.likeState == 1 ? 2 : 1,
                comment: this.formData.comment,

            });
            this.$message({
                message: '操作成功',
                type: 'success'
            });
            await this.Get();
        },
        async Send() {
            await this.$post("/moment/comment/add", {
                momentId: this.$route.query.id,
                nickName: this.name,
                state: 1,
                avatar: this.avatar,
                comment: this.formData.comment
            });
            this.formData = {};
            this.$message({
                message: '评论成功',
                type: 'success'
            });
            await this.Get();
        },
        async Concern() {
            await this.$post("/concern/addOrCancel", {
                momentId: this.$route.query.id,
                userId: this.userId,
                userName: this.name,
                state: 1,
                userAvatar: this.avatar,
            });
            this.$message({
                message: '关注成功',
                type: 'success'
            });
        },




    },
};
</script>
<style scoped lang="scss">
.comment-item {
    padding: 10px;
}
</style>
  