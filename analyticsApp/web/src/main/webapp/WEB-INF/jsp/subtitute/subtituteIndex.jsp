<%@ page language="java" pageEncoding="UTF-8"%>

<script type="text/javascript" src="js/ec_model.js"></script>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="js/sys/subtituteIndex.js"></script>
</head>
        <script>
            $(document).ready(function(){
               subtituteInitTime('${listData[0].CycleStr}','${listData[0].CycleName}','${listData[0].ProductTabId}');
                initSubtituteLoad('','','','${listData[0].ProductTabId}');
            });
        </script>
<!-- 默认第一个tab页面-->
<input type="hidden" id="defaultSubtituteTab" value="${listData[0].Remark}">
<input type="hidden" id="defaultSubtituteTime" value="">
<input type="hidden" id="productSubtituteCode" value="${productCode}">
<input type="hidden" id="showListSubtitute" value="open">
<input type="hidden" id="subtituteProductCode" value="">
<div class="sy_box">
<div class="data_box01">
    <div class="data_top">
        <span class="details"><a href="javascript:void('0')" onclick="jumpToSubtituteDetails('${productCode}','${moduleSubtituteId}')">历史数据</a></span>
        <%--<span class="download"><img src="images/download.png"></span>--%>
        <h1>替代品</h1>
    </div>
    <div class="data_nav_box">
        <c:forEach var="list" items="${listData}" varStatus="i">
                    <c:if test="${i.index==0}">
                        <li class="china selected" picdom="tb_subtituteIndex" id="subtituteLi_${list.Remark}">
                    </c:if>
                    <c:if test="${i.index!=0}">
                        <li class="china" picdom="tb_subtituteIndex" id="subtituteLi_${list.Remark}">
                    </c:if>
            <a href="javascript:void('0')" onclick=" changSubtituteTab('${list.Remark}')">${list.NAME}</a>
            </li>
        </c:forEach>
        <div class="clearfix"></div>



    </div>
    <div class="day_box" id="subtituteDiv">
    </div>
    <div class="tb" id="tb_subtituteIndex" style="width: 100%;"></div>
    </div>
</div>
  </div>