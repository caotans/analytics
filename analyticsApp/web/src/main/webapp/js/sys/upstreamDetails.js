/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 16-11-28
 * Time: 下午3:41
 * To change this template use File | Settings | File Templates.
 */
var dataSource=[];//表格的所有数据
var xh=[];//竖排表格取消选中的列数
var titleArray=[];//列表表头
var upstreamDetailsLegend={};
var DownloadInfo;
/**
 * 判断有几个时间维度
 */
function upstreamDetailsHowManyTime(allType,allName,tabId){
    if(allType){
        var html="";
        var time=allType.split(",");
        var upstreamDetailsTime=$("#upstreamDetailsTime").val();
        $("#upstreamDetailsTime").val(upstreamDetailsTime);
        var  upstreamDetailsCalendarStart= $('#upstreamDetailsCalendarStart').val();
        var   upstreamDetailsCalendarEnd=  $('#upstreamDetailsCalendarEnd').val();
        for(var i=0;i<time.length;i++){
            var id="upstreamDetails"+time[i];
            var name=allName.split(",")[i];
            if(upstreamDetailsTime&&!upstreamDetailsCalendarStart&&!upstreamDetailsCalendarEnd){
                if(upstreamDetailsTime==time[i]){
                    switch (time[i]) {
                        case "day":
                            $('#upstreamDetailsCalendarStart').datepicker('setDate', getSomeDate(30));
                            $('#upstreamDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "week":
                            $('#upstreamDetailsCalendarStart').datepicker('setDate', getSomeDate(60));
                            $('#upstreamDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "month":
                            $('#upstreamDetailsCalendarStart').datepicker('setDate', getSomeYear(1));
                            $('#upstreamDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "quarter":
                            $('#upstreamDetailsCalendarStart').datepicker('setDate', getSomeDate(90));
                            $('#upstreamDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "year":
                            $('#upstreamDetailsCalendarStart').datepicker('setDate', getSomeYear(4));
                            $('#upstreamDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                    }
                    html+="<span id='"+id+"'class='wd_r'><a onclick=\"upstreamDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                } else{
                    html+="<span id='"+id+"' ><a onclick=\"upstreamDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                }
            }else{
                if(i==0){
                    html+="<span id='"+id+"'class='wd_r'><a onclick=\"upstreamDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                }else{
                    html+="<span id='"+id+"' ><a onclick=\"upstreamDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                }
            }

        }
        $("#upstreamDetailsDiv").html(html);
    }

}

function upstreamDetailsFirstLoad(code,time,type,tabId){
    var array=['day','week','month','quarter','year'];
    for(var i=0;i<array.length;i++){
        if(time==array[i]){
            upstreamDetailsClass(time);
        }  else{
            $("#upstreamDetails"+array[i]).attr("class","") ;
        }
    }

    $("li[id^='upstreamDetails_']").each(function(i,element){
        var id=$(element).attr("id");
        if("upstreamDetails_"+code==id){
            upstreamDetailsClass2(code);
        } else{
            $("#"+id).attr("class","details_nav11");
        }
    });

    var defaultTabCode;
    var defaultTime;
    var defaultType;
    var defaultCalendarStart=$("#upstreamDetailsCalendarStart").val(); //默认开始时候
    var defaultCalendarEnd=$("#upstreamDetailsCalendarEnd").val();//默认结束时间
    //掐头去尾
   var returnTime= getTimeDate(defaultCalendarStart,defaultCalendarEnd,time);
    if(returnTime&&returnTime.status!="error"){
            defaultCalendarStart=returnTime.status;
            defaultCalendarEnd=returnTime.info;
    }else if(returnTime&&returnTime.status=="error"){
            alert(returnTime.info);
            return false;

    }
    if(code){
        defaultTabCode=code;
    }else{
        defaultTabCode =$("#upstreamDetailsTab").val();
        upstreamDetailsClass2(defaultTabCode);
    }
    if(time){
        defaultTime=time;
    }else{
        defaultTime =$("#upstreamDetailsTime").val();
        upstreamDetailsClass(defaultTime);
    }
    if(type){
        defaultType=type;
    }else{
        defaultType =$("#upstreamDetailsType").val();
    }
    //alert("code=="+defaultTabCode+"defaultTime=="+time+"==type=="+defaultType+"===calendarstart==="+defaultCalendarStart+"==calendarend=="+defaultCalendarEnd);

    var myChart_downstream = echarts.init(document.getElementById('upstreamDetailsEcharts'));
    myChart_downstream.clear();
    myChart_downstream.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    clearPagination('upstreamDetailsTable'); //清除表格和分页
    $.ajax({
            type:"POST",
            dataType:"json",

            url:"upstreamFindData?code="+defaultTabCode+"&time="+defaultTime+"&type="+defaultType+"&calendarStart="+defaultCalendarStart+"&calendarEnd="+defaultCalendarEnd+"&tabId="+tabId,
            success:function(data){
                if(data.type=="price"){
                    if(data.seriesData.length!=0){
                        data.seriesData=getPermissionByTime2(DownloadInfo,data.seriesData,"timeDate","-",defaultTime);
                    }else{
                         data=[];
                        myChart_downstream.showLoading({
                            text: '暂无数据',    //loading话术
                            effect: 'bubble'
                        });
                        return;
                    }
                    upstreamDetailsLoadPrice(data,myChart_downstream);
                  //  initPagination('upstreamDetailsTable',dataSource.length);
                }else{
                    if(data.seriesData.length!=0){
                        data.seriesData=getPermissionByTime3(DownloadInfo,data.seriesData,"timeDate",defaultTime);
                    } else{
                        data=[];
                        myChart_downstream.showLoading({
                            text: '暂无数据',    //loading话术
                            effect: 'bubble'
                        });
                        return;
                    }
                    upstreamDetailsLoadJinchukou(data,myChart_downstream);
                    titleArray=["时间"];
                    Array.prototype.push.apply(titleArray,myChart_downstream.getOption().legend.data);
                    //计算是否首页有选中的,有的话算出xh
                    if(upstreamDetailsLegend){
                        var i=1; //时间是第一列所以这里应该是1开始
                        xh=[];
                        for(var x in upstreamDetailsLegend){
                           if(upstreamDetailsLegend[x]==false){
                               xh.push(i);
                           }
                           i++;
                        }
                        initPagination2(titleArray,'upstreamDetailsTable',dataSource.length,xh,"desc=0");
                    } else{
                        initPagination2(titleArray,'upstreamDetailsTable',dataSource.length,"","desc=0");
                    }

                }


            },error:function(e){
                //alert("系统错误,请联系管理员！");
            }
        }
    );

    var tabName;
    var upperpm=$(".details_nav_selected >a").text();
    var wd=$("#upstreamDetailsDiv .wd_r >a").text();
    if(type=='price'){tabName='价格对比';}
    else if(type=='jinchukou'){tabName='进出口';}
    else{tabName='价格对比';}
    ga('send','event',{
        'eventCategory':'维度选择',
        'eventAction':'上游详情('+upperpm+')-'+tabName+'-'+wd
    });

}

//选中年月日
function upstreamDetailsClass(time){
    $("#upstreamDetails"+time).attr("class","wd_r") ;
}
//选中tab页
function upstreamDetailsClass2(code){
    $("#upstreamDetails_"+code).attr("class","details_nav11 details_nav_selected") ;
}

/**
 * 切换select
 * @param code
 */
function changUpstreamDetailsSelect(code,type,allType,allName,tabId,PriceDownload,OtherDownload){
    if(PriceDownload&&OtherDownload){
        if(downLoadType['upstream_module'][type]==true){//价格数据
            DownloadInfo=PriceDownload;
        }else{//非价格数据
            DownloadInfo=OtherDownload;
        }
    }

    //选中不同的tab页，查询的时候要获取动态不同的tabId
    $("#upstreamDetailsSearchDom").attr("onclick","upstreamDetailsSearch('"+tabId+"')");
    upstreamDetailsLegend=null;
    $("#upstreamDetailsTime").val(allType.split(",")[0]); //切换tab的时候把另一个时间维度设置第一个
    upstreamDetailsHowManyTime(allType,allName,tabId);
    $("#upstreamDetailsTab").val(code);
    $("#upstreamDetailsType").val(type);
    upstreamDetailsFirstLoad(code,'',type,tabId);
    var tabName;
    var upperpm=$(".details_nav_selected >a").text();
    var wd=$("#upstreamDetailsDiv .wd_r >a").text();
    if(type=='price'){tabName='价格对比';}
    if(type=='jinchukou'){tabName='进出口';}
    ga('send','event',{
        'eventCategory':'tab点击',
        'eventAction':'上游详情('+upperpm+')-'+tabName+'-'+wd
    });
}

/**
 * 切换tab页
 * @param code
 */
function changUpstreamDetailsTab(code){
    upstreamDetailsHowManyTime('price');
    $("#pstreamDetailsType").val("price");
    $("#upstreamDetailsTab").val(code);
    upstreamDetailsFirstLoad(code);
}
/**
 * 加载进出口图表
 * @param data
 */
function upstreamDetailsLoadJinchukou(data,myChart_downstream){
    if(!data||data.length==0||!data.time){
        myChart_downstream.showLoading({
            text: '暂无数据',    //loading话术
            effect: 'bubble'
        });
        return false;
    }
    var mould_option=initOption3();
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
                    xData.push(data.seriesData[i].timeDate);
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
        myChart_downstream.showLoading({
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
    if(upstreamDetailsLegend){
        mould_option.legend.selected=upstreamDetailsLegend;
    }
    myChart_downstream.hideLoading();
    window.onresize = myChart_downstream.resize;
    mould_option.toolbox.feature.myTool.onclick=function(){
        var array=[dataSource];
        var titleName=[["时间","进口量(万吨)","出口量(万吨)","进口均价","出口均价"]];
        var sheetName=["进出口"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        if(DownloadInfo==1){
            alert("您尚未开通下载Excel权限!");
            return;
        }else {
            $("#excelArray").val(JSON.stringify(array));
            $('#upstreamDetailsExport').submit() ;

        }
    }  ;
    mould_option.toolbox.feature.savemsg.onclick=function(){
        exportEchatsImg(myChart_downstream,"上游进出口",mould_option);
        ga('send', 'event', {
            'eventCategory': 'click点击',
            'eventAction': '上游进出口详情下载图片'
        });
    }  ;
    myChart_downstream.setOption(mould_option,true);
    bandLegendClick(myChart_downstream,mould_option,2,data.seriesData);
    arrayToJson2(mould_option,data.seriesData,upstreamDetailsLegend);
}
/**
 * 加载价格图表
 * @param data
 */
function upstreamDetailsLoadPrice(data,myChart_downstream){
    if(!data||data.length==0||!data.legendData||data.legendData.length==0||!data.seriesData||data.seriesData.length==0){
        myChart_downstream.showLoading({
            text: '暂无数据',    //loading话术
            effect: 'bubble'
        });
        return false;
    }
    var mould_option=initOption3();
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    var xData=[];
    xData=findTimeDate("timeDate","avgPrice",data.seriesData);
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].Name);
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
    mould_option.xAxis[0].data=xData;
    mould_option.legend.data=legendData;
    mould_option.series=totalData;
    mould_option.yAxis[0].scale=true;
    mould_option.xAxis[0].boundaryGap=false;
    mould_option.yAxis[1].scale=true;
    mould_option.yAxis[0].name='元/吨';
    mould_option.yAxis[1].name='美元/吨';
    mould_option.yAxis[0].axisLabel.formatter=null;
    //console.log(upstreamDetailsLegend);
    if(upstreamDetailsLegend){
        mould_option.legend.selected=upstreamDetailsLegend;
    }
    myChart_downstream.hideLoading();
    window.onresize = myChart_downstream.resize;
    mould_option.toolbox.feature.myTool.onclick=function(){
        var array=[dataSource];
        var titleName=[["日期","类型","均值",'单位']];
        var sheetName=["价格对比"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        if(DownloadInfo==1){
            alert("您尚未开通下载Excel权限!");
            return;
        }else {
            $("#excelArray").val(JSON.stringify(array));
            $('#upstreamDetailsExport').submit() ;

        }
        ga('send', 'event', {
            'eventCategory': 'click点击',
            'eventAction': '上游价格详情导出Excel'
        });
    }  ;
    mould_option.toolbox.feature.savemsg.onclick=function(){
        exportEchatsImg(myChart_downstream,"上游价格",mould_option);
        ga('send', 'event', {
            'eventCategory': 'click点击',
            'eventAction': '上游价格详情下载图片'
        });
    }  ;
    myChart_downstream.setOption(mould_option,true);

    bandLegendClick(myChart_downstream,mould_option,1,data.seriesData);
    arrayToJson1(mould_option,data.seriesData,upstreamDetailsLegend);//将数据源转成表格所需要的数据源
    var content=' <th width="20%"  style="cursor: pointer" onclick=\'upstreamDetailsSort(this,0,dataSource)\'><span  style="cursor: pointer">日期</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')" class="ascending32"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span></th>' +
        ' <th width="15%"  style="cursor: pointer" onclick=\'upstreamDetailsSort(this,1,dataSource)\'><span  style="cursor: pointer">类型</span> <span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span></th>' +
//        '<th width="15%"  style="cursor: pointer" onclick=\'upstreamDetailsSort(this,2,dataSource)\'><span  style="cursor: pointer">低</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
//        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>' +
//        '<th width="15%"  style="cursor: pointer" onclick=\'upstreamDetailsSort(this,3,dataSource)\'><span  style="cursor: pointer">高</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
//        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>' +
        '<th width="15%"  style="cursor: pointer" onclick=\'upstreamDetailsSort(this,2,dataSource)\'><span  style="cursor: pointer">均值</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>'+
        '<th width="15%"  style="cursor: pointer" onclick=\'upstreamDetailsSort(this,3,dataSource)\'><span  style="cursor: pointer">单位</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')" class="descending"></a></span> </th>';
  //  $("#upstreamDetailsTable").html(content);
}
/**
 * 搜索按钮
 */
function upstreamDetailsSearch(tabId,oldTabId){
    if(!tabId){
        tabId=oldTabId;
    }
           //判断当前是哪个时间维度
    $("span[id^='upstreamDetails']").each(function(i,element){
        var id=$(element).attr("id");
        var time=$(element).attr("class");
        if(time=="wd_r"){
            if("upstreamDetailsday"==id){
                upstreamDetailsFirstLoad('','day','',tabId);
            }
             if("upstreamDetailsweek"==id){
                 upstreamDetailsFirstLoad('','week','',tabId);
             }
            if("upstreamDetailsmonth"==id){
                upstreamDetailsFirstLoad('','month','',tabId);
            }

            if("upstreamDetailsquarter"==id){
                upstreamDetailsFirstLoad('','quarter','',tabId);
            }
            if("upstreamDetailsyear"==id){
                upstreamDetailsFirstLoad('','year','',tabId);
            }
        }
    });
    var upperpm=$(".details_nav_selected >a").text();
    var wd=$("#upstreamDetailsDiv .wd_r >a").text();
    ga('send','event',{
        'eventCategory':'搜索点击',
        'eventAction':'上游详情('+upperpm+')-'+wd
    });
}

/**
 * 将数组转成json格式--价格
 * @param array
 */
function arrayToJson1(mould_option,seriesData,names){
    dataSource=[];
    if(jQuery.isEmptyObject(names)){
        for(var i=0;i<mould_option.series.length;i++){
            for(var j=0;j<mould_option.series[i].data.length;j++){
                if(seriesData[i][j]){
                    //随机函数
                        dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].avgPrice,seriesData[i][j].unit]);

                }


            }
        }
    } else{
        if(names){
            $.each(names,function(name,value) {
                if(value==true){
                    for(var i=0;i<mould_option.series.length;i++){
                        if(name==mould_option.series[i].name){
                            for(var j=0;j<mould_option.series[i].data.length;j++){
                                if(seriesData[i][j]){
                                    dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].avgPrice,seriesData[i][j].unit]);
                                }





                            }
                        }

                    }
                }
            });
        }

    }

    dataSource= sortArray(dataSource,0,'desc');
}
/**
 * 将数组转成json格式--进出口
 * @param array
 */
function arrayToJson2(mould_option,seriesData,names){
    dataSource=[];
    if(jQuery.isEmptyObject(names)){
        for(var i=0;i<seriesData.length;i++){
            if(seriesData[i]){
                dataSource.push([seriesData[i].timeDate,seriesData[i].importQty,seriesData[i].exportQty,seriesData[i].importAmount,seriesData[i].exportAmount]);
            }

        }
    } else {
        for(var i=0;i<seriesData.length;i++){
            if(seriesData[i]){
                dataSource.push([seriesData[i].timeDate,seriesData[i].importQty,seriesData[i].exportQty,seriesData[i].importAmount,seriesData[i].exportAmount]);
            }

        }
        xh=[];
        var i=0;
        var increment=1;//前面有个时间列
        $.each(names,function(name,value) {
            if(!value){
                xh.push(i+1);
            }
            i++;
        });
    }

    dataSource= sortArray(dataSource,'timeDate','desc');
}

function bandLegendClick(myChart_downstream,mould_option,type,seriesData){
    var ecConfig = echarts.config.EVENT;
    myChart_downstream.on(ecConfig.LEGEND_SELECTED,function(param){
        upstreamDetailsLegend=param.selected;
           if(type==2){
               clickRefreshTable2(param.selected,mould_option,param.target,type,seriesData);
           }else{
             //  clickRefreshTable(param.selected,mould_option,param.target,type,seriesData);
           }
        var upperpm=$(".details_nav_selected >a").text();
        var wd=$("#upstreamDetailsDiv .wd_r >a").text();
        ga('send', 'event',{
            'eventCategory':'图例(Legend)点击',
            'eventAction': upperpm+'-'+wd+'-图例(Legend)'+param['target']
        });
    });
}


/**
 * 点击图例或者取消图例刷新表格数据
 */
function clickRefreshTable(names,mould_option,target,type,seriesData){
    dataSource=[];
    var first=[];
    $("#upstreamDetailsTable").nextAll().remove();
    $.each(names,function(name,value) {
        if(value==true){
            for(var i=0;i<mould_option.series.length;i++){
                if(name==mould_option.series[i].name){
                          for(var j=0;j<mould_option.series[i].data.length;j++){
                               if(seriesData[i][j]){
                                   dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].avgPrice,seriesData[i][j].unit]);
                               }
                          }
                }

            }
        }
    });
    Array.prototype.unshift.apply(dataSource,first);
    dataSource= sortArray(dataSource,0,'desc');
    clearPaginationNoFields('upstreamDetailsTable'); //清除表格和分页
    initPagination('upstreamDetailsTable',dataSource.length);

}

/**
 * 点击图例或者取消图例刷新表格数据
 */
function clickRefreshTable2(names,mould_option,target,type,seriesData){
    var temp=getSortOrder3("upstreamDetailsTable");
    xh=[];
    var i=0;
    var increment=1;//前面有个时间列
    $.each(names,function(name,value) {
             if(!value){
                xh.push(i+1);
             }
        i++;
    });
    $("#upstreamDetailsTable").nextAll().remove();
    clearPaginationNoFields('upstreamDetailsTable'); //清除表格和分页
    initPagination2(titleArray,'upstreamDetailsTable',dataSource.length,xh,temp);
}

/**
 * 对数据源进行排序
 * @param array
 * @param field
 * @param order
 */
function upstreamDetailsSort(obj,field,array){

    var order=getSortOrder(obj);
     dataSource= sortArray(array,field,order);
    clearPaginationNoFields('upstreamDetailsTable'); //清除表格和分页
    initPagination('upstreamDetailsTable',dataSource.length);
    commonSort(obj);
}


/**
 * 对竖排数据源进行排序
 * @param array
 * @param field
 * @param order
 */
function upstreamDetailsSort2(obj,field,array){
    var order=getSortOrder2(obj);
    dataSource= sortArray(array,field,order);
    clearPaginationNoFields('upstreamDetailsTable'); //清除表格和分页
    initPagination2(titleArray,'upstreamDetailsTable',dataSource.length,xh,order+"="+field);
    var upperpm=$(".details_nav_selected >a").text();
    var wd=$("#upstreamDetailsDiv .wd_r >a").text();
    ga('send','event',{
        'eventCategory':'排序点击',
        'eventAction':'上游详情('+upperpm+')-进出口-'+wd+'-排序'
    });
}


