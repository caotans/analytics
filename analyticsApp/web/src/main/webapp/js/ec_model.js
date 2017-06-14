var mould_option = {
    title : {
        x:'center'
    },
    grid:{
    	x : '8%',
    	y : '10%',
    	x2 : '8%',
    	y2 : '25%',
        borderColor:'white'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type:'line',
            lineStyle:{
                type:'dotted',
                color:'#a3a3a3'
            }
        }
    },
    legend: {
        data:['0'],
        y:"85%"
    },
    calculable : false,
    xAxis : [
        {
            type : 'category',
            //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
            boundaryGap:false,
            data :['0'],
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
            name:'万吨' ,
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
        }
    ],
    series : [
        {
            name:"data1",
            type:"bar",
            data:[0]
        }
    ]
};



function initOption(){
    return mould_option;
}
function initOption2(){
    var mould_option2={
        title : {
            x:'center'
            },
        grid:{
            borderColor:'white',
            x:'8%',
            y : '10%',
            x2:'8%',
            y2:'25%'
            },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type:'line',
                lineStyle:{
                    type:'dotted',
                    color:'#a3a3a3'
                    }
                }
            },
        legend: {
            data:[],
            y:"85%"
            },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                boundaryGap:true,
                data :[],
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
                name:'万吨' ,
                scale:false,
                axisLabel:{
                    formatter:null,
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
                name:'万吨' ,
                scale:false,
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
                name:"data1",
                type:"bar",
                data:[]
                }
            ]
        };
    return mould_option2;
}
function initOption3(){
    /**
     * 详情模板
     * @type {{title: {x: string}, grid: {borderColor: string, width: number, height: number, x: number, y: number}, tooltip: {trigger: string, axisPointer: {type: string, lineStyle: {type: string, color: string}}}, legend: {data: Array, y: string}, calculable: boolean, xAxis: Array, yAxis: Array, series: Array}}
     */
    var mould_option3= {
        title : {
            x:'center'
        },
        grid:{
            borderColor:'white',
            x:'8%',
            y : '10%',
            x2:'8%',
            y2:'25%'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type:'line',
                lineStyle:{
                    type:'dotted',
                    color:'#a3a3a3'
                }
            }
        },
        toolbox: {
            center:'right',
            color:['#000','#000','#000','#000','#000'],
            //显示策略，可选为：true（显示） | false（隐藏），默认值为false
            show : true,
            feature : {
                //辅助线标志
                mark : {show: true},
                //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能
//        dataView : {show: true, readOnly: false},
                //magicType，动态类型切换，支持直角系下的折线图、柱状图、堆积、平铺转换,'line', 'bar', 'stack', 'tiled'
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                //restore，还原，复位原始图表
                restore : {show: true},
                //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'
                savemsg : {show: true,
                    title : '保存图片',
                         icon : 'images/saveEcharts.png',
                                 onclick : null
                },
                myTool : {
                    show : true,
                    title : '导出Excel',
                    icon : 'images/excel01.png',
                    onclick : null
                }
            }
        },
        legend: {
            data:[],
            y:"85%"

        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                boundaryGap:true,
                data :[],
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
                name:'万吨' ,
                scale:false,
                axisLabel:{
                    formatter:null,
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
                name:'万吨' ,
                scale:false,
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
                name:"data1",
                type:"bar",
                data:[]
            }
        ]
    };
    return  mould_option3;
}

function initOption4(){
    /**
     * 详情模板
     * @type {{title: {x: string}, grid: {borderColor: string, width: number, height: number, x: number, y: number}, tooltip: {trigger: string, axisPointer: {type: string, lineStyle: {type: string, color: string}}}, legend: {data: Array, y: string}, calculable: boolean, xAxis: Array, yAxis: Array, series: Array}}
     */
    var mould_option4= {
        title : {
            x:'center'
        },
        grid:{
            borderColor:'white',
            y:'10%',
            y2:'25%'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type:'line',
                lineStyle:{
                    type:'dotted',
                    color:'#a3a3a3'
                }
            }
        },
        legend: {
            data:[],
            y:"85%"
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                boundaryGap:true,
                data :[],
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
                name:'万吨' ,
                scale:false,
                axisLabel:{
                    formatter:null,
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
                name:'万吨' ,
                scale:false,
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
                name:"data1",
                type:"bar",
                data:[]
            }
        ]
    };
    return  mould_option4;
}
function drawPic(domid){
	var iniCharts = echarts.init(document.getElementById(domid));
	var iniOption = initOption();
	iniCharts.setOption(iniOption);
	return iniCharts;
}