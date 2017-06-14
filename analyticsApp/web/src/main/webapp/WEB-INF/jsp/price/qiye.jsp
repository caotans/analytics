<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
</head>
<script>
    var data_priceQiyeArray = [];
    $(function(){
        var ls = window.localStorage;
        data_priceQiyeArray = JSON.parse(ls.getItem("data_priceQiyeArray"));
        if(data_priceQiyeArray){
            qiyeDataSource=data_priceQiyeArray;
            ls.setItem("data_priceQiyeArray", JSON.stringify(null));
        }else{
            qiyeDataSource= ${array};
            qiyeDataSource=getPermissionByTime(DownloadInfo,qiyeDataSource,'PubDate',"/","day");
        }
    })
</script>
<style>

    .page_number_big_box{ width:100%; margin:20px 0 0 0;}
    .page_number_box01_qybj{border:1px solid #dedede; border-radius:3px; float:right;}
    .page_number_box01_qybj span{ display:inline-block; padding:0 8px; line-height:30px;  color:#fff; font-size:12px;}
    .page_number_box01_qybj span a{ color:#fff; font-size:12px; line-height:30px; width:100%; display:block;}
        /*分页页码选中效果*/
    .page_number_select{background-color:#435770;}
</style>
<input type="hidden" name="priceProductCode" id='priceProductCode' value="${priceProductCode}">
<div class="details_bottom">
<div class="details_bottom_box">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr class="details_bottom_t" id="qiyeDtTable">
            <th style="width:10%;cursor: pointer" onclick="qiyeDetailsSort(this,'PubDate','qiyeDtTable')">
                <span>日期</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:10%;cursor: pointer" onclick="qiyeDetailsSort(this,'Location','qiyeDtTable')">
                <span>地区</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:20%;cursor: pointer" onclick="qiyeDetailsSort(this,'Producer','qiyeDtTable')">
                <span>生产企业</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:20%;cursor: pointer" onclick="qiyeDetailsSort(this,'OfferingCompany','qiyeDtTable')">
                <span>报价企业</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:10%;cursor: pointer" onclick="qiyeDetailsSort(this,'quotoPrice','qiyeDtTable')">
                <span>报价/挂牌价</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:5%;cursor: pointer" onclick="qiyeDetailsSort(this,'hightLows','qiyeDtTable')">
                <span>涨跌</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <th style="width:5%;cursor: pointer" onclick="qiyeDetailsSort(this,'UnitName','qiyeDtTable')">
                <span>单位</span>
                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
            </th>
            <c:choose>
                <%-- PE--%>
                <c:when test="${priceProductCode=='380-030'}">
                    <th style="width:10%;cursor: pointer" onclick="qiyeDetailsSort(this,'level_name','qiyeDtTable')">
                        <span>级别-牌号</span>
                        <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                    </th>
                </c:when>
                <%-- PP--%>
                <c:when test="${priceProductCode=='380-060'}">
                    <th style="width:10%;cursor: pointer" onclick="qiyeDetailsSort(this,'level_name','qiyeDtTable')">
                        <span>级别-牌号</span>
                        <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                    </th>
                </c:when>
                <c:otherwise></c:otherwise>
            </c:choose>
            <th style="width:15%;"><span>备注</span>
            </th>
        </tr>
    </table>
</div>
<div class="page_number_big_box">
    <div class="page_number_box01_qybj">
    </div>
    <div class="clearfix"></div>
</div>

</div>
</div>
