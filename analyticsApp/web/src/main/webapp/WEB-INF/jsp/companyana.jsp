<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/include/includes.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
<title>企业分析</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <link href="css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="-1">
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/jqPaginator.js"></script>
    <script type="text/javascript" src="js/jquery.dataTables.js"></script>
    <script type="text/javascript" src="js/echarts/build/dist/echarts-all.js"></script>
    <script type="text/javascript" src="js/ec_model.js"></script>
    <script type="text/javascript" src="js/sys/util.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/sys/comana.js"></script>
    
    <style>
    	.ascending_box a{
    		cursor : pointer
    	}
    </style>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//  })(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', GA_ID, 'auto');
  ga('send', 'pageview');
  ga('set', 'dimension1', '企业分析');

  $(function(){
      function sYear(){
          var d = new Date();
          var vYear = d.getFullYear();
          var vMonth = d.getMonth()+1;
          for(var i=0;i<=2;i++){
              var html='<option value="'+(vYear-i)+'">'+(vYear-i)+'</option>';
              $("#query_year").append(html);
          }
          var monthHtml="";
          for(var j=1;j<=12;j++){
              if(vMonth==j){
                  monthHtml='<option selected="selected" value="'+vMonth+'">'+vMonth+'</option>';
              }else{
                  monthHtml='<option  value="'+j+'">'+j+'</option>';
              }
              $("#query_month").append(monthHtml);
          }
      }
      sYear();
  })

</script>
</head>

<body>
<jsp:include page="./include/top.jsp"></jsp:include>
<jsp:include page="./include/menu.jsp"></jsp:include>
<jsp:include page="./include/navigation.jsp"></jsp:include>
<div class="enterprise_box">
	<div class="enterprise_top">
    	<div class="area_box">
        	<p>区域：</p>
            <span class="sel_box">
            <select id="query_area" onchange="CMA.query();">
                  <option   value="">全国</option>   
                  <option   value="003">华东</option> 
                  <option   value="007">华南</option> 
                  <option   value="004">华中</option> 
                  <option   value="001">华北</option> 
                  <option   value="002">东北</option> 
                  <option   value="006">西北</option> 
                  <option   value="005">西南</option>   
            </select>
            </span>
            <div class="clearfix"></div>
        </div>
        <div class="year_box">
            <p>&nbsp;年份：</p>
            <span class="sel_year_box">
                <select id="query_year" onchange="CMA.query();">
                </select>
            </span>
            <div class="clearfix"></div>
        </div>
        <div class="year_box">
            <p>&nbsp;月份：</p>
            <span class="sel_year_box">
                <select id="query_month" onchange="CMA.query();">
                </select>
            </span>
            <div class="clearfix"></div>
        </div>

        <div class="enterprise_ss">
        	<input type="text" id="query_comp" placeholder="搜索企业">
        	<a onclick="CMA.query();">搜索</a>
        </div>
        <div class="clearfix"></div>
        <div class="enterprise_tab" id="comana">
        	<table id="comana_tab" width="100%" border="0" cellpadding="0" cellspacing="0">
        	</table>
        </div>
        <div class="page_number_box01" id="pagebox">
    	</div>
        <div class="clearfix"></div>
    </div>
</div>
<jsp:include page="./include/foot.jsp"></jsp:include>

</body>
</html>
