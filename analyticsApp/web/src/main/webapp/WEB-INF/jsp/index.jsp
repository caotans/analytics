<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/include/includes.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
<title>产品分析</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <link href="css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="-1">
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/jquery.dataTables.js"></script>
    <script type="text/javascript" src="js/echarts/build/dist/echarts-all.js"></script>
    <script type="text/javascript" src="js/ec_model.js"></script>
    <script type="text/javascript" src="js/sys/util.js"></script>
    <script type="text/javascript" src="js/index.js"></script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//    })(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');

  ga('create', GA_ID, 'auto');
  ga('set', 'userId', '${userId}');
  ga('set', 'dimension1', '产品分析');
  ga('set', 'dimension2', '${productCode}');
  ga('send', 'pageview');
</script>
</head>

<body>
<jsp:include page="./include/top.jsp"></jsp:include>
<jsp:include page="./include/menu.jsp"></jsp:include>
<jsp:include page="./include/navigation.jsp"></jsp:include>

<div class="content_box">
</div>
<div class="dt_box" style="display : none"></div>
<jsp:include page="./include/foot.jsp"></jsp:include>
<script>
    getModule('${productCode}');
</script>
</body>
</html>
