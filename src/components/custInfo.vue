<template>
    <div class="box">
        <div class="custInfo">
            <h4>{{custInfo.companyName}}<span class="state" v-if="custInfo.registrationStatus">{{custInfo.registrationStatus}}</span></h4>
            <div class="block clearfix">
                <p v-for="(item,index) in custInfo.companyLabelArr" :key="index">{{item}}</p>
            </div>
            <div class="info clearfix">
                <p>网址：<span :class="custInfo.website?'url':'urls'" @click="skipUrl(custInfo.website)">{{custInfo.website?custInfo.website:'暂无信息'}}</span></p>
                <p>公司地址：{{custInfo.registeredAddress}}</p>
                <p>简介：{{custInfo.companyProfile}}</p>
            </div>
        </div>
        <div class="baseInfo">
            <h4 class="title">工商信息</h4>
            <table border="0">
                <tr>
                    <th><p class="custTH">法人代表</p></th>
                    <td><p class="custTD">{{custInfo.legalRepresentative}}</p></td>
                    <th><p class="custTH">所属行业</p></th>
                    <td><p class="custTD">{{custInfo.industryInvolved}}</p></td>
                </tr>
                <tr>
                    <th><p class="custTH">所属省市</p></th>
                    <td><p class="custTD">{{custInfo.provinces}}</p></td>
                    <th><p class="custTH">注册状态</p></th>
                    <td><p class="custTD">{{custInfo.registrationStatus}}</p></td>
                </tr>
                <tr>
                    <th><p class="custTH">成立时间</p></th>
                    <td><p class="custTD">{{custInfo.establishedTime}}</p></td>
                    <th><p class="custTH">所属行业</p></th>
                    <td><p class="custTD">{{custInfo.industryInvolved}}</p></td>
                </tr>
                <tr>
                    <th><p class="custTH">注册地址</p></th>
                    <td><p class="custTD">{{custInfo.registeredAddress}}</p></td>
                    <th><p class="custTH">注册资本</p></th>
                    <td><p class="custTD">{{custInfo.registeredCapital}}万元</p></td>
                </tr>
                <tr>
                    <th><p class="custTH">专利（非外观）数量</p></th>
                    <td><p class="custTD">{{custInfo.patent}}</p></td>
                    <th><p class="custTH">拥有国家重点实验室数量</p></th>
                    <td><p class="custTD">{{custInfo.keyLaboratory}}</p></td>
                </tr>
                <tr>
                    <th><p class="custTH">拥有证照</p></th>
                    <td colspan="3"><p class="custTD">{{custInfo.businessLicenses}}</p></td>
                </tr>
                <tr>
                    <th><p class="custTH">拥有奖励</p></th>
                    <td colspan="3"><p class="custTD">{{custInfo.reward}}</p></td>
                </tr>
                <tr>
                    <th><p class="custTH">经营范围</p></th>
                    <td colspan="3"><p class="custTD">{{custInfo.businessScope}}</p></td>
                </tr>
            </table>
        </div>
        <div class="executive">
            <h4 class="title">高管信息</h4>
            <el-scrollbar viewStyle='max-height:530px'>
            <table border="0">
                <tr>
                    <th style="width:10%"><p class="custTH" >序号</p></th>
                    <th><p class="custTH">姓名</p></th>
                    <th><p class="custTH">职位</p></th>
                </tr>
                <tr v-for="(item,index) in seniorExecutive" :key="index">
                    <td><p class="custTD">{{index + 1}}</p></td>
                    <td><p class="custTD">{{item.name}}</p></td>
                    <td><p class="custTD">{{item.position}}</p></td>
                </tr>
            </table>
            </el-scrollbar>
        </div>
        <div class="Shareholder">
            <h4 class="title">股东信息</h4>
                            <el-scrollbar viewStyle='max-height:530px'>

            <table border="0">
                <tr>
                    <th><p class="custTH">序号</p></th>
                    <th><p class="custTH">股东名称</p></th>
                    <th><p class="custTH">出资比例</p></th>
                    <th><p class="custTH">认缴出资额</p></th>
                    <th><p class="custTH">股东类型</p></th>
                </tr>
                    <tr v-for="(item,index) in shareholder" :key="index">
                        <td><p class="custTD">{{index + 1}}</p></td>
                        <td><p class="custTD">{{item.shareholderName}}</p></td>
                        <td><p class="custTD">{{item.investmentProportion}}</p></td>
                        <td><p class="custTD">{{item.subscribedCapital}}万元</p></td>
                        <td><p class="custTD">{{item.shareholderType == '1'?'法人股东':item.shareholderType == '2'?'自然人股东':''}}</p></td>
                    </tr>

            </table>
                            </el-scrollbar>

        </div>
        <div class="chart">
            <h4 class="title">企业画像</h4>
            <div id="chartPie"></div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    name:'custInfo',
    data(){
        return{
				chartSun: null,
				chartPie: null,
				tableData:[],
                companyName:'',
                custName:'',
                custInfo:{},
                shareholder:[],
                seniorExecutive:[]
        }
    },
    mounted(){
        this.getCustInfo()
    },
    methods:{
        skipUrl(url){
            if (url) {
                let div = document.createElement('div')
                div.setAttribute('id','pass')
                div.innerHTML = `<a href="http://${url}" target="_blank" id="skip"></a>`
                document.body.appendChild(div)
                document.getElementById('skip').click();
                document.body.removeChild(document.getElementById('pass'))
                div = null
            }
        },
            getCustInfo(){
                const _this = this
                this.custName = Object.keys(this.$route.query)[0]
                let params = {
                     companyName:this.custName
                }
                this.getShareholder()
                this.getSeniorExecutive()
                this.$jsonPost('portrait/getCompanyBaseInfo',params).then((res) => {
                    _this.custInfo = res.data.result
                    _this.custInfo.companyLabelArr = _this.custInfo.companyLabel.split(';')
                    _this.getTableData()
                })
            },
            getShareholder(){
                const _this = this
                let params = {
                     companyName:this.custName
                }
                this.$jsonPost('portrait/getShareholder',params).then((res) => {
                    _this.shareholder = res.data.result
                })
            },
            getSeniorExecutive(){
                const _this = this
                let params = {
                     companyName:this.custName
                }
                this.$jsonPost('portrait/getSeniorExecutive',params).then((res) => {
                    _this.seniorExecutive = res.data.result
                })
            },
			getTableData(){
                const data = this.custInfo
				const tableData = {
                    companyName:{
                        state:2,
                        name:data.companyName
                    },
                    technologyCooperation:{
                        state:data.technologyCooperation,
                        name:'国际科技合作与交流专项'
                    },
                    highTechnology:{
                        state:data.highTechnology,
                        name:'国家高技术研究发展计划（863计划）'
                    },
                    technologySupport:{
                        state:data.technologySupport,
                        name:'国家科技支撑计划'
                    },
                    technologyDevelopment:{
                        state:data.technologyDevelopment,
                        name:'国家中长期科学技术发展规划纲要（2006-2020'
                    },
                    basicResearch:{
                        state:data.basicResearch,
                        name:'国家重点基础研究发展计划（973计划）'
                    },
                    emphasisResearch:{
                        state:data.emphasisResearch,
                        name:'国家重点研发计划'
                    },
                    militaryEquipment:{
                        state:data.militaryEquipment,
                        name:'军工装备研发'
                    },
                    technologyMajorProjects:{
                        state:data.technologyMajorProjects,
                        name:'科技部国家科技重大专项'
                    },
                    technologyInnovation:{
                        state:data.technologyInnovation,
                        name:'科技创新2030-重大项目'
                    },
                    strategicProduct:{
                        state:data.strategicProduct,
                        name:'战略性新兴产业重点产品和服务指导目录'
                    },
                }
				let arr = []
				let link = []
				const colors = ['#18a185','#98bd5e','#eba428','#452952','#c23e31','#1cabe5']
				const companyName = tableData.companyName.name
				delete tableData.companyName
				const keys = Object.keys(tableData)
                // console.log(1)
                let num = 0
				for(let i = 0; i < keys.length; i++) {
                    if (tableData[keys[i]].state == '1') {
                        num++
                        arr.push({
                            id:i + 1,
                            name:tableData[keys[i]].name.substring(0,4) + '...',
                            names:tableData[keys[i]].name,
                            itemStyle : {
                                normal: {
                                    color: colors[i <= colors.length? i : 0]
                                },
                            }
                        })
                        link.push({
                            source: 0,
                            target: num
                        })
                    }
                }
                console.log(companyName,link,arr)
				this.drawPieChart(companyName,link,arr)
			},

            drawPieChart(name,links,datass) {
				// console.log(2)
				const datas = datass
				datas.splice(0,0,{
					id:0,
					name:`${name.length > 4?name.substring(0,4) + '...':name}`,
					names: name,
					itemStyle : {
						normal: {
							color: '#6992c8'
						}
					},
					symbolSize:100
				})
				// console.log(datas,name,links)
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
					animationEasingUpdate: 'quinticInOut',
					label: {
						normal: {
							show: true,
							textStyle: {
								fontSize: 12
							},
						}
					},
					tooltip:{
						formatter:function(a){
							// console.log(a)
							return a.data.names
						},
					},
					series: [{
						type: 'graph',
						layout: 'force',
						symbolSize: 80,
						focusNodeAdjacency: true,
						roam: true,
						draggable: false,
						force: {
							repulsion: 1500,
							gravity:0.2,
							edgeLength:datas.length>5?200:100,
							layoutAnimation:false
						},
						label: {
							normal: {
								show: true,
								textStyle: {
									fontSize: 12
								},
							}
						},
						lineStyle: {
							normal: {
								opacity: 0.9,
								width: 1,
							},
							emphasis:{
								color: '#ec407a'
							}
						},
						data: datas,
						links: links
					}]
                });
            }
    }
}
</script>
<style scoped>
#chartPie{
    width: 100%;
    height: 600px;
}
.state{
    color: #79d85a;
    font-weight: normal;
    font-size: 13px;
    margin-left: 26px;
    border: 1px solid #79d85a;
    padding: 5px 10px;
}
.url{
    color:#63b4f5;
    cursor: pointer;
}
.urls{
    color: rgb(224, 224, 224)
}
    .custInfo{
        background: #fff;
        width: 100%;
        padding: 15px 20px;
        box-shadow: 0 0 10px -4px rgba(0,0,0,0.4)
    }
    .custInfo h4{
        text-align: left
    }
    .box{
        width: 100%;
        padding-top: 7px;
        max-width: 1200px;
        margin: 0 auto;
    }
.info p{
    float: left;
    color: #949494;
    font-size: 13px;
    padding-right: 30px;
    text-align: left;
    line-height: 25px;
}
.block{
    width: 100%;
    padding-top: 10px
}
.block p{
    float: left;
    font-size: 13px;
    margin-right: 30px;
    background: #67d1fb;
    color: #fff;
    text-align: center;
    padding: 2px 12px;
}

.baseInfo,.executive,.Shareholder,.chart{
    background: #fff;
    box-shadow: 0 0 10px -4px rgba(0,0,0,0.4);
    padding: 20px;
    margin-top: 20px;
    width: 100%;
}
.chart{
    margin-bottom: 20px;
}
.title{
    width: 180px;
    text-align: left;
    font-weight: normal;
    border-bottom: 1px solid #c5c5c5;
    padding-bottom: 10px;
    margin-bottom: 20px;
    color: #4c4c4c;
}
table{
    font-size: 14px;
    width:100%
}
th,td {
    text-align: left;
}
.baseInfo th{
    width: 13%
}
th{
    /* width: 13%; */
    font-weight: normal;
    color: #868686;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
}
td{
    color: #424242;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
}
tr:last-child td{
    border-bottom: none
}
tr:last-child th{
    border-bottom: none
}
tr td:last-child{
    border-right: none
}
tr th:last-child{
    border-right: none
}
.custTH{
    padding: 10px
}
.custTD{
    padding: 10px
}
</style>

