<template>
    <div class="Login">
        <el-form
            label-width="120px"
            label-position="left"
            :inline="true"
            :model="user">
            <el-form-item label="userName:">
                <el-input v-model="user.userName"></el-input>
            </el-form-item>
            <el-form-item label="passWord:">
                <el-input v-model="user.passWord" type="password"></el-input>
            </el-form-item>
            <div class="btn">
                <el-button type="primary">
                    Login
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        name: "Login",
        components: {
            Login,
        }
    })
    export default class Login extends Vue {

        private user: object = {
            userName: "",
            passWord: "",
        };
    }
</script>

<style lang="less">
    .Login {
        position: absolute;
        top: 50%;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateY(-30%);
        width: 500px;
        margin: auto;

        .el-form--inline .el-form-item {
            margin-bottom: 50px;
        }

        .el-input {
            width: 300px;

            input.el-input__inner {
                border-top: 0;
                border-left: 0;
                border-right: 0;
                border-radius: 0;
            }
        }

        .btn {

            .el-button {
                width: 420px;
                font-size: 18px;
            }
        }
    }
</style>
