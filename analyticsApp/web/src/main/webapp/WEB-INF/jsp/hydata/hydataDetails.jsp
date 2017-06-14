<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/include/includes.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <title>行业数据详情</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <link href="css/datepicker3.css" rel="stylesheet" type="text/css" />
    <link href="css/hydetail.css" rel="stylesheet" type="text/css"/>
    <style type="text/css">
        .hdclickdaybox{ border-bottom:1px solid #c0090c; background-color:#42566f;}
        #hdchina_jg{color:#fff; background-color:#42566f;}

    </style>
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/ec_model.js"></script>
    <script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="js/echarts/build/dist/echarts-all.js"></script>
    <script type="text/javascript" src="js/ec_model.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/sys/hydataDetails.js"></script>
    <script type="text/javascript" src="js/sys/pagination.js"></script>
    <script type="text/javascript" src="js/sys/util.js"></script>
    <script>
        $(document).ready(function(){
            var pm=$(".product01").text();
            this.title=pm+'-行业数据详情';
        });
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//        })(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');

        ga('create', GA_ID, 'auto');
        ga('send', 'pageview');
    </script>
    <style>
        .echartAuto{
            width:950px;height:360px;
        }
    </style>
    <script>
        $(document).ready(function(){
            hyDetalisLegend=null;
            var ls = window.localStorage;
            hyDetalisLegend= JSON.parse(ls.getItem("hyDetailsLegend"));
            console.log(hyDetalisLegend);
              hydatadetails();

        });
    </script>
</head>
<body>
<jsp:include page="../include/top.jsp"></jsp:include>
<jsp:include page="../include/menu.jsp"></jsp:include>
<jsp:include page="../include/navigation.jsp"></jsp:include>

<div  class="fh_box"><a href="javascript:void('0')" onclick="window.history.back()">&nbsp;&nbsp;返回</a></div>
<div class="big_box">
        <%--<div class="data_nav_box" id="hydatadetails">--%>
        <div class="details_top_nav" id="hydatadetails">
            <%--<div class="clearfix"></div>--%>
        </div>
            <form action="exportEchartsImg" id="exportEchartsImg" method="post">
                <input type="hidden" id="imageDataFileName" name="fileName">
                <input type="hidden" id="imageDataUrl" name="url">
            </form>
    <form action="exportExcelUtils" id="hydetailExport" method="post" style="display: none">
        <input type="hidden"  name="fileName" value="行业详情">
        <input type="hidden"  name="url" value="array">
        <input type="hidden" id="excelArray" name="excelArray" value="">
        <input type="hidden" id="titleName" name="titleName" value="">
        <input type="hidden" id="sheetName" name="sheetName" value="">
        <input type="hidden" id="keyName" name="keyName" value="">
    </form>


    <div class="details_box">
        <input type="hidden" id="predatacode" value="${predatacode}">
        <input type="hidden" id="pretimetype" value="${pretimetype}">
        <div class="details_top">
            <p>查询范围：</p>
        <div class="calendar">
            <input type="text" class="start" id="hydataDetailsCalendarStart"  style="color: #fff;padding-left: 5px;"/>
            <span></span>
            <input type="text" class="end" id="hydataDetailsCalendarEnd"  style="color: #fff;padding-left: 5px;"/>
            <div class="calendar_ss"><a href="javascript:void('0')" onclick="clickserrch()">搜索</a></div>
        </div>
            <!--时间维度 -->
            <div class="big_wd" id="day_box">

                    <%--<span class="" id="week"><a >周</a></span>--%>

                    <span id="month"><a >月</a></span>
                    <span id="year"><a>年</a></span>

            </div>

            <p class="jg_wd">维度：</p>

            <div class="qh_box" id="another" >
                <a id="anotherClick" onclick="clickAnother()">换一批</a>
            </div>

            <div class="clearfix"></div>

        </div>
        <div class="details_right">
            <div class="chart_box" style="width: 100%;" id="hydataDetailsEcharts">图表位置</div>

        </div>

        <div class="details_bottom" >
            <div class="details_bottom_box">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr class="details_bottom_t" id="hydataDetailsTable">
                    </tr>
                </table>
            </div>
            <div class="page_number_big_box">
                <div class="page_number_box01">
                    <span><a href="javascript:void('0')" onclick="prevPage()">上一页</a></span>
                    <div id="pagination" style="display: inline">

                    </div>
                    <span><a href="javascript:void('0')" onclick="nextPage()">下一页</a></span>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="../include/foot.jsp"></jsp:include>
<script>
    $('#hydataDetailsCalendarStart').datepicker({
        todayBtn : "linked",
        autoclose : true,
        todayHighlight : false,
        keyboardNavigation:false,
        forceParse:false

    }).on('changeDate',function(e){
                var startTime = e.date;
                $('#hydataDetailsCalendarEnd').datepicker('setStartDate',startTime);
//                设置最小的开始时间
//                var startmintime='2014-10-01'
//                $('#hydataDetailsCalendarStart').datepicker('setStartDate',startmintime);
            });
    $('#hydataDetailsCalendarEnd').datepicker({
        todayBtn : "linked",
        autoclose : true,
        todayHighlight : false,
        keyboardNavigation:false,
        forceParse:false

    }).on('changeDate',function(e){
                var endTime = e.date;
                $('#hydataDetailsCalendarStart').datepicker('setEndDate',endTime);
                //设置结束日期的最大日期
//                var endmaxtime='2020-01-01';
//                $('#hydataDetailsCalendarEnd').datepicker('setEndDate',endmaxtime);
            });
</script>
</body>
</html>
