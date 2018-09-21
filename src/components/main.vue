<template>
    <div class="mains">
        <div class="header">
            <h4 class="title">企业画像</h4>
            <div class="exit">
                <div class="routeBox">
                    <p class="route" @click="skip('search')">主页</p>
                    <p class="route" @click="pass('/#/dataMap')">数据统计</p>
                </div>
                <div @click="exit" style="float:right">
                    <img src="../assets/images/logout.svg" class="icon">
                    <p class="exitText">退出</p>
                </div>
            </div>
        </div>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>
<script>
export default {
    name:'main',
    data(){
        return{

        }
    },
    methods:{
        exit(){
            this.$router.push('/login')
        },
        skip(name){
            this.$router.push(name)
        },
        pass(URL) {
            let div = document.createElement('div')
            div.setAttribute('id','pass')
            div.innerHTML = `<a href="${URL}" target="_blank" id="skip"></a>`
            document.body.appendChild(div)
            document.getElementById('skip').click();
            document.body.removeChild(document.getElementById('pass'))
            div = null
        }
    }
}
</script>
<style scoped>
    .header{
        width: 100%;
        height: 70px;
        background: #3ba0f1;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10
    }
    .title{
        float: left;
        line-height: 70px;
        padding-left: 40px;
        font-size: 20px;
        color: #fff;
        font-weight: 500;
    }
    .content{
        padding-top: 85px;
        position: relative;
        z-index: 1
    }
    .mains{
        height: 100%;
    }
    .icon{
        height: 25px;
        float: left;
        padding-right: 13px;
    }
    .exitText{
        color: #fff;
        float: left;
    }
    .exit{
        float: right;
        padding-right: 60px;
        padding-top: 24px;
        cursor: pointer;
    }
    .route{
        float: left;
        width: 85px;
        margin: 0 20px;
        background: #fff;
        border-radius: 6px;
        padding: 5px 10px;
        font-size: 15px;
        color: #3ba0f1;
        transform: translateY(-5px);
        transition: all 0.3s;
        height: 35px;
        line-height: 26px;
    }
    .routeBox{
        margin-right: 25px;
        float: left;
    }
    .route:hover{
        background: transparent;
        color: #fff
    }
</style>


