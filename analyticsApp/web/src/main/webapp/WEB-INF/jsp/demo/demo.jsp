<%@ page import="core.web.InitDataListener" %>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>

<%

    //System.out.println(InitDataListener.jsonObjectTab.get("1"));

%>

<script type="text/javascript" src="js/sys/demo.js"></script>

<div class="data_box01">
	<div class="data_top"> 
		<span class="details"><a href="#">历史数据</a></span>
        <span class="download"><img src="images/download.png"></span>
        <h1>Demo</h1>
    </div>
    <div class="data_nav_box">
    	<li class="china" id="kaigonglv" picdom="tb_jg">
        <a href="javascript:void('0')">图表1</a>
        </li>
        <li class="china" id="kucun" picdom="xl_tab">
		<a href="javascript:void('0')">表格1</a>
        </li>
        <div class="day_box" mod="dm">
            <span class="week"><a onclick="week_dm();">周</a></span>
            <span class="month"><a onclick="moon_dm();">月</a></span>
            <span class="year"><a onclick="year_dm();">年</a></span>
            <div class="clearfix"></div>
        </div>
    </div>

    <div class="tb" id="tb_jg"></div>
    <div class="tb" id="tb_xl"></div>
	
	<div class="tb" id="xl_tab">
    <div class="tab_h">
    
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
        	<tr class="tb_title">
            	<th style="width:15%;">日期</th>
                <th style="width:12%;">区域</th>
                <th style="width:13%;">库存</th>
                <th style="width:12%;">涨跌</th>
                <th style="width:12%;">单位</th>
                <th style="width:12%;">价格</th>
                <th style="width:12%;">涨跌</th>
                <th style="width:12%;">单位</th>
            </tr>
            </table>
            </div>
            
            <div class="tab_b">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr class="tb_content"  onclick="changeXl(1);" style="cursor:pointer">
            	<th style="width:15%;">2016/10</th>
                <th style="width:12%;">华东</th>
                <th style="width:13%;">7.675</th>
                <th style="width:12%;"><span style="color:#00c533;">-1.1214</span></th>
                <th style="width:12%;">万吨</th>
                <th style="width:12%;">8531</th>
                <th style="width:12%;"><span style="color:#ff0000;">+11</span></th>
                <th style="width:12%;">元/吨</th>
            </tr>
           <tr  onclick="changeXl(2);" style="cursor:pointer">
            	<th>2016/10</th>
                <th>华南</th>
                <th>6.676</th>
                <th><span style="color:#00c533;">-1.432</span></th>
                <th>万吨</th>
                <th>8308</th>
                <th><span style="color:#00c533;">-48</span></th>
                <th>元/吨</th>
            </tr>
        </table>
        </div>
    </div>
</div>