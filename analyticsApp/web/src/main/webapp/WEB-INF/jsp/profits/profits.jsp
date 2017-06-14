<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="js/sys/profits.js"></script>
</head>


<input type="hidden" id="pfmoduleId" value='${moduleId}'>
<input type="hidden" id="lrlist" value='${lrList}'>
<input type="hidden" id="pflist" value='${listData}'>
<div class="sy_box">
<div class="data_box01" id="profit">
	<div class="data_top"> 
		<span class="details"><a onclick="PRFT.showDetail();">历史数据</a></span>
        <%--<span class="download"><img src="images/download.png"></span>--%>
        <h1>利润</h1>
    </div>
    <div class="data_nav_box">
    	<c:forEach var="tabl" items="${jsonObjectTab}">
    		<li class="china" id="${tabl.Remark}" picdom="tb_lr" onclick="PRFT.changeLi('${tabl.Remark}');" wdstr="${tabl.CycleStr}">
        		<a>${tabl.NAME}</a>
        	</li>
    	</c:forEach>
    	<div class="clearfix"></div>
    </div>
    
    <div class="qh_box">
    	<a onclick="PRFT.backToPic();">切换为图</a>
    </div>
    <div class="day_box" id="proftDiv">
    </div>
    <div class="clearfix"></div>

    <div class="tb" id="tb_lr"></div>
    <div class="tb grd"  style="display:none">
    	<div class="tab_h">
    		<table class="jqdt" id="profit_tab" width="100%" border="0" cellpadding="0" cellspacing="0">
    		</table>
    	</div>
    </div>
</div>
</div>