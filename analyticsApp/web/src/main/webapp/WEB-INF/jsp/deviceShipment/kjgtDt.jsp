<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
</head>
<script>
    var kJbtata_deviceShip = [];
    $(function(){
        var ls = window.localStorage;
        kJbtata_deviceShip = JSON.parse(ls.getItem("kJbtata_deviceShip"));
        if(kJbtata_deviceShip){
            dataSource=kJbtata_deviceShip;
            if(dataSource){
                dataSource= getPermissionByTime(DownloadElse,dataSource,"ExpectedEnd","-","day");
            }
            ls.setItem("kJbtata_deviceShip", JSON.stringify(null));
        }else{
            dataSource= ${kjgtArry};
            if(dataSource){
                dataSource= getPermissionByTime(DownloadElse,dataSource,"ExpectedEnd","-","day");
            }
        }
    });
</script>
<div class="details_bottom_box">

    <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr class="details_bottom_t" id="kjgtDtTable">
            <th style="width:13%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'ExpectedEnd','kjgtDtTable')">
                <span>预计投产/关停时间</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:13%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'factory','kjgtDtTable')">
                <span>工厂</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <c:choose>
                <%-- PE--%>
                <c:when test="${productCode=='380-030'}">
                    <th style="width:13%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'Name','kjgtDtTable')">
                        <span>级别</span>
                        <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                    </th>
                    <th style="width:13%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'LineNumber','kjgtDtTable')">
                        <span>装置编号</span>
                        <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                    </th>
                </c:when>
                <%-- PP--%>
                <c:when test="${productCode=='380-060'}">
                    <th style="width:13%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'LineNumber','kjgtDtTable')">
                        <span>装置编号</span>
                        <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                    </th>
                </c:when>
                <c:otherwise>
                </c:otherwise>
            </c:choose>

            <th style="width:13%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'recordType','kjgtDtTable')">
                <span>类型</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:13%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'recordState','kjgtDtTable')">
                <span>状态</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:13%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'ExtendCapacity','kjgtDtTable')">
                <span>扩增产能</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <c:choose>
                <%-- SM--%>
                <c:when test="${productCode=='330-130'}">
                </c:when>
                <c:otherwise>
                    <th style="width:13%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'ProductionImpact','kjgtDtTable')">
                        <span>影响产量</span>
                        <span class="ascending_box"><a style="cursor: pointer" class="ascending"></a><a style="cursor: pointer" class="descending"></a></span>
                    </th>
                </c:otherwise>
            </c:choose>

        </tr>
    </table>
</div>
<div class="page_number_box01" style="margin-top: 10px;">

</div>