<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="js/sys/macroscopic.js"></script>
</head>

<script>
    $(document).ready(function(){
        var ls = window.localStorage;
        ls.setItem("macrodata",JSON.stringify("{}"));
    });
</script>
<div class="sy_box">
    <div class="data_box01" id="macrodata">
        <div class="data_top">
            <span class="details"><a href="macrodatadetail">历史数据</a></span>
            <h1>宏观数据</h1>
        </div>
        <div class="data_nav_box">
            <c:forEach var="tabl" items="${tablist}">
                <li class="china" id="${tabl.Remark}" dtype="ecpic" picdom="tb_lr" onclick="MAROCDATA.changeLi('${tabl.Remark}','ecpic');" wdstr="${tabl.CycleStr}">
                    <a>${tabl.NAME}</a>
                </li>
            </c:forEach>
            <div class="clearfix"></div>
        </div>
        <div class="day_box" id="gongxu_wdbx"></div>
        <div class="clearfix"></div>

        <div class="tb" id="tb_macrodata"></div>
        <div class="tb grd"  style="display:none">
            <div class="tab_h">
                <table class="jqdt" id="gongxu_tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
            </div>
        </div>
    </div>
</div>

