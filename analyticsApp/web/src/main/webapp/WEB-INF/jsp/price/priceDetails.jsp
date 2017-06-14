<%@ page language="java" pageEncoding="UTF-8" %>
<%
String ssid=request.getSession().getId();
    if(ssid!=null&&!"".equals(ssid)){
        request.setAttribute("priceDetails_ssid",ssid);
    }
%>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="-1">
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<!doctype html>
<html>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <title>价格详情</title>
    <link href="${ctx}/css/css.css" rel="stylesheet" type="text/css"/>
    <link href="${ctx}/css/datepicker3.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="${ctx}/js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="${ctx}/js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="${ctx}/js/echarts/build/dist/echarts-all.js"></script>
    <script type="text/javascript" src="${ctx}/js/ec_model.js"></script>
    <script type="text/javascript" src="${ctx}/js/index.js"></script>
    <script type="text/javascript" src="${ctx}/js/sys/priceDetails.js"></script>
    <script type="text/javascript" src="${ctx}/js/sys/pagination.js"></script>
    <script type="text/javascript" src="${ctx}/js/sys/util.js"></script>


</head>
<script>
    $(document).ready(function(){
        var pm=$(".product01").text();
        this.title=pm+'-价格详情';
    });
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', GA_ID, 'auto');
    ga('send', 'pageview');

</script>
<script>
    $(document).ready(function () {
        var ptId=$("#ptId").val();
        var pmmark=$("#pmmark").val();
         $(".cp_box > a").removeClass("product01");
        $(".cp_box > a[prdcode='"+pmmark+"']").addClass("product01");
        priceDetailsLegend = null;
        var ls = window.localStorage;
        priceDetailsLegend = JSON.parse(ls.getItem("priceDetailsLegend"));
        //日期控件默认时间选定
        var timetype = $(".big_wd").find(".wd_r").text();
         getCurrentDate($("#timeType").val());    //价格详情
        $("#startTime_qiye").datepicker('setDate', '${startTime_qiye}');
        $("#endTime_qiye").datepicker('setDate', '${endTime_qiye}');
        $("#startTime_wpbj").datepicker('setDate', '${startTime_wpbj}');
        $("#endTime_wpbj").datepicker('setDate', '${endTime_wpbj}');
        var type=$("#defaultPriceTab").val();
        var tabType = $("#tabType").val();
        if (tabType == "" || tabType == null) {
           priceDtChangTab(type, 1,ptId,${detailBabList[0].PriceDownload},${detailBabList[0].OtherDownload});


        } else {
          priceDtChangTab(tabType, 1,ptId,getPermission(${detailBabList},tabType,"PriceDownload"),getPermission(${detailBabList},tabType,"OtherDownload"));

        }
    });

    //企业报价
    function exportPriceCompanyDetail(){
        var priceProductCode=$("#priceDetailsProductCode").val();
        var titleName,keyName;
        $("#fileName").val('企业报价');
        $("#priceUrl").val('json');
        if(!qiyeDataSource){
            alert('暂无数据！');
            return ;
        }

        var array=[qiyeDataSource];
        if(priceProductCode=='380-030' || priceProductCode=='380-060'){  //PE 、PP
            titleName=[["日期","地区","生产企业","报价企业","报价/挂牌价","涨跌","单位","级别-牌号","备注"]];
            keyName=[['PubDate','Location','Producer','OfferingCompany','quotoPrice','hightLows','UnitName','level_name','Note']];
        }else{
            titleName=[["日期","地区","生产企业","报价企业","报价/挂牌价","涨跌","单位","备注"]];
            keyName=[['PubDate','Location','Producer','OfferingCompany','quotoPrice','hightLows','UnitName','Note']];
        }

        var sheetName=["企业报价"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        $("#keyName").val(JSON.stringify(keyName));
        if(DownloadInfo==1){
            alert("您尚未开通下载Excel权限!");
            return;
        }else {
            $("#excelArray").val(JSON.stringify(array));
            $('#priceDetailExport').submit() ;

        }

    }

    //外盘报价
    function exportPriceWpbjDetail(){
        var priceProductCode=$("#priceDetailsProductCode").val();
        $("#fileName").val('外盘报价');
        $("#priceUrl").val('json');
        if(!wpbjDataSource){
            alert('暂无数据！');
            return ;
        }
        var array=[wpbjDataSource];
        var titleName,keyName;
        if(priceProductCode=='380-030' || priceProductCode=='380-060'){   //PE、PP
            titleName=[["报价日期","级别/牌号","产地","价格条款","报价","涨跌","备注"]];
            keyName=[['PubDate','level_name','ProducingArea','PriceTerm','quotoPrice','hightLows','Note']];
        }else{
            titleName=[["报价日期","级别/牌号","生产商","产地","价格条款","报价","涨跌","备注"]];
            keyName=[['PubDate','level_name','company_name','ProducingArea','PriceTerm','quotoPrice','hightLows','Note']];
        }

        var sheetName=["外盘报价"];
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        $("#keyName").val(JSON.stringify(keyName));
        if(DownloadInfo==1){
            alert("您尚未开通下载Excel权限!");
            return;
        }else {
            $("#excelArray").val(JSON.stringify(array));
            $('#priceDetailExport').submit() ;

        }
    }
</script>
<body>
<jsp:include page="../include/top.jsp"></jsp:include>
<jsp:include page="../include/menu.jsp"></jsp:include>
<jsp:include page="../include/navigation.jsp"></jsp:include>
<input type=hidden id="priceDetails_ssid" value="${priceDetails_ssid}">
<input type="hidden" id="toPriceDt" value="${cnCode}">
<input type="hidden" id="tabType" value="${tabType}">
<input type="hidden" id="timeType" value="${time}">
<input type="hidden" id="priceDetailsProductCode" value="${productCode}">
<!-- 默认第一个tab页面-->
<input type="hidden" id="defaultPriceTab" value="${detailBabList[0].Remark}">

<form action="exportExcelUtils" id="priceDetailExport" method="post">
    <input type="hidden" id="fileName" name="fileName" >
    <input type="hidden" id="priceUrl" name="url" value="json">
    <input type="hidden" name="pmmark" id="pmmark" value="${pmmark}">
    <input type="hidden" id="excelArray" name="excelArray" value="">
    <input type="hidden" id="titleName" name="titleName" value="">
    <input type="hidden" id="sheetName" name="sheetName" value="">
    <input type="hidden" id="keyName" name="keyName" value="">
    <input type="hidden" id="priceType" value="price">
    <input type="hidden" id="ptId" value="${ptId}">
    <input type="hidden" id="productPriceDetailId">
    <input type="hidden" id="productTabId1" value="${productTabId1}">
    <input type="hidden" id="productTabId2" value="${productTabId2}">

</form>

<form action="exportEchartsImg" id="exportEchartsImg" method="post">
    <input type="hidden" id="imageDataFileName" name="fileName">
    <input type="hidden" id="imageDataUrl" name="url">
</form>
<div class="fh_box"><a href="javascript:void('0')" onclick="window.history.back()">&nbsp;&nbsp;返回</a></div>
<div class="big_box">
    <div class="details_top_nav">
        <c:forEach var="tab" items="${detailBabList}" varStatus="stau" >
            <c:choose>
                <c:when test="${tab.Remark=='uuu_price'}">
                    <li class="details_nav choseDt" id="priceName">
                        <a href="javascript:void('0')" onclick="priceDtChangTab('${tab.Remark}','1','${tab.ProductTabId}','${tab.PriceDownload}','${tab.OtherDownload}');">价格</a>
                    </li>
                </c:when>
                <c:when test="${tab.Remark=='unchina_price'}"></c:when>
                <c:otherwise>
                    <li class="details_nav" id="${tab.Remark}">
                        <a href="javascript:void('0')" onclick="priceDtChangTab('${tab.Remark}','1','${tab.ProductTabId}','${tab.PriceDownload}','${tab.OtherDownload}');">${tab.NAME}</a>
                    </li>
                </c:otherwise>
            </c:choose>
        </c:forEach>

        <div class="clearfix"></div>
    </div>
    <div class="details_box">
        <div class="details_top">

            <div id="timeControll">
                <p>查询范围：</p>

                <div class="calendar">
                    <input type="text" class="start" id="startTime_price" style="color: #fff;padding-left: 5px;"/>
                    <span></span>
                    <input type="text" class="end" id="endTime_price" style="color: #fff;padding-left: 5px;"/>

                    <div class="calendar_ss"><a onclick="getNowTime_price();">搜索</a></div>
                </div>
            </div>

            <div  id="priceSelect">
                <p>查询范围：</p>
                <div class="calendar">
                    <input type="text" class="start" id="startTime_qiye" style="color: #fff;padding-left: 5px;"/>
                    <span></span>
                    <input type="text" class="end" id="endTime_qiye" style="color: #fff;padding-left: 5px;"/>
                    <span></span>
                    <input type="text" class="selectInput" id="companyName" placeholder="搜索企业">

                    <div class="calendar_ss"><a onclick="priceDtChangTab('qiye_price','1')">搜索</a></div>
                </div>
                <div class="exl"><a onclick="exportPriceCompanyDetail()">导出excel</a></div>
                <div class="clearfix"></div>
            </div>

            <div  id="wpbjSelect">
                <p>查询范围：</p>
                <div class="calendar">
                    <input type="text" class="start" id="startTime_wpbj" style="color: #fff;padding-left: 5px;"/>
                    <span></span>
                    <input type="text" class="end" id="endTime_wpbj" style="color: #fff;padding-left: 5px;"/>

                    <div class="calendar_ss"><a onclick="priceDtChangTab('wpbj','1')">搜索</a></div>
                </div>
                <div class="exl"><a onclick="exportPriceWpbjDetail()">导出excel</a></div>
                <div class="clearfix"></div>
            </div>

            <div id="priceDtTime">
                <div class="big_wd">
                    <span id="day_priceDt" onclick="timeChange('day');" style="cursor: pointer">日</span>
                    <span id="week_priceDt" onclick="timeChange('week');" style="cursor: pointer">周</span>
                    <span id="month_priceDt" onclick="timeChange('month');" style="cursor: pointer">月</span>
                </div>
                <p class="jg_wd">维度：</p>
            </div>

            <div class="clearfix"></div>
        </div>
        <div class="details_bottom" id="qiyeDt" style="min-height:500px;">

        </div>

        <div class="details_bottom" id="wpbjDt" style="min-height:500px;">

        </div>

        <div id="priceDt">
            <div class="details_right">
                <div class="kpi_big_box1" style="z-index: 10;">
                    <div class="kpi_xz011">
                        <input  type="radio" name="sex"checked  id="temale" onclick="changeToUSA('3')">
                        <label for="temale">标准</label>
                    </div>
                    <div class="kpi_xz011">
                        <input type="radio" name="sex" id="male"  onclick="changeToUSA('2')">
                        <label for="male">人民币转美金</label>
                    </div>
                    <div class="kpi_xz011">
                        <input  type="radio" name="sex" id="female" onclick="changeToUSA('1')">
                        <label for="female">美金转人民币</label>
                    </div>

                </div>


                <div class="chart_box" id="tb_price_detail" style="width: 100%;margin-top:20px;"></div>
            </div>
            <%--<div class="details_bottom">
                <div class="details_bottom_box">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr class="details_bottom_t">
                            <th width="20%"  style="cursor: pointer" onclick="priceDetailsSort(this,0)">
                                <span>日期</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                            </th>
                            <th width="30%"  style="cursor: pointer" onclick="priceDetailsSort(this,1)">
                                <span>类型</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                            </th>
                            <th width="10%"  style="cursor: pointer" onclick="priceDetailsSort(this,2)">
                                <span>均价</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                            </th>
                         &lt;%&ndash;   <th width="10%"  style="cursor: pointer" onclick="priceDetailsSort(this,3)">
                                <span>涨跌</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                            </th>&ndash;%&gt;
                            <th width="20%"  style="cursor: pointer" onclick="priceDetailsSort(this,3)">
                                <span>单位</span>
                                <span class="ascending_box"><a style="cursor: pointer" class="ascending32"></a><a style="cursor: pointer" class="descending"></a></span>
                            </th>
                        </tr>
                        <tr id="tab_priceDt">
                        </tr>
                    </table>
                </div>
                <div class="page_number_big_box">
                    <div class="page_number_box01">
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>--%>
        </div>


    </div>
    <jsp:include page="./../include/foot.jsp"></jsp:include>
</div>
<script>
    //价格
    $('#startTime_price').datepicker({
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: false,
        keyboardNavigation: false,
        forceParse: false

    }).on('changeDate', function (e) {
                var startTime = e.date;
                $('#endTime_price').datepicker('setStartDate', startTime);
            });
    $('#endTime_price').datepicker({
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: false,
        keyboardNavigation: false,
        forceParse: false

    }).on('changeDate', function (e) {
                var endTime = e.date;
                $('#startTime_price').datepicker('setEndDate', endTime);
            });

    //企业
    $('#startTime_qiye').datepicker({
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: false,
        keyboardNavigation: false,
        forceParse: false

    }).on('changeDate', function (e) {
                var startTime = e.date;
                $('#endTime_qiye').datepicker('setStartDate',startTime);
            });
    $('#endTime_qiye').datepicker({
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: false,
        keyboardNavigation: false,
        forceParse: false

    }).on('changeDate', function (e) {
                var endTime = e.date;
                $('#startTime_qiye').datepicker('setEndDate',endTime);
            });

    //外盘
    $('#startTime_wpbj').datepicker({
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: false,
        keyboardNavigation: false,
        forceParse: false

    }).on('changeDate', function (e) {
                var startTime = e.date;
                $('#endTime_wpbj').datepicker('setStartDate',startTime);
            });
    $('#endTime_wpbj').datepicker({
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: false,
        keyboardNavigation: false,
        forceParse: false

    }).on('changeDate', function (e) {
                var endTime = e.date;
                $('#startTime_wpbj').datepicker('setEndDate',endTime);
            });
</script>
</body>
</html>
