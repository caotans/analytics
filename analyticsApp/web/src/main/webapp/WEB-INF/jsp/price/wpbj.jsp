<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
</head>
<script>
    var data_priceWaiPanArray = [];
    $(function(){
        var ls = window.localStorage;
        data_priceWaiPanArray = JSON.parse(ls.getItem("data_priceWaiPanArray"));
        if(data_priceWaiPanArray){
            wpbjDataSource=data_priceWaiPanArray;
            ls.setItem("data_priceWaiPanArray", JSON.stringify(null));
        }else{
            wpbjDataSource= ${array};
            wpbjDataSource=getPermissionByTime(DownloadInfo,wpbjDataSource,'PubDate',"/","day");
        }
    })
</script>
<style>

    .page_number_big_box{ width:100%; margin:20px 0 0 0;}
    .page_number_box01_wpbj{border:1px solid #dedede; border-radius:3px; float:right;}
    .page_number_box01_wpbj span{ display:inline-block; padding:0 8px; line-height:30px;  color:#fff; font-size:12px;}
    .page_number_box01_wpbj span a{ color:#fff; font-size:12px; line-height:30px; width:100%; display:block;}
        /*分页页码选中效果*/
    .page_number_select{background-color:#435770;}
</style>
<div class="details_bottom">
    <input type="hidden" name="priceProductCode" id='priceProductCode' value="${priceProductCode}">
<div class="details_bottom_box">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr class="details_bottom_t" id="wpbjDtTable">
            <th style="width:10%;cursor: pointer" onclick="wppbjDetailsSort(this,'PubDate','wpbjDtTable')">
                <span>报价日期</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:10%;cursor: pointer" onclick="wppbjDetailsSort(this,'level_name','wpbjDtTable')">
                <span>级别/牌号</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <c:choose>
                <%-- PE--%>
                <c:when test="${priceProductCode=='380-030'}">
                </c:when>
                <%-- PP--%>
                <c:when test="${priceProductCode=='380-060'}">
                </c:when>
                <c:otherwise>
                    <th style="width:10%;cursor: pointer" onclick="wppbjDetailsSort(this,'company_name','wpbjDtTable')">
                        <span>生产商</span>
                        <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                    </th>
                </c:otherwise>
            </c:choose>
            <th style="width:20%;cursor: pointer" onclick="wppbjDetailsSort(this,'ProducingArea','wpbjDtTable')">
                <span>产地</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:10%;cursor: pointer" onclick="wppbjDetailsSort(this,'PriceTerm','wpbjDtTable')">
                <span>价格条款</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:10%;cursor: pointer" onclick="wppbjDetailsSort(this,'quotoPrice','wpbjDtTable')">
                <span>报价</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:10%;cursor: pointer" onclick="wppbjDetailsSort(this,'hightLows','wpbjDtTable')">
                <span>涨跌</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:10%;"><span>备注</span>
            </th>
        </tr>
    </table>
</div>
<div class="page_number_box01_wpbj" style="margin-top: 10px;">

</div>


</div>
