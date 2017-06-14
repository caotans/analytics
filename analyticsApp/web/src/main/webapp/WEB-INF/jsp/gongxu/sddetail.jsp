<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>

<html>
<head>
<title>供需详情</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <link href="css/datepicker3.css" rel="stylesheet" type="text/css" />
    <link href="css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/jquery.dataTables.js"></script>
    <script type="text/javascript" src="js/echarts/build/dist/echarts-all.js"></script>
    <script type="text/javascript" src="js/ec_model.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    
    <script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="js/jqPaginator.js"></script>
	<script type="text/javascript" src="js/sys/util.js"></script>
	<script type="text/javascript" src="js/sys/module/sd_mod.js"></script>
	<script type="text/javascript" src="js/sys/sddetail.js"></script>
<script>
    $(document).ready(function(){
        var value= ${jsonObjectTab};
        var type='${pld}';
        for(var i=0;i<value.length;i++){
            if(value[i].Disabled=='true'&&value[i].Remark=='gxyc'&&type=='gxyc_dt'){
                SDDT.DownloadElse=value[i].OtherDownload;
                 $("#sddetailPermission").show();
                 $("#sddetailPermissionLevel").hide();
                break;
            }else{
                  if(value[i].Remark+"_dt"==type){
                      SDDT.DownloadElse=value[i].OtherDownload;
                  }
            }
        }
        var pm=$(".product01").text();
        this.title=pm+'-供需详情';
    });

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//  })(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');

  ga('create', GA_ID, 'auto');
  ga('send', 'pageview');

</script>
</head>

<body>
<jsp:include page="../include/top.jsp"></jsp:include>
<jsp:include page="../include/menu.jsp"></jsp:include>
<jsp:include page="../include/navigation.jsp"></jsp:include>
<div class="dt_box">
<input type="hidden" value='${productcode}' id="prdcode"/>
<input type="hidden" value='${pld}' id="pld"/>
<input type="hidden" value='${pwd}' id="pwd"/>
<input type="hidden" value='${listData}' id="listData"/>
<input type="hidden" value='${areaData}' id="areaList"/>
    <form action="exportEchartsImg" id="exportEchartsImg" method="post">
        <input type="hidden" id="imageDataFileName" name="fileName">
        <input type="hidden" id="imageDataUrl" name="url">
    </form>
	<form action="exportExcelUtils" id="hyExport" method="post">
        <input type="hidden"  id="fileName" name="fileName" value="利润详情">
        <input type="hidden"  name="url" value="array">
        <input type="hidden" id="excelArray" name="excelArray" value="">
        <input type="hidden" id="titleName" name="titleName" value="">
        <input type="hidden" id="sheetName" name="sheetName" value="">
        <input type="hidden" id="keyName" name="keyName" value="">
    </form>


<div  class="fh_box"><a onclick="SDDT.backToIdx();">&nbsp;&nbsp;返回</a></div>
<div class="big_box">
	<div class="details_top_nav">
		<c:forEach var="dt_li" items="${jsonObjectTab}">
			<li class="details_nav" id="${dt_li.Remark}_dt" idxid="${dt_li.Remark}" wdstr="${dt_li.CycleStr}" onclick="SDDT.changeLi('${dt_li.Remark}_dt','${dt_li.Disabled}','${dt_li.OtherDownload}');"><a>${dt_li.NAME}</a></li>
		</c:forEach>
		<div class="clearfix"></div>
	</div>
    <div class="details_box" id="sddetailPermission" style="height: 400px;z-index: 999;background-color: #ffffff;display: none;">
        <div style="position: relative;left: 48%;top: 48%">暂无权限</div>
    </div>
    <div class="details_box" id="sddetailPermissionLevel">
	<div class="details_box">
	<div class="details_top">
                <p id="cxfw">查询范围：</p>
                <div class="calendar">
                    <input type="text" class="start" id="searchstart"  style="color: #fff;padding-left: 5px;"/>
                    <span id="hx"></span>
                    <input type="text" class="end" id="searchend"  style="color: #fff;padding-left: 5px;"/>
                    <div class="calendar_ss"><a onclick="SDDT.search();">搜索</a></div>
                </div>
                
                <div class="big_wd">
                </div>
                <p class="jg_wd">维度：</p>
                <div class="clearfix"></div>
            </div>
    
   <div class="details_right">
        <div class="chart_box" id="dt_picdom">图表位置</div>
   </div> 
   <div class="details_bottom" >
            <div class="details_bottom_box">
            <table id="sddt_tab" width="100%" border="0" cellpadding="0" cellspacing="0">
            </table>
            </div>
            <div class="page_number_big_box">
                <div class="page_number_box01" id="sddt_pg">
                    
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
</div>
</div>
</div>
    </div>
<jsp:include page="../include/foot.jsp"></jsp:include>

</body>
</html>

<script>
    $('#searchstart').datepicker({
        todayBtn : "linked",
        autoclose : true,
        todayHighlight : false,
        keyboardNavigation:false,
        forceParse:false
    }).on('changeDate',function(e){
                var startTime = e.date;
                $('#searchend').datepicker('setStartDate',startTime);
            });
    $('#searchend').datepicker({
        todayBtn : "linked",
        autoclose : true,
        todayHighlight : false,
        keyboardNavigation:false,
        forceParse:false
    }).on('changeDate',function(e){
                var endTime = e.date;
                $('#searchstart').datepicker('setEndDate',endTime);
            });
</script>