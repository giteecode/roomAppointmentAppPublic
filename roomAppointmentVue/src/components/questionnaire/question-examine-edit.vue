<template>


    <div class="content">

        <el-form ref="form" :model="stem" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="stem.title" :readonly="true"></el-input>
            </el-form-item>


            <el-form-item label="总分值">
                <el-input v-model="stem.score" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="打分">
                <el-input v-model="stem.gainScore"></el-input>
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


    }
}
</script>