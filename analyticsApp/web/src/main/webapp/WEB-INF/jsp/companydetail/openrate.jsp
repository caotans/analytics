<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
<script type="text/javascript" src="js/sys/cdor.js"></script>
</head>

<div class="data_box04" id="cdor" style="height:160px;">
	<div class="data_top"> 
        <h1>预计检修影响开工率</h1>
    </div>
    <div class="data_nav_box" style="display:none">
    	<c:forEach var="tabl" items="${tablist}">
    		<li class="china" id="${tabl.tabId}" dtype="${tabl.type}" picdom="tb_lr" onclick="CDOR.changeLi('${tabl.tabId}','${tabl.type}');" wdstr="${tabl.weidu}">
        		<a>${tabl.tabName}</a>
        	</li>
    	</c:forEach>
    </div>
    
    <div class="day_box" id="proftDiv" style="display:none">
    </div>
    <div class="clearfix"></div>

    <div class="tb" id="tb_cdor" style="height:110px"></div>
    <div class="hxgrd"  style="display:none">
    	<div class="tab_h">
    		<table width="100%" border="0" cellpadding="0" cellspacing="0" class="Capacity_tab jqdt">
    		</table>
    	</div>
    </div>
</div>