var dataSource=[];//表格的所有数据
var downstreamDetailsLegend={};
var DownloadInfo;
/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 16-12-1
 * Time: 下午1:48
 * To change this template use File | Settings | File Templates.
 */
//判断每个tab是否有几个维度
function downstreamDetailsInitTime(allType,allName,tabId){
    if(allType){
        var html="";
        var time=allType.split(",");
        var downstreamDetailsTime=$("#downstreamDetailsTime").val();
        var  downstreamDetailsCalendarStart=$('#downstreamDetailsCalendarStart').val();
        var  downstreamDetailsCalendarEnd= $('#downstreamDetailsCalendarEnd').val();
        $("#downstreamDetailsTime").val(downstreamDetailsTime);
        for(var i=0;i<time.length;i++){
            var id="downstreamDetails"+time[i];
            var name=allName.split(",")[i];
            if(downstreamDetailsTime&&!downstreamDetailsCalendarStart&&!downstreamDetailsCalendarEnd){
                if(downstreamDetailsTime==time[i]){
                    switch (time[i]) {
                        case "day":
                            $('#downstreamDetailsCalendarStart').datepicker('setDate', getSomeDate(30));
                            $('#downstreamDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "week":
                            $('#downstreamDetailsCalendarStart').datepicker('setDate', getSomeDate(60));
                            $('#downstreamDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "month":
                            $('#downstreamDetailsCalendarStart').datepicker('setDate', getSomeYear(1));
                            $('#downstreamDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "quarter":
                            $('#downstreamDetailsCalendarStart').datepicker('setDate', getSomeDate(90));
                            $('#downstreamDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                        case "year":
                            $('#downstreamDetailsCalendarStart').datepicker('setDate', getSomeYear(4));
                            $('#downstreamDetailsCalendarEnd').datepicker('setDate',getNowDate());
                            break;
                    }
                    html+="<span id='"+id+"'class='wd_r'><a onclick=\"downstreamDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                } else{
                    html+="<span id='"+id+"' ><a onclick=\"downstreamDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                }
            }else{
                if(i==0){
                    html+="<span id='"+id+"'class='wd_r'><a onclick=\"downstreamDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                }else{
                    html+="<span id='"+id+"' ><a onclick=\"downstreamDetailsFirstLoad('','"+time[i]+"','','"+tabId+"')\">"+name+"</a></span>";
                }
            }

        }
        $("#downstreamDetailsDiv").html(html);
    }
}

//第一次加载页面
function downstreamDetailsFirstLoad(code,time,downstreamProductCode,tabId){
    var array=['day','week','month','quarter','year'];
    for(var i=0;i<array.length;i++){
        if(time==array[i]){
            downstreamDetailsClass(time);
        }  else{
            $("#downstreamDetails"+array[i]).attr("class","") ;
        }
    }

    $("li[id^='downstreamDetailsLi_']").each(function(i,element){
        var id=$(element).attr("id");
        //alert(id+"===code==="+code);
        if("downstreamDetailsLi_"+code==id){
            downstreamDetailsClass2(code);
        } else{
            $("#"+id).attr("class","details_nav");
        }
    });

    var defaultDownstreamTabCode;
    var defaultDownstreamTime;
    var showListDownstream;
    var defaultDownstreamProductCode; //品目ID
    var defaultCalendarStart=$("#downstreamDetailsCalendarStart").val(); //默认开始时候
    var defaultCalendarEnd=$("#downstreamDetailsCalendarEnd").val();//默认结束时间
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
        defaultDownstreamTabCode=code;
    }else{
        defaultDownstreamTabCode =$("#downstreamDetailsTab").val();
        downstreamDetailsClass2(defaultDownstreamTabCode);
    }

    if(time){
        defaultDownstreamTime=time;
    }else{
        defaultDownstreamTime =$("#downstreamDetailsTime").val();
        downstreamDetailsClass(defaultDownstreamTime);
    }
    if(downstreamProductCode){
        defaultDownstreamProductCode=downstreamProductCode;
    }else{
        defaultDownstreamProductCode =$("#downstreamDetailsProductCode").val();

    }
    //alert("code="+defaultDownstreamTabCode+"&time="+defaultDownstreamTime+"&productCode="+$("#projectDownstreamDetailsCode").val()+"&projectDownstreamDetailsCode="+defaultDownstreamProductCode+"===calendarstart==="+defaultCalendarStart+"==calendarend=="+defaultCalendarEnd);
    var myChart_downstream = echarts.init(document.getElementById('downstreamDetailsEcharts'));
    myChart_downstream.clear();
    myChart_downstream.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    clearPagination('downstreamDetailsTable');//清除表格和分页
    $.ajax({
            type:"POST",
            dataType:"json",

            url:"findDownStreamDetailsData?code="+defaultDownstreamTabCode+"&time="+defaultDownstreamTime+"&productCode="+$("#projectDownstreamDetailsCode").val()+"&downstreamDetailsProductCode="+defaultDownstreamProductCode+"&calendarStart="+defaultCalendarStart+"&calendarEnd="+defaultCalendarEnd+"&tabId="+tabId,
            success:function(data){
                if(!data||data.length==0||!data.legendData||data.legendData.length==0||!data.seriesData||data.seriesData.length==0){
                    myChart_downstream.showLoading({
                        text: '暂无数据',    //loading话术
                        effect: 'bubble'
                    });
                    return false;
                }
                if(data.type=="price"){
                    if(data.seriesData.length!=0){
                        data.seriesData=getPermissionByTime2(DownloadInfo,data.seriesData,"timeDate","-",defaultDownstreamTime);
                    }else{
                        data=[];
                    }
                    loadDownstreamDetailsPrice(data,myChart_downstream);
                }else if(data.type=="capacityRate"){
                    if(data.seriesData.length!=0){
                        data.seriesData=getPermissionByTime2(DownloadInfo,data.seriesData,"timeDate","-",defaultDownstreamTime);
                    }else{
                        data=[];
                    }
                    loadDownstreamDetailsCapacityRate(data,myChart_downstream);
                    initPagination('downstreamDetailsTable',dataSource.length);
                } else if(data.type=="profits"){
                    if(data.seriesData.length!=0){
                        data.seriesData=getPermissionByTime2(DownloadInfo,data.seriesData,"timeDate","-",defaultDownstreamTime);
                    }else{
                        data=[];
                    }
                    loadDownstreamDetailsProfits(data,myChart_downstream);
                    initPagination('downstreamDetailsTable',dataSource.length);
                }

            }
        }
    );
     var wd=$("#downstreamDetailsDiv .wd_r>a").text();
     var tabName=$("#downstreamTab .details_nav_selected >a").text();
    ga('send', 'event', {
        'eventCategory': '维度选择',
        'eventAction': '下游详情-'+tabName+'-'+wd
    });

}

//选中年月日
function downstreamDetailsClass(time){
    $("#downstreamDetails"+time).attr("class","wd_r") ;
}
//选中tab页
function downstreamDetailsClass2(code){
    $("#downstreamDetailsLi_"+code).attr("class","details_nav details_nav_selected") ;
}

/**
 * 切换tab页
 * @param code
 */
function changDownstreamDetailsTab(code,type,allType,allName,tabId,PriceDownload,OtherDownload){
    if(PriceDownload&&OtherDownload){
        if(downLoadType['downstream_module'][type]==true){//价格数据
            DownloadInfo=PriceDownload;
        }else{//非价格数据
            DownloadInfo=OtherDownload;
        }
    }
    $("#downstreamDetailsSearch").attr('onclick','downstreamDetailsSearch('+tabId+',\'\')');
    downstreamDetailsLegend=null;
    $("#downstreamDetailsTime").val(allType.split(",")[0]); //切换tab的时候把另一个时间维度设置第一个
    downstreamDetailsInitTime(allType,allName,tabId);
    $("#downstreamDetailsTab").val(code);
    downstreamDetailsFirstLoad(code,'',type,tabId);
    var wd=$("#downstreamDetailsDiv .wd_r>a").text();
    var tabName=$("#downstreamTab .details_nav_selected >a").text();
    ga('send', 'event', {
        'eventCategory': 'tab点击',
        'eventAction': '下游详情-'+tabName+'-'+wd
    });
}


/**
 * 加载价格图表
 * @param data
 */
function loadDownstreamDetailsPrice(data,myChart_downstream){
    var mould_option=initOption3();
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    var xData=[];
    xData=findTimeDate("timeDate","avgPrice",data.seriesData);
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].DownstreamName);
        var array=[];
        var tempData="-"; //用于补数据的前一条数据,接受第一条为空不补数据
        for(var i=0;i<xData.length;i++){
            if(data.seriesData[z]){
                var value="";
                for(var j=0;j<data.seriesData[z].length;j++){
                    if(data.seriesData[z][j].timeDate==xData[i]){
                        if(data.seriesData[z][j].avgPrice!="-"){
                            value= data.seriesData[z][j].avgPrice;
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
 //   console.log( xData);
//    console.log(totalData);
    mould_option.xAxis[0].data=xData;
    mould_option.legend.data=legendData;
    mould_option.series=totalData;
    mould_option.xAxis[0].boundaryGap=false;
    mould_option.yAxis[0].scale=true;
    mould_option.yAxis[1].scale=true;
    mould_option.yAxis[0].name='元/吨';
    mould_option.yAxis[1].name='美元/吨';
    mould_option.yAxis[0].axisLabel.formatter=null;
    if(downstreamDetailsLegend){
        mould_option.legend.selected=downstreamDetailsLegend;
    }
    myChart_downstream.hideLoading();
    window.onresize = myChart_downstream.resize;
    //
    mould_option.toolbox.feature.myTool.onclick=function(){
        var array=[dataSource];
        var titleName=[["日期","类型","均值",'单位']];
        var sheetName=["价格"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        if(DownloadInfo==1){
            alert("您尚未开通下载Excel权限!");
            return;
        }else {
            var array=[dataSource];
            $("#excelArray").val(JSON.stringify(array));
            $('#downtreamDetailExport').submit() ;

        }
        ga('send', 'event', {
            'eventCategory': 'click点击',
            'eventAction': '上游详情导出Excel'
        });
    }  ;
    mould_option.toolbox.feature.savemsg.onclick=function(){
        exportEchatsImg(myChart_downstream,"下游价格",mould_option);
        ga('send', 'event', {
            'eventCategory': 'click点击',
            'eventAction': '下游价格详情下载图片'
        });
    }  ;
    myChart_downstream.setOption(mould_option,true);
    downstreamDetailsLegendClick(myChart_downstream,mould_option,1,data.seriesData);
    downstreamDetailsArrayToJson1(mould_option,data.seriesData,downstreamDetailsLegend);//将数据源转成表格所需要的数据源
    var content=' <th width="20%" style="cursor: pointer" onclick=\'downstreamDetailsSort(this,0,dataSource)\'><span>日期</span><span class="ascending_box"><a  style="cursor: pointer" href="javascript:void(\'0\')" class="ascending32"></a>' +
        '<a  style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span></th>' +
        ' <th width="15%" style="cursor: pointer" onclick=\'downstreamDetailsSort(this,1,dataSource)\'><span>类型</span> <span class="ascending_box"><a   style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a  style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span></th>' +
//        '<th width="15%" style="cursor: pointer" onclick=\'downstreamDetailsSort(this,2,dataSource)\'><span  style="cursor: pointer">低</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
//        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>' +
//        '<th width="15%" style="cursor: pointer" onclick=\'downstreamDetailsSort(this,3,dataSource)\'><span  style="cursor: pointer">高</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
//        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>' +
        '<th width="15%" style="cursor: pointer" onclick=\'downstreamDetailsSort(this,2,dataSource)\'><span  style="cursor: pointer">均值</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>'+
        '<th width="15%" style="cursor: pointer" onclick=\'downstreamDetailsSort(this,3,dataSource)\'><span  style="cursor: pointer">单位</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>';
 //   $("#downstreamDetailsTable").html(content);

}

/**
 * 加载开工率图表
 * @param data
 */
function loadDownstreamDetailsCapacityRate(data,myChart_downstream){
    var mould_option=initOption3();
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    var xData=[];
    xData=findTimeDate("timeDate","OperatingRate",data.seriesData);
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
    mould_option.legend.data=legendData;
    mould_option.xAxis[0].data=xData;
    mould_option.xAxis[0].boundaryGap=false;
    mould_option.series=totalData;
    mould_option.yAxis[0].scale=true;
    mould_option.yAxis[0].axisLabel.formatter="{value}%";
    if(downstreamDetailsLegend){
        mould_option.legend.selected=downstreamDetailsLegend;
    }
    mould_option.yAxis[0].name='开工率';
    myChart_downstream.hideLoading();
    window.onresize = myChart_downstream.resize;
    //
    mould_option.toolbox.feature.myTool.onclick=function(){
        var array=[dataSource];
        var titleName=[["日期","产品","开工率"]];
        var sheetName=["开工率"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        if(DownloadInfo==1){
            alert("您尚未开通下载Excel权限!");
            return;
        }else {
            var array=[dataSource];
            $("#excelArray").val(JSON.stringify(array));
            $('#downtreamDetailExport').submit() ;

        }
        ga('send', 'event', {
            'eventCategory': 'click点击',
            'eventAction': '上游详情导出Excel'
        });
    }  ;
    mould_option.toolbox.feature.savemsg.onclick=function(){
        exportEchatsImg(myChart_downstream,"下游开工率",mould_option);
        ga('send', 'event', {
            'eventCategory': 'click点击',
            'eventAction': '下游开工率详情下载图片'
        });
    }  ;
    mould_option.tooltip.formatter=function(param){
        var ft = param[0]['name']+"<br>";
        for(var i=0;i<param.length;i++){
            ft += param[i].seriesName+":"+param[i].data+'%'+"<br>";
        }
        return ft;
    }
    myChart_downstream.setOption(mould_option,true);
    downstreamDetailsLegendClick(myChart_downstream,mould_option,2,data.seriesData);
    downstreamDetailsArrayToJson2(mould_option,data.seriesData,downstreamDetailsLegend);//将数据源转成表格所需要的数据源
    var content=' <th  style="cursor: pointer"width="30%" onclick=\'downstreamDetailsSort(this,0,dataSource)\'><span  style="cursor: pointer">日期</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending32"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span></th>' +
        ' <th  style="cursor: pointer" width="30%" onclick=\'downstreamDetailsSort(this,1,dataSource)\'><span  style="cursor: pointer">产品</span> <span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span></th>' +
        '<th  style="cursor: pointer" width="30%" onclick=\'downstreamDetailsSort(this,2,dataSource)\'><span  style="cursor: pointer">开工率</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>';
    $("#downstreamDetailsTable").html(content);

}
/**
 * 利润图表
 * @param data
 */
function loadDownstreamDetailsProfits(data,myChart_downstream){
    var mould_option=initOption3();
    //解析后台的数据
    var legendData=[];
    var legendDataSelect={};
    var totalData=[];
    var xData=[];
    xData=findTimeDate("timeDate","thisPrice",data.seriesData);
    var defaultDownstreamName;
    for(var z=0;z<data.legendData.length;z++){
        legendData.push(data.legendData[z].DownstreamName);
        if(data.downstreamDetailsProductCode){
            if(data.legendData[z].DownstreamProductCode==data.downstreamDetailsProductCode){
                legendDataSelect[data.legendData[z].DownstreamName]=true;
            }else{
                legendDataSelect[data.legendData[z].DownstreamName]=false;
            }
        }

        var array=[];
        var tempData="-"; //用于补数据的前一条数据,接受第一条为空不补数据
        for(var i=0;i<xData.length;i++){
            if(data.seriesData[z]){
                var value="";
                for(var j=0;j<data.seriesData[z].length;j++){
                    if(data.seriesData[z][j].timeDate==xData[i]){
                        if(data.seriesData[z][j].thisPrice!="-"){
                            value= data.seriesData[z][j].thisPrice;
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
    if(downstreamDetailsLegend){
        mould_option.legend.selected=downstreamDetailsLegend;
    }
    mould_option.tooltip.formatter=function(params,ticket,callback){
        var res = '当月盈亏情况: <br/>' + params[0].name;
        for (var i = 0, l = params.length; i < l; i++) {
            res += '<br/>' + params[i].seriesName + ' : ' + params[i].value;
        }
        return res;
    } ;
    mould_option.legend.data=legendData;
    mould_option.xAxis[0].data=xData;
    mould_option.xAxis[0].boundaryGap=false;
    mould_option.series=totalData;
    mould_option.yAxis[0].scale=true;
    mould_option.yAxis[0].name='元/吨';
    mould_option.yAxis[0].axisLabel.formatter=null;
    myChart_downstream.hideLoading();
    window.onresize = myChart_downstream.resize;
    mould_option.toolbox.feature.myTool.onclick=function(){
        var array=[dataSource];
        var titleName=[["日期","产品","当月盈亏情况","较上月盈亏情况"]];
        var sheetName=["利润"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        if(DownloadInfo==1){
            alert("您尚未开通下载Excel权限!");
            return;
        }else {
            var array=[dataSource];
            $("#excelArray").val(JSON.stringify(array));
            $('#downtreamDetailExport').submit() ;

        }
        ga('send', 'event', {
            'eventCategory': 'click点击',
            'eventAction': '下游详情导出Excel'
        });
    }  ;
    mould_option.toolbox.feature.savemsg.onclick=function(){
        exportEchatsImg(myChart_downstream,"下游利润",mould_option);
        ga('send', 'event', {
            'eventCategory': 'click点击',
            'eventAction': '下游利润详情下载图片'
        });
    }  ;
    myChart_downstream.setOption(mould_option,true);
    if(data.downstreamDetailsProductCode){
        downstreamDetailsArrayToJson4(mould_option,data.seriesData,downstreamDetailsLegend); //首页选中了某个列表进入详情只显示这个品目的数据
    }else{
        downstreamDetailsArrayToJson3(mould_option,data.seriesData,downstreamDetailsLegend);//将数据源转成表格所需要的数据源
    }
    downstreamDetailsLegendClick(myChart_downstream,mould_option,3,data.seriesData);
    var content=' <th width="20%"  style="cursor: pointer" onclick=\'downstreamDetailsSort(this,0,dataSource)\'><span  style="cursor: pointer">日期</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending32"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span></th> ' +
        '<th  style="cursor: pointer" width="20%" onclick=\'downstreamDetailsSort(this,1,dataSource)\'><span  style="cursor: pointer">产品</span> <span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span></th>' +
//        '<th  style="cursor: pointer" width="20%" onclick=\'downstreamDetailsSort(this,2,dataSource)\'><span  style="cursor: pointer">当月均价</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')" class="ascending"></a>' +
//        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>' +
        '<th  style="cursor: pointer" width="20%" onclick=\'downstreamDetailsSort(this,2,dataSource)\'><span  style="cursor: pointer">当月盈亏情况</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')" class="descending"></a></span> </th>' +
        '<th  style="cursor: pointer" width="20%" onclick=\'downstreamDetailsSort(this,3,dataSource)\'><span  style="cursor: pointer">较上月盈亏情况</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending"></a>' +
        '<a style="cursor: pointer" href="javascript:void(\'0\')"  class="descending"></a></span> </th>';
    $("#downstreamDetailsTable").html(content);
}

/**
 * 将数组转成json格式- --价格
 * @param array
 */
function downstreamDetailsArrayToJson1(mould_option,seriesData,names){
    dataSource=[];
    if(jQuery.isEmptyObject(names)){
        for(var i=0;i<mould_option.series.length;i++){
            for(var j=0;j<mould_option.series[i].data.length;j++){
                if(seriesData[i][j]){
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

    //console.log(dataSource);
    dataSource= sortArray(dataSource,0,'desc');

}
/**
 * 将数组转成json格式- --开工率
 * @param array
 */
function downstreamDetailsArrayToJson2(mould_option,seriesData,names){
    dataSource=[];
    if(jQuery.isEmptyObject(names)){
        for(var i=0;i<mould_option.series.length;i++){
            for(var j=0;j<mould_option.series[i].data.length;j++){
                if(seriesData[i][j]){
                    dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,mould_option.series[i].data[j]+'%']);
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
                                    dataSource.unshift([seriesData[i][j].timeDate,mould_option.series[i].name,mould_option.series[i].data[j]+'%']);
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
 * 将数组转成json格式- --利润
 * @param array
 */
function downstreamDetailsArrayToJson3(mould_option,seriesData,names){
    dataSource=[];
    if(jQuery.isEmptyObject(names)){
        for(var i=0;i<mould_option.series.length;i++){
            for(var j=0;j<mould_option.series[i].data.length;j++){
                if(seriesData[i][j]){
                        dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].thisPrice,seriesData[i][j].lastPrice]);
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
                                    dataSource.unshift([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].thisPrice,seriesData[i][j].lastPrice]);
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
 * 将数组转成json格式 --首页选中了某个列表进入详情只显示这个品目的数据
 * @param array
 */
function downstreamDetailsArrayToJson4(mould_option,seriesData,names){
    dataSource=[];
    if(jQuery.isEmptyObject(names)){
        for(var i=0;i<mould_option.series.length;i++){
            for(var j=0;j<mould_option.series[i].data.length;j++){
                if(seriesData[i][j]){
                        dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].thisPrice,seriesData[i][j].lastPrice]);
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
                                    dataSource.unshift([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].thisPrice,seriesData[i][j].lastPrice]);
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
function downstreamDetailsLegendClick(myChart_downstream,mould_option,type,seriesData){
    var ecConfig = echarts.config.EVENT;
    var wd=$("#downstreamDetailsDiv .wd_r>a").text();
    var tabName=$("#downstreamTab .details_nav_selected >a").text();
    myChart_downstream.on(ecConfig.LEGEND_SELECTED,function(param){
        downstreamDetailsClickRefreshTable(param.selected,mould_option,param.target,type,seriesData);
        downstreamDetailsLegend=param.selected;
        ga('send', 'event', {
            'eventCategory': '图例(Legend)点击',
            'eventAction': '下游详情-'+tabName+'-'+wd+'-'+param['target']+'-图例点击'
        });
    });
}

/**
 * 点击图例或者取消图例刷新表格数据
 */
function downstreamDetailsClickRefreshTable(names,mould_option,target,type,seriesData){
    dataSource=[];
    var first=[];
    $("#downstreamDetailsTable").nextAll().remove();
    $.each(names,function(name,value) {
        if(value==true){
            for(var i=0;i<mould_option.series.length;i++){
                if(name==mould_option.series[i].name){
                    for(var j=0;j<mould_option.series[i].data.length;j++){
                        if(seriesData[i][j]){
                            if(type==1){

                                dataSource.push([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].avgPrice,seriesData[i][j].unit]);

                            }else if(type==2){

                                dataSource.unshift([seriesData[i][j].timeDate,mould_option.series[i].name,mould_option.series[i].data[j]+'%']);


                            } else if(type==3){

                                dataSource.unshift([seriesData[i][j].timeDate,mould_option.series[i].name,seriesData[i][j].thisPrice,seriesData[i][j].lastPrice]);


                            }
                        }



                    }
                }

            }
        }
    });
    Array.prototype.unshift.apply(dataSource,first);
    dataSource= sortArray(dataSource,0,'desc');
    clearPaginationNoFields('downstreamDetailsTable');//清除表格和分页
    if(type!=1){
        initPagination('downstreamDetailsTable',dataSource.length);
    }


}

/**
 * 对数据源进行排序
 * @param array
 * @param field
 * @param order
 */
function downstreamDetailsSort(obj,field,array){
    var order=getSortOrder(obj);
    dataSource= sortArray(array,field,order);
    clearPaginationNoFields('downstreamDetailsTable');//清除表格和分页
    initPagination('downstreamDetailsTable',dataSource.length);
    commonSort(obj);
    var wd=$("#downstreamDetailsDiv .wd_r>a").text();
    var tabName=$("#downstreamTab .details_nav_selected >a").text();
    ga('send', 'event', {
        'eventCategory': '排序点击',
        'eventAction': '下游详情-'+tabName+'-'+wd
    });
}


/**
 * 搜索按钮
 */
    function downstreamDetailsSearch(tabId,oldTabId){
    if(!tabId){
        tabId=oldTabId;
    }
        //判断当前是哪个时间维度
        $("span[id^='downstreamDetails']").each(function(i,element){
            var id=$(element).attr("id");
            var time=$(element).attr("class");
            if(time=="wd_r"){
                if("downstreamDetailsday"==id){
                    downstreamDetailsFirstLoad('','day','',tabId);
                }
                if("downstreamDetailsweek"==id){
                    downstreamDetailsFirstLoad('','week','',tabId);
                }
                if("downstreamDetailsmonth"==id){
                    downstreamDetailsFirstLoad('','month','',tabId);
                }
                if("downstreamDetailsquarter"==id){
                    downstreamDetailsFirstLoad('','quarter','',tabId);
                }
                if("downstreamDetailsyear"==id){
                    downstreamDetailsFirstLoad('','year','',tabId);
                }
            }
            var wd=$("#downstreamDetailsDiv .wd_r>a").text();
            var tabName=$("#downstreamTab .details_nav_selected >a").text();
            ga('send', 'event', {
                'eventCategory': '搜索点击',
                'eventAction': '下游详情-'+tabName+'-'+wd
            });
        });
    }
var exportExcel=function(){
    $("#excelArray").val(JSON.stringify(dataSource));
    $("#titleName").val("时间,品目,市场价格(元/吨),涨跌幅");
    $('#hyExport').submit() ;
}