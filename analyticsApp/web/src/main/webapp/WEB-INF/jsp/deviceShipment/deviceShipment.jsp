<%@ page language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/include/includes.jsp" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="${ctx}/js/sys/deviceShipment.js"></script>
    <script type="text/javascript" src="${ctx}/js/sys/pagination.js"></script>
    <script type="text/javascript" src="${ctx}/js/sys/util.js"></script>
</head>

<script>
    $(function () {
        var type = $("#selectDeviceShipMentDetails").val();
        var productTabId=$("#deviceProductTabId").val();
        var currentCycleStr=$("#currentCycleStr").val();    //国内或者国际
        firstLoding_chuanqi(type,productTabId,currentCycleStr);
    })
</script>
<!-- 记录首页选了哪个tab页-->
<input type="hidden" id="selectDeviceShipMentDetails" value="${deviceShipmentTabList[0].Remark}">
<input type="hidden" id="productCode" value="${productCode}">
<input type="hidden" id="deviceModuleId" value="${moduleId}">
<input type="hidden" id="deviceProductTabId" value="${deviceShipmentTabList[0].ProductTabId}">
<input type="hidden" id="currentCycleStr" value="${deviceShipmentTabList[0].jsonObjectTab[0].CurrentCycleStr}">
<input type="hidden" id="jxStartTime">
<input type="hidden" id="jxEndTime">
<input type="hidden" id="jxExpectedStart">
<input type="hidden" id="kjExpectedStartTime">
<input type="hidden" id="kjExpectedEndTime">

<div class="sy_box01">
    <div class="data_box03">
        <div class="data_top">
            <span class="details"><a href="javascript:void('0')"
                                     onclick="jumptToDeviceShipmentDetails()">历史数据</a></span>
            <%--<span class="download" ><img src="images/download.png"></span>--%>
            <h1>装置/船期</h1>
        </div>

        <div class="data_nav_box">
            <c:forEach var="list" items="${deviceShipmentTabList}" varStatus="i">
                <c:if test="${not empty list.jsonObjectTab}">
                    <c:if test="${i.index==0}">
                        <li class="china selected" id="device_${list.Remark}"  style="background-image:url(images/xl.png); background-size:17px 14px; background-position:center right; background-repeat:no-repeat; padding-right:10px;">
                    </c:if>
                    <c:if test="${i.index!=0}">
                        <li class="china" id="device_${list.Remark}" style="background-image:url(images/xl.png); background-size:17px 14px; background-position:center right; background-repeat:no-repeat; padding-right:10px;">
                    </c:if>
                    <a href="javascript:void('0')" style="cursor:default ">${list.NAME}</a>
                </c:if>
                <c:if test="${empty list.jsonObjectTab}">
                    <c:if test="${i.index==0}">
                        <li class="china selected" id="device_${list.Remark}"  style=" background-size:17px 14px; background-position:center right; background-repeat:no-repeat; padding-right:10px;">
                    </c:if>
                    <c:if test="${i.index!=0}">
                        <li class="china" id="device_${list.Remark}" style=" background-size:17px 14px; background-position:center right; background-repeat:no-repeat; padding-right:10px;">
                    </c:if>
                    <a href="javascript:void('0')" onclick="firstLoding_chuanqi('${list.Remark}','${list.ProductTabId}','')">${list.NAME}</a>
                </c:if>

                <dl style="width:130%;">
                    <c:forEach items="${list.jsonObjectTab}" var="json">
                        <dd><a href="javascript:void('0')" onclick="firstLoding_chuanqi('${list.Remark}','${list.ProductTabId}','${json.CurrentCycleStr}')">${json.PricePointName}</a></dd>
                    </c:forEach>
                </dl>
                </li>
            </c:forEach>
            <div class="clearfix"></div>

        </div>

        <div class="tb" id="deviceShipTab"></div>
        <div class="tb" id="jx_count">
            <div class="tab_h">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr class="tb_title" style="cursor: default">
                        <th style="width:10%;cursor: pointer"
                            onclick="deviceShipmentSort(this,'factory')">
                            <span>工厂</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                       <c:choose>
                          <%-- PE--%>
                          <c:when test="${productCode=='380-030'}">
                              <th style="width:10%;cursor: pointer"
                                  onclick="deviceShipmentSort(this,'Name')">
                                  <span>级别</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                              </th>
                              <th style="width:10%;cursor: pointer"
                                  onclick="deviceShipmentSort(this,'LineNumber')">
                                  <span>装置编号</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                              </th>
                          </c:when>
                           <%-- PP--%>
                           <c:when test="${productCode=='380-060'}">
                               <th style="width:10%;cursor: pointer"
                                   onclick="deviceShipmentSort(this,'LineNumber')">
                                   <span>装置编号</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                               </th>
                           </c:when>
                           <c:otherwise>
                           </c:otherwise>
                       </c:choose>

                        <th style="width:10%;cursor: pointer"
                            onclick="deviceShipmentSort(this,'recordType')">
                            <span>类型</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:10%;cursor: pointer"
                            onclick="deviceShipmentSort(this,'recordState')">
                            <span>状态</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                      <%--  <th style="width:12%;cursor: pointer"
                            onclick="deviceShipmentSort(this,'FiducialOperationRate')">
                            <span>基准开工率</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>--%>
                        <th style="width:10%;cursor: pointer" onclick="deviceShipmentSort(this,'Capacity')">
                            <span>产能(万吨/年)</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:13%;cursor: pointer" onclick="deviceShipmentSort(this,'ProductionImpact')">
                            <span>影响本月产量（万吨）</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:10%;cursor: pointer" onclick="deviceShipmentSort(this,'ExpectedStart')">
                            <span>开始时间</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:10%;cursor: pointer" onclick="deviceShipmentSort(this,'ExpectedEnd')">
                            <span>结束时间</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                    </tr>
                </table>
            </div>
            <div class="tab_b">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" id="tcjx_tab">
                </table>
            </div>
        </div>

        <div class="tb" id="cq_count">
            <div class="tab_h">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr class="tb_title" style="cursor: default">
                        <th style="width:12%;cursor: pointer" onclick="deviceShipmentSort(this,'timeETA')">
                            <span>预期抵达日期</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                       <%-- <th style="width:12%;cursor: pointer" onclick="deviceShipmentSort(this,'timeETD')">
                            <span>预期出发日期</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>--%>
                        <th style="width:12%;cursor: pointer" onclick="deviceShipmentSort(this,'Name')">
                            <span>产品规格</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:12%;cursor: pointer" onclick="deviceShipmentSort(this,'VesselName')">
                            <span>船名</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:10%;cursor: pointer" onclick="deviceShipmentSort(this,'Quantity')">
                            <span>数量(吨)</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:13%;cursor: pointer" onclick="deviceShipmentSort(this,'departureCountry')">
                            <span>出发地</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:17%;cursor: pointer" onclick="deviceShipmentSort(this,'city')">
                            <span>到达地</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:12%;">备注</th>
                    </tr>
                </table>
            </div>
            <div class="tab_b">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" id="cq_tab">
                </table>
            </div>
        </div>

        <div class="tb" id="kj_count">
            <div class="tab_h">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr class="tb_title" style="cursor: default">
                        <th style="width:13%;cursor: pointer" onclick="deviceShipmentSort(this,'ExpectedEnd')">
                            <span>预计投产/关停时间</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:13%;cursor: pointer" onclick="deviceShipmentSort(this,'factory')">
                            <span>工厂</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <c:choose>
                            <%-- PE--%>
                            <c:when test="${productCode=='380-030'}">
                                <th style="width:13%;cursor: pointer" onclick="deviceShipmentSort(this,'Name')">
                                    <span>级别</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                                </th>
                                <th style="width:13%;cursor: pointer" onclick="deviceShipmentSort(this,'LineNumber')">
                                    <span>装置编号</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                                </th>
                            </c:when>
                            <%-- PP--%>
                            <c:when test="${productCode=='380-060'}">
                                <th style="width:13%;cursor: pointer" onclick="deviceShipmentSort(this,'LineNumber')">
                                    <span>装置编号</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                                </th>
                            </c:when>
                            <c:otherwise>
                            </c:otherwise>
                        </c:choose>

                        <th style="width:13%;cursor: pointer" onclick="deviceShipmentSort(this,'recordType')">
                            <span>类型</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:13%;cursor: pointer" onclick="deviceShipmentSort(this,'recordState')">
                            <span>状态</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>
                        <th style="width:13%;cursor: pointer" onclick="deviceShipmentSort(this,'ExtendCapacity')">
                            <span>扩增产能</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" class="descending01"></a></span>
                        </th>

                        <c:choose>
                            <%-- SM--%>
                            <c:when test="${productCode=='330-130'}">
                            </c:when>
                            <c:otherwise>
                                <th style="width:13%;cursor: pointer" onclick="deviceShipmentSort(this,'ProductionImpact')">
                                    <span>影响产量</span>
                            <span class="ascending_box"><a style="cursor: pointer" class="ascending01"></a><a
                                    style="cursor: pointer" href="javascript:void('0')"
                                    onclick="deviceShipmentSort('ProductionImpact','desc')"
                                    class="descending01"></a></span>
                                </th>
                            </c:otherwise>
                        </c:choose>

                    </tr>
                </table>
            </div>
            <div class="tab_b">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" id="kjgt_tab">
                </table>
            </div>
        </div>

    </div>
</div>