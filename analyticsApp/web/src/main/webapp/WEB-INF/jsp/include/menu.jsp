<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<%@ page import="core.web.InitDataListener" %>
<link rel="stylesheet" href="js/scroll/style.css">
<link rel="stylesheet" href="js/scroll/jquery.mCustomScrollbar.min.css">
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script src="js/all_box.js" type="text/javascript"></script>
    <%--<script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>--%>
    <script src="js/scroll/jquery.mCustomScrollbar.concat.min.js"></script>
</head>





<style>
    .productDisabled{color:#858585 !important;cursor: default;}
    .productEnabled{cursor: pointer}
</style>
<div style="float: left">
    <div class="cp_box content">
    </div>
    <div class="clearfix"></div>
</div>
<div class="qb_box" id="selectAll" style="cursor: pointer;" onclick="openTree();">全部产品</div>
<div class="clearfix"></div>
<%--<div class="nav_01">--%>

    <%--&lt;%&ndash;<li prdcode="020"><a onclick="checkModule('020')">成品油</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="050-010"><a onclick="checkModule('050-010')">LPG</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="310-040"><a onclick="checkModule('310-040')">丙烯</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="310-020"><a onclick="checkModule('310-020')">乙烯</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="370-060"><a onclick="checkModule('370-060')">甲醇</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="330-020"><a onclick="checkModule('330-020')">乙二醇</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="360-010"><a onclick="checkModule('360-010')">丙烯腈</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="360-110"><a onclick="checkModule('360-110')">PTA</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="320-060"><a onclick="checkModule('320-060')">甲苯</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="320-040"><a onclick="checkModule('320-040')">混合二甲苯</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="060-010"><a onclick="checkModule('060-010')">基础油</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="340-060"><a onclick="checkModule('340-060')">苯酚</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="320-020"><a onclick="checkModule('320-020')">纯苯</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="340-010"><a onclick="checkModule('340-010')">丙酮</a></li>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<li prdcode="340-020"><a onclick="checkModule('340-020')">BPA</a></li>&ndash;%&gt;--%>

    <%--<li class="all"  id="selectAll" onclick="openTree();"><a  id="selectAll2">全部产品</a>--%>
    <%--</li>--%>
    <%--<div class="clearfix"></div>--%>
<%--</div>--%>
<div class="all_box" id="productTree" >
    <dl class="all_dl_top">
        <dt>苯乙烯</dt>
        <dd>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id="1_1">ABS</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=2_2>EPS</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=3_2>PS</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=4_330-130>苯乙烯</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=5_2>二乙二醇</a>
        </dd>
    </dl>
    </dl>
    <dl>
        <dt>芳烃</dt>
        <dd>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=20_2>纯苯</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=21_2>混合二甲苯</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=22_2>甲苯</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=23_2>顺酐</a>
        </dd>
    </dl>
    <dl>
        <dt>酚酮</dt>
        <dd>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=40_350-666>BPA</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=41_2>MMA</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=42_2>苯酚</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=43_2>丙酮</a>
        </dd>
    </dl>
    <dl >
        <dt>化纤</dt>
        <dd>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=60_2>PTA</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=61_2>PX</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=62_2>丙烯腈</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=63_2>乙二醇</a>
        </dd>
    </dl>
    <dl>
        <dt>聚烯烃</dt>
        <dd>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('380-030')" id=80_380-030>PE</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('380-060')" id=81_380-060>PP</a>
        </dd>
    </dl>
    <dl>
        <dt>烯烃</dt>
        <dd>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=100_330-1121>丙烯</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=101_330-1122>丁二烯</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=102_330-1123>乙烯</a>
        </dd>
    </dl>
    <dl>
        <dt>橡胶</dt>
        <dd>
            <a href="javascript:void('0')" class="productEnabled"  name="allProduct" onclick="checkModule('330-130')" id=110_2>丁苯橡胶</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=111_2>顺丁橡胶</a>
        </dd>
    </dl>
    <dl>
        <dt>增塑剂</dt>
        <dd>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=120_330-1118>丁醇</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=121_330-1119>辛醇</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=122_330-1120>丙烯酸</a>
        </dd>
    </dl>
    <dl >
        <dt>甲醇</dt>
        <dd>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=130_2>甲醇</a>
        </dd>
    </dl>
    <dl>
        <dt>油品</dt>
        <dd>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=140_330-1111>成品油</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=141_330-1112>基础油</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=142_330-1113>沥青</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=143_330-1114>原油</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=144_330-1115>炼厂</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=145_330-1116>混合芳烃</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=146_330-1117>MTBE</a>
        </dd>
    </dl>
    <dl class="all_rigth">
        <dt>天然气</dt>
        <dd>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=160_2>LNG</a>
            <a href="javascript:void('0')" class="productEnabled" name="allProduct" onclick="checkModule('330-130')" id=161_2>天然气</a>
        </dd>
    </dl>
</div>
<script>
    //苯乙烯代替，需要改成根据点选的品目获取到品目的code以及name
    jsonObjectPoint=<%=InitDataListener.jsonObjectPoint%>;
    downLoadType=<%=InitDataListener.downLoadType%>;


</script>
