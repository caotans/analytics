var dataSource = [];

CSDDT = function(){
	var mdoption = initOption();
	var ls = window.localStorage;
	var myCharts;
    var DownloadElse;
	return {
		init : function(){
			this.liid;
			this.idxid;
			this.weidu;
			this.selected;
			this.option = SD_MOD.cnclkgl_option;
			this.filter = "";
			this.order = "";
			this.pindex = 1;
			this.psize = 10;
			this.pagetool;
			
			this.companyid;
			this.productcode;

			
			if(ls.getItem("companyid")){
				this.companyid = ls.getItem("companyid");
			}
			if(ls.getItem("productcode")){
				this.productcode = ls.getItem("productcode");
			}
			
			this.curDate;
			this.lyDate;
			
			DatePicker('#searchstart','#searchend');
			
			if(ls.getItem("cmsdsel")){
				this.selected = $.parseJSON(ls.getItem("cmsdsel"));
			}

			
//			$("li.details_nav:first").trigger('click');
			myCharts = drawPic("dt_picdom");
			this.firstLoad();
            this.option.tooltip.formatter= function(param){
                var ft = param[0].name+"<br>";
                for(var i=0;i<param.length;i++){
                    if(param[i].seriesName=="开工率"&&typeof param[i].data=="number"){
                        ft += param[i].seriesName+":"+Math.round(param[i].data*100)+"%";


                    }else if(param[i].seriesName=="开工率"&&typeof param[i].data=="object"){
                        ft += param[i].seriesName+":"+param[i].data.value+"%";
                    }else if(typeof param[i].data=="object"){
                        ft += param[i].seriesName+":"+toFixNum(param[i].data.value)+"<br>";
                    }else if(typeof param[i].data=="number"){
//                                    if(toFixNum(param[i].data).indexOf(',')>0){
//                                        ft += param[i].seriesName+":"+toFixNum(param[i].data).replace()+"<br>";
//                                    }
//				    				else {ft += param[i].seriesName+":"+param[i].data+"<br>";}
                        ft += param[i].seriesName+":"+param[i].data+"<br>";
                    }else{
                        if(param[i].data.indexOf(".")>0) {
                            ft += param[i].seriesName+":"+param[i].data.substring(0,param[i].data.indexOf("."))+"%"+"<br>";
                        }
                        else{
                            ft += param[i].seriesName+":"+param[i].data+"<br>";
                        }
                    }
                }
                return ft;
            }
            this.option.yAxis=[
                {
                    type : 'value',
                    name:'万吨' ,
//                    scale:true,        //自适应
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
//                    scale:true,
                    splitNumber:2,   //y轴刻度分段默认为 5
                    axisLabel:{
                        formatter:function(param){
                            var rate;
                            rate=param*100;
                            if(rate.toString().indexOf(".")!=-1){
                                rate=rate.toString().substring(0,rate.toString().indexOf('.')) +'%'
                            }
                            else{rate=rate+'%';}
                            return rate;
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
            ]
		},
		changeLi : function(liid,OtherDownload){
            CSDDT.DownloadElse=OtherDownload;
			this.liid = liid;
			this.idxid = $("li#"+this.liid+".details_nav").attr("idxid");
			this.loadWdDom(this.liid);
			$("li.details_nav").removeClass("selected");
			$("li#"+this.liid+".details_nav").addClass("selected");
			CSDDT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序
			$("div.big_wd > span:first").trigger("click");
            this.drawProPic(this.idxid,this.weidu);
            var wd=$(".big_wd .wd_r>a").text();
            ga('send','event',{
                'eventCategory':'tab点击',
                'eventAction':'产能产量开工率-'+wd
            })
		},
		changeWd : function(weidu){
			this.weidu = weidu;
			$("div.big_wd > span").removeClass("wd_r");
			$("div.big_wd > span[wd='"+this.weidu+"']").addClass("wd_r");
			this.drawProPic(this.idxid,this.weidu);
            var wd=$(".big_wd .wd_r>a").text();
            ga('send','event',{
                'eventCategory':'维度选择',
                'eventAction':'产能产量开工率-'+wd
            })
		},
		showLoad : function(){
			myCharts.clear();
			myCharts.showLoading({
		    	text: '正在努力的读取数据中...',    //loading话术
		    	effect: 'whirling'
		    });
		},
		search : function(){
			this.drawProPic(this.idxid, this.weidu);
            var wd=$(".big_wd .wd_r>a").text();
            ga('send','event',{
                'eventCategory':'搜索点击',
                'eventAction':'产能产量开工率-'+wd+'度数据搜索'
            })
		},
		drawProPic : function(l,w){
			var pd = this.picdom;
			var ksrq = $("#searchstart").val();
			var jsrq = $("#searchend").val();
            //掐头去尾
//            if(w!='year'){
                var returnTime= getTimeDate(ksrq,jsrq,w);
                if(returnTime&&returnTime.status!="error"){
                    ksrq=returnTime.status;
                    jsrq=returnTime.info;
                }else if(returnTime&&returnTime.status=="error"){
                    alert(returnTime.info);
                    return false;

                }
//            }
            this.showLoad();
			var aj = $.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"getCMSDDTData?wd="+w+"&companyid="+CSDDT.companyid+"&productcode="+CSDDT.productcode
	            		+"&ksrq="+ksrq+"&jsrq="+jsrq,
	            timeout : 10000, //超时时间设置，单位毫秒
	            success:function(data){
	            	myCharts.hideLoading();
	            	var myoption;
	            	if(l=="cnclkgl"){
                        data=getPermissionByTime(CSDDT.DownloadElse,data,"Date","/",w);
	            		myoption = CSDDT.option;
	            		myoption.legend.selected = CSDDT.selected;
	            		myoption.xAxis[0].data = getObjData(data,'Date');
		            	myoption.series[0].data = getObjData(data,'Capacity');
		            	myoption.series[1].data = getObjData(data,'Production');
		            	myoption.series[2].data = getObjData(data,'OperatingRate');
                        myoption.toolbox.feature.savemsg.onclick=function(){
                            exportEchatsImg(myCharts,"企业分析产能产量开工率",myoption);
                        }  ;
                        myoption.toolbox.feature.myTool.onclick=function(){
                            if(CSDDT.DownloadElse==1){
                                alert("您尚未开通下载Excel权限!");
                                return;
                            }else {
                            var ds = CSDDT.getDataSource();
                            var xname = CSDDT.getXSource();
                            var array=ds;
                            var sheetName=["企业分析产能产量开工率"];
                            var titleName=[xname];
                            $("#titleName").val(JSON.stringify(titleName));
                            $("#fileName").val(JSON.stringify(sheetName));
                            $("#sheetName").val(JSON.stringify(sheetName));
                            $("#excelArray").val(JSON.stringify([array]));
                            $('#hyExport').submit() ;
                            }
                        }  ;

	            	}
	            	myCharts.setOption(myoption);
	            	myCharts.setOption({toolbox:{show:true}});
	            	CSDDT.drawTable(l,w,1,true);
	            	var x = Math.ceil(myoption.series[0].data.length/CSDDT.psize);
	            	CSDDT.initPagination(l,w,"cmsddt_pg",x);
	            },
	            error:function(xhr,e){
	                console.log(xhr,e)
	            }
	        });
		},
		drawTable : function(l,w,pindex,isPaging){
        	var opt = {};
        	if(l=="cnclkgl"){
            	opt = {
	            		data : CSDDT.getTableData(pindex),
	            		datamap : [{
	            			name : '日期', //字段中文名，绘制table时会展示在表头
	            			value : w=='week'?'WeekDay':w=='month'?'YM':'YEAR', //后台的字段名
	            			width : 20 , //字段所占百分比宽度
	            			hidden : false ,//hidden为true时必须设置tg属性
	            			tg : 0 ,//字段标识，不得重复
	            			sorting : true
	            		},{
	            			name : '产能',
	            			value : 'Capacity',
	            			width : 20 ,
	            			tg : 1 ,
	            			sorting : true
	            		},{
	            			name : '产量',
	            			value : 'Production',
	            			width : 20 ,
	            			tg : 2 ,
	            			sorting : true
	            		},{
	            			name : '开工率',
	            			value : 'OperatingRate',
	            			width : 20 ,
	            			tg : 3 ,
	            			sorting : true ,
	            			render : function(data){
//	            				return '<th tg=3>'+(Math.floor(data*100 *100)/100)+'%</th>';
                                if(typeof data=="number"){
                                    return '<th tg=3>'+(Math.round(data*100))+'%</th>';
                                }else{
                                    if(data.indexOf('.')==-1){
                                        return '<th tg=3>'+data+'</th>'
                                    }
                                    else{
                                        return '<th tg=3>'+data.substring(0,data.indexOf('.'))+'%'+'</th>';
                                    }

                                }
	            			}
	            		}]
	            	};

        	}
        	CSDDT.drawDtTable(opt,"cmsddt");
        	
        	myCharts.on(echarts.config.EVENT.LEGEND_SELECTED,function(e){
        		var farr = [];
				CSDDT.selected = e.selected;
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
				$("th","#cmsddt").removeClass("tableDisable");
				for(var x=0;x<farr.length;x++){
					$("th[tg="+farr[x]+"]","#cmsddt").addClass("tableDisable");
				}
//                this.drawProPic(this.idxid,this.weidu);
                var wd=$(".big_wd .wd_r>a").text();
                ga('send','event',{
                    'eventCategory':'图例(Legend)点击',
                    'eventAction':'产能产量开工率-'+wd+'-'+e['target']+'图例点击'
                })
			});
        	
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
            var wd=$(".big_wd .wd_r>a").text();
            ga('send','event',{
                'eventCategory':'排序点击',
                'eventAction':'产能产量开工率-'+wd
            })
			//重新绘制表格，跳转至第一页
			this.drawTable("cnclkgl","week",1,false);
			//分页控件跳转至第一页
			$('#cmsddt_pg').jqPaginator('option', {
			    currentPage: 1
			});
		},
		drawDtTable : function(option,tabid){
			var thead = "<thead><tr class='enterprise_bt'>";
			for(var i=0;i<option.datamap.length;i++){
				if(option.datamap[i].sorting){
					var oj;
					if(CSDDT.order == ""){
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
					thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%" style="cursor:pointer;" onclick="CSDDT.changeOrder('+i+')"><span>'+option.datamap[i].name+'</span><span class="ascending_box">'+sorthtml+'</span></th>';
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
			var sel = CSDDT.selected;
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
				$("th[tg="+farr[x]+"]","#cmsddt").addClass("tableDisable");
			}
		},
		/*
		 * 初始化分页插件
		 */
		initPagination : function(l,w,id,pTotal){
		    if(pTotal>0){
		    	CSDDT.pagetool = $("#"+id).jqPaginator({
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
		    	    		CSDDT.drawTable(l,w,num,false);
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
				}else if(arr[i]=="year"){
					name = "年";
				}
				html += "<span wd=\""+arr[i]+"\" onclick=\"CSDDT.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
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
				this.lyDate=getSomeYear(3);
			}
			
			$("#searchstart").datepicker('setDate', this.lyDate);
			$("#searchend").datepicker('setDate', this.curDate);
//			$("#searchend").datepicker('setEndDate', this.curDate);
			
			CSDDT.order = "{\"0\":1}";
			
			$("div.big_wd > span[wd='"+this.weidu+"']").trigger('click');
		},
		backToIdx : function(){
			$("div.content_box").show();
			$("div.dt_box").hide();
		},
		resize : function(){
			myCharts.resize();
		},
		getDataSource : function(){
			var opt = myCharts.getOption();
			var arr = [];
            if(opt.series==undefined){
                return arr;
            }
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
			var dataSrc = CSDDT.getDataSource();
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
	CSDDT.init();
});
window.addEventListener("resize", function () {
	CSDDT.resize();
});
function exportExcel(){
	var ds = CSDDT.getDataSource();
	var xname = CSDDT.getXSource();
    var array=ds;
    var sheetName=["供需详情"];
    var titleName=[xname];
    $("#titleName").val(JSON.stringify(titleName));
    $("#fileName").val(JSON.stringify(sheetName));
    $("#sheetName").val(JSON.stringify(sheetName));
    $("#excelArray").val(JSON.stringify([array]));
    $('#hyExport').submit() ;
}