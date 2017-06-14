SD_MOD=function(){
    return {
        init : function(){
            this.cnclkgl_option = {
                grid:{
                    x : '8%',
                    y : '10%',
                    x2 : '8%',
                    y2 : '25%',
                    borderColor:'white'
                },
                legend: {
                    data : ['产能','产量','开工率'],
                    y:"85%",
                    selected:{
                        '产能':true,
                        '产量':true,
                        '开工率':true
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {
                        type:'line',
                        lineStyle:{
                            type:'dotted',
                            color:'#a3a3a3'
                        }
                    },
                    position : function(p){   //其中p为当前鼠标的位置
                        return [p[0], p[1] - 50];
                    },
                    formatter : function(param){
                        var ft = param[0].name+"<br>";
                        for(var i=0;i<param.length;i++){
//                                console.log( param[i].data)
//                                console.log(typeof param[i].data)

                            if(param[i].seriesName=="开工率"&&typeof param[i].data=="number"){
                                ft += param[i].seriesName+":"+Math.round(param[i].data)+"%";


                            }else if(param[i].seriesName=="开工率"&&typeof param[i].data=="object"){
                                if(param[i].data.value){ft += param[i].seriesName+":"+param[i].data.value+"%";}
                                else{ft += param[i].seriesName+":-";}
                            }else if(typeof param[i].data=="object"){
                                ft += param[i].seriesName+":"+toFixNum(param[i].data.value)+"<br>";
                            }else if(typeof param[i].data=="number"){
//                                    if(toFixNum(param[i].data).indexOf(',')>0){
//                                        ft += param[i].seriesName+":"+toFixNum(param[i].data).replace()+"<br>";
//                                    }
//				    				else {ft += param[i].seriesName+":"+param[i].data+"<br>";}
                                ft += param[i].seriesName+":"+param[i].data+"<br>";
                            }else{
//                                    if(param[i].data.indexOf(".")>0) {
//                                        ft += param[i].seriesName+":"+param[i].data.substring(0,param[i].data.indexOf("."))+"%"+"<br>";
//                                    }
//                                    else{
                                ft += param[i].seriesName+":"+param[i].data+"<br>";
//                                    }
                            }
                        }
                        return ft;
                    }
                }
                ,
//				  //工具箱
                toolbox: {
                    color:['#000','#000','#000','#000','#000'],
                    //显示策略，可选为：true（显示） | false（隐藏），默认值为false
                    show : false,
                    feature : {
                        //辅助线标志
                        mark : {show: true},
                        //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能
                        dataView : {show: false, readOnly: false},
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
                }
                ,
                xAxis : [
                    {
                        type : 'category',
                        //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                        boundaryGap:true,
                        data :[''],
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
                        }
                        ,
                        axisLine:{
                            lineStyle:{
                                color: '#a3a3a3'
                            }
                        }
                    }
                    ,
                    {
                        type : 'value',
                        name:'开工率',
                        // boundaryGap : [0.1,0],
//                        scale:true,
                        axisLabel:{
                            formatter:function(param){
                                return param+"%";
                            },
                            textStyle:{
                                color:'#a3a3a3'
                            }
                        },
                        splitLine:{
                            show:false,
                            lineStyle:{
                                color: ['#a3a3a3']
                            }

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
                        data:[],
                        barGap : 0,
                        symbolSize: 0|0,
                        clickable:false
                    } ,
                    {
                        name:"产量",
                        type:"bar",
                        data:[],
                        barGap:0,
                        symbolSize: 0|0,
                        clickable:false
                    },
                    {
                        name:"开工率",
                        type:"line",
                        data:[],
                        yAxisIndex:1,
                        symbolSize: 0|0,
                        clickable:false
                    }
                ]
            };

            this.bgxq_option = {
                grid:{
                    x : '8%',
                    y : '10%',
                    x2 : '8%',
                    y2 : '25%',
                    borderColor:'white'
                },
                legend: {
                    data : ['进口量','产量','出口量','表观需求量','开工率'],
                    y:"85%",
                    selected:{
                        '进口量':true,
                        '产量':true,
                        '出口量':true,
                        '表观需求量':true ,
                        '开工率':true
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {
                        type:'line',
                        lineStyle:{
                            type:'dotted',
                            color:'#a3a3a3'
                        }
                    },
                    formatter:function(param){
                        var res = param[0].name+"<br>";

                        for(var i=0;i<param.length;i++){
//                                console.log(param[i].data);
//                                console.log( typeof param[i].data);
                            var value=param[i].data;
                            if(typeof value=="object"){
                                value=param[i].data.value;
                            }
                            if(value==undefined){value='-';}
                            if(param[i].seriesName=="出口量"){
                                if(value>0){
                                    //出口量显示为负则乘以-1
                                    res += param[i].seriesName+":"+(value)+"<br>";
                                }else{
                                    res += param[i].seriesName+":"+(value)*(-1)+"<br>";
                                }

                            }
                            else if(param[i].seriesName=="开工率"){
                                //四舍五入取整
                                if(typeof param[i].data=='number'){
                                    if(param[i].data==0){
                                        res += param[i].seriesName+":"+"0%"+"<br>"
                                    }
                                    else{
                                        res += param[i].seriesName+":"+Math.round(value)+"%"+"<br>";
                                    }
                                }
                                else if(typeof param[i].data=='string'){
                                    res += param[i].seriesName+":"+value+"%"+"<br>";
                                }

                            }
                            else{
                                res += param[i].seriesName+":"+value+"<br>";
                            }
                        }

                        return res;

                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                        boundaryGap:true,
                        data :[''],
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
                            },
                            formatter:function(param){
                                if(param<0){
//			                            param = param*-1;
                                    param = param;
                                }
                                return param;
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
                    ,
                    {
                        type : 'value',
                        name:'开工率',
//                            boundaryGap : [0.1,0],
//                            scale:true,
                        yAxisIndex:1,
                        axisLabel:{
                            formatter:function(param){
                                return Math.floor(param*1000 / 1000)+"%";
                            },
                            textStyle:{
                                color:'#a3a3a3'
                            }
                        },
                        splitLine:{
                            show:false,
                            lineStyle:{
                                color: ['#a3a3a3']
                            }

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
                        name:"进口量",
                        type:"bar",
                        data:[],
                        stack: true,
                        barGap : 0,
                        symbolSize: 0|0,
                        clickable:false  ,
                        yAxisIndex:0
                    } ,
                    {
                        name:"产量",
                        type:"bar",
                        data:[],
                        stack: true,
                        barGap:0,
                        symbolSize: 0|0,
                        clickable:false   ,
                        yAxisIndex:0
                    },
                    {
                        name:"出口量",
                        type:"bar",
                        data:[],
                        barGap:0,
                        symbolSize: 0|0,
                        clickable:false ,
                        yAxisIndex:0
                    },
                    {
                        name:"表观需求量",
                        type:"line",
                        data:[],
                        symbolSize: 0|0,
                        clickable:false  ,
                        yAxisIndex:0
                    },
                    {
                        name:"开工率",
                        type:"line",
                        data:[],
                        barGap : 0,
                        symbolSize: 0|0,
                        clickable:false ,
                        yAxisIndex:1
                    }
                ]
            };

            this.jck_option = {
                grid:{
                    x : '8%',
                    y : '10%',
                    x2 : '8%',
                    y2 : '30%',
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
                    },
                    position : function(p){   //其中p为当前鼠标的位置
                        return [p[0], p[1] - 30];
                    },
                    showDelay: 10
                },
                legend: {
                    data : ['进口量','出口量','进口均价','出口均价'],
                    y:"85%",
                    selected:{
                        '进口量':true,
                        '成本加运费':true
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                        boundaryGap:true,
                        data :[''],
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
                    },
                    {
                        type : 'value',
                        name:'美元/吨',
                        scale:true,
                        axisLabel:{
                            textStyle:{
                                color:'#a3a3a3'
                            }
                        },
                        splitLine:{
                            show:false,
                            lineStyle:{
                                color: ['#a3a3a3']
                            }

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
                        name:"进口量",
                        type:"bar",
                        data:[],
                        barGap : 0,
                        symbolSize: 0|0,
                        clickable:false
                    },{
                        name:"出口量",
                        type:"bar",
                        data:[],
                        barGap : 0,
                        symbolSize: 0|0,
                        clickable:false
                    },{
                        name:"进口均价",
                        type:"line",
                        data:[],
                        yAxisIndex:1,
                        symbolSize: 0|0,
                        clickable:false
                    },{
                        name:"出口均价",
                        type:"line",
                        data:[],
                        yAxisIndex:1,
                        symbolSize: 0|0,
                        clickable:false
                    }
                ]
            };

            this.xyxq_option = {
                grid:{
                    x : '8%',
                    y : '10%',
                    x2 : '8%',
                    y2 : '25%',
                    borderColor:'white'
                },
                legend: {
                    data : ['0'],
                    y:"85%",
                    selected:{
                        '0':true
                    }
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
                xAxis : [
                    {
                        type : 'category',
                        //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                        boundaryGap:true,
                        data :[''],
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
                ]
            };

            this.kucun_option = {
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
                    data:['华东','华南'],
                    //legend底部
                    y:"85%",
                    selected:{
                        '华东':true,
                        '华南':true
                    }
                },
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
                        data : ['']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'万吨',
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
                        name:'美元/吨',
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
                        name:"华东",
                        type:"line",
                        smooth:false,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        symbolSize: 0|0,
                        data:[],
                        clickable:false
                    },{
                        name:"华南",
                        type:"line",
                        smooth:false,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        symbolSize: 0|0,
                        data:[],
                        clickable:false
                    }
                ]
            };

            this.gxyc_option = {
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
                    data:['供应量','需求量','供需平衡','库存（右轴）'],
                    y:'85%',
                    selected:{
                        '供应量':true,
                        '需求量':true,
                        '供需平衡':true,
                        '库存（右轴）':true
                    }
                },
                calculable : false,
                xAxis : [
                    {
                        type : 'category',
                        data : [''],
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
                        name:'万吨',
                        type : 'value' ,
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
                        name : '万吨',
                        type : 'value',
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
                        name:'供应量',
                        type:'bar',
                        barGap : 0,
                        data:[],
                        symbolSize: 0|0,
                        clickable:false
                    },
                    {
                        name:'需求量',
                        type:'bar',
                        barGap : 0,
                        data:[],
                        symbolSize: 0|0,
                        clickable:false
                    }
                    ,
                    {
                        name:'供需平衡',
                        type:'bar',
                        barGap : 0,
                        data:[],
                        symbolSize: 0|0,
                        clickable:false
                    },
                    {
                        name:'库存（右轴）',
                        type:'line',
                        yAxisIndex:1,
                        data:[],
                        symbolSize: 0|0,
                        clickable:false
                    }
                ]
            };
            //无库存时供需预测option
            this.gxyc_nonKC_option = {
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
                    data:['供应量','需求量','供需平衡'],
                    y:'85%',
                    selected:{
                        '供应量':true,
                        '需求量':true,
                        '供需平衡':true
                    }
                },
                calculable : false,
                xAxis : [
                    {
                        type : 'category',
                        data : [''],
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
                        name:'万吨',
                        type : 'value' ,
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
                        name:'供应量',
                        type:'bar',
                        barGap : 0,
                        data:[],
                        symbolSize: 0|0,
                        clickable:false
                    },
                    {
                        name:'需求量',
                        type:'bar',
                        barGap : 0,
                        data:[],
                        symbolSize: 0|0,
                        clickable:false
                    }
                    ,
                    {
                        name:'供需平衡',
                        type:'bar',
                        barGap : 0,
                        data:[],
                        symbolSize: 0|0,
                        clickable:false
                    }
                ]
            };

        }

    }
}();
$(function(){
    SD_MOD.init();
});