<template>
    <div class="myuser">
        <el-table :data="tableData4" border style="width: 50%" max-height="250">
    
            <el-table-column prop="name" label="用户" width="120">
            </el-table-column>
            <el-table-column prop="tel" label="电话" width="130">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="210">
            </el-table-column>
    
            <el-table-column fixed="right" label="操作" width="120">
                <template scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import staticList from '../../data/ip.js'

export default {
    methods: {
        deleteRow(index, rows) {
            // console.log(this.tableData4[index].name)
            if (this.tableData4[index].name == this.username) {
                alert('当前用户正在登录，不能移出')
            } else {
                this.$http.jsonp(
                    'http://' + this.regUrl + '/php/userAdmin/user/deleteone.php',
                    {
                        params: {
                            id: this.tableData4[index].id
                        },
                        jsonp: 'callback'
                    }
                ).then((res) => {
                    if (res.ok) {
                        res.json().then((res) => {
                            console.log(res)
                        })
                    }
                })

                rows.splice(index, 1);
            }
        }
    },
    created() {
        this.$http.jsonp(
            'http://' + this.regUrl + '/php/session.php',
            {
                jsonp: 'callback'
            }
        ).then((res) => {
            if (res.ok) {
                res.json().then((res) => {
                    // console.log(res)
                    this.username = res.status
                })
            }
        })

        this.$http.jsonp(
            'http://' + this.regUrl + '/php/userAdmin/user/selectuser.php',
            {

                jsonp: 'callback'
            }
        ).then((res) => {
            if (res.ok) {
                res.json().then((res) => {
                    // console.log(res)
                    this.tableData4 = res
                })
            }
        })
    },
    data() {
        return {
            username: '',
            regUrl: staticList.staticList[0],
            tableData4: []
        }
    }
}

</script>


<style lang="less">
.myuser {
    .el-table {
        left: 150px;
        top: 40px;
    }
    .el-table th>.cell {
        text-align: center;
    }
}
</style>
