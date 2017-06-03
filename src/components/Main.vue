<template>
    <div class="mymain">
        <div class="header">

        </div>
        <el-row class="tac">
            <el-col :span="4">
                <el-menu @select='handleChange' default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-message"></i>导航一</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
    
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>用户展示</el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>销售总量</el-menu-item>
                </el-menu>
            </el-col>
            <router-view></router-view>
    
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleChange(index) {//点击得到唯一index
            console.log(index)
            this.$router.push('/'+index)
        }
    }
}

</script>


<style lang="less">
#app {
    margin-top: 0px;
    .mymain {
        .header{
            height: 100px;
            width: 100%;
            background-color: #324157;
            margin-bottom: 2px;
        }
    }
}
</style>
