CMOF = function(){
	var mdoption = initOption();
    var ArrLen;
    var dataArr=[];
    var starttime;
    var endtime;
	var  cnclkgl_option = {
		grid:{
			x : '8%',
        	y : '10%',
        	x2 : '8%',
        	y2 : '25%',
        	borderColor:'white'
	    },
	    legend: {
	        data : [],
	        y:"85%",
	        selected:{}
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
                saveAsImage : {show: true},
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
	            name:'元/吨' ,
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
	var myCharts = drawPic("tb_comoffer");
	return {
		init : function(){
			this.liid;
			this.weidu;
			this.dtype;
			this.modelid = "comoffer";
			this.modselector = $("div#"+this.modelid);
			this.picdom = "tb_comoffer";
//			this.selected=cnclkgl_option.legend.selected;
			this.cnclkgl_option = cnclkgl_option;
			this.order = "";
			this.companyid=$("#companyid").val();
			this.productcode=$("#productcode").val();
			this.cncode;
			this.legend = [];
			this.lgcode = [];

			myCharts.on(echarts.config.EVENT.LEGEND_SELECTED,function(e){
				CMOF.selected = e.selected;
                ga('send','event',{
                    'eventCategory':'图例(Legend)点击',
                    'eventAction':'企业报价-'+e['target']+'图例点击'
                })
			});

//			this.initDom();
			this.firstLoad();
		},
		showLoad : function(){
			myCharts.clear();
			myCharts.showLoading({
		    	text: '正在努力的读取数据中...',    //loading话术
		    	effect: 'whirling'
		    });
		},
		drawDom : function(l,w,t){
			if(t=="ecpic"){
				CMOF.drawProPic(l,w);
			}else if(t=="dttb"){
				CMOF.drawTa(l,w);
			}
		},
		drawProPic : function(l,w,cncode,legendname){
			var ksrq = getSomeYear(1);
			var jsrq = getNowDate();
//			var codestr = "'"+CMOF.lgcode.join("','")+"'";
//			var codestr = CMOF.lgcode;
			var codestr = cncode;
            var pd = this.picdom;
			$("div#"+pd,CMOF.modselector).show();
        	$("div.grd",CMOF.modselector).hide();
			this.showLoad();
            var aj = $.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"getCoData?type="+l+"&cncode="+codestr+"&ksrq="+ksrq+"&jsrq="+jsrq,
	            timeout : 10000, //超时时间设置，单位毫秒
	            success:function(data){
	            	if(data!=null){
	            		myCharts.hideLoading();
		            	var myoption;
		            	if(l=="jgzs"){
                            var lgarr=[];
		            		lgarr.push(legendname) ;
		            		var lgcdarr = cncode;
//                            console.log(lgarr)
//                            console.log(cncode)
		            		myoption = cnclkgl_option;
		            		myoption.legend.data = lgarr;
		            		myoption.xAxis[0].data = searchFromArr(data,'CNCode',lgcdarr,'PubDate');
                            starttime= myoption.xAxis[0].data[0];
                            endtime=myoption.xAxis[0].data[myoption.xAxis[0].data.length-1];
		            		myoption.series = [];
		            		for(var i=0;i<1;i++){
		            			myoption.series.push({
		            				name:lgarr[i],
		            				type:"line",
//		            				data:searchFromArr(data,'CNCode',lgcdarr[i],'AvgPrice'),
		            				data:searchFromArr(data,'CNCode',lgcdarr,'AvgPrice'),
		            				barGap : 0,
		            				symbolSize: 0|0
		            			});
		            		}

		            	}
		            	myoption.legend.selected = CMOF.selected;
		            	myCharts.setOption(myoption);
	            	}else{
	            		myCharts.clear();
	        			myCharts.showLoading({
	        		    	text: '暂无数据',    //loading话术
	        		    	effect: 'bubble'
	        		    });
	            	}
	            },
	            error:function(xhr,e){
	            	var err = '读取数据出错';
	                if(e=="parsererror"){
	                	err = '数据获取地址出错，请联系管理员';
	                }else if(e=="timeout"){
	                	err = "读取数据超时";
	                }
	                myCharts.showLoading({
	    		    	text: err,    //loading话术
	    		    	effect: 'whirling'
	    		    });
	            }
	        });
			this.initDom();
		},
		backToPic : function(){
			$(".tab_back").hide();
			$("li.china:first",CMOF.modselector).trigger('click');
            var comname=$(".enterprise_h").text();
            ga('send','event',{
                'eventCategory':'图表切换',
                'eventAction':comname+'-企业报价图表切换'
            })
		},
		drawTa : function(l,w){
			this.showLoad();
			var pd = this.picdom;
			$.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"getCoData?type="+l+"&companyid="+CMOF.companyid+"&productcode="+CMOF.productcode,
	            success:function(data){
                    if(data&&data.length){
                        endtime=data[0]['PubDate'];
	            	CMOF.legend = data[0]['OfferingCompany'];
//	            	CMOF.legend = CMOF.getLegend(data.response.data,'OfferingCompany','Producer');
//	            	CMOF.lgcode = getObjData(data.response.data,'CNCode');
	            	CMOF.lgcode =data[0]['CNCode'];
                    var lgarr = CMOF.legend;
	            	var lgobj = {};
                        ArrLen=data.length;
	            	for(var i=0;i<ArrLen;i++){
	            		lgobj[lgarr] = true;
	            	}
                    for(var i=0;i<ArrLen;i++){
                        dataArr.push(data[i]);
                    }
	            	CMOF.selected = lgobj;
//	            	myCharts.hideLoading();
	            	$("div#"+pd,CMOF.modselector).hide();
	            	$("div.grd",CMOF.modselector).show();


                        var pmcode=$(".product01").attr("prdcode");
                        if(pmcode=="380-030"||pmcode=="380-060"){
                            var opt = {
//		            		data : data.response.data,
                                data : dataArr,
                                datamap : [{
                                    name : '日期', //字段中文名，绘制table时会展示在表头
                                    value : 'PubDate', //后台的字段名
                                    width : 10 , //字段所占百分比宽度
                                    tg : 0 ,//字段标识，不得重复
                                    sorting : true
                                },{
                                    name : '报价企业',
                                    value : 'OfferingCompany',
                                    width : 25 ,
                                    tg : 1 ,
                                    sorting : true
                                },{
                                    name : '报价/挂牌价',
//                                    value : 'OfferPrice',
                                    width : 15 ,
                                    tg : 2 ,
                                    sorting : true,
                                    render : function(data,name){
                                        return '<th tg=4 width="15%">'+data['MinPrice']+'-'+data['MaxPrice']+'</th>';
                                    }
                                }
//                                    ,
//                                    {
//                                        name : '结算价',
////                                        value : 'SettlementPrice',
//                                        width : 10 ,
//                                        tg : 3 ,
//                                        sorting : true,
//                                        render : function(data){
//                                            return '<th tg=4 width="10%">'+data['MinPrice']+'/'+data['MaxPrice']+'</th>';
//                                        }
//                                    }
                                    ,{
                                        name : '涨跌',
//                                        value : 'minChange',
                                        width : 10 ,
                                        tg : 4,
                                        render : function(data){
                                            return '<th tg=4 width="10%">'+(data['MinPrice']-data['LMinPrice'])+'/'+(data['MaxPrice']-data['LMaxPrice'])+'</th>';
                                        }
                                    },{
                                        name : '单位',
                                        value : 'minChange',
                                        width : 10 ,
                                        tg : 5,
                                        render : function(data){
                                            return '<th tg=5 width="10%">元/吨</th>';
                                        }
                                    },
//                                {
//		            			name : '生产企业',
//		            			value : 'Producer',
//		            			width : 0 ,
//		            			tg : 6 ,
//		            			hidden : true
//		            		},
                                    {
                                        name : '报价代码',
//                                        value : 'CNCode',
                                        width : 5 ,
                                        tg : 12 ,
                                        hidden:true,
                                        render : function(data){
                                            return '<th tg=12 width="5%">'+data['CNCode']+'</th>';
                                        }
                                    }
                                    ,
                                    {
                                        name : '级别/牌号',
//                                        value : 'Note',
                                        width : 15 ,
                                        tg : 10 ,
                                        render : function(data){
                                            return '<th tg=10 width="15%">'+data['Note']+'</th>';
                                        }
                                    }        ,
                                    {
                                        name : '备注',
                                        value : 'beizhu',
                                        width : 10 ,
                                        tg : 3
                                    }

                                ]
                            }
                        }
                        else{
                            //以下加载表格数据
                            var opt = {
//		            		data : data.response.data,
                                data : dataArr,
                                datamap : [{
                                    name : '日期', //字段中文名，绘制table时会展示在表头
                                    value : 'PubDate', //后台的字段名
                                    width : 15 , //字段所占百分比宽度
                                    tg : 0 ,//字段标识，不得重复
                                    sorting : true
                                },{
                                    name : '报价企业',
                                    value : 'OfferingCompany',
                                    width : 25 ,
                                    tg : 1 ,
                                    sorting : true
                                },{
                                    name : '报价/挂牌价',
                                    value : 'OfferPrice',
                                    width : 15 ,
                                    tg : 2 ,
                                    sorting : true,
                                    render : function(data,name){
                                        return '<th tg=4 width="15%">'+data['MinPrice']+'-'+data['MaxPrice']+'</th>';
                                    }
                                },{
                                    name : '涨跌',
                                    value : 'minChange',
                                    width : 15 ,
                                    tg : 4,
                                    render : function(data){
                                        return '<th tg=4 width="15%">'+(data['MinPrice']-data['LMinPrice'])+'/'+(data['MaxPrice']-data['LMaxPrice'])+'</th>';
                                    }
                                },{
                                    name : '单位',
                                    value : 'minChange',
                                    width : 15 ,
                                    tg : 5,
                                    render : function(data){
                                        return '<th tg=5 width="15%">元/吨</th>';
                                    }
                                },
//                                {
//		            			name : '生产企业',
//		            			value : 'Producer',
//		            			width : 0 ,
//		            			tg : 6 ,
//		            			hidden : true
//		            		},
                                    {
                                        name : '报价代码',
                                        value : 'CNCode',
                                        width : 15 ,
                                        tg : 12 ,
                                        hidden:true,
                                        render : function(data){
                                            return '<th tg=12 width="15%">'+data['CNCode']+'</th>';
                                        }
                                    }
                                ]
                            };
                        }
	            	CMOF.drawTable("cmof_tb",opt);

//	            	var wid = $(".tab_b","#comoffer").width();
//					$(".tab_h","#comoffer").css("width",wid-12);
	            	$("#cmof_tb_b > tbody >tr").attr("style","cursor:pointer;");
	            	$("#cmof_tb_b > tbody >tr").bind('click',function(){
	            		var tr = $(this);
	            		var dmtg = 12;
	            		var cncode = $("th[tg='"+dmtg+"']",tr).html();
	            		var legendname = $("th[tg='1']",tr).html();
	            		if(cncode=="-"){
	            			cncode = $("th[tg='12']",tr).html();
	            		}
	            		CMOF.showComDetail(cncode,w,legendname);
	            	});
                }
                    else{
                        myCharts.clear();
                        myCharts.showLoading({
                            text : '无企业报价',
                            textStyle :{fontSize : 15 ,color : '#404040'},
                            effectOption:{backgroundColor: '#fefefe'}
                        });
                      /*  $(".tb").css("text-align","center");
                        $(".tb").css("margin-top","150");
                        $(".tb").html("无企业报价");*/
                    }
	            },
	            error:function(e){
                    console.log(e)
	                //alert("系统错误,请联系管理员！");
	            }
	        });
			this.initDom();
		},
		/* data：数据源数组    field：首选字段名   sec_field：次选字段名     当首选字段为空时，取次选字段的值
		 * 此模块的具体应用场景为：报价企业为空时，取生产企业为图表的图例名称
		 */
		getLegend : function(data,field,sec_field){
		    var array=[];
		    if(data){
		    	for(var j=0;j<data.length;j++){
		    		if(data[j][field]=="-"){
		    			array.push(data[j][sec_field]);
		    		}else{
		    			array.push(data[j][field]);
		    		}
		    	}
		    }
		    return array;
		},
		showComDetail : function(cncode,w,legendname){
			var selected =  this.selected;
			this.selected = selected;
			$(".tab_back").show();
    		CMOF.drawProPic("jgzs",w,cncode,legendname);
		},
		changeLi : function(dom,tp){
			this.liid = dom;
			this.dtype = tp;
			this.loadWdDom(this.liid);
			this.weidu = $("div.day_box > span:first",CMOF.modselector).attr("wd");
			$("div.day_box > span:first",CMOF.modselector).addClass('day_forecast');
//			this.drawProPic(this.liid,this.weidu);
			this.drawDom(this.liid,this.weidu, this.dtype);
		},
		changeWd : function(wd){
			this.weidu = wd;
//			this.drawProPic(this.liid,this.weidu);
			this.drawDom(this.liid,this.weidu, this.dtype);
		},
		changeTbWd : function(wd){
			this.weidu = wd;
			this.drawProPic(this.liid, this.weidu);
		},
		initDom : function(){
			$("div.data_nav_box > li.china",CMOF.modselector).bind("click",function(){
		        $("li.china",$(this).parent()).removeClass("selected");
		        $(this).addClass("selected");
		    });

			$("div.data_nav_box > li.china > dl >dd",CMOF.modselector).bind("click",function(){
		        $("dd",$(this).parent().parent().parent()).removeClass("selected");
		        $(this).addClass("selected");
		    });

		    $("div.day_box > span",CMOF.modselector).bind("click",function(){
		        $("span",$(this).parent()).removeClass('day_forecast');
		        $(this).addClass('day_forecast');
		    });

		},
		firstLoad : function(){
			this.liid = $("div.data_nav_box > li.china:first",CMOF.modselector).attr("id");
			this.dtype = $("div.data_nav_box > li.china:first",CMOF.modselector).attr("dtype");
			this.loadWdDom(this.liid);
			this.weidu = $("div.day_box > span:first",CMOF.modselector).attr("wd");

			$("li.china:first",CMOF.modselector).addClass("selected");
		    $("div.day_box > span:first",CMOF.modselector).addClass('day_forecast');

//			this.drawProPic(this.liid,this.weidu);
		    this.drawDom(this.liid,this.weidu, this.dtype);
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
				if(this.dtype=='ecpic'){
					html += "<span wd=\""+arr[i]+"\" onclick=\"CMOF.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
				}else if(this.dtype=='dttb'){
					html += "<span wd=\""+arr[i]+"\" onclick=\"CMOF.changeTbWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
				}
			}
			$("div#"+this.modelid+" > div.day_box").html("");
			$("div#"+this.modelid+" > div.day_box").append(html);
		},
		showDetail : function(){
			var ls = window.localStorage;
			ls.setItem("cmofsel",JSON.stringify(this.selected));   //将图例的选中信息保存到localStorage中

//			var codestr = "'"+CMOF.lgcode.join("','")+"'";
            var codestr = CMOF.lgcode;
			ls.setItem("cmofcd",codestr);

			var legstr = CMOF.legend;
			ls.setItem("cmoflg",legstr);

//			var opt = myCharts.getOption();
//			opt.xAxis.data = [];
//			for(var i=0;i<opt.series.length;i++){
//				opt.series[i].data = [];
//			}
//			ls.setItem("cmofopt",JSON.stringify(opt));
			window.location.href = "comofferdetail?li=comof_dt&pwd=day&starttime="+starttime+"&endtime="+endtime+"&productCode="+this.productcode;
            var comname=$(".enterprise_h").text();
            ga('send','event',{
                'eventCategory':'历史数据点击',
                'eventAction':comname+'-企业报价历史数据查看'
            })
		},
		resize : function(){
			if($(myCharts.dom).is(':visible')){
				myCharts.resize();
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

			//重新绘制表格，跳转至第一页
			this.drawTa(this.liid,this.weidu);
		},
		drawTable : function(tabid,option){
			var thead = "<thead><tr class='tb_title'>";
			for(var i=0;i<option.datamap.length;i++){
				if(option.datamap[i].sorting){
					var oj;
					if(CMOF.order == ""){
						oj = $.parseJSON("{"+this.order+"}");
					}else{
						oj = $.parseJSON(this.order);
					}
					var colname = option.datamap[i].value;
					var sorthtml = "";
					if(typeof oj[colname] === "undefined"){
						sorthtml += '<a class="ascending"></a><a class="descending"></a>';
					}else if(oj[colname]==0){
						sorthtml += '<a style="margin-top:-12px;" class="ascending"></a>';
					}else{
						sorthtml += '<a style="margin-top:-12px;" class="descending"></a>';
					}
					thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%" style="cursor:hand;" onclick="CMOF.changeOrder(\''+option.datamap[i].value+'\')"><span>'+option.datamap[i].name+'</span><span class="ascending_box">'+sorthtml+'</span></th>';
				}else{
					thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%"><span>'+option.datamap[i].name+'</span></th>';
				}
			}
			thead += "</tr></thead>";

			var tbody = "";
			if(option.data){
				tbody += '<tbody>';
				for(var j=0;j<ArrLen;j++){
					if(j%2==0){
						tbody += '<tr>';
					}else{
						tbody += '<tr class="tb_content">';
					}

					for(var x=0;x<option.datamap.length;x++){
						var th = '';
						if(option.datamap[x].value){
                            var colvalue = option.datamap[x].value;
							th = '<th tg="'+option.datamap[x].tg+'" width="'+option.datamap[x].width+'%">'+option.data[j][colvalue]+'</th>';
//							th = '<th tg="'+option.datamap[x].tg+'" width="'+option.datamap[x].width+'%">'+option.data[j][colvalue]+'</th>';
						}
						if(option.datamap[x].render){
                            var colvalue = option.datamap[x].value;
							var fc = option.datamap[x].render;
							if ( typeof fc === 'function' ){
								th = fc(option.data[j],colvalue);
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
			$("#"+tabid+"_h").empty();
			$("#"+tabid+"_b").empty();
//			$("#"+tabid).append(html);
			$("#"+tabid+"_h").append(thead);
			$("#"+tabid+"_b").append(tbody);


			for(var n=0;n<option.datamap.length;n++){
				if(option.datamap[n].hidden){
					var tgn = option.datamap[n].tg;
					$("th[tg='"+tgn+"']").hide();
				}
			}
		},
		tableResize : function(){
			if($(".tab_b","#comoffer").is(':visible')){
				var wid = $(".tab_b","#comoffer").width();
				$(".tab_h","#comoffer").css("width",wid-12);
			}
		}
	}
}();
$(function(){
	CMOF.init();
});
window.addEventListener("resize", function () {
	CMOF.resize();
//	CMOF.tableResize();
});