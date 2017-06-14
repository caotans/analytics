<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>


<!doctype html>
<html>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <title>企业报价详情</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <link href="css/datepicker3.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="js/jquery.blockUI.js"></script>
    <script type="text/javascript" src="js/echarts/build/dist/echarts-all.js"></script>
    <script type="text/javascript" src="js/ec_model.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/sys/util.js"></script>
    <script type="text/javascript" src="js/jqPaginator.js"></script>
    <script type="text/javascript" src="js/sys/comtcjxdt.js"></script>
    <script>
        $(document).ready(function(){
            var value= ${tablist};
            CMTCJXDT.DownloadElse=value[0].OtherDownload;
        });
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', GA_ID, 'auto');
        ga('send', 'pageview');
        ga('set', 'dimension1', '企业分析');
    </script>
</head>
<body>
<jsp:include page="../include/top.jsp"></jsp:include>
<jsp:include page="../include/menu.jsp"></jsp:include>
<jsp:include page="../include/navigation.jsp"></jsp:include>

<input type="hidden" value='${pld}' id="pld"/>
<input type="hidden" value='${pwd}' id="pwd"/>
<input type="hidden" value='${curDate}' id="curDate"/>
<input type="hidden" value='${lyDate}' id="lyDate"/>
	<form action="exportExcelUtils" id="hyExport" method="post">
        <input type="hidden"  id="fileName" name="fileName" value="利润详情">
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
<div  class="fh_box"><a onclick="window.history.back();">&nbsp;&nbsp;返回</a></div>
<div class="big_box">
	<div class="details_top_nav">
		<c:forEach var="dt_li" items="${tablist}">
			<li class="details_nav" id="${dt_li.Remark}_dt" idxid="${dt_li.Remark}" wdstr="${dt_li.CycleStr}" onclick="CMTCJXDT.changeLi('${dt_li.Remark}_dt','${dt_li.OtherDownload}');"><a>${dt_li.NAME}</a></li>
		</c:forEach>
		<div class="clearfix"></div>
	</div>
	<div class="details_box">
	<div class="details_top">
                <p>查询范围：</p>
                <div class="calendar">
                    <input type="text" class="start" id="searchstart"  style="color: #fff;padding-left: 5px;"/>
                    <span></span>
                    <input type="text" class="end" id="searchend"  style="color: #fff;padding-left: 5px;"/>
                    <div class="calendar_ss"><a onclick="CMTCJXDT.search();">搜索</a></div>
                </div>
                
                <div class="big_wd" style="display:none;">
                </div>
                <p class="jg_wd" style="display:none;">维度：</p>
                <div class="exl"><a onclick="CMTCJXDT.exportExcel();">导出excel</a></div>
                <div class="clearfix"></div>
            </div>
        <div class="tb" id="tb_tcjxDetail"></div>
   <div class="details_bottom" id="tb_tcjx_bottom">
            <div class="details_bottom_box">
                <table id="cmsddt" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
            </div>
            <div class="page_number_big_box">
                <div class="page_number_box01" id="cmsddt_pg">
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
</div>
</div>

<jsp:include page="../include/foot.jsp"></jsp:include>
<script>
    $('#searchstart').datepicker({
        todayBtn : "linked",
        autoclose : true,
        todayHighlight : false,
        keyboardNavigation:false,
        forceParse:false
    }).on('changeDate',function(e){
                var startTime = e.date;
                $('#searchend').datepicker('setStartDate',startTime);
            });
    $('#searchend').datepicker({
        todayBtn : "linked",
        autoclose : true,
        todayHighlight : false,
        keyboardNavigation:false,
        forceParse:false
    }).on('changeDate',function(e){
                var endTime = e.date;
                $('#searchstart').datepicker('setEndDate',endTime);
            });
    $("div.nav_02 > li").removeClass("mian_nav");
	$("li#companyanalysis").addClass("mian_nav");
</script>
</body>
</html>