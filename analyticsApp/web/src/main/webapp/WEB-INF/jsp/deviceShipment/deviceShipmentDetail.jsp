<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/include/includes.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <title>装置/船期详情</title>
    <link href="${ctx}/css/css.css" rel="stylesheet" type="text/css"/>
    <link href="${ctx}/css/datepicker3.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="${ctx}/js/ec_model.js"></script>

    <script type="text/javascript" src="${ctx}/js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="${ctx}/js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="${ctx}/js/echarts/build/dist/echarts-all.js"></script>
    <script type="text/javascript" src="${ctx}/js/ec_model.js"></script>
    <script type="text/javascript" src="${ctx}/js/index.js"></script>
    <script type="text/javascript" src="${ctx}/js/sys/deviceShipmentDetail.js"></script>
    <script type="text/javascript" src="${ctx}/js/sys/pagination.js"></script>
    <script type="text/javascript" src="${ctx}/js/sys/util.js"></script>

</head>
<body>
<jsp:include page="../include/top.jsp"></jsp:include>
<jsp:include page="../include/menu.jsp"></jsp:include>
<jsp:include page="../include/navigation.jsp"></jsp:include>
<script>
    $(document).ready(function(){
        var pm=$(".product01").text();
        this.title=pm+'-装置/船期详情';
    });
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', GA_ID, 'auto');
    ga('send', 'pageview');

</script>
<script>
    $(function () {
        var selectDeviceShipMentDetails=$("#selectDeviceShipMentDetails").val();
        var detailCurrentCycleStr=$("#detailCurrentCycleStr").val();
        firstLoding_chuanqiDt(selectDeviceShipMentDetails,detailCurrentCycleStr,getPermission(${detailBabList},selectDeviceShipMentDetails,"OtherDownload"));
    });
    function  exportdeviceShipmentDetail(){
        var productCode=$("#productCode").val();
        var type=$("#selectDeviceShipMentDetails").val();
        var fileName=$(".selected").find("a").text();

        if(type=='jx'){
            $("#fileName").val('停车检修');
            if(dataSource){
                dataSource=getPermissionByTime(DownloadElse,dataSource,"ExpectedStart","-","day");
            }
            if(!dataSource){
                alert('暂无数据！');
                return ;
            }
            var array=[dataSource];
            var titleName,keyName;
            if(productCode=='380-030'){  //PE
                titleName=[["工厂","级别","装置编号","类型","状态","产能（万吨/年）","影响本月产量（万吨）","开始时间","结束时间"]];
                keyName=[['factory','Name','LineNumber','recordType','recordState','Capacity','ProductionImpact','ExpectedStart','ExpectedEnd']];
            }else if( productCode=='380-060'){  //PP
                titleName=[["工厂",'装置编号',"类型","状态","产能（万吨/年）","影响本月产量（万吨）","开始时间","结束时间"]];
                keyName=[['factory','LineNumber','recordType','recordState','Capacity','ProductionImpact','ExpectedStart','ExpectedEnd']];
            }else{
                titleName=[["工厂","类型","状态","产能（万吨/年）","影响本月产量（万吨）","开始时间","结束时间"]];
                keyName=[['factory','recordType','recordState','Capacity','ProductionImpact','ExpectedStart','ExpectedEnd']];
            }
            var sheetName=["停车检修"];
            $("#titleName").val(JSON.stringify(titleName));
            $("#sheetName").val(JSON.stringify(sheetName));
            $("#keyName").val(JSON.stringify(keyName));
            if(DownloadElse==1){
                alert("您尚未开通下载Excel权限!");
                return;
            }else {
                $("#excelArray").val(JSON.stringify(array));
                $('#deviceShipmentExport').submit() ;

            }
        }else if(type=='kj'){
            $("#fileName").val('扩建关停');
            if(dataSource){
                dataSource=getPermissionByTime(DownloadElse,dataSource,"ExpectedEnd","-","day");
            }
            if(!dataSource){
                 alert('暂无数据！');
                 return ;
            }
            var array=[dataSource];
            var titleName,keyName;
            if(productCode=='380-030'){  //PE
                titleName=[["扩建/关停日期","工厂","级别","装置编号","类型","状态","扩增产能","影响产量"]];
                keyName=[['ExpectedEnd','factory','Name','LineNumber','recordType','recordState','ExtendCapacity','ProductionImpact']];
            }else if(productCode=='380-060'){  //PP
                titleName=[["扩建/关停日期","工厂","装置编号","类型","状态","扩增产能","影响产量"]];
                keyName=[['ExpectedEnd','factory','LineNumber','recordType','recordState','ExtendCapacity','ProductionImpact']];
            }else if(productCode=='330-130'){   //SM
                titleName=[["扩建/关停日期","工厂","类型","状态","扩增产能"]];
                keyName=[['ExpectedEnd','factory','recordType','recordState','ExtendCapacity']];
            }else{
                titleName=[["扩建/关停日期","工厂","类型","状态","扩增产能","影响产量"]];
                keyName=[['ExpectedEnd','factory','recordType','recordState','ExtendCapacity','ProductionImpact']];
            }
            var sheetName=["扩建关停"];
            $("#titleName").val(JSON.stringify(titleName));
            $("#sheetName").val(JSON.stringify(sheetName));
            $("#keyName").val(JSON.stringify(keyName));
            if(DownloadElse==1){
                alert("您尚未开通下载Excel权限!");
                return;
            }else {
                $("#excelArray").val(JSON.stringify(array));
                $('#deviceShipmentExport').submit() ;

            }
        }else if(type=='cq'){
            $("#fileName").val('船期');
            if(dataSource){
                dataSource=getPermissionByTime(DownloadElse,dataSource,"timeETA","-","day");
            }
            if(!dataSource){
                alert('暂无数据！');
                return ;
            }
            var array=[dataSource];
            var titleName=[["预期抵达日期","产品规格","船名","数量（吨）","出发地","到达地","备注"]];
            var keyName=[['timeETA','Name','VesselName','Quantity','departureCountry','city','Remark']];
            var sheetName=["船期"];
            $("#titleName").val(JSON.stringify(titleName));
            $("#sheetName").val(JSON.stringify(sheetName));
            $("#keyName").val(JSON.stringify(keyName));
            if(DownloadElse==1){
                alert("您尚未开通下载Excel权限!");
                return;
            }else {
                $("#excelArray").val(JSON.stringify(array));
                $('#deviceShipmentExport').submit() ;

            }
        }

        ga('send', 'event', {
            'eventCategory': '装置/船期详情_tab点击',
            'eventAction': '导出Excel'
        });
    }

</script>


<input type="hidden" id="selectDeviceShipMentDetails" value="${type}">
<input type="hidden" id="productCode" value="${productCode}">
<input type="hidden" id="detailCurrentCycleStr" value="${currentCycleStr}">

<div class="fh_box"><a href="javascript:void('0')" onclick="window.history.back()">&nbsp;&nbsp;返回</a></div>
<div class="big_box">
    <div class="details_top_nav">
        <c:forEach var="list" varStatus="i" items="${detailBabList}">
                <c:if test="${not empty list.jsonObjectTab}">
                    <li class="details_nav11" id="${list.Remark}">
                    <a href="javascript:void('0')" style="cursor:default ">${list.NAME}</a>
                </c:if>
                <c:if test="${empty list.jsonObjectTab}">
                    <li class="details_nav" id="${list.Remark}">
                    <a href="javascript:void('0')" onclick="firstLoding_chuanqiDt('${list.Remark}','','${list.OtherDownload}')">${list.NAME}</a>
                </c:if>
                <dl>
                    <c:forEach items="${list.jsonObjectTab}" var="json">
                        <dd><a href="javascript:void('0')" onclick="firstLoding_chuanqiDt('${list.Remark}','${json.CurrentCycleStr}','${list.OtherDownload}')">${json.PricePointName}</a></dd>
                    </c:forEach>
                </dl>
            </li>
        </c:forEach>

        <div class="clearfix"></div>
    </div>

    <form action="exportExcelUtils" id="deviceShipmentExport" method="post">
        <input type="hidden" name="fileName" id="fileName">
        <input type="hidden" name="url" value="json">
        <input type="hidden" id="excelArray" name="excelArray" value="">
        <input type="hidden" id="titleName" name="titleName" value="">
        <input type="hidden" id="sheetName" name="sheetName" value="">
        <input type="hidden" id="keyName" name="keyName" value="">
    </form>

    <div class="details_box">
        <div class="details_top">

            <div  id="tcjxSelect">
                <p>查询范围：</p>
                <div class="calendar">
                    <input type="text" class="start" id="startTime" style="color: #fff;padding-left: 5px;"/>
                    <span></span>
                    <input type="text" class="end" id="endTime" style="color: #fff;padding-left: 5px;"/>

                    <div class="calendar_ss"><a href="javascript:void('0')" onclick="searchShipMentDetail()">搜索</a></div>
                </div>
                <div class="exl"><a onclick="exportdeviceShipmentDetail()">导出excel</a></div>
                <div class="clearfix"></div>
            </div>

            <div  id="cqSelect">
                <p>抵达日期：</p>
              <%--  <span class="cq_box">
                        <select>
                            <option value ="1">抵达时间</option>
                            <option value ="2">出发时间</option>
                        </select>
                </span>
                <span class="mao_box">:</span>--%>
                   <div class="calendar">
                    <input type="text" class="start" id="cqStartTime" style="color: #fff;padding-left: 5px;"/>
                    <span></span>
                    <input type="text" class="end" id="cqEndTime" style="color: #fff;padding-left: 5px;"/>

                    <div class="calendar_ss"><a href="javascript:void('0')" onclick="searchShipMentDetail()">搜索</a></div>
                </div>
                <div class="exl"><a onclick="exportdeviceShipmentDetail()">导出excel</a></div>
                <div class="clearfix"></div>
            </div>

            <div  id="kjgtSelect">
                <p>查询范围：</p>
                <div class="calendar">
                    <input type="text" class="start" id="kjStartTime" style="color: #fff;padding-left: 5px;"/>
                    <span></span>
                    <input type="text" class="end" id="kjEndTime" style="color: #fff;padding-left: 5px;"/>

                    <div class="calendar_ss"><a href="javascript:void('0')" onclick="searchShipMentDetail()">搜索</a></div>
                </div>
                <div class="exl"><a onclick="exportdeviceShipmentDetail()">导出excel</a></div>
                <div class="clearfix"></div>
            </div>

        </div>


        <div class="details_bottom" id="showDeviceShipmentDetails" style="min-height:500px; ">

        </div>


    </div>
</div>

<input type="hidden" id="jxStartTime" value="${jxStartTime}">
<input type="hidden" id="jxExpectedStart" value="${jxExpectedStart}">
<input type="hidden" id="jxEndTime" value="${jxEndTime}">
<input type="hidden" id="kjExpectedStartTime" value="${kjExpectedStartTime}">
<input type="hidden" id="kjExpectedEndTime" value="${kjExpectedEndTime}">

<jsp:include page="../include/foot.jsp"></jsp:include>
<script>
    var jxStartTime=$("#jxStartTime").val();
    var jxExpectedStart=$("#jxExpectedStart").val();
    var jxEndTime=$("#jxEndTime").val();

    //检修
   $('#startTime').datepicker({
       todayBtn: "linked",
       autoclose: true,
       todayHighlight: false,
       keyboardNavigation: false,
       forceParse: false

   }).on('changeDate', function (e) {
               var startTime = e.date;
               $('#startTime').datepicker('setStartDate',jxExpectedStart);
               $('#endTime').datepicker('setStartDate',startTime);
           });
   $('#endTime').datepicker({
       todayBtn: "linked",
       autoclose: true,
       todayHighlight: false,
       keyboardNavigation: false,
       forceParse: false

   }).on('changeDate', function (e) {
               var endTime = e.date;
               $('#startTime').datepicker('setEndDate',endTime);
               $('#endTime').datepicker('setEndDate',jxEndTime);
           });
    //船期
    $('#cqStartTime').datepicker({
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: false,
        keyboardNavigation: false,
        forceParse: false

    }).on('changeDate', function (e) {
                var startTime = e.date;
                $('#cqEndTime').datepicker('setStartDate',startTime);
            });
    $('#cqEndTime').datepicker({
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: false,
        keyboardNavigation: false,
        forceParse: false

    }).on('changeDate', function (e) {
                var endTime = e.date;
                $('#cqStartTime').datepicker('setEndDate',endTime);
            });
    //扩建
    $('#kjStartTime').datepicker({
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: false,
        keyboardNavigation: false,
        forceParse: false

    }).on('changeDate', function (e) {
                var startTime = e.date;
                //$('#kjStartTime').datepicker('setStartDate','2017-10-01');
                var kjExpectedStartTime=$("#kjExpectedStartTime").val();
                $('#kjStartTime').datepicker('setStartDate',kjExpectedStartTime);
                $('#kjEndTime').datepicker('setStartDate',startTime);
            });
    $('#kjEndTime').datepicker({
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: false,
        keyboardNavigation: false,
        forceParse: false

    }).on('changeDate', function (e) {
                var endTime = e.date;
                //$('#kjEndTime').datepicker('setEndDate','2017-10-31');      \
                var kjExpectedEndTime=$("#kjExpectedEndTime").val();
                $('#kjStartTime').datepicker('setEndDate',endTime);
                $('#kjEndTime').datepicker('setEndDate',kjExpectedEndTime);
            });
</script>
</body>
</html>
