<%@ page language="java" pageEncoding="UTF-8"%>
<script type="text/javascript" src="js/ec_model.js"></script>
<script type="text/javascript" src="js/sys/upstreamIndex.js"></script>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="-1">
<script>
    $(document).ready(function(){
        howManyTime('${jsonObjectTab[0].CycleStr}','${jsonObjectTab[0].CycleName}','${jsonObjectTab[0].ProductTabId}','${jsonObjectTab[0].Disabled}');
        firstLoad('','','','${jsonObjectTab[0].ProductTabId}','${jsonObjectTab[0].Disabled}');
        var value= ${jsonObjectTab};
        var flag=true;
        for(var i=0;i<value.length;i++){
            if(value[i].Disabled=='false'){
                flag=false;
                break;
            }
        }
        if(flag){
            $("#upstreamHistoryHide").show();
        }else{
            $("#upstreamHistoryShow").show();
        }
    });
</script>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');
    //  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

</script>
<!-- 默认第一个tab页面-->
<input type="hidden" id="defaultTab" value="${listData[0].code}">
<input type="hidden" id="defaultTime" value="">
<input type="hidden" id="defaultType" value="${jsonObjectTab[0].Remark}">
<div class="sy_box">
    <div class="data_box01">
        <div class="data_top">
            <span class="details" style="display: none;" id="upstreamHistoryShow"><a onclick="jumpToUpstreamDetails('${code}','${moduleId}')">历史数据</a></span>
            <span class="details_gray" style="display: none;" id="upstreamHistoryHide"><a>历史数据</a></span>
            <h1>上游</h1>
        </div>
        <div class="data_nav_box" id="upstreamTab">
            <c:forEach var="list" items="${listData}" varStatus="i">
                <c:if test="${i.index==0}">
                    <li class="china selected" id="china_${list.code}" picdom="tb_upstreamIndex" style="background-image:url(images/xl.png); background-size:17px 14px; background-position:center right; background-repeat:no-repeat; padding-right:10px;">
                </c:if>
                <c:if test="${i.index!=0}">
                    <li class="china" id="china_${list.code}" picdom="tb_upstreamIndex" style="background-image:url(images/xl.png); background-size:17px 14px; background-position:center right; background-repeat:no-repeat; padding-right:10px;">
                </c:if>
                <a href="javascript:void('0')" style="cursor:default ">${list.Name}</a>
                <dl style="width:130%;">
                    <c:forEach items="${list.jsonObjectTab}" var="json">
                        <dd><a class="zx" onclick="changUpstreamSelect('${list.code}','${json.Remark}','${json.CycleStr}','${json.CycleName}','${json.ProductTabId}')">${json.NAME}</a></dd>
                    </c:forEach>
                </dl>
                </li>
            </c:forEach>

            <div class="clearfix"></div>



        </div>
        <div class="day_box" id="upstreamDiv">
        </div>
        <div class="tb" id="tb_upstreamIndex" style="width: 100%;"></div>
    </div>
</div>

