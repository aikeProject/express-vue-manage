<template>
    <div class="_Foundlist">
        <el-form :inline="true" ref="search_data" :model="search_data">
            <el-row type="flex" justify="center">
                <el-col :span="24">
                    <el-form-item label="投标时间筛选:">
                        <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间">--
                        </el-date-picker>
                        --
                        <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间">--
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="search" @click="clickSelect">筛选</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item class="btnRight">
                        <el-button type="primary" size="small" icon="view" @click="clickAdd()">添加</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="table_container">
            <el-table v-if="tableData.length > 0"
                      :data="tableData"
                      max-height="450"
                      border
                      :default-sort="{prop: 'date', order: 'descending'}"
                      style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
                <el-table-column prop="date" label="创建时间" align="center" width="250">
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px;">{{scope.row.date}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
                <el-table-column prop="describe" label="收支描述" align="center" width="150"></el-table-column>
                <el-table-column prop="income" label="收入" align="center" width="170">
                    <template slot-scope="scope">
                        <span style="color:#00d053">+ {{scope.row.income}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="expend" label="支出" align="center" width="170">
                    <template slot-scope="scope">
                        <span style="color:#f56767">- {{scope.row.expend}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cash" label="账户现金" align="center" width="170">
                    <template slot-scope="scope">
                        <span style="color:#4db3ff">{{scope.row.cash}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center" width="170"></el-table-column>
                <el-table-column prop="operation" label="操作" align="center" width="170" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="warning" icon="edit" size="small" @click="clickEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" icon="delete" size="small" @click="clickDel(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination v-if="paginations.total > 0" :page-sizes="paginations.page_sizes"
                                       :page-size="paginations.page_size" :layout="paginations.layout"
                                       :total="paginations.total" :current-page.sync="paginations.page_index"
                                       @current-change="cuechange" @size-change="sizechange"></el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <DialogFound :dialog='dialog' :form='form' @update="getProfile"></DialogFound>
    </div>
</template>

<script>
    import DialogFound from '../components/DialogFound';

    export default {
        name: "Foundlist",
        components: {DialogFound},
        comments: {
            DialogFound
        },
        data() {
            return {
                tableData: [],
                allTableData: [],
                filterTableData: [],
                search_data: {
                    startTime: "",
                    endTime: ""
                },
                dialog: {
                    show: false,
                    title: "",
                    option: "edit"
                },
                form: {
                    type: "",
                    describe: "",
                    income: "",
                    expend: "",
                    cash: "",
                    remark: "",
                    id: ""
                },
                //需要给分页组件传的信息
                paginations: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 5, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },
            };
        },
        created() {
            // 获取数据
            this.getProfile();
        },
        methods: {
            getProfile() {
                this.$axios('/api/profiles').then(res => {
                    const data = res.data.model;
                    this.allTableData = data;
                    this.filterTableData = data;
                    // 设置分页
                    this.setPagination();
                });
            },
            // 添加
            clickAdd() {
                this.dialog = {
                    show: true,
                    title: '添加资金信息',
                    option: 'add'
                };
                this.form = {
                    type: "",
                    describe: "",
                    income: "",
                    expend: "",
                    cash: "",
                    remark: "",
                    id: ""
                };
            },
            // 编辑
            clickEdit(row) {
                this.dialog = {
                    show: true,
                    stitle: '修改资金信息',
                    option: 'edit'
                };
                this.form = {
                    type: row.type,
                    describe: row.describe,
                    income: row.income,
                    expend: row.expend,
                    cash: row.cash,
                    remark: row.remark,
                    id: row._id
                };
            },
            // 删除
            clickDel(row) {
                this.$axios.delete(`/api/profiles/delete/${row._id}`)
                    .then(res => {
                        this.$message('删除成功');
                        this.getProfile();
                    });
            },
            // 当前分页
            cuechange(page) {
                const num = this.paginations.page_size * (page - 1);
                const table = this.allTableData.filter((item, index) => {
                    return index >= num;
                });
                this.tableData = table.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
            },
            // 设置分页
            setPagination() {
                this.paginations.total = this.allTableData.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 5;
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
            },
            // 改变分页大小
            sizechange(siez) {
                this.paginations.page_index = 1;
                this.paginations.page_size = siez;
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < siez;
                });
            },
            // 筛选
            clickSelect() {
                const {startTime, endTime} = this.search_data;
                if (!startTime || !endTime) {
                    this.$message({
                        type: 'warning',
                        message: '请选择时间的区间'
                    });
                    return;
                }
                const start = startTime.getTime();
                const end = endTime.getTime();
                this.allTableData = this.filterTableData.filter(item => {
                    let time = new Date(item.date).getTime();
                    console.log(time);
                    return time >= start && time <= end;
                });
                this.setPagination();
            }
        }
    }
</script>

<style scoped>
    ._Foundlist {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }

    .btnRight {
        float: right;
    }

    .pagination {
        text-align: right;
        margin-top: 10px;
    }
</style>