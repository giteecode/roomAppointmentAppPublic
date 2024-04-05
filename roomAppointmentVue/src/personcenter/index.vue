<template>
    <div>
        <el-container>

            <el-aside width="250px" style="height:1000px">
                <el-menu :default-active="activeIndex2" class="el-menu-home" @select="handleSelect"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router="">
                    <el-menu-item index="/personcenter/edituserinfo">个人信息</el-menu-item>
                    <!-- <el-menu-item index="/personcenter/appointment-my">我的预约</el-menu-item>
                    <el-menu-item index="/personcenter/score-my">我的积分</el-menu-item> -->
                </el-menu>
            </el-aside>
            <el-main>
                <div class="main-app margin-top-xs">
                    <router-view></router-view>
                </div>
            </el-main>

        </el-container>

    </div>
</template>

<script>
import store from "@/store";
import Tinymce from "@/components/Tinymce";
import { mapGetters } from "vuex";
export default {
    name: "PersonCenter",
    components: { tinymce: Tinymce },
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1'
        }
    },
    computed: {
        ...mapGetters(["name", "token"]),
    },
    created() {

    },
    methods: {
        reset() {
            this.$store.dispatch('user/logout'),
                console.log("reset");
        }
    }
};
</script>
<style scoped >
.el-header {
    padding: 0px !important;
}


.main-app {
    margin: 10px 100px;


}

.el-menu-home {
    height: 75vh;
}

.footer-box {
    background-color: #545C64;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
