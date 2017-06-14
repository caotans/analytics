<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
 <head>
     <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
     <script type="text/javascript" src="js/jqPaginator.js"></script>
     <script type="text/javascript" src="js/sys/util.js"></script>
     <script type="text/javascript" src="js/sys/comnews.js"></script>
 </head>
<div class="data_box03" id="comnews">
	<div class="data_top">
        <a onclick="CMNWS.changeRange('month');" class="enterprise_news_all">近一月</a>
        <a onclick="CMNWS.changeRange('week');" class="enterprise_news_all">近一周</a>
        <a onclick="CMNWS.changeRange('all');" class="enterprise_news_all">全部</a>
        <div class="enterprise_news_ss">
        	<input type="text" id="comsearch" placeholder="搜索企业">
            <a onclick="CMNWS.search();">搜索</a>
        </div> 
        <h1>企业新闻</h1>
             
    </div>

	<div class="enterprise_news_box">
     </div>
     
     <div class="enterprise_news_page">
     	<b class="page_bk">
        </b>    
     </div>
</div>