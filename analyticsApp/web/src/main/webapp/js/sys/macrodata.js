var charObj={};
var ls = window.localStorage;
MCRD = function(){
	var mdoption = initOption();
	var myCharts = drawPic("tb_macrodata");
	
	return {
		init : function(){
			this.liid;
			this.weidu;
			this.dtype;
			this.modelid = "macrodata";
			this.modselector = $("div#"+this.modelid);
			this.picdom = "tb_macrodata";
			this.selected;
			this.hl_option = MCRO_MOD.hl_option;
			this.yj_option = MCRO_MOD.yj_option;
			this.gdp_option = MCRO_MOD.gdp_option;
			this.cpi_option = MCRO_MOD.cpi_option;
			this.pmi_option = MCRO_MOD.pmi_option;
			this.ppi_option = MCRO_MOD.ppi_option;
			this.m2_option = MCRO_MOD.m2_option;
            this.productcode = $("#macrodataProductCode").val();
            this.modelcode = $("#macrodatamoduleId").val();
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
				$("#gongxu_wdbx").show();
				MCRD.drawProPic(l,w);
			}else if(t=="dttb"){
				$("#gongxu_wdbx").hide();
				MCRD.drawTa(l,w);
			}
		},
		drawProPic : function(l,w){
			var pd = this.picdom;
			$("div#"+pd,MCRD.modselector).show();
        	$("div.grd",MCRD.modselector).hide();
			this.showLoad();
			var aj = $.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"getMacroscopic?li="+l+"&wd="+w+"&ssid="+$("#macrodata_ssid").val(),
	            timeout : 10000, //超时时间设置，单位毫秒
	            success:function(data){
	            	if(data!=null){
	            		myCharts.hideLoading();
		            	var myoption;
		            	if(l=="rate"){
		            		myoption = MCRD.hl_option;
		            		myoption.xAxis[0].data = searchFromArr(data,'CNCode','CUO003','PubDate');
			            	myoption.series[0].data =searchFromArr(data,'CNCode','CUO003','AvgPrice');
			            	myoption.series[1].data =searchFromArr(data,'CNCode','CUO001','AvgPrice');
			            	myoption.series[2].data =searchFromArr(data,'CNCode','CUO002','AvgPrice');
		            	}else if(l=="youjia"){
		            		myoption = MCRD.yj_option;
		            		myoption.xAxis[0].data = searchFromArr(data,'CNCode','YYO001','PubDate');
			            	myoption.series[0].data = searchFromArr(data,'CNCode','YYO003','AvgPrice');
			            	myoption.series[1].data = searchFromArr(data,'CNCode','YYO001','AvgPrice');
			            	myoption.series[2].data = searchFromArr(data,'CNCode','TRO001','AvgPrice');
		            	}else if(l=="gdp"){
		            		myoption = MCRD.gdp_option;
		            		myoption.xAxis[0].data = getObjData(data,'DataDate');
			            	myoption.series[0].data = getObjData(data,'HB_DataValue');
			            	myoption.series[1].data = getObjData(data,'TB_DataValue');
		            	}else if(l=="cpi"){
		            		myoption = MCRD.cpi_option;
		            		myoption.xAxis[0].data = getObjData(data,'DataDate');
			            	myoption.series[0].data = getObjData(data,'TB_DataValue');
			            	myoption.series[1].data = getObjData(data,'HB_DataValue');
		            	}else if(l=="pmi"){
		            		myoption = MCRD.pmi_option;
		            		myoption.xAxis[0].data = getObjData(data,'DataDate');
			            	myoption.series[0].data = getObjData(data,'ZZ_DataValue');
			            	myoption.series[1].data = getObjData(data,'FZZ_DataValue');
		            	}else if(l=="ppi"){
		            		myoption = MCRD.ppi_option;
		            		myoption.xAxis[0].data = getObjData(data,'DataDate');
			            	myoption.series[0].data = getObjData(data,'TB_DataValue');
			            	myoption.series[1].data = getObjData(data,'HB_DataValue');
		            	}else if(l=="m2"){
		            		myoption = MCRD.m2_option;
		            		myoption.xAxis[0].data = getObjData(data,'DataDate');
			            	myoption.series[0].data = getObjData(data,'ZHL_DataValue');
			            	myoption.series[1].data = getObjData(data,'ZF_DataValue');
		            	}
                        myCharts.on(echarts.config.EVENT.LEGEND_SELECTED,function(e){
                            charObj = e.selected;
                            var pm=$(".product01").text();
                            var sec=$(".mian_nav>a").text();
                            var tabName=$("#macrodata .selected>a").text();
                            ga('send', 'event', {
                                'eventAction':  '图例(lengend)点击',
                                'eventCategory': pm+"-"+sec+"-宏观数据-"+tabName
                            });
                        });
                        if(charObj){
                            myoption.legend.selected=charObj;
                        }
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
	                console.log(xhr,e)
	            }
	        });
			this.initDom();
		},
		drawTa : function(l,w){
			this.showLoad();
			var pd = this.picdom;
			$.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"getSDdata?li="+l,
	            success:function(data){
	            	myCharts.hideLoading();
	            	$("div#"+pd,MCRD.modselector).hide();
	            	$("div.grd",MCRD.modselector).show();
	            	//以下加载表格数据
	            	var opt = {
		            		data : data.response.data,
		            		datamap : [{
		            			name : '日期', //字段中文名，绘制table时会展示在表头
		            			value : 'YM', //后台的字段名
		            			width : 20 , //字段所占百分比宽度
		            			tg : 0 //字段标识，不得重复
		            		},{
		            			name : '区域',
		            			value : 'AreaName',
		            			width : 20 ,
		            			tg : 1
		            		},{
		            			name : '库存',
		            			value : 'Inventory',
		            			width : 20 ,
		            			tg : 2 
		            		},{
		            			name : '涨跌',
		            			value : 'Applies',
		            			width : 20 ,
		            			tg : 3
		            		},{
		            			name : '单位',
		            			value : 'UnitName',
		            			width : 20 ,
		            			tg : 3
		            		}]
		            	};
	            	MCRD.drawTable("gongxu_tab",opt);
	            	$("#gongxu_tab > tbody >tr").bind('click',function(){
	            		$("#gongxu_wdbx").show();
	            		var tr = $(this);
	            		var dmtg = 1;
	            		var companyid = $("th[tg='"+dmtg+"']",tr).html();
	            		MCRD.showTabPic(MCRD.liid,MCRD.weidu,companyid);
	            	});
	            },
	            error:function(e){
	                //alert("系统错误,请联系管理员！");
	            }
	        });
			this.initDom();
		},
		showTabPic : function(l,w,t){
			var selected = {
				"华东" : false,
				"华南" : false,
				"华东价格" : false,
				"华南价格" : false
			};
			selected[t] = true;
			this.drawProPic(l, w);
			this.selected = selected;
		},
		changeLi : function(dom,tp){
			this.liid = dom;
			this.dtype = tp;
			this.loadWdDom(this.liid);
			this.weidu = $("div.day_box > span:first",MCRD.modselector).attr("wd");
			$("div.day_box > span:first",MCRD.modselector).addClass('day_forecast');
//			this.drawProPic(this.liid,this.weidu);
			this.drawDom(this.liid,this.weidu, this.dtype);
            var pm=$(".product01").text();
            var sec=$(".mian_nav>a").text();
            var tabName=$("#macrodata #"+dom+">a").text();
            ga('send', 'event', {
                'eventAction':  'tab点击',
                'eventCategory': pm+"-"+sec+"-宏观数据-"+tabName+'-'+this.weidu
            });
		},
		changeWd : function(wd){
			this.weidu = wd;
//			this.drawProPic(this.liid,this.weidu);
			this.drawDom(this.liid,this.weidu, this.dtype);
            ls.setItem("macrodata",JSON.stringify(charObj));
            var pm=$(".product01").text();
            var sec=$(".mian_nav>a").text();
            var tabName=$("#macrodata .selected>a").text();
            ga('send', 'event', {
                'eventAction':  '维度选择',
                'eventCategory': pm+"-"+sec+"-宏观数据-"+tabName+"-"+wd
            });
		},
		changeTbWd : function(wd){
			this.weidu = wd;
			this.drawProPic(this.liid, this.weidu);
		},
		initDom : function(){
			$("div.data_nav_box > li.china",MCRD.modselector).bind("click",function(){
		        $("li.china",$(this).parent()).removeClass("selected");
		        $(this).addClass("selected");
		    });
			
			$("div.data_nav_box > li.china > dl >dd",MCRD.modselector).bind("click",function(){
		        $("dd",$(this).parent().parent().parent()).removeClass("selected");
		        $(this).addClass("selected");
		    });

		    $("div.day_box > span",MCRD.modselector).bind("click",function(){
		        $("span",$(this).parent()).removeClass('day_forecast');
		        $(this).addClass('day_forecast');
		    });
		    
		},
		firstLoad : function(){
			this.liid = $("div.data_nav_box > li.china:first",MCRD.modselector).attr("id");
			this.dtype = $("div.data_nav_box > li.china:first",MCRD.modselector).attr("dtype");
			this.loadWdDom(this.liid);
			this.weidu = $("div.day_box > span:first",MCRD.modselector).attr("wd");
			
			$("li.china:first",MCRD.modselector).addClass("selected");
		    $("div.day_box > span:first",MCRD.modselector).addClass('day_forecast');	
			
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
				}else if(arr[i]=="quarter"){
					name = "季";
				}else if(arr[i]=="year"){
					name = "年";
				}
				if(this.dtype=='ecpic'){
					html += "<span wd=\""+arr[i]+"\" onclick=\"MCRD.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
				}else if(this.dtype=='dttb'){
					html += "<span wd=\""+arr[i]+"\" onclick=\"MCRD.changeTbWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
				}
			}
			$("div#"+this.modelid+" > div.day_box").html("");
			$("div#"+this.modelid+" > div.day_box").append(html);
		},
		showDetail : function(modcode){
			ls.setItem("macrodata",JSON.stringify(charObj));
			window.location.href = modcode+"?productCode="+this.productcode+"&moduleId="+this.modelcode+"&ld="+this.liid+"&wd="+this.weidu;
            var pm=$(".product01").text();
            var sec=$(".mian_nav>a").text();
            var tabName=$("#macrodata .selected>a").text();
            ga('send', 'event', {
                'eventAction':  '历史数据点击',
                'eventCategory': pm+"-"+sec+"-宏观数据-历史数据"
            });
		},
		resize : function(){
			if($(myCharts.dom).is(':visible')){
				myCharts.resize();
			}
		},
		drawTable : function(tabid,option){
			var thead = "<thead><tr class='tb_title'>";
			for(var i=0;i<option.datamap.length;i++){
				if(option.datamap[i].sorting){
					var oj;
					if(CMA.order == ""){
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
					thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%" style="cursor:hand;" onclick="CMA.changeOrder(\''+option.datamap[i].value+'\')"><span>'+option.datamap[i].name+'</span><span class="ascending_box">'+sorthtml+'</span></th>';
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
						tbody += '<tr class="tb_content">';
					}
					
					for(var x=0;x<option.datamap.length;x++){
						var th = '';
						if(option.datamap[x].value){
							var colvalue = option.datamap[x].value;
							th = '<th tg="'+option.datamap[x].tg+'">'+option.data[j][colvalue]+'</th>';
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
		}
	}
}();
$(function(){
	MCRD.init();
});
window.addEventListener("resize", function () {
	MCRD.resize();
});