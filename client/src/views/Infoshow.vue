<template>
    <div class="_infoshow">
        <el-row type="flex" class="row-bg" justify="center" style="flex-wrap: wrap;">
            <el-col :xs="24" :sm="24" :md="24" :lg="4">
                <div class="user">
                    <img :src="user.avatar" class='avatar' alt="">
                </div>
            </el-col>
            <el-col type="flex" :xs="24" :sm="24" :md="24" :lg="20">
                <div class="userinfo">
                    <div class="user-item">
                        <i class="fa fa-user fa-color"></i>
                        <span>{{user.name}}</span>
                    </div>
                    <div class="user-item">
                        <i class="fa fa-cog fa-color"></i>
                        <span>{{user.identity == 'manager' ? '管理员' : '普通员工'}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Infoshow",
        computed: {
            user() {
                return this.$store.getters.user;
            }
        }
    }
</script>

<style scoped>
    ._infoshow {
        width: 100%;
    }

    .user > img {
        display: block;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid #3a8ee6;
    }

    .fa-color {
        color: #3a8ee6;
        font-size: 25px;
    }

    .userinfo {
        padding-top: 30px;
    }

    .user-item {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }

    .user-item > span {
        margin-left: 10px;
    }
</style>