var downstreamLegend={};
var downstreamSource=[];
var downstreamCheckTime="";
//判断每个tab是否有几个维度
function initTime(allType,allName,tabId){
    if(allType){
        var html="";
        var time=allType.split(",");
        $("#defaultDownstreamTime").val(allType.split(",")[0]);
        for(var i=0;i<time.length;i++){
            var id="downstream"+time[i];
            var  name= allName.split(",")[i];
            if(i==0){
                html+="<span id='"+id+"'class='day_forecast'><a onclick=\"initDownstreamLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
            }else{
                html+="<span id='"+id+"'class='china'><a onclick=\"initDownstreamLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
            }

        }
        $("#downstreamDiv").html(html);
    }
}

//第一次加载页面
function initDownstreamLoad(code,time,downstreamProductCode,tabId){
    var array=['day','week','month','quarter','year'];
    for(var i=0;i<array.length;i++){
        if(time==array[i]){
            checkClass(time);
        }  else{
            $("#downstream"+array[i]).attr("class","china") ;
        }
    }

    $("li[id^='downstreamLi_']").each(function(i,element){
        var id=$(element).attr("id");
        //alert(id+"===code==="+code);
        if("downstreamLi_"+code==id){
            checkClass2(code);
        } else{
            $("#"+id).attr("class","china");
        }
    });

    var defaultDownstreamTabCode;
    var defaultDownstreamTime;
    var showListDownstream;
    var defaultDownstreamProductCode;
    if(code){
        defaultDownstreamTabCode=code;
    }else{
        defaultDownstreamTabCode =$("#defaultDownstreamTab").val();
        checkClass2(defaultDownstreamTabCode);
    }

    if(time){
        defaultDownstreamTime=time;
    }else{
        defaultDownstreamTime =$("#defaultDownstreamTime").val();
        checkClass(defaultDownstreamTime);
    }
    downstreamCheckTime=defaultDownstreamTime;
    if(downstreamProductCode){
        defaultDownstreamProductCode=downstreamProductCode;
    }else{
        defaultDownstreamProductCode =$("#downstreamProductCode").val();
    }

    //console.log("code="+defaultDownstreamTabCode+",time="+defaultDownstreamTime);

    var myChart_downstream = echarts.init(document.getElementById('tb_downstreamIndex'));
    myChart_downstream.clear();
    myChart_downstream.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    $.ajax({
            type:"POST",
            dataType:"json",

            url:"findDownStreamData?code="+defaultDownstreamTabCode+"&time="+defaultDownstreamTime+"&productCode="+$("#productDownstreamCode").val()+"&showListDownstream="+$("#showListDownstream").val()+"&downstreamProductCode="+defaultDownstreamProductCode+"&tabId="+tabId,
            success:function(data){
                if(data.type=="price"){
                    loadDownstreamPrice(data,myChart_downstream);
                }else if(data.type=="capacityRate"){
                    loadDownstreamCapacityRate(data,myChart_downstream);
                } else if(data.type=="profits"){
                    if(data.showListDownstream=="open"){
                        loadDownstreamProfitsList(data,myChart_downstream,tabId,$("#downstreamModuleId").val());
                    } else if(data.showListDownstream=="close"){
                        loadDownstreamProfits(data,myChart_downstream);
                    }

                }

            }
        }
    );
    var tabName=$("#downstreamTab .selected >a").text();
    var wd=$("#downstreamDiv .day_forecast >a").text();
    ga('send','event',{
        'eventCategory':'维度选择',
        'eventAction':'下游'+tabName+'-'+wd
    })

}

//选中年月日
function checkClass(time){
    $("#downstream"+time).attr("class","day_forecast") ;
}
//选中tab页
function checkClass2(code){
    $("#downstreamLi_"+code).attr("class","china selected") ;
}

/**
 * 切换tab页
 * @param code
 */
function changDownstreamTab(code,allType,allName,tabId){
    //清空数组
    downstreamLegend=null;
    //重置排序效果
    $("#downstreamSortProfitsList").find(".descending41").attr("class","descending01");
    $("#downstreamSortProfitsList").find(".ascending42").attr("class","ascending01");
    initTime(allType,allName,tabId);
    $("#showListDownstream").val('open');
    $("#defaultDownstreamTab").val(code);
    if(code=="profits"){
        $("#showTableProfits").hide();
//        $("#downstreamDiv").empty();
    } else{
        $("#downstreamTable").html("");
        $("#showTableProfits").hide();
        $("#downstreamToChart").hide();
        $("#downstreamToTable").hide();
    }
     var tabName;
     var wd=$("#downstreamDiv>.day_forecast >a").text();
     if(code=='price'){tabName='价格';}
     if(code=='capacityRate'){tabName='开工率';}
     if(code=='profits'){tabName='利润';}
    ga('send','event',{
        'eventCategory':'tab点击',
        'eventAction':'下游'+tabName+'-'+wd
    })
    initDownstreamLoad(code,'','',tabId);
}



/**
 * 加载价格图表
 * @param data
 */
function loadDownstreamPrice(data,myChart_downstream){
    if(!data||data.length==0||!data.legendData||data.legendData.length==0||!data.seriesData||data.seriesData.length==0){
        myChart_downstream.showLoading({
            text: '暂无数据',    //loading话术
            effect: 'bubble'
        });
        return false;
    }
    var mould_option=initOption2();
    var xData=[];
    xData=findTimeDate("timeDate","avgPrice",data.seriesData);
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].DownstreamName);
        var array=[];
        var tempData="-"; //用于补数据的前一条数据,接受第一条为空不补数据
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
    mould_option.xAxis[0].data=xData;
    mould_option.legend.data=legendData;
    mould_option.series=totalData;
    mould_option.yAxis[0].scale=true;
    mould_option.xAxis[0].boundaryGap=false;
    mould_option.yAxis[1].scale=true;
    mould_option.yAxis[0].name='元/吨';
    mould_option.yAxis[1].name='美元/吨';
    if(downstreamLegend){
        mould_option.legend.selected=downstreamLegend;
    }
    myChart_downstream.hideLoading();
    myChart_downstream.setOption(mould_option,true);
    window.addEventListener("resize", function () {
        myChart_downstream.resize();
    });
    var ecConfig = echarts.config.EVENT;
    myChart_downstream.on(ecConfig.LEGEND_SELECTED,function(param){
        downstreamLegend=param.selected;
        ga('send', 'event', {
            'eventCategory':'图例(Legend)点击',
            'eventAction': '下游价格'+'-'+param['target']+'图例点击'
        });
    });
}

/**
 * 加载开工率图表
 * @param data
 */
function loadDownstreamCapacityRate(data,myChart_downstream){
    if(!data||data.length==0||!data.legendData||data.legendData.length==0||!data.seriesData||data.seriesData.length==0){
        myChart_downstream.showLoading({
            text: '暂无数据',    //loading话术
            effect: 'bubble'
        });
        return false;
    }
    var mould_option=initOption2();
    var xData=[];
    xData=findTimeDate("timeDate","OperatingRate",data.seriesData);
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].DownstreamName);
        var array=[];
        var tempData="-"; //用于补数据的前一条数据,接受第一条为空不补数据
        for(var i=0;i<xData.length;i++){
            if(data.seriesData[z]){
                var value="";
                for(var j=0;j<data.seriesData[z].length;j++){
                    if(data.seriesData[z][j].timeDate==xData[i]){
                        if(data.seriesData[z][j]&&data.seriesData[z][j].OperatingRate!="-"){
                            value= Math.round(data.seriesData[z][j].OperatingRate*100,0);
                            tempData=value;
                        }else{
                            value="";
                        }


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
    mould_option.tooltip.formatter=function(param){
        var ft = param[0]['name']+"<br>";
        for(var i=0;i<param.length;i++){
            ft += param[i].seriesName+":"+param[i].data+'%'+"<br>";
        }
        return ft;
    }
    if(downstreamLegend){
        mould_option.legend.selected=downstreamLegend;
    }
    myChart_downstream.hideLoading();
    myChart_downstream.setOption(mould_option,true);
    window.addEventListener("resize", function () {
        myChart_downstream.resize();
    });
    var ecConfig = echarts.config.EVENT;
    myChart_downstream.on(ecConfig.LEGEND_SELECTED,function(param){
        downstreamLegend=param.selected;
        ga('send', 'event', {
            'eventCategory':'图例(Legend)点击',
            'eventAction': '下游开工率'+'-'+param['target']+'图例点击'
        });
    });
}
/**
 * 利润图表
 * @param data
 */
function loadDownstreamProfits(data,myChart_downstream){
    if(!data||data.length==0||!data.legendData||data.legendData.length==0||!data.seriesData||data.seriesData.length==0){
        myChart_downstream.showLoading({
            text: '暂无数据',    //loading话术
            effect: 'bubble'
        });
        return false;
    }
    var mould_option=initOption2();
    //解析后台的数据
    var xData=[];
    xData=findTimeDate("timeDate","thisPrice",data.seriesData);
    var legendData=[];
    var totalData=[];
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].DownstreamName);
        if(data.legendData[z].DownstreamProductCode==data.downstreamProductCode){
            downstreamLegend[data.legendData[z].DownstreamName]=true;
        }else if(data.downstreamProductCode=="showAll"){
            // console.log(downstreamLegend);
        }else{
            downstreamLegend[data.legendData[z].DownstreamName]=false;
        }
        var array=[];
        var tempData="-"; //用于补数据的前一条数据,接受第一条为空不补数据
        for(var i=0;i<xData.length;i++){
            if(data.seriesData[z]){
                var value="";
                for(var j=0;j<data.seriesData[z].length;j++){
                    if(data.seriesData[z][j].timeDate==xData[i]){
                        value= data.seriesData[z][j].thisPrice;
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
    if(downstreamLegend){
        mould_option.legend.selected=downstreamLegend;
    }
    mould_option.legend.data=legendData;
    mould_option.tooltip.formatter=function(params,ticket,callback){
        var res = '当月盈亏情况: <br/>' + params[0].name;
        for (var i = 0, l = params.length; i < l; i++) {
            res += '<br/>' + params[i].seriesName + ' : ' + params[i].value;
        }
        return res;
    } ;
    mould_option.xAxis[0].data=xData;
    mould_option.xAxis[0].boundaryGap=false;
    mould_option.series=totalData;
    mould_option.yAxis[0].scale=true;
    mould_option.yAxis[0].name='元/吨';
    mould_option.yAxis[0].axisLabel.formatter=null;
    myChart_downstream.hideLoading();
    myChart_downstream.setOption(mould_option,true);
    window.addEventListener("resize", function () {
        myChart_downstream.resize();
    });
    var ecConfig = echarts.config.EVENT;
    myChart_downstream.on(ecConfig.LEGEND_SELECTED,function(param){
        downstreamLegend=param.selected;
        ga('send', 'event', {
            'eventCategory':'图例(Legend)点击',
            'eventAction': '下游利润'+'-'+param['target']+'图例点击'
        });
    });
}
/**
 * 返回利润列表数据
 */
function loadDownstreamProfitsList(data,myChart_downstream,tabId,downstreamModuleId){
    $.ajax({
            type:"POST",
            async:false,
            url:"findDownStreamProfitsList?productCode="+data.productCode+"&code="+data.type+"&tabId="+tabId+"&downstreamModuleId="+downstreamModuleId+"&downstreamCheckTime="+downstreamCheckTime,
            success:function(result){
                $("#downstreamTable").html(result);
                var html1="<span id='downstreammonth' class='day_forecast'><a onclick=\"changDownstreamTab('"+data.type+"','"+$("#downstreamProfitsListAllType").val()+"','"+$("#downstreamProfitsListAllName").val()+"','"+tabId+"');\">月</a></span>";
                $("#downstreamDiv").html(html1);
                $("#showTableProfits").show();
                $("#downstreamToChart").show();
                $("#downstreamToTable").hide();
                // $("#tb_downstreamIndex").height(300);
                myChart_downstream.hideLoading();
            },error:function(e){
                //alert("系统错误,请联系管理员！");
            }
        }
    );
}
/**
 * 利润列表点击切换图表
 */
function checkProfitsList(code,downstreamProductCode,allType,allName,tabId){
    initTime(allType,allName,tabId);
    $("#showListDownstream").val('close');
    $("#downstreamToTable").show();
    $("#downstreamToChart").hide();
    $("#downstreamProductCode").val(downstreamProductCode);
    $("#tb_downstreamIndex").empty();
    if(code=="profits"){
        $("#showTableProfits").hide();
    }else{
        $("#showTableProfits").show();
    }
    //$("#tb_downstreamIndex").height(260); //高度不够就会图例出不来
    initDownstreamLoad(code,'',downstreamProductCode,tabId);
}
/**
 * 跳转到下游详情页
 */
function jumpToDownstreamDetails(productCode,moduleId){
    var tabName=$("#downstreamTab .selected >a").text();
    ga('send', 'event', {
        'eventCategory': '历史数据点击',
        'eventAction': '下游'+tabName+'历史详情'
    });
    var ls = window.localStorage;
    ls.setItem("downstreamDetailsLegend",JSON.stringify(downstreamLegend));
    window.location.href="downstreamDetails?productCode="+productCode+"&downstreamDetailsTab="+$("#defaultDownstreamTab").val()+"&downstreamDetailsProductCode="+$("#downstreamProductCode").val()+"&downstreamDetailsCheckTime="+downstreamCheckTime+"&moduleId="+moduleId;
}
/**
 * 切换为图
 */
function downstreamToChart(allType,allName,tabId){
    var code= $("#defaultDownstreamTab").val();
    var productDownstreamCode= $("#productDownstreamCode").val();
    checkProfitsList(code,"showAll",allType,allName,tabId);//给个不为空的值查询所有
    var tabName;
    var wd=$("#downstreamDiv>.day_forecast >a").text();
    if(code=='price'){tabName='价格';}
    if(code=='capacityRate'){tabName='开工率';}
    if(code=='profits'){tabName='利润';}
    ga('send','event',{
        'eventCategory':'图表切换',
        'eventAction':'下游'+tabName+'-'+wd
    })
}
/**
 * 异步展示利润列表信息
 * @param downstreamProfitsListCode
 */
function loadProfitsList(downstreamProfitsListCode,listData,allType,allName,tabId,downstreamModuleId,time){
    downstreamSource=[];
    downstreamCheckTime=time;
    var html="";
    for(var i=0;i<listData.length;i++){
        if(i%2==0){
            html+="<tr style='cursor: pointer;' class='tb_content' onclick=\"checkProfitsList('"+downstreamProfitsListCode+"','"+listData[i].downstreamProductCode+"','"+allType+"','"+allName+"','"+tabId+"','"+downstreamModuleId+"')\">";
        }else{
            html+="<tr  style='cursor: pointer;' onclick=\"checkProfitsList('"+downstreamProfitsListCode+"','"+listData[i].downstreamProductCode+"','"+allType+"','"+allName+"','"+tabId+"','"+downstreamModuleId+"')\">";
        }
        html+="<th style='width:20%;'><span>"+listData[i].timeDate+"</span></th> ";
        html+="<th style='width:20%;'><span>"+listData[i].name+"</span></th> ";
//        html+="<th style='width:20%;'><span>"+listData[i].avgPrice+"</span></th>";
        if(listData[i].thisPrice.toString().indexOf("-")!=-1){
            html+="<th style='width:20%;'><span style='color:#00c533;'>"+listData[i].thisPrice+"</span></th>";
        } else if(listData[i].thisPrice==0){
            html+="<th style='width:20%;'><span>"+listData[i].thisPrice+"</span></th>";
        }else{
            html+="<th style='width:20%;'><span style='color:#ff0000;'>"+listData[i].thisPrice+"</span></th>";
        }
        if(listData[i].lastPrice.toString().indexOf("-")!=-1){
            html+="<th style='width:20%;'><span style='color:#00c533;'>"+listData[i].lastPrice+"</span></th>";
        } else if(listData[i].lastPrice==0){
            html+="<th style='width:20%;'><span >"+listData[i].lastPrice+"</span></th>";
        }  else{
            html+="<th style='width:20%;'><span style='color:#ff0000;'>"+listData[i].lastPrice+"</span></th>";
        }

        html+="</tr> ";
    }
    downstreamSource=listData;
    $("#downstreamProfitsListTable").html(html);
}

function downstreamProfitsListSort(obj,field,array,allType,allName,tabId,downstreamModuleId){
    var order=commonSort2(obj);
    var downstreamProfitsListCode=$("#downstreamProfitsListCode").val();
    $("#downstreamProfitsListTable").html("");
    downstreamSource= sortArray(array,field,order);
    loadProfitsList(downstreamProfitsListCode,downstreamSource,allType,allName,tabId,downstreamModuleId);
    var tabName;
    var wd=$("#downstreamDiv>.day_forecast >a").text();
    ga('send','event',{
        'eventCategory':'排序点击',
        'eventAction':'下游利润'+'-'+wd+'-表格排序'
    })
}