<%@ page language="java" pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="js/sys/downstreamIndex.js"></script>
    <script type="text/javascript" src="js/sys/util.js"></script>
</head>
<input type="hidden" id="downstreamProfitsListCode" value="${code}"/>
<input type="hidden" id="downstreamProfitsListAllType" value="${allType}"/>
<input type="hidden" id="downstreamProfitsListAllName" value="${allName}"/>
<script>
     var downstreamProfitsListCode=$("#downstreamProfitsListCode").val();
     loadProfitsList(downstreamProfitsListCode,${listData},'${allType}','${allName}','${tabId}','${downstreamModuleId}','${downstreamCheckTime}');
</script>
    <table width="100%" border="0" cellpadding="0" cellspacing="0" id="downstreamProfitsListTable">

    </table>




