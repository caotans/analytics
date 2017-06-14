//各模块的维度的控制，第一个固定为mod参数，其值为页面维度div标签中的mod属性的值，其余参数为各模块对应的li标签中的picdom属性。
var wddata = {
	"mod" : "dm",
	"tb_jg" : ["week","month","year"],
	"xl_tab" : ["week","month","year"]
}
//业务数据，按维度进行归类
var data_gx = {
    week : {
        cnclkgl : {
            x : ['2015/11/01','2015/11/07','2015/11/13','2015/11/19','2015/11/25'],
            cn : [48.28, 46.69, 45.49, 47.9, 47.66],
            cl : [43.44, 43.31, 39.77, 40.98, 43.05],
            kgl : [89.05, 89.36, 92.62, 90.67, 91.72]
        },
        bgxq : {
            x : ['2015/11/01','2015/11/07','2015/11/13','2015/11/19','2015/11/25'],
            jkl : [32.28, 30.71, 28.69, 31.61, 30.55],
            cl : [43.84, 42.08, 42.74, 40.31, 43.89],
            ckl : [-20.35, -20.13, -19.5, -21.64, -19.55],
            bgxql : [71.4, 74.15, 72.83, 73.31, 74.42]
        }
    },
    month : {
        cnclkgl : {
            x : ['2015/11','2015/12','2016/01','2016/02','2016/03','2016/04','2016/05','2016/06','2016/07','2016/08','2016/09','2016/10'],
            cn : [46.46, 55.52, 49.45, 54.21, 54.24, 56.87, 57.43, 57.13, 63.47, 55.98, 56.51, 53.41],
            cl : [41.82, 44.42, 42.04, 45, 49.9, 50.04, 51.12, 51.42, 50.78, 47.58, 46.9, 47],
            kgl : [90,  80, 85, 83, 92, 88, 89, 90, 80, 85, 83, 88]
        },
        bgxq : {
            x : ['2015/11','2015/12','2016/01','2016/02','2016/03','2016/04','2016/05','2016/06','2016/07','2016/08','2016/09','2016/10'],
            jkl : [30.5221, 33.7902, 29.6399, 24.4934, 35.4509, 35.392, 32.7828, 24.0341, 28.9849, 28.2307, 28.5, 28, 30.5221, 33.7902],
            cl : [41.8151, 44.4167, 42.0367, 44.9967, 49.8967, 50.044, 51.115, 51.415, 50.776, 47.58, 46.9, 47, 41.8151, 44.4167],
            ckl : [-20, -21, -22, -23, -24, -25, -26, -27, -25, -22, -21, -23, -25, -24],
            bgxql : [72, 78, 72, 69, 85, 85, 84, 75, 80, 76, 75, 75, 72, 78]
        },
        jck : {
            x : ['2015/11','2015/12','2016/01','2016/02','2016/03','2016/04','2016/05','2016/06','2016/07','2016/08','2016/09','2016/10'],
            im : [1020, 1010, 1020, 1030, 1020,1030,1040,1050,1060,1070,1080,
                {
                    value:1090,
                    itemStyle:{
                        normal:{
                            color:'blue'
                        }
                    }
                },{
                    value:1100,
                    itemStyle:{
                        normal:{
                            color:'blue'
                        }
                    }
                }],
            cf : [920, 930, 940, 950, 950, 970, 960,970,980,990,1000,1010,1020]
        }
    },
    year : {
        cnclkgl : {
            x : ['2008','2009','2010','2011','2012','2013','2014','2015','2016'],
            cn : [55.76, 45.57, 55.43, 53.92, 54.79, 52.76, 46.4, 53.7, 52],
            cl : [47.87, 40.76, 52.38, 42.88, 40.68, 44.97, 42.36, 41.36, 41],
            kgl : [88.45, 82.28, 80.71, 82.43, 87.86, 84.75, 86.1, 85.54, 85]
        }
    }

}

//属性定义
var option_cnclkgl = initOption();
var option_jg = {
    title : {
        x:'center'
    },
    grid:{
        borderColor:'white'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type:'line',
            lineStyle:{
                type:'dotted',
                color:'#dfdfdf'
            }
        }
    },
    legend: {
        data:['产能','产量','开工率'],
        //legend底部
        // x:"right" ,
        y:"bottom"
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
            boundaryGap:true,
            data :['2015/11','2015/12','2016/1','2016/2','2016/3','2016/4','2016/5','2016/6','2016/7','2016/8','2016/9','2016/10'],
            axisLabel:{
                textStyle:{
                    color:'#a3a3a3'
                }
            },
            splitLine:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color: '#a3a3a3'
                }
            },
            axisTick:{
                lineStyle:{
                    color: '#a3a3a3'
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            name:'单位：万吨' ,
            scale:true,
            axisLabel:{
                textStyle:{
                    color:'#a3a3a3'
                }
            },
            splitLine:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color: '#a3a3a3'
                }
            }
        },
        {
            type : 'value',
            name:'开工率',
            scale:true,
            axisLabel:{
                formatter:'{value}%',
                textStyle:{
                    color:'#a3a3a3'
                }
            },
            splitLine:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color: '#a3a3a3'
                }
            }
        }

    ],
    series : [
        {
            name:"产能",
            type:"bar",
            //stack:"false",
            //smooth:"true",
            data:[46.46, 55.52, 49.45, 54.21, 54.24, 56.87, 57.43, 57.13, 63.47, 55.98, 56.51, 53.41],
            //柱间间隔为0
            barGap : 0
        } ,
        {
            name:"产量",
            type:"bar",
            // stack:"false",
            //smooth:"true",
            data:[41.82, 44.42, 42.04, 45, 49.9, 50.04, 51.12, 51.42, 50.78, 47.58, 46.9, 47],
            barGap:0
        },
        {
            name:"开工率",
            type:"line",
            // stack:"false",
            //smooth:"true",
            data:[90,   80, 85, 83, 92, 88, 89, 90, 80, 85, 83, 88],
            yAxisIndex:1,
            symbolSize: 0|0
        }
    ]
};
var option_xl = {
    title : {
        x:'center'
    },
    grid:{
        borderColor:'white'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type:'line',
            lineStyle:{
                type:'dotted',
                color:'#dfdfdf'
            }
        }
    },
    legend: {
        data:['华北', '华南', '华北价格', '华南价格'],
        //legend底部
        y:"bottom"
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
            boundaryGap:false,
            axisLabel:{
                textStyle:{
                    color:'#a3a3a3'
                }
            },
            splitLine:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color: '#a3a3a3'
                }
            },
            axisTick:{
                lineStyle:{
                    color: '#a3a3a3'
                }
            },
            data : ['2016/06/01','2016/06/08','2016/06/15','2016/06/22','2016/06/29']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name:'单位：千吨',
            axisLabel:{
                textStyle:{
                    color:'#a3a3a3'
                }
            },
            splitLine:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color: '#a3a3a3'
                }
            }
        } ,
        {
            type : 'value',
            name:'单位：元/吨',
            scale:true ,
            axisLabel:{
                textStyle:{
                    color:'#a3a3a3'
                }
            },
            splitLine:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color: '#a3a3a3'
                }
            }
        }
    ],
    series : [
        {
            name:"华北",
            type:"line",
            smooth:false,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            symbolSize: 0|0,
            data:[16.12, 16.37, 9.59, 18.95, 10.25]
        } ,
        {
            name:"华南",
            type:"line",
            smooth:false,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            symbolSize: 0|0,
            data:[16.89, 9.77, 15.72, 7.75, 13.75]
        } , {
            name:"华北价格",
            type:"line",
            smooth:false,
            symbolSize: 0|0,
            data:[1212.47, 1213.61, 1142.61, 1236.78, 1127.66],
            yAxisIndex:1
        } , {
            name:"华南价格",
            type:"line",
            smooth:false,
            symbolSize: 0|0,
            data:[1194.09, 1171.57, 1124.25, 1043.45, 1192.54],
            yAxisIndex:1
        }
    ]
};

//初始化图表，此函数实际上已经画好 
var myChart_jg = drawPic("tb_jg");
var myChart_xl = drawPic("tb_xl");

function changeXl(flag){
	$("div#xl_tab").hide();
	$("div#tb_xl").show();

    var legend;
    if(flag==1){
        legend ={
            data:['华北', '华南', '华北价格', '华南价格'],
            //legend底部
            y:"bottom",
            selected:{
                '华北': true,
                '华南':false,
                '华北价格':true,
                '华南价格':false
            }
        }
    }else{
        legend = {
            data:['华北', '华南', '华北价格', '华南价格'],
            //legend底部
            y:"bottom",
            selected:{
                '华北': false,
                '华南':true,
                '华北价格':false,
                '华南价格':true
            }
        }
    }
    option_xl.legend = legend;
    myChart_xl.setOption(option_xl,true);
    myChart_xl.restore();
}
function moon_dm(){
    myChart_jg.clear();
    option_jg.xAxis[0].data = data_gx.month.cnclkgl.x;
    option_jg.series[0].data = data_gx.month.cnclkgl.cn;
    option_jg.series[1].data =data_gx.month.cnclkgl.cl;
    option_jg.series[2].data = data_gx.month.cnclkgl.kgl;

    myChart_jg.setOption(option_cnclkgl);
    myChart_jg.setOption(option_jg);
    myChart_jg.restore();
    

    myChart_xl.setOption({
        xAxis : [
            {
                data : ['2016/01', '2016/02', '2016/03', '2016/04', '2016/05']
            }
        ],
        series : [
            {
                data:[9.72, 8.43, 14.51, 16.006, 17.16]
            } ,
            {
                data:[8.72, 7.43, 13.51, 15.006, 16.16]
            } , {
                data:[1160, 1170, 1180, 1190, 1200]
            } , {
                data:[1060, 1070, 1080, 1090, 1100]
            }
        ]
    });
    myChart_xl.refresh();
}     //月
function week_dm(){
    myChart_jg.clear();
    option_jg.xAxis[0].data = data_gx.week.cnclkgl.x;
    option_jg.series[0].data = data_gx.week.cnclkgl.cn;
    option_jg.series[1].data = data_gx.week.cnclkgl.cl;
    option_jg.series[2].data = data_gx.week.cnclkgl.kgl;

    myChart_jg.setOption(option_cnclkgl);
    myChart_jg.setOption(option_jg);
    myChart_jg.restore();

    myChart_xl.setOption({
        xAxis : [
            {
                data : ['2016/06/01','2016/06/08','2016/06/15','2016/06/22','2016/06/29']
            }
        ],
        series : [
            {
                data:[16.12, 16.37, 9.59, 18.95, 10.25]
            } ,
            {
                data:[16.89, 9.77, 15.72, 7.75, 13.75]
            } , {
                data:[1212.47, 1213.61, 1142.61, 1236.78, 1127.66]
            } , {
                data:[1194.09, 1171.57, 1124.25, 1043.45, 1192.54]
            }
        ]
    });
    myChart_xl.refresh();
}     //周
function year_dm(){
    myChart_jg.clear();
    option_jg.xAxis[0].data = data_gx.year.cnclkgl.x;
    option_jg.series[0].data = data_gx.year.cnclkgl.cn;
    option_jg.series[1].data =data_gx.year.cnclkgl.cl;
    option_jg.series[2].data = data_gx.year.cnclkgl.kgl;

    myChart_jg.setOption(option_cnclkgl);
    myChart_jg.setOption(option_jg);
    myChart_jg.restore();
    
    myChart_xl.setOption({
        xAxis : [
            {
                data : ['2011','2012','2013','2014','2015']
            }
        ],
        series : [
            {
                data:[7.07, 14.73, 7.19, 12.85, 10.28]
            } ,
            {
                data:[12.45, 11.26, 6.45, 17.15, 16.25]
            } , {
                data:[1271.17, 1287.96, 1223.2, 1221.5, 1275.67]
            } , {
                data:[1193.47, 1132.08, 1016.68, 1153.43, 1167.14]
            }
        ]
    });
    myChart_xl.refresh();
}     //年

$(function(){
    initDom(wddata);
})