<template>
    <div class="login-container">
        <el-form ref="formData" :model="formData" :rules="loginRules" class="login-form" auto-complete="on"
            label-position="left">

            <div class="title-container">
                <h3 class="title">用户注册</h3>
            </div>

            <el-form-item prop="userName">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input ref="userName" v-model="formData.userName" placeholder="请填写用户名称" name="userName" type="text"
                    tabindex="1" auto-complete="on" />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input :key="passwordType" ref="password" v-model="formData.password" :type="passwordType"
                    placeholder="请填写密码" name="password" tabindex="2" auto-complete="on"
                    @keyup.enter.native="handleRegister" />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
            </el-form-item>
            <el-form-item prop="twopassword">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input :key="twopasswordType" ref="twopassword" v-model="formData.twopassword"
                    :type="twopasswordType" placeholder="请填写重复密码" name="twopassword" tabindex="3" auto-complete="on" />
                <span class="show-pwd" @click="showTwoPwd">
                    <svg-icon :icon-class="twopasswordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
            </el-form-item>
            <el-form-item prop="Name">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input ref="Name" v-model="formData.Name" placeholder="请填写姓名" name="Name" type="text" tabindex="1"
                    auto-complete="on" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-upload-sigle-images :limit="2" v-model="formData.avatar"></el-upload-sigle-images>
            </el-form-item>


            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                @click.native.prevent="handleRegister">注册</el-button>

            <div class="tips">
                <span style="margin:0px" @click="Login()">返回首页</span>

            </div>

        </el-form>
    </div>
</template>

<script>
import router from '@/router';
import UploadImages from "@/components/upload/upload-images"
import { UserRegisterApi } from "@/api/identiys"
export default {
    components: {
        uploadImages: UploadImages
    },
    name: 'register',
    data() {

        return {
            lock: 0,
            formData: {
                userName: '',
                password: '',
                twopassword: "",
                avatar: ""
            },
            loginRules: {
                userName: [
                    { required: true, trigger: 'blur', message: "请输入用户名", }

                ],
                password: [
                    { required: true, trigger: 'blur', message: "请输入密码", },
                ],
            },
            loading: false,
            passwordType: 'password',
            twopasswordType: "password",
            redirect: undefined
        }
    },

    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        showTwoPwd() {
            if (this.twopasswordType === 'password') {
                this.twopasswordType = ''
            } else {
                this.twopasswordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.twopassword.focus()
            })
        },
        Login() {
            router.push({
                path: "/home/index"
            })
        },

        async handleRegister() {
            if (this.lock == 1) return;
            this.$refs.formData.validate(async valid => {
                if (valid) {
                    if (this.formData.password != this.formData.twopassword) {
                        this.$message({
                            message: '密码和确认密码不一致!',
                            type: 'error'
                        });
                        return;
                    }
                    this.lock = 1;
                    this.loading = true
                    this.formData.roleId = 1;
                    let { data, success } = await this.$post(`/user/add`, this.formData);

                    this.lock = 0;
                    if (success) {
                        this.$message({
                            message: '恭喜你注册成功',
                            type: 'success'
                        });
                        this.loading = false;
                        setTimeout(() => {
                            this.Login();
                        }, 2000);
                    }

                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.el-upload--picture-card {
    background-color: transparent;
}

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
        text-align: center;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
