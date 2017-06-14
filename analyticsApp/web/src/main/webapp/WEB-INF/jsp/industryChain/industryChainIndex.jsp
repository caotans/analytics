<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String ssid=request.getSession().getId();
    if(ssid!=null&&!"".equals(ssid)){
        request.setAttribute("industryChain_ssid",ssid);
    }
%>
<!doctype html>
<html>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <title>产业链分析</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-2.1.4.min.js"  type="text/javascript"></script>
    <script src="js/index.js"  type="text/javascript"></script>
    <script src="js/sys/industryChain.js"  type="text/javascript"></script>
    <script type="text/javascript" src="js/sys/util.js"></script>
    <style type="text/css">
        .canvasInterface
        {
            cursor: pointer;
        }
    </style>

    <script type="text/javascript">
             $(document).ready(function(){
                 var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                 var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE浏览器
                 var isEdge = userAgent.indexOf("Windows NT 6.1; WOW64; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
                 if (isIE) {
                     browserType=true;
                 }//isIE end
                 if (isEdge) {
                     browserType=true;

                 }
                 drawShape('price');
             });

    </script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', GA_ID, 'auto');
  ga('send', 'pageview');
  ga('set', 'dimension1', '产业链分析');

</script>
</head>

<body>
<jsp:include page="../include/top.jsp"></jsp:include>
<jsp:include page="../include/menu.jsp"></jsp:include>
<jsp:include page="../include/navigation.jsp"></jsp:include>
<input type=hidden id="industryChain_ssid" value="${industryChain_ssid}">
<form action="exportEchartsImg" id="exportEchartsImg" method="post">
    <input type="hidden" id="imageDataFileName" name="fileName">
    <input type="hidden" id="imageDataUrl" name="url">
    <input type="hidden" id="imageType" name="excelArray">
</form>
<form action="exportExcelUtils" id="industryChainExport" method="post">
    <input type="hidden"  name="fileName" value="产业链">
    <input type="hidden"  name="url" value="json">
    <input type="hidden" id="excelArray" name="excelArray" value="">
    <input type="hidden" id="titleName" name="titleName" value="">
    <input type="hidden" id="sheetName" name="sheetName" value="">
    <input type="hidden" id="keyName" name="keyName" value="">
</form>
 <!--首页上的默认品目ID -->
<input type=hidden id="industryChain_ssid" value="${industryChain_ssid}">
<input type="hidden" id="industryChainCode" value="${industryChainCode}">
<input type="hidden" id="industryChainCheck" value="price">
<div class="cy_top_box">
    <span class="cy_sz">上涨</span><span class="cy_sz_box"></span>
    <span class="sd_sz">下跌</span><span class="sd_sz_box"></span>
    <span class="sd_sz">无变化</span><span class="wb_sz_box"></span>
    <div class="clearfix"></div>
    <div class="kpi_big_box">
        <div class="kpi_box">KPI</div>
        <div class="kpi_xz01">
            <input type="radio" name="industryChainRadio" id="price" checked onclick="drawShape('price')">
            <label for="price">主要市场均价</label>
        </div>
        <div class="kpi_xz02">
            <input  type="radio" name="industryChainRadio" id="capacityRate" onclick="drawShape('capacityRate')">
            <label for="capacityRate">开工率</label>
        </div>
    </div>
    <div class="dc_box" style=" display: inline-block;"><a href="javascript:void('0')" onclick="downLoadIndustryChain();">导出JPG图片</a>

    </div>
    <div class="dc_box" style="display: inline-block;margin-left:30px;"> <a href="javascript:void('0')" onclick="exportIndustryChain();">导出Excel</a>

    </div>
</div>

<h1 class="hg_h">化工产业链分析</h1>
<div style="height: 1200px;width: 100%;margin-top: 80px;" >
    <canvas id="tutorial" class="canvasInterface" width="1366px;" height="1200px;"></canvas>
</div>
<div id="industryChain">

</div>
<jsp:include page="../include/foot.jsp"></jsp:include>

</body>
</html>

