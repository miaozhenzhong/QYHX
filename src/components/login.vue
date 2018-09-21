<template>
    <div class="login">
        <div class="loginBox">
            <h4>企业画像</h4>
            <el-input v-model="input" placeholder="请输入用户名" class="elInputs"></el-input>
            <el-input v-model="keyword" placeholder="请输入密码" type="password" class="elInputs"></el-input>
            <el-button type="primary" class="btn" @click="login">登录</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return{
            input:'',
            keyword:''
        }
    },
    mounted(){

    },
    methods:{
        login(){
            if ((this.input === '123' && this.keyword === '123') || (this.input === 'admin' && this.keyword === 'admin')) {
                this.$router.push('main/search')
            }
        }
    }
}
</script>
<style scoped>
    .login{
        height: 100%;
        width: 100%;
        background: url('../assets/images/bg.jpg') no-repeat;
        background-size: cover;
        display: flex;
        justify-content:center;
        align-items:center;
    }
    .loginBox{
        width: 387px;
        background: #fff;
        height: 300px;
        box-shadow: 0 0 10px -4px rgba(0,0,0,0.4);
        padding: 20px;
    }
    .loginBox h4{
        font-size: 18px;
        color: #525252;
        font-weight: normal;
        margin-bottom: 30px;
        padding-top: 39px;
    }
    .elInputs{
        width: 80%;
        margin-bottom: 20px;
    }
    .loginBox .btn{
        margin: 0 30px;
    }
</style>


