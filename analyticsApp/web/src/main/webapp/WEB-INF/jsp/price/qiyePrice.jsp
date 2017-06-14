<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script src="${ctx}/js/tab.js"  type="text/javascript"></script>
    <script type="text/javascript" src="${ctx}/js/sys/analysisPrice.js"></script>
</head>

<script>
    priceCurrArray = ${qiyePriceArray};
    createQiyePriceTable(priceCurrArray);
</script>
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
                    <td style='cursor: pointer' onclick="sort_price(this,'MaxPrice','qiyeTab');">
                        <span>报价/挂牌价</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                    </td>
                    <c:choose>
                        <%-- PE--%>
                        <c:when test="${priceProductCode=='380-030'}">
                        </c:when>
                        <%-- PP--%>
                        <c:when test="${priceProductCode=='380-060'}">
                        </c:when>
                        <c:otherwise>
                            <td style="cursor: pointer" onclick="sort_price(this,'SettlementPrice','qiyeTab');">
                                <span>结算价</span>
                                <span class="ascending_box"><a style="cursor: pointer"  class="ascending01"></a><a style="cursor: pointer"  class="descending01"></a></span>
                            </td>
                        </c:otherwise>
                    </c:choose>
                    <td style='cursor: pointer' onclick="sort_price(this,'minChange','qiyeTab');">
                        <span>涨跌</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                    </td>
                    <td style='cursor: pointer' onclick="sort_price(this,'minChange','qiyeTab');">
                        <span>单位</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                    </td>
                    <td style='cursor: pointer' onclick="sort_price(this,'Note','qiyeTab');">
                        <span>级别-牌号</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="table-right" style="height: 250">
        <table>
            <tbody id="price_qiye">

            </tbody>
        </table>
    </div>

</div>

