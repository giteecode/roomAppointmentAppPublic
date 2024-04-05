<template>


    <div class="content">

        <el-form ref="form" :model="stem" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="stem.title"></el-input>
            </el-form-item>
            <el-form-item label="必填">
                <el-switch v-model="stem.required"></el-switch>
            </el-form-item>
            <el-form-item label="知识点">
                <el-select v-model="stem.knowledgPointsIds" multiple collapse-tags style="margin-left: 20px;"
                    placeholder="请选择">
                    <el-option v-for="item in knowledgPoints" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分数">
                <el-switch v-model="stem.hasScore"></el-switch>
            </el-form-item>
            <el-form-item label="总分值">
                <el-input v-model="stem.score"></el-input>
            </el-form-item>

            <el-form-item label="解析">
                <el-input type="textarea" v-model="stem.resolution"></el-input>
            </el-form-item>


        </el-form>
    </div>

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
        stem: {
            type: Object,

        },
        knowledgPoints: {
            type: Array,
            default: []
        }

    },
    watch: {
        // "options": {
        //     immediate: true,//该回调将会在侦听开始之后被立即调用
        //     handler: function (n, o) {
        //         if (Array.isArray(n)) {
        //             this.resolution = n.map(x => x.resolution).reduce((prev, next) => { return next + " " + prev; });
        //         }
        //         console.log(n, o)
        //     }
        // }
    },

    data() {
        return {

        }
    },
    created() {

    },
    methods: {


    }
}
</script>