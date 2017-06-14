<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="js/sys/comtcjx.js"></script>
</head>


<div class="data_box04" id="comtcjx">
	<div class="data_top"> 
		<span class="details"><a onclick="CMTCJX.showDetail();">历史数据</a></span>
        <h1>停车检修/扩建关停</h1>
    </div>
    <div class="data_nav_box">
    	<c:forEach var="tabl" items="${tablist}">
    		<li class="china" id="${tabl.tabId}" dtype="${tabl.type}" picdom="tb_tcjx" onclick="CMTCJX.changeLi('${tabl.tabId}','${tabl.type}');" wdstr="${tabl.weidu}">
        		<a>${tabl.tabName}</a>
        	</li>
    	</c:forEach>
    	<div class="clearfix"></div>
    </div>
    
    <div class="day_box" id="tcjx_daybox" style="display:none">
    </div>
    <div class="clearfix"></div>

    <div class="tb" id="tb_tcjx"></div>
    <div class="hxgrd"  style="display:none">
    	<div class="tab_h">
    		<table id="tcjx_tb_h" width="100%" border="0" cellpadding="0" cellspacing="0" class="Capacity_tab">
    		</table>
    	</div>
    	<div class="tab_b">
    		<table id="tcjx_tb_b" width="100%" border="0" cellpadding="0" cellspacing="0" class="Capacity_tab">
    		</table>
    	</div>
    </div>
</div>