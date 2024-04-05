<template>
    <el-card class="box-card ">
        <div slot="header" class="clearfix">
            <el-button style="float: right; padding: 3px 3px" type="text" @click="Edit(id)">编辑</el-button>
            <el-button style="float: right; padding: 3px 3px" type="text" @click="Remove(id)">删除</el-button>
            <el-button style="float: right; padding: 3px 3px" type="text" @click="Up(id)">上移</el-button>
            <el-button style="float: right; padding: 3px 3px" type="text" @click="Down(id)">下移</el-button>
        </div>
        <div class="content">
            <question-title :postionIndex="postionIndex" :required="required" :title="title" :hasScore="hasScore"
                :score="score"></question-title>
            <el-row>
                <template v-for="(item, index) in options">
                    <el-row class="margin-b-md">
                        <el-checkbox v-model="item.value" :checked="item.isCorrect">
                            {{ optionsDisplayed ? optionsDisplayedCollect[index] + " . " : "" }}{{ item.label }}
                        </el-checkbox>
                        <span v-if="hasScore == true" style="float: right; padding: 3px 0;color:dodgerblue;">{{
                                item.score
                        }}分</span>
                    </el-row>

                </template>
            </el-row>
            <el-row>
                <el-row class="margin-b-sm">解析</el-row>
                <el-row>
                    <el-input type="textarea" v-model="resolution" :disabled="true"></el-input>
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
        options: {
            type: Array,
            default: []
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
        optionsDisplayed: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            default: ""
        },
    },
    watch: {
        "options": {
            immediate: true,//该回调将会在侦听开始之后被立即调用
            handler: function (n, o) {
                // if (Array.isArray(n)) {
                //     this.resolution = n.map(x => x.resolution).reduce((prev, next) => { return next + " " + prev; });
                // }

            }
        }
    },

    data() {
        return {
            optionsDisplayedCollect: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "M", "N", "O", "P"]
        }
    },
    created() {

    },
    methods: {
        Edit(id) {
            console.log("编辑", id);
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