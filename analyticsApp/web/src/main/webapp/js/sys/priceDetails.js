var priceDetailsLegend={}; //选中的图例
var selectedPriceDt = {};
var loadingSize = 1;

var dataSource=[];//表格的所有数据
var timeFlagPriceDt =1;
var flagHL ="3";

var myChart_priceDt;
var myChart_qiyeDt;
var myChart_wpbjDt;
var option_priceDt;

var   qiyeDataSource =[];
var   wpbjDataSource =[];

var priceData;
var guowaiData;


var currData;
var DownloadInfo;

function getCurrentDate(time){
    switch (time) {
        case "day":
            $('#startTime_price').datepicker('setDate', getSomeDate(30));
            $('#endTime_price').datepicker('setDate',getNowDate());
            break;
        case "week":
            $('#startTime_price').datepicker('setDate', getSomeDate(60));
            $('#endTime_price').datepicker('setDate',getNowDate());
            break;
        case "month":
            $('#startTime_price').datepicker('setDate', getSomeYear(1));
            $('#endTime_price').datepicker('setDate',getNowDate());
            break;
        case "quarter":
            $('#startTime_price').datepicker('setDate', getSomeDate(90));
            $('#endTime_price').datepicker('setDate',getNowDate());
            break;
        case "year":
            $('#startTime_price').datepicker('setDate', getSomeYear(4));
            $('#endTime_price').datepicker('setDate',getNowDate());
            break;
    }
}
//tab页的切换
function priceDtChangTab(type,index,ptId,downloadInfo,OtherDownload){
    if(downloadInfo&&OtherDownload){
        if(downLoadType['price_module'][type]==true){//价格数据
            DownloadInfo=downloadInfo;
        }else{//非价格数据
            DownloadInfo=OtherDownload;
        }

    }
    //清空分页和dom
    if(ptId==null || ptId==undefined){
        var productPriceDetailId=$("#productPriceDetailId").val();
        ptId=productPriceDetailId;

    }
    if(!index){
        priceDetailsLegend=null;
    }
    var time = $("#timeType").val();

   if(type=='uuu_price' || type=='unchina_price'){ //企业价格、全球价格
       myChart_priceDt = null;
       option_priceDt = null;
       loadingSize = 1;
       $("#priceName").addClass("choseDt");
       $("#qiye_price").removeClass("choseDt");
       $("#wpbj").removeClass("choseDt");
       firstLoading_priceDt(time);
       $("#priceType").val('price');
       ga('send', 'event', {
           'eventCategory': 'tab点击',
           'eventAction': '价格详情'
       });
   }else if(type=='qiye_price'){ //企业报价
       $("#priceName").removeClass("choseDt");
       $("#wpbj").removeClass("choseDt");
       $("#qiye_price").addClass("choseDt");
       firstLoading_qiyeDt(type,ptId,'day');
       $("#priceType").val('qiye');
       $("#productPriceDetailId").val(ptId);
       ga('send', 'event', {
           'eventCategory': 'tab点击',
           'eventAction': '企业报价详情'
       });
   }else if(type=='wpbj'){   //外盘报价
       $("#priceName").removeClass("choseDt");
       $("#qiye_price").removeClass("choseDt");
       $("#wpbj").addClass("choseDt");
       firstLoading_WpbjDt(type,ptId,'day');
       $("#priceType").val('wpbj');
       $("#productPriceDetailId").val(ptId);
       ga('send', 'event', {
           'eventCategory': 'tab点击',
           'eventAction': '外盘报价详情'
       });
   }
}

function timeChange(flag){
    //如果人民币美金转换用到了，这里就要
    clearPaginationNoFields("tab_priceDt");//去掉没用的事件
    var type =  $("#priceType").val();
    $("#timeType").val(flag);
        if (type=='price'){
            firstLoading_priceDt(flag,flagHL);
        }else{
            firstLoading_qiyeDt(type);
        }
    var clickName;
    if(flag='day'){
        clickName='日';
    }else if(flag=='week'){
        clickName='周';
    }else{
        clickName='月';
    }
    ga('send', 'event', {
        'eventCategory': '维度选择',
        'eventAction': clickName,
        'dimension3': '价格详情'
    });
}

//价格echarts模板
function getPriceDtModel(){
    var priceModel= {
        title : {
            x:'center'
        },
        grid:{
           // height:340,
            borderColor:'white',
            x:'8%',
            y:'10%',
            x2:'8%',
            y2:'25%'   ,
            height:'300'
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
        toolbox: {
            center:'right',
            color:['#000','#000','#000','#000','#000'],
            //显示策略，可选为：true（显示） | false（隐藏），默认值为false
            show : true,
            feature : {
                //辅助线标志
                mark : {show: true},
                //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能
//        dataView : {show: true, readOnly: false},
                //magicType，动态类型切换，支持直角系下的折线图、柱状图、堆积、平铺转换,'line', 'bar', 'stack', 'tiled'
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                //restore，还原，复位原始图表
                restore : {show: true},
                //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'
                savemsg : {show: true,
                    title : '保存图片',
                    icon : 'images/saveEcharts.png',
                    onclick : null
                },
                myTool : {
                    show : true,
                    title : '导出Excel',
                    icon : 'images/excel01.png',
                    onclick : null
                }
            }
        },
        legend: {
            data:[],
            y:"85%"
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                boundaryGap:true,
                data :[],
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
                name:'万吨' ,
                scale:false,
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
            },
            {
                type : 'value',
                name:'万吨' ,
                scale:false,
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
                }
            }
        ],
        series : [
            {
                name:"data1",
                type:"bar",
                data:[]
            }
        ]
    };
    return priceModel;
}
//获得价格数据
function firstLoading_priceDt(time,currency){
    var isFlag=false;  //seriesData是否有数据
    var tabType = $("#tabType").val();
    //国内价格和全球价格的tabCode值
    var productTabId1=$("#productTabId1").val();
    var productTabId2=$("#productTabId2").val();

    $("#priceDtTime").show();  //时间维度显示
    $("#day_priceDt").removeClass("wd_r");
    $("#week_priceDt").removeClass("wd_r");
    $("#month_priceDt").removeClass("wd_r");
    if(time=="day"){
        $("#day_priceDt").addClass("wd_r");
    }else if(time=="week"){
        $("#week_priceDt").addClass("wd_r");
    }else if(time=="month"){
        $("#month_priceDt").addClass("wd_r");
    }
    $("#wpbjSelect").hide();
    $("#priceSelect").hide();
    $("#timeControll").show();

    $("#wpbjDt").hide();
    $("#qiyeDt").hide();
    $("#priceDt").show();
    var startTime =  $("#startTime_price").val();
    var endTime =  $("#endTime_price").val();

    //掐头去尾
    var returnTime= getTimeDate(startTime,endTime,time);
    if(returnTime&&returnTime.status!="error"){
        startTime=returnTime.status;
        endTime=returnTime.info;
    }else if(returnTime&&returnTime.status=="error"){
        alert(returnTime.info);
        return false;

    }
    var ptId =  $("#ptId").val();
    myChart_priceDt = echarts.init(document.getElementById('tb_price_detail'));
    myChart_priceDt.clear();
    myChart_priceDt.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    $.ajax({
            type:"POST",
            dataType:"json",
            url:"getPriceDetailsData?time="+time+"&startTime="+startTime+"&endTime="+endTime+"&ptId="+ptId+"&productTabId1="+productTabId1+"&productTabId2="+productTabId2+"&currency="+currency+"&productCode="+$("#priceDetailsProductCode").val(),
            success:function(data){

                var height;
                //计算价格点图例的高度
                //多一行图例高度增加20px,超过3行开始算
                var ecPriceData=data.dayData;
                if(ecPriceData==undefined){
                    ecPriceData=data.weekData;
                }
                if(ecPriceData==undefined){
                    ecPriceData=data.monthData;
                }
                if( ecPriceData.seriesData.length>12){
                    var beishu=parseInt((ecPriceData.seriesData.length-12)/5);
                    height=30;
                    if( ecPriceData.seriesData.length%5!=0){
                        beishu=beishu+1;
                    }
                    height=height*beishu;
                    var oldHeight= 450;
                    $(".chart_box").height(oldHeight+height);
                }

                clearPaginationNoFields("tab_priceDt");  //去掉没用的事件
                    if(time=="day"){
                        priceData = data.dayData;
                        priceData.seriesData=getPermissionByTime2(DownloadInfo,priceData.seriesData,"PubDate","/",time);
                        timeFlagPriceDt = 1;
                    }else if(time=="week"){
                        priceData = data.weekData;
                        priceData.seriesData=getPermissionByTime2(DownloadInfo,priceData.seriesData,"PubDate","/",time);
                        timeFlagPriceDt = 2;
                    }else if(time=="month"){
                        priceData = data.monthData;
                        priceData.seriesData=getPermissionByTime2(DownloadInfo,priceData.seriesData,"PubDate","/",time);
                        timeFlagPriceDt = 3;
                    }
                for(var i=0;i<priceData.seriesData.length;i++){
                    if(priceData.seriesData[i]!=null){
                        myChart_priceDt.clear();
                        myChart_priceDt.showLoading({
                            text: '正在努力的读取数据中...',    //loading话术
                            effect: 'whirling'
                        });
                        isFlag=true;
                    }else{
                        isFlag=false;
                    }
                }

                if(isFlag==true){
                    dawEchartPriceDt(priceData,myChart_priceDt,tabType,height);
                    myChart_priceDt.hideLoading();
                }else{
                    myChart_priceDt.showLoading({
                        animation: false,
                        text: '暂无数据',
                        textStyle: {fontSize: 20, color: '#404040'},
                        effectOption: {backgroundColor: '#fefefe'}
                    });
                }

                 startTime = $("#startTime_price").val();
                 endTime = $("#endTime_price").val();
            }
        }
    );
}
//获得企业报价数据
function firstLoading_qiyeDt(type,ptId,time){
    $("#priceDt").hide();
    $("#wpbjDt").hide();
    $("#qiyeDt").show();
    $("#timeControll").hide();
    $("#priceSelect").show();
    $("#wpbjSelect").hide();
    $("#priceDtTime").hide();  //时间维度隐藏

    var startTime_qiye =  $("#startTime_qiye").val();
    var endTime_qiye =  $("#endTime_qiye").val();
//    startTime_qiye=startTime_qiye.replace(/-/g,'/');
//    endTime_qiye=endTime_qiye.replace(/-/g,'/');

    //掐头去尾
    var returnTime= getTimeDate(startTime_qiye,endTime_qiye,time);
    if(returnTime&&returnTime.status!="error"){
        startTime_qiye=returnTime.status;
        endTime_qiye=returnTime.info;
    }else if(returnTime&&returnTime.status=="error"){
        alert(returnTime.info);
        return false;

    }
    var priceProductCode=$("#priceDetailsProductCode").val();
    var filter = selectByCompanyName();
    myChart_qiyeDt = echarts.init(document.getElementById('qiyeDt'));
    myChart_qiyeDt.clear();
    myChart_qiyeDt.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    $.ajax({
            type:"POST",
            url:"priceQiyeAndWpbjDetail?filter="+filter+"&type="+type+"&ptId="+ptId+"&priceProductCode="+priceProductCode+"&startTime_qiye="+startTime_qiye+"&endTime_qiye="+endTime_qiye+"&ssid="+$("#priceDetails_ssid").val(),
            success:function(data){
                clearPaginationNoFields('qiyeDtTable'); //清除表格和分页
                $("#qiyeDt").html(data);
                if(qiyeDataSource==null){
                    $("#qiyeDtTable").nextAll().remove();
                    var html="<tr style='height:400px; top:35px; left:0; width:400px;'>" +
                        "<th colspan='7' style='text-align: center;font-size: 16px;'>无企业报价</th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "</tr>";
                    $("#qiyeDtTable").after(html);
                }else{
                    qiyeDetailsSort('',"PubDate",'qiyeDtTable');
                }
                myChart_qiyeDt.hideLoading();
            }
        }
    );
}

//获取外盘报价详情
function firstLoading_WpbjDt(type,ptId,time){
    $("#priceDt").hide();
    $("#qiyeDt").hide();
    $("#wpbjDt").show();
    $("#timeControll").hide();
    $("#priceSelect").hide();
    $("#wpbjSelect").show();
    $("#priceDtTime").hide();  //时间维度隐藏

    var startTime_wpbj =  $("#startTime_wpbj").val();
    var endTime_wpbj =  $("#endTime_wpbj").val();
    startTime_wpbj=startTime_wpbj.replace(/-/g,'/');
    endTime_wpbj=endTime_wpbj.replace(/-/g,'/');

    //掐头去尾
    var returnTime= getTimeDate(startTime_wpbj,endTime_wpbj,time);
    if(returnTime&&returnTime.status!="error"){
        startTime_wpbj=returnTime.status;
        endTime_wpbj=returnTime.info;
    }else if(returnTime&&returnTime.status=="error"){
        alert(returnTime.info);
        return false;

    }

    var priceProductCode=$("#priceDetailsProductCode").val();
    myChart_wpbjDt = echarts.init(document.getElementById('wpbjDt'));
    myChart_wpbjDt.clear();
    myChart_wpbjDt.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    $.ajax({
            type:"POST",
            url:"priceQiyeAndWpbjDetail?&type="+type+"&ptId="+ptId+"&priceProductCode="+priceProductCode+"&startTime_wpbj="+startTime_wpbj+"&endTime_wpbj="+endTime_wpbj+"&ssid="+$("#priceDetails_ssid").val(),
            success:function(data){
                clearPaginationNoFields('wpbjDtTable'); //清除表格和分页
                $("#wpbjDt").html(data);
                if(wpbjDataSource==null){
                    $("#wpbjDtTable").nextAll().remove();
                    var html="<tr style='height:400px; top:35px; left:0; width:400px;'>" +
                        "<th colspan='9'style='text-align: center;font-size: 16px;'>无外盘报价</th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "</tr>";
                    $("#wpbjDtTable").after(html);
                }else{
                    wppbjDetailsSort('',"PubDate",'wpbjDtTable');
                }

                myChart_wpbjDt.hideLoading();
            }
        }
    );
}


/**
 * 对数据源进行排序
 * @param array
 * @param field
 * @param order
 */
function qiyeDetailsSort(obj,field,name){
    var xMaxData = [];
    var xMinData = [];
    var startTime_qiye=$("#startTime_qiye").val();  //开始时间
    var endTime_qiye=$("#endTime_qiye").val();   //结束时间
    if(startTime_qiye==''&&endTime_qiye==''){
        if(qiyeDataSource.length>0){
            xMaxData = sortArray(qiyeDataSource,"PubDate","desc");
            xMinData = sortArray(qiyeDataSource,"PubDate","asc");
            startTime_qiye=xMinData[0]["PubDate"];  //开始时间
            endTime_qiye=xMaxData[0]["PubDate"];   //结束时间
            $("#startTime_qiye").datepicker('setDate',startTime_qiye);
            $("#endTime_qiye").datepicker('setDate',endTime_qiye);
        }
    }
    if(qiyeDataSource){
        if(obj=='' || obj==null){
        }else{
            var order = getSortOrder(obj);
            qiyeDataSource = sortArray(qiyeDataSource,field,order);
        }
        clearPaginationNoFields_out(name,"page_number_box01_qybj"); //清除表格和分页
        var priceProductCode=$("#priceProductCode").val();
        var filedArray;
        if(priceProductCode=='380-030' || priceProductCode=='380-060'){   //PE、PP
            filedArray=['PubDate','Location','Producer','OfferingCompany','quotoPrice','hightLows','UnitName','level_name','Note'];
        }else{
            filedArray=['PubDate','Location','Producer','OfferingCompany','quotoPrice','hightLows','UnitName','Note'];
        }
        loadInitPaginationData_qiyeDt(1,name,filedArray,qiyeDataSource);

        $(".page_number_box01_qybj").createPage({
            pageCount:qiyeDataSource.length,
            current:1,
            backFn:function(p){
                loadInitPaginationData_qiyeDt(p,name,filedArray,qiyeDataSource);
            }
        });
    }
    commonSort(obj);
}

//外盘报价数据排序
function wppbjDetailsSort(obj,field,name){
    var xMaxData = [];
    var xMinData = [];
    var startTime_wpbj=$("#startTime_wpbj").val();  //开始时间
    var endTime_wpbj=$("#endTime_wpbj").val();   //结束时间
    if(startTime_wpbj==''&&endTime_wpbj==''){
        if(wpbjDataSource.length>0){
            xMaxData = sortArray(wpbjDataSource,"PubDate","desc");
            xMinData = sortArray(wpbjDataSource,"PubDate","asc");
             startTime_wpbj=xMinData[0]["PubDate"];  //开始时间
             endTime_wpbj=xMaxData[0]["PubDate"];   //结束时间
            $("#startTime_wpbj").datepicker('setDate',startTime_wpbj);
            $("#endTime_wpbj").datepicker('setDate',endTime_wpbj);
        }
    }
    if(wpbjDataSource){
        if(obj=='' || obj==null){
        }else{
            var order = getSortOrder(obj);
            wpbjDataSource = sortArray(wpbjDataSource,field,order);
        }
        clearPaginationNoFields_out(name,"page_number_box01_wpbj"); //清除表格和分页
        var priceProductCode=$("#priceDetailsProductCode").val();
        var filedArray;
        if(priceProductCode=='380-030' || priceProductCode=='380-060'){   //PE、PP
            filedArray=['PubDate','level_name','ProducingArea','PriceTerm','quotoPrice','hightLows','Note'];
        }else{
            filedArray=['PubDate','level_name','company_name','ProducingArea','PriceTerm','quotoPrice','hightLows','Note'];
        }
        loadInitPaginationData_wpbjDt(1,name,filedArray,wpbjDataSource);
        $(".page_number_box01_wpbj").createPage({
            pageCount:wpbjDataSource.length,
            current:1,
            backFn:function(p){
                loadInitPaginationData_wpbjDt(p,name,filedArray,wpbjDataSource);
            }
        });
    }
    commonSort(obj);
}

//画echarts图
function dawEchartPriceDt(priceData,myChart_priceDt,tabType,height){
    if(loadingSize){
        option_priceDt = getPriceDtModel();
        if(height){
            option_priceDt.legend.y=390;//默认gird是300+图例和gird间距必须是90
        }
        var legendData = [];
    }
    var xData=[];
    xData = findTimeDate("PubDate", "AvgPrice", priceData.seriesData);
    var cnCode =  $("#toPriceDt").val();
    currData = priceData;
    var data = currData;
    var totalData=[];

    for(var z=0;z<data.legendData.length;z++){
        var array=[];
        var tempData=""; //用于补数据的前一条数据,接受第一条为空不补数据
        for(var i=0;i<xData.length;i++){
            if(i==0){ //第一条数据如果没有就不补数据
                tempData="-";
            }
            if(data.seriesData[z]){
                var value="";
                for(var j=0;j<data.seriesData[z].length;j++){
                    if(data.seriesData[z][j].PubDate==xData[i]){
                        if(data.seriesData[z][j].AvgPrice!="-"){
                            value= data.seriesData[z][j].AvgPrice;
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

        var legendName = data.legendData[z].Name;
//        if(cnCode==data.legendData[i].Code){
//           var codeName = data.legendData[i].Name;
//        }
//        for(var j=0;j<data.seriesData[i].length;j++){
//            if(i==0){
//                xData.push(data.seriesData[i][j].PubDate);
//            }
//            if(data.seriesData[i][j]&&data.seriesData[i][j].AvgPrice){
//                array.push((data.seriesData[i][j].AvgPrice));
//                tempData=  data.seriesData[i][j].AvgPrice
//            }else{
//               // array.push("-");
//                array.push(tempData);
//            }
//
//        }
//        var legendName = data.legendData[i].Name;
//        legendName = legendName.replace('(日估价)','');
//        legendName = legendName.replace('（日估价）','');
        var object={
            name:legendName,
            type:"line",
            data:array ,
            symbolSize: 0|0
        };
        var object2={
            name:legendName,
            type:"line",
            data:array ,
            symbolSize: 0|0,
            yAxisIndex:1
        };
        if(flagHL&&flagHL!=3){  //人民币美金转换
            if(flagHL==1){ //  美金转人民币
               totalData.push(object);
            }else if(flagHL==2){ //人民币转美金
                    totalData.push(object2);
            }

        }else{  //原始数据
            if(data.legendData[z].Currency=="1"){//人民币
                totalData.push(object);
            }else{ //2美元
                totalData.push(object2);
            }
        }

    }
    if(loadingSize){
        for(var i=0;i<data.legendData.length;i++){
            if(data.legendData[i].PriceType!="4"){
                var legendName = data.legendData[i].Name;
                legendName = legendName.replace('(日估价)','');
                legendName = legendName.replace('（日估价）','');
                legendData.push(legendName);
            }
        }
        legendData.push("");
        for(var i=0;i<data.legendData.length;i++){
            if(data.legendData[i].PriceType=="4"){
                var legendName = data.legendData[i].Name;
                legendName = legendName.replace('(日估价)','');
                legendName = legendName.replace('（日估价）','');
                legendData.push(legendName);
            }
        }
        option_priceDt.legend.data=legendData;
        option_priceDt.yAxis[0].scale=true;
        option_priceDt.yAxis[1].scale=true;
        option_priceDt.yAxis[0].name='元/吨';
        option_priceDt.yAxis[1].name='美元/吨';
        option_priceDt.xAxis[0].boundaryGap=false;
    }
    if(loadingSize){

        if(tabType=='uuu_price'){ //国内价格
            if(jQuery.isEmptyObject(priceDetailsLegend)){   //如果没有选择，则默认选中
                //国内价格没选中,只显示国内价格，不显示全球价格
                for(var g=0;g<data.legendData1.length;g++){
                    var gNameNone = data.legendData1[g].Name;
                    if(gNameNone!=""){
                        selectedPriceDt[gNameNone] =true;
                    }
                }
                for(var h=0;h<data.legendData2.length;h++){
                    var hNameNone = data.legendData2[h].Name;
                    if(hNameNone!=""){
                        selectedPriceDt[hNameNone] =false;
                    }
                }
            }else{
                //全球价格选中了，只显示选中的价格
                for(var c=0;c<data.legendData.length;c++){
                    var name = data.legendData[c].Name;
                     for(var a=0;a<priceDetailsLegend.length;a++){
                         if($.inArray(name,priceDetailsLegend)!=-1){
                             selectedPriceDt[name] =true;
                         }else{
                             selectedPriceDt[name] =false;
                         }
                    }
                }
            }
        }else if(tabType=='unchina_price'){  //全球价格
            if(jQuery.isEmptyObject(priceDetailsLegend)){   //如果没有选择，则默认选中
                //全球价格没选中，只显示全球价格，不显示国内价格
                for(var q=0;q<data.legendData2.length;q++){
                    var qNameNone = data.legendData2[q].Name;
                    if(qNameNone!=""){
                        selectedPriceDt[qNameNone] =true;
                    }
                }
                for(var x=0;x<data.legendData1.length;x++){
                    var xNameNone = data.legendData1[x].Name;
                    if(xNameNone!=""){
                        selectedPriceDt[xNameNone] =false;
                    }
                }
            }else{
                //全球价格选中了，只显示选中的价格
                for(var c=0;c<data.legendData.length;c++){
                    var name = data.legendData[c].Name;
                    for(var a=0;a<priceDetailsLegend.length;a++){
                        if($.inArray(name,priceDetailsLegend)!=-1){
                            selectedPriceDt[name] =true;
                        }else{
                            selectedPriceDt[name] =false;
                        }
                    }
                }

            }
        }

        option_priceDt.legend.selected = selectedPriceDt;

        if(priceDetailsLegend &&! jQuery.isEmptyObject(priceDetailsLegend)){
            $.each(selectedPriceDt,function(name,value) {
                $.each(priceDetailsLegend,function(name2,value2) {
                    if(name==name2){
                        selectedPriceDt[name]=priceDetailsLegend[name2];
                    }
                });


            });

            option_priceDt.legend.selected = selectedPriceDt;

        }else{
            option_priceDt.legend.selected = selectedPriceDt;
        }

    }  else{
        option_priceDt.legend.selected = priceDetailsLegend;
    }
    if(loadingSize==1){
        var startTime = xData[0];
        var endTime = xData[(xData.length-1)];
        if(startTime.length<=7){
            startTime = startTime+'/01';
        }
        if(endTime.length<=7){
            endTime = endTime+'/01';
        }
        $("#startTime_price").datepicker('setDate',startTime);
        $("#endTime_price").datepicker('setDate',endTime);
    };
    option_priceDt.xAxis[0].data=xData;
    option_priceDt.series=totalData;
    option_priceDt.toolbox.feature.myTool.onclick=function(){
        $("#fileName").val('价格');
        $("#priceUrl").val('array');
        var titleName=[["日期","类型","均价","单位"]];
        var sheetName=["价格"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        if(DownloadInfo==1){
            alert("您尚未开通下载Excel权限!");
            return;
        }else {
            var array=[dataSource];
            $("#excelArray").val(JSON.stringify(array));
            $('#priceDetailExport').submit() ;

        }

    }  ;
    option_priceDt.toolbox.feature.savemsg.onclick=function(){
      exportEchatsImg(myChart_priceDt,"价格",option_priceDt);
    }  ;
    myChart_priceDt.setOption(option_priceDt,true);
    window.addEventListener("resize", function () {
        myChart_priceDt.resize();
    });
    getTabPriceDt(myChart_priceDt,data,option_priceDt);
    loadingSize = loadingSize+1;
}


//根据日期搜索
function getNowTime_price(){
    if(flagHL){
        if(timeFlagPriceDt==1){
            firstLoading_priceDt('day',flagHL);
        }else if(timeFlagPriceDt==2){
            firstLoading_priceDt('week',flagHL);
        }else if(timeFlagPriceDt==3){
            firstLoading_priceDt('month',flagHL);
        }
    }else{
        if(timeFlagPriceDt==1){
            firstLoading_priceDt('day');
        }else if(timeFlagPriceDt==2){
            firstLoading_priceDt('week');
        }else if(timeFlagPriceDt==3){
            firstLoading_priceDt('month');
        }
    }

    ga('send', 'event', {
        'eventCategory': '搜索',
        'eventAction': '价格详情搜索'
    });

}
//绘制表格
function getTabPriceDt(myChart_priceDt,data,option_priceDt){
    dataSource=[];
    var pubDate;
    var codeName;
    var priceUnit;
    var avgPrice;
    var minPrice;
    var maxPrice;
    for(var i=0;i<option_priceDt.series.length;i++){
        if(option_priceDt.legend.selected[option_priceDt.series[i].name]==true){
            for(var j=0;j<option_priceDt.xAxis[0].data.length;j++){
                //拿到x轴日期，根据日期里面的每个时间去真实的数据源去取相应的数据
                var flag=false;//是否找到日期
                for(var z=0;z<data.seriesData[i].length;z++){
                       if(data.seriesData[i]&&data.seriesData[i][z].PubDate==option_priceDt.xAxis[0].data[j]){
                           pubDate = option_priceDt.xAxis[0].data[j];
                            codeName = data.seriesData[i][z].CodeName;
                            avgPrice =data.seriesData[i][z].AvgPrice;
                           minPrice = data.seriesData[i][z].MinPrice;
                           maxPrice = data.seriesData[i][z].MaxPrice;
                            if(data.seriesData[i][z].Currency=="1"){
                                priceUnit = "元/吨"
                            }else if(data.seriesData[i][z].Currency=="2"){
                                priceUnit = "美元/吨"
                            }else{
                                priceUnit = ""
                            }
                             dataSource.push([pubDate,codeName,avgPrice,priceUnit]);
                             flag=true;
                       }
                }
                if(flag==false){
                   // console.log(pubDate+"===="+avgPrice+"==="+minPrice+"==="+maxPrice);
                   // dataSource.push([ option_priceDt.xAxis[0].data[j],codeName,minPrice,maxPrice,avgPrice,priceUnit]);
                }
            }
//        for(var j=0;j<option_priceDt.series[i].data.length;j++){
//                pubDate = data.seriesData[i][j].PubDate;
//                codeName = data.seriesData[i][j].CodeName;
//                codeName = codeName.replace('(日估价)','');
//                codeName = codeName.replace('（日估价）','');
//                minPrice = data.seriesData[i][j].MinPrice;
//                maxPrice = data.seriesData[i][j].MaxPrice;
//                avgPrice = data.seriesData[i][j].AvgPrice;
//                if(data.seriesData[i][j].Currency=="1"){
//                    priceUnit = "元/吨"
//                }else if(data.seriesData[i][j].Currency=="2"){
//                    priceUnit = "美元/吨"
//                }else{
//                    priceUnit = ""
//                }
//           dataSource.push([pubDate,codeName,minPrice,maxPrice,avgPrice,priceUnit]);
//        }
        }
    }
    dataSource= sortArray(dataSource,0,'desc');
    initPagination('tab_priceDt',dataSource.length);
    bandLegendClick(myChart_priceDt,data,option_priceDt);
    //priceDetailsSort(this,0);
}
//图例点击触发的方法
function bandLegendClick(myChart_priceDt,data,option_priceDt){
    var ecConfig = echarts.config.EVENT;
    myChart_priceDt.on(ecConfig.LEGEND_SELECTED,function(param){
        priceDetailsLegend=param.selected;
        selectedPriceDt=priceDetailsLegend;
        clickRefreshTable(param.selected,data,param.target,option_priceDt)
        ga('send', 'event', {
            'eventCategory':param['target']+'Legend图例选中',
            'eventAction': '价格详情'
        });
    });
}
//点击图例或者取消图例刷新表格数据
function clickRefreshTable(names,data,target,option_priceDt){
    dataSource=[];
    var first=[];
    var priceUnit;
    var pubDate;
    var codeName;
    var avgPrice;
    var minPrice;
    var maxPrice;
    $("#tab_priceDt").nextAll().remove();
    $.each(names,function(name,value) {
        if(value==true){
            for(var i=0;i<option_priceDt.series.length;i++){
//                name = name.replace('(日估价)','');
//                name = name.replace('（日估价）','');
//                var serieName = option_priceDt.series[i].name;
//                serieName = serieName.replace('(日估价)','');
//                serieName = serieName.replace('（日估价）','');
//                    if(name==serieName){
//                        for(var j=0;j<option_priceDt.series[i].data.length;j++){
//
//                        if(data.seriesData[i][j].Currency=="1"){
//                            priceUnit = "元/吨"
//                        }else if(data.seriesData[i][j].Currency=="2"){
//                            priceUnit = "美元/吨"
//                        }else{
//                                priceUnit = ""
//                            }
//                        if(target==name){
//                            dataSource.unshift([data.seriesData[i][j].PubDate,name,data.seriesData[i][j].MinPrice,data.seriesData[i][j].MaxPrice,data.seriesData[i][j].AvgPrice,priceUnit]);
//                        }else{
//                            dataSource.unshift([data.seriesData[i][j].PubDate,name,data.seriesData[i][j].MinPrice,data.seriesData[i][j].MaxPrice,data.seriesData[i][j].AvgPrice,priceUnit]);
//                        }
//                        }
//                    }
//
                if(name== option_priceDt.series[i].name){
                for(var j=0;j<option_priceDt.xAxis[0].data.length;j++){
                    //拿到x轴日期，根据日期里面的每个时间去真实的数据源去取相应的数据
                    var flag=false;//是否找到日期
                    for(var z=0;z<data.seriesData[i].length;z++){
                        if(data.seriesData[i]&&data.seriesData[i][z].PubDate==option_priceDt.xAxis[0].data[j]){
                            pubDate = option_priceDt.xAxis[0].data[j];
                            codeName = data.seriesData[i][z].CodeName;
                            avgPrice =data.seriesData[i][z].AvgPrice;
                           // minPrice = data.seriesData[i][z].MinPrice;
                           // maxPrice = data.seriesData[i][z].MaxPrice;
                            if(data.seriesData[i][z].Currency=="1"){
                                priceUnit = "元/吨"
                            }else if(data.seriesData[i][z].Currency=="2"){
                                priceUnit = "美元/吨"
                            }else{
                                priceUnit = ""
                            }
                            dataSource.push([pubDate,codeName,avgPrice,priceUnit]);
                            flag=true;
                        }
                    }
                    if(flag==false){
                        // console.log(pubDate+"===="+avgPrice+"==="+minPrice+"==="+maxPrice);
                       // dataSource.push([ option_priceDt.xAxis[0].data[j],codeName,minPrice,maxPrice,avgPrice,priceUnit]);
                    }
                }
                }
           }
        }
    });
    Array.prototype.unshift.apply(dataSource,first);
    dataSource=sortArray(dataSource,0,"desc");
    clearPagination('tab_priceDt'); //清除表格和分页
    //initPagination('tab_priceDt',dataSource.length);
}
//对数据源进行排序
function priceDetailsSort(obj,field){
    var order = getSortOrder(obj);
    dataSource= sortArray(dataSource,field,order);
    clearPagination('tab_priceDt'); //清除表格和分页
    initPagination('tab_priceDt',dataSource.length);
    commonSort(obj);
}

//人民币与美元切换
function changeToUSA(type){
    var time=$("#timeType").val();
    flagHL=type;
    if(flagHL==1){//美元转人民币
            firstLoading_priceDt(time,1);

    }else if(flagHL==2){ //人民币转美金
        firstLoading_priceDt(time,"2");

    }else if(flagHL==3){ //标准
        firstLoading_priceDt(time,3);

    }
}
//根据企业名称筛选
function selectByCompanyName(){
    var filterjson = {};
    var producerJson = {};
    var bjJson = {};
    var filter = "";
    var producer = $("#companyName").val();
    if(producer!=null&&producer!=""){
        producerJson.LeftPart = "Producer";
        producerJson.RightPart = "'%"+producer+"%'";
        producerJson.Mode = 6;
        bjJson.LeftPart = "OfferingCompany";
    	bjJson.RightPart = "'%"+producer+"%'";
    	bjJson.Mode = 6;
    	filterjson.LeftPart = JSON.stringify(producerJson);
		filterjson.RightPart = JSON.stringify(bjJson);
		filterjson.Mode = 10;
    }
    filter = JSON.stringify(filterjson);
    filter =  encodeURI(encodeURI(filter));
    return filter;
}
