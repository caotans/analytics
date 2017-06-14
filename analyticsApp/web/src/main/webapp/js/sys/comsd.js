CMSD = function(){
	var mdoption = initOption();
	var myCharts;
	
	return {
		init : function(){
            this.option = SD_MOD.cnclkgl_option;
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
//                    scale:true,
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
//            boundaryGap : [0.1,0],

//            scale:true,    //y轴自适应
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
            ];
			this.liid;
			this.weidu;
			this.dtype;
			this.modelid = "comsd";
			this.modselector = $("div#"+this.modelid);
			this.picdom = "tb_comsd";
			this.selected=CMSD.option.legend.selected;
			this.companyid = $("#companyid").val();
			this.productcode = $("#productcode").val();
			myCharts = drawPic(this.picdom);
			
			myCharts.on(echarts.config.EVENT.LEGEND_SELECTED,function(e){
				CMSD.selected = e.selected;
                var wd=$("#comsd .day_forecast>a").text();
                var comname=$(".enterprise_h").text();
                ga('send','event',{
                    'eventCategory':'图例(Legend)点击',
                    'eventAction':comname+'-产能产量开工率-'+wd+'-'+e['target']+'-图例点击'
                })
			});

			this.firstLoad();
//			this.drawProPic("week");
		},
		showLoad : function(){
			myCharts.clear();
			myCharts.showLoading({
		    	text: '正在努力的读取数据中...',    //loading话术
		    	effect: 'whirling'
		    });
		},
		drawProPic : function(w){
            var ksrq;
            var jsrq;
            if(w=="day"){
                jsrq=getNowDate();
                ksrq=getSomeDate(30);
            }else if(w=="week"){
                jsrq=getNowDate();
                ksrq=getSomeDate(56);
            }else if(w=="month"){
                jsrq=getNowDate();
                ksrq=getSomeYear(1);
            }else if(w=="year"){
                jsrq=getNowDate();
                ksrq=getSomeYear(3);
            }
            //将日期全局替换掉/
            ksrq=ksrq.replace(/\//g, '-');
            jsrq=jsrq.replace(/\//g, '-');
            //掐头去尾
//            if(w!='year'){
                var returnTime= getTimeDate(ksrq,jsrq,w);
                if(returnTime&&returnTime.status!="error"){
                    ksrq=returnTime.status;
                    jsrq=returnTime.info;
                }
//            }
			var pd = this.picdom;
			this.showLoad();
			var aj = $.ajax({
	            type:"POST",
	            dataType:"json",
//	            url:"getICSDData?wd="+w+"&companyid="+CMSD.companyid+"&productcode="+CMSD.productcode,
//                url:"getCMSDDTData?wd="+w+"&companyid="+CMSD.companyid+"&productcode="+CMSD.productcode
//                    +"&ksrq="+encodeURI("'"+ksrq+"'")+"&jsrq="+encodeURI("'"+jsrq+"'"),
                url:"getCMSDDTData?wd="+w+"&companyid="+CMSD.companyid+"&productcode="+CMSD.productcode
                    +"&ksrq="+ksrq+"&jsrq="+jsrq,
	            timeout : 10000, //超时时间设置，单位毫秒
	            success:function(data){
//                    console.log(data)
	            	if(data!=null){
	            		myCharts.hideLoading();
		            	var myoption;
		            	myoption = CMSD.option;
		            	myoption.legend.selected = CMSD.selected;
		            	myoption.xAxis[0].data = getObjData(data,'Date');
			            myoption.series[0].data = getObjData(data,'Capacity');
			            myoption.series[1].data = getObjData(data,'Production');
			            myoption.series[2].data = getObjData(data,'OperatingRate');
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
		},
		firstLoad : function(){
			var wdstr = $("#weidu_comsd").val();
			this.loadWdDom(wdstr);
			this.initDom();

			
			$("div.day_box > span:first",CMSD.modselector).trigger('click');
		},
		initDom : function(){
			$("div.day_box > span",CMSD.modselector).bind("click",function(){
		        $("span",$(this).parent()).removeClass('day_forecast');
		        $(this).addClass('day_forecast');
		    });
		    
		},
		changeWd : function(wd){
			this.weidu = wd;
			this.drawProPic(wd);
            var wd=$("#comsd .day_forecast>a").text();
            var comname=$(".enterprise_h").text();
            ga('send','event',{
                'eventCategory':'维度选择',
                'eventAction':comname+'-产能产量开工率-'+wd
            })
		},
		loadWdDom : function(wdstr){
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
				html += "<span wd=\""+arr[i]+"\" onclick=\"CMSD.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
			}
			$("div#"+this.modelid+" > div.day_box").html("");
			$("div#"+this.modelid+" > div.day_box").append(html);
		},
		showDetail : function(){
			var ls = window.localStorage;
			ls.setItem("cmsdsel",JSON.stringify(this.selected));   //将图例的选中信息保存到localStorage中
			ls.setItem("companyid",this.companyid);
			ls.setItem("productcode",this.productcode);
            var wd=$("#comsd .day_forecast>a").text();
            var comname=$(".enterprise_h").text();
            ga('send','event',{
                'eventCategory':'历史数据点击',
                'eventAction':comname+'-产能产量开工率-'+wd+'-历史数据查看'
            })
			window.location.href = "comsddetail?type=cnclkgl&li=cnclkgl_dt&pwd="+this.weidu+"&productCode="+this.productcode;
		},
		resize : function(){
			if($(myCharts.dom).is(':visible')){
				myCharts.resize();
			}
		}
	}
}();

$(function(){
	CMSD.init();
});
window.addEventListener("resize", function () {
	CMSD.resize();
});