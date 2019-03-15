<template>
    <el-row class="header-height">
        <el-col :span="12" :offset="12" class="header-height">
            <div class="header-height header-con">
                <div class="head-img">
                    <img class="head" src="" alt="">
                </div>
                <el-dropdown trigger="click" size="small">
                    <el-button type="primary" size="small">
                        管理<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" size="small">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "HeaderNav"
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
    }

    .header-con {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .head {
        width: 50px;
        height: 50px;
        display: block;
        border-radius: 50%;
    }
</style>