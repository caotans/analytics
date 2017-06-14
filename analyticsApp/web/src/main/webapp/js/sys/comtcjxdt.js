var  myCharts;
CMTCJXDT = function () {
    var ls = window.localStorage;
    var DownloadElse;
    return {
        init: function () {
            this.liid;
            this.idxid;
            this.weidu;
//			this.option = option;
            this.filter = "";
            this.order = "";
            this.pindex = 1;
            this.psize = 15;
            this.pagetool;

            this.companyid = ls.getItem("companyid");
            this.productcode = ls.getItem("productcode");

            this.curDate = $("#curDate").val();
            this.lyDate = $("#lyDate").val();
            myCharts = echarts.init(document.getElementById('tb_tcjxDetail'));
//			$("li.details_nav:first").trigger('click');
            this.firstLoad();
        },
        changeLi: function (liid,OtherDownload) {
            if(OtherDownload){
                CMTCJXDT.DownloadElse=OtherDownload;
            }
            this.liid = liid;
            this.idxid = $("li#" + this.liid + ".details_nav").attr("idxid");
            this.loadWdDom(this.liid);

            $("li.details_nav").removeClass("selected");
            $("li#" + this.liid + ".details_nav").addClass("selected");

            $("div.big_wd > span:first").trigger("click");

            var tabName;
            if(this.liid=='tcjx_dt'){tabName='停车检修';}
            else if(this.liid=='kjgt_dt'){tabName='扩建关停';}
            ga('send','event',{
                'eventCategory':'企业分析tab点击',
                'eventAction':'停车检修/扩建关停详情-'+tabName
            })
        },
        changeWd: function (weidu) {
            this.weidu = weidu;

            $("div.big_wd > span").removeClass("wd_r");
            $("div.big_wd > span[wd='" + this.weidu + "']").addClass("wd_r");

//			this.drawProPic(this.idxid,this.weidu);
            this.drawTable(this.idxid, this.weidu, 1, true);
        },
        search: function () {
//			this.drawProPic(this.idxid, this.weidu);
            $("#tb_tcjxDetail").height(290);
            myCharts = echarts.init(document.getElementById('tb_tcjxDetail'));
            myCharts.showLoading({
                text: '正在努力的读取数据中...',    //loading话术
                effect: 'whirling'
            });
            $("#tb_tcjx_bottom").hide();
            this.drawTable(this.idxid, this.weidu, 1, true);
            ga('send','event',{
                'eventCategory':'企业分析tab点击',
                'eventAction':'停车检修/扩建关停-详情查询'
            })
        },
        drawTable: function (l, w, pindex, isPaging) {
            var ksrq = $("#searchstart").val();
            var jsrq = $("#searchend").val();
            var aj = $.ajax({
                type: "POST",
                dataType: "json",
                url: "CMTCJXDTData?li=" + l + "&wd=" + w + "&pindex=" + pindex + "&psize=" + CMTCJXDT.psize
                    + "&companyid=" + CMTCJXDT.companyid + "&productcode=" + CMTCJXDT.productcode
                    + "&order=" + encodeURI(encodeURI(CMTCJXDT.order)) + "&ksrq=" +ksrq + "&jsrq=" + jsrq,
                timeout: 100000, //超时时间设置，单位毫秒
                success: function (data) {
                    var opt;
                    if (l == "tcjx") {
		       var dataArray=data.response.data;
                        if(dataArray){
                            dataArray=getPermissionByTime(CMTCJXDT.DownloadElse,dataArray,"ExpectedEnd","/",w);
                        }
                        if(CMTCJXDT.productcode=='380-030'){   //PE
                            opt = {
                                data: dataArray,
                                datamap: [
                                    {
                                        name: '工厂', //字段中文名，绘制table时会展示在表头
                                        value: 'factory', //后台的字段名
                                        width: 10, //字段所占百分比宽度
                                        hidden: false,//hidden为true时必须设置tg属性
                                        tg: 0, //字段标识，不得重复
                                        sorting: true
                                    },
                                    {
                                        name: '级别',
                                        value: 'Name',
                                        width: 10,
                                        tg: 1,
                                        sorting: true
                                    },
                                    {
                                        name: '装置编号',
                                        value: 'LineNumber',
                                        width: 10,
                                        tg: 1,
                                        sorting: true
                                    },
                                    {
                                        name: '类型',
                                        value: 'recordType',
                                        width: 10,
                                        tg: 1,
                                        sorting: true
                                    },
                                    {
                                        name: '状态',
                                        value: 'recordState',
                                        width: 10,
                                        tg: 2,
                                        sorting: true
                                    },
                                    {
                                        name: '基准开工率',
                                        value: 'FiducialOperationRate',
                                        width: 10,
                                        tg: 3,
                                        sorting: true
                                    },
                                    {
                                        name: '产能（万吨/年）',
                                        value: 'Capacity',
                                        width: 10,
                                        tg: 4,
                                        sorting: true
                                    },
                                    {
                                        name: '影响产量（万吨）',
                                        value: 'ProductionImpact',
                                        width: 10,
                                        tg: 5,
                                        sorting: true
                                    },
                                    {
                                        name: '开始时间',
                                        value: 'ExpectedStart',
                                        width: 10,
                                        tg: 6,
                                        sorting: true
                                    },
                                    {
                                        name: '结束时间',
                                        value: 'ExpectedEnd',
                                        width: 10,
                                        tg: 7,
                                        sorting: true
                                    }
                                ]
                            };
                        }else if(CMTCJXDT.productcode=='380-060'){    //PP
                            opt = {
                                data: dataArray,
                                datamap: [
                                    {
                                        name: '工厂', //字段中文名，绘制table时会展示在表头
                                        value: 'factory', //后台的字段名
                                        width: 10, //字段所占百分比宽度
                                        hidden: false,//hidden为true时必须设置tg属性
                                        tg: 0, //字段标识，不得重复
                                        sorting: true
                                    },
                                    {
                                        name: '装置编号',
                                        value: 'LineNumber',
                                        width: 10,
                                        tg: 1,
                                        sorting: true
                                    },
                                    {
                                        name: '类型',
                                        value: 'recordType',
                                        width: 10,
                                        tg: 1,
                                        sorting: true
                                    },
                                    {
                                        name: '状态',
                                        value: 'recordState',
                                        width: 10,
                                        tg: 2,
                                        sorting: true
                                    },
                                    {
                                        name: '基准开工率',
                                        value: 'FiducialOperationRate',
                                        width: 10,
                                        tg: 3,
                                        sorting: true
                                    },
                                    {
                                        name: '产能（万吨/年）',
                                        value: 'Capacity',
                                        width: 10,
                                        tg: 4,
                                        sorting: true
                                    },
                                    {
                                        name: '影响产量（万吨）',
                                        value: 'ProductionImpact',
                                        width: 10,
                                        tg: 5,
                                        sorting: true
                                    },
                                    {
                                        name: '开始时间',
                                        value: 'ExpectedStart',
                                        width: 10,
                                        tg: 6,
                                        sorting: true
                                    },
                                    {
                                        name: '结束时间',
                                        value: 'ExpectedEnd',
                                        width: 10,
                                        tg: 7,
                                        sorting: true
                                    }
                                ]
                            };
                        }else{
                            opt = {
                               data: dataArray,
                                datamap: [
                                    {
                                        name: '工厂', //字段中文名，绘制table时会展示在表头
                                        value: 'factory', //后台的字段名
                                        width: 10, //字段所占百分比宽度
                                        hidden: false,//hidden为true时必须设置tg属性
                                        tg: 0, //字段标识，不得重复
                                        sorting: true
                                    },
                                    {
                                        name: '类型',
                                        value: 'recordType',
                                        width: 10,
                                        tg: 1,
                                        sorting: true
                                    },
                                    {
                                        name: '状态',
                                        value: 'recordState',
                                        width: 10,
                                        tg: 2,
                                        sorting: true
                                    },
                                    {
                                        name: '基准开工率',
                                        value: 'FiducialOperationRate',
                                        width: 10,
                                        tg: 3,
                                        sorting: true
                                    },
                                    {
                                        name: '产能（万吨/年）',
                                        value: 'Capacity',
                                        width: 10,
                                        tg: 4,
                                        sorting: true
                                    },
                                    {
                                        name: '影响产量（万吨）',
                                        value: 'ProductionImpact',
                                        width: 10,
                                        tg: 5,
                                        sorting: true
                                    },
                                    {
                                        name: '开始时间',
                                        value: 'ExpectedStart',
                                        width: 10,
                                        tg: 6,
                                        sorting: true
                                    },
                                    {
                                        name: '结束时间',
                                        value: 'ExpectedEnd',
                                        width: 10,
                                        tg: 7,
                                        sorting: true
                                    }
                                ]
                            };
                        }

                    } else if (l == "kjgt") {
		      var dataArray=data.response.data;
                        if(dataArray){
                            dataArray=getPermissionByTime(CMTCJXDT.DownloadElse,dataArray,"timeDate","/",w);
                        }
                        if(CMTCJXDT.productcode=='380-030'){   //PE
                            opt = {
                                data: dataArray,
                                datamap: [
                                    {
                                        name: '扩建/关停日期', //字段中文名，绘制table时会展示在表头
                                        value: 'timeDate', //后台的字段名
                                        width: 10, //字段所占百分比宽度
                                        hidden: false,//hidden为true时必须设置tg属性
                                        tg: 0, //字段标识，不得重复
                                        sorting: true
                                    },
                                    {
                                        name: '工厂',
                                        value: 'factory',
                                        width: 10,
                                        tg: 1,
                                        sorting: true
                                    },
                                    {
                                        name: '级别',
                                        value: 'Name',
                                        width: 10,
                                        tg: 2,
                                        sorting: true
                                    },
                                    {
                                        name: '装置编号',
                                        value: 'LineNumber',
                                        width: 10,
                                        tg: 2,
                                        sorting: true
                                    },
                                    {
                                        name: '类型',
                                        value: 'recordType',
                                        width: 10,
                                        tg: 2,
                                        sorting: true
                                    },
                                    {
                                        name: '状态',
                                        value: 'recordState',
                                        width: 10,
                                        tg: 3,
                                        sorting: true
                                    },
                                    {
                                        name: '产能（万吨/年）',
                                        value: 'Capacity',
                                        width: 10,
                                        tg: 4,
                                        sorting: true
                                    },
                                    {
                                        name: '影响产量（万吨）',
                                        value: 'ProductionImpact',
                                        width: 10,
                                        tg: 5,
                                        sorting: true
                                    }
                                ]
                            };
                        }else if(CMTCJXDT.productcode=='380-060'){    //PP
                            opt = {
                                data: dataArray,
                                datamap: [
                                    {
                                        name: '扩建/关停日期', //字段中文名，绘制table时会展示在表头
                                        value: 'timeDate', //后台的字段名
                                        width: 10, //字段所占百分比宽度
                                        hidden: false,//hidden为true时必须设置tg属性
                                        tg: 0, //字段标识，不得重复
                                        sorting: true
                                    },
                                    {
                                        name: '工厂',
                                        value: 'factory',
                                        width: 10,
                                        tg: 1,
                                        sorting: true
                                    },
                                    {
                                        name: '装置编号',
                                        value: 'LineNumber',
                                        width: 10,
                                        tg: 2,
                                        sorting: true
                                    },
                                    {
                                        name: '类型',
                                        value: 'recordType',
                                        width: 10,
                                        tg: 2,
                                        sorting: true
                                    },
                                    {
                                        name: '状态',
                                        value: 'recordState',
                                        width: 10,
                                        tg: 3,
                                        sorting: true
                                    },
                                    {
                                        name: '产能（万吨/年）',
                                        value: 'Capacity',
                                        width: 10,
                                        tg: 4,
                                        sorting: true
                                    },
                                    {
                                        name: '影响产量（万吨）',
                                        value: 'ProductionImpact',
                                        width: 10,
                                        tg: 5,
                                        sorting: true
                                    }
                                ]
                            };
                        }else{
                            opt = {
                                data: dataArray,
                                datamap: [
                                    {
                                        name: '扩建/关停日期', //字段中文名，绘制table时会展示在表头
                                        value: 'timeDate', //后台的字段名
                                        width: 10, //字段所占百分比宽度
                                        hidden: false,//hidden为true时必须设置tg属性
                                        tg: 0, //字段标识，不得重复
                                        sorting: true
                                    },
                                    {
                                        name: '工厂',
                                        value: 'factory',
                                        width: 10,
                                        tg: 1,
                                        sorting: true
                                    },
                                    {
                                        name: '类型',
                                        value: 'recordType',
                                        width: 10,
                                        tg: 2,
                                        sorting: true
                                    },
                                    {
                                        name: '状态',
                                        value: 'recordState',
                                        width: 10,
                                        tg: 3,
                                        sorting: true
                                    },
                                    {
                                        name: '产能（万吨/年）',
                                        value: 'Capacity',
                                        width: 10,
                                        tg: 4,
                                        sorting: true
                                    },
                                    {
                                        name: '影响产量（万吨）',
                                        value: 'ProductionImpact',
                                        width: 10,
                                        tg: 5,
                                        sorting: true
                                    }
                                ]
                            };
                        }

                    }
                    if (data.response.data) {
                        CMTCJXDT.drawDtTable(opt, "cmsddt", l);
                        if (isPaging) {
                            CMTCJXDT.initPagination(l, w, "cmsddt_pg", data.response.ptotal);
                        }
                        myCharts.hideLoading();
                        $("#tb_tcjx_bottom").show();
                        $("#tb_tcjxDetail").empty();
                        $("#tb_tcjxDetail").height(0);
                    } else {
                        myCharts.hideLoading();
                        $("#tb_tcjx_bottom").show();
                        $("#tb_tcjxDetail").empty();
                        $("#tb_tcjxDetail").height(0);
                        CMTCJXDT.drawDtTable(opt, "cmsddt", l);
                        CMTCJXDT.initPagination(l, w, "cmsddt_pg", 0);
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
            this.drawTable(this.idxid, this.weidu, 1, false);
            //分页控件跳转至第一页
            $('#cmsddt_pg').jqPaginator('option', {
                currentPage: 1
            });
            ga('send', 'event', {
                'eventAction': '表格排序',
                'eventCategory': "停车检修/扩建关停详情-排序"
            });
        },
        drawDtTable: function (option, tabid, l) {
            var thead = "";
            var tbody = "";
            thead += "<thead><tr class='enterprise_bt'>";
            for (var i = 0; i < option.datamap.length; i++) {
                if (option.datamap[i].sorting) {
                    var oj;
                    if (CMTCJXDT.order == "") {
                        oj = $.parseJSON("{" + this.order + "}");
                    } else {
                        oj = $.parseJSON(this.order);
                    }
                    var colname = option.datamap[i].value;
                    var sorthtml = "";
                    if (typeof oj[colname] === "undefined") {
                        sorthtml += '<a class="ascending"></a><a class="descending"></a>';
                    } else if (oj[colname] == 0) {
                        sorthtml += '<a style="margin-top:-12px;" class="ascending"></a>';
                    } else {
                        sorthtml += '<a style="margin-top:-12px;" class="descending"></a>';
                    }
                    thead += '<th tg="' + option.datamap[i].tg + '" width="' + option.datamap[i].width + '%" style="cursor:pointer;" onclick="CMTCJXDT.changeOrder(\'' + option.datamap[i].value + '\')"><span>' + option.datamap[i].name + '</span><span class="ascending_box">' + sorthtml + '</span></th>';
                } else {
                    thead += '<th tg="' + option.datamap[i].tg + '" width="' + option.datamap[i].width + '%"><span>' + option.datamap[i].name + '</span></th>';
                }
            }
            thead += "</tr></thead>";
            if (option.data) {
                tbody += '<tbody>';
                for (var j = 0; j < option.data.length; j++) {
                    if (j % 2 == 0) {
                        tbody += '<tr>';
                    } else {
                        tbody += '<tr class="enterprise_nr01">';
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
                                th = fc(option.data[j]);
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
                var content;
                if (l == 'tcjx') {
                    content = '无停车检修';
                } else if (l == 'kjgt') {
                    content = '无扩建/关停';
                }
                tbody += "<tr style='height:200px; left:100; width:200px;'>" +
                    "<th colspan='8' style='text-align: center;font-size: 16px;'>" + content + "</th>" +
                    "</tr>";
            }

            var html = thead + tbody;
            $("#" + tabid).empty();
            $("#" + tabid).append(html);

            if (option.data) {
                for (var n = 0; n < option.datamap.length; n++) {
                    if (option.datamap[n].hidden) {
                        var tgn = option.datamap[n].tg;
                        $("th[tg='" + tgn + "']").hide();
                    }
                }
            }
        },
        /*
         * 初始化分页插件
         */
        initPagination: function (l, w, id, pTotal) {
            if (pTotal > 0) {
                CMTCJXDT.pagetool = $("#" + id).jqPaginator({
                    totalPages: pTotal,
                    visiblePages: 5,
                    currentPage: 1,
                    activeClass: "page_number_select",
                    prev: '<span class="prev"><a href="javascript:;">上一页</a></span>',
                    next: '<span class="next"><a href="javascript:;">下一页</a></span>',
                    page: '<span class="page"><a href="javascript:;">{{page}}</a></span>',
                    first: '<span class="first"><a href="javascript:;">1</a></span>',
                    last: '<span class="last"><a href="javascript:;">{{totalPages}}</a></span>',
                    omit: '<span class="disabled"><a href="javascript:;">...</a></span>',
                    onPageChange: function (num, type) {
                        if (type == "change") {
                            CMTCJXDT.drawTable(l, w, num, false);
                        }
                    }
                });
            } else { //没有数据
                $("#" + id).empty();
            }
        },
        loadWdDom: function (liid) {
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
                html += "<span wd=\"" + arr[i] + "\" onclick=\"CMTCJXDT.changeWd('" + arr[i] + "');\"><a>" + name + "</a></span>";
            }
            $("div.big_wd").html("");
            $("div.big_wd").append(html);
        },
        firstLoad: function () {
            this.liid = $("#pld").val();
            this.idxid = $("li#" + this.liid + ".details_nav").attr("idxid");
            this.weidu = $("#pwd").val();

            $("li#" + this.liid + ".details_nav").addClass("selected");
            this.loadWdDom(this.liid);

            $("#searchstart").datepicker('setDate', this.lyDate);
            $("#searchend").datepicker('setDate', this.curDate);

            $("div.big_wd > span[wd='" + this.weidu + "']").trigger('click');
        },
        backToIdx: function () {
            $("div.content_box").show();
            $("div.dt_box").hide();
        },
//		resize : function(){
//			myCharts.resize();
//		},
        getDataSource: function () {
            var ksrq = $("#searchstart").val();
            var jsrq = $("#searchend").val();
            var arr = [];
            var aj = $.ajax({
                type: "POST",
                dataType: "json",
                async: false,
                url: "CMTCJXDTData?li=" + CMTCJXDT.idxid + "&wd=" + CMTCJXDT.weidu + "&pindex=1&psize=10000"
                    + "&companyid=" + CMTCJXDT.companyid + "&productcode=" + CMTCJXDT.productcode
                    + "&order=" + encodeURI(encodeURI(CMTCJXDT.order)) + "&ksrq=" + ksrq + "&jsrq=" + jsrq,
                timeout: 100000, //超时时间设置，单位毫秒
                success: function (data) {
                    if (data != null) {
                        var datasrc = data.response.data;
                        if (CMTCJXDT.idxid == "tcjx") {
                            datasrc= getPermissionByTime(CMTCJXDT.DownloadElse,datasrc,"ExpectedEnd","/",CMTCJXDT.weidu);
                            console.log(datasrc);
                            for (var i = 0; i < datasrc.length; i++) {
                                arr.push([datasrc[i].factory, datasrc[i].recordType, datasrc[i].recordState,
                                    datasrc[i].FiducialOperationRate, datasrc[i].Capacity, datasrc[i].ProductionImpact,
                                    datasrc[i].ExpectedStart, datasrc[i].ExpectedEnd]);

                            }
                        } else if (CMTCJXDT.idxid == "kjgt") {
                            datasrc= getPermissionByTime(CMTCJXDT.DownloadElse,datasrc,"timeDate","/",CMTCJXDT.weidu);
                            console.log(datasrc);
                            for (var i = 0; i < datasrc.length; i++) {
                                arr.push([datasrc[i].timeDate, datasrc[i].factory, datasrc[i].recordType,
                                    datasrc[i].recordState, datasrc[i].Capacity, datasrc[i].ProductionImpact]);

                            }
                        }


                    } else {
                        alert("暂无数据！");
                    }
                },
                error: function (xhr, e) {
                    console.log(xhr, e)
                }
            });
            return arr;
        },
        exportExcel: function () {
            if(CMTCJXDT.DownloadElse==1){
                alert("您尚未开通下载Excel权限!");
                return;
            }else {
            $("div.exl > a").removeAttr("onclick");
            var ds = CMTCJXDT.getDataSource();
            var array = ds;
            var sheetName = [];
            var titleName = [];
            if (this.idxid == "tcjx") {
                sheetName = ["停车检修"];
                titleName = [
                    ["工厂", "类型", "状态", "基准开工率", "产能（万吨/年）", "影响产量（万吨）", "开始时间", "结束时间"]
                ];
            } else if (this.idxid == "kjgt") {
                sheetName = ["扩建、关停"];
                titleName = [
                    ["扩建/关停日期", "工厂", "类型", "状态", "产能（万吨/年）", "影响产量（万吨）"]
                ];
            }
            $("#titleName").val(JSON.stringify(titleName));
            $("#fileName").val(JSON.stringify(sheetName));
            $("#sheetName").val(JSON.stringify(sheetName));
            $("#excelArray").val(JSON.stringify([array]));
            $("div.exl > a").attr("onclick", "CMTCJXDT.exportExcel();");
            //$('#hyExport').submit();
                ga('send','event',{
                    'eventCategory':'企业分析tab点击',
                    'eventAction':'停车检修/扩建关停-导出'
                })
            }
        }
    }
}();

$(function () {
    CMTCJXDT.init();
});
//function exportExcel(){
//	var ds = CMTCJXDT.getDataSource();
//    var array=ds;
//    var sheetName=["供需详情"];
//    var titleName=[["时间","类型","类型值"]];
//    $("#titleName").val(JSON.stringify(titleName));
//    $("#fileName").val(JSON.stringify(sheetName));
//    $("#sheetName").val(JSON.stringify(sheetName));
//    $("#excelArray").val(JSON.stringify([array]));
//    $('#hyExport').submit() ;
//}