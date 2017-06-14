<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="js/sys/module/sd_mod.js"></script>
    <script type="text/javascript" src="js/sys/comsd.js"></script>
</head>
<div class="sy_box">
<input type="hidden" value='${weidu}' id="weidu_comsd"/>
<div class="data_box01" id="comsd">
	<div class="data_top"> 
		<span class="details"><a onclick="CMSD.showDetail();">历史数据</a></span>
		<!-- 
        <span class="download"><img src="images/download.png"></span>
         -->
        <h1>产能产量开工率</h1>
    </div>
    <div class="clearfix"></div>
    <div class="day_box" id="gongxu_wdbx">
    </div>
    <div class="clearfix"></div>

    <div class="tb_max" id="tb_comsd"></div>
</div>
</div>