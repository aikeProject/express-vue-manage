<template>
    <div class="logFund">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show"
                   :close-on-click-modal="false" :close-on-press-escape="false"
                   :modal-append-to-body="false">
            <div class="from">
                <el-form ref="form" :model="form" :rules="form_rules" label-width="120px"
                         style="margin:10px;width:auto;">
                    <el-form-item label="收支类型：">
                        <el-select v-model="form.type" placeholder="收支类型">
                            <el-option v-for="(formType, index) in format_type_list" :key="index" :label="formType"
                                       :value="formType"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="describe" label="收支描述：">
                        <el-input type="describe" v-model="form.describe"></el-input>
                    </el-form-item>
                    <el-form-item prop='income' label="收入:">
                        <el-input type="income" v-model="form.income"></el-input>
                    </el-form-item>
                    <el-form-item prop='expend' label="支出:">
                        <el-input type="expend" v-model="form.expend"></el-input>
                    </el-form-item>
                    <el-form-item prop='cash' label="账户现金:">
                        <el-input type="cash" v-model="form.cash"></el-input>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="dialog.show = false">取消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DialogFound",
        // 组件
        components: {},
        // 组件的定义只接受 function
        data() {
            return {
                format_type_list: [
                    "提现",
                    "提现手续费",
                    "充值",
                    "优惠券",
                    "充值礼券",
                    "转账"
                ],
                form_rules: {
                    describe: [
                        {required: true, message: "收支描述不能为空！", trigger: "blur"}
                    ],
                    income: [
                        {required: true, message: "收入不能为空！", trigger: "blur"}
                    ],
                    expend: [
                        {required: true, message: "支出不能为空！", trigger: "blur"}
                    ],
                    cash: [{required: true, message: "账户不能为空！", trigger: "blur"}]
                }
            };
        },
        props: {
            dialog: Object,
            form: Object
        },
        watch: {},
        // 计算属性
        computed: {},
        // props 可以是数组或对象，用于接收来自父组件的数据
        methods: {
            onSubmit(from) {
                console.log('from', from);
                this.$refs[from].validate(valid => {
                    console.log('valid:', valid);
                    if (valid) {
                        const url = this.dialog.option === 'add' ? 'add' : `edit/${this.form.id}`;
                        this.$axios.post(`/api/profiles/${url}`, this.form).then(res => {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.dialog.show = false;
                            this.$emit('update');
                        });
                    }
                })
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

<style scoped>

</style>