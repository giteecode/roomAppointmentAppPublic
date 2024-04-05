<template>
    <el-card class="box-card ">
        <div slot="header" class="clearfix">
            <el-button style="float: right; padding: 3px 3px" type="text" @click="Edit(id)">编辑</el-button>

        </div>
        <div class="content">
            <question-title :postionIndex="postionIndex" :required="required" :title="title" :hasScore="hasScore"
                :score="score"></question-title>
            <el-row>
                <el-row style="float: right; padding: 3px 3px;color:brown" class="margin-b-sm">得分:{{ gainScore }}
                </el-row>

            </el-row>

            <el-row>
                <el-row class="margin-b-sm">解析</el-row>
                <el-row>
                    <el-input type="textarea" v-model="resolution" :disabled="true"></el-input>
                </el-row>
            </el-row>
            <el-row>
                <el-row class="margin-b-sm">作答内容</el-row>
                <el-row>
                    <el-input type="textarea" v-model="answerContent" :disabled="true"></el-input>
                </el-row>
            </el-row>

        </div>
    </el-card>

</template>
  
<script>
import { post } from "@/utils/http";
import { Debounce } from "@/utils/index"
import store from "@/store";
import questionTitle from "./question-title.vue";
import { array, boolean, string } from "yargs";
export default {
    components: {
        "question-title": questionTitle
    },
    props: {
        postionIndex: {
            type: Number,
            default: ""
        },
        value: {
            type: String,
            default: ""
        },


        score: {
            type: Number,
            default: ""
        },
        hasScore: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ""
        },
        required: {
            type: Boolean,
            default: false
        },
        resolution: {
            type: String,
            default: ""
        },
        answerContent: {
            type: String,
            default: ""
        },

        id: {
            type: String,
            default: ""
        },
        gainScore: {
            type: Number,
            default: "0"
        }

    },
    watch: {

    },

    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        Edit(id) {

            this.$emit("Edit", id);
        },
        Remove(id) {
            this.$emit("Remove", id);
        },
        Up(id) {
            this.$emit("Up", id);
        },
        Down(id) {
            this.$emit("Down", id);
        },
    }
}
</script>

<style>

</style>