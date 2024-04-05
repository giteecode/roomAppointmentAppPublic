<template>
    <div class="margin-b-md">
        <span :class="{ 'number': required }">
            <el-tag>第{{postionIndex+1}}题 <span v-if="hasScore == true">（{{ score }}分）</span></el-tag>
        </span>
        <span class="title">
            {{ title }} </span>
        <span></span>
    </div>
</template>

<script>
import { post } from "@/utils/http";
import { Debounce } from "@/utils/index"
import store from "@/store";
export default {

    props: {
        postionIndex:{
            type: Number,
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

<style scoped>
.number {
    padding-right: 10px;
}

.number:before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
}

.title {
    line-height: 2.5;
}
</style>