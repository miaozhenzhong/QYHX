<template>
    <div class="mapBox">
        <div id="mapBox">

        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import china from '../../static/china.json'
export default {
    name:'mapBox',
    data(){
        return{

        }
    },
    mounted(){
        this.maps()
    },
    methods:{
        maps(){
            echarts.registerMap('china', china);
            let myChart = echarts.init(document.getElementById("mapBox"));
            myChart.setOption({
                title:{
                    text:'全国各省高新技术企业数量统计',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                backgroundColor: '#404a59',
                brush: {
                    outOfBrush: {
                        color: '#abc'
                    },
                    brushStyle: {
                        borderWidth: 2,
                        color: 'rgba(0,0,0,0.2)',
                        borderColor: 'rgba(0,0,0,0.5)',
                    },
                    seriesIndex: [0, 1],
                    throttleType: 'debounce',
                    throttleDelay: 300,
                    geoIndex: 0
                },
                geo: {
                    map: 'china',
                    zoom: 1,
                    center: [125.97, 35.71],
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#111'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                grid: {
                    right: 50,
                    top: 80,
                    bottom: 40,
                    width: '30%'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: (a) => {
                        console.log(a)
                        if(typeof(a.value) === 'object' ) {
                            return `${a.name}：${a.value[2]}`
                        } else {
                            return `${a.name}：${a.value}`
                        }
                    }
                },
                xAxis: {
                    type: 'value',
                    scale: true,
                    position: 'top',
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        margin: 2,
                        textStyle: {
                            color: '#aaa'
                        }
                    },
                },
                yAxis: {
                    type: 'category',
                    nameGap: 16,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    axisTick: {
                        show: false,
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#ddd'
                        }
                    },
                    data: []
                },
                series:[
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: [],
                        symbolSize: function(val) {
                            return Math.max(val[2] / 1000, 8);
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#FF8C00',
                                position: 'right',
                                show: true
                            }
                        }
                    }, {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: [],
                        symbolSize: function(val) {
                            return Math.max(val[2] / 1300, 8);
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 50,
                                shadowColor: '#EE0000'
                            }
                        },
                        zlevel: 1
                    }, {
                        id: 'bar',
                        zlevel: 2,
                        type: 'bar',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        },

                        data: []
                    }
                ]
            })
            this.$Get('portrait/highTechEnterprisesStatistics').then((res) => {
                let data = res.data.result
                let name = []
                let datas = []
                for(let i = 0; i < data.length; i++) {
                    name.push(data[i].name)
                    let b = data[i].value
                    data[i].map.push(b)
                    let a = {
                        name:data[i].name,
                        value:data[i].map
                    }
                    datas.push(a)
                }
                console.log(datas)
                myChart.setOption({
                    yAxis: {
                        data:name
                    },
                    series:[
                        {
                            data:datas
                        },{
                            data:datas
                        },{
                            data:data
                        }
                    ]
                })
            })

        }
    }
}
</script>
<style scoped>
    #mapBox{
        width: 100%;
        height: 100%;
    }
    .mapBox{
        width: 100%;
        height: 100%;
    }
</style>

