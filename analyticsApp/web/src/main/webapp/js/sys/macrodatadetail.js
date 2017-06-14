MCRDDT = function(){
	var mdoption = initOption();
	var ls = window.localStorage;
	var myCharts;
    var DownloadElse;
	var toolboxobj ={
            x : 'right',
            color:['#000','#000','#000','#000','#000'],
            //显示策略，可选为：true（显示） | false（隐藏），默认值为false
            show : true,
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
                    onclick :exportExcel               }
            }
        };
    //

	
	return {
		init : function(){
			this.liid;
			this.idxid;
			this.weidu;
			if(ls.getItem("macrodata")){
				this.selected = ls.getItem("macrodata");
			}
			
			this.hl_option = MCRO_MOD.hl_option;
			this.yj_option = MCRO_MOD.yj_option;
			this.gdp_option = MCRO_MOD.gdp_option;
			this.cpi_option = MCRO_MOD.cpi_option;
			this.pmi_option = MCRO_MOD.pmi_option;
			this.ppi_option = MCRO_MOD.ppi_option;
			this.m2_option = MCRO_MOD.m2_option;
			
			this.order = "";
			this.pindex = 1;
			this.psize = 10;
			this.pagetool;
			
			this.curDate;
			this.lyDate;
			
			DatePicker('#searchstart','#searchend');
			
			myCharts = drawPic("dt_picdom");
//			$("li.details_nav:first").trigger('click');
			this.firstLoad();
		},
		changeLi : function(liid,otherdownload){
            if(otherdownload){
                 DownloadElse=otherdownload;
            }
			this.liid = liid;
			this.idxid = $("li#"+this.liid+".details_nav").attr("idxid");
			this.loadWdDom(this.liid);
			
			this.order = "{\"0\":1}";
			
			$("li.details_nav").removeClass("selected");
			$("li#"+this.liid+".details_nav").addClass("selected");
			
			$("div.big_wd > span:first").trigger("click");
            var pm=$(".product01").text();
            var sec=$(".mian_nav>a").text();
            var tabName=$("#macroDetail .selected").text();
            var wd=$('.details_box .wd_r >a').text();
            ga('send', 'event', {
                'eventCategory':  'tab点击',
                'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
            });
		},
		changeWd : function(weidu){
			this.weidu = weidu;
			
			$("div.big_wd > span").removeClass("wd_r");
			$("div.big_wd > span[wd='"+this.weidu+"']").addClass("wd_r");
			this.drawProPic(this.idxid,this.weidu);
            var pm=$(".product01").text();
            var sec=$(".mian_nav>a").text();
            var tabName=$("#macroDetail .selected").text();
            var wd=$('.details_box .wd_r >a').text();
            ga('send', 'event', {
                'eventCategory' :  '维度选择',
                'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
            });

		},
		showLoad : function(){
			myCharts.clear();
			myCharts.showLoading({
		    	text: '正在努力的读取数据中...',    //loading话术
		    	effect: 'whirling'
		    });
		},
		drawProPic : function(l,w){
			var pd = this.picdom;

			var ksrq = $("#searchstart").val();
			var jsrq = $("#searchend").val();
            //掐头去尾
            var returnTime= getTimeDate(ksrq,jsrq,w);
            if(returnTime&&returnTime.status!="error"){
                ksrq=returnTime.status;
                jsrq=returnTime.info;
            }else if(returnTime&&returnTime.status=="error"){
                alert(returnTime.info);
                return false;

            }
            this.showLoad();
			var aj = $.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"getMcrdTabData?li="+l+"&wd="+w+"&ksrq="+ksrq+"&jsrq="+jsrq,
	            timeout : 100000, //超时时间设置，单位毫秒
	            success:function(data){
	            	var datasrc = data;
	            	if(datasrc!=null){
	            		myCharts.hideLoading();
		            	var myoption;
		            	if(l=="rate"){
                            datasrc=getPermissionByTime(MCRDDT.DownloadElse,datasrc,"PubDate","/",w);
		            		myoption = MCRDDT.hl_option;
		            		myoption.xAxis[0].data = searchFromArr(datasrc,'CNCode','CUO003','PubDate');
			            	myoption.series[0].data =searchFromArr(datasrc,'CNCode','CUO003','AvgPrice');
			            	myoption.series[1].data =searchFromArr(datasrc,'CNCode','CUO001','AvgPrice');
			            	myoption.series[2].data =searchFromArr(datasrc,'CNCode','CUO002','AvgPrice');
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"汇率",myoption);
                                var pm=$(".product01").text();
                                var sec=$(".mian_nav>a").text();
                                var tabName=$("#macroDetail .selected").text();
                                var wd=$('.details_box .wd_r >a').text();
                                ga('send', 'event', {
                                    'eventCategory':  '保存图片',
                                    'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
                                });
                            }  ;
		            	}else if(l=="youjia"){
                            datasrc=getPermissionByTime(MCRDDT.DownloadElse,datasrc,"PubDate","/",w);
		            		myoption = MCRDDT.yj_option;
                            myoption.xAxis[0].data = searchFromArr(datasrc,'CNCode','YYO001','PubDate');
			            	myoption.series[0].data = searchFromArr(datasrc,'CNCode','YYO003','AvgPrice');
			            	myoption.series[1].data = searchFromArr(datasrc,'CNCode','YYO001','AvgPrice');
			            	myoption.series[2].data = searchFromArr(datasrc,'CNCode','TRO001','AvgPrice');
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"油价",myoption);
                                var pm=$(".product01").text();
                                var sec=$(".mian_nav>a").text();
                                var tabName=$("#macroDetail .selected").text();
                                var wd=$('.details_box .wd_r >a').text();
                                ga('send', 'event', {
                                    'eventCategory':  '保存图片',
                                    'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
                                });
                            }  ;
		            	}else if(l=="gdp"){
                            if(w=="quarter"){
                                datasrc=getPermissionByTime(MCRDDT.DownloadElse,datasrc,"PubDate","/",w);
                            } else{
                                datasrc=getPermissionByTime(MCRDDT.DownloadElse,datasrc,"DataDate","/",w);
                            }
		            		myoption = MCRDDT.gdp_option;
		            		myoption.xAxis[0].data = getObjData(datasrc,'DataDate');
			            	myoption.series[0].data = getObjData(datasrc,'TB_DataValue');
			            	myoption.series[1].data = getObjData(datasrc,'HB_DataValue');
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"GDP",myoption);
                                var pm=$(".product01").text();
                                var sec=$(".mian_nav>a").text();
                                var tabName=$("#macroDetail .selected").text();
                                var wd=$('.details_box .wd_r >a').text();
                                ga('send', 'event', {
                                    'eventCategory':  '保存图片',
                                    'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
                                });
                            }  ;
		            	}else if(l=="cpi"){
                            datasrc=getPermissionByTime(MCRDDT.DownloadElse,datasrc,"DataDate","/",w);
		            		myoption = MCRDDT.cpi_option;
		            		myoption.xAxis[0].data = getObjData(datasrc,'DataDate');
			            	myoption.series[0].data = getObjData(datasrc,'TB_DataValue');
			            	myoption.series[1].data = getObjData(datasrc,'HB_DataValue');
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"CPI",myoption);
                                var pm=$(".product01").text();
                                var sec=$(".mian_nav>a").text();
                                var tabName=$("#macroDetail .selected").text();
                                var wd=$('.details_box .wd_r >a').text();
                                ga('send', 'event', {
                                    'eventCategory':  '保存图片',
                                    'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
                                });
                            }  ;
		            	}else if(l=="pmi"){
                            datasrc=getPermissionByTime(MCRDDT.DownloadElse,datasrc,"DataDate","/",w);
		            		myoption = MCRDDT.pmi_option;
		            		myoption.xAxis[0].data = getObjData(datasrc,'DataDate');
			            	myoption.series[0].data = getObjData(datasrc,'ZZ_DataValue');
			            	myoption.series[1].data = getObjData(datasrc,'FZZ_DataValue');
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"PMI",myoption);
                                var pm=$(".product01").text();
                                var sec=$(".mian_nav>a").text();
                                var tabName=$("#macroDetail .selected").text();
                                var wd=$('.details_box .wd_r >a').text();
                                ga('send', 'event', {
                                    'eventCategory':  '保存图片',
                                    'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
                                });
                            }  ;
		            	}else if(l=="ppi"){
                            datasrc=getPermissionByTime(MCRDDT.DownloadElse,datasrc,"DataDate","/",w);
		            		myoption = MCRDDT.ppi_option;
		            		myoption.xAxis[0].data = getObjData(datasrc,'DataDate');
			            	myoption.series[0].data = getObjData(datasrc,'TB_DataValue');
			            	myoption.series[1].data = getObjData(datasrc,'HB_DataValue');
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"PPI",myoption);
                                var pm=$(".product01").text();
                                var sec=$(".mian_nav>a").text();
                                var tabName=$("#macroDetail .selected").text();
                                var wd=$('.details_box .wd_r >a').text();
                                ga('send', 'event', {
                                    'eventCategory':  '保存图片',
                                    'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
                                });
                            }  ;
		            	}else if(l=="m2"){
                            datasrc=getPermissionByTime(MCRDDT.DownloadElse,datasrc,"DataDate","/",w);
		            		myoption = MCRDDT.m2_option;
		            		myoption.xAxis[0].data = getObjData(datasrc,'DataDate');
			            	myoption.series[0].data = getObjData(datasrc,'ZHL_DataValue');
			            	myoption.series[1].data = getObjData(datasrc,'ZF_DataValue');
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"M2",myoption);
                                var pm=$(".product01").text();
                                var sec=$(".mian_nav>a").text();
                                var tabName=$("#macroDetail .selected").text();
                                var wd=$('.details_box .wd_r >a').text();
                                ga('send', 'event', {
                                    'eventCategory':  '保存图片',
                                    'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
                                });
                            }  ;
		            	}
		            	
		            	var ss = window.localStorage.getItem("macrodata");
		            	myoption.legend.selected = $.parseJSON(ss);
		            	MCRDDT.selected = $.parseJSON(ss);
		            	myCharts.setOption(myoption);
		            	myCharts.setOption({toolbox:toolboxobj});
		            	MCRDDT.loadDtTable(l,w,1,true);
		            	var x = Math.ceil(myoption.series[0].data.length/MCRDDT.psize);
		            	MCRDDT.initPagination(l,w,"mcrddt_pg",x);
	            	}else{
	            		myCharts.clear();
	        			myCharts.showLoading({
	        		    	text: '暂无数据',    //loading话术
	        		    	effect: 'bubble'
	        		    });
	        			$("#mcrddt").empty();
	        			$('#mcrddt_pg').jqPaginator('destroy');
	            	}        	
	            },
	            error:function(xhr,e){
	                console.log(xhr,e)
	            }
	        });
		},
		//见449行，将this作为第二个参数，可获取点击的dom，由此可进行一些细节处理
		changeOrder : function(colname,evt){
//			if($(evt).is(".tableDisable")){     //yueguo  此处是屏蔽置灰的字段进行排序的功能，预留此方法，客户很有可能会提出不允许置灰字段进行排序的需求
//				return;							//yueguo  此功能的实现需要evt参数，见方法注释
//			}
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
			
			//重新绘制表格，跳转至第一页
			this.loadDtTable(this.idxid,this.weidu,1,false);
			//分页控件跳转至第一页
			$('#mcrddt_pg').jqPaginator('option', {
			    currentPage: 1
			});
            var pm=$(".product01").text();
            var sec=$(".mian_nav>a").text();
            var tabName=$("#macroDetail .selected").text();
            var wd=$('.details_box .wd_r >a').text();
            ga('send', 'event', {
                'eventCategory':  '排序点击',
                'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
            });
		},
		search : function(){
			this.drawProPic(this.idxid, this.weidu);
            var pm=$(".product01").text();
            var sec=$(".mian_nav>a").text();
            var tabName=$("#macroDetail .selected").text();
            var wd=$('.details_box .wd_r >a').text();
            ga('send', 'event', {
                'eventCategory':  '搜索点击',
                'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
            });
		},
		loadDtTable : function(l,w,pindex,isPaging){
		            	var opt = {};
		            	if(l=="rate"){
			            	opt = {
				            		data : MCRDDT.getTableData(pindex),
				            		datamap : [{
				            			name : '日期', //字段中文名，绘制table时会展示在表头
				            			value : 'PubDate', //后台的字段名
				            			width : 20 , //字段所占百分比宽度
				            			hidden : false ,//hidden为true时必须设置tg属性
				            			tg : 0 ,//字段标识，不得重复
				            			sorting : true
				            		},{
				            			name : '美元兑人民币',
				            			value : 'MY',
				            			width : 20 ,
				            			tg : 1 ,
				            			sorting : true
				            		},{
				            			name : '欧元兑人民币',
				            			value : 'OY',
				            			width : 20 ,
				            			tg : 2 ,
				            			sorting : true
				            		},{
				            			name : '100日元兑人民币',
				            			value : 'RY',
				            			width : 20 ,
				            			tg : 3 ,
				            			sorting : true
				            		}]
				            	};

		            	}else if(l=="youjia"){
			            	opt = {
				            		data : MCRDDT.getTableData(pindex),
				            		datamap : [{
				            			name : '日期', //字段中文名，绘制table时会展示在表头
				            			value : 'PubDate', //后台的字段名
				            			width : 20 , //字段所占百分比宽度
				            			hidden : false ,//hidden为true时必须设置tg属性
				            			tg : 0 ,//字段标识，不得重复
				            			sorting : true
				            		},{
				            			name : 'WTI',
				            			value : 'AvgPrice',
				            			width : 20 ,
				            			tg : 1 ,
				            			sorting : true
				            		},{
				            			name : '布伦特',
				            			value : 'AvgPrice',
				            			width : 20 ,
				            			tg : 2 ,
				            			sorting : true
				            		},{
				            			name : 'Nymex N.Gas',
				            			value : 'AvgPrice',
				            			width : 20 ,
				            			tg : 3 ,
				            			sorting : true
				            		}]
				            	};

		            	}else if(l=="gdp"){
			            	opt = {
				            		data : MCRDDT.getTableData(pindex),
				            		datamap : [{
				            			name : '日期', //字段中文名，绘制table时会展示在表头
				            			value : 'DataDate', //后台的字段名
				            			width : 20 , //字段所占百分比宽度
				            			hidden : false ,//hidden为true时必须设置tg属性
				            			tg : 0 ,//字段标识，不得重复
				            			sorting : true
				            		},{
				            			name : '国内生产总值',
				            			value : 'HB_DataValue',
				            			width : 20 ,
				            			tg : 1 ,
				            			sorting : true
				            		},{
				            			name : '国内生产总值:同比增长',
				            			value : 'TB_DataValue',
				            			width : 20 ,
				            			tg : 2 ,
				            			sorting : true
				            		}]
				            	};

		            	}else if(l=="cpi"){
			            	opt = {
				            		data : MCRDDT.getTableData(pindex),
				            		datamap : [{
				            			name : '日期', //字段中文名，绘制table时会展示在表头
				            			value : 'DataDate', //后台的字段名
				            			width : 20 , //字段所占百分比宽度
				            			hidden : false ,//hidden为true时必须设置tg属性
				            			tg : 0 ,//字段标识，不得重复
				            			sorting : true
				            		},{
				            			name : '居民消费价格指数:同比',
				            			value : 'TB_DataValue',
				            			width : 20 ,
				            			tg : 1 ,
				            			sorting : true
				            		},{
				            			name : '居民消费价格指数:环比',
				            			value : 'HB_DataValue',
				            			width : 20 ,
				            			tg : 2 ,
				            			sorting : true
				            		}]
				            	};

		            	}else if(l=="pmi"){
			            	opt = {
				            		data : MCRDDT.getTableData(pindex),
				            		datamap : [{
				            			name : '日期', //字段中文名，绘制table时会展示在表头
				            			value : 'DataDate', //后台的字段名
				            			width : 20 , //字段所占百分比宽度
				            			hidden : false ,//hidden为true时必须设置tg属性
				            			tg : 0 ,//字段标识，不得重复
				            			sorting : true
				            		},{
				            			name : '采购经理指数:制造业',
				            			value : 'ZZ_DataValue',
				            			width : 20 ,
				            			tg : 1 ,
				            			sorting : true
				            		},{
				            			name : '采购经理指数:非制造业',
				            			value : 'FZZ_DataValue',
				            			width : 20 ,
				            			tg : 2 ,
				            			sorting : true
				            		}]
				            	};

		            	}else if(l=="ppi"){
			            	opt = {
				            		data : MCRDDT.getTableData(pindex),
				            		datamap : [{
				            			name : '日期', //字段中文名，绘制table时会展示在表头
				            			value : 'DataDate', //后台的字段名
				            			width : 20 , //字段所占百分比宽度
				            			hidden : false ,//hidden为true时必须设置tg属性
				            			tg : 0 ,//字段标识，不得重复
				            			sorting : true
				            		},{
				            			name : '工业生产者出厂价格指数：同比增长',
				            			value : 'TB_DataValue',
				            			width : 20 ,
				            			tg : 1 ,
				            			sorting : true
				            		},{
				            			name : '工业生产者出厂价格指数：环比增长',
				            			value : 'HB_DataValue',
				            			width : 20 ,
				            			tg : 2 ,
				            			sorting : true
				            		}]
				            	};

		            	}else if(l=="m2"){
			            	opt = {
				            		data : MCRDDT.getTableData(pindex),
				            		datamap : [{
				            			name : '日期', //字段中文名，绘制table时会展示在表头
				            			value : 'DataDate', //后台的字段名
				            			width : 20 , //字段所占百分比宽度
				            			hidden : false ,//hidden为true时必须设置tg属性
				            			tg : 0 ,//字段标识，不得重复
				            			sorting : true
				            		},{
				            			name : '货币供应:(M2)准货币',
				            			value : 'ZHL_DataValue',
				            			width : 20 ,
				            			tg : 1 ,
				            			sorting : true
				            		},{
				            			name : 'M2同比增幅',
				            			value : 'ZF_DataValue',
				            			width : 20 ,
				            			tg : 2 ,
				            			sorting : true
				            		}]
				            	};

		            	}
		            	MCRDDT.drawDtTable(opt,"mcrddt");
		            	
		            	myCharts.on(echarts.config.EVENT.LEGEND_SELECTED,function(e){
		            		var farr = [];
		            		MCRDDT.selected = e.selected;
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
		    				$("th","#mcrddt").removeClass("tableDisable");
		    				for(var x=0;x<farr.length;x++){
		    					$("th[tg="+farr[x]+"]","#mcrddt").addClass("tableDisable");
		    				}
                            var pm=$(".product01").text();
                            var sec=$(".mian_nav>a").text();
                            var tabName=$("#macroDetail .selected").text();
                            var wd=$('.details_box .wd_r >a').text();
                            ga('send', 'event', {
                                'eventCategory' :  '图例(Legend)点击',
                                'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd+'-'+e['target']+'图例被点击'
                            });
		    			});
		},
		drawDtTable : function(option,tabid){
			var thead = "<thead><tr class='enterprise_bt'>";
			for(var i=0;i<option.datamap.length;i++){
				if(option.datamap[i].sorting){
					var oj;
					if(MCRDDT.order == ""){
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
					thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%" style="cursor:pointer;" onclick="MCRDDT.changeOrder(\''+i+'\',this)"><span>'+option.datamap[i].name+'</span><span class="ascending_box">'+sorthtml+'</span></th>';
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
								th = fc(option.data[j]);
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
			var sel = MCRDDT.selected;
			for(var j in sel){
				if(sel[j]==false){
					for(var i=0;i<map.length;i++){
						if(map[i].name==j){
							farr.push(map[i].tg);
						}
					}
				}
			}
			$("th","#mcrddt").removeClass("tableDisable");
			for(var x=0;x<farr.length;x++){
				$("th[tg="+farr[x]+"]","#mcrddt").addClass("tableDisable");
			}
		},
		/*
		 * 初始化分页插件
		 */
		initPagination : function(l,w,id,pTotal){
		    if(pTotal>0){
		    	MCRDDT.pagetool = $("#"+id).jqPaginator({
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
		    	    		MCRDDT.loadDtTable(l,w,num,false);
		    	    	}
		    	    }
		    	});
		    }else{ //没有数据
		        $("#"+id).empty();
		    }
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
				}else if(arr[i]=="quarter"){
					name = "季";
				}else if(arr[i]=="year"){
					name = "年";
				}
				html += "<span wd=\""+arr[i]+"\" onclick=\"MCRDDT.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
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
			
//			$("div.big_wd > span[wd='"+this.weidu+"']").trigger('click');
			
			if(this.weidu=="day"){
				this.curDate=getNowDate();
				this.lyDate=getSomeDate(30);
			}else if(this.weidu=="week"){
				this.curDate=getNowDate();
				this.lyDate=getSomeDate(56);
			}else if(this.weidu=="month"){
				this.curDate=getNowDate();
				this.lyDate=getSomeYear(1);
			}else if(this.weidu=="quarter"){
				this.curDate=getNowDate();
				this.lyDate=getSomeYear(2);
			}else if(this.weidu=="year"){
				this.curDate=getNowDate();
				this.lyDate=getSomeYear(4);
			}
			
			$("#searchstart").datepicker('setDate', this.lyDate);
			$("#searchend").datepicker('setDate', this.curDate);
			
			MCRDDT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序
			$("div.big_wd > span[wd='"+this.weidu+"']").trigger('click');
		},
		backToIdx : function(){
            window.location.href="login";
		},
		resize : function(){
			myCharts.resize();
		},
		getDataSource : function(){
			var opt = myCharts.getOption();
			var arr = [];
			for(var i=0;i<opt.series[0].data.length;i++){
				var ai = [];
				ai.push(opt.xAxis[0].data[i]);
				for(var j=0;j<opt.series.length;j++){
					if("object" == typeof opt.series[j].data[i]){
						ai.push(opt.series[j].data[i].value);
					}else{
						ai.push(opt.series[j].data[i]);
					}
				}
				arr.push(ai);
			}
			return arr;
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
		getTableData : function(pindex){
			var dataSrc = MCRDDT.getDataSource();
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
	MCRDDT.init();
});
window.addEventListener("resize", function () {
	MCRDDT.resize();
});
function exportExcel(){
    if(MCRDDT.DownloadElse==1){
        alert("您尚未开通下载Excel权限!");
        return;
    }else {
	var ds = MCRDDT.getDataSource();
	var xname = MCRDDT.getXSource();
    var array=ds;
    var sheetName=["宏观数据详情"];
    var titleName=[xname];
    $("#titleName").val(JSON.stringify(titleName));
    $("#fileName").val(JSON.stringify(sheetName));
    $("#sheetName").val(JSON.stringify(sheetName));
    $("#excelArray").val(JSON.stringify([array]));
    $('#macroDetailExport').submit() ;
        var pm=$(".product01").text();
        var sec=$(".mian_nav>a").text();
        var tabName=$("#macroDetail .selected").text();
        var wd=$('.details_box .wd_r >a').text();
        ga('send', 'event', {
            'eventCategory':  '导出excel',
            'eventAction': pm+"-"+sec+"-宏观数据详情-"+tabName+'-'+wd
        });
    }
}