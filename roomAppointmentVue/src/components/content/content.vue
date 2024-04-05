<template>
    <el-dialog v-dialogDrag title="内容查看" :visible.sync="contentShow" width="90%" :lock-scroll="true" height="800px"
        @close="close">
        <el-tinymce readonly='true' v-model="content" :height="800"></el-tinymce>
    </el-dialog>

</template>
  
<script>
import { post } from "@/utils/http";
import { Debounce } from "@/utils/index"
import store from "@/store";
export default {

    props: {

        value: { type: [Boolean], default: false },
        content: {
            type: String,//默认的请求路径
            default: "",
        },
        where: {},



    },
    watch: {
        "value": {
            immediate: true,//该回调将会在侦听开始之后被立即调用
            handler: function (n, o) {
                this.contentShow = n;
            }
        }
    },
    data() {
        return {

            contentShow: false,
        }
    },
    created() {


    },
    methods: {
        close() {
            console.log("执行aaaaa");
            this.$emit('input', false);
        }

    }
}
</script>