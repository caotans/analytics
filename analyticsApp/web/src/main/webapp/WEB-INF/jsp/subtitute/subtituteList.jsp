<%@ page language="java" pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="js/sys/subtituteIndex.js"></script>
</head>
<div class="tab_h">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
    <tr class="tb_title">
        <th style="width:20%;">产品</th>
        <th style="width:20%;">${month}月均价</th>
        <th style="width:20%;">${month}月盈亏情况</th>
        <th style="width:40%;">较${month-1}月盈亏情况变化（报告月盈亏-上月盈亏）</th>
    </tr>
    </table>
</div>
<div class="tab_b">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" >
                 <c:forEach var="list" items="${listData}" varStatus="i">
                     <c:if test="${i.index%2==0}"><tr class="tb_content" onclick="checkSubtituteList('${code}','${list.downstreamProductCode}')"></c:if>
                     <c:if test="${i.index%2!=0}"><tr onclick="checkSubtituteList('${code}','${list.downstreamProductCode}')"></c:if>
                         <th style="width:20%;">${list.name}</th>
                         <th style="width:20%;">${list.avgPrice}</th>
                         <th style="width:20%;">4</th>
                         <th style="width:40%;"><span style="color:#ff0000;">+1</span></th>
                     </tr>
                 </c:forEach>
     </table>
</div>


