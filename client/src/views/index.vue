<template>
    <div class="index">
        <el-container>
            <el-header>
                <HeaderNav/>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <AsideNav/>
                </el-aside>
                <el-main>
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
        comments: {
            HeaderNav,
            AsideNav
        }
    }
</script>


<style scoped>

</style>
