<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
</head>
<script>
    $(document).ready(function(){
        //对数据进行加工
        var findCapacityRate_rise=${findCapacityRate_rise};
        var findCapacityRate_fall=${findCapacityRate_fall};
        industryChainToArray("capacityRate",findCapacityRate_rise,findCapacityRate_fall);
        createIndustryChainTable("capacityRateTable","capacityRate");

    });
</script>
<div class="cy_bg_big_box">
    <div class="cy_bg_big_box02">
        <div class="cy_bg_box01">
            <h2>开工率涨跌TOP10</h2>
            <b> <span class="zd_box01">涨幅TOP10</span></b>
            <b>  <span class="zd_box02">跌幅TOP10</span></b>
            <table  width="100%" border="0" cellpadding="0" cellspacing="0" >
                <tr id="capacityRateTable">
                    <td>产品</td>
                    <td class="yb_xt">涨幅</td>
                    <td>产品</td>
                    <td>跌幅</td>
                </tr>
            </table>

        </div>

    </div>

    <div class="clearfix"></div>
</div>




