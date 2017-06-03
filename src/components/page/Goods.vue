<template>
    <div class="mygoods">
        <el-table :data="tableData" border style="width: 80%">
            <el-table-column label="商品名称" width="280">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>{{ scope.row.describes }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>{{ scope.row.title }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="商品规格" width="180">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.scale }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品单价" width="180">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.price }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import staticList from '../../data/ip.js'

export default {
    created() {
        this.$http.jsonp(
            'http://' + this.regUrl + '/php/userAdmin/goods/selectgoods.php',
            {
                // params: {
                //     id: this.tableData4[index].id
                // },
                jsonp: 'callback'
            }
        ).then((res) => {
            if (res.ok) {
                res.json().then((res) => {
                    // console.log(res)
                    this.tableData = res
                })
            }
        })
    },
    data() {
        return {
            regUrl: staticList.staticList[0],
            tableData: []
        }
    },
    methods: {
        handleDelete(index,row) {
            console.log(row)
            this.$http.jsonp(
                'http://' + this.regUrl + '/php/userAdmin/goods/deleteone.php',
                {
                    params: {
                        id: this.tableData[index].id
                    },
                    jsonp: 'callback'
                }
            ).then((res) => {
                if (res.ok) {
                    res.json().then((res) => {
                        // console.log(res)
                    })
                }
            })
            this.tableData.splice(index, 1)
        }
        
    }
}
</script>
<style lang="less">
.mygoods {
    .el-table {
        left: 18px;
    }
    .el-table th>.cell {
        text-align: center;
    }
}
</style>
