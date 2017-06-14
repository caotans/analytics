var upstreamLegend={}; //选中的图例
var upstreamCheckTime="";//选中的时间维度
//第一次加载页面
function firstLoad(code,time,type,tabId){
    var array=['day','week','month','quarter','year'];
    for(var i=0;i<array.length;i++){
        if(time==array[i]){
            restClass(time);
        }  else{
            $("#upstream"+array[i]).attr("class","china") ;
        }
    }

    $("li[id^='china_']").each(function(i,element){
        var id=$(element).attr("id");
        if("china_"+code==id){
            restClass2(code);
        } else{
            $("#"+id).attr("class","china");
        }
    });

    var defaultTabCode;
    var defaultTime;
    var defaultType;
    if(code){
         defaultTabCode=code;
    }else{
         defaultTabCode =$("#defaultTab").val();
          restClass2(defaultTabCode);
    }
    if(time){
        defaultTime=time;
    }else{
        defaultTime =$("#defaultTime").val();
        restClass(defaultTime);
    }
    upstreamCheckTime=defaultTime;
    if(type){
        defaultType=type;
    }else{
        defaultType =$("#defaultType").val();
    }
    var myChart_upstream = echarts.init(document.getElementById('tb_upstreamIndex'));
    myChart_upstream.clear();
    myChart_upstream.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
       effect: 'whirling'
    });
    //console.log(defaultTabCode+"==="+defaultTime+"==="+defaultType);
    $.ajax({
            type:"POST",
            dataType:"json",
            url:"findData?code="+defaultTabCode+"&time="+defaultTime+"&type="+defaultType+"&tabId="+tabId,
            success:function(data){
                //alert(data);
                if(data.type=="price"){
                    loadPrice(data,myChart_upstream);
                }else{
                    loadJinchukou(data,myChart_upstream);
                }

            },error:function(e){
                //alert("系统错误,请联系管理员！");
            }
        }
    );

    var upperpm=$("#upstreamTab .selected >a").text();
    var wd=$("#upstreamDiv .day_forecast >a").text();
    var tabName;
    var defaultType;
    if(type){
        defaultType=type;
    }else{
        defaultType =$("#defaultType").val();
    }
    if(defaultType=='price'){tabName='价格对比';}
    else if(defaultType=='jinchukou'){tabName='进出口';}
    ga('send','event',{
        'eventCategory':'维度选择',
        'eventAction':'上游('+upperpm+')-'+tabName+'-'+wd
    });
}
/**
 * 加载进出口图表
 * @param data
 */
function loadJinchukou(data,myChart_upstream){
    var mould_option=initOption2();
    mould_option.legend.data=['进口量','出口量','进口均价','出口均价'];
    var xData=[];
    var data1=[];
    var data2=[];
    var data3=[];
    var data4=[];
    var time;
    time=data.time;
    if(data.seriesData){
        for(var i=0;i<data.seriesData.length;i++){
            var timeDate=data.seriesData[i].timeDate;
            if((data.seriesData[i].importQty!=0&&data.seriesData[i].importQty!="")||(data.seriesData[i].exportQty!=0&&data.seriesData[i].exportQty!="")||(data.seriesData[i].importAmount!=0&&data.seriesData[i].importAmount!="")||(data.seriesData[i].exportAmount!=0&&data.seriesData[i].exportAmount!="")){
                if(time=="week"){

                }else if(time=="month"){
                    xData.push(data.seriesData[i].timeDate.substring(0,4)+"/"+data.seriesData[i].timeDate.substring(4));
                }else if(time=="year"){
                    xData.push(data.seriesData[i].timeDate);
                }
                if(data.seriesData[i].importQty!=0&&data.seriesData[i].importQty!=""){
                    data1.push(data.seriesData[i].importQty);
                }else{
                    data1.push('');
                }
                if(data.seriesData[i].exportQty!=0&&data.seriesData[i].exportQty!=""){
                    data2.push(data.seriesData[i].exportQty);
                }else{
                    data2.push('');
                }
                if(data.seriesData[i].importAmount!=0&&data.seriesData[i].importAmount!=""){
                    data3.push(data.seriesData[i].importAmount);
                }else{
                    data3.push('');
                }
                if(data.seriesData[i].exportAmount!=0&&data.seriesData[i].exportAmount!=""){
                    data4.push(data.seriesData[i].exportAmount);
                }else{
                    data4.push('');
                }

            }



        }
    }

    mould_option.series=[{
        name:"进口量",
        type:"bar",
        data:data1  ,
        barGap : 0
    } ,
        {
            name:"出口量",
            type:"bar",
            data:data2,
            barGap : 0
        },
        {
            name:"进口均价",
            type:"line",
            data:data3,
            yAxisIndex:1  ,
            xAxisIndex:0,
            symbolSize: 0|0
        },
        {
            name:"出口均价",
            type:"line",
            data:data4 ,
            yAxisIndex:1,
            xAxisIndex:0,
            symbolSize: 0|0
        }];
    if(!data.seriesData||data.seriesData.length==0){
        myChart_upstream.showLoading({
            text: '暂无数据',    //loading话术
            effect: 'bubble'
        });
        return false;
    }
    mould_option.xAxis[0].data=xData;
    mould_option.yAxis[0].scale=true;
    mould_option.yAxis[1].scale=true;
    mould_option.yAxis[0].name='万吨';
    mould_option.yAxis[1].name='美元/吨';

    if(upstreamLegend){
        mould_option.legend.selected=upstreamLegend;
    }
    myChart_upstream.hideLoading();
    myChart_upstream.setOption(mould_option,true);
    window.addEventListener("resize", function () {
        myChart_upstream.resize();
    });
    var ecConfig = echarts.config.EVENT;
    myChart_upstream.on(ecConfig.LEGEND_SELECTED,function(param){
        upstreamLegend=param.selected;
    });
}
/**
 * 加载价格图表
 * @param data
 */
function loadPrice(data,myChart_upstream){
    if(!data||data.length==0||!data.legendData||data.legendData.length==0||!data.seriesData||data.seriesData.length==0){
        myChart_upstream.showLoading({
            text: '暂无数据',    //loading话术
            effect: 'bubble'
        });
        return false;
    }
    var mould_option=initOption2();
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    var xData=[];
    xData=findTimeDate("timeDate","avgPrice",data.seriesData);
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].Name);
        var array=[];
        var tempData='-'; //用于补数据的前一条数据,接受第一条为空不补数据
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
            name:data.legendData[z].Name,
            type:"line",
            data:array ,
            symbolSize: 0|0
        };
        var object2={
            name:data.legendData[z].Name,
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
//    console.log(totalData);
    mould_option.legend.data=legendData;
    mould_option.series=totalData;
    mould_option.xAxis[0].data=xData;
    mould_option.yAxis[0].scale=true;
    mould_option.xAxis[0].boundaryGap=false;
    mould_option.yAxis[1].scale=true;
    mould_option.yAxis[0].name='元/吨';
    mould_option.yAxis[1].name='美元/吨';
    mould_option.yAxis[0].axisLabel.formatter=null;
    if(upstreamLegend){
        mould_option.legend.selected=upstreamLegend;
    }
    myChart_upstream.hideLoading();
    myChart_upstream.setOption(mould_option,true);
    window.addEventListener("resize", function () {
        myChart_upstream.resize();
    });
    var ecConfig = echarts.config.EVENT;
    myChart_upstream.on(ecConfig.LEGEND_SELECTED,function(param){
        upstreamLegend=param.selected;
        ga('send', 'event', {
            'eventCategory':'图例(Legend)点击',
            'eventAction': param['target']+'图例点击'
        });
    });

}
///**
// * 切换tab页
// * @param code
// */
//function changUpstreamTab(code){
//    //清空数组
//    upstreamLegend=null;
//    howManyTime('price');
//    $("#defaultType").val("price");
//    $("#defaultTab").val(code);
//     firstLoad(code);
//}

/**
 * 切换select
 * @param code
 */
function changUpstreamSelect(code,type,allType,allName,tabId){
    //清空数组
    upstreamLegend=null;
    howManyTime(allType,allName,tabId);
    $("#defaultTab").val(code);
    $("#defaultType").val(type);
    firstLoad(code,'',type,tabId);
    var upperpm=$("#upstreamTab .selected >a").text();
    var wd=$("#upstreamDiv .day_forecast >a").text();
    var tabName;
    var defaultType;
    if(type){
        defaultType=type;
    }else{
        defaultType =$("#defaultType").val();
    }
    if(defaultType=='price'){tabName='价格对比';}
    else if(defaultType=='jinchukou'){tabName='进出口';}
    ga('send','event',{
        'eventCategory':'tab点击',
        'eventAction':'上游('+upperpm+')-'+tabName+'-'+wd
    });
}

//选中年月日
function restClass(time){
        $("#upstream"+time).attr("class","day_forecast") ;
}

//选中tab页
function restClass2(code){
        $("#china_"+code).attr("class","china selected") ;
}

//判断每个tab是否有几个维度
function howManyTime(allType,allName,tabId){
    if(allType){
        var html="";
        var time=allType.split(",");
        $("#defaultTime").val(allType.split(",")[0]);
        for(var i=0;i<time.length;i++){
            var id="upstream"+time[i];
            var name=allName.split(",")[i];
            if(i==0){
                html+="<span id='"+id+"'class='day_forecast'><a onclick=\"firstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
            }else{
                html+="<span id='"+id+"'class='china'><a onclick=\"firstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
            }

        }
        $("#upstreamDiv").html(html);
    }
}

/**
 * 跳转到详情页面
 * @param code
 */
function jumpToUpstreamDetails(code,moduleId){
    ga('send', 'event', {
        'eventCategory': '历史数据点击',
        'eventAction': '上游历史详情'
    });
    var ls = window.localStorage;
    ls.setItem("upstreamDetailsLegend",JSON.stringify(upstreamLegend));
    window.location.href= "upstreamDetails?code="+code+"&upstreamDetailsTab="+$("#defaultTab").val()+"&upstreamDetailsType="+$("#defaultType").val()+"&upstreamCheckTime="+upstreamCheckTime+"&moduleId="+moduleId;
}
