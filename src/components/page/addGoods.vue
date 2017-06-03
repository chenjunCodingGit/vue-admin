<template>
    <div class="myadd">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="图片名称">
                <el-input v-model="ruleForm.image"></el-input>
            </el-form-item>
            <el-form-item class="myform2" label="商品名称" prop="names">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item class="myform3" label="商品规格" prop="scale">
                <el-input v-model="ruleForm.scale"></el-input>
            </el-form-item>
            <el-form-item class="myform4" label="商品描述" prop="describes">
                <el-input v-model="ruleForm.describes"></el-input>
            </el-form-item>
            <el-form-item class="myform5" label="商品价格" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item class="myform6" label="商品简称" prop="shortname">
                <el-input v-model="ruleForm.shortname"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import staticList from '../../data/ip.js'

export default {
    data() {
        return {
            regUrl: staticList.staticList[0],
            ruleForm: {
                image: '',
                name: '',
                shortname:'',
                scale: '',
                describes: '',
                price: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            
            // this.$refs[formName].validate((valid) => {
            // });
            if (this.ruleForm.image && this.ruleForm.name&& this.ruleForm.shortname && this.ruleForm.scale && this.ruleForm.describes && this.ruleForm.price) {

                this.$http.jsonp(
                    'http://' + this.regUrl + '/php/userAdmin/goods/insertgood.php',
                    {
                        params: {
                            image: './static/home/'+this.ruleForm.image,
                            title: this.ruleForm.name,
                            shortname: this.ruleForm.shortname,
                            scale: this.ruleForm.scale,
                            describes: this.ruleForm.describes,
                            price: Number(this.ruleForm.price),
                        },
                        jsonp: 'callback'
                    }
                ).then((res) => {
                    if (res.ok) {
                        res.json().then((res) => {
                            // console.log(res)
                            if(res.msg=="success"){
                                this.ruleForm.image=this.ruleForm.name=this.ruleForm.scale=this.ruleForm.describes=this.ruleForm.price=''
                                alert('商品入库成功')
                            }else{
                                alert('商品价格请输入数字')
                                this.ruleForm.price=''
                            }
                        })
                    }
                })
            } else {
                alert("请将信息补充完整")
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            // console.log(this.$refs[formName].resetFields())
        }
    }
}
</script>
<style lang="less">
.myadd {
    .el-form.demo-ruleForm {
        width: 70%;
        margin-left: 20%;
        .myform2 {
            margin-top: -230px;
        }
        .myform3 {
            margin-top: -159px;
        }
        .myform4 {
            margin-top: -90px;
        }
        .myform5 {
            margin-top: -20px;
        }
        .el-form-item__error {
            display: none;
        }
    }
}
</style>
