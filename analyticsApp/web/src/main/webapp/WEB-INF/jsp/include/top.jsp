<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
   <head>
       <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
   </head>
<div class="top_bj">
    <li class="logo_li"><img src="images/logo.png"></li>
    <li><a href="javascript:void('0')" onclick="jumpToDashboard()">Dashboard</a></li>
    <li  class="top_an"><a href="login">Analytics</a></li>
    <%--<li><a href="#">Report</a></li>--%>
    <span class="help"></span>
    <span class="user" onclick="logout();" style="cursor: pointer;"></span>
    <p class="ren"><%=request.getSession().getAttribute("userData") %></p>
    <p class="lx">联系我们：（+86）400-720-0222</p>
</div>
<script>
    //检验各浏览器是否支持html5，ie大于等于9
    /*
     * 描述：判断浏览器信息
     * 编写：LittleQiang_w
     * 日期：2016.1.5
     * 版本：V1.1
     */

    //判断当前浏览类型
    function BrowserType() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Windows NT 6.1; WOW64; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion < 9) {
                if(confirm("您的浏览器版本较低请先升级至高版本！"))
                {
                    location.href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads";
                }
            }//IE版本过低
        }//isIE end

        if (isFF) {
            return "FF";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isSafari) {
            return "Safari";
        }
        if (isChrome) {
            return "Chrome";
        }
        if (isEdge) {
            return "Edge";
        }
    }//myBrowser() end

    BrowserType();

    function logout(){
        if (confirm("你确定退出吗？")) {
            var menuCache = window.localStorage;
            menuCache.clear();
            window.location.href="logout";
            ga('send', 'event', {
                'eventCategory': '退出',
                'eventAction': '退出'
            });
        }

    }
    /**
    *跳转到dashboard权限提示
     */
    function jumpToDashboard(){
        var flag=null;
        $.ajax({
            type:"POST",
            dataType:"json",
            async:false,
            url:"dashbordPermission",
            success:function(data){
                if(data&&data.status){
                    flag=data.flag;
                }

            }
        });
        if(flag==null){
            alert("系统异常,请联系管理员!");
            return;
        } else if(flag==false){
            var info="ICIS Dashboard offers you an instant, detailed view of the chemical and energy markets integrating" +
                    " all the market intelligence and data you need on one platform."+
            "You are not subscribed to this service."+
            "安迅思速赢决策平台能提供给您及时且全面的化工和能源国内国际市场资讯和数据。"+
            "您还未开通这项服务。";
            alert(info);
        }else if(flag==true){
            window.location.href="https://dashboard.icis-china.com/";

        }
        ga('send', 'event', {
            'eventCategory': '跳转到dashboard',
            'eventAction': '跳转到dashboard'
        });
    }
</script>