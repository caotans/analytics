function initPriceTime(allType, allName,tabName) {
    $("#restseldiv").hide();
    if (allType) {
        var html = "";
        var time = allType.split(",");
        $("#defaultPriceTime").val(allType.split(",")[0]);
        for (var i = 0; i < time.length; i++) {
            var id = time[i] + "_price";
            var pTime = i + 1;
            var name = allName.split(",")[i];
            if (i == 0) {
                html += "<span class='day_forecast' id='" + id + "' onclick=\'timeChange_price(\"" + id + "\",\"" + name + "\",\"" + tabName + "\");\'><a>" + name + "</a></span>";
            } else {
                html += "<span class='china' id='" + id + "' onclick=\'timeChange_price(\"" + id + "\",\"" + name + "\",\"" + tabName + "\");\'><a>" + name + "</a></span>";
            }

        }
        $("#time_price").html(html);
    }
}

var priceLegend = {}; //选中的图例
var priceCurrArray;
var priceCurrData;
var data_priceQiyeArray = []; //企业报价

var priceDataFlag = 'priceTabGn';  //拿图表数据的状态标志

var chartFlag_price = 1;//图 表 标志 1为表 2为echarts图

var myChart_price;

var price_option;
var legendsize;
var priceData;
var codenameArr = [];   //选中的值
var codeIdArr = [];   //欧元的值
//页面加载时接收相关数据
function fistLoading_price(type, CodeName, productTabId) {
    //样式的隐藏与展示
    $("#domestic_price").hide();
    $("#abroad_price").hide();
    $("#table-container").hide();
    $("#wpbj-price-container").hide();
    $("#changToTable").hide();
    $("#changToChart").hide();
    if (type == 'priceTabGn') {     //国内价格
        $("#changToChart").show();
    } else if (type == 'priceTabGw') {   //全球价格
        $("#changToChart").show();
    } else if (type == 'gnChart') {     //国内价格，却换为图
        $("#changToTable").show();
    } else if (type == 'gwChart') {     //全球价格，却换为图
        $("#changToTable").show();
    }
    var time = $("#priceTime").val();
    $("#tb_price").show();
    myChart_price = echarts.init(document.getElementById('tb_price'));
    myChart_price.clear();
    myChart_price.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    $.ajax({
            type: "POST",
            dataType: "json",
            url: "getPrice?type=" + type + "&time=" + time + "&productTabId=" + productTabId,
            success: function (data) {
                if (type == 'priceTabGn') { //国内价格
                    if (time == 'day') {
                        priceData = data.dayArray_price;
                    } else if (time == 'week') {
                        priceData = data.weekArray_price;
                    } else if (time == 'month') {
                        priceData = data.monthArray_price;
                    }
                    priceCurrArray = priceData;
                    writingToPrice(priceData, type, productTabId);
                } else if (type == 'priceTabGw') {  //全球价格
                    if (time == 'day') {
                        priceData = data.dayArray_price;
                    } else if (time == 'week') {
                        priceData = data.weekArray_price;
                    } else if (time == 'month') {
                        priceData = data.monthArray_price;
                    }
                    priceCurrArray = priceData;
                    writingToPrice(priceData, type, productTabId);
                } else if (type == 'qiyeTab') { //企业报价
                    priceData = data.dayArray_price;
                    priceCurrArray = priceData;
                    writingToPrice(priceData, type, productTabId);
                    var ls = window.localStorage;
                    ls.setItem("data_priceQiyeArray", JSON.stringify(priceData));
                    var xMaxData = [];
                    var xMinData = [];
                    xMaxData = sortArray(priceData,"PubDate","desc");
                    xMinData = sortArray(priceData,"PubDate","asc");
                    var startTime_qiye=xMinData[0]["PubDate"];  //开始时间
                    var endTime_qiye=xMaxData[0]["PubDate"];   //结束时间
                    $("#startTime_qiye").val(startTime_qiye);
                    $("#endTime_qiye").val(endTime_qiye);
                } else if (type == 'wpbjTab') {   //外盘报价
                    priceData = data.dayArray_price;
                    priceCurrArray = priceData;
                    writingToPrice(priceData, type, productTabId);
                    var ls = window.localStorage;
                    ls.setItem("data_priceWaiPanArray", JSON.stringify(priceData));
                } else if (type == 'gnChart' || type == 'gwChart') {
                    if (time == 'day') {
                        priceData = data.dayData;
                    } else if (time == 'week') {
                        priceData = data.weekData;
                    } else if (time == 'month') {
                        priceData = data.monthData;
                    }
                    var tab;
                    if (type == 'gnChart') {
                        tab = 'guonei';
                    } else {
                        tab = 'guowai';
                    }
                    priceCurrData = priceData;
                    dawPriceEchart(priceData, myChart_price, tab, CodeName);
                }
                myChart_price.hideLoading();
                if (type == 'priceTabGn') {
                    $("#domestic_price").show();
                    $("#abroad_price").hide();
                    $("#tb_price").hide();
                    $("#table-container").hide();
                    $("#wpbj-price-container").hide();
                } else if (type == 'priceTabGw') {
                    $("#domestic_price").hide();
                    $("#abroad_price").show();
                    $("#tb_price").hide();
                    $("#table-container").hide();
                    $("#wpbj-price-container").hide();
                } else if (type == 'gnChart') {
                } else if (type == 'gwChart') {
                } else if (type == 'qiyeTab') {
                    $("#tb_price").hide();
                    $("#domestic_price").hide();
                    $("#abroad_price").hide();
                    $("#table-container").show();
                } else if (type == 'wpbjTab') {    //外盘报价div显示
                    $("#tb_price").hide();
                    $("#domestic_price").hide();
                    $("#abroad_price").hide();
                    $("#wpbj-price-container").show();
                }
            }
        }
    );
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
    var temp = {};
//    if(codenameArr.length>1){CodeName=codenameArr;}
//    else if(typeof CodeName=="string"){CodeName=CodeName.split("@#$%");}
//    else{CodeName=codenameArr};
    for (var z = 0; z < data.legendData.length; z++) {
        var tempData="-";//记录前一条数据，用来补没有的数据
        var legendName = data.legendData[z].Name;
        legendName = legendName.replace('(日估价)', '');
        legendName = legendName.replace('（日估价）', '');
//        legendData.push(legendName);
        for (var index = 0; index < CodeName.length; index++) {
            if (legendName != CodeName[index]) {
                continue;
            }
            if (index == CodeName.length - 1 && legendName != CodeName[index]) {
                break;
            }
            if (legendName == CodeName[index]) {
                if (priceLegend != null) {
                    //判断图例是否选中
                    if (priceLegend[legendName]) {
                        temp[legendName] = true;
                    }
                    else {
                        temp[legendName] = false;
                    }
                }
                else {
                    temp[legendName] = true;
                }
                legendData.push(legendName);
                var array = [];
                for (var i = 0; i < xData.length; i++) {
                    if (data.seriesData[z]) {
                        var value = 0;
                        for (var j = 0; j < data.seriesData[z].length; j++) {
                            if (data.seriesData[z][j].PubDate == xData[i]) {
                                value = data.seriesData[z][j].AvgPrice;
                                tempData = value;
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
        var tabName;
        if (tab == 'guonei') {
            tabName='国内价格';
        } else if (tab == 'guowai') {
            tabName='全球价格';
        }
        ga('send', 'event', {
            'eventCategory':param['target']+'Legend图例选中',
            'eventAction': tabName
        });

    });
}
//tab页选中切换echarts
function onChose(flag, CodeName, cnCode, productTabId) {
    priceLegend = null;
    $("#changToTable").show();
    $("#changToChart").hide();
    $("#abroad_price").hide();
    $("#domestic_price").hide();
    chartFlag_price = 2;
    $("#priceCNCode").val(cnCode);
    CodeName = CodeName.replace('(日估价)', '');
    CodeName = CodeName.replace('（日估价）', '');
    var CodeName = CodeName.replace("/", "_");
    CodeName = CodeName.replace("/", "_");

    if ($(myChart_price.dom).is(":visible")) {
        myChart_price.resize();
    }
    if (flag == 1) {
        fistLoading_price('gnChart', CodeName, productTabId);
        priceDataFlag = 'gnChart';
    } else {
        fistLoading_price('gwChart', CodeName, productTabId);
        priceDataFlag = 'gwChart';
    }
}

//tab页的切换  1为国内
function priceChange(flag, productTabId, type, allType, allName,tabName) {
    $("#china_price").removeClass("selected");
    $("#qiye_price").removeClass("selected");
    $("#unchina_price").removeClass("selected");
    $("#day_price").addClass("day_forecast");
    $("#week_price").removeClass("day_forecast");
    $("#month_price").removeClass("day_forecast");
    $("#priceTime").val(allType.split(",")[0]);

    $("#priceProductTabId").val(productTabId);
    initPriceTime(allType, allName,tabName);
    if (flag == 1) {    //国内价格
        $("#time_price").show();
        $("#tabType").val(type);
        priceDataFlag = 'priceTabGn';
        $("#uuu_price").addClass("china selected");
        $("#qiye_price").removeClass("china selected");
        $("#unchina_price").removeClass("china selected");
        $("#wpbj").removeClass("china selected");
        fistLoading_price('priceTabGn', "", productTabId);
    } else if (flag == 2) {    //全球价格
        $("#time_price").show();
        $("#tabType").val(type);
        priceDataFlag = 'priceTabGw';
        $("#uuu_price").removeClass("china selected");
        $("#unchina_price").addClass("china selected");
        $("#qiye_price").removeClass("china selected");
        $("#wpbj").removeClass("china selected");
        fistLoading_price('priceTabGw', "", productTabId);
    } else if (flag == 3) {  //企业报价
        $("#restseldiv").hide();
        $("#time_price").hide();
        $("#tabType").val(type);
        priceDataFlag = 'qiyeTab';
        $("#uuu_price").removeClass("china selected");
        $("#unchina_price").removeClass("china selected");
        $("#wpbj").removeClass("china selected");
        $("#qiye_price").addClass("china selected");
        $("#qiye_price").addClass("selected");
        fistLoading_price('qiyeTab', "", productTabId);
    } else if (flag == 4) {   //外盘报价
        $("#restseldiv").hide();
        $("#time_price").hide();
        $("#tabType").val(type);
        priceDataFlag = 'wpbjTab';
        $("#uuu_price").removeClass("china selected");
        $("#unchina_price").removeClass("china selected");
        $("#qiye_price").removeClass("china selected");
        $("#wpbj").addClass("china selected");
        fistLoading_price('wpbjTab', "", productTabId);
    }
    ga('send', 'event', {
        'eventCategory': 'tab点击',
        'eventAction': tabName
    });
}
//日周月时间维度的切换（timeFlag：1为日，2为周，3为月）
function timeChange_price(timeFlag,clickName,tabName) {
    var productTabId = $("#priceProductTabId").val();
    if (timeFlag == 'day_price') {
        $("#priceTime").val('day');
        $("#day_price").addClass("day_forecast");
        $("#week_price").removeClass("day_forecast");
        $("#month_price").removeClass("day_forecast");
        fistLoading_price(priceDataFlag, codenameArr, productTabId);
    } else if (timeFlag == 'week_price') {
        $("#priceTime").val('week');
        $("#day_price").removeClass("day_forecast");
        $("#week_price").addClass("day_forecast");
        $("#month_price").removeClass("day_forecast");
        fistLoading_price(priceDataFlag, codenameArr, productTabId);
    } else if (timeFlag == 'month_price') {
        $("#priceTime").val('month');
        $("#day_price").removeClass("day_forecast");
        $("#week_price").removeClass("day_forecast");
        $("#month_price").addClass("day_forecast");
        fistLoading_price(priceDataFlag, codenameArr, productTabId);
    }
    ga('send', 'event', {
        'eventCategory': '维度选择',
        'eventAction': clickName,
        'dimension3': tabName
    });
}
//链接到详情页时传参
function getCNCode(productCode) {
    ga('send', 'event', {
        'eventCategory': 'tab点击',
        'eventAction': '价格历史数据'
    });

    //国内价格和全球价格的tabCode值
    var productTabId1 = $("#uuu_price").val();
    var productTabId2 = $("#unchina_price").val();
    var pmmark = $(".product01").attr("prdcode");
    var cnCode = $("#priceCNCode").val();
    var tabType = $("#tabType").val();
    var time = $("#priceTime").val();
    var productTabId = $("#priceProductTabId").val();
    var priceModuleId = $("#priceModuleId").val();
    var ls = window.localStorage;
    ls.setItem("priceDetailsLegend", JSON.stringify(codenameArr));
    window.location.href = "priceDetails?cnCode=" + cnCode + "&tabType=" + tabType + "&time=" + time + "&productTabId=" + productTabId + "&priceModuleId=" + priceModuleId + "&pmmark=" + pmmark + "&productTabId1=" + productTabId1 + "&productTabId2=" + productTabId2 + "&productCode=" + productCode;
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
//拼装表格数据
function writingToPrice(newArray_price, type, productTabId) {
    var content_guonei;
    var content_guowai;
    var content_qiye;
    var content_waipan;
    var tr_price;
    var min;
    var max;
    var avg;
    var wb1 = 1;
    var wb2 = 1;
    var boxstyle;
    //将数组清空后面会默认勾选几条
    codenameArr = [];
    legendsize = newArray_price.length;
    if (legendsize < 3) {
        if (legendsize <= 2) {
            $("#restseldiv").hide();
        }
        else {
            $("#restselectable").text('0');
            $("#restseldiv").show();
        }
    }
    else {
        $("#restselectable").text('1');
        $("#restseldiv").show();
    }
    if (type == 'qiyeTab' || type == 'wpbjTab') {
        $("#restseldiv").hide();
    }
    if (type == 'priceTabGn') {      //国内价格
        if (newArray_price != '' && newArray_price != null && newArray_price != 'undefined') {

            for (var i = 0; i < newArray_price.length; i++) {
                if (newArray_price[i].minChange == '-') {
                    newArray_price[i].minChange = 0;
                }
                if (newArray_price[i].maxChange == '-') {
                    newArray_price[i].maxChange = 0;
                }
                if (newArray_price[i].avgChange == '-') {
                    newArray_price[i].avgChange = 0;
                }
                if (newArray_price[i].minChange < 0) {
                    min = '<span style="color:#00c533;">' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].minChange == 0) {
                    min = '<span>' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].minChange > 0) {
                    min = '<span style="color:#ff0000;">' + '+' + newArray_price[i].minChange + '</span>';
                }
                if (newArray_price[i].maxChange < 0) {
                    max = '<span style="color:#00c533;">' + newArray_price[i].maxChange + '</span>';
                } else if (newArray_price[i].maxChange == 0) {
                    max = '<span>' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].maxChange > 0) {
                    max = '<span style="color:#ff0000;">' + '+' + newArray_price[i].maxChange + '</span>';
                }
                var codeName = newArray_price[i].CodeName;
                codeName = codeName.replace('(日估价)', '');
                codeName = codeName.replace('（日估价）', '');
                if (newArray_price[i].avgChange < 0) {
                    avg = '<span style="color:#00c533;">' + newArray_price[i].avgChange + '</span>';
                } else if (newArray_price[i].avgChange == 0) {
                    avg = '<span>' + newArray_price[i].avgChange + '</span>';
                } else if (newArray_price[i].avgChange > 0) {
                    avg = '<span style="color:#ff0000;">' + '+' + newArray_price[i].avgChange + '</span>';
                }
                //默认前四条选中
                if (i < 2) {
                    boxstyle = '<th style="width:4%;"><input type="checkbox" name="priceName" cur="11" checked onclick=\"clickCheckbox(\'' + codeName + '\')">' + '</th>'
                    codenameArr.push(codeName)
                }
                else {
                    boxstyle = '<th style="width:4%;"><input type="checkbox" name="priceName"  cur="22" onclick=\"clickCheckbox(\'' + codeName + '\')">' + '</th>'
                }
                if (wb1 == 1) {
                    tr_price = '<tr style="cursor:default" class="tb_content">';
//                tr_price = '<tr style="cursor:default" class="tb_content" onclick=\"onChose(1,\'' + newArray_price[i].CodeName + '\',\'' + newArray_price[i].CNCode + '\',\'' + productTabId + '\') return false\">';
                    wb1 = wb1 + 1;
                } else if (wb1 == 2) {
                    tr_price = '<tr style="cursor:default">';
//                tr_price = '<tr style="cursor:default" onclick=\"onChose(1,\'' + newArray_price[i].CodeName + '\',\'' + newArray_price[i].CNCode + '\',\'' + productTabId + '\')return false\">';
                    wb1 = wb1 - 1;
                }
                content_guonei = content_guonei + tr_price +
                    boxstyle +
                    '<th style="width:24%;">' + newArray_price[i].PubDate + '</th>' +
                    '<th style="width:24%;" class="codename">' + codeName + '</th>' +
                    '<th style="width:24%;">' + avg +
                    '<th style="width:24%;">' + newArray_price[i].UnitName + '</th>' +
                    '</tr>';
                /* }else{*/
                if (wb2 == 1) {
                    tr_price = '<tr style="cursor:default" class="tb_content" >';
                    wb2 = wb2 + 1;
                } else if (wb2 == 2) {
                    tr_price = '<tr style="cursor:default" >';
                    wb2 = wb2 - 1;
                }
                var codeName = newArray_price[i].CodeName;
                codeName = codeName.replace('(日估价)', '');
                codeName = codeName.replace('（日估价）', '');

                content_guowai = content_guowai + tr_price +
                    boxstyle +
                    '<th style="width:24%;">' + newArray_price[i].PubDate + '</th>' +
                    '<th style="width:24%;">' + codeName + '</th>' +
                    '<th style="width:24%;">' + avg + '</th>' +
                    '<th style="width:24%;">' + newArray_price[i].UnitName + '</th>' +
                    '</tr>';
            }

        } else {
            content_guonei = "<div style='height:260px; top:35px; left:0; width:100%; text-align: center;vertical-align:middle;display: table-cell;'>无国内价格</div>";
        }

        $("#price_guonei").html(content_guonei);
    }
    else if (type == 'priceTabGw') {   //全球价格
        if (newArray_price != '' && newArray_price != null && newArray_price != 'undefined') {

            for (var i = 0; i < newArray_price.length; i++) {
                if (newArray_price[i].minChange == '-') {
                    newArray_price[i].minChange = 0;
                }
                if (newArray_price[i].maxChange == '-') {
                    newArray_price[i].maxChange = 0;
                }
                if (newArray_price[i].avgChange == '-') {
                    newArray_price[i].avgChange = 0;
                }
                if (newArray_price[i].minChange < 0) {
                    min = '<span style="color:#00c533;">' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].minChange == 0) {
                    min = '<span>' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].minChange > 0) {
                    min = '<span style="color:#ff0000;">' + '+' + newArray_price[i].minChange + '</span>';
                }
                if (newArray_price[i].maxChange < 0) {
                    max = '<span style="color:#00c533;">' + newArray_price[i].maxChange + '</span>';
                } else if (newArray_price[i].maxChange == 0) {
                    max = '<span>' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].maxChange > 0) {
                    max = '<span style="color:#ff0000;">' + '+' + newArray_price[i].maxChange + '</span>';
                }
                var codeName = newArray_price[i].CodeName;
                codeName = codeName.replace('(日估价)', '');
                codeName = codeName.replace('（日估价）', '');
                //默认前四条选中
                if (i < 2) {
                    if(codeName== "PP拉丝级_FD西北欧")   {
                        boxstyle = '<th style="width:4%;"></th>';
                    } else{
                        boxstyle = '<th style="width:4%;"><input type="checkbox" name="priceName" cur="11" checked onclick=\"clickCheckbox(\'' + codeName + '\')">' + '</th>';
                        codenameArr.push(codeName);
                    }
                }
                else {
                      if(codeName.indexOf('西北欧')!=-1){
                          boxstyle = '<th style="width:4%;"></th>';
                      }
//                      else if (codeName== "PP拉丝级_FD西北欧"){
//                          boxstyle = '<th style="width:4%;"></th>';
//                      }
                      else{
                          boxstyle = '<th style="width:4%;"><input type="checkbox" name="priceName"   onclick=\"clickCheckbox(\'' + codeName + '\')">' + '</th>'
                      }

                }
                if (newArray_price[i].avgChange < 0) {
                    avg = '<span style="color:#00c533;">' + newArray_price[i].avgChange + '</span>';
                } else if (newArray_price[i].avgChange == 0) {
                    avg = '<span>' + newArray_price[i].avgChange + '</span>';
                } else if (newArray_price[i].avgChange > 0) {
                    avg = '<span style="color:#ff0000;">' + '+' + newArray_price[i].avgChange + '</span>';
                }
                if (wb1 == 1) {
                    tr_price = '<tr style="cursor:default" class="tb_content">';
//                tr_price = '<tr style="cursor:default" class="tb_content" onclick=\"onChose(1,\'' + newArray_price[i].CodeName + '\',\'' + newArray_price[i].CNCode + '\',\'' + productTabId + '\') return false\">';
                    wb1 = wb1 + 1;
                } else if (wb1 == 2) {
                    tr_price = '<tr style="cursor:default">';
//                tr_price = '<tr style="cursor:default" onclick=\"onChose(1,\'' + newArray_price[i].CodeName + '\',\'' + newArray_price[i].CNCode + '\',\'' + productTabId + '\')return false\">';
                    wb1 = wb1 - 1;
                }
                content_guonei = content_guonei + tr_price +
                    boxstyle +
                    '<th style="width:24%;">' + newArray_price[i].PubDate + '</th>' +
                    '<th style="width:24%;">' + codeName + '</th>' +
                    '<th style="width:24%;">' + avg + '</th>' +
                    '<th style="width:24%;">' + newArray_price[i].UnitName + '</th>' +
                    '</tr>';
                if (wb2 == 1) {
                    tr_price = '<tr style="cursor:default" class="tb_content" >';
                    wb2 = wb2 + 1;
                } else if (wb2 == 2) {
                    tr_price = '<tr style="cursor:default" >';
                    wb2 = wb2 - 1;
                }
                var codeName = newArray_price[i].CodeName;
                codeName = codeName.replace('(日估价)', '');
                codeName = codeName.replace('（日估价）', '');

                content_guowai = content_guowai + tr_price +
                    boxstyle +
                    '<th style="width:24%;">' + newArray_price[i].PubDate + '</th>' +
                    '<th style="width:24%;">' + codeName + '</th>' +
                    '<th style="width:24%;">' + avg + '</th>' +
                    '<th style="width:24%;">' + newArray_price[i].UnitName + '</th>' +
                    '</tr>';
            }

        } else {
            content_guowai = "<div style='height:260px; top:35px; left:0; width:100%; text-align: center;vertical-align:middle;display: table-cell;'>无全球价格</div>";
        }

        $("#price_guowai").html(content_guowai);
    } else if (type == 'qiyeTab') {   //企业报价
        var priceProductCode=$("#priceProductCode").val();
        var settlementPrice;
        var level_name;   //级别牌号
        if (newArray_price != '' && newArray_price != null && newArray_price != 'undefined') {
            for (var i = 0; i < newArray_price.length; i++) {
                if(priceProductCode=='380-030' || priceProductCode=='380-060'){  //PE 、PP
                    level_name='<td>'+newArray_price[i].level_name+'</td>';
                }
                if (newArray_price[i].minChange == '-') {
                    newArray_price[i].minChange = 0;
                }
                if (newArray_price[i].maxChange == '-') {
                    newArray_price[i].maxChange = 0;
                }
                if (newArray_price[i].avgChange == '-') {
                    newArray_price[i].avgChange = 0;
                }
                if (newArray_price[i].minChange < 0) {
                    min = '<span style="color:#00c533;">' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].minChange == 0) {
                    min = '<span>' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].minChange > 0) {
                    min = '<span style="color:#ff0000;">' + '+' + newArray_price[i].minChange + '</span>';
                }
                if (newArray_price[i].maxChange < 0) {
                    max = '<span style="color:#00c533;">' + newArray_price[i].maxChange + '</span>';
                } else if (newArray_price[i].maxChange == 0) {
                    max = '<span>' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].maxChange > 0) {
                    max = '<span style="color:#ff0000;">' + '+' + newArray_price[i].maxChange + '</span>';
                }
                if (newArray_price[i].avgChange < 0) {
                    avg = '<span style="color:#00c533;">' + newArray_price[i].avgChange + '</span>';
                } else if (newArray_price[i].avgChange == 0) {
                    avg = '<span>' + newArray_price[i].avgChange + '</span>';
                } else if (newArray_price[i].avgChange > 0) {
                    avg = '<span style="color:#ff0000;">' + '+' + newArray_price[i].avgChange + '</span>';
                }
                if (wb1 == 1) {
                    tr_price = '<tr style="cursor: default" class="tb_content">';
                    wb1 = wb1 + 1;
                } else if (wb1 == 2) {
                    tr_price = '<tr style="cursor: default">';
                    wb1 = wb1 - 1;
                }
                content_qiye = content_qiye + tr_price +
                    '<td>' + newArray_price[i].PubDate + '</td>' +
                    '<td>' + newArray_price[i].Location + '</td>' +
                    '<td>' + newArray_price[i].Producer + '</td>' +
                    '<td>' + newArray_price[i].OfferingCompany + '</td>' +
                    "<td>"+newArray_price[i].MinPrice+"-"+newArray_price[i].MaxPrice+"</td>"+
                    '<td>' + min+'/'+max + '</td>' +
                    '<td>' + newArray_price[i].UnitName + '</td>' +
                    level_name +
                    '<td>' + newArray_price[i].Note + '</td>' +
                    '</tr>';
            }

        } else {
            content_qiye = "<div style='height:260px; top:35px; left:0; width:100%; text-align: center;vertical-align:middle;display: table-cell;'>无企业报价</div>";
        }

        $("#price_qiye").html(content_qiye);
    } else if (type == 'wpbjTab') {   //外盘报价
        if (newArray_price != '' && newArray_price != null && newArray_price != 'undefined') {
            var priceProductCode=$("#priceProductCode").val();
            var company_name;
            for (var i = 0; i < newArray_price.length; i++) {
                if(priceProductCode!='380-030' || priceProductCode!='380-060'){  //PE 、PP
                }else{
                    company_name='<td>'+newArray_price[i].company_name+'</td>';
                }
                if (newArray_price[i].minChange == '-') {
                    newArray_price[i].minChange = 0;
                }
                if (newArray_price[i].maxChange == '-') {
                    newArray_price[i].maxChange = 0;
                }
                if (newArray_price[i].avgChange == '-') {
                    newArray_price[i].avgChange = 0;
                }
                if (newArray_price[i].minChange < 0) {
                    min = '<span style="color:#00c533;">' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].minChange == 0) {
                    min = '<span>' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].minChange > 0) {
                    min = '<span style="color:#ff0000;">' + '+' + newArray_price[i].minChange + '</span>';
                }
                if (newArray_price[i].maxChange < 0) {
                    max = '<span style="color:#00c533;">' + newArray_price[i].maxChange + '</span>';
                } else if (newArray_price[i].maxChange == 0) {
                    max = '<span>' + newArray_price[i].minChange + '</span>';
                } else if (newArray_price[i].maxChange > 0) {
                    max = '<span style="color:#ff0000;">' + '+' + newArray_price[i].maxChange + '</span>';
                }
                if (newArray_price[i].avgChange < 0) {
                    avg = '<span style="color:#00c533;">' + newArray_price[i].avgChange + '</span>';
                } else if (newArray_price[i].avgChange == 0) {
                    avg = '<span>' + newArray_price[i].avgChange + '</span>';
                } else if (newArray_price[i].avgChange > 0) {
                    avg = '<span style="color:#ff0000;">' + '+' + newArray_price[i].avgChange + '</span>';
                }
                if (wb1 == 1) {
                    tr_price = '<tr style="cursor: default" class="tb_content">';
                    wb1 = wb1 + 1;
                } else if (wb1 == 2) {
                    tr_price = '<tr style="cursor: default">';
                    wb1 = wb1 - 1;
                }
                content_waipan = content_waipan + tr_price +
                    '<td>' + newArray_price[i].PubDate + '</td>' +
//                '<td>'+newArray_price[i].Location+'</td>'+
                    '<td>' + newArray_price[i].level_name + '</td>' +
                    company_name +
                    '<td>' + newArray_price[i].ProducingArea + '</td>' +
                    '<td>' + newArray_price[i].PriceTerm + '</td>' +
                    "<td>"+newArray_price[i].MinPrice+"-"+newArray_price[i].MaxPrice+"</td>"+
                    '<td>' + min+'/'+max + '</td>' +
                    '<td>' + newArray_price[i].Note + '</td>' +
                    '</tr>';

            }

        } else {
            content_waipan = "<div style='height:260px; top:35px; left:0; width:100%; text-align: center;vertical-align:middle;display: table-cell;'>无外盘报价</div>";
        }

        $("#price_wpbj").html(content_waipan);
    }
    if (codenameArr.length == 0) {
        $("#changToChart").hide();
    }
    else {
        $("#changToChart").show();
    }
    ;

}
//排序方法
function sort_price(obj, field, type) {
    var order = commonSort2(obj);
    priceCurrArray = sortArray(priceCurrArray, field, order);
    writingToPrice(priceCurrArray, type);
    var restselectable = 0;
    //剩余可以选择的条数
    var restselectable = 0;
    if(type=='wpbjTab'||type=='qiyeTab'){
        $("#restseldiv").hide();
    }
    else{
        if (legendsize >= 3) {
            switch (codenameArr.length) {
                case 0:
                    restselectable = 3;
                    break;
                case 1:
                    restselectable = 2;
                    break;
                case 2:
                    restselectable = 1;
                    break;
                case 3:
                    restselectable = 0;
                    break;
                case 4:
                    restselectable = 0;
                    break;
            }
            $("#restseldiv").show();
        }
        else {
            if (legendsize == 0) {
                $("#restseldiv").hide();
            }
            switch (codenameArr.length) {
                case 0:
                    restselectable = legendsize;
                    break;
                case 1:
                    restselectable = legendsize - 2;
                    break;
                case 2:
                    restselectable = legendsize - 3;
                    break;
                case 3:
                    restselectable = legendsize - 4;
                    break;
            }
        }
        $("#restselectable").text(restselectable);
    }

    var orderDesc;
    if(order='asc'){
        orderDesc='升序';
    }else{
        orderDesc='降序';
    }
    ga('send', 'event', {
        'eventCategory': '排序功能',
        'eventAction': '价格'+orderDesc+"排序"
    });

}
function clickCheckbox(codeName) {
    //显示提示信息
    $("#restseldiv").show();
    //如果数组中不存在该元素则插入
//    if($.inArray(codeId, codenameArr) == -1){
//        codeIdArr.push(codeId);
//    }else
//    {
//        codeIdArr.splice($.inArray(codeId, codenameArr), 1);
//    }
    $("input[cur='22']").attr("disabled","true");
//    $("input[name='priceName']").attr("disabled","true");
    if ($.inArray(codeName, codenameArr) == -1) {
        codenameArr.push(codeName);
    }
    //存在该元素则删除
    else {
        codenameArr.splice($.inArray(codeName, codenameArr), 1);
    }
    //console.log(codenameArr);
    //当勾选超过四条是其他不能勾选
    if (codenameArr.length > 2) {
        //如果复选框选中则该复选框可以取消勾选
        $("input[name='priceName']").each(function () {
            if ($(this).is(":checked")) {
                $(this).removeAttr("disabled");
            }
            //如果复选框没被选中则灰化
            else {
                $(this).attr("disabled", "true");
            }
        })
    }
    //小于四条则都可以勾选反选
    else {
        $("input[name='priceName']").removeAttr("disabled")
    }

    //一条都没勾选则把“切换为图”隐藏
    if (codenameArr.length == 0) {
        $("#changToChart").hide();
    }
    else {
        $("#changToChart").show();
    }
    //剩余可以选择的条数
    var restselectable = 0;
    if (legendsize >= 3) {
        switch (codenameArr.length) {
            case 0:
                restselectable = 3;
                break;
            case 1:
                restselectable = 2;
                break;
            case 2:
                restselectable = 1;
                break;
            case 3:
                restselectable = 0;
                break;
            case 4:
                restselectable = 0;
                break;
        }
    }
    else {
        switch (codenameArr.length) {
            case 0:
                restselectable = legendsize;
                break;
            case 1:
                restselectable = legendsize - 2;
                break;
            case 2:
                restselectable = legendsize - 3;
                break;
            case 3:
                restselectable = legendsize - 4;
                break;
        }
    }
    $("#restselectable").text(restselectable);
}
//图表切换
function chartTableChange() {
    var tabName;
    var productTabId = $("#priceProductTabId").val();
    priceLegend = null;
    if (priceDataFlag == 'priceTabGn') {
        tabName='切换为图';
        fistLoading_price('gnChart', codenameArr, productTabId);
        priceDataFlag = 'gnChart';
        $("#restseldiv").hide();
    } else if (priceDataFlag == 'priceTabGw') {
        tabName='切换为图';
        fistLoading_price('gwChart', codenameArr, productTabId);
        priceDataFlag = 'gwChart';
        $("#restseldiv").hide();
    } else if (priceDataFlag == 'gnChart') {
        tabName='切换为表';
        fistLoading_price('priceTabGn', codenameArr, productTabId);
        priceDataFlag = 'priceTabGn';
        $("#restseldiv").show();
    } else if (priceDataFlag == 'gwChart') {
        tabName='切换为表';
        fistLoading_price('priceTabGw', codenameArr, productTabId);
        priceDataFlag = 'priceTabGw';
        $("#restseldiv").show();
    }
    ga('send', 'event', {
        'eventCategory': 'tab点击',
        'eventAction': tabName
    });
}



