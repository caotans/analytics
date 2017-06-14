<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/include/includes.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>上游详情</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <link href="css/datepicker3.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/ec_model.js"></script>
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="js/echarts/build/dist/echarts-all.js"></script>
    <script type="text/javascript" src="js/ec_model.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/sys/upstreamDetails.js"></script>
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
            this.title=pm+'-上游详情';
        });
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//        })(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', GA_ID, 'auto');
        ga('send', 'pageview');

    </script>
    <script>
        $(document).ready(function(){
            upstreamDetailsLegend=null;
            var ls = window.localStorage;
            upstreamDetailsLegend=JSON.parse(ls.getItem("upstreamDetailsLegend"));
            var upstreamDetailsFirstTab=${upstreamDetailsFirstTab};
            if(upstreamDetailsFirstTab){
                upstreamDetailsHowManyTime('${upstreamDetailsFirstTab.CycleStr}','${upstreamDetailsFirstTab.CycleName}','${upstreamDetailsFirstTab.ProductTabId}');
                if(downLoadType['upstream_module'][upstreamDetailsFirstTab.Remark]==true){//价格数据
                    DownloadInfo=upstreamDetailsFirstTab.PriceDownload;
                }else{//非价格数据
                    DownloadInfo=upstreamDetailsFirstTab.OtherDownload;
                }

                upstreamDetailsFirstLoad('','${upstreamCheckTime}','','${upstreamDetailsFirstTab.ProductTabId}','');
            }else{
                upstreamDetailsHowManyTime('${jsonObjectTab[0].CycleStr}','${jsonObjectTab[0].CycleName}','${jsonObjectTab[0].ProductTabId}');
                var type=${jsonObjectTab[0].Remark};
                if(downLoadType['upstream_module'][type]==true){//价格数据
                    DownloadInfo='${jsonObjectTab[0].PriceDownload}';
                }else{//非价格数据
                    DownloadInfo='${jsonObjectTab[0].OtherDownload}';
                }
                upstreamDetailsFirstLoad('','${upstreamCheckTime}','','${jsonObjectTab[0].ProductTabId}');
            }



        });
    </script>
</head>
<body>
<jsp:include page="../include/top.jsp"></jsp:include>
<jsp:include page="../include/menu.jsp"></jsp:include>
<jsp:include page="../include/navigation.jsp"></jsp:include>
<!-- 默认第一个tab页面-->
<input type="hidden" id="upstreamDetailsTab" value="${upstreamDetailsTab}">
<input type="hidden" id="upstreamDetailsTime" value="${upstreamCheckTime}">
<input type="hidden" id="upstreamDetailsType" value="${upstreamDetailsType}">
<form action="exportEchartsImg" id="exportEchartsImg" method="post">
    <input type="hidden" id="imageDataFileName" name="fileName">
    <input type="hidden" id="imageDataUrl" name="url">
</form>
<form action="exportExcelUtils" id="upstreamDetailsExport" method="post">
    <input type="hidden"  name="fileName" value="上游详情">
    <input type="hidden"  name="url" value="array">
    <input type="hidden" id="excelArray" name="excelArray" value="">
    <input type="hidden" id="titleName" name="titleName" value="">
    <input type="hidden" id="sheetName" name="sheetName" value="">
    <input type="hidden" id="keyName" name="keyName" value="">
</form>
<div  class="fh_box"><a href="javascript:void('0')" onclick="window.history.back()">&nbsp;&nbsp;返回</a></div>
<div class="big_box">
    <div class="details_top_nav">
        <c:forEach var="list" varStatus="i" items="${listData}">
            <li class="details_nav11" id="upstreamDetails_${list.code}" picdom="tb_upstreamDetails"><a href="javascript:void('0')"style="cursor:default ">${list.Name}</a>
                <dl>
                    <c:forEach items="${list.jsonObjectTab}" var="json" >
                        <dd><a href="javascript:void('0')" onclick="changUpstreamDetailsSelect('${list.code}','${json.Remark}','${json.CycleStr}','${json.CycleName}','${json.ProductTabId}','${json.PriceDownload}','${json.OtherDownload}')">${json.NAME}</a></dd>
                    </c:forEach>

                </dl>
            </li>
        </c:forEach>
            <div class="clearfix"></div>
    </div>

    <div class="details_box">
        <div class="details_top">
            <p>查询范围：</p>
        <div class="calendar">
            <input type="text" class="start" id="upstreamDetailsCalendarStart"  style="color: #fff;padding-left: 5px;"/>
            <span></span>
            <input type="text" class="end" id="upstreamDetailsCalendarEnd"   style="color: #fff;padding-left: 5px;"/>
            <div class="calendar_ss"><a id="upstreamDetailsSearchDom" href="javascript:void('0')" onclick="upstreamDetailsSearch('${upstreamDetailsFirstTab.ProductTabId}','${jsonObjectTab[0].ProductTabId}')">搜索</a></div>
        </div>
            <!--时间维度 -->
            <div class="big_wd" id="upstreamDetailsDiv">

            </div>
            <p class="jg_wd">维度：</p>
            <div class="clearfix"></div>
        </div>

        <div class="details_right">
            <div class="chart_box" id="upstreamDetailsEcharts" style="width: 100%;">图表位置</div>

        </div>
        <div class="details_bottom" >
            <div class="details_bottom_box">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr class="details_bottom_t" id="upstreamDetailsTable">
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
    $('#upstreamDetailsCalendarStart').datepicker({
        todayBtn : "linked",
        autoclose : true,
        todayHighlight : false,
        keyboardNavigation:false,
        forceParse:false

    }).on('changeDate',function(e){
                var startTime = e.date;
                $('#upstreamDetailsCalendarEnd').datepicker('setStartDate',startTime);
            });
    $('#upstreamDetailsCalendarEnd').datepicker({
        todayBtn : "linked",
        autoclose : true,
        todayHighlight : false,
        keyboardNavigation:false,
        forceParse:false

    }).on('changeDate',function(e){
                var endTime = e.date;
                $('#upstreamDetailsCalendarStart').datepicker('setEndDate',endTime);
            });


</script>
</body>
</html>
