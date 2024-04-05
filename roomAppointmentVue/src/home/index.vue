<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex2" class="el-menu-home" mode="horizontal" @select="handleSelect"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router="">
          <el-menu-item index="/home/index">图书馆预约</el-menu-item>

          <el-menu-item index="/dashboard" v-if="token && roleId == 0">管理端</el-menu-item>
          <el-menu-item style="float:right" v-if="!token" index="/home/login">登录</el-menu-item>
          <el-menu-item style="float:right" v-if="!token" index="/home/register">注册</el-menu-item>
          <el-menu-item v-if="token" style="float:right" index="/personcenter">{{ name }}</el-menu-item>
          <el-menu-item v-if="token" style="float:right" @click="reset">注销</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <div class="main-app margin-top-xs">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer class="footer-box">
        <div class="">
          <!-- <div>京ICP证030173号</div> -->
        </div>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
import store from "@/store";
import Tinymce from "@/components/Tinymce";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: { tinymce: Tinymce },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    ...mapGetters(["name", "token", "roleId"]),
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

.el-menu-home {
  padding: 0 150px;
}

.main-app {
  margin: 10px 100px;
  padding: 20px;
  min-height: 100vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.footer-box {
  background-color: #545C64;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
