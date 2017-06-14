<%@ page language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/include/includes.jsp" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="${ctx}/js/sys/price.js"></script>
</head>


<input type="hidden" id="priceCNCode" value="">
<input type="hidden" id="priceTime" value="day">
<input type="hidden" id="tabType" value="">
<style type="text/css">
    .tb table tr th {
        line-height: 20px;
    }
    #restseldiv{ color:#404040; font-size:12px; margin-left:20px;  float:left; margin-top:10px;}
</style>
<script>
    $(document).ready(function () {
        initPriceTime('${tablist[0].CycleStr}', '${tablist[0].CycleName}','${tablist[0].NAME}');
        var productTabId = $("#priceProductTabId").val();
        var type = $("#defaultPriceTab").val();
        priceChange(1, productTabId, type, '${tablist[0].CycleStr}', '${tablist[0].CycleName}','${tablist[0].NAME}');
        $("#china_price").addClass("selected");
    });
</script>
<script src="${ctx}/js/tab.js" type="text/javascript"></script>
<script src="${ctx}/js/wpbjPriceTab.js" type="text/javascript"></script>
<input type="hidden" id="defaultPriceTime" value="">

<!-- 默认第一个tab页面-->
<input type="hidden" id="priceModuleId" value="${moduleId}">
<input type="hidden" id="defaultPriceTab" value="${tablist[0].Remark}">
<input type="hidden" id="priceProductTabId" value="${tablist[0].ProductTabId}">
<input type="hidden" id="priceProductCode" value="${productCode}">

<input type="hidden" id="startTime_qiye">
<input type="hidden" id="endTime_qiye">
<input type="hidden" id="startTime_wpbj">
<input type="hidden" id="endTime_wpbj">

<div class="sy_box">
    <div class="data_box01">
        <div class="data_top">
            <span class="details"><a onclick="getCNCode('${productCode}');">历史数据</a></span>

            <h1>价格</h1>
        </div>
        <div class="data_nav_box">
            <c:forEach var="tab" items="${tablist}" varStatus="stau">
                <li class="china" id="${tab.Remark}" value="${tab.ProductTabId}">
                    <a onclick="priceChange(${stau.index+1},${tab.ProductTabId},'${tab.Remark}','${tab.CycleStr}','${tab.CycleName}','${tab.NAME}');">${tab.NAME}</a>
                </li>
            </c:forEach>
            <div class="clearfix"></div>
        </div>
        <div id="restseldiv">您还可以选择<span id="restselectable" style="color:#F00"></span>个价格点</div>
        <div class="qh_box" id="changToChart" onclick="chartTableChange();">
            <a>切换为图</a>
        </div>
        <div class="qh_box" id="changToTable" onclick="chartTableChange();">
            <a>切换为表</a>
        </div>
        <div class="day_box" id="time_price">
        </div>
        <div class="clearfix"></div>
        <div class="tb" id="domestic_price">
            <div class="tab_h">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr class="tb_title">
                        <th style="width:4%;"></th>
                        <th style="width:24%;cursor: pointer" onclick="sort_price(this,'PubDate','priceTabGn');"><span
                                style="cursor: pointer">日期</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:24%;cursor: pointer" onclick="sort_price(this,'CodeName','priceTabGn');"><span
                                style="cursor: pointer">类型</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                      <%--  <th style="width:20%;cursor: pointer" onclick="sort_price(this,'AvgPrice','priceTabGn');"><span
                                style="cursor: pointer">均价</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>--%>
                        <th style="width:24%;cursor: pointer" onclick="sort_price(this,'avgChange','priceTabGn');"><span
                                style="cursor: pointer">涨跌</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:24%;cursor: pointer" onclick="sort_price(this,'Name','priceTabGn');"><span
                                style="cursor: pointer">单位</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                    </tr>
                </table>
            </div>
            <div class="tab_b">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" id="price_guonei">
                </table>
            </div>
        </div>
        <div class="tb" id="abroad_price">
            <div class="tab_h">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr class="tb_title">
                        <th style="width:4%;"></th>
                        <th style="width:24%;cursor: pointer" onclick="sort_price(this,'PubDate','priceTabGw');">
                            <span>日期</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:24%;cursor: pointer" onclick="sort_price(this,'CodeName','priceTabGw');">
                            <span>类型</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                     <%--   <th style="width:20%;cursor: pointer" onclick="sort_price(this,'AvgPrice','priceTabGw');">
                            <span>均价</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>--%>
                        <th style="width:24%;cursor: pointer" onclick="sort_price(this,'avgChange','priceTabGw');">
                            <span>涨跌</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:24%;cursor: pointer" onclick="sort_price(this,'Name','priceTabGw');">
                            <span>单位</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                    </tr>
                </table>
            </div>
            <div class="tab_b" style="height: 230">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" id="price_guowai">
                </table>
            </div>
        </div>

        <div id="table-container" class="table-container">
            <div class="table-top">
                <div class="table-mask">
                    <table>
                        <tbody>
                        <tr>
                            <td style="cursor: pointer" onclick="sort_price(this,'PubDate','qiyeTab');">
                                <span>日期</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <td style="cursor: pointer" onclick="sort_price(this,'Location','qiyeTab');">
                                <span>地区</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <td style="cursor: pointer" onclick="sort_price(this,'Producer','qiyeTab');">
                                <span>生产企业</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <td style="cursor: pointer" onclick="sort_price(this,'OfferingCompany','qiyeTab');">
                                <span>报价企业</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <td style='cursor: pointer' onclick="sort_price(this,'quotoPrice','qiyeTab');">
                                <span>报价/挂牌价</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>

                            <td style='cursor: pointer' onclick="sort_price(this,'hightLows','qiyeTab');">
                                <span>涨跌</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <td style='cursor: pointer' onclick="sort_price(this,'minChange','qiyeTab');">
                                <span>单位</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <c:choose>
                                <%-- PE--%>
                                <c:when test="${productCode=='380-030'}">
                                    <td style='cursor: pointer' onclick="sort_price(this,'level_name','qiyeTab');">
                                        <span>级别-牌号</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                                    </td>
                                </c:when>
                                <%-- PP--%>
                                <c:when test="${productCode=='380-060'}">
                                    <td style='cursor: pointer' onclick="sort_price(this,'level_name','qiyeTab');">
                                        <span>级别-牌号</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                                    </td>
                                </c:when>
                                <c:otherwise></c:otherwise>
                            </c:choose>
                            <td style='cursor: pointer' onclick="sort_price(this,'Note','qiyeTab');">
                                <span>备注</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="table-right">
                <table>
                    <tbody id="price_qiye">
                    </tbody>
                </table>
            </div>
        </div>

        <div id="wpbj-price-container" class="table-container">
            <div class="table-top">
                <div class="table-mask">
                    <table>
                        <tbody>
                        <tr>
                            <td style="cursor: pointer" onclick="sort_price(this,'PubDate','wpbjTab');">
                                <span>报价日期</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <td style="cursor: pointer" onclick="sort_price(this,'level_name','wpbjTab');">
                                <span>级别/牌号</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <c:choose>
                                <%-- PE--%>
                                <c:when test="${productCode=='380-030'}">
                                </c:when>
                                <%-- PP--%>
                                <c:when test="${productCode=='380-060'}">
                                </c:when>
                                <c:otherwise>
                                    <td style="cursor: pointer" onclick="sort_price(this,'company_name','wpbjTab');">
                                        <span>生产商</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                                    </td>
                                </c:otherwise>
                            </c:choose>
                            <td style="cursor: pointer" onclick="sort_price(this,'ProducingArea','wpbjTab');">
                                <span>产地</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <td style="cursor: pointer" onclick="sort_price(this,'PriceTerm','wpbjTab');">
                                <span>价格条款</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <td style='cursor: pointer' onclick="sort_price(this,'quotoPrice','wpbjTab');">
                                <span>报价</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <td style='cursor: pointer' onclick="sort_price(this,'hightLows','wpbjTab');">
                                <span>涨跌</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                            </td>
                            <td>
                                <span>备注</span>
                                <span class="ascending_box"></span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="table-right">
                <table>
                    <tbody id="price_wpbj">
                    </tbody>
                </table>
            </div>
        </div>

        <div class="tb" id="tb_price" style="width: 100%;"></div>
    </div>
</div>