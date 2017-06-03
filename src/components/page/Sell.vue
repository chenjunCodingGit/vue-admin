<template>
    <div class="mysell">
        <section class="chart-container">
            <el-row>
                <el-col :span="24">
                    <div id="chartColumn" style="width:100%; height:400px;"></div>
                </el-col>
            </el-row>
        </section>
    </div>
</template>

<script>
import echarts from 'echarts'
import staticList from '../../data/ip.js'

export default {
    created() {
        // const _this = this
        this.$http.jsonp(
            'http://' + this.regUrl + '/php/userAdmin/sell/selectsellnum.php',
            {
                // params: {
                //     id: this.tableData4[index].id
                // },
                jsonp: 'callback'
            }
        ).then((res) => {
            if (res.ok) {
                res.json().then((res) => {
                    for (let i in res) {
                        this.figure[i] = res[i].figure
                        this.shortname[i] = res[i].shortname
                        this.drawColumnChart()
                    }
                })
            }
        })
    },
    data() {
        return {
            figure: [], //销量
            shortname:[],//商品简称
            regUrl: staticList.staticList[0],
            chartColumn: null,
            chartBar: null,
            chartLine: null,
            chartPie: null
        }
    },

    methods: {
        drawColumnChart() {
            this.chartColumn = echarts.init(document.getElementById('chartColumn'));
            this.chartColumn.setOption({
                title: { text: '母婴之家APP所有商品总销售量' },
                tooltip: {},
                xAxis: {
                    data: this.shortname
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: this.figure,
                    
                }]
            });
        },
        drawCharts() {
            this.drawColumnChart()
        },
    },

    mounted: function () {
        this.drawCharts()
    },
    updated: function () {
        this.drawCharts()
    }
}
</script>

<style lang="less">
.mysell {
    .chart-container {
        width: 80%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/
    .el-col {
        padding: 30px 20px;
    }
}
</style>
