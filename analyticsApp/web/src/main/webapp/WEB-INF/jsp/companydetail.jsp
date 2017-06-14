<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/include/includes.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
<title>企业分析详情</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <link href="css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="-1">
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/jquery.dataTables.js"></script>
    <script type="text/javascript" src="js/echarts/build/dist/echarts-all.js"></script>
    <script type="text/javascript" src="js/ec_model.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/sys/util.js"></script>
    <script type="text/javascript" src="js/sys/companydetail.js"></script>

<script>
    $(document).ready(function(){
        var pm=$(".product01").text();
        this.title=pm+'-企业分析详情';
    });
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//  })(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', GA_ID, 'auto');
  ga('send', 'pageview');
  ga('set', 'dimension1', '企业分析');

</script>
</head>

<body>
<jsp:include page="./include/top.jsp"></jsp:include>
<jsp:include page="./include/menu.jsp"></jsp:include>
<jsp:include page="./include/navigation.jsp"></jsp:include>
<div  class="fh_box"><a href="companyanalysis?productCode=${productCode}">&nbsp;&nbsp;返回</a></div>
<div class="enterprise_details">
	<h1 class="enterprise_h">${companyname}</h1>
	<input type="hidden" id="productcode" value="330-130"/>
	<input type="hidden" id="companyid" value="${companyid}"/>
    <div class="enterprise_product">
    	<p>所有产品：</p>
    	<c:forEach var="i" items="${productlist}">
            <c:if test="${i.ProductCode=='330-130'||i.ProductCode=='380-030'|| i.ProductCode=='380-060'}">
                <a prdcode="${i.ProductCode}" onclick="changeComProuduct('${i.ProductCode}')">${i.ProductName}</a>
            </c:if>

    	</c:forEach>
        <div class="clearfix"></div>
    </div>
    <div class="enterprise_details_box"></div>
</div>
<jsp:include page="./include/foot.jsp"></jsp:include>

</body>
</html>
<script>
	$("div.nav_02 > li").removeClass("mian_nav");
	$("li#companyanalysis").addClass("mian_nav");
</script>