<template>
    <div class="aside">
        <el-menu
                :default-active="navList[0].path"
                @open="handleOpen"
                @close="handleClose"
                :router="true">
            <template v-for="(item, index) in navList">
                <template v-if="!!item.children && (Array.isArray(item.children) && item.children.length!==0)">
                    <el-submenu :index="(index+'')">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <template v-for="(child, one) in item.children">
                            <template
                                    v-if="!!child.children && (Array.isArray(child.children) && child.children.length!==0)">
                                <el-submenu :index="(index+'-'+one)">
                                    <template slot="title">{{child.name}}</template>
                                    <template v-for="ch in child.children">
                                        <el-menu-item :index="ch.path">{{ch.name}}</el-menu-item>
                                    </template>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="child.path">{{child.name}}</el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.name}}</span>
                        </template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {navList} from '../config';

    export default {
        name: "AsideNav",
        data: function () {
            return {
                navList,
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .aside {
        height: 100%;
    }

    .el-menu {
        height: 100%;
    }
</style>