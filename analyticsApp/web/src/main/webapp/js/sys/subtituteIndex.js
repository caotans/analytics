var subtituteLegend={};
var subtituteCheckTime="";//选中的时间维度
//判断每个tab是否有几个维度
function subtituteInitTime(allType,allName,tabId){
    if(allType){
        var html="";
        var time=allType.split(",");
        $("#defaultSubtituteTime").val(allType.split(",")[0]);
        for(var i=0;i<time.length;i++){
            var id="subtitute"+time[i];
            var name=allName.split(",")[i];
            if(i==0){
                html+="<span id='"+id+"'class='day_forecast'><a onclick=\"initSubtituteLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
            }else{
                html+="<span id='"+id+"'class='china'><a onclick=\"initSubtituteLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
            }

        }
        $("#subtituteDiv").html(html);
    }

}

//第一次加载页面
function initSubtituteLoad(code,time,subtituteProductCode,tabId){
    var array=['day','week','month','quarter','year'];
    for(var i=0;i<array.length;i++){
        if(time==array[i]){
            subtituteClass(time);
        }  else{
            $("#subtitute"+array[i]).attr("class","china") ;
        }
    }

    $("li[id^='subtituteLi_']").each(function(i,element){
        var id=$(element).attr("id");
        //alert(id+"===code==="+code);
        if("subtituteLi_"+code==id){
            subtituteClass2(code);
        } else{
            $("#"+id).attr("class","china");
        }
    });

    var defaultSubtituteTabCode;
    var defaultSubtituteTime;
    var showListSubtitute;
    var defaultSubtituteProductCode;
    if(code){
        defaultSubtituteTabCode=code;
    }else{
        defaultSubtituteTabCode =$("#defaultSubtituteTab").val();
        subtituteClass2(defaultSubtituteTabCode);
    }

    if(time){
        defaultSubtituteTime=time;
    }else{
        defaultSubtituteTime =$("#defaultSubtituteTime").val();
        subtituteClass(defaultSubtituteTime);
    }
    subtituteCheckTime=defaultSubtituteTime;
    if(subtituteProductCode){
        defaultSubtituteProductCode=subtituteProductCode;
    }else{
        defaultSubtituteProductCode =$("#subtituteProductCode").val();

    }
    var myChart_subtitute = echarts.init(document.getElementById('tb_subtituteIndex'));
    myChart_subtitute.clear();
    myChart_subtitute.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    $.ajax({
            type:"POST",
            dataType:"json",

            url:"findSubtituteData?code="+defaultSubtituteTabCode+"&time="+defaultSubtituteTime+"&productCode="+$("#productSubtituteCode").val()+"&showListSubtitute="+$("#showListSubtitute").val()+"&subtituteProductCode="+defaultSubtituteProductCode+"&tabId="+tabId,
            success:function(data){
                if(!data||data.length==0||!data.legendData||data.legendData.length==0||!data.seriesData||data.seriesData.length==0){
                    myChart_subtitute.showLoading({
                        text: '暂无数据',    //loading话术
                        effect: 'bubble'
                    });
                    return false;
                }
                if(data.type=="price"){
                    loadSubtitutePrice(data,myChart_subtitute);
                }else if(data.type=="capacityRate"){
                    loadSubtituteCapacityRate(data,myChart_subtitute);
                } else if(data.type=="profits"){
                    if(data.showListSubtitute=="open"){
                        loadSubtituteProfitsList(data,myChart_subtitute);
                    } else if(data.showListSubtitute=="close"){
                        loadSubtituteProfits(data,myChart_subtitute);
                    }

                }

            }
        }
    );
}

//选中年月日
function subtituteClass(time){
    $("#subtitute"+time).attr("class","day_forecast") ;
}
//选中tab页
function subtituteClass2(code){
    $("#subtituteLi_"+code).attr("class","china selected") ;
}

/**
 * 切换tab页
 * @param code
 */
function changSubtituteTab(code){
    //清空数组
    subtituteLegend=null;
    subtituteInitTime(code);
    $("#defaultSubtituteTab").val(code);
    $("#showListSubtitute").val('close');
    initSubtituteLoad(code);
}



/**
 * 加载价格图表
 * @param data
 */
function loadSubtitutePrice(data,myChart_subtitute){
    var mould_option=initOption2();
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    var xData=[];
    xData=findTimeDate("timeDate","avgPrice",data.seriesData);
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].DownstreamName);
        var array=[];
        var tempData="-";
        for(var i=0;i<xData.length;i++){
            if(data.seriesData[z]){
                var value="";
                for(var j=0;j<data.seriesData[z].length;j++){
                    if(data.seriesData[z][j].timeDate==xData[i]){
                        value= data.seriesData[z][j].avgPrice;
                        tempData=value;
                    }
                }
                if(value==""||value==undefined){
                    array.push(tempData);
                }else{
                    array.push(value);
                }
            }
        }


        var object={
            name:data.legendData[z].DownstreamName,
            type:"line",
            data:array ,
            symbolSize: 0|0
        };
        var object2={
            name:data.legendData[z].DownstreamName,
            type:"line",
            data:array ,
            symbolSize: 0|0,
            yAxisIndex:1
        };

        if(data.legendData[z].Currency=="1"){//人民币
            totalData.push(object);
        }else{ //2美元
            totalData.push(object2);
        }

    }
//    console.log(legendData);
//    console.log( mould_option.xAxis[0].data);
//    console.log(totalData);
    mould_option.xAxis[0].data=xData;
    mould_option.xAxis[0].boundaryGap=false;
    mould_option.legend.data=legendData;
    mould_option.series=totalData;
    mould_option.yAxis[0].scale=true;
    mould_option.yAxis[1].scale=true;
    mould_option.yAxis[0].name='元/吨';
    mould_option.yAxis[1].name='美元/吨';
    mould_option.yAxis[0].axisLabel.formatter=null;
    if(subtituteLegend){
        mould_option.legend.selected=subtituteLegend;
    }
    myChart_subtitute.hideLoading();
    myChart_subtitute.setOption(mould_option,true);
    window.addEventListener("resize", function () {
        myChart_subtitute.resize();
    });
    var ecConfig = echarts.config.EVENT;
    myChart_subtitute.on(ecConfig.LEGEND_SELECTED,function(param){
        subtituteLegend=param.selected;
    });
}

/**
 * 加载开工率图表
 * @param data
 */
function loadSubtituteCapacityRate(data,myChart_subtitute){
    var mould_option=initOption2();
    var xData=[];
    xData=findTimeDate("timeDate","OperatingRate",data.seriesData);
    var tempData;
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].DownstreamName);
        var array=[];
        for(var i=0;i<xData.length;i++){
            if(data.seriesData[z]){
                var value=0;
                for(var j=0;j<data.seriesData[z].length;j++){
                    if(data.seriesData[z][j].timeDate==xData[i]){
                        value= Math.round(data.seriesData[z][j].OperatingRate*100,0);
                        tempData=value;
                    }
                }
                if(value==0){
                    array.push(tempData);
                }else{
                    array.push(value);
                }
            }
        }
        var object={
            name:data.legendData[z].DownstreamName,
            type:"line",
            data:array ,
            symbolSize: 0|0
        };
        totalData.push(object);
    }
//    console.log(legendData);
//    console.log(xData);
//    console.log(totalData);
    mould_option.legend.data=legendData;
    mould_option.xAxis[0].data=xData;
    mould_option.xAxis[0].boundaryGap=false;
    mould_option.series=totalData;
    mould_option.yAxis[0].scale=true;
    mould_option.yAxis[0].axisLabel.formatter="{value}%";
    mould_option.legend.selected=null;
    mould_option.yAxis[0].name='开工率';
    myChart_subtitute.hideLoading();
    myChart_subtitute.setOption(mould_option,true);
    window.addEventListener("resize", function () {
        myChart_subtitute.resize();
    });

}
/**
 * 利润图表
 * @param data
 */
function loadSubtituteProfits(data,myChart_subtitute){
    var mould_option=initOption2();
    //解析后台的数据
    var xData=[];
    xData=findTimeDate("timeDate","avgPrice",data.seriesData);
    var tempData;
    var legendData=[];
    var legendDataSelect={};
    var totalData=[];
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].DownstreamName);
        if(data.legendData[z].DownstreamProductCode==data.downstreamProductCode){
            legendDataSelect[data.legendData[z].DownstreamName]=true;
        }else{
            legendDataSelect[data.legendData[z].DownstreamName]=false;
        }
        var array=[];
        for(var i=0;i<xData.length;i++){
            if(data.seriesData[z]){
                var value=0;
                for(var j=0;j<data.seriesData[z].length;j++){
                    if(data.seriesData[z][j].timeDate==xData[i]){
                        value= data.seriesData[z][j].avgPrice;
                        tempData=value;
                    }
                }
                if(value==0){
                    array.push(tempData);
                }else{
                    array.push(value);
                }
            }
        }
        var object={
            name:data.legendData[z].DownstreamName,
            data:array ,
            type:'line',
            smooth:true,
            symbolSize: 0|0,
            itemStyle: {normal: {areaStyle: {type: 'default'}}}

        };
        totalData.push(object);
    }
//    console.log(legendData);
//    console.log( xData);
//    console.log(totalData);
    mould_option.legend.selected=legendDataSelect;
    mould_option.legend.data=legendData;
    mould_option.xAxis[0].data=xData;
    mould_option.xAxis[0].boundaryGap=false;
    mould_option.series=totalData;
    mould_option.yAxis[0].scale=true;
    mould_option.yAxis[0].name='元/吨';
    mould_option.yAxis[0].axisLabel.formatter=null;
    myChart_subtitute.hideLoading();
    myChart_subtitute.setOption(mould_option,true);
    window.addEventListener("resize", function () {
        myChart_subtitute.resize();
    });

}
/**
 * 返回利润列表数据
 */
function loadSubtituteProfitsList(data,myChart_subtitute){

    $.ajax({
            type:"POST",
            url:"findSubtituteProfitsList?productCode="+data.productCode+"&code="+data.type,
            success:function(data){
                $("#subtituteDiv").html("");
                $("#tb_subtituteIndex").html(data);
                //$("#tb_subtituteIndex").height(300);
                myChart_subtitute.hideLoading();
            },error:function(e){
                //alert("系统错误,请联系管理员！");
            }
        }
    );
}
/**
 * 利润列表点击切换图表
 */
function checkSubtituteList(code,subtituteProductCode){
    subtituteInitTime(code);
    $("#showListSubtitute").val('close');
    $("#subtituteProductCode").val(subtituteProductCode);
    $("#tb_subtituteIndex").html("");
    initSubtituteLoad(code,'week',subtituteProductCode);
}
/**
 * 跳转到下游详情页
 */
function jumpToSubtituteDetails(productCode,moduleSubtituteId){
    var ls = window.localStorage;
    ls.setItem("subtituteDetailsLegend",JSON.stringify(subtituteLegend));
    window.location.href="subtituteDetails?productCode="+productCode+"&subtituteDetailsTab="+$("#defaultSubtituteTab").val()+"&subtituteDetailsProductCode="+$("#subtituteProductCode").val()+"&substituteDetailsCheckTime="+subtituteCheckTime+"&moduleId="+moduleSubtituteId
}

