<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="js/ec_model.js"></script>
    <script type="text/javascript" src="js/sys/hydata.js"></script>
</head>

<link href="css/hydata.css" rel="stylesheet" type="text/css" />
<script>
    $(document).ready(function(){
        var ls = window.localStorage;
        ls.setItem("hydata",JSON.stringify("{}"));
        hydata2();
    });
</script>
<div class="sy_box">
    <div class="data_box01">
        <div class="data_top">
            <span class="details"><a onclick="javascript:void('0')" id="hydetails">历史数据</a></span>
            <h1>行业数据</h1>
        </div>
        <div class="data_nav_box" id="hydata">
            <div class="clearfix"></div>
        </div>
        <div class="day_box" id="day_box">
         <%--   <span class="" id="week"><a >周</a></span>--%>

            <span id="month"><a >月</a></span>
            <span id='year'><a>年</a></span>
        </div>
        <div class="qh_box" id="another" >
            <a id="anotherClick" onclick="clickAnother()">换一批</a>
        </div>
        <div class="tb" id="tb_hydata" style="width: 100%;height: 250px;"></div>
    </div>
</div>
