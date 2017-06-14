<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script src="js/sys/util.js" type="text/javascript"></script>
</head>


<script>
    $(document).ready(function(){
        //对数据进行加工
        var findPrice_rise=${findPrice_rise};
        var findPrice_fall=${findPrice_fall};
        var findFuturesPrice_rise=${findFuturesPrice_rise};
        var findFuturesPrice_fall=${findFuturesPrice_fall};
        industryChainToArray("price",findPrice_rise,findPrice_fall);
       // industryChainToArray("futuresPrice",findFuturesPrice_rise,findFuturesPrice_fall);
        createIndustryChainTable("priceTable","price");
        //createIndustryChainTable("futuresPriceTable","futuresPrice");

    });
</script>
<div class="cy_bg_big_box">
<div class="cy_bg_big_box01">
    <div class="cy_bg_box01">
        <h2>价格涨跌TOP10</h2>
        <b> <span class="zd_box01">涨幅TOP10</span></b>
        <b>  <span class="zd_box02">跌幅TOP10</span></b>
        <table  width="100%" border="0" cellpadding="0" cellspacing="0" >
            <tr id="priceTable">
                <td>产品</td>
                <td class="yb_xt">涨幅</td>
                <td>产品</td>
                <td>跌幅</td>
            </tr>
        </table>

    </div>

</div>
<%--<div class="cy_bg_big_box01">--%>
    <%--<div class="cy_bg_box02">--%>
        <%--<h2>期货价格涨跌TOP10</h2>--%>
        <%--<b> <span class="zd_box01">涨幅TOP10</span></b>--%>
        <%--<b>  <span class="zd_box02">跌幅TOP10</span></b>--%>
        <%--<table  width="100%" border="0" cellpadding="0" cellspacing="0" >--%>
            <%--<tr id="futuresPriceTable">--%>
                <%--<td>产品</td>--%>
                <%--<td class="yb_xt">涨幅</td>--%>
                <%--<td>产品</td>--%>
                <%--<td>跌幅</td>--%>
            <%--</tr>--%>
        <%--</table>--%>

    <%--</div>--%>
<%--</div>--%>
<div class="clearfix"></div>
</div>




