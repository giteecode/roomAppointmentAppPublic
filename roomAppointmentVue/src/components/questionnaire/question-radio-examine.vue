<template>
    <el-card class="box-card ">
        <div slot="header" class="clearfix">

            <el-button style="float: right; padding: 3px 3px" type="text" @click="Edit(id)">编辑</el-button>

        </div>
        <div class="content">
            <question-title :postionIndex="postionIndex" :required="required" :title="title" :hasScore="hasScore"
                :score="score"></question-title>
            <el-row>
                <template v-for="(item, index) in options">
                    <el-row class="margin-b-md">
                        <el-radio v-model="selectValue" disabled :label="item.value" @input="Change">
                            {{ optionsDisplayed ? optionsDisplayedCollect[index] + " . " : "" }}{{ item.label }}
                        </el-radio>
                        <span v-if="hasScore == true" style="float: right; padding: 3px 0;color:dodgerblue;">{{
                                item.score
                        }}分</span>
                    </el-row>

                </template>
            </el-row>
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

        id: {
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
        optionsDisplayed: {
            type: Boolean,
            default: false
        },
        gainScore: {
            type: Number,
            default: "0"
        }


    },
    watch: {
        "options": {
            immediate: true,//该回调将会在侦听开始之后被立即调用
            handler: function (n, o) {
                // if (Array.isArray(n)) {
                //     this.resolution = n.map(x => x.resolution).reduce((prev, next) => { return next + " " + prev; });
                // }

            }
        },
        "value": {
            immediate: true,//该回调将会在侦听开始之后被立即调用
            handler: function (n, o) {
                this.selectValue = n == "0" ? undefined : n;
            }
        }
    },

    data() {
        return {
            optionsDisplayedCollect: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "M", "N", "O", "P"],
            selectValue: ""
        }
    },
    created() {

    },
    methods: {
        Edit(value) {
            console.log("编辑", value);
            this.$emit("Edit", value);
        },
        Remove(value) {
            this.$emit("Remove", value);
        },
        Up(value) {
            this.$emit("Up", value);
        },
        Down(value) {
            this.$emit("Down", value);
        },
        Change(value) {
            this.$emit('input', value);

        }
    }
}
</script>

<style>

</style>