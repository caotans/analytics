<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="-1">
<!doctype html>
<html>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <title>下游详情</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <link href="css/datepicker3.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/ec_model.js"></script>

    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="js/echarts/build/dist/echarts-all.js"></script>
    <script type="text/javascript" src="js/ec_model.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/sys/downstreamDetails.js"></script>
    <script type="text/javascript" src="js/sys/pagination.js"></script>
    <script type="text/javascript" src="js/sys/util.js"></script>
    <style>
        .echartAuto{
            width:950px;height:360px;
        }
    </style>
    <script>
        $(document).ready(function(){
            var pm=$(".product01").text();
            this.title=pm+'-下游详情';
        });
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//        })(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');

        ga('create', GA_ID, 'auto');
        ga('send', 'pageview');

    </script>
    <script>
        $(document).ready(function(){
            downstreamDetailsLegend=null;
            var ls = window.localStorage;
            downstreamDetailsLegend=JSON.parse(ls.getItem("downstreamDetailsLegend"));
            var downDetailsFirstTab=${downDetailsFirstTab};
            if(downDetailsFirstTab){
                downstreamDetailsInitTime('${downDetailsFirstTab.CycleStr}','${downDetailsFirstTab.CycleName}','${downDetailsFirstTab.ProductTabId}');
                if(downLoadType['downstream_module'][downDetailsFirstTab.Remark]==true){//价格数据
                    DownloadInfo='${downDetailsFirstTab.PriceDownload}';
                }else{//非价格数据
                    DownloadInfo='${downDetailsFirstTab.OtherDownload}';
                }
                downstreamDetailsFirstLoad('','${downstreamDetailsCheckTime}','','${downDetailsFirstTab.ProductTabId}');
            }else{
                downstreamDetailsInitTime('${jsonObjectTab[0].CycleStr}','${jsonObjectTab[0].CycleName}','${jsonObjectTab[0].ProductTabId}');
                var type='${jsonObjectTab[0].Remark}';
                if(downLoadType['downstream_module'][type]==true){//价格数据
                    DownloadInfo='${jsonObjectTab[0].PriceDownload}';
                }else{//非价格数据
                    DownloadInfo='${jsonObjectTab[0].OtherDownload}';
                }
                downstreamDetailsFirstLoad('','${downstreamDetailsCheckTime}','','${jsonObjectTab[0].ProductTabId}');
            }
        });

    </script>
</head>
<body>
<jsp:include page="../include/top.jsp"></jsp:include>
<jsp:include page="../include/menu.jsp"></jsp:include>
<jsp:include page="../include/navigation.jsp"></jsp:include>
<!-- 默认第一个tab页面-->
<!-- 默认第一个tab页面-->
<input type="hidden" id="downstreamDetailsTab" value="${downstreamDetailsTab}">
<input type="hidden" id="downstreamDetailsTime" value="${downstreamDetailsCheckTime}">
<!-- 首页的默认品目ID-->
<input type="hidden" id="projectDownstreamDetailsCode" value="${productCode}">
<!-- 利润展示某行记录-->
<input type="hidden" id="downstreamDetailsProductCode" value="${downstreamDetailsProductCode}">
<div  class="fh_box"><a href="javascript:void('0')" onclick="window.history.back()">&nbsp;&nbsp;返回</a></div>
<form action="exportExcelUtils" id="downtreamDetailExport" method="post">
    <input type="hidden"  name="fileName" value="下游详情">
    <input type="hidden"  name="url" value="array">
    <input type="hidden" id="excelArray" name="excelArray" value="">
    <input type="hidden" id="titleName" name="titleName" value="">
    <input type="hidden" id="sheetName" name="sheetName" value="">
    <input type="hidden" id="keyName" name="keyName" value="">
</form>
<form action="exportEchartsImg" id="exportEchartsImg" method="post">
    <input type="hidden" id="imageDataFileName" name="fileName">
    <input type="hidden" id="imageDataUrl" name="url">
</form>
<div class="big_box">
    <div class="details_top_nav" id="downstreamTab">
        <c:forEach var="list" varStatus="i" items="${jsonDownstreamTab}">
            <li class="details_nav" id="downstreamDetailsLi_${list.Remark}" picdom="tb_downstreamDetails"><a href="javascript:void('0')" onclick=" changDownstreamDetailsTab('${list.Remark}','${list.Remark}','${list.CycleStr}','${list.CycleName}','${list.ProductTabId}','${list.PriceDownload}','${list.OtherDownload}')">${list.NAME}</a>
            </li>
        </c:forEach>
        <div class="clearfix"></div>
    </div>

    <div class="details_box">
        <div class="details_top">
            <p>查询范围：</p>
        <div class="calendar">
            <input type="text" class="start" id="downstreamDetailsCalendarStart"  style="color: #fff;padding-left: 5px;"/>
            <span></span>
            <input type="text" class="end" id="downstreamDetailsCalendarEnd"  style="color: #fff;padding-left: 5px;"/>
            <div class="calendar_ss"><a id="downstreamDetailsSearch" href="javascript:void('0')" onclick="downstreamDetailsSearch('${downDetailsFirstTab.ProductTabId}','${jsonObjectTab[0].ProductTabId}')">搜索</a></div>
        </div>
            <!--时间维度 -->
            <div class="big_wd" id="downstreamDetailsDiv">

            </div>
            <p class="jg_wd">维度：</p>
            <div class="clearfix"></div>
        </div>

        <div class="details_right">
            <div class="chart_box" id="downstreamDetailsEcharts" style="width: 100%;">图表位置</div>

        </div>
        <div class="details_bottom" >
            <div class="details_bottom_box">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr class="details_bottom_t" id="downstreamDetailsTable">
                    </tr>
                </table>
            </div>
            <div class="page_number_big_box">
                <div class="page_number_box01">

                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="../include/foot.jsp"></jsp:include>
<script>
    $('#downstreamDetailsCalendarStart').datepicker({
        todayBtn : "linked",
        autoclose : true,
        todayHighlight : false,
        keyboardNavigation:false,
        forceParse:false

    }).on('changeDate',function(e){
                var startTime = e.date;
                $('#downstreamDetailsCalendarEnd').datepicker('setStartDate',startTime);
            });
    $('#downstreamDetailsCalendarEnd').datepicker({
        todayBtn : "linked",
        autoclose : true,
        todayHighlight : false,
        keyboardNavigation:false,
        forceParse:false

    }).on('changeDate',function(e){
                var endTime = e.date;
                $('#downstreamDetailsCalendarStart').datepicker('setEndDate',endTime);
            });
</script>
</body>
</html>
