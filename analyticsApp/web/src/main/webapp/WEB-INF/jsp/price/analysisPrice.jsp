<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="${ctx}/js/sys/analysisPrice.js"></script>
</head>

<input type="hidden" id="priceCNCode" value="">
<input type="hidden" id="priceTime" value="">
<input type="hidden" id="startTime" value="">
<input type="hidden" id="endTime" value="">
<input type="hidden" id="tabType" value="">
<input type="hidden" id="defaultPriceTime" value="">
<!-- 默认第一个tab页面-->
<input type="hidden" id="priceModuleId" value="${moduleId}">
<input type="hidden" id="defaultPriceTab" value="${tablist[0].Remark}">
<input type="hidden" id="priceProductTabId" value="${tablist[0].ProductTabId}">
<input type="hidden" id="priceProductCode" value="${productCode}">
<style type="text/css">
    .tb table tr th{line-height:20px;}
</style>

<script>
    $(document).ready(function(){
        var productTabId=$("#priceProductTabId").val();
        var type=$("#defaultPriceTab").val();
        priceAnalysisChange(productTabId,type,'${tablist[0].CycleStr}','${tablist[0].CycleName}');
    });
</script>

<div class="sy_box">
    <div class="data_box01">
        <div class="data_top">
            <span class="details"><a onclick="getCNCode('${productCode}');">历史数据</a></span>
            <h1>价格</h1>
        </div>
        <div class="data_nav_box">
            <c:forEach var="tab" items="${tablist}" varStatus="i">
                <li class="china" id="analysis_price_${tab.Remark}"  value="${tab.ProductTabId}">
                    <a onclick="priceAnalysisChange(${tab.ProductTabId},'${tab.Remark}','${tab.CycleStr}','${tab.CycleName}');">${tab.DictionaryName}</a>
                </li>
            </c:forEach>
            <div class="clearfix"></div>
        </div>


        <div id="analysis_Price"></div>
        <div class="clearfix"></div>

        <div id="analysis_nation_price"></div>
        <div class="tb" id="tb_price" style="width: 100%;"></div>

    </div>
</div>

