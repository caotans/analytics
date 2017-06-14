<%@ page language="java" pageEncoding="UTF-8"%>
<%
    String ssid=request.getSession().getId();
    if(ssid!=null&&!"".equals(ssid)){
        request.setAttribute("icsidx_ssid",ssid);
    }
%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
  <head>
      <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
      <script type="text/javascript" src="js/sys/icisindex.js"></script>
  </head>


<div class="sy_box">
<div class="data_box01" id="icisidx">
	<div class="data_top"> 
		<!--  
		<span class="details"><a href="#">历史数据</a></span>
        <span class="download"><img src="images/download.png"></span>
        -->
        <h1>安迅思指数</h1>
    </div>
    <div class="data_nav_box">
    	<c:forEach var="tabl" items="${jsonObjectTab}">
    		<li class="china" id="${tabl.Remark}" picdom="tb_lr" onclick="ICISIDX.changeLi('${tabl.Remark}');" wdstr="${tabl.CycleStr}">
        		<a>${tabl.NAME}</a>
        	</li>
    	</c:forEach>
        <div class="clearfix"></div>
    </div>
    
    <div class="day_box">
    </div>
    <div class="clearfix"></div>

    <div class="tb" id="tb_icsidx"></div>
    <input type=hidden id="icsidx_ssid" value="${icsidx_ssid}">
</div>
</div>