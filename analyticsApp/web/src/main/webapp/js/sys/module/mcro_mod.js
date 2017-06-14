MCRO_MOD = function(){
	var hl_option = {
			grid:{
				x : '8%',
	        	y : '10%',
	        	x2 : '8%',
	        	y2 : '25%',
	        	borderColor:'white'
		    },
		    legend: {
		        data : ['美元兑人民币','欧元兑人民币','100日元兑人民币'],
		        y:"85%"
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
		  //工具箱
	        toolbox: {
	            x : 730,
	            color:['#000','#000','#000','#000','#000'],
	            //显示策略，可选为：true（显示） | false（隐藏），默认值为false
	            show : false,
	            feature : {
	                //辅助线标志
	                mark : {show: true},
	                //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能
	                dataView : {show: true, readOnly: false},
	                //magicType，动态类型切换，支持直角系下的折线图、柱状图、堆积、平铺转换,'line', 'bar', 'stack', 'tiled'
	                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
	                //restore，还原，复位原始图表
	                restore : {show: true},
	                //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'
//	                saveAsImage : {show: true},
	                myTool : {
	                    show : true,
	                    title : '导出Excel',
	                    icon : 'images/excel01.png',
	                    onclick : function(){
	                        alert("下载Excel");
	                    }
	                }
	            }
	        },
		    xAxis : [
			            {
			                type : 'category',
			                //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
			                boundaryGap:false,
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
		            name:'美元/元' ,
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
		            name:"美元兑人民币",
		            type:"line",
		            data:[],
		            barGap : 0,
		            symbolSize: 0|0,
		            clickable:false
		        },{
		            name:"欧元兑人民币",
		            type:"line",
		            data:[],
		            barGap : 0,
		            symbolSize: 0|0,
		            clickable:false
		        },{
		            name:"100日元兑人民币",
		            type:"line",
		            data:[],
		            barGap : 0,
		            symbolSize: 0|0,
		            clickable:false
		        }
		    ]
		};
		var  yj_option = {
			grid:{
				x : '8%',
	        	y : '10%',
	        	x2 : '8%',
	        	y2 : '25%',
	        	borderColor:'white'
		    },
		    legend: {
		        data : ['WTI','布伦特','Nymex N.Gas'],
		        y:"85%"
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
			                boundaryGap:false,
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
		            name:'美元/桶' ,
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
		            name:"WTI",
		            type:"line",
		            data:[],
		            symbolSize: 0|0,
		            clickable:false
		        } ,
		        {
		            name:"布伦特",
		            type:"line",
		            data:[],
		            symbolSize: 0|0,
		            clickable:false
		        },
		        {
		            name:"Nymex N.Gas",
		            type:"line",
		            data:[],
		            symbolSize: 0|0,
		            clickable:false
		        }
		    ]
		};
		var  gdp_option = {
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
		        },
	            position : function(p){   //其中p为当前鼠标的位置
	                return [p[0], p[1] - 30];
	            }
		    },
		    legend: {
		        data : ['国内生产总值','国内生产总值:同比增长'],
		        y:"85%"
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
	                name:'亿元' ,
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
	                name:'百分比',
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
	                name:"国内生产总值",
	                type:"bar",
	                data:[0],
	                symbolSize: 0|0,
		            clickable:false
	            },
	            {
	                name:"国内生产总值:同比增长",
	                type:"line",
	                data:[0],
	                yAxisIndex:1,
	                symbolSize: 0|0,
		            clickable:false
	            }

		    ]
		};
		var cpi_option = {
			grid:{
				x : '8%',
	        	y : '10%',
	        	x2 : '8%',
	        	y2 : '25%',
	        	borderColor:'white'
		    },
		    legend: {
		        data : ['居民消费价格指数:同比','居民消费价格指数:环比'],
		        y:"85%"
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
	            }
		    },
		    xAxis : [
			            {
			                type : 'category',
			                //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
			                boundaryGap:false,
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
		            name:'百分比' ,
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
		        	name:"居民消费价格指数:同比",
		        	type:"line",
		        	data:[0],
		        	symbolSize: 0|0,
		            clickable:false
		        } ,
		        {
		            name:"居民消费价格指数:环比",
		            type:"line",
		            data:[0],
		            symbolSize: 0|0,
		            clickable:false
		        }
		    ]
		};
		var pmi_option = {
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
		        },
	            position : function(p){   //其中p为当前鼠标的位置
	                return [p[0], p[1] - 30];
	            }
		    },
		    legend: {
		        data:['采购经理指数:制造业','采购经理指数:非制造业'],
		        //legend底部
		        y:"85%"
		    },
		    calculable : false,
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
		            name:'百分比',
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
		        	name:"采购经理指数:制造业",
		        	type:"line",
		        	data:[0],
		        	symbolSize: 0|0,
		            clickable:false
		        } ,
		        {
		            name:"采购经理指数:非制造业",
		            type:"line",
		            data:[0],
		            symbolSize: 0|0,
		            clickable:false
		        }
		    ]
		};
		var ppi_option = {
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
		        },
	            position : function(p){   //其中p为当前鼠标的位置
	                return [p[0], p[1] - 30];
	            }
		    },
		    legend: {
		        data:['工业生产者出厂价格指数：同比增长','工业生产者出厂价格指数：环比增长']
		        ,y:'85%'
		    },
		    calculable : false,
		    xAxis : [
		        {
		            type : 'category',
		            data : [''],
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
		            }
		        }
		    ],
		    yAxis : [
		        {
		            name:'百分比',
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
		        	name:"工业生产者出厂价格指数：同比增长",
		        	type:"line",
		        	data:[0],
		        	symbolSize: 0|0,
		            clickable:false
		        },
		        {
		            name:"工业生产者出厂价格指数：环比增长",
		            type:"line",
		            data:[0],
		            symbolSize: 0|0,
		            clickable:false
		        }
		    ]
		};
		var m2_option = {
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
			        },
	                position : function(p){   //其中p为当前鼠标的位置
	                    return [p[0], p[1] - 30];
	                }
			    },
			    legend: {
			        data:['货币供应:(M2)准货币','M2同比增幅']
			        ,y:'85%'
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
			            name:'亿元',
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
			            name:'百分比',
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
			        	name:"货币供应:(M2)准货币",
			        	type:"bar",
			        	data:[],
			        	symbolSize: 0|0,
			            clickable:false
			        },
			        {
			            name:"M2同比增幅",
			            type:"line",
			            data:[],
			            yAxisIndex:1,
			            symbolSize: 0|0,
			            clickable:false
			        }
			    ]
			};
		
		return {
			init : function(){
				this.hl_option = hl_option;
				this.yj_option = yj_option;
				this.gdp_option = gdp_option;
				this.cpi_option = cpi_option;
				this.pmi_option = pmi_option;
				this.ppi_option = ppi_option;
				this.m2_option = m2_option;
			}
		}
}();
$(function(){
	MCRO_MOD.init();
});
