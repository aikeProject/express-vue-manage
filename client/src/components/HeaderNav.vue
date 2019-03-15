<template>
    <el-row class="header-height">
        <el-col :span="12" :offset="12" class="header-height">
            <div class="header-height header-con">
                <div class="head-img">
                    <img class="head" :src="user.avatar" alt="avatar">
                </div>
                <div class="user-info">
                    {{user.name}}
                </div>
                <el-dropdown @command="dropBtn" trigger="click" size="small">
                    <el-button type="primary" size="small">
                        管理<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" size="small">
                        <el-dropdown-item command="info">个人信息</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "HeaderNav",
        computed: {
            user() {
                return this.$store.getters.user
            }
        },
        methods: {
            dropBtn: function (item) {
                if (!item) return;
                switch (item) {
                    case 'info':
                        this.info();
                        break;
                    case 'logout':
                        this.logout();
                        break;
                }
            },
            info: function () {
                this.$router.push('index/infoshow');
            },
            logout: function () {
                localStorage.clear('eleToken');
                this.$store.dispatch('clearCurrentState');

                this.$router.push('/login');
            }
        },
    }
</script>

<style scoped>
    .header-height {
        height: 100%;
    }

    .head-img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20px;
        box-sizing: border-box;
        border: 1px solid #3a8ee6;
    }

    .header-con {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .head {
        flex: 0 0 50px;
        width: 50px;
        height: 50px;
        display: block;
        border-radius: 50%;
    }

    .user-info {
        color: #989ba1;
        margin-right: 10px;
    }
</style>