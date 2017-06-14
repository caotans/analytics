<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
  <head >
      <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
      <script type="text/javascript" src="js/sys/util.js"></script>
      <script type="text/javascript" src="js/sys/comoffer.js"></script>
      </head>

 <style type="text/css">
     .tb table tr th{  font-weight:normal; font-size:12px; line-height:35px; color:#000}
 </style>
<div class="sy_box">
<div class="data_box01" id="comoffer">
	<div class="data_top"> 
		<span class="details"><a onclick="CMOF.showDetail();">历史数据</a></span>
		<!-- 
        <span class="download"><img src="images/download.png"></span>
        -->
        <h1>企业报价</h1>
    </div>
    <div class="data_nav_box" style="display:none">
    	<c:forEach var="tabl" items="${tablist}">
    		<li class="china" id="${tabl.tabId}" dtype="${tabl.type}" onclick="CMOF.changeLi('${tabl.tabId}','${tabl.type}');" wdstr="${tabl.weidu}">
        		<a>${tabl.tabName}</a>
        	</li>
    	</c:forEach>
    </div>
    
    <div class="day_box" id="gongxu_wdbx" style="display:none;">
    </div>
    <div class="tab_back" style="display:none;">
    	<span onclick="CMOF.backToPic();"><a>返回</a></span>
    </div>
    <div class="clearfix"></div>

    <div class="tb" style="height:330px;" id="tb_comoffer"></div>
    <div class="tb grd"  style="display:none;height:902px;">
    	<div class="tab_h">
    		<table class="jqdt" id="cmof_tb_h" width="100%" border="0" cellpadding="0" cellspacing="0">
    		</table>
    	</div>
    	<div class="tab_b" style="height:290px">
    		<table class="jqdt" id="cmof_tb_b" width="100%" border="0" cellpadding="0" cellspacing="0">
    		</table>
    	</div>
    </div>
</div>
</div>