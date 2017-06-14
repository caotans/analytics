<%@ page language="java" pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="js/sys/downstreamIndex.js"></script>
    <script type="text/javascript" src="js/ec_model.js"></script>
    </head>
<script>
    $(document).ready(function(){
        initTime('${jsonDownstreamTab[0].CycleStr}','${jsonDownstreamTab[0].CycleName}','${jsonDownstreamTab[0].ProductTabId}','${jsonDownstreamTab[0].Disabled}');
        initDownstreamLoad('','','','${jsonDownstreamTab[0].ProductTabId}','${jsonDownstreamTab[0].Disabled}');
        var value= ${jsonDownstreamTab};
        var flag=true;
        for(var i=0;i<value.length;i++){
            if(value[i].Disabled=='false'){
                flag=false;
                break;
            }
        }
        if(flag){
            $("#downstreamHistoryHide").show();
        }else{
            $("#downstreamHistoryShow").show();
        }
    });
</script>
<!-- 默认第一个tab页面-->
<input type="hidden" id="defaultDownstreamTab" value="${jsonDownstreamTab[0].Remark}">
<input type="hidden" id="defaultDownstreamTime" value="">
<input type="hidden" id="productDownstreamCode" value="${productCode}">
<input type="hidden" id="showListDownstream" value="open">
<input type="hidden" id="downstreamProductCode" value="">
<input type="hidden" id="downstreamModuleId" value="${downstreamModuleId}">
<div class="sy_box">
    <div class="data_box01">
        <div class="data_top">
            <span class="details" style="display: none;" id="downstreamHistoryShow"><a onclick="jumpToDownstreamDetails('${productCode}','${downstreamModuleId}')">历史数据</a></span>
            <span class="details_gray" style="display: none;" id="downstreamHistoryHide"><a>历史数据</a></span>
            <h1>下游</h1>
        </div>
        <div class="data_nav_box" id="downstreamTab">
            <c:forEach var="list" items="${jsonDownstreamTab}" varStatus="i">
                <c:if test="${i.index==0}">
                    <li class="china selected" picdom="tb_downstreamIndex" id="downstreamLi_${list.Remark}">
                </c:if>
                <c:if test="${i.index!=0}">
                    <li class="china" picdom="tb_downstreamIndex" id="downstreamLi_${list.Remark}">
                </c:if>
                <a href="javascript:void('0')" onclick=" changDownstreamTab('${list.Remark}','${list.CycleStr}','${list.CycleName}','${list.ProductTabId}')">${list.NAME}</a>
                </li>
            </c:forEach>

            <div class="clearfix"></div>
            <c:forEach var="list" items="${jsonDownstreamTab}" varStatus="i">
                <c:if test="${list.Remark=='profits'}">
                    <div class="qh_box" id="downstreamToChart" onclick="downstreamToChart('${list.CycleStr}','${list.CycleName}','${list.ProductTabId}');" style="display: none">
                        <a>切换为图</a>
                    </div>
                    <div class="qh_box" id="downstreamToTable" onclick="changDownstreamTab('${list.Remark}','${list.CycleStr}','${list.CycleName}','${list.ProductTabId}');" style="display: none">
                        <a>切换为表</a>
                    </div>
                </c:if>

            </c:forEach>

            <div class="day_box" id="downstreamDiv">
            </div>
        </div>

        <div class="clearfix"></div>
        <div class="tb" id="showTableProfits" style="display: none;">
            <div class="tab_h">
                <c:forEach var="list" items="${jsonDownstreamTab}" varStatus="i">
                    <c:if test="${list.Remark=='profits'}">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr class="tb_title" id="downstreamSortProfitsList">
                                <th style="width:20%;" onclick="downstreamProfitsListSort(this,'timeDate',downstreamSource,'${list.CycleStr}','${list.CycleName}','${list.ProductTabId}','${list.ProductModuleId}')"><span style="cursor: pointer">日期</span><span class="ascending_box"><a  style="cursor: pointer" href="javascript:void('0')" class='ascending01'></a><a  style="cursor: pointer" href="javascript:void('0')"  class='descending01'></a></span></th>
                                <th style="width:20%;" onclick="downstreamProfitsListSort(this,'name',downstreamSource,'${list.CycleStr}','${list.CycleName}','${list.ProductTabId}','${list.ProductModuleId}')"><span style="cursor: pointer">产品</span><span class="ascending_box"><a  style="cursor: pointer" href="javascript:void('0')" class='ascending01'></a><a  style="cursor: pointer" href="javascript:void('0')"  class='descending01'></a></span></th>
                                <%--<th style="width:20%;" onclick="downstreamProfitsListSort(this,'avgPrice',downstreamSource,'${list.CycleStr}','${list.CycleName}','${list.ProductTabId}','${list.ProductModuleId}')"><span  style="cursor: pointer">当月均价</span><span class="ascending_box"><a  style="cursor: pointer" href="javascript:void('0')" class='ascending01'></a><a  style="cursor: pointer" href="javascript:void('0')"  class='descending01'></a></span></th>--%>
                                <th style="width:20%;" onclick="downstreamProfitsListSort(this,'thisPrice',downstreamSource,'${list.CycleStr}','${list.CycleName}','${list.ProductTabId}','${list.ProductModuleId}')"><span  style="cursor: pointer">当月盈亏情况</span><span class="ascending_box"><a  style="cursor: pointer" href="javascript:void('0')" class='ascending01'></a><a  style="cursor: pointer" href="javascript:void('0')"  class='descending01'></a></span></th>
                                <th style="width:20%;" onclick="downstreamProfitsListSort(this,'lastPrice',downstreamSource,'${list.CycleStr}','${list.CycleName}','${list.ProductTabId}','${list.ProductModuleId}')"><span  style="cursor: pointer">较上月盈亏情况变化</span><span class="ascending_box"><a  style="cursor: pointer" href="javascript:void('0')" class='ascending01'></a><a style="cursor: pointer" href="javascript:void('0')"  class='descending01'></a></span></th>
                            </tr>
                        </table>
                    </c:if>

                </c:forEach>

            </div>
            <div class="tab_b" id="downstreamTable">

            </div>

        </div>

        <div class="tb" id="tb_downstreamIndex" style="width: 100%;"></div>
    </div>
</div>
</div>