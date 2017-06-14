<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
</head>
<script>
    $(function(){
        dataSource= ${cqArry};
        if(dataSource){
            dataSource= getPermissionByTime(DownloadElse,dataSource,"timeETA","-","day");
        }
    });
</script>
<div class="details_bottom_box">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr class="details_bottom_t" id="cqDtTable" style="cursor: default">
            <th style="width:12%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'timeETA','cqDtTable')">
                <span>预期抵达日期</span>
                <span class="ascending_box"><a style="cursor: pointer"  class="ascending32"></a><a style="cursor: pointer"  class="descending"></a></span>
            </th>
           <%-- <th style="width:12%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'timeETD','cqDtTable')">
                <span>预期出发日期</span>
                <span class="ascending_box"><a style="cursor: pointer"  class="ascending"></a><a style="cursor: pointer"  class="descending"></a></span>
            </th>--%>
            <th style="width:12%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'Name','cqDtTable')">
                <span>产品规格</span>
                <span class="ascending_box"><a style="cursor: pointer"  class="ascending32"></a><a style="cursor: pointer"  class="descending"></a></span>
            </th>
            <th style="width:12%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'VesselName','cqDtTable')">
                <span>船名</span>
                <span class="ascending_box"><a style="cursor: pointer"  class="ascending32"></a><a style="cursor: pointer"  class="descending"></a></span>
            </th>
            <th style="width:10%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'Quantity','cqDtTable')">
                <span>数量(吨)</span>
                <span class="ascending_box"><a style="cursor: pointer"  class="ascending"></a><a style="cursor: pointer"  class="descending"></a></span>
            </th>
            <th style="width:13%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'departureCountry','cqDtTable')">
                <span>出发地</span>
                <span class="ascending_box"><a style="cursor: pointer"  class="ascending32"></a><a style="cursor: pointer"  class="descending"></a></span>
            </th>
            <th style="width:17%;cursor: pointer" onclick="deviceShipmentDetailsSort(this,'city','cqDtTable')">
                <span>到达地</span>
                <span class="ascending_box"><a style="cursor: pointer"  class="ascending32"></a><a style="cursor: pointer"  class="descending"></a></span>
            </th>
            <th style="width:12%;">备注</th>
        </tr>
    </table>
</div>
<div class="page_number_box01" style="margin-top: 10px;">
   
</div>



