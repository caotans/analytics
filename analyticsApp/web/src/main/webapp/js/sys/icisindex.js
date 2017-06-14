ICISIDX = function(){
	var mdoption = initOption();
	var  hg_option = {
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
            data:['综合指数'],
            y:"85%",
            selected:{
            	'综合指数':true
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
                name:' ' ,
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

            }

        ],
        series : [
            {
                name:"综合指数",
                zlevel : 1,
                type:"line",
                smooth:false,
                data:[0],
                symbolSize: 0|0,
	            clickable:false
            }
        ]
    };
		var  ny_option = {
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
		            data:['三地原油变化率'],
		            y:"85%",
		            selected:{
		            	'三地原油变化率':true
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
		                name:' ' ,
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

		            }
		        ],
		        series : [
		            {
		                name:"三地原油变化率",
		                zlevel : 0,
		                type:"line",
		                smooth:false,
		                data:[0],
		                symbolSize: 0|0,
			            clickable:false
		            }
		        ]
		    };
		
	var myCharts = drawPic("tb_icsidx");
	
	
	return {
		init : function(){
			this.liid;
			this.weidu;
			this.dtype;
			this.modelid = "icisidx";
			this.modselector = $("div#"+this.modelid);
			this.picdom = "tb_icsidx";
			this.selected;
			this.ny_option = ny_option;
			this.hg_option = hg_option;
            myCharts.on(echarts.config.EVENT.LEGEND_SELECTED,function(e){
				ICISIDX.selected = e.selected;
                var tabName=$("#icisidx .selected>a").text();
                var wd=$("#icisidx .day_forecast").text();
                ga('send','event',{
                    'eventCategory':'图例(Legend)点击',
                    'eventAction':'安迅思指数-'+tabName+'-'+wd+'-'+e['target']+'-图例点击'
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
				ICISIDX.drawProPic(l,w);
			}else if(t=="dttb"){
				ICISIDX.drawTa(l,w);
			}
		},
		drawProPic : function(l,w){
			var pd = this.picdom;
			$("div#"+pd,ICISIDX.modselector).show();
        	$("div.grd",ICISIDX.modselector).hide();
			this.showLoad();
			var aj = $.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"geticsidxdata?li="+l+"&wd="+w+"&ssid="+$("#icsidx_ssid").val(),
	            timeout : 10000, //超时时间设置，单位毫秒
	            success:function(data){
	            	myCharts.hideLoading();
	            	var myoption;
	            	if(l=="hgzs"){
	            		myoption = hg_option;
	            		myoption.legend.selected = ICISIDX.selected;
	            		myoption.xAxis[0].data = getObjData(data,'IndexDate');
		            	//myoption.series[0].data = getObjData(data,'xs_value');
		            	//myoption.series[1].data = getObjData(data,'yj_value');
		            	myoption.series[0].data = getObjData(data,'zh_value');
	            	}else if(l=="nyzs"){
	            		myoption = ny_option;
	            		myoption.legend.selected = ICISIDX.selected;
	            		myoption.xAxis[0].data = getObjData(data,'IndexDate');
		            	myoption.series[0].data = getObjData(data,'cgyq_value');
		            	//myoption.series[1].data = getObjData(data,'cyxx_value');
		            	//myoption.series[2].data = getObjData(data,'yzxs_value');
	            	}
	            	myCharts.setOption(myoption);
	            },
	            error:function(xhr,e){
	                console.log(xhr,e);
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
		drawTa : function(l,w){
			this.showLoad();
			var pd = this.picdom;
			$.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"geticsidxdata?li="+l+"&ssid="+$("#icsidx_ssid").val(),
	            success:function(data){
	            	myCharts.hideLoading();
	            	$("div#"+pd,ICISIDX.modselector).hide();
	            	$("div.grd",ICISIDX.modselector).show();
	            	//以下加载表格数据
	            	var oTable = $("table.jqdt",ICISIDX.modselector).dataTable({
	        			"paging" : false,
	        			"lengthChange" : false,
	        			"searching" : false,
	        			"ordering" : false,
	        			"info" : false,
	        			"autoWidth" : false,
	        			"retrieve": true,
	        			"data" : data,
	        			"columns": [
	        			    { "data": "PubDate" },
	        			    { "data": "LX" },
	        			    { "data": "CJ" },
	        			    { "data": "BH" },
	        			    { "data": "DW" }
	        			]
	        		});
	            	oTable.$('tr').click( function () {
	            		var data = oTable.fnGetData( this );
	            		ICISIDX.showTabPic(ICISIDX.liid,ICISIDX.weidu,data.LX);
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
					"进口VS国内" : false,
					"进口VS美国" : false,
					"进口VS韩国" : false
			};
			selected[t] = true;
			this.drawProPic(l, w);
			this.selected = selected;
		},
		changeLi : function(dom){
			this.liid = dom;
//			this.dtype = tp;
			this.dtype = 'ecpic';
			this.loadWdDom(this.liid);
			this.weidu = $("div.day_box > span:first",ICISIDX.modselector).attr("wd");
			$("div.day_box > span:first",ICISIDX.modselector).addClass('day_forecast');
//			this.drawProPic(this.liid,this.weidu);
			this.drawDom(this.liid,this.weidu, this.dtype);
            var tabName;
            var wd;
            if(this.liid=='hgzs'){tabName='化工指数';}
            else if(this.liid=='nyzs'){tabName='能源指数';}
            if(this.weidu=='week'){wd='周'}
            else if(this.weidu=='month'){wd='月'}
            else if(this.weidu=='year'){wd='年'}
            else {wd='其他'}
            ga('send','event',{
                'eventCategory':'tab点击',
                'eventAction':'安迅思指数-'+tabName+'-'+wd
            })
		},
		changeWd : function(wd){
			this.weidu = wd;
//			this.drawProPic(this.liid,this.weidu);
			this.drawDom(this.liid,this.weidu, this.dtype);
            var tabName;
            var wd;
            if(this.liid=='hgzs'){tabName='化工指数';}
            else if(this.liid=='nyzs'){tabName='能源指数';}
            if(this.weidu=='week'){wd='周'}
            else if(this.weidu=='month'){wd='月'}
            else if(this.weidu=='year'){wd='年'}
            else {wd='其他'}
            ga('send','event',{
                'eventCategory':'维度选择',
                'eventAction':'安迅思指数-'+tabName+'-'+wd
            })
		},
		changeTbWd : function(wd){
			this.weidu = wd;
			this.drawProPic(this.liid, this.weidu);
		},
		initDom : function(){
			$("div.data_nav_box > li.china",ICISIDX.modselector).bind("click",function(){
		        $("li.china",$(this).parent()).removeClass("selected");
		        $(this).addClass("selected");
		    });

		    $("div.day_box > span",ICISIDX.modselector).bind("click",function(){
		        $("span",$(this).parent()).removeClass('day_forecast');
		        $(this).addClass('day_forecast');
		    });
		    
		},
		firstLoad : function(){
			this.liid = $("div.data_nav_box > li.china:first",ICISIDX.modselector).attr("id");
			this.dtype = $("div.data_nav_box > li.china:first",ICISIDX.modselector).attr("dtype");
			this.loadWdDom(this.liid);
			this.weidu = $("div.day_box > span:first",ICISIDX.modselector).attr("wd");
			this.initDom();
			
//			$("li.china:first",ICISIDX.modselector).addClass("selected");
//		    $("div.day_box > span:first",ICISIDX.modselector).addClass('day_forecast');	
			
//			this.drawProPic(this.liid,this.weidu);
//		    this.drawDom(this.liid,this.weidu, this.dtype);
		    $("div.data_nav_box > li.china:first",ICISIDX.modselector).trigger('click');
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
					html += "<span wd=\""+arr[i]+"\" onclick=\"ICISIDX.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
				}else if(this.dtype=='dttb'){
					html += "<span wd=\""+arr[i]+"\" onclick=\"ICISIDX.changeTbWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
				}
			}
			$("div#"+this.modelid+" > div.day_box").html("");
			$("div#"+this.modelid+" > div.day_box").append(html);
		},
		resize : function(){
//			if($(myCharts.dom).is(':visible')){
				myCharts.resize();
//			}
		}
	}
}();
$(function(){
	ICISIDX.init();
});
window.addEventListener("resize", function () {
	ICISIDX.resize();
});