<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script src="${ctx}/js/wpbjPriceTab.js"  type="text/javascript"></script>
    <script type="text/javascript" src="${ctx}/js/sys/analysisPrice.js"></script>
</head>

<script>
    priceCurrArray = ${wpbjPriceArray};
    createWpbjPriceTable(priceCurrArray);
</script>
<div id="wpbj-price-container" class="table-container">

    <div class="table-top">
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
                        <td style='cursor: pointer' onclick="sort_price(this,'AvgPrice','wpbjTab');">
                            <span>报价</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                        </td>
                        <td style='cursor: pointer' onclick="sort_price(this,'minChange','wpbjTab');">
                            <span>涨跌</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                        </td>
                        <td style='cursor: pointer' onclick="sort_price(this,'Note','wpbjTab');">
                            <span>备注</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                        style="cursor: pointer" class="descending01"></a></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="table-right" style="height: 250">
        <table>
            <tbody id="price_wpbj">

            </tbody>
        </table>
    </div>
</div>
