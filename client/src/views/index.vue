<template>
    <div class="index">
        <el-container style="height: 100%;">
            <el-header class="el-header">
                <HeaderNav/>
            </el-header>
            <el-container style="min-width: 960px;">
                <el-aside class="el-aside">
                    <AsideNav/>
                </el-aside>
                <el-main style="min-width: 760px;">
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import HeaderNav from '../components/HeaderNav';
    import AsideNav from '../components/AsideNav';

    export default {
        name: 'index',
        components: {
            HeaderNav,
            AsideNav
        }
    }
</script>


<style scoped>
    .index {
        width: 100%;
        height: 100%;
    }
    .el-aside {
        width: 200px!important;
    }
    .el-header {
        border-bottom: solid 1px #e6e6e6;
    }
</style>
