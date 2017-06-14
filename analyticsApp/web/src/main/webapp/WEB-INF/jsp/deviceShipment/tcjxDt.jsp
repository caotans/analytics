<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
</head>
<script>
    $(function(){
        dataSource= ${tcjxArry};
        if(dataSource){
            dataSource= getPermissionByTime(DownloadElse,dataSource,"ExpectedStart","-","day");
        }
    });
</script>
<input type="hidden" id="productCode" value="${productCode}">
<div class="details_bottom_box">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr class="details_bottom_t" id="tcjxDtTable" >
            <th style="width:10%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'factory','tcjxDtTable')">
                <span>工厂</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <c:choose>
                <%-- PE--%>
                <c:when test="${productCode=='380-030'}">
                    <th style="width:10%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'Name','tcjxDtTable')">
                        <span>级别</span>
                        <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                    </th>
                    <th style="width:10%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'LineNumber','tcjxDtTable')">
                        <span>装置编号</span>
                        <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                    </th>
                </c:when>
                <%-- PP--%>
                <c:when test="${productCode=='380-060'}">
                    <th style="width:10%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'LineNumber','tcjxDtTable')">
                        <span>装置编号</span>
                        <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                    </th>
                </c:when>
                <c:otherwise>
                </c:otherwise>
            </c:choose>

            <th style="width:10%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'recordType','tcjxDtTable')">
                <span>类型</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:10%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'recordState','tcjxDtTable')">
                <span>状态</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
          <%--  <th style="width:12%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'FiducialOperationRate','tcjxDtTable')">
                <span>基准开工率</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>--%>
            <th style="width:10%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'Capacity','tcjxDtTable')">
                <span>产能（万吨/年）</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:13%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'ProductionImpact','tcjxDtTable')">
                <span>影响本月产量（万吨）</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:10%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'ExpectedStart','tcjxDtTable')">
                <span>开始时间</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:10%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'ExpectedEnd','tcjxDtTable')">
                <span>结束时间</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
        </tr>

    </table>
</div>
<div class="page_number_box01" style="margin-top: 10px;">

</div>




