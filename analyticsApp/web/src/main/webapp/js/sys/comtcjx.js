CMTCJX = function(){
	var mdoption = initOption();
	var  option = mdoption;
	var  option2 = mdoption;
	var myCharts = drawPic("tb_tcjx");
	
	var ls = window.localStorage;
	
	return {
		init : function(){
			this.liid;
			this.weidu;
			this.dtype;
			this.modelid = "comtcjx";
			this.modselector = $("div#"+this.modelid);
			this.picdom = "tb_tcjx";
			this.selected;
			this.option = option;
			this.option2 = option2;
			this.order = "";
			
			this.companyid=$("#companyid").val();
			this.productcode=$("#productcode").val();
			
//			this.initDom();
			this.firstLoad();
		},
		showLoad : function(){
			$("div#"+this.picdom,CMTCJX.modselector).show();
        	$("div.hxgrd",CMTCJX.modselector).hide();
			myCharts.clear();
			myCharts.showLoading({
		    	text: '正在努力的读取数据中...',    //loading话术
		    	effect: 'whirling'
		    });
		},
		drawDom : function(l,w,t){
			if(t=="ecpic"){
				CMTCJX.drawProPic(l,w);
			}else if(t=="dttb"){
				CMTCJX.drawTa(l,w);
			}
		},
		drawProPic : function(l,w){},
		drawTa : function(l,w){
			this.showLoad();
			var pd = this.picdom;
			$.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"getComdsData?li="+l+"&companyid="+CMTCJX.companyid+"&productcode="+CMTCJX.productcode+"&order="+encodeURI(encodeURI(CMTCJX.order)),
	            success:function(data){
	            	myCharts.hideLoading();
	            	$("div#"+pd,CMTCJX.modselector).hide();
	            	$("div.hxgrd",CMTCJX.modselector).show();
	            	//以下加载表格数据
	            	var opt;
	            	if(l=="tcjx"){
                        if(CMTCJX.productcode=='380-030'){   //PE
                            opt = {
                                data : data.response.data,
                                datamap : [{
                                    name : '装置生产线', //字段中文名，绘制table时会展示在表头
                                    value : 'factory', //后台的字段名
                                    tg : 1,
                                    width : 20
                                },{
                                    name : '级别',
                                    value : 'Name',
                                    tg : 2,
                                    width : 20
                                },{
                                    name : '装置编号',
                                    value : 'LineNumber',
                                    tg : 2,
                                    width : 20
                                },{
                                    name : '类型',
                                    value : 'recordType',
                                    tg : 2,
                                    width : 20
                                },{
                                    name : '状态',
                                    value : 'recordState' ,
                                    tg : 3,
                                    width : 20
                                },{
                                    name : '基准开工率',
                                    value : 'FiducialOperationRate',
                                    tg : 4,
                                    width : 20
                                },{
                                    name : '产能（万吨/年）',
                                    value : 'Capacity',
                                    tg : 5,
                                    width : 20
                                },{
                                    name : '影响本月产量（万吨）',
                                    value : 'ProductionImpact',
                                    tg : 6,
                                    width : 20
                                },{
                                    name : '开始时间',
                                    value : 'ExpectedStart',
                                    tg : 7,
                                    width : 20
                                },{
                                    name : '结束时间',
                                    value : 'ExpectedEnd',
                                    tg : 8,
                                    width : 20
                                }]
                            };
                        }else if(CMTCJX.productcode=='380-060'){    //PP
                            opt = {
                                data : data.response.data,
                                datamap : [{
                                    name : '装置生产线', //字段中文名，绘制table时会展示在表头
                                    value : 'factory', //后台的字段名
                                    tg : 1,
                                    width : 20
                                },{
                                    name : '装置编号',
                                    value : 'LineNumber',
                                    tg : 2,
                                    width : 20
                                },{
                                    name : '类型',
                                    value : 'recordType',
                                    tg : 2,
                                    width : 20
                                },{
                                    name : '状态',
                                    value : 'recordState' ,
                                    tg : 3,
                                    width : 20
                                },{
                                    name : '基准开工率',
                                    value : 'FiducialOperationRate',
                                    tg : 4,
                                    width : 20
                                },{
                                    name : '产能（万吨/年）',
                                    value : 'Capacity',
                                    tg : 5,
                                    width : 20
                                },{
                                    name : '影响本月产量（万吨）',
                                    value : 'ProductionImpact',
                                    tg : 6,
                                    width : 20
                                },{
                                    name : '开始时间',
                                    value : 'ExpectedStart',
                                    tg : 7,
                                    width : 20
                                },{
                                    name : '结束时间',
                                    value : 'ExpectedEnd',
                                    tg : 8,
                                    width : 20
                                }]
                            };
                        }else{
                            opt = {
                                data : data.response.data,
                                datamap : [{
                                    name : '装置生产线', //字段中文名，绘制table时会展示在表头
                                    value : 'factory', //后台的字段名
                                    tg : 1,
                                    width : 20
                                },{
                                    name : '类型',
                                    value : 'recordType',
                                    tg : 2,
                                    width : 20
                                },{
                                    name : '状态',
                                    value : 'recordState' ,
                                    tg : 3,
                                    width : 20
                                },{
                                    name : '基准开工率',
                                    value : 'FiducialOperationRate',
                                    tg : 4,
                                    width : 20
                                },{
                                    name : '产能（万吨/年）',
                                    value : 'Capacity',
                                    tg : 5,
                                    width : 20
                                },{
                                    name : '影响本月产量（万吨）',
                                    value : 'ProductionImpact',
                                    tg : 6,
                                    width : 20
                                },{
                                    name : '开始时间',
                                    value : 'ExpectedStart',
                                    tg : 7,
                                    width : 20
                                },{
                                    name : '结束时间',
                                    value : 'ExpectedEnd',
                                    tg : 8,
                                    width : 20
                                }]
                            };
                        }

	            	}else{
                        if(CMTCJX.productcode=='380-030'){   //PE
                            opt = {
                                data : data.response.data,
                                datamap : [{
                                    name : '扩建/关停日期', //字段中文名，绘制table时会展示在表头
                                    value : 'timeDate', //后台的字段名
                                    tg : 1,
                                    width : 20
                                },{
                                    name : '装置/生产线',
                                    value : 'factory',
                                    tg : 2,
                                    width : 20
                                },{
                                    name : '级别',
                                    value : 'Name' ,
                                    tg : 3,
                                    width : 20
                                },{
                                    name : '装置编号',
                                    value : 'LineNumber' ,
                                    tg : 3,
                                    width : 20
                                },{
                                    name : '类型',
                                    value : 'recordType' ,
                                    tg : 3,
                                    width : 20
                                },{
                                    name : '状态',
                                    value : 'recordState',
                                    tg : 4,
                                    width : 20
                                },{
                                    name : '产能（万吨/年）',
                                    value : 'Capacity',
                                    tg : 5,
                                    width : 20
                                },{
                                    name : '影响本月产量（万吨）',
                                    value : 'ProductionImpact',
                                    tg : 6,
                                    width : 20
                                }]
                            };
                        }else if(CMTCJX.productcode=='380-060'){    //PP
                            opt = {
                                data : data.response.data,
                                datamap : [{
                                    name : '扩建/关停日期', //字段中文名，绘制table时会展示在表头
                                    value : 'timeDate', //后台的字段名
                                    tg : 1,
                                    width : 20
                                },{
                                    name : '装置/生产线',
                                    value : 'factory',
                                    tg : 2,
                                    width : 20
                                },{
                                    name : '装置编号',
                                    value : 'LineNumber' ,
                                    tg : 3,
                                    width : 20
                                },{
                                    name : '类型',
                                    value : 'recordType' ,
                                    tg : 3,
                                    width : 20
                                },{
                                    name : '状态',
                                    value : 'recordState',
                                    tg : 4,
                                    width : 20
                                },{
                                    name : '产能（万吨/年）',
                                    value : 'Capacity',
                                    tg : 5,
                                    width : 20
                                },{
                                    name : '影响本月产量（万吨）',
                                    value : 'ProductionImpact',
                                    tg : 6,
                                    width : 20
                                }]
                            };
                        }else{
                            opt = {
                                data : data.response.data,
                                datamap : [{
                                    name : '扩建/关停日期', //字段中文名，绘制table时会展示在表头
                                    value : 'timeDate', //后台的字段名
                                    tg : 1,
                                    width : 20
                                },{
                                    name : '装置/生产线',
                                    value : 'factory',
                                    tg : 2,
                                    width : 20
                                },{
                                    name : '类型',
                                    value : 'recordType' ,
                                    tg : 3,
                                    width : 20
                                },{
                                    name : '状态',
                                    value : 'recordState',
                                    tg : 4,
                                    width : 20
                                },{
                                    name : '产能（万吨/年）',
                                    value : 'Capacity',
                                    tg : 5,
                                    width : 20
                                },{
                                    name : '影响本月产量（万吨）',
                                    value : 'ProductionImpact',
                                    tg : 6,
                                    width : 20
                                }]
                            };

                        }

	            	}

	            	CMTCJX.drawDtTable(opt,"tcjx_tb",l);
	            },
	            error:function(e){
                    if(e.responseText=='undefined'){
                        myCharts.showLoading({
                            text : '暂无数据',
                            textStyle :{fontSize : 20 ,color : '#404040'},
                            effectOption:{backgroundColor: '#fefefe'}
                        });
                    }
	            }
	        });
			this.initDom();
		},
		drawDtTable : function(option,tabid,l){
			var thead = "<thead><tr class='Capacity_tab_tr01'>";
			for(var i=0;i<option.datamap.length;i++){
				if(option.datamap[i].sorting){
					var oj;
					if(CMTCJX.order == ""){
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
					thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%" style="cursor:pointer;" onclick="CMTCJX.changeOrder(\''+option.datamap[i].value+'\')"><span>'+option.datamap[i].name+'</span><span class="ascending_box">'+sorthtml+'</span></th>';
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
						tbody += '<tr class="Capacity_tab_tr">';
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
                var content;
                if(l=='tcjx'){
                    content='无停车检修';
                }else if(l=='kjgt'){
                    content='无扩建/关停';
                }
                tbody +="<tr style='height:200px; left:100; width:200px; border: none;cursor: default'>" +
                    "<th colspan='8' style='text-align: center;font-size: 16px;cursor: default'>"+content+"</th>" +
                    "</tr>";
			}

			var html = thead;
			$("#"+tabid+"_h").empty();
			$("#"+tabid+"_h").append(thead);
			$("#"+tabid+"_b").empty();
			$("#"+tabid+"_b").append(tbody);


			for(var n=0;n<option.datamap.length;n++){
				if(option.datamap[n].hidden){
					var tgn = option.datamap[n].tg;
					$("th[tg='"+tgn+"']").hide();
				}
			}
		},
		/*
		 * 排序字段切换功能
		 */
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
			this.drawTa("tcjx","day");
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
			this.weidu = $("div.day_box > span:first",CMTCJX.modselector).attr("wd");
			$("div.day_box > span:first",CMTCJX.modselector).addClass('day_forecast');
//			this.drawProPic(this.liid,this.weidu);
			this.drawDom(this.liid,this.weidu, this.dtype);
            var tabName;
            if(this.liid=='tcjx'){tabName='停车检修';}
            else if(this.liid=='kjgt'){tabName='扩建关停';}
            ga('send','event',{
                'eventCategory':'企业分析tab点击',
                'eventAction':'停车检修/扩建关停-'+tabName
            })
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
			$("div.data_nav_box > li.china",CMTCJX.modselector).bind("click",function(){
		        $("li.china",$(this).parent()).removeClass("selected");
		        $(this).addClass("selected");
		    });
			
			$("div.data_nav_box > li.china > dl >dd",CMTCJX.modselector).bind("click",function(){
		        $("dd",$(this).parent().parent().parent()).removeClass("selected");
		        $(this).addClass("selected");
		    });

		    $("div.day_box > span",CMTCJX.modselector).bind("click",function(){
		        $("span",$(this).parent()).removeClass('day_forecast');
		        $(this).addClass('day_forecast');
		    });
		    
		},
		firstLoad : function(){
			this.liid = $("div.data_nav_box > li.china:first",CMTCJX.modselector).attr("id");
			this.dtype = $("div.data_nav_box > li.china:first",CMTCJX.modselector).attr("dtype");
			this.loadWdDom(this.liid);
			this.weidu = $("div.day_box > span:first",CMTCJX.modselector).attr("wd");
			
			$("li.china:first",CMTCJX.modselector).addClass("selected");
		    $("div.day_box > span:first",CMTCJX.modselector).addClass('day_forecast');	
			
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
					html += "<span wd=\""+arr[i]+"\" onclick=\"CMTCJX.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
				}else if(this.dtype=='dttb'){
					html += "<span wd=\""+arr[i]+"\" onclick=\"CMTCJX.changeTbWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
				}
			}
			$("div#"+this.modelid+" > div.day_box").html("");
			$("div#"+this.modelid+" > div.day_box").append(html);
		},
		showDetail : function(modcode){
			ls.setItem("companyid",this.companyid);
			ls.setItem("productcode",this.productcode);
            ga('send', 'event', {
                'eventCategory': '企业分析',
                'eventAction': "停车检修/扩建关停->查看详情"
            });
			window.location.href = "comdsdetail?pld="+this.liid+"_dt&pwd="+this.weidu+"&productCode="+this.productcode;
		}
	}
}();
$(function(){
	CMTCJX.init();
});