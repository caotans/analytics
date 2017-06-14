var dataSource=[];//表格的所有数据
var subtituteDetailsLegend={};
/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 16-12-1
 * Time: 下午1:48
 * To change this template use File | Settings | File Templates.
 */
//判断每个tab是否有几个维度
function subtituteDetailsInitTime(allType,allName,tabId){
    if(allType){
        var html="";
        var time=allType.split(",");
        var subtituteDetailsTime=$("#subtituteDetailsTime").val();
        $("#subtituteDetailsTime").val(subtituteDetailsTime);
        var subtituteDetailsCalendarStart=$('#subtituteDetailsCalendarStart').val();
        var subtituteDetailsCalendarEnd= $('#subtituteDetailsCalendarEnd').val();
        for(var i=0;i<time.length;i++){
            var id="subtituteDetails"+time[i];
            var name=allName.split(",")[i];
            if(subtituteDetailsTime&&!subtituteDetailsCalendarStart&&!subtituteDetailsCalendarEnd){
                if(subtituteDetailsTime==time[i]){
                    switch (time[i]) {
                        case "day":
                            $('#subtituteDetailsCalendarStart').datepicker('setDate', getSomeDate(30));
                            $('#subtituteDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "week":
                            $('#subtituteDetailsCalendarStart').datepicker('setDate', getSomeDate(60));
                            $('#subtituteDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "month":
                            $('#subtituteDetailsCalendarStart').datepicker('setDate', getSomeYear(1));
                            $('#subtituteDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "quarter":
                            $('#subtituteDetailsCalendarStart').datepicker('setDate', getSomeDate(90));
                            $('#subtituteDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "year":
                            $('#subtituteDetailsCalendarStart').datepicker('setDate', getSomeYear(4));
                            $('#subtituteDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                    }
                    html+="<span id='"+id+"'class='wd_r'><a onclick=\"subtituteDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                } else{
                    html+="<span id='"+id+"' ><a onclick=\"subtituteDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                }
            }else{
                if(i==0){
                    html+="<span id='"+id+"'class='wd_r'><a onclick=\"subtituteDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                }else{
                    html+="<span id='"+id+"' ><a onclick=\"subtituteDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                }
            }

        }

        $("#subtituteDetailsDiv").html(html);
    }

}

//第一次加载页面
function subtituteDetailsFirstLoad(code,time,subtituteProductCode,tabId){
    var array=['day','week','month','quarter','year'];
    for(var i=0;i<array.length;i++){
        if(time==array[i]){
            subtituteDetailsClass(time);
        }  else{
            $("#subtituteDetails"+array[i]).attr("class","") ;
        }
    }

    $("li[id^='subtituteDetailsLi_']").each(function(i,element){
        var id=$(element).attr("id");
        //alert(id+"===code==="+code);
        if("subtituteDetailsLi_"+code==id){
            subtituteDetailsClass2(code);
        } else{
            $("#"+id).attr("class","details_nav");
        }
    });

    var defaultSubtituteTabCode;
    var defaultSubtituteTime;
    var showListSubtitute;
    var defaultSubtituteProductCode; //品目ID
    var defaultCalendarStart=$("#subtituteDetailsCalendarStart").val(); //默认开始时候
    var defaultCalendarEnd=$("#subtituteDetailsCalendarEnd").val();//默认结束时间
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
        defaultSubtituteTabCode=code;
    }else{
        defaultSubtituteTabCode =$("#subtituteDetailsTab").val();
        subtituteDetailsClass2(defaultSubtituteTabCode);
    }

    if(time){
        defaultSubtituteTime=time;
    }else{
        defaultSubtituteTime =$("#subtituteDetailsTime").val();
        subtituteDetailsClass(defaultSubtituteTime);
    }

    if(subtituteProductCode){
        defaultSubtituteProductCode=subtituteProductCode;
    }else{
        defaultSubtituteProductCode =$("#subtituteDetailsProductCode").val();

    }
    //alert("code="+defaultSubtituteTabCode+"&time="+defaultSubtituteTime+"&productCode="+$("#projectSubtituteDetailsCode").val()+"&projectSubtituteDetailsCode="+defaultSubtituteProductCode+"===calendarstart==="+defaultCalendarStart+"==calendarend=="+defaultCalendarEnd);
    var myChart_subtituteDetails = echarts.init(document.getElementById('subtituteDetailsEcharts'));
    myChart_subtituteDetails.clear();
    myChart_subtituteDetails.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    clearPagination('subtituteDetailsTable');//清除表格和分页
    $.ajax({
            type:"POST",
            dataType:"json",

            url:"findSubtituteDetailsData?code="+defaultSubtituteTabCode+"&time="+defaultSubtituteTime+"&productCode="+$("#projectSubtituteDetailsCode").val()+"&subtituteDetailsProductCode="+defaultSubtituteProductCode+"&calendarStart="+defaultCalendarStart+"&calendarEnd="+defaultCalendarEnd+"&tabId="+tabId,
            success:function(data){
                if(!data||data.length==0||!data.legendData||data.legendData.length==0||!data.seriesData||data.seriesData.length==0){
                    myChart_subtituteDetails.showLoading({
                        text: '暂无数据',    //loading话术
                        effect: 'bubble'
                    });
                    return false;
                }
                if(data.type=="price"){
                    loadSubtituteDetailsPrice(data,myChart_subtituteDetails);
                }else if(data.type=="capacityRate"){
                    loadSubtituteDetailsCapacityRate(data,myChart_subtituteDetails);
                } else if(data.type=="profits"){
                    loadSubtituteDetailsProfits(data,myChart_subtituteDetails);
                }
                //initPagination('subtituteDetailsTable',dataSource.length);
            }
        }
    );
}

//选中年月日
function subtituteDetailsClass(time){
    $("#subtituteDetails"+time).attr("class","wd_r") ;
}
//选中tab页
function subtituteDetailsClass2(code){
    $("#subtituteDetailsLi_"+code).attr("class","details_nav details_nav_selected") ;
}

/**
 * 切换tab页
 * @param code
 */
function changSubtituteDetailsTab(code,type,allType,allName,tabId){
    subtituteDetailsLegend=null;
    $("#subtituteDetailsTime").val(allType.split(",")[0]); //切换tab的时候把另一个时间维度设置第一个
    subtituteDetailsInitTime(allType,allName,tabId);
    $("#subtituteDetailsTab").val(code);
    subtituteDetailsFirstLoad(code,'',type,tabId);
}


/**
 * 加载价格图表
 * @param data
 */
function loadSubtituteDetailsPrice(data,myChart_subtituteDetails){
    var mould_option=initOption3();
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    var xData=[];
    xData=findTimeDate("timeDate","avgPrice",data.seriesData);
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].DownstreamName);
        var array=[];
        for(var i=0;i<xData.length;i++){
            if(data.seriesData[z]){
                var value="";
                var tempData="-";
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
    if(subtituteDetailsLegend){
        mould_option.legend.selected=subtituteDetailsLegend;
    }
    myChart_subtituteDetails.hideLoading();
    window.onresize = myChart_subtituteDetails.resize;
    //
    mould_option.toolbox.feature.myTool.onclick=function(){
        var array=[dataSource];
        var titleName=[["日期","类型","均值",'单位']];
        var sheetName=["价格"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        $("#excelArray").val(JSON.stringify(array));
        $('#subtituteExport').submit() ;
    }  ;
    mould_option.toolbox.feature.savemsg.onclick=function(){
        exportEchatsImg(myChart_subtituteDetails,"替代品价格",mould_option);
    }  ;
    //
    myChart_subtituteDetails.setOption(mould_option,true);
    subtituteDetailsLegendClick(myChart_subtituteDetails,mould_option,1,data.seriesData);
    subtituteDetailsArrayToJson(mould_option,data.seriesData,subtituteDetailsLegend,1);//将数据源转成表格所需要的数据源
    var content=' <th width="20%" onclick=\'subtituteDetailsSort(this,0,dataSource)\' style="cursor: pointer"><span >日期</span><span class="ascending_box"><a  style="cursor: pointer" href="javascript:void(\'0\')" class="ascending32"></a>' +
        '<a  style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span></th>' +
        ' <th width="15%" onclick=\'subtituteDetailsSort(this,1,dataSource)\' style="cursor: pointer"><span >类型</span> <span class="ascending_box"><a  style="cursor: pointer" href="javascript:void(\'0\')" class="ascending"></a>' +
        '<a  style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span></th>' +
//        '<th width="15%" onclick=\'subtituteDetailsSort(this,2,dataSource)\' style="cursor: pointer"><span >低</span><span class="ascending_box"><a  style="cursor: pointer" href="javascript:void(\'0\')" class="ascending"></a>' +
//        '<a  style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>' +
//        '<th width="15%" onclick=\'subtituteDetailsSort(this,3,dataSource)\' style="cursor: pointer"><span >高</span><span class="ascending_box"><a  style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
//        '<a  style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>' +
        '<th width="15%" onclick=\'subtituteDetailsSort(this,2,dataSource)\' style="cursor: pointer"><span >均值</span><span class="ascending_box"><a  style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a  style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>'+
        '<th width="15%" onclick=\'subtituteDetailsSort(this,3,dataSource)\' style="cursor: pointer"><span >单位</span><span class="ascending_box"><a  style="cursor: pointer" href="javascript:void(\'0\')" class="ascending"></a>' +
        '<a  style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>';
 //   $("#subtituteDetailsTable").html(content);

}

/**
 * 加载开工率图表
 * @param data
 */
function loadSubtituteDetailsCapacityRate(data,myChart_subtituteDetails){
    var mould_option=initOption3();
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    var xData=[];
    xData=findTimeDate("timeDate","OperatingRate",data.seriesData);
    var tempData;
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
    mould_option.legend.data=legendData;
    mould_option.xAxis[0].data=xData;
    mould_option.xAxis[0].boundaryGap=false;
    mould_option.series=totalData;
    mould_option.yAxis[0].scale=true;
    mould_option.yAxis[0].axisLabel.formatter="{value}%";
    mould_option.legend.selected=null;
    mould_option.yAxis[0].name='开工率';
    myChart_subtituteDetails.hideLoading();
    window.onresize = myChart_subtituteDetails.resize;
    mould_option.toolbox.feature.myTool.onclick=function(){
        var array=[dataSource];
        var titleName=[["日期","产品","开工率"]];
        var sheetName=["开工率"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        $("#excelArray").val(JSON.stringify(array));
        $('#subtituteExport').submit() ;
    }  ;
    myChart_subtituteDetails.setOption(mould_option,true);
    subtituteDetailsLegendClick(myChart_subtituteDetails,mould_option,2,data.seriesData);
    subtituteDetailsArrayToJson2(mould_option,data.seriesData);//将数据源转成表格所需要的数据源
    var content=' <th width="30%"><span>日期</span><span class="ascending_box"><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,0,"asc")\' class="ascending"></a><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,0,"desc")\' class="descending"></a></span></th> <th width="30%"><span>产品</span> <span class="ascending_box"><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,1,"asc")\' class="ascending"></a><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,1,"desc")\' class="descending"></a></span></th><th width="30%"><span>开工率</span><span class="ascending_box"><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,2,"asc")\' class="ascending"></a><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,0,"desc")\' class="descending"></a></span> </th>';
    $("#subtituteDetailsTable").html(content);

}
/**
 * 利润图表
 * @param data
 */
function loadSubtituteDetailsProfits(data,myChart_subtituteDetails){
    var mould_option=initOption3();
    //解析后台的数据
    var legendData=[];
    var legendDataSelect={};
    var totalData=[];
    var xData=[];
    xData=findTimeDate("timeDate","avgPrice",data.seriesData);
    var tempData;
    var defaultSubtituteName;
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].DownstreamName);
        if(data.legendData[z].DownstreamProductCode==data.downstreamDetailsProductCode){
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
    myChart_subtituteDetails.hideLoading();
    window.onresize = myChart_subtituteDetails.resize;
    mould_option.toolbox.feature.myTool.onclick=function(){
        var array=[dataSource];
        var titleName=[["日期","产品","毛利润(元/吨)","毛利润率"]];
        var sheetName=["盈亏"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        $("#excelArray").val(JSON.stringify(array));
        $('#subtituteExport').submit() ;
    }  ;
    myChart_subtituteDetails.setOption(mould_option,true);
    if(data.subtituteDetailsProductCode){
        subtituteDetailsArrayToJson4(mould_option,data.seriesData); //首页选中了某个列表进入详情只显示这个品目的数据
    }else{
        subtituteDetailsArrayToJson3(mould_option,data.seriesData);//将数据源转成表格所需要的数据源
    }
    subtituteDetailsLegendClick(myChart_subtituteDetails,mould_option,3,data.seriesData);
    var content=' <th width="20%"><span>日期</span><span class="ascending_box"><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,0,"asc")\' class="ascending"></a>' +
        '<a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,0,"desc")\' class="descending"></a></span></th>' +
        ' <th width="15%"><span>类型</span> <span class="ascending_box"><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,1,"asc")\' class="ascending"></a>' +
        '<a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,1,"desc")\' class="descending"></a></span></th>' +
        '<th width="15%"><span>低</span><span class="ascending_box"><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,2,"asc")\' class="ascending"></a>' +
        '<a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,2,"desc")\' class="descending"></a></span> </th>' +
        '<th width="15%"><span>高</span><span class="ascending_box"><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,3,"asc")\' class="ascending"></a>' +
        '<a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,3,"desc")\' class="descending"></a></span> </th>' +
        '<th width="15%"><span>均值</span><span class="ascending_box"><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,4,"asc")\' class="ascending"></a>' +
        '<a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,4,"desc")\' class="descending"></a></span> </th>'+
        '<th width="15%"><span>单位</span><span class="ascending_box"><a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,5,"asc")\' class="ascending"></a>' +
        '<a href="javascript:void(\'0\')" onclick=\'subtituteDetailsSort(dataSource,5,"desc")\' class="descending"></a></span> </th>';
    $("#subtituteDetailsTable").html(content);

}

/**
 * 将数组转成json格式- --价格
 * @param array
 */
function subtituteDetailsArrayToJson(mould_option,seriesData,names,type){
    dataSource=[];
    if(jQuery.isEmptyObject(names)){
        for(var i=0;i<mould_option.series.length;i++){
            for(var j=0;j<mould_option.series[i].data.length;j++){
                if(seriesData[i][j]){
                    if(type==1){
                        dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].avgPrice,seriesData[i][j].unit]);
                    }else if(type==2){
                        dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,mould_option.series[i].data[j]+'%']);
                    } else if(type==3){
                        dataSource.push([mould_option.xAxis[0].data[j],mould_option.series[i].name,mould_option.series[i].data[j],seriesData[i][j].avgPrice+'%']);
                    }
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
                                    if(type==1){
                                        dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].avgPrice,seriesData[i][j].unit]);
                                    }else if(type==2){
                                        dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,mould_option.series[i].data[j]+'%']);
                                    } else if(type==3){
                                        dataSource.push([mould_option.xAxis[0].data[j],mould_option.series[i].name,mould_option.series[i].data[j],seriesData[i][j].avgPrice+'%']);
                                    }
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
 * 将数组转成json格式- --开工率
 * @param array
 */
function subtituteDetailsArrayToJson2(mould_option,seriesData){
    dataSource=[];
    for(var i=0;i<mould_option.series.length;i++){
        for(var j=0;j<mould_option.series[i].data.length;j++){
            if(seriesData[i][j]){
                dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,mould_option.series[i].data[j]+'%']);
            }

        }
    }
    dataSource= sortArray(dataSource,0,'desc');
}

/**
 * 将数组转成json格式- --利润
 * @param array
 */
function subtituteDetailsArrayToJson3(mould_option,seriesData){
    dataSource=[];
    for(var i=0;i<mould_option.series.length;i++){
        for(var j=0;j<mould_option.series[i].data.length;j++){
            if(seriesData[i][j]){
                dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,mould_option.series[i].data[j],seriesData[i][j].avgPrice+'%']);
            }

        }
    }
    dataSource= sortArray(dataSource,0,'desc');
}
/**
 * 将数组转成json格式 --首页选中了某个列表进入详情只显示这个品目的数据
 * @param array
 */
function subtituteDetailsArrayToJson4(mould_option,seriesData){
    dataSource=[];
    for(var i=0;i<mould_option.series.length;i++){
        for(var j=0;j<mould_option.series[i].data.length;j++){
            if(mould_option.legend.selected[mould_option.series[i].name]==true){
                if(seriesData[i][j]){
                    dataSource.push([seriesData[i][j].timeDate,mould_option.xAxis[0].data[j],mould_option.series[i].data[j],seriesData[i][j].avgPrice+'%']);
                }

            }

        }
    }
    dataSource= sortArray(dataSource,0,'desc');
}
function subtituteDetailsLegendClick(myChart_subtituteDetails,mould_option,type,seriesData){
    var ecConfig = echarts.config.EVENT;
    myChart_subtituteDetails.on(ecConfig.LEGEND_SELECTED,function(param){
        subtituteDetailsClickRefreshTable(param.selected,mould_option,param.target,type,seriesData)  ;
        subtituteDetailsLegend=param.selected;
    });

}

/**
 * 点击图例或者取消图例刷新表格数据
 */
function subtituteDetailsClickRefreshTable(names,mould_option,target,type,seriesData){
    dataSource=[];
    var first=[];
    $("#subtituteDetailsTable").nextAll().remove();
    $.each(names,function(name,value) {
        if(value==true){
            for(var i=0;i<mould_option.series.length;i++){
                if(name==mould_option.series[i].name){
                    for(var j=0;j<mould_option.series[i].data.length;j++){
                        if(seriesData[i][j]){
                            if(type==1){

                                dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].avgPrice,seriesData[i][j].unit]);

                            }else if(type==2){

                                dataSource.unshift([mould_option.xAxis[0].data[j],mould_option.series[i].name,mould_option.series[i].data[j]+'%']);

                            } else if(type==3){

                                dataSource.unshift([mould_option.xAxis[0].data[j],mould_option.series[i].name,mould_option.series[i].data[j],seriesData[i][j].avgPrice+'%']);

                            }
                        }



                    }
                }

            }
        }
    });
    Array.prototype.unshift.apply(dataSource,first);
    dataSource= sortArray(dataSource,0,'desc');
    clearPaginationNoFields('subtituteDetailsTable');//清除表格和分页
    //initPagination('subtituteDetailsTable',dataSource.length);

}

/**
 * 对数据源进行排序
 * @param array
 * @param field
 * @param order
 */
function subtituteDetailsSort(obj,field,array){
    var order=getSortOrder(obj);
    dataSource= sortArray(array,field,order);
    clearPaginationNoFields('subtituteDetailsTable');//清除表格和分页
  //  initPagination('subtituteDetailsTable',dataSource.length);
    commonSort(obj);
}


/**
 * 搜索按钮
 */
function subtituteDetailsSearch(tabId,oldTabId){
    if(!tabId){
        tabId=oldTabId;
    }
    //判断当前是哪个时间维度
    $("span[id^='subtituteDetails']").each(function(i,element){
        var id=$(element).attr("id");
        var time=$(element).attr("class");
        if(time=="wd_r"){
            if("subtituteDetailsday"==id){
                subtituteDetailsFirstLoad('','day','',tabId);
            }
            if("subtituteDetailsweek"==id){
                subtituteDetailsFirstLoad('','week','',tabId);
            }
            if("subtituteDetailsmonth"==id){
                subtituteDetailsFirstLoad('','month','',tabId);
            }
            if("subtituteDetailsquarter"==id){
                subtituteDetailsFirstLoad('','quarter','',tabId);
            }
            if("subtituteDetailsyear"==id){
                subtituteDetailsFirstLoad('','year','',tabId);
            }
        }
    });
}
//var exportExcel=function(){
//    $("#excelArray").val(JSON.stringify(dataSource));
//    $("#titleName").val("日期,产品,市场价格(元/吨),涨跌幅");
//    $('#hyExport').submit() ;
//}