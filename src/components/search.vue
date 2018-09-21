<template>
    <div class="search">
        <div class="searchBox">
            <div class="searchInput">
                <div class="input clearfix">
                    <el-autocomplete
                    class="inline-input"
                    @keyup.enter="search()"
                    v-model="params.companyName"
                    :fetch-suggestions="querySearch"
                    @select="search()"
                    placeholder="请输入企业名称"
                    :trigger-on-focus="false"
                    ></el-autocomplete>
                    <el-button type="primary" class="searchBtn" @click="search()">
                        <icons name="search" class="searchIcon"></icons>
                    </el-button>
                </div>
                <div class="check">
                    <el-dropdown v-for="(item,index) in checkData" :key="index" class="dropdown" placement='bottom' @command="handle">
                        <span class="el-dropdown-link">
                            {{item.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-scrollbar viewStyle='max-height:300px'>
                                <el-dropdown-item v-for="(items,indexs) in item.data" :command='index + "," + indexs + "," + item.key' :key="indexs">{{items.name}}</el-dropdown-item>
                            </el-scrollbar>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="checkbox">
                    <el-checkbox-group v-model="checkList" class="clearfix" @change="checkBoxClick">
                        <el-checkbox v-for="(item,index) in checkBox" :label="item.key" :key="index" class="elcheck">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="searchList clearfix">
                <ul>
                    <li class="searchLi clearfix" v-for="(item,index) in searchList" :key="index" @click="skipInfo(item.companyName)">
                        <h4 class="custName">{{item.companyName}}</h4>
                        <div class="left">
                            <div class="info clearfix">
                                <p>法定代表人：{{item.legalRepresentative}}</p>
                                <p>注册资本：{{item.registeredCapital}}万人名币</p>
                                <p>成立时间：{{item.establishedTime}}</p>
                            </div>
                            <div class="block clearfix">
                                <p v-for="(card,index) in item.companyLabelArr" :key="index">{{card}}</p>
                            </div>
                        </div>
                        <p class="labelTitle" v-if="item.registrationStatus">{{item.registrationStatus}}</p>
                    </li>
                </ul>
                <el-pagination
                class="page"
                v-if="totalCount > 10"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-count="totalPage"
                layout="total, prev, pager, next"
                :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'search',
    data(){
        return{
            searchList:[],
            currentPage1:1,
            totalCount:0,
            totalPage:0,
            params:{
                from:1,
                size:10,
                companyName:'',
                registrationStatus:null,
                enterpriseType:null,
                provinces:null,
                patent:null,
                technologyCooperation:null,
                highTechnology:null,
                technologySupport:null,
                technologyDevelopment:null,
                basicResearch:null,
                emphasisResearch :null,
                militaryEquipment:null,
                technologyMajorProjects:null,
                technologyInnovation:null,
                strategicProduct :null,
            },
            checkList:[],
            checkData:[
                {
                    name:'所在省份',
                    sub:'所在省份',
                    key:'provinces',
                    data:[
                        {name:'全部'},
                        {name:'上海市'},
                        {name:'云南省'},
                        {name:'内蒙古自治区'},
                        {name:'北京市'},
                        {name:'吉林省'},
                        {name:'四川省'},
                        {name:'天津市'},
                        {name:'宁夏回族自治区'},
                        {name:'安徽省'},
                        {name:'山东省'},
                        {name:'山西省'},
                        {name:'广东省'},
                        {name:'广西壮族自治区'},
                        {name:'新疆维吾尔自治区'},
                        {name:'江苏省'},
                        {name:'江西省'},
                        {name:'河北省'},
                        {name:'河南省'},
                        {name:'浙江省'},
                        {name:'海南省'},
                        {name:'湖北省'},
                        {name:'湖南省'},
                        {name:'甘肃省'},
                        {name:'福建省'},
                        {name:'西藏自治区'},
                        {name:'贵州省'},
                        {name:'辽宁省'},
                        {name:'重庆市'},
                        {name:'陕西省'},
                        {name:'青海省'},
                        {name:'黑龙江省'},

                    ]
                },{
                    name:'注册资本',
                    sub:'注册资本',
                    key:'registeredCapital',
                    data:[
                        {name:'全部'},
                        {name:'0 - 100万以内',arr:[0,100]},
                        {name:'100万 - 200万',arr:[100,200]},
                        {name:'200万 - 500万',arr:[200,500]},
                        {name:'500万 - 1000万',arr:[500,1000]},
                        {name:'1000万以上',arr:[1000]},
                    ]
                },{
                    name:'企业状态',
                    sub:'企业状态',
                    key:'registrationStatus',
                    data:[
                        {name:'全部'},
                        {name:'在业'},
                        {name:'在营'},
                        {name:'存续'},
                        {name:'正常'},
                        {name:'吊销'},
                        {name:'吊销，未注销'},
                        {name:'注销'},
                        {name:'迁出'},
                        {name:'其他'},
                    ]
                },{
                    name:'专利数量',
                    sub:'专利数量',
                    key:'patent',
                    data:[
                        {name:'全部'},
                        {name:'0 - 100',arr:[0,100]},
                        {name:'100 - 300',arr:[100,300]},
                        {name:'300 - 500',arr:[300,500]},
                        {name:'500 - 1000',arr:[500,1000]},
                        {name:'1000',arr:[1000]},
                    ]
                },{
                    name:'企业类型',
                    sub:'企业类型',
                    key:'enterpriseType',
                    data:[
                        {name:'全部'},
                        {name:'有限责任公司'},
                        {name:'一人有限责任公司'},
                        {name:'上市股份有限公司'},
                        {name:'股份有限公司'},
                        {name:'股份合作制'},
                        {name:'股份制'},
                        {name:'集体所有制'},
                        {name:'集体所有制（股份合作）'},
                        {name:'集体经济'},
                        {name:'集体企业'},
                        {name:'集体分支机构（非法人）'},
                        {name:'集团'},
                        {name:'中外合资企业'},
                        {name:'外商投资企业分支机构'},
                        {name:'外商独资企业'},
                        {name:'已上市的中外合资股份有限公司'},
                        {name:'未上市的中外合资股份有限公司'},
                        {name:'事业单位营业'},
                        {name:'事业法人'},
                        {name:'全民'},
                        {name:'全民与全民联营'},
                        {name:'全民与私营联营'},
                        {name:'全民所有制'},
                        {name:'全民所有制分支机构（非法人）'},
                        {name:'全民（内联 - 独资）'},
                        {name:'国有企业'},
                        {name:'国有经济'},
                        {name:'国有事业单位营业'},
                        {name:'国有经营单位（非法人）'},
                        {name:'个人独资企业'},
                        {name:'个体'},
                        {name:'个体工商户'},
                        {name:'私营有限责任公司'},
                        {name:'私营独资企业'},
                        {name:'联营'},
                        {name:'联营（非法人）'},
                        {name:'内资企业法人'},
                        {name:'内资公司'},
                        {name:'农民专业合作经济组织'},
                        {name:'台港澳分公司'},
                        {name:'合伙企业'},
                        {name:'普通合伙企业'},
                        {name:'有限合伙企业'},
                        {name:'合资经营（港资）'},
                        {name:'合资经营（港奥台资）'},
                        {name:'合资经营（港资）'},
                        {name:'其他'},
                        {name:'其他有限责任公司'},
                        {name:'其他股份有限公司'},
                    ]
                },{
                    name:'成立时间',
                    sub:'成立时间',
                    key:'establishedTime',
                    data:[
                        {name:'全部'},
                        {name:'1年以内',time:[parseInt(new Date().getFullYear()) - 1,parseInt(new Date().getFullYear())]},
                        {name:'1年 - 5年',time:[parseInt(new Date().getFullYear()) - 5,parseInt(new Date().getFullYear()) - 1]},
                        {name:'5年 - 10年',time:[parseInt(new Date().getFullYear()) - 10,parseInt(new Date().getFullYear()) - 5]},
                        {name:'10年 - 20年',time:[parseInt(new Date().getFullYear()) - 20,parseInt(new Date().getFullYear()) - 10]},
                        {name:'20年以上',time:[parseInt(new Date().getFullYear()) - 21]},
                    ]
                }
            ],
            checkBox:[
                {name:'国家高技术研究发展计划（863计划）',key:'highTechnology'},
                {name:'国际科技合作与交流专项',key:'technologyCooperation'},
                {name:'战略性新兴产业重点产品和服务指导目录',key:'strategicProduct'},
                {name:'国家中长期科学技术发展规划纲要（2006-2020）',key:'technologyDevelopment'},
                {name:'军工装备研发',key:'militaryEquipment'},
                {name:'科技部国家科技重大专项',key:'technologyMajorProjects'},
                {name:'国家科技支撑计划',key:'technologySupport'},
                {name:'国家重点基础研究发展计划（973计划）',key:'basicResearch'},
                {name:'科技创新2030-重大项目',key:'technologyInnovation'},
                {name:'国家重点研发计划',key:'emphasisResearch'}
            ]
        }
    },
    methods:{
      handleCurrentChange(pageNum){
          this.params.from = pageNum
          this.search()
      },
      checkBoxClick(item){
          for(let i = 0; i < this.checkBox.length; i++) {
              this.params[this.checkBox[i].key] = null
          }
          for(let i = 0; i < item.length; i++) {
              this.params[item[i]] = 1
          }
          this.search()
      },
      search(){
          const _this = this
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.7)'
            });
          this.$jsonPost('portrait/searchCompanyBaseInfo',this.params).then((res) => {
              _this.searchList = res.data.rows
              _this.totalCount = res.data.totalCount
              _this.totalPage = res.data.totalPage
              for(let i = 0; i < _this.searchList.length; i++) {
                _this.searchList[i].companyLabelArr = _this.searchList[i].companyLabel.split(';')
              }
              loading.close();
          })
      },
      skipInfo(name){
        //   sessionStorage.custName = name
          this.$router.push('custInfo?'+name)
      },
      handle(command){
          let index = command.split(',')
          let index0 = parseInt(index[0])
          let index1 = parseInt(index[1])
          let name = this.checkData[index0].sub
          this.checkData[index0].name = index1 == 0?name:this.checkData[index0].data[index1].name
          if (this.checkData[index0].key === 'registeredCapital' || this.checkData[index0].key === 'establishedTime' || this.checkData[index0].key === 'patent' ) {
              if (this.checkData[index0].key === 'registeredCapital') {
                  this.params[index[2]] = index1 !== 0?this.checkData[index0].data[index1].arr:null
              }
              if (this.checkData[index0].key === 'establishedTime') {
                  this.params[index[2]] = index1 !== 0?this.checkData[index0].data[index1].time:null
              }
              if (this.checkData[index0].key === 'patent') {
                  this.params[index[2]] = index1 !== 0?this.checkData[index0].data[index1].arr:null
              }
              this.search()
          } else {
            this.params[index[2]] = index1 !== 0?this.checkData[index0].data[index1].name:null
            this.search()
          }
      },
      querySearch(queryString, cb) {
        const _this = this
        let params = {
            companyName:this.params.companyName
        }
        this.$jsonPost('portrait/AutomaticComplete',params).then((res) => {
            let arr = []
            for(let i = 0; i < res.data.result.length; i++) {
                arr[i] = {
                    value:res.data.result[i]
                }
            }
            cb(arr);
        })
      },
    }
}
</script>
<style scoped>
.page{
    float: right;
    padding: 10px 0;
}
.searchLi{
    padding: 20px 15px;
    border-bottom: 1px solid #Eee;
    transition: all 0.3s;
    cursor: pointer;
}
.searchLi:hover{
    background: #eee
}
.searchLi:hover .custName{
    color: #5eadec
}
.custName{
    transition: all 0.3s
}
.labelTitle{
    float: right;
    font-size: 14px;
    border: 1px solid #79d85a;
    padding: 5px 10px;
    color: #79d85a;
}
.left{
    float: left;
}
.info{
    width: 100%;
    padding-top: 7px;
}
.info p{
    float: left;
    color: #b9b9b9;
    font-size: 13px;
    padding-right: 30px;
}
.block{
    width: 100%;
    padding-top: 10px
}
.block p{
    float: left;
    font-size: 14px;
    margin-right: 30px;
    background: #67d1fb;
    color: #fff;
    text-align: center;
    padding: 5px 15px;
}
.searchList{
    text-align: left;
    width: 80%;
    margin: 0 auto;
    max-width: 1200px;
    padding-top: 40px;
}
.checkbox{
    width: 70%;
    margin: 0 auto;
    padding-top: 30px;
}
.elcheck{
    padding: 5px 5px;
    margin-left: 0;
}
.el-dropdown-link{
    color: #757575;
    cursor: pointer;
}
.input{
    width: 570px;
    margin: 0 auto
}
    .inline-input{
        width: 500px;
        float: left;
    }
    .search{
        padding-top: 30px;
        background: #fff;
        box-shadow: 0 0 18px -7px rgba(0,0,0,0.4);
    }
    .searchBtn{
        width: 60px;
        height: 50px;
        float: left;
        margin-left: 10px
    }
    .searchIcon{
        color: #fff;
        zoom: 1.2;
    }
    .check{
        padding-top: 15px;
        margin: 0 auto;
    }
    .dropdown{
        min-width: 130px
    }
</style>


