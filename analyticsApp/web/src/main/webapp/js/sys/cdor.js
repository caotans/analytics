CDOR = function(){
	var mdoption = initOption();
	var  option = mdoption;
	var  option2 = mdoption;
	var myCharts = drawPic("tb_cdor");
	
	return {
		init : function(){
			this.liid;
			this.weidu;
			this.dtype;
			this.modelid = "cdor";
			this.modselector = $("div#"+this.modelid);
			this.picdom = "tb_cdor";
			this.selected;
			this.option = option;
			this.option2 = option2;
			
			this.companyid=$("#companyid").val();
			this.productcode=$("#productcode").val();
			
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
				CDOR.drawProPic(l,w);
			}else if(t=="dttb"){
				CDOR.drawTa(l,w);
			}
		},
		drawProPic : function(l,w){
			var pd = this.picdom;
			$("div#"+pd,CDOR.modselector).show();
        	$("div.hxgrd",CDOR.modselector).hide();
			this.showLoad();
			var aj = $.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"getprofitdata?li="+l+"&wd="+w,
	            timeout : 10000, //超时时间设置，单位毫秒
	            success:function(data){
	            	if(data!=null){
	            		myCharts.hideLoading();
		            	var myoption;
		            	if(l=="lr"){
		            		myoption = option;
		            		myoption.xAxis[0].data = getObjData(data,'cDate');
			            	myoption.series[0].data = getObjData(data,'LR');
			            	myoption.series[1].data = getObjData(data,'LRBHL');
		            	}else if(l=="tl"){
		            		myoption = option2;
		            		myoption.legend.selected = CDOR.selected;
		            		myoption.xAxis[0].data = getObjData(data,'PubDate');
			            	myoption.series[0].data = getObjData(data,'GNCJ');
			            	myoption.series[1].data = getObjData(data,'MGCJ');
			            	myoption.series[2].data = getObjData(data,'HGCJ');
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
	            url:"getCdorData?companyid="+CDOR.companyid+"&productcode="+CDOR.productcode,
	            success:function(data){
	            	if(data!=null){
	            		myCharts.hideLoading();
	            		$("div#"+pd,CDOR.modselector).hide();
	            		$("div.hxgrd",CDOR.modselector).show();
	            		//以下加载表格数据
	            		var opt = {
	            				data : data,
	            				datamap : [{
	            					name : '月份', //字段中文名，绘制table时会展示在表头
	            					value : 'PubDate' //后台的字段名
	            				},{
	            					name : '开工率变化',
	            					value : 'OR_M',
	            					render : function(data){
	            						if(typeof data.OR_M == "number"){
	            							return '<th>'+Math.floor(data.OR_M*100*100)/100+'%</th>';
	            						}else{
	            							return '<th>'+data.OR_M+'</th>';
	            						}
	            					}
	            				},{
	            					name : '预计检修影响量',
	            					value : 'Production'
	            				}]
	            		};
	            		CDOR.drawHxTable("table.jqdt",opt);
	            	}else{
	            		myCharts.clear();
	        			myCharts.showLoading({
	        				animation:false,
	                        text : '无检修',
	                        textStyle : {fontSize : 20 ,color : '#404040'},
	                        effectOption: {backgroundColor: '#fefefe'}
	        		    });
	            	}
	            	
	            },
	            error:function(e){
	                //alert("系统错误,请联系管理员！");
	            }
	        });
			this.initDom();
		},
		drawHxTable : function(selector,option){
			var html = "";
			for(var i=0;i<option.datamap.length;i++){
				if(i%2==0){
					html += "<tr>";
				}else{
					html += "<tr class='Capacity_tab_tr'>";
				}
				html += "<th class='Capacity_tab_y'>"+option.datamap[i].name+"</th>";
				var th = "";
				if(option.datamap[i].value){
					var colname = option.datamap[i].value;
					for(var j=0;j<option.data.length;j++){
						th += "<th>"+option.data[j][colname]+"</th>";
					}
				}
				if(option.datamap[i].render){
					th = '';
					var fc = option.datamap[i].render;
					for(var j=0;j<option.data.length;j++){
						if ( typeof fc === 'function' ){
							th += fc(option.data[j]);
						}else{
							$(selector,CDOR.modselector).html("");
							alert("表格配置了render属性时，需指定render为function类型，并返回一段表格字段的html代码。");
							return;
						}
					}			
				}
				html += th;
				html += "</tr>";
			}
			$(selector,CDOR.modselector).html("");
			$(selector,CDOR.modselector).append(html);
		},
		showTabPic : function(l,w,t){
			var selected = {
				"进口VS国内" : false,
				"进口VS美国" : false,
				"进口VS韩国" : false
			};
			selected[t] = true;
			this.drawProPic(l, w);
			this.selected = selected;
		},
		changeLi : function(dom,tp){
			this.liid = dom;
			this.dtype = tp;
			this.loadWdDom(this.liid);
			this.weidu = $("div.day_box > span:first",CDOR.modselector).attr("wd");
			$("div.day_box > span:first",CDOR.modselector).addClass('day_forecast');
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
			$("div.data_nav_box > li.china",CDOR.modselector).bind("click",function(){
		        $("li.china",$(this).parent()).removeClass("selected");
		        $(this).addClass("selected");
		    });
			
			$("div.data_nav_box > li.china > dl >dd",CDOR.modselector).bind("click",function(){
		        $("dd",$(this).parent().parent().parent()).removeClass("selected");
		        $(this).addClass("selected");
		    });

		    $("div.day_box > span",CDOR.modselector).bind("click",function(){
		        $("span",$(this).parent()).removeClass('day_forecast');
		        $(this).addClass('day_forecast');
		    });
		    
		},
		firstLoad : function(){
			this.liid = $("div.data_nav_box > li.china:first",CDOR.modselector).attr("id");
			this.dtype = $("div.data_nav_box > li.china:first",CDOR.modselector).attr("dtype");
			this.loadWdDom(this.liid);
			this.weidu = $("div.day_box > span:first",CDOR.modselector).attr("wd");
			
			$("li.china:first",CDOR.modselector).addClass("selected");
		    $("div.day_box > span:first",CDOR.modselector).addClass('day_forecast');	
			
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
					html += "<span wd=\""+arr[i]+"\" onclick=\"CDOR.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
				}else if(this.dtype=='dttb'){
					html += "<span wd=\""+arr[i]+"\" onclick=\"CDOR.changeTbWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
				}
			}
			$("div#"+this.modelid+" > div.day_box").html("");
			$("div#"+this.modelid+" > div.day_box").append(html);
		},
		showDetail : function(modcode){
			$("div.content_box").hide();
			$("div.dt_box").show();
			$("div.dt_box").html("");
			$("div.dt_box").load(modcode+"?ld="+this.liid+"&wd="+this.weidu);
		}
	}
}();
$(function(){
	CDOR.init();
});