<template>
    <div class="_setting">
        <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="100px">
            <el-form-item>
                <div class="upload-dashed">
                    <el-upload
                            class="avatar-uploader"
                            action="/api/users/edit"
                            ref="upload"
                            :headers="headers"
                            :show-file-list="false"
                            :on-change="changeUpload"
                            :before-upload="beforeAvatarUpload"
                            :on-success="uploadSuccess"
                            :data="form"
                            :auto-upload="false">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="form.name" aplaceholder="请输入正确"></el-input>
            </el-form-item>
            <el-form-item label="旧密码">
                <el-input v-model="form.passwordOld" aplaceholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="form.passwordNew" aplaceholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" aplaceholder="请输入正确邮箱"></el-input>
            </el-form-item>
            <el-form-item class="edit-btn">
                <el-button type="primary" style="width: 100px" @click="onSubmit">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import CY from "../utils/CY";

    export default {
        name: "Setting",
        // 组件
        components: {},
        // 组件的定义只接受 function
        data() {
            return {
                form: {
                    name: '',
                    passwordOld: '',
                    passwordNew: '',
                    email: '',
                },
                imageUrl: '',
                avatar: false,
                rules: {
                    name: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在2到30字符之间', trigger: 'blur'}
                    ],
                    email: [
                        {type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    passwordOld: [
                        {required: true, message: '密码不能为空'},
                        {min: 6, max: 30, message: '长度在6到30之间'}
                    ],
                    passwordNew: [
                        {required: true, message: '确认密码不能为空'},
                        {min: 6, max: 30, message: '长度在6到30之间'},
                    ],
                }
            };
        },
        props: {},
        watch: {},
        // 计算属性
        computed: {
            user() {
                return this.$store.getters.user;
            },
            headers() {
                const headers = {};
                if (localStorage.eleToken) {
                    // 设置统一的请求头 添加认证信息
                    headers.Authorization = localStorage.eleToken;
                }
                return headers;
            }
        },
        // props 可以是数组或对象，用于接收来自父组件的数据
        methods: {
            onSubmit() {
                // avatar true 图像被修改过
                if (this.avatar) {
                    this.$refs.upload.submit();
                } else {
                    const formData = new FormData();
                    const {form, user} = this;
                    for (let key in form) {
                        formData.append(key, form[key]);
                    }
                    formData.append('id', user.id);
                    CY.POST('/api/users/edit', formData).then(() => {
                        this.$message({
                            type: 'success',
                            message: '修改成功, 请重新登录'
                        });
                        this.$router.push("/login");
                    });
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            changeUpload(file, fileList) {
                console.log('-changeUpload-');
                this.avatar = true;
                this.imageUrl = URL.createObjectURL(file.raw);
            }
            ,
            uploadSuccess(res, file) {
                if (res && res.model) {
                    this.$message({
                        type: 'success',
                        message: '修改成功, 请重新登录'
                    });
                    this.$router.push("/login");
                }
            }
        },
        // 组件实例刚被创建，组件属性计算之前，如data等属性
        beforeCreate() {
        },
        // 组件实例创建完成，属性已经绑定，但dom还未生成，$el属性还不存在
        created() {
        },
        // 在挂载开始之前被调用：相关的 render 函数首次被调用
        beforeMount() {
        },
        // vm.$el已挂载在文档内，对已有dom节点的操作可以在这期间进行
        mounted() {
            const {avatar, name, email} = this.user;
            this.imageUrl = avatar || '';
            this.form = {...this.form, name, email};
        },
        // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
        beforeUpdate() {
        },
        // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。
        updated() {
        },
        // keep-alive 组件激活时调用。
        activated() {
        },
        // keep-alive 组件停用时调用。
        deactivated() {
        },
        // 实例销毁之前调用。在这一步，实例仍然完全可用。
        beforeDestroy() {
        },
        // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
        destroyed() {
        }
    }
</script>

<style>
    ._setting {
        width: 400px;
        padding-top: 50px;
        margin: 0 auto;
    }

    .avatar-uploader {
        display: flex;
        justify-content: center;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
        object-fit: cover;
    }

    .upload-dashed {
        margin-bottom: 20px;
    }

    .edit-btn {
        display: flex;
        justify-content: center;
    }
</style>