var dataSource = [];

PRODT = function(){
	var mdoption = initOption();
	var myCharts;
	var ls = window.localStorage;
	var DownloadElse;
	return {
		init : function(){
			myCharts = drawPic("dt_picdom");
			
			this.liid;
			this.idxid;
			this.weidu;
			this.selected;
			//读取localStorage中保存的selected信息
			if(ls.getItem("sel")){
				this.selected = $.parseJSON(ls.getItem("sel"));
			}
			this.option = {
			        grid:{
			        	x : '8%',
			        	y : '10%',
			        	x2 : '8%',
			        	y2 : '25%',
			            borderColor:'white'
			        },
			        tooltip : {
			            trigger: 'axis',
			            formatter: function(param){
			            	var ft = param[0].name+"<br>";
			            	for(var i=0;i<param.length;i++){
				    			if(param[i].seriesName=="毛利润变化率"&&(typeof param[i].value == "number")){
				    				ft += param[i].seriesName+":"+Math.floor(param[i].value*100 *100)/100+"%";
				    			}else{
				    				ft += param[i].seriesName+":"+param[i].data+"<br>";
				    			}
				    		}
			            	return ft;
			            },
			            axisPointer : {
			                type:'line',
			                lineStyle:{
			                    type:'dotted',
			                    color:'#a3a3a3'
			                }
			            }
			        },
			        legend: {
			            data:['毛利润','毛利润变化率'],
			            y:"85%"
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
                            savemsg : {show: true,
                                title : '保存图片',
                                icon : 'images/saveEcharts.png',
                                onclick : null
                            },
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
			        calculable : false,
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
			                name:'元/吨' ,
			                scale:true,
			                //不显示网格
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
			                name:'百分比',
			                scale:true,
			                //不显示网格
			                axisLine:{
			                    lineStyle:{
			                        color: '#a3a3a3'
			                    }
			                },
			                splitLine:{
			                    show:false
			                },
			                axisLabel : {
			                    formatter: function(param){
			                    	return param*100+"%";
			                    },
			                    textStyle:{
			                        color:'#a3a3a3'
			                    }
			                }
			            }

			        ],
			        series : [
			            {
			                name:"毛利润",
			                zlevel : 0,
			                type:"line",
			                smooth:false,
			                data:[0],
			                itemStyle: {
			                    normal: {
			                        areaStyle: {
			                            type: 'default'
			                        }
			                    }
			                },
			                //标志图形大小
			                symbolSize: 0|0,
				            clickable:false
			            },
			            {
			                name:"毛利润变化率",
			                zlevel : 1,
			                type:"line",
			                smooth:false,
			                data:[0],
			                symbolSize: 0|0,
			                yAxisIndex:1,
				            clickable:false
			            }
			        ]
			    };
			this.option2 = {
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
			            data:['进口VS国内','进口VS美国','进口VS韩国'],
			            y:"85%"
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
//			                saveAsImage : {show: true},
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
			        calculable : false,
			        xAxis : [
			            {
			                type : 'category',
			                //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
			                boundaryGap:false,
			                data :[''],
			                splitLine:{
			                    show:false
			                },
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
			                name:'美元/吨' ,
			                scale:true,
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
			            }
			        ],
			        series : [
			            {
			                name:"进口VS国内",
			                zlevel : 0,
			                type:"line",
			                smooth:false,
			                data:[],
			                itemStyle: {
			                    normal: {
			                        areaStyle: {
			                            type: 'default'
			                        }
			                    }
			                },
			                symbolSize: 0|0,
				            clickable:false
			            },
			            {
			                name:"进口VS美国",
			                zlevel : 1,
			                type:"line",
			                smooth:false,
			                data:[],
			                itemStyle: {
			                    normal: {
			                        areaStyle: {
			                            type: 'default'
			                        }
			                    }
			                },
			                symbolSize: 0|0,
				            clickable:false
			            },
			            {
			                name:"进口VS韩国",
			                zlevel : 1,
			                type:"line",
			                smooth:false,
			                data:[],
			                itemStyle: {
			                    normal: {
			                        areaStyle: {
			                            type: 'default'
			                        }
			                    }
			                },
			                symbolSize: 0|0,
				            clickable:false
			            }
			        ]
			    };
			this.productcode = $(".product01").attr("prdcode");
			this.productname = $(".product01 > a").html();
			if($("#pflist").val()==""){
				this.pflist = [];
			}else{
				this.pflist = $.parseJSON($("#pflist").val());
			}
			this.pfcodestr = "'"+getObjData(this.pflist,'PACode').join("','")+"'";
			this.pfnamestr = "'"+getObjData(this.pflist,'PAName').join("','")+"'";
			if($("#lrlist").val()==""){
				this.lrlist = [];
			}else{
				this.lrlist = $.parseJSON($("#lrlist").val());
			}
			this.lrcodestr = "'"+getObjData(this.lrlist,'PACode').join("','")+"'";
			this.lrnamestr = "'"+getObjData(this.lrlist,'PAName').join("','")+"'";
			this.filter = "";
			this.order = "";
			this.pindex = 1;
			this.psize = 10;
			this.pagetool;
			
			this.curDate;
			this.lyDate;
			
//			$("li.details_nav:first").trigger('click');
			this.firstLoad();
		},
		changeLi : function(liid,otherDownload){
            PRODT.DownloadElse= otherDownload;
			this.liid = liid;
			this.idxid = $("li#"+this.liid+".details_nav").attr("idxid");
			this.loadWdDom(this.liid);
			
			$("li.details_nav").removeClass("selected");
			$("li#"+this.liid+".details_nav").addClass("selected");
			
			PRODT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序
			
			$("div.big_wd > span:first").trigger("click");
			if(this.idxid=="lr"){
				this.selected=this.option.legend.selected;
			}else if(this.idxid=="tl"){
				this.selected=this.option2.legend.selected;
			}
            var tabName=$("#"+this.liid+'>a').text();
            ga('send','event',{
                'eventCategory':'tab点击',
                'eventAction':tabName+'-'+this.weidu
            })
		},
		changeWd : function(weidu){
			this.weidu = weidu;
			
			$("div.big_wd > span").removeClass("wd_r");
			$("div.big_wd > span[wd='"+this.weidu+"']").addClass("wd_r");
            var tabName=$("#"+this.liid+'>a').text();
            ga('send','event',{
                'eventCategory':'维度点击',
                'eventAction':tabName+'-'+this.weidu
            })
			this.drawProPic(this.idxid,this.weidu);
		},
		showLoad : function(){
			myCharts.clear();
			myCharts.showLoading({
		    	text: '正在努力的读取数据中...',    //loading话术
		    	effect: 'whirling'
		    });
		},
		search : function(){
            var tabName=$("#"+this.liid+'>a').text();
            ga('send','event',{
                'eventCategory':'搜索点击',
                'eventAction':tabName+'-'+this.weidu
            })
			this.drawProPic(this.idxid,this.weidu);
		},
		drawProPic : function(l,w){
			var pd = this.picdom;
			var start = $("#searchstart").val();
			var end = $("#searchend").val();
            //掐头去尾
            var returnTime= getTimeDate(start,end,w);
            if(returnTime&&returnTime.status!="error"){
                start=returnTime.status;
                end=returnTime.info;
            }else if(returnTime&&returnTime.status=="error"){
                alert(returnTime.info);
                return false;

            }
			this.showLoad();
			var aj = $.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"getProfitDtdata?li="+l+"&wd="+w+"&start="+start+"&end="+end+"&productcode="+PRODT.productcode,
	            timeout : 100000, //超时时间设置，单位毫秒
	            success:function(data){
	            	if(!data){
	            		myCharts.clear();
        				myCharts.showLoading({
            				animation:false,
                            text : '暂无数据',
                            textStyle : {fontSize : 20 ,color : '#404040'},
                            effectOption: {backgroundColor: '#fefefe'}
            		    });
        				$("#prdt_tb").empty();
        				$("#prdt_pg").empty();
        				return;
	            	}
	            	myCharts.hideLoading();
	            	var myoption;
	            	if(l=="lr"){
	            		if(PRODT.lrlist.length==0){
	        				myCharts.clear();
	        				myCharts.showLoading({
	            				animation:false,
	                            text : '暂无数据',
	                            textStyle : {fontSize : 20 ,color : '#404040'},
	                            effectOption: {backgroundColor: '#fefefe'}
	            		    });
	        				return;
	        			}
	            		var lgarr = getObjData(PRODT.lrlist,'PAName');
	            		var lgcdarr = getObjData(PRODT.lrlist,'PACode');
	            		myoption = PRODT.option;
	            		myoption.legend.data = lgarr;
	            		myoption.legend.selected = PRODT.selected;
                        data=getPermissionByTime(PRODT.DownloadElse,data,"DataDate","/",w);
	            		myoption.xAxis[0].data = searchFromArr(data,'PACode',data[0].PACode,'DataDate'),
	            		
	            		myoption.series = [];
	            		for(var i=0;i<lgarr.length;i++){
	            			if(lgarr[i].indexOf("变化率")>0){
	            				myoption.series.push({
	            	                name:lgarr[i],
	            	                zlevel : 1,
	            	                type:"line",
	            	                smooth:false,
	            	                data:searchFromArr(data,'PACode',lgcdarr[i],'DataValue'),
	            	                symbolSize: 0|0,
	            	                yAxisIndex:1
	            	            });
	            			}else{
	            				myoption.series.push({
	            	                name:lgarr[i],
	            	                zlevel : 0,
	            	                type:"line",
	            	                smooth:false,
	            	                data:searchFromArr(data,'PACode',lgcdarr[i],'DataValue'),
	            	                itemStyle: {
	            	                    normal: {
	            	                        areaStyle: {
	            	                            type: 'default'
	            	                        }
	            	                    }
	            	                },
	            	                //标志图形大小
	            	                symbolSize: 0|0
	            	            });
	            			}
	            		}
	            	}else if(l=="tl"){
	            		if(PRODT.pflist.length==0){
	        				myCharts.clear();
	        				myCharts.showLoading({
	            				animation:false,
	                            text : '暂无数据',
	                            textStyle : {fontSize : 20 ,color : '#404040'},
	                            effectOption: {backgroundColor: '#fefefe'}
	            		    });
	        				return;
	        			}
	            		var lgarr = getObjData(PRODT.pflist,'PAName');
	            		var lgcdarr = getObjData(PRODT.pflist,'PACode');
	            		myoption = PRODT.option2;
	            		myoption.legend.data = lgarr;
	            		myoption.legend.selected = PRODT.selected;
                        data=getPermissionByTime(PRODT.DownloadElse,data,"DataDate","/",w);
	            		myoption.xAxis[0].data = searchFromArr(data,'PACode',data[0].PACode,'DataDate'),
	            		
	            		myoption.series = [];
	            		for(var i=0;i<lgarr.length;i++){
                            //不put期现对比的数据
                            if(lgarr[i].indexOf('期现对比')>0){continue}
	            			myoption.series.push({
	        	                name:lgarr[i],
	        	                zlevel : 1,
	        	                type:"line",
	        	                smooth:false,
	        	                data:searchFromArr(data,'PACode',lgcdarr[i],'DataValue'),
	        	                itemStyle: {
	        	                    normal: {
	        	                        areaStyle: {
	        	                            type: 'default'
	        	                        }
	        	                    }
	        	                },
	        	                symbolSize: 0|0
	        	            });
	            		}
	            	}
                    //暂时隐藏掉期限对比
                    var legend=myoption.legend.data;
                    for(var k=0;k<legend.length;k++){
                        if(legend[k].indexOf('期现对比')>0){legend.splice($.inArray(legend[k],legend),1);}
                    }
                    myoption.toolbox={
                            x : 'right',
                            color:['#000','#000','#000','#000','#000'],
                            //显示策略，可选为：true（显示） | false（隐藏），默认值为false
                            show : true,
                            feature : {
                                //辅助线标志
                                mark : {show: true},
                                //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能
                                //dataView : {show: false, readOnly: false},
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
                                    onclick :exportExcel               }
                            }
                        };
                        myoption.toolbox.feature.savemsg.onclick=function(){
                            exportEchatsImg(myCharts,"PMI",myoption);
                        }  ;
	            	myCharts.setOption(myoption);
	            	myCharts.setOption({toolbox:{x : 'right',show:true,feature:{dataView : {show: false, readOnly: false},myTool:{show : true,title : '导出Excel',icon : 'images/excel01.png',onclick : exportExcel}}}});
//	            	PRODT.drawTable(l,w,1,true);
//	            	PRODT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序
	            	PRODT.drawTable("prdt_tb",l,1);
	            	var x = Math.ceil(myoption.series[0].data.length/PRODT.psize);
	            	PRODT.initPagination("prdt_pg",x);
	            },
	            error:function(xhr,e){
	                console.log(xhr,e)
	            }
	        });
		},
		drawTable : function(tableid,l,pindex){
		    var opt = {};
		    if(l=="lr"){
		    	var datamap = [{
	    			name : '日期', //字段中文名，绘制table时会展示在表头
	    			value : 'cDate', //后台的字段名
	    			width : 10 , //字段所占百分比宽度
	    			hidden : false ,//hidden为true时必须设置tg属性
	    			tg : 0 ,//字段标识，不得重复
	    			sorting : true
	    		}];
		    	var lgarr = getObjData(PRODT.lrlist,'PAName');
        		var lgcdarr = getObjData(PRODT.lrlist,'PACode');
        		for(var i=0;i<lgarr.length;i++){
        			if(lgarr[i].indexOf("变化率")>0){
        				datamap.push({
    		    			name : lgarr[i],
    		    			value : lgcdarr[i],
    		    			width : 10 ,
    		    			tg : i+1 ,
    		    			sorting : true ,
    		    			render : function(data){
    		    				return '<th tg=2>'+(Math.floor(data*100 *100)/100)+'%</th>';
    		    			}
    		    		});
        			}else{
        				datamap.push({
    		    			name : lgarr[i], //字段中文名，绘制table时会展示在表头
    		    			value : lgcdarr[i], //后台的字段名
    		    			width : 10 , //字段所占百分比宽度
    		    			hidden : false ,//hidden为true时必须设置tg属性
    		    			tg : i+1 ,//字段标识，不得重复
    		    			sorting : true
    		    		});
        			}
        		}
				opt = {
		    		data : PRODT.getTableData(pindex),
		    		datamap : datamap
		    	};

		    }else if(l=="tl"){
		    	var datamap = [{
	    			name : '日期', //字段中文名，绘制table时会展示在表头
	    			value :'PubDate', //后台的字段名
	    			width : 10 , //字段所占百分比宽度
	    			hidden : false ,//hidden为true时必须设置tg属性
	    			tg : 0 ,//字段标识，不得重复
	    			sorting : true
	    		}];
		    	var lgarr = getObjData(PRODT.pflist,'PAName');
        		var lgcdarr = getObjData(PRODT.pflist,'PACode');
        		for(var i=0;i<lgarr.length;i++){
                   if(lgarr[i].indexOf('期现对比')>0){continue;}
                    else{
                       datamap.push({
                           name : lgarr[i],
                           value : lgcdarr[i],
                           width : 10 ,
                           tg : i+1 ,
                           sorting : true
                       });
                   }
        		}
		    	opt = {
		    		data : PRODT.getTableData(pindex),
		    		datamap : datamap
		    	};
		    }
		    PRODT.drawDtTable(opt,"prdt_tb");
		    
		    myCharts.on(echarts.config.EVENT.LEGEND_SELECTED,function(e){
		    	var farr = [];
		   		PRODT.selected = e.selected;
		   		var map = opt.datamap;
		   		var sel = e.selected;
		   		for(var j in sel){
		   			if(sel[j]==false){
		   				for(var i=0;i<map.length;i++){
		   					if(map[i].name==j){
		   						farr.push(map[i].tg);
		   					}
		   				}
		   			}
		   		}
		   		$("th","#prdt_tb").removeClass("tableDisable");
		   		for(var x=0;x<farr.length;x++){
		   			$("th[tg="+farr[x]+"]","#prdt_tb").addClass("tableDisable");
		   		}
		    });
		            	
		},
		drawDtTable : function(option,tabid){
			var thead = "<thead><tr class='enterprise_bt'>";
			for(var i=0;i<option.datamap.length;i++){
				if(option.datamap[i].sorting){
					var oj;
					if(PRODT.order == ""){
						oj = $.parseJSON("{"+this.order+"}");
					}else{
						oj = $.parseJSON(this.order);
					}
					var colname = option.datamap[i].tg;
					var sorthtml = "";
					if(typeof oj[colname] === "undefined"){
						sorthtml += '<a class="ascending"></a><a class="descending"></a>';
					}else if(oj[colname]==0){
						sorthtml += '<a class="ascending"></a><a class="descending31"></a>';
					}else{
						sorthtml += '<a class="ascending32"></a><a class="descending"></a>';
					}
					thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%" style="cursor:pointer;" onclick="PRODT.changeOrder('+i+')"><span>'+option.datamap[i].name+'</span><span class="ascending_box">'+sorthtml+'</span></th>';
				}else{
					thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%"><span>'+option.datamap[i].name+'</span></th>';
				}
			}
			thead += "</tr></thead>";
			
			var tbody = "";
			if(option.data){
				tbody += '<tbody>';
				for(var j=0;j<option.data.length;j++){
					if(j%2==0){
						tbody += '<tr>';
					}else{
						tbody += '<tr class="enterprise_nr01">';
					}
					
					for(var x=0;x<option.datamap.length;x++){
						var th = '';
						if(option.datamap[x].value){
							th = '<th tg="'+option.datamap[x].tg+'">'+option.data[j][x]+'</th>';
						}
						if(option.datamap[x].render){
							var fc = option.datamap[x].render;
							if ( typeof fc === 'function' ){
								th = fc(option.data[j][x]);
							}else{
								$("#"+tabid).empty();
								alert("表格配置了render属性时，需指定render为function类型，并返回一段表格字段的html代码。");
								return;
							}
						}
						tbody += th;
					}
					
					tbody += '</tr>';
				}
				tbody += '</tbody>';
			}else{
				tbody += "<tbody></tbody>";
			}
			
			var html = thead+tbody;
			$("#"+tabid).empty();
			$("#"+tabid).append(html);
			
			
			for(var n=0;n<option.datamap.length;n++){
				if(option.datamap[n].hidden){
					var tgn = option.datamap[n].tg;
					$("th[tg='"+tgn+"']").hide();
				}
			}
			
			//处理图例取消选中需要让表格对应字段置灰的问题
			var farr = [];
			var map = option.datamap;
			var sel = PRODT.selected;
			for(var j in sel){
				if(sel[j]==false){
					for(var i=0;i<map.length;i++){
						if(map[i].name==j){
							farr.push(map[i].tg);
						}
					}
				}
			}
			$("th","#prdt_tb").removeClass("tableDisable");
			for(var x=0;x<farr.length;x++){
				$("th[tg="+farr[x]+"]","#prdt_tb").addClass("tableDisable");
			}
		},
		/*
		 * 初始化分页插件
		 */
		initPagination : function(id,pTotal){
		    if(pTotal>0){
		    	PRODT.pagetool = $("#"+id).jqPaginator({
		    	    totalPages: pTotal,
		    	    visiblePages: 5,
		    	    currentPage: 1,
		    	    activeClass : "page_number_select",
		    	    prev: '<span class="prev"><a href="javascript:;">上一页</a></span>',
		            next: '<span class="next"><a href="javascript:;">下一页</a></span>',
		            page: '<span class="page"><a href="javascript:;">{{page}}</a></span>',
		            first:'<span class="first"><a href="javascript:;">1</a></span>',
		            last: '<span class="last"><a href="javascript:;">{{totalPages}}</a></span>',
		            omit: '<span class="disabled"><a href="javascript:;">...</a></span>',
		    	    onPageChange: function (num, type) {
		    	    	if(type=="change"){
		    	    		PRODT.drawTable("prdt_tb",PRODT.idxid,num);
		    	    	}
		    	    }
		    	});
		    }else{ //没有数据
		        $("#"+id).empty();
		    }
		},
		changeOrder : function(colname){
			var oj;
			if(this.order == ""){
				oj = $.parseJSON("{"+this.order+"}");
			}else{
				oj = $.parseJSON(this.order);
			}
			if(typeof oj[colname] === "undefined"){
				oj={};  //有这一行时，只能单列排序，删除这一行，将可以多列排序
				oj[colname] = 0;
			}else if(oj[colname]==0){
				oj[colname] = 1;
			}else{
				oj[colname] = 0;
			}
			var orstr = JSON.stringify(oj);
			this.order = orstr;
            var tabName=$("#"+this.liid+'>a').text();
            ga('send','event',{
                'eventCategory':'排序点击',
                'eventAction':tabName+'-'+this.weidu
            })
			PRODT.drawTable("prdt_tb",this.idxid,1);
			$('#prdt_pg').jqPaginator('option', {
			    currentPage: 1
			});
		},
		loadWdDom : function(liid){
			var wdstr = $("li#"+liid).attr("wdstr");
			var arr = wdstr.split(",");
			var html = "";
			for(var i=0;i<arr.length;i++){
				var name = "";
				if(arr[i]=="day"){
					name = "日";
				}else if(arr[i]=="week"){
					name = "周";
				}else if(arr[i]=="month"){
					name = "月";
				}else if(arr[i]=="year"){
					name = "年";
				}
				html += "<span wd=\""+arr[i]+"\" onclick=\"PRODT.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
			}
			$("div.big_wd").html("");
			$("div.big_wd").append(html);
		},
		firstLoad : function(){
			this.liid = $("#pld").val();
			this.idxid = $("li#"+this.liid+".details_nav").attr("idxid");
			this.weidu = $("#pwd").val();
			
			$("li#"+this.liid+".details_nav").addClass("selected");
			this.loadWdDom(this.liid);
			
			if(this.weidu=="day"){
				this.curDate=getNowDate();
				this.lyDate=getSomeDate(30);
			}else if(this.weidu=="week"){
				this.curDate=getNowDate();
				this.lyDate=getSomeDate(56);
			}else if(this.weidu=="month"){
				this.curDate=getNowDate();
				this.lyDate=getSomeYear(1);
			}else if(this.weidu=="year"){
				this.curDate=getNowDate();
				this.lyDate=getSomeYear(4);
			}
			
			$("#searchstart").datepicker('setDate', this.lyDate);
			$("#searchend").datepicker('setDate', this.curDate);
			
			PRODT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序
			$("div.big_wd > span[wd='"+this.weidu+"']").trigger('click');
		},
		backToIdx : function(){
			window.history.back();
		},
		resize : function(){
			myCharts.resize();
		},
		getXSource : function(){
			var opt = myCharts.getOption();
			var arr = [];
			arr.push("时间");
			for(var j=0;j<opt.series.length;j++){
				arr.push(opt.series[j].name);
			}
			return arr;
		},
		getDataSource : function(){
			var opt = myCharts.getOption();
			var arr = [];
                    for(var i=0;i<opt.series[0].data.length;i++){
                        var ai = [];
                        ai.push(opt.xAxis[0].data[i]);
                        for(var j=0;j<opt.series.length;j++){
                            //不拼装期现对比数据
                            if(opt.series[j].name.indexOf('期现对比')>0){continue;}
                            if("object" == typeof opt.series[j].data[i]){
                                ai.push(opt.series[j].data[i].value);
                            }else if(undefined == opt.series[j].data[i]){
                                ai.push("-");
                            }else{
                                ai.push(opt.series[j].data[i]);
                            }
                        }
                        arr.push(ai);
                    }
			return arr;
		},
		getTableData : function(pindex){
			var dataSrc = PRODT.getDataSource();
			var arr = [];
			var od;
			if(this.order == ""){
				od = $.parseJSON("{"+this.order+"}");
				arr = dataSrc;
			}else{
				od = $.parseJSON(this.order);
				for(var obj in od){
					var px = od[obj];
					if(px==0){
						arr = sortArray(dataSrc,obj,'asc');
					}else{
						arr = sortArray(dataSrc,obj,'desc');
					}
				}
			}
			var ps = this.psize;
			var start = (pindex-1)*ps;
			var end = pindex*ps;
			var res = arr.slice(start,end);
			return res;
		}
	}
}();

$(function(){
	PRODT.init();
});
window.addEventListener("resize", function () {
	PRODT.resize();
});
function exportExcel(){
	var ds = [PRODT.getDataSource()];
	var xname = PRODT.getXSource();
        var array=ds;
    var sheetName;

    if(PRODT.idxid=="lr"){
    	$("#fileName").val("利润详情");
         sheetName=["利润详情"];
    }else if(PRODT.idxid=="tl"){
    	$("#fileName").val("套利详情");
        sheetName=["套利详情"];
    }
    var array=ds;
    var titleName=[xname];
    $("#titleName").val(JSON.stringify(titleName));
    $("#sheetName").val(JSON.stringify(sheetName));
    if(PRODT.DownloadElse==1){
        alert("您尚未开通下载Excel权限!");
        return;
    }else {
        $("#excelArray").val(JSON.stringify(array));
        $('#hyExport').submit() ;

    }

}