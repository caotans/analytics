<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>

<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="${ctx}/js/index.js"></script>
    <script type="text/javascript" src="${ctx}/js/sys/module/sd_mod.js"></script>
    <script type="text/javascript" src="${ctx}/js/sys/gongxu.js"></script>
    <script type="text/javascript" src="${ctx}/js/sys/util.js"></script>
</head>



<input type="hidden" id="sdDownList" value='${listData}'>
<input type="hidden" id="areaList" value='${areaData}'>
<input type="hidden" id="moduleId" value='${moduleId}'>
<script>
    $(document).ready(function () {
        var value= ${jsonObjectTab};
        var flag=true;
        for(var i=0;i<value.length;i++){
            if(value[i].Disabled=='false'){
                flag=false;
                break;
            }
        }
        if(flag){
            $("#gongxuHistoryHide").show();
        }else{
            $("#gongxuHistoryShow").show();
        }
    });
</script>
<div class="sy_box">
<div class="data_box01" id="gongxu">
	<div class="data_top"> 
        <span class="details" style="display: none;" id="gongxuHistoryShow"><a onclick="GX.showDetail('sddetail');">历史数据</a></span>
        <span class="details_gray" style="display: none;" id="gongxuHistoryHide"><a>历史数据</a></span>
        <h1>供需</h1>
    </div>
    <div class="data_nav_box">
    	<c:forEach var="tabl" items="${jsonObjectTab}">
    		<li class="china" id="${tabl.Remark}" picdom="tb_lr" onclick="GX.changeLi('${tabl.Remark}','${tabl.Disabled}');" wdstr="${tabl.CycleStr}">
        		<a>${tabl.NAME}</a>
        	</li>
    	</c:forEach>
        <div class="clearfix"></div>
    </div>
    <div id="supplyPermission" style="float:left; width: 100%;height: 100%;z-index: 9;display: none;">
        <div style="position: relative;left: 45%;top: 30%">暂无权限</div>
    </div>
    <div id="supplyPermissionLevel">
    <div class="qh_box">
    	<a onclick="GX.changePT();">切换为图</a>
    </div>
    <div class="day_box" id="gongxu_wdbx">
    </div>
    <div class="clearfix"></div>

    <div class="tb" id="tb_gongxu"></div>
    <div class="tb grd"  style="display:none">
    	<div class="tab_h">

    		<table class="jqdt" id="gongxu_tab" width="100%" border="0" cellpadding="0" cellspacing="0">
    		</table>
    	</div>
    </div>
        </div>
</div>
</div>