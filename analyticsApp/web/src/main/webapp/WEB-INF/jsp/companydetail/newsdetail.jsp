<%--<%@ page language="java" pageEncoding="UTF-8"%>--%>
<%--<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>--%>


<%--<!doctype html>--%>
<%--<html>--%>
<%--<head>--%>
    <%--<meta charset="utf-8" http-equiv="Pragma" content="no-cache" >--%>
    <%--<title>企业新闻</title>--%>
    <%--<link href="css/css.css" rel="stylesheet" type="text/css" />--%>
    <%--<link href="css/datepicker3.css" rel="stylesheet" type="text/css" />--%>

    <%--<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>--%>
    <%--<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>--%>
    <%--<script type="text/javascript" src="js/echarts/build/dist/echarts-all.js"></script>--%>
    <%--<script type="text/javascript" src="js/ec_model.js"></script>--%>
    <%--<script type="text/javascript" src="js/index.js"></script>--%>
    <%--<script type="text/javascript" src="js/jqPaginator.js"></script>--%>
    <%--<script type="text/javascript" src="js/sys/util.js"></script>--%>
    <%----%>
<%--</head>--%>
<%--<body>--%>
<%--<jsp:include page="../include/top.jsp"></jsp:include>--%>
<%--<jsp:include page="../include/menu.jsp"></jsp:include>--%>
<%--<jsp:include page="../include/navigation.jsp"></jsp:include>--%>

<%--<div  class="fh_box"><a onclick="backToComDt();">&nbsp;&nbsp;返回</a></div>--%>
<%--<div class="xw_big_box">--%>
    	<%--<h1 class="xw_h">${newsarr[0].Title}</h1>--%>
    	<%--<b>--%>
        	<%--<span class="collection">收藏：</span><img src="images/sc.png">--%>
            <%--<span class="time_box">${newsarr[0].PubDate}</span>--%>
            <%--<span class="source">信息来源：${newsarr[0].Source}</span>--%>
            <%--<div class="clearfix"></div> --%>
        <%--</b>--%>
        <%--<p>${newsarr[0].Context}</p>--%>
<%--<div class="share_box">--%>
    <%--<a href="#" class="tj_box"></a>--%>
    <%--<a onclick="kx_shareClick()" class="kai_box"></a>--%>
    <%--<a onclick="ren_shareClick()" class="ren_box"></a>--%>
    <%--<a onclick="tx_shareClick()" class="tx_box"></a>--%>
    <%--<a onclick="xl_shareClick()" class="xl_box"></a>--%>
    <%--<a onclick="qz_shareClick()" class="kj_box"></a>--%>
    <%--<span>分享到：</span>--%>
<%--</div>--%>
<%--<div class="clearfix"></div>--%>
<%--<div class="bot_title">--%>
	<%--<c:choose>--%>
		<%--<c:when test="${newsarr[0].pre_id.toString() eq '-'}">--%>
			<%--<a href="#" class="bot_left">上一篇：没有了</a>--%>
		<%--</c:when>--%>
		 <%--<c:otherwise>--%>
		 	<%--<a href="NewsDetail?id=${newsarr[0].pre_id}" class="bot_left">上一篇：${newsarr[0].pre_title}</a>--%>
		 <%--</c:otherwise>--%>
	<%--</c:choose>--%>
	<%--<c:choose>--%>
		<%--<c:when test="${newsarr[0].next_id.toString() eq '-'}">--%>
			<%--<a href="#" class="bot_right">下一篇：没有了</a>--%>
		<%--</c:when>--%>
		 <%--<c:otherwise>--%>
		 	<%--<a href="NewsDetail?id=${newsarr[0].next_id}" class="bot_right">下一篇：${newsarr[0].next_title}</a>--%>
		 <%--</c:otherwise>--%>
	<%--</c:choose>--%>
    <%--<div class="clearfix"></div>--%>
<%--</div>--%>
<%--</div>--%>

<%--<jsp:include page="../include/foot.jsp"></jsp:include>--%>
<%--<script>--%>
    <%----%>
    <%--$("div.nav_02 > li").removeClass("mian_nav");--%>
	<%--$("li#companyanalysis").addClass("mian_nav");--%>
	<%----%>
	<%--function backToComDt(){--%>
		<%--var ls = window.localStorage;--%>
		<%--var companyid = ls.getItem("companyid");--%>
		<%--window.location.href = "CompanyDetail?companyid="+companyid;--%>
	<%--}--%>
	<%----%>
	<%--function tx_shareClick(){--%>
		<%--var param = {--%>
			<%--url:location.href,--%>
			<%--title:'腾讯微博分享接口测试',--%>
			<%--appkey:'',--%>
			<%--pic:'',--%>
			<%--site:''--%>
		<%--}--%>
		<%--var arr = [];--%>
		<%--for( var tmp in param ){--%>
			<%--arr.push(tmp + '=' + encodeURIComponent( param[tmp] || '' ) )--%>
		<%--}--%>
		<%--var url = "http://v.t.qq.com/share/share.php?"+arr.join('&');--%>
		<%--var w=window.screen.width*0.5;--%>
		<%--var h=window.screen.height*0.8;--%>
		<%--var sw=window.screen.width*0.25;--%>
		<%--var sh=window.screen.height*0.05;--%>
		<%--window.open(url, 'kx_records', 'height='+h+', width='+w+', top='+sh+', left='+sw+', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');--%>
	<%--}--%>
	<%----%>
	<%--function qz_shareClick(){--%>
		<%--var param = {--%>
			<%--url:location.href,--%>
			<%--title:'qzone分享接口测试',--%>
			<%--desc:'',--%>
			<%--summary:'',--%>
			<%--site:''--%>
		<%--}--%>
		<%--var arr = [];--%>
		<%--for( var tmp in param ){--%>
			<%--arr.push(tmp + '=' + encodeURIComponent( param[tmp] || '' ) )--%>
		<%--}--%>
		<%--var url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?"+arr.join('&');--%>
		<%--var w=window.screen.width*0.5;--%>
		<%--var h=window.screen.height*0.8;--%>
		<%--var sw=window.screen.width*0.25;--%>
		<%--var sh=window.screen.height*0.05;--%>
		<%--window.open(url, 'kx_records', 'height='+h+', width='+w+', top='+sh+', left='+sw+', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');--%>
	<%--}--%>
	<%----%>
	<%--function ren_shareClick(){--%>
		<%--var param = {--%>
			<%--resourceUrl : location.href,	//分享的资源Url--%>
			<%--srcUrl : '',	//分享的资源来源Url,默认为header中的Referer,如果分享失败可以调整此值为resourceUrl试试--%>
			<%--pic : '',		//分享的主题图片Url--%>
			<%--title : '人人开发平台分享接口测试',		//分享的标题--%>
			<%--description : '',	//分享的详细描述--%>
			<%--charset:'UTF-8'--%>
		<%--};--%>
		<%--var arr = [];--%>
		<%--for( var tmp in param ){--%>
			<%--arr.push(tmp + '=' + encodeURIComponent( param[tmp] || '' ) )--%>
		<%--}--%>
		<%--var url = 'http://widget.renren.com/dialog/share?'+arr.join('&');--%>
		<%--var w=window.screen.width*0.5;--%>
		<%--var h=window.screen.height*0.8;--%>
		<%--var sw=window.screen.width*0.25;--%>
		<%--var sh=window.screen.height*0.05;--%>
		<%--window.open(url, 'kx_records', 'height='+h+', width='+w+', top='+sh+', left='+sw+', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');--%>
	<%--}--%>
	<%----%>
	<%--function kx_shareClick(){--%>
		<%--var param = {--%>
			<%--content:'开心网分享接口测试',--%>
			<%--url:location.href,--%>
			<%--starid:'0',--%>
			<%--aid:'0',--%>
			<%--style:'11',--%>
			<%--stime:'',--%>
			<%--sig:'',--%>
			<%--pic:''--%>
		<%--}--%>
		<%--var arr = [];--%>
		<%--for( var tmp in param ){--%>
			<%--arr.push(tmp + '=' + encodeURIComponent( param[tmp] || '' ) )--%>
		<%--}--%>
		<%--var url = 'http://www.kaixin001.com/rest/records.php?'+arr.join('&');--%>
		<%--var w=window.screen.width*0.5;--%>
		<%--var h=window.screen.height*0.8;--%>
		<%--var sw=window.screen.width*0.25;--%>
		<%--var sh=window.screen.height*0.05;--%>
		<%--window.open(url, 'kx_records', 'height='+h+', width='+w+', top='+sh+', left='+sw+', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');--%>
	<%--}--%>
	<%----%>
	<%--function xl_shareClick(){--%>
		<%--var param = {--%>
			<%--url:location.href,--%>
			<%--type:'icon',--%>
			<%--language:'zh_cn',--%>
			<%--title:'新浪微博分享接口测试',--%>
			<%--searchPic:'true',--%>
			<%--style:'simple'--%>
		<%--}--%>
		<%--var arr = [];--%>
		<%--for( var tmp in param ){--%>
			<%--arr.push(tmp + '=' + encodeURIComponent( param[tmp] || '' ) )--%>
		<%--}--%>
		<%--var url = 'http://service.weibo.com/share/share.php?'+arr.join('&');--%>
		<%--var w=window.screen.width*0.5;--%>
		<%--var h=window.screen.height*0.8;--%>
		<%--var sw=window.screen.width*0.25;--%>
		<%--var sh=window.screen.height*0.05;--%>
		<%--window.open(url, 'kx_records', 'height='+h+', width='+w+', top='+sh+', left='+sw+', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');--%>
	<%--}--%>
<%--</script>--%>
<%--</body>--%>
<%--</html>--%>
