GX = function () {
    var mdoption = initOption();
    var myCharts = drawPic("tb_gongxu");
    var KcArr;
    var maxdate;
    return {
        init: function () {
            this.charts = myCharts;
            this. cnclkgl_option = SD_MOD.cnclkgl_option;
            this. bgxq_option = SD_MOD.bgxq_option;
            this. jck_option = SD_MOD.jck_option;
            this. xyxq_option = SD_MOD.xyxq_option;
            this. kucun_option = SD_MOD.kucun_option;
            this. gxyc_option = SD_MOD.gxyc_option;
            this. gxyu_nonKC_option=SD_MOD.gxyc_nonKC_option;
            this.liid;
            this.weidu;
            this.dtype;
            this.productcode = selprdcode;
            this.productname = selprdname;
//			this.productcode = $(".nav_01 > li.product01").attr("prdcode");
//			this.productname = $(".nav_01 > li.product01 > a").html();
            if ($("#sdDownList").val() == "") {
                this.downList = [];
            } else {
                this.downList = $.parseJSON($("#sdDownList").val());
            }
            if ($("#areaList").val() == "") {
                this.areaList = [];
            } else {
                this.areaList = $.parseJSON($("#areaList").val());
            }
            this.downstr = "'" + getObjData(this.downList, 'DownstreamProductCode').join("','") + "'";
            this.areastr = "'" + getObjData(this.areaList, 'AreaCode').join("','") + "'";
            this.modelid = "gongxu";
            this.modelcode = $("#moduleId").val();
            this.modselector = $("div#" + this.modelid);
            this.picdom = "tb_gongxu";
            this.selected;


            this.order = "";

            myCharts.on(echarts.config.EVENT.LEGEND_SELECTED, function (e) {
                GX.selected = e.selected;
                var clickName = $("#gongxu .selected> a").text();
                var pm=$(".product01").text();
                ga('send', 'event', {
                    'eventAction':  '图例(Legend)点击',
                    'eventCategory': pm+"-"+clickName+'-图例(Legend)点击'
                });
//                 console.log(e['target']);      图例名字
            });

//			this.initDom();
            //暂时隐藏pp，pe的库存tab
            if(this.productcode=='380-060'||this.productcode=='380-030'){
                $("#kc").hide();
            }
            this.firstLoad();
        },
        showLoad: function () {
            myCharts.clear();
            myCharts.showLoading({
                text: '正在努力的读取数据中...',    //loading话术
                effect: 'whirling'
            });
        },
        drawDom: function (l, w, t) {
            if (t == "ecpic") {
                $("div.qh_box", "#" + GX.modelid).hide();
                $("#gongxu_wdbx").show();
                GX.drawProPic(l, w);
            } else if (t == "dttb") {
                $("div.qh_box", "#" + GX.modelid).show();
                $("#gongxu_wdbx").show();
                GX.drawTa(l, w);
            }
        },
        drawProPic: function (l, w) {
            var pd = this.picdom;
            $("div#" + pd, GX.modselector).show();
            $("div.grd", GX.modselector).hide();
            GX.resize();
            this.showLoad();
            var aj = $.ajax({
                type: "POST",
                dataType: "json",
                url: "getSDdata?li=" + l + "&wd=" + w + "&highcode=" + GX.productcode + "&downstr=" + GX.downstr + "&areastr=" + GX.areastr,
                timeout: 100000, //超时时间设置，单位毫秒
                success: function (data) {
                    if (data != null) {
                        myCharts.hideLoading();
                        var myoption;
                        if (l == "cnclkgl") {
//                            window.onresize=myCharts.resize;
                            myoption = GX.cnclkgl_option;
                            myoption.legend.selected = GX.selected;
                            myoption.xAxis[0].data = searchFromArr(data, 'SDTypeId', 1, 'YM');
                            var or = [];
                            myoption.series[0].data=[];
                            myoption.series[1].data=[];
                            for (var i = 0; i < searchFromArr(data, 'SDTypeId', 1, 'YM').length; i++) {
                                if (typeof searchFromArr(data, 'SDTypeId', 15, 'Volume_Final')[i] == "string") {
                                    or.push((searchFromArr(data, 'SDTypeId', 15, 'Volume_Final')[i] / searchFromArr(data, 'SDTypeId', 1, 'Volume_Final')[i]).toFixed(2)*100);
//                                    console.log(or)
                                } else {
                                    or.push('-');
                                }
                            }
                            var len=myoption.xAxis[0].data.length;
                            for(var xlen=0;xlen<len;xlen++){
                                if(myoption.xAxis[0].data[xlen].indexOf('预测')>=0){
                                    myoption.series[0].data.push({
                                        value: searchFromArr(data, 'SDTypeId', 1, 'Volume_Final')[xlen],
                                        itemStyle: {
                                            normal: {color: '#BB3300'}
                                        }
                                    });
                                    myoption.series[1].data.push({
                                        value: searchFromArr(data, 'SDTypeId', 15, 'Volume_Final')[xlen],
                                        itemStyle: {
                                            normal: {color: '#05507C'}
                                        }
                                    });
                                }
                                else{
                                    myoption.series[0].data.push(searchFromArr(data, 'SDTypeId', 1, 'Volume_Final')[xlen]) ;
                                    myoption.series[1].data.push(searchFromArr(data, 'SDTypeId', 15, 'Volume_Final')[xlen]) ;
                                }
                            }
                            myoption.series[2].data = or;
                            //删除数组中的0
//                            for(var len=0;len<myoption.series[1].data.length;len++){
//                                var dt=myoption.series[1].data[len];
//                                if(dt==0||dt=='-'||dt=='null'||dt==null){
//                                    myoption.xAxis[0].data.splice($.inArray(dt, myoption.series[1].data), 1);
//                                    myoption.series[0].data.splice($.inArray(dt, myoption.series[1].data), 1);
//                                    myoption.series[1].data.splice($.inArray(dt, myoption.series[1].data), 1);
//                                    myoption.series[2].data.splice($.inArray(dt, myoption.series[1].data), 1);
//                                }
//                            }
                        } else if (l == "bgxq") {
                            myoption = GX.bgxq_option;
                            myoption.xAxis[0].data = getObjData(data[1], 'YM');
                            myoption.legend.selected = GX.selected;
                            myoption.series[0].data = [];
                            myoption.series[1].data = [];
                            myoption.series[2].data = [];
                            myoption.series[3].data = [];
                            var or = [];
                            for (var i = 0; i < searchFromArr(data[1], 'SDTypeId', 1, 'YM').length; i++) {
                                if (typeof searchFromArr(data[1], 'SDTypeId', 1, 'Volume_Final')[i] == "string") {
                                    if(getObjData(data[1], 'Production')[i]==undefined){or.push('-');}
                                    else {
                                        or.push(( getObjData(data[1], 'Production')[i]/searchFromArr(data[1], 'SDTypeId', 1, 'Volume_Final')[i]).toFixed(2)*100);
                                    }
                                } else {
                                    or.push('-');
                                }
                            }
                             var len=myoption.xAxis[0].data.length;
                            for(var xlen=0;xlen<len;xlen++){
                                if(myoption.xAxis[0].data[xlen].toString().indexOf('预测')>=0){
                                    myoption.series[0].data.push({
                                        value: getObjData(data[1], 'Import')[xlen],
                                        itemStyle: {
                                            normal: {color: '#BB3300'}
                                        }
                                    });
                                    myoption.series[1].data.push({
                                        value: getObjData(data[1], 'Production')[xlen],
                                        itemStyle: {
                                            normal: {color: '#05507C'}
                                        }
                                    });
                                    myoption.series[2].data.push({
                                        value: getObjData(data[1], 'Export')[xlen],
                                        itemStyle: {
                                            normal: {color: '#751E71'}
                                        }
                                    });
                                    myoption.series[3].data.push(
                                        {
                                            value: getObjData(data[1], 'ApparentDemandActual')[xlen]

                                        }
                                    )
                                }
                                else{
                                    myoption.series[0].data.push(getObjData(data[1], 'Import')[xlen]);
                                    myoption.series[1].data.push(getObjData(data[1], 'Production')[xlen]);
                                    myoption.series[2].data.push(getObjData(data[1], 'Export')[xlen]);
                                    myoption.series[3].data.push(getObjData(data[1], 'ApparentDemandActual')[xlen]);
                                }
                            }
                                 myoption.series[4].data = or;
                        } else if (l == "jck") {
                            myoption = GX.jck_option;
                            myoption.legend.selected = GX.selected;
                            myoption.xAxis[0].data = searchFromArr(data, 'SDTypeId', 5, 'YM');
                            myoption.series[0].data=[];
                            myoption.series[1].data=[];
                            myoption.series[2].data=[];
                            myoption.series[3].data=[];
                            var len= myoption.xAxis[0].data.length;
                            for(var xlen=0;xlen<len;xlen++){
                                if(myoption.xAxis[0].data[xlen].toString().indexOf('预测')>=0){
                                    myoption.series[0].data.push({
                                        value: searchFromArr3(data, 'SDTypeId', 5, 'Volume_Final')[xlen],
                                        itemStyle: {
                                            normal: {color: '#BB3300'}
                                        }
                                    });
                                    myoption.series[1].data.push(searchFromArr3(data, 'SDTypeId', 6, 'Volume_Final')[xlen]);
                                    myoption.series[2].data.push({
                                        value: searchFromArr3(data, 'SDTypeId', 5, 'AvgPrice')[xlen],
                                        itemStyle: {
                                            normal: {color: '#05507C'}
                                        }
                                    });
                                    myoption.series[3].data.push(searchFromArr3(data, 'SDTypeId', 6, 'AvgPrice')[xlen]);
                                }
                                else{
                                    myoption.series[0].data.push(searchFromArr3(data, 'SDTypeId', 5, 'Volume_Final')[xlen]);
                                    myoption.series[1].data.push(searchFromArr3(data, 'SDTypeId', 6, 'Volume_Final')[xlen]);
                                    myoption.series[2].data.push(searchFromArr3(data, 'SDTypeId', 5, 'AvgPrice')[xlen]);
                                    myoption.series[3].data.push(searchFromArr3(data, 'SDTypeId', 6, 'AvgPrice')[xlen]);
                                }
                            }

                        } else if (l == "xyxq") {
                            if (GX.downList.length == 0) {
                                myCharts.clear();
                                myCharts.showLoading({
                                    animation: false,
                                    text: '无下游品目',
                                    textStyle: {fontSize: 20, color: '#404040'},
                                    effectOption: {backgroundColor: '#fefefe'}
                                });
                                return;
                            }
                            var lgarr = getObjData(GX.downList, 'DownstreamName');
                            var lgcdarr = getObjData(GX.downList, 'DownstreamProductCode');
                            myoption = GX.xyxq_option;
                            myoption.legend.data = lgarr;
                            myoption.legend.selected = GX.selected;
                            myoption.xAxis[0].data = searchFromArr(data, 'CommodityCode', data[0].CommodityCode, 'YM'),
                            myoption.series = [];
                            for (var i = 0; i < lgarr.length; i++) {
                                myoption.series.push({
                                    name: lgarr[i],
                                    type: "bar",
                                    smooth: false,
                                    stack: true,
                                    data: [],
                                    clickable: false,
                                    symbolSize: 0 | 0
                                });
                                var len= myoption.xAxis[0].data.length;
                                for(var xlen=0;xlen<len;xlen++){
                                    if(myoption.xAxis[0].data[xlen].indexOf('预测')>=0){
                                        switch (i){
                                            case 0:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#CD2626'}}}); break;
                                            case 1:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#8E388E'}}}); break;
                                            case 2:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#006400'}}}); break;
                                            case 3:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#8B0A50'}}}); break;
                                            case 4:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#8A2BE2'}}}); break;
                                            case 5:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#EE0000'}}}); break;
                                            case 6:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#7A378B'}}}); break;
                                        }
                                    }
                                    else{
                                    myoption.series[i].data.push(searchFromArr(data, 'CommodityCode', lgcdarr[i], 'DownstreamDemand')[xlen]);
                                    }
                                }

                            }
                        } else if (l == "kc") {
                            if (GX.areaList.length == 0) {
                                myCharts.clear();
                                myCharts.showLoading({
                                    animation: false,
                                    text: '暂无数据',
                                    textStyle: {fontSize: 20, color: '#404040'},
                                    effectOption: {backgroundColor: '#fefefe'}
                                });
                                return;
                            }
                            var lgarr = getObjData(GX.areaList, 'AreaName');
                            var lgcdarr = getObjData(GX.areaList, 'AreaCode');
                            myoption = GX.kucun_option;
                            myoption.legend.data = lgarr;
                            myoption.legend.selected = GX.selected;
                            myoption.xAxis[0].data = searchFromArr(data, 'AreaCode', data[0].AreaCode, 'YM'),
                                myoption.series = [];
                            for (var i = 0; i < lgarr.length; i++) {
                                myoption.series.push({
                                    name: lgarr[i],
                                    type: "line",
                                    smooth: false,
                                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                    symbolSize: 0 | 0,
                                    data: searchFromArr(data, 'AreaCode', lgcdarr[i], 'Inventory'),
                                    clickable: false
                                });
                            }
                        } else if (l == "gxyc") {
                            if(GX.productcode=='380-060'||GX.productcode=='380-030'){
                                myoption =GX. gxyu_nonKC_option;
                                myoption.legend.selected = GX.selected;
                                myoption.xAxis[0].data = getObjData(data, 'YM');
                                var len=myoption.xAxis[0].data.length;
                                for(var xlen=0;xlen<len;xlen++){
                                    if(myoption.xAxis[0].data[xlen].indexOf('(预测)')>0){
                                        myoption.series[0].data.push({
                                            value: (data[xlen].Supply == "" ? "-" : data[xlen].Supply),
                                            itemStyle: {
                                                normal: {color: '#BB3300'}
                                            }
                                        });
                                        myoption.series[1].data.push({
                                            value: (data[xlen].Demand == "" ? "-" : data[xlen].Demand),
                                            itemStyle: {
                                                normal: {color: '#05507C'}
                                            }
                                        });
                                        myoption.series[2].data.push({
                                            value: (data[xlen].SDBalance == "" ? "-" : data[xlen].SDBalance),
                                            itemStyle: {
                                                normal: {color: '#751E71'}
                                            }
                                        });
                                    }
                                    else {
                                        myoption.series[0].data.push(data[xlen]['Supply']);
                                        myoption.series[1].data.push(data[xlen]['Demand']);
                                        myoption.series[2].data.push(data[xlen]['SDBalance'] );
                                    }
                                }
                            }
                            else{
                                myoption =GX. gxyc_option;
                                myoption.legend.selected = GX.selected;
                                myoption.xAxis[0].data = getObjData(data, 'YM');
                                var len=myoption.xAxis[0].data.length;
                                for(var xlen=0;xlen<len;xlen++){
                                    if(myoption.xAxis[0].data[xlen].indexOf('(预测)')>0){
                                        myoption.series[0].data.push({
                                            value: (data[xlen].Supply == "" ? "-" : data[xlen].Supply),
                                            itemStyle: {
                                                normal: {color: '#BB3300'}
                                            }
                                        });
                                        myoption.series[1].data.push({
                                            value: (data[xlen].Demand == "" ? "-" : data[xlen].Demand),
                                            itemStyle: {
                                                normal: {color: '#05507C'}
                                            }
                                        });
                                        myoption.series[2].data.push({
                                            value: (data[xlen].SDBalance == "" ? "-" : data[xlen].SDBalance),
                                            itemStyle: {
                                                normal: {color: '#751E71'}
                                            }
                                        });
                                        if(myoption.series[3]!=undefined){
                                            myoption.series[3].data.push(data[xlen].Inventory == "" ? "-" : data[xlen].Inventory);
                                        }
                                    }
                                    else {
                                        myoption.series[0].data.push(data[xlen]['Supply']);
                                        myoption.series[1].data.push(data[xlen]['Demand']);
                                        myoption.series[2].data.push(data[xlen]['SDBalance'] );
                                        myoption.series[3].data .push(data[xlen]['Inventory'] );
                                    }
                                }

                            }
                        }
//                        if ( (l == "jck" && w == "month") || (l == "bgxq" && w == "month")) {
//                            GX.addData(l, w, myoption);
//                        } else {
//                            myCharts.setOption(myoption);
//                        }
                        myCharts.setOption(myoption);
                    } else {
                        myCharts.clear();
                        myCharts.showLoading({
                            animation: false,
                            text: '暂无数据',
                            textStyle: {fontSize: 20, color: '#404040'},
                            effectOption: {backgroundColor: '#fefefe'}
                        });
                    }
                },
                error: function (xhr, e) {
                    var err = '读取数据出错';
                    if (e == "parsererror") {
                        err = '数据获取地址出错，请联系管理员';
                    } else if (e == "timeout") {
                        err = "读取数据超时";
                    }
                    myCharts.showLoading({
                        animation: false,
                        text: err,
                        textStyle: {fontSize: 20, color: '#404040'},
                        effectOption: {backgroundColor: '#fefefe'}
                    });
                }
            });
            this.initDom();
        },
        addData: function (l, w, opt) {//增加预测数据
            if (l == 'jck' && w == 'month') {
                var ksrq = getSomeYear(1);
                var jsrq = getNowDate();
            }
            var aj = $.ajax({
                type: "POST",
                dataType: "json",
                url: "getSDFCdata?li=" + l + "&wd=" + w + "&highcode=" + GX.productcode + "&ksrq=" + ksrq + "&jsrq=" + jsrq,
                timeout: 10000, //超时时间设置，单位毫秒
                success: function (data) {
                    if (data != null) {
                        myoption = opt;
                        var datearr = myoption.xAxis[0].data;
                        var maxdate = datearr[datearr.length - 1];
                        if (l == "gxyc") {
                            for (var i = 0; i < data.length; i++) {
                                myoption.xAxis[0].data.push(data[i].YM == "" ? "-" : data[i].YM);
                                myoption.series[0].data.push({
                                    value: (data[i].Supply == "" ? "-" : data[i].Supply),
                                    itemStyle: {
                                        normal: {color: '#BB3300'}
                                    }
                                });
                                myoption.series[1].data.push({
                                    value: (data[i].Demand == "" ? "-" : data[i].Demand),
                                    itemStyle: {
                                        normal: {color: '#05507C'}
                                    }
                                });
                                myoption.series[2].data.push({
                                    value: (data[i].SDBalance == "" ? "-" : data[i].SDBalance),
                                    itemStyle: {
                                        normal: {color: '#751E71'}
                                    }
                                });
                                if(myoption.series[3]!=undefined){
                                    myoption.series[3].data.push(data[i].Inventory == "" ? "-" : data[i].Inventory);
                                }
                            }
                        } else if (l == "cnclkgl") {

                            var ymdata = [];
                            var cndata = [];
                            var cldata = [];
                            var or = [];
                            for (var i = 0; i < searchFromArr(data, 'SDTypeId', 1, 'YM').length; i++) {
                                if(searchFromArr(data, 'SDTypeId', 1, 'YM')[i].substring(0,7)>maxdate){
                                    ymdata.push(searchFromArr(data, 'SDTypeId', 1, 'YM')[i]);
                                    cndata.push(searchFromArr(data, 'SDTypeId', 1, 'Volume_Final')[i]);
                                    cldata.push(searchFromArr(data, 'SDTypeId', 15, 'Volume_Final')[i]);
                                    if (typeof searchFromArr(data, 'SDTypeId', 15, 'Volume_Final')[i] == "string") {
                                        or.push((searchFromArr(data, 'SDTypeId', 15, 'Volume_Final')[i] / searchFromArr(data, 'SDTypeId', 1, 'Volume_Final')[i]).toFixed(2)*100);
                                    } else {
                                        or.push('-');
                                    }
                                }

                            }
                            for (var i = 0; i < ymdata.length; i++) {
                                myoption.xAxis[0].data.push(ymdata[i]);
                                myoption.series[0].data.push({
                                    value: cndata[i],
                                    itemStyle: {
                                        normal: {color: '#BB3300'}
                                    }
                                });
                                myoption.series[1].data.push({
                                    value: cldata[i],
                                    itemStyle: {
                                        normal: {color: '#05507C'}
                                    }
                                });
                                myoption.series[2].data.push({
                                    value: or[i],
                                    itemStyle: {
                                        normal: {color: '#751E71'}
                                    }
                                });
                            }
                        } else if (l == "jck") {
                            var ymdata = searchFromArr(data, 'SDTypeId', 5, 'YM');
                            var jcldata = searchFromArr(data, 'SDTypeId', 5, 'Volume_Final');
                            var jcjdata = searchFromArr(data, 'SDTypeId', 5, 'AvgPrice');
                            var ccldata = searchFromArr(data, 'SDTypeId', 6, 'Volume_Final');
                            var ccjdata = searchFromArr(data, 'SDTypeId', 6, 'AvgPrice');
                            for (var i = 0; i < ymdata.length; i++) {
//	            				if(ymdata[i].substring(0,7)>maxdate&&ymdata[i].substring(0,7)<=jsrq.substring(0,7)){
                                if (ymdata[i].substring(0, 7) > maxdate) {
                                    myoption.xAxis[0].data.push(ymdata[i]);
                                    myoption.series[0].data.push({
                                        value: jcldata[i],
                                        itemStyle: {
                                            normal: {color: '#BB3300'}
                                        }
                                    });
                                    myoption.series[1].data.push(jcjdata[i]);
                                    myoption.series[2].data.push({
                                        value: ccldata[i],
                                        itemStyle: {
                                            normal: {color: '#05507C'}
                                        }
                                    });
                                    myoption.series[3].data.push(ccjdata[i]);
                                }
                            }
                        } else if (l == "bgxq") {
                            var ymdata = getObjData(data, 'YM');
                            var imdata = getObjData(data, 'Import');
                            var exdata = getObjData(data, 'Export');
                            var prddata = getObjData(data, 'Production');
                            var addata = getObjData(data, 'ApparentDemandActual');
                            for (var i = 0; i < ymdata.length; i++) {
//	            				if(ymdata[i].substring(0,7)>maxdate&&ymdata[i].substring(0,7)<=jsrq.substring(0,7)){
                                if (ymdata[i].substring(0, 7) > maxdate) {
                                    myoption.xAxis[0].data.push(ymdata[i]);
                                    myoption.series[0].data.push({
                                        value: imdata[i],
                                        itemStyle: {
                                            normal: {color: '#BB3300'}
                                        }
                                    });
                                    myoption.series[1].data.push({
                                        value: prddata[i],
                                        itemStyle: {
                                            normal: {color: '#05507C'}
                                        }
                                    });
                                    myoption.series[2].data.push({
                                        value: exdata[i],
                                        itemStyle: {
                                            normal: {color: '#751E71'}
                                        }
                                    });
                                    myoption.series[3].data.push(
                                        {
                                            value: addata[i]

                                        }

                                    );
                                }
                            }
                        }
                        else if(l=='xyxq'){
                            var lgcdarr = getObjData(GX.downList, 'DownstreamProductCode');
                            myoption.xAxis[0].data.push(data[0]['YM']);
                            for(var k=0;k<lgcdarr.length;k++){
//                                myoption.series[k].data.push({
//                                    value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand')
//                                });
                                switch (k){
                                    case 0:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand'),itemStyle: {normal:{color: '#CD2626'}}}); break;
                                    case 1:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand'),itemStyle: {normal:{color: '#8E388E'}}}); break;
                                    case 2:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand'),itemStyle: {normal:{color: '#006400'}}}); break;
                                    case 3:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand'),itemStyle: {normal:{color: '#8B0A50'}}}); break;
                                    case 4:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand'),itemStyle: {normal:{color: '#8A2BE2'}}}); break;
                                    case 5:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand'),itemStyle: {normal:{color: '#EE0000'}}}); break;
                                    case 6:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand'),itemStyle: {normal:{color: '#7A378B'}}}); break;
                                }                                                                                        //   CD2626    8E388E    006400    8B0A50   8A2BE2     EE0000    7A378B
                            }
                        }
                        myCharts.clear();
                        myCharts.setOption(myoption);
                    } else {
                        myCharts.setOption(opt);
                    }
                },
                error: function (xhr, e) {
                    console.log(xhr, e)
                }
            });
        },
        /*
         * 排序字段切换功能
         */
        changeOrder: function (colname) {
            var oj;
            if (this.order == "") {
                oj = $.parseJSON("{" + this.order + "}");
            } else {
                oj = $.parseJSON(this.order);
            }
            if (typeof oj[colname] === "undefined") {
                oj = {};  //有这一行时，只能单列排序，删除这一行，将可以多列排序
                oj[colname] = 0;
            } else if (oj[colname] == 0) {
                oj[colname] = 1;
            } else {
                oj[colname] = 0;
            }
            var orstr = JSON.stringify(oj);
            this.order = orstr;
            //重新绘制表格，跳转至第一页
            this.drawTa(this.liid, this.weidu);
            //分页控件跳转至第一页
//			$('#pagebox').jqPaginator('option', {
//			    currentPage: 1
//			});
        },
        drawTa: function (l, w) {
            this.showLoad();
            var pd = this.picdom;
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "getSDdata?li=" + l + "&wd=" + w + "&type=tab" + "&pindex=1&psize=7" + "&highcode=" + GX.productcode + "&order=" + encodeURI(encodeURI(GX.order)),
                success: function (data) {
                    myCharts.hideLoading();
                    $("div#" + pd, GX.modselector).hide();
                    $("div.grd", GX.modselector).show();
                    KcArr = data;
                    //以下加载表格数据
                    var opt = {
                        data: data,
                        datamap: [
                            {
                                name: '日期', //字段中文名，绘制table时会展示在表头
                                value: 'YM', //后台的字段名
                                width: 20, //字段所占百分比宽度
                                tg: 0 //字段标识，不得重复
                                ,
                                sorting: true
                            },
                            {
                                name: '区域',
                                value: 'Name',
                                width: 20,
                                tg: 1,
                                sorting: true
                            },
                            {
                                name: '库存',
                                value: 'Inventory',
                                width: 20,
                                tg: 2,
                                sorting: true
                            },
                            {
                                name: '涨跌',
                                value: 'rise',
                                width: 20,
                                tg: 3,
                                sorting: true
//                                ,
//                                render: function (data,data1) {
//                                    var value = 0;
//                                    if (data['Inventory']) {
//                                        value = (data['Inventory']-data1['Inventory']).toFixed(2);
//                                    }
//                                    var str = "";
//                                    if (value > 0) {
//                                        str = '<th><span style="color:#ff0000;">+' + value + '</span></th>';
//                                    } else {
//                                        str = '<th><span style="color:#00c533;">' + value + '</span></th>';
//                                    }
//                                    return str;
//                                }
                            },
                            {
                                name: '单位',
                                value: 'Unit',
                                width: 20,
                                tg: 3
                            }
                        ]
                    };
                    KcArr=sortArray2(KcArr,"YM","desc");
                    GX.KcTable(KcArr);
//	            	GX.drawTable("gongxu_tab",opt);
                    $("#gongxu_tab > tbody >tr").bind('click', function () {
                        $("#gongxu_wdbx").show();
                        $("div.qh_box > a", "#" + GX.modelid).html("切换为表");
                        var tr = $(this);
                        var dmtg = 1;
                        var companyid = $("th[tg='" + dmtg + "']", tr).html();
                        GX.showTabPic(GX.liid, GX.weidu, companyid);
                    });
                },
                error: function (e) {
                    //alert("系统错误,请联系管理员！");
                }
            });
            this.initDom();
        },
        showTabPic: function (l, w, t) {
            var selected = {
                "华东": true,
                "华南": false
            };
            selected[t] = true;
            this.drawProPic(l, w);
            this.selected = selected;
        },
        changeLi: function (dom,disabled) {

            this.liid = dom;
//			this.dtype = tp;
            if (dom == 'kc') {
                this.dtype = 'dttb';
            } else {
                this.dtype = 'ecpic';
            }
            this.loadWdDom(this.liid);
            this.weidu = $("div.day_box > span:first", GX.modselector).attr("wd");
            $("div.day_box > span:first", GX.modselector).addClass('day_forecast');
//			this.drawProPic(this.liid,this.weidu);
//			this.drawDom(this.liid,this.weidu, this.dtype);
            if (dom == "cnclkgl") {
                this.selected = GX.cnclkgl_option.legend.selected;
            } else if (dom == "bgxq") {
                this.selected = GX.bgxq_option.legend.selected;
            } else if (dom == "jck") {
                this.selected =GX. jck_option.legend.selected;
            } else if (dom == "xyxq") {
                this.selected =GX. xyxq_option.legend.selected;
            } else if (dom == "kc") {
                this.selected = GX.kucun_option.legend.selected;
            } else if (dom == "gxyc") {
                if(this.productcode=='380-060'||this.productcode=='380-030'){
                    this.selected = GX.gxyu_nonKC_option.legend.selected;
                }
                else{
                    this.selected = GX.gxyc_option.legend.selected;
                }
            }

            var clickName = $("#" + dom + " > a", GX.modselector).html();
            var prdName = this.productname;

            ga('send', 'event', {
                'eventAction':  'tab点击',
                'eventCategory': clickName
            });
            if(disabled=='false'){
                $("#supplyPermissionLevel").show();
                $("#supplyPermission").hide();
            }else{
                //遮罩层遮住
                $("#supplyPermissionLevel").hide();
                $("#supplyPermission").show();

                return;
            }
            this.changeWd(this.weidu);
        },
        changeWd: function (wd) {
            this.weidu = wd;
//			this.drawProPic(this.liid,this.weidu);
            this.drawDom(this.liid, this.weidu, this.dtype);

            var clickName = $("[wd='" + wd + "']", GX.modselector).text();
            var tabName = $("#" + this.liid + " > a", "#gongxu").html();
            var prdName = this.productname;
            ga('send', 'event', {
                'eventAction': '维度选择',
                'eventCategory': clickName,
                'dimension3': tabName
            });
        },
        changeTbWd: function (wd) {
            this.weidu = wd;
            if ($("div.grd", "#" + GX.modelid).is(":visible")) {
                GX.drawTa(GX.liid, GX.weidu);
            } else {
                GX.drawProPic(GX.liid, GX.weidu);
            }
            var clickName = $("[wd='" + wd + "']", GX.modselector).text();
            var tabName = $("#" + this.liid + " > a", "#gongxu").html();
            var prdName = this.productname;
            ga('send', 'event', {
                'eventAction':  '维度选择',
                'eventCategory':clickName,
                'dimension3': tabName
            });
//			this.drawProPic(this.liid, this.weidu);
        },
        changePT: function () {
            if ($("div.grd", "#" + GX.modelid).is(":visible")) {
                $(".day_box", "#" + GX.modelid).show();
                $("div.qh_box > a", "#" + GX.modelid).html("切换为表");
                this.drawProPic(this.liid, this.weidu);
            } else {
                $(".day_box", "#" + GX.modelid).show();
                $("div.qh_box > a", "#" + GX.modelid).html("切换为图");
                this.drawTa(this.liid, this.weidu);
            }
            var pm=this.productname;
            ga('send', 'event', {
                'eventAction':  '图表切换',
                'eventCategory':pm+'-供需-库存-图表切换'
            });

//			$(".day_box","#"+GX.modelid).hide();
//			$("div.qh_box > a","#"+GX.modelid).html("切换为图");
//			this.drawTa(this.liid, this.weidu);
        },
        initDom: function () {
            $("div.data_nav_box > li.china", GX.modselector).bind("click", function () {
                $("li.china", $(this).parent()).removeClass("selected");
                $(this).addClass("selected");
            });

            $("div.data_nav_box > li.china > dl >dd", GX.modselector).bind("click", function () {
                $("dd", $(this).parent().parent().parent()).removeClass("selected");
                $(this).addClass("selected");
            });

            $("div.day_box > span", GX.modselector).bind("click", function () {
                $("span", $(this).parent()).removeClass('day_forecast');
                $(this).addClass('day_forecast');
            });

        },
        firstLoad: function () {
            this.liid = $("div.data_nav_box > li.china:first", GX.modselector).attr("id");
            this.dtype = $("div.data_nav_box > li.china:first", GX.modselector).attr("dtype");
            this.loadWdDom(this.liid,1);
            this.weidu = $("div.day_box > span:first", GX.modselector).attr("wd");

            $("li.china:first", GX.modselector).addClass("selected");
            $("div.day_box > span:first", GX.modselector).addClass('day_forecast');

//			this.drawProPic(this.liid,this.weidu);
//		    this.drawDom(this.liid,this.weidu, this.dtype);
            $("li.china:first", GX.modselector).trigger('click');
        },
        loadWdDom: function (liid,first) {
            var wdstr = $("li#" + liid).attr("wdstr");
            var arr = wdstr.split(",");
            var html = "";
            for (var i = 0; i < arr.length; i++) {
                var name = "";
                if (arr[i] == "day") {
                    name = "日";
                } else if (arr[i] == "week") {
                    name = "周";
                } else if (arr[i] == "month") {
                    name = "月";
                } else if (arr[i] == "year") {
                    name = "年";
                }
                if (this.dtype == 'ecpic') {
                    html += "<span wd=\"" + arr[i] + "\" onclick=\"GX.changeWd('" + arr[i] + "');\"><a>" + name + "</a></span>";
                } else if (this.dtype == 'dttb') {
                    html += "<span wd=\"" + arr[i] + "\" onclick=\"GX.changeTbWd('" + arr[i] + "');\"><a>" + name + "</a></span>";
                    var title = "<th  onclick=\"GX.sort_price(this,'YM','gx');\"><span style='cursor: pointer;font-size: 12px'>日期</span><span class='ascending_box'><a style='cursor: pointer' class='ascending01'></a>"+
                        "<a style='cursor: pointer' class='descending01'></a></span></th>" +
                        "<th  onclick=\"GX.sort_price(this,'Name','gx');\"><span style='cursor: pointer;font-size: 12px'>地区</span><span class='ascending_box'><a style='cursor: pointer' class='ascending01'></a>"+
                        "<a style='cursor: pointer' class='descending01'></a></span></th>"+
                        "<th  onclick=\"GX.sort_price(this,'Inventory','gx');\"><span style='cursor: pointer;font-size: 12px'>库存</span><span class='ascending_box'><a style='cursor: pointer' class='ascending01'></a>"+
                        "<a style='cursor: pointer' class='descending01'></a></span></th>"+
                        "<th  onclick=\"GX.sort_price(this,'rise','gx');\"><span style='cursor: pointer;font-size: 12px'>涨跌</span><span class='ascending_box'><a style='cursor: pointer' class='ascending01'></a>"+
                        "<a style='cursor: pointer' class='descending01'></a></span></th>"+
                        "<th><span style='cursor: pointer;font-size: 12px'>单位</span></th>";
                    $("#gongxu_tab").html();
                    $("#gongxu_tab").html(title);
                    $("#gongxu_tab").append("<tbody></tbody>");
                }
            }
            $("div#" + this.modelid).find("div.day_box").html("");
            $("div#" + this.modelid).find("div.day_box") .append(html);

        },
        showDetail: function (modcode) {
            var ls = window.localStorage;
            ls.setItem("sel", JSON.stringify(this.selected));   //将图例的选中信息保存到localStorage中
            window.location.href = modcode + "?productCode=" + this.productcode + "&moduleId=" + this.modelcode + "&ld=" + this.liid + "&wd=" + this.weidu;
            var pm=this.productname;
            ga('send', 'event', {
                'eventAction': '历史数据点击',
                'eventCategory':pm+'-供需-历史数据'
            });
        },
        resize: function () {
            if ($(myCharts.dom).is(':visible')) {
                myCharts.resize();
            }
        },
        drawTable: function (tabid, option) {
            var thead = "<thead><tr class='tb_title'>";
            for (var i = 0; i < option.datamap.length; i++) {
                if (option.datamap[i].sorting) {
                    var oj;
                    if (GX.order == "") {
                        oj = $.parseJSON("{" + this.order + "}");
                    } else {
                        oj = $.parseJSON(this.order);
                    }
                    var colname = option.datamap[i].value;
                    var sorthtml = "";
                    if (typeof oj[colname] === "undefined") {
                        sorthtml += '<a class="ascending01"></a><a class="descending01"></a>';
                    } else if (oj[colname] == 0) {
                        sorthtml += '<a class="ascending01"></a><a class="descending41"></a>';
                    } else {
                        sorthtml += '<a class="ascending42"></a><a class="descending01"></a>';
                    }
                    thead += '<th tg="' + option.datamap[i].tg + '" width="' + option.datamap[i].width + '%" style="cursor:hand;" onclick="GX.changeOrder(\'' + option.datamap[i].value + '\')"><span>' + option.datamap[i].name + '</span><span class="ascending_box">' + sorthtml + '</span></th>';
                } else {
                    thead += '<th tg="' + option.datamap[i].tg + '" width="' + option.datamap[i].width + '%"><span>' + option.datamap[i].name + '</span></th>';
                }
            }
            thead += "</tr></thead>";

            var tbody = "";
            if (option.data) {
                tbody += '<tbody>';
                for (var j = 1; j < option.data.length; j++) {
                    if (j % 2 == 0) {
                        tbody += '<tr style="cursor:pointer">';
                    } else {
                        tbody += '<tr class="tb_content" style="cursor:pointer">';
                    }

                    for (var x = 0; x < option.datamap.length; x++) {
                        var th = '';
                        if (option.datamap[x].value) {
                            var colvalue = option.datamap[x].value;
                            th = '<th tg="' + option.datamap[x].tg + '">' + option.data[j][colvalue] + '</th>';
                        }
                        if (option.datamap[x].render) {
                            var fc = option.datamap[x].render;
                            if (typeof fc === 'function') {
                                th = fc(option.data[j],option.data[j-1]);
                            } else {
                                $("#" + tabid).empty();
                                alert("表格配置了render属性时，需指定render为function类型，并返回一段表格字段的html代码。");
                                return;
                            }
                        }
                        tbody += th;
                    }

                    tbody += '</tr>';
                }
                tbody += '</tbody>';
            } else {
                tbody += "<tbody></tbody>";
            }

            var html = thead + tbody;
            $("#" + tabid).empty();
            $("#" + tabid).append(html);
            if (option.data == null) {
                var showContent = "暂无数据";
                var nodataStyle = "<tr  style='height:200px; top:35px; left:0; width:400px;'>" +
                    "<th id='nodata' colspan='5' style='text-align: center;font-size: 16px;'>" + showContent + "</th>" +
                    "</tr>";
                $("#" + tabid).append(nodataStyle);
                $("#nodata").unbind(e);
            }

            for (var n = 0; n < option.datamap.length; n++) {
                if (option.datamap[n].hidden) {
                    var tgn = option.datamap[n].tg;
                    $("th[tg='" + tgn + "']").hide();
                }
            }
        },
        KcTable: function (newArray_price) {
            var wb1 = 1;
            var wb2 = 1;
            var tr_price;
            var content_kc;
            if (newArray_price != '' && newArray_price != null && newArray_price != 'undefined') {
                for (var i = 0; i <newArray_price.length; i++) {
                    var value = 0;
                    if (newArray_price[i].Inventory) {
                        value = (newArray_price[i].rise).toFixed(2);
                        //添加一个属性
                    }
                    var str = "";
                    if (value > 0) {
                        str = '<th style="width:20%;"><span style="color:#ff0000;">+' + value + '</span></th>';
                    }
                    else if(value<0) {
                        str = '<th style="width:20%;"><span style="color:#00c533;">' + value + '</span></th>';
                    }
                    else{
                        str = '<th style="width:20%;"><span>+' + value + '</span></th>';
                    }
                    var codeName = newArray_price[i].Name;
                    if (wb1 == 1) {
                        tr_price = '<tr style="cursor:pointer" class="tb_content">';
                        wb1 = wb1 + 1;
                    } else if (wb1 == 2) {
                        tr_price = '<tr style="cursor:pointer">';
                        wb1 = wb1 - 1;
                    }
                    content_kc = content_kc + tr_price +
                        '<th style="width:20%;">' + newArray_price[i].YM + '</th>' +
                        '<th style="width:20%;" class="codename">' + codeName + '</th>' +
                        '<th style="width:20%;">' + newArray_price[i].Inventory + '</th>' +
                        str +
                        '<th style="width:20%;">' + newArray_price[i].Unit + '</th>' +
                        '</tr>';
                    /* }else{*/
                    if (wb2 == 1) {
                        tr_price = '<tr style="cursor:default" class="tb_content" >';
                        wb2 = wb2 + 1;
                    } else if (wb2 == 2) {
                        tr_price = '<tr style="cursor:default" >';
                        wb2 = wb2 - 1;
                    }

                }

            }
            else {
                content_kc = "<div style='height:260px; top:35px; left:0; width:100%; text-align: center;vertical-align:middle;display: table-cell;'>无数据</div>";
                $("#gongxu_tab>th").remove();
            }
            $("#gongxu_tab>tbody").html(content_kc);
        },
        //排序方法
        sort_price: function (obj, field,modle) {
            var order = commonSort2(obj);
            KcArr = sortArray2(KcArr, field, order);
            this.KcTable(KcArr);
            var pm=this.productname;
            ga('send', 'event', {
                'eventAction': '表格排序',
                'eventCategory': pm+'-供需-库存排序'
            });
        }
    }
}();
$(function () {
    GX.init();
});
window.addEventListener("resize", function () {
    GX.resize();
});