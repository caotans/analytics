var priceLegend = {}; //选中的图例
var priceCurrArray;
var priceData;
var priceDataFlag;  //拿图表数据的状态标志
var chartFlag_price = 1;//图 表 标志 1为表 2为echarts图
var myChart_price;
var price_option;

//tab页的切换，国内、全球、企业、外盘
function priceAnalysisChange(productTabId,type,allType, allName) {
    priceDataFlag=type;
    $("#priceTime").val(allType.split(",")[0]);
    $("#priceProductTabId").val(productTabId);
    $("#defaultPriceTab").val(type);
    $("#tabType").val(type);
    //tab页
    $("li[id^='analysis_price_']").each(function(i,element){
        var id=$(element).attr("id");
        if("analysis_price_"+type==id){
            $("#"+id).attr("class","china selected") ;
        } else{
            $("#"+id).attr("class","china");
        }
    });

    //维度信息
    if (allType) {
        $("#defaultPriceTime").val(allType.split(",")[0]);
        var html = "";
        //切换为图和切换为表
        if(type=='uuu_price' || type=='unchina_price'){   //国内价格和全球价格
            html+="<div class='qh_box'  onclick=\"chartTableChange();\"> <a id='changToChart'>切换为图</a></div>";
        }
        var time = allType.split(",");
        if(time!="-"){
            html+="<div class='day_box'>";
            for (var i = 0; i < time.length; i++) {
                var id =time[i]+"_price";
                var name = allName.split(",")[i];
                if (i == 0) {
                    html += "<span class='day_forecast' id='" + id + "' onclick=\'timeChange_price(\"" + id + "\",\"" + type + "\");\'><a>" + name + "</a></span>";
                } else {
                    html += "<span class='china' id='" + id + "' onclick=\'timeChange_price(\"" + id+ "\",\"" + type + "\");\'><a>" + name + "</a></span>";
                }
            }
            html+="</div>";
        }
        $("#analysis_Price").html(html);
    }
    //查询数据
    fistLoading_price(priceDataFlag,type,'');

}

//日周月时间维度的切换（timeFlag：1为日，2为周，3为月）
function timeChange_price(timeFlag,type) {
    if (timeFlag == 'day_price') {
        $("#priceTime").val('day');
        $("#day_price").addClass("day_forecast");
        $("#week_price").removeClass("day_forecast");
        $("#month_price").removeClass("day_forecast");
        fistLoading_price(priceDataFlag,type,'');
    } else if (timeFlag == 'week_price') {
        $("#priceTime").val('week');
        $("#day_price").removeClass("day_forecast");
        $("#week_price").addClass("day_forecast");
        $("#month_price").removeClass("day_forecast");
        fistLoading_price(priceDataFlag,type,'');
    } else if (timeFlag == 'month_price') {
        $("#priceTime").val('month');
        $("#day_price").removeClass("day_forecast");
        $("#week_price").removeClass("day_forecast");
        $("#month_price").addClass("day_forecast");
        fistLoading_price(priceDataFlag,type,'');
    }
}

//页面加载时接收相关数据
function fistLoading_price(type,flag,CodeName) {
    $.ajax({
        type: "POST",
        url: "analysisPriceUrl?type="+type+"&time="+$("#priceTime").val()+ "&productTabId=" + $("#priceProductTabId").val()+"&priceProductCode="+$("#priceProductCode").val(),
        success: function (data) {
            if(flag=='gnChart' || flag=='gwChart'){ //国内画图、国外画图
                $("#changToChart").html("切换为表");
                $("#analysis_nation_price").empty();
                $("#tb_price").show();
                $("#tb_price").html(data);
            }else{
                $("#changToChart").html("切换为图");
                $("#tb_price").empty();
                $("#analysis_nation_price").show();
                $("#analysis_nation_price").html(data);
            }

        }

    });
}


//排序方法
function sort_price(obj, field, type,CodeName) {
    var order = commonSort2(obj);
    priceCurrArray = sortArray(priceCurrArray, field, order);
    if(type=='uuu_price'){
        createDomesticPriceTable(priceCurrArray);
    }else if(type=='unchina_price'){
        createAbroadPriceTable(priceCurrArray);
    }else if(type=='qiye_price'){
        createQiyePriceTable(priceCurrArray);
    }else if(type=='wpbj'){
        createWpbjPriceTable(priceCurrArray);
    }

}

//国内价格
function createDomesticPriceTable(priceCurrArray){
    var html="";
    for (var i = 0; i < priceCurrArray.length; i++) {
        if (priceCurrArray[i].avgChange == '-') {
            priceCurrArray[i].avgChange = 0;
        }
        if(i%2==0){
             html+="<tr class='tb_content'>";
        }else{
              html+="<tr>";
        }
        html+="<th style='width:4%;'>";
        if(i<2){
            html+="<input type='checkbox' checked name='priceCheckboxName' value='"+priceCurrArray[i].CodeName+"'>";
        }else{
            html+="<input type='checkbox' disabled name='priceCheckboxName' value='"+priceCurrArray[i].CodeName+"'>";
        }
         html+="</th>";
         html+="<th style='width:24%;'>"+priceCurrArray[i].PubDate+"</th>";
         html+=" <th style='width:24%;'>"+priceCurrArray[i].CodeName+"</th>";
         html+="<th style='width:24%;'>";
          if(priceCurrArray[i].avgChange<0){
               html+="   <span style='color:#00c533;'>"+priceCurrArray[i].avgChange+"</span>";
          }else if(priceCurrArray[i].avgChange==0){
               html+=" <span>"+priceCurrArray[i].avgChange+"</span>";
          }else if(priceCurrArray[i].avgChange>0){
             html+="<span style='color:#ff0000;'>"+ "+"+priceCurrArray[i].avgChange+"</span>";
            }
         html+="</th>";
         html+="  <th style='width:24%;'>元/"+priceCurrArray[i].Name+"</th>";
         html+=" </tr>";

    }
      $("#domestic_price").html(html);
}

//全球价格
function createAbroadPriceTable(priceCurrArray){
    var html="";
    for (var i = 0; i < priceCurrArray.length; i++) {
        if (priceCurrArray[i].avgChange == '-') {
            priceCurrArray[i].avgChange = 0;
        }
        if(i%2==0){
            html+="<tr class='tb_content'>";
        }else{
            html+="<tr>";
        }
        html+="<th style='width:4%;'>";
        if(i<2){
            html+="<input type='checkbox' checked name='priceCheckboxName' value='"+priceCurrArray[i].CodeName+"'>";
        }else{
            html+="<input type='checkbox' disabled name='priceCheckboxName' value='"+priceCurrArray[i].CodeName+"'>";
        }
        html+="</th>";
        html+="<th style='width:24%;'>"+priceCurrArray[i].PubDate+"</th>";
        html+=" <th style='width:24%;'>"+priceCurrArray[i].CodeName+"</th>";
        html+="<th style='width:24%;'>";
        if(priceCurrArray[i].avgChange<0){
            html+="<span style='color:#00c533;'>"+priceCurrArray[i].avgChange+"</span>";
        }else if(priceCurrArray[i].avgChange==0){
            html+=" <span>"+priceCurrArray[i].avgChange+"</span>";
        }else if(priceCurrArray[i].avgChange>0){
            html+="<span style='color:#ff0000;'>"+ "+" +priceCurrArray[i].avgChange+"</span>";
        }
        html+="</th>";
        html+="  <th style='width:24%;'>元/"+priceCurrArray[i].Name+"</th>";
        html+=" </tr>";

    }
    $("#abroad_price").html(html);
}

//企业价格
function createQiyePriceTable(priceCurrArray){
    var html="";
    var priceProductCode=$("#priceProductCode").val();
    var settlementPrice;
    for (var i = 0; i < priceCurrArray.length; i++) {
        if (priceCurrArray[i].minChange == '-') {
            priceCurrArray[i].minChange = 0;
        }
        if (priceCurrArray[i].maxChange == '-') {
            priceCurrArray[i].maxChange = 0;
        }
        if(priceProductCode=='380-030' || priceProductCode=='380-060'){  //PE 、PP
        }else{
            settlementPrice='<td>'+priceCurrArray[i].SettlementPrice+'</td>';
        }
        if(i%2==0){
            html+="<tr class='tb_content'>";
        }else{
            html+="<tr>";
        }
        html+="<td>"+priceCurrArray[i].PubDate+"</td>";
        html+="<td>"+priceCurrArray[i].Location+"</td>";
        html+="<td>"+priceCurrArray[i].Producer+"</td>";
        html+="<td>"+priceCurrArray[i].OfferingCompany+"</td>";
        html+="<td>"+priceCurrArray[i].MaxPrice+"-"+priceCurrArray[i].MinPrice+"</td>";
        html+=settlementPrice;
        html+="<td>";
        if(priceCurrArray[i].minChange<0){
            html+="   <span style='color:#00c533;'>"+priceCurrArray[i].minChange+"/"+priceCurrArray[i].maxChange+"</span>";
        }else if(priceCurrArray[i].minChange==0){
            html+=" <span>"+priceCurrArray[i].minChange+"/"+priceCurrArray[i].maxChange+"</span>";
        }else if(priceCurrArray[i].minChange>0){
            html+="<span style='color:#ff0000;'>"+priceCurrArray[i].minChange+"/"+priceCurrArray[i].maxChange+"</span>";
        }
        html+="</td>";
        html+="<td>元/吨</td>";
        html+="<td>"+priceCurrArray[i].Note+"</td>";
        html+=" </tr>";

    }
    $("#price_qiye").html(html);
}

//外盘报价
function createWpbjPriceTable(priceCurrArray){
    var html="";
    for (var i = 0; i < priceCurrArray.length; i++) {
        if (priceCurrArray[i].minChange == '-') {
            priceCurrArray[i].minChange = 0;
        }
        if (priceCurrArray[i].maxChange == '-') {
            priceCurrArray[i].maxChange = 0;
        }
        if(i%2==0){
            html+="<tr class='tb_content'>";
        }else{
            html+="<tr>";
        }
        html+="<td>"+priceCurrArray[i].PubDate+"</td>";
        html+="<td>"+priceCurrArray[i].level_name+"</td>";
        html+="<td>"+priceCurrArray[i].ProducingArea+"</td>";
        html+="<td>"+priceCurrArray[i].PriceTerm+"</td>";
        html+="<td>"+priceCurrArray[i].MaxPrice+"-"+priceCurrArray[i].MinPrice+"</td>";
        html+="<td>";
        if(priceCurrArray[i].minChange<0){
            html+="   <span style='color:#00c533;'>"+priceCurrArray[i].minChange+"/"+priceCurrArray[i].maxChange+"</span>";
        }else if(priceCurrArray[i].minChange==0){
            html+=" <span>"+priceCurrArray[i].minChange+"/"+priceCurrArray[i].maxChange+"</span>";
        }else if(priceCurrArray[i].minChange>0){
            html+="<span style='color:#ff0000;'>"+priceCurrArray[i].minChange+"/"+priceCurrArray[i].maxChange+"</span>";
        }
        html+="</td>";
        html+="<td>"+priceCurrArray[i].Note+"</td>";
        html+=" </tr>";

    }
    $("#price_wpbj").html(html);
}

//图表切换
function chartTableChange() {
    priceLegend = null;
    var ls = window.localStorage;
    var codeName=[];
    $('input[name="priceCheckboxName"]:checked').each(function(){
        var priceName=$(this).val();
        codeName.push(priceName);
    });
    ls.setItem("CodeName", JSON.stringify(codeName));

    if (priceDataFlag == 'uuu_price') {
        fistLoading_price('gnChart','gnChart','');
        priceDataFlag = 'gnChart';
    } else if (priceDataFlag == 'unchina_price') {
        fistLoading_price('gwChart','gwChart','');
        priceDataFlag = 'gwChart';
    } else if (priceDataFlag == 'gnChart') {
        fistLoading_price('uuu_price','uuu_price','');
        priceDataFlag = 'uuu_price';
    } else if (priceDataFlag == 'gwChart') {
        fistLoading_price('unchina_price','unchina_price','');
        priceDataFlag = 'unchina_price';
    }
}

//页面加载时画图
function dawPriceEchart(data, myChart_price, tab, CodeName) {
    if (tab == 'guonei') {
        price_option = getOption_price(1);
    } else if (tab == 'guowai') {
        price_option = getOption_price(2);
    }

    //解析后台的数据
    var legendData = [];
    var totalData = [];
    var xData = [];
    xData = findTimeDate("PubDate", "AvgPrice", data.seriesData);
    var tempData;//记录前一条数据，用来补没有的数据
    var startTime = xData[0];
    if (startTime.length <= 7) {
        startTime = startTime + "/01"
    }
    var endTime = xData[(xData.length - 1)];
    if (endTime.length <= 7) {
        endTime = endTime + "/01";
    }
    $("#startTime").val(startTime);
    $("#endTime").val(endTime);
    var temp = {};
    for (var z = 0; z < data.legendData.length; z++) {
        var legendName = data.legendData[z].Name;
        legendName = legendName.replace('(日估价)', '');
        legendName = legendName.replace('（日估价）', '');
        //legendData.push(legendName);

        for(var index=0;index<CodeName.length;index++){
            if(legendName != CodeName[index]){continue;}
            if(index==CodeName.length-1&&legendName != CodeName[index]){break;}
            if (legendName == CodeName[index]) {
                temp[legendName] = true;
                legendData.push(legendName);
                var array = [];
                for (var i = 0; i < xData.length; i++) {
                    if (data.seriesData[z]) {
                        var value = 0;
                        for (var j = 0; j < data.seriesData[z].length; j++) {
                            if (data.seriesData[z][j].PubDate == xData[i]) {
                                value = data.seriesData[z][j].AvgPrice;
                                tempData=value;
                            }
                        }
                        if (value == 0) {
                            //array.push("-");
                            array.push(tempData);
                        } else {
                            array.push(value);
                        }
                    }
                }
                //显示复选框选中的
            } else {
                temp[legendName] = false;
                continue;
            }


            var object = {
                name: legendName,
                type: "line",
                data: array,
                symbolSize: 0 | 0
            };
            var object2 = {
                name: legendName,
                type: "line",
                data: array,
                symbolSize: 0 | 0,
                yAxisIndex: 1
            };
            if (tab == 'guonei') {
                if (data.legendData[z].Currency == "1") {//人民币
                    totalData.push(object);
                } else { //2美元
                    totalData.push(object2);
                }
            } else if (tab == 'guowai') {
                totalData.push(object);
            }

        }

    }
    if (CodeName) {
        priceLegend = temp;
    }
    price_option.xAxis[0].boundaryGap = false;
    price_option.xAxis[0].data = xData;
    price_option.legend.data = legendData;
    price_option.series = totalData;
    if (priceLegend) {
        price_option.legend.selected = priceLegend;
    }

    myChart_price.setOption(price_option, true);
    var ecConfig = echarts.config.EVENT;
    myChart_price.on(ecConfig.LEGEND_SELECTED, function (param) {
        priceLegend = param.selected;
    });
}

//模板
function getOption_price(flag) {
    var mould_option2 = {
        title: {
            x: 'center'
        },
        grid: {
            borderColor: 'white',
            x: '8%',
            y: '10%',
            x2: '8%',
            y2: '25%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'dotted',
                    color: '#a3a3a3'
                }
            }
//            position : function(p){   //其中p为当前鼠标的位置
//                return [p[0] + 10, p[1] + 10];
//            }
        },
        legend: {
            data: [],
            y: "85%"
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                boundaryGap: true,
                data: [],
                axisLabel: {
                    textStyle: {
                        color: '#a3a3a3'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#a3a3a3'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#a3a3a3'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '元/吨',
                scale: true,
                axisLabel: {
                    formatter: null,
                    textStyle: {
                        color: '#a3a3a3'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#a3a3a3'
                    }
                }
            },
            {
                type: 'value',
                name: '美元/吨',
                scale: true,
                axisLabel: {
                    textStyle: {
                        color: '#a3a3a3'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#a3a3a3'
                    }
                }
            }
        ],
        series: [
            {
                name: "data1",
                type: "bar",
                data: []
            }
        ]
    };
    var mould_option = {
        title: {
            x: 'center'
        },
        grid: {
            borderColor: 'white',
            x: '8%',
            y: '10%',
            x2: '8%',
            y2: '25%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'dotted',
                    color: '#a3a3a3'
                }
            }
        },
        legend: {
            data: ['0'],
            y: "85%"
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                boundaryGap: true,
                data: ['0'],
                axisLabel: {
                    textStyle: {
                        color: '#a3a3a3'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#a3a3a3'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#a3a3a3'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '美元/吨',
                scale: true,
                axisLabel: {
                    textStyle: {
                        color: '#a3a3a3'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#a3a3a3'
                    }
                }
            }
        ],
        series: [
            {
                name: "data1",
                type: "bar",
                data: [0]
            }
        ]
    };
    if (flag == 1) {
        return  mould_option2;
    } else if (flag == 2) {
        return   mould_option;
    }
}


//链接到详情页时传参
function getCNCode(productCode) {

    //国内价格和全球价格的tabCode值
    var productTabId1 = $("#analysis_price_uuu_price").val();
    var productTabId2 = $("#analysis_price_unchina_price").val();

    var pmmark = $(".product01").attr("prdcode");

    var cnCode = $("#priceCNCode").val();
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var tabType = $("#tabType").val();
    var time = $("#priceTime").val();
    var productTabId = $("#priceProductTabId").val();
    var priceModuleId = $("#priceModuleId").val();
    var ls = window.localStorage;
    ls.setItem("priceDetailsLegend", JSON.stringify(priceLegend));
    window.location.href = "priceDetails?cnCode=" + cnCode + "&startTime=" + startTime + "&endTime=" + endTime + "&tabType=" + tabType + "&time=" + time + "&productTabId=" + productTabId + "&priceModuleId=" + priceModuleId + "&pmmark=" + pmmark + "&productTabId1=" + productTabId1 + "&productTabId2=" + productTabId2+"&productCode="+productCode;
}

