<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>数据中心</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-2.1.4.min.js"  type="text/javascript"></script>
    <style type="text/css">
        .download_sm_box02 li  a.download_a{background-color:#435770; padding:0 8px; border-radius:5px;}
    </style>
    <script type="text/javascript">
        $(document).ready(  function(){
                    $(".download_sm_box02 a").click(function () {
                        $(this).toggleClass("download_a");
                    });
                    //勾选已经配置过的
                    var allCodeChecked=$("#allCodeChecked").val().split(",");
                    if(allCodeChecked){
                        $(".download_sm_box02").find("a").find(".items").each(function () {
                            console.log(allCodeChecked.indexOf($(this).val()));
                            if(allCodeChecked.indexOf($(this).val())!=-1){
                                $(this).parent().addClass("download_a");
                            }
                        });
                    }
                }

        );
        function nextSubmitTwo() {
            //遍历获得所有已选择的数据
            var otherCode="";
            var othername="";
            $(".download_sm_box02").find("a.download_a").find(".items").each(function () {
                if(otherCode==""){
                    otherCode=$(this).val() ;
                }else{
                    otherCode=otherCode+"," +$(this).val() ;
                }
                if(othername==""){
                    othername=$(this).parent().text();
                }else{
                    othername=othername+"," +$(this).parent().text();
                    $("#othername").val(othername);
                }
                $("#otherCode").val(otherCode);
                $("#dataform").attr("action", "saveCode");
                $("#dataform").submit();

            });
        }
    </script>
</head>

<body>
<jsp:include page="../include/top.jsp"></jsp:include>
<jsp:include page="../include/menu.jsp"></jsp:include>
<jsp:include page="../include/navigation.jsp"></jsp:include>
<div class="date_download">
    <!--被选的数据-->
    <input type="hidden" id="allCodeChecked" value="${allCodeChecked}">
    <form method="post" name="dataform" id="dataform">
        <input type="hidden" id="allCode" name="allCode" value="${allCode}">
        <input type="hidden" id="otherCode" name="otherCode">
        <input type="hidden" id="pmname" name="pmname" value="${pmname}">
        <input type="hidden" id="othername" name="othername">
    </form>
    <p>数据类型选择：</p>
    <c:forEach var="model" items="${allProduct}">
    <div class="download_box">
        <div class="download_sm_box02">
            <h2>${model.modelName}</h2>
            <c:forEach var="list" varStatus="i" items="${model.flData}">
                <li>
                    <span>${list.flName}：</span>
                    <p>
                        <c:forEach var="child" items="${list.childData}">
                            <a href="javascript:void('0')"><input type="hidden" class="items" value="${model.modelCode};${list.flCode};${child.productCode}">${child.productName}</a>
                        </c:forEach>
                    </p>
                </li>
            </c:forEach>

        </div>
    </div>
    </c:forEach>


    <%--<div class="download_box">--%>
    <%--<div class="download_sm_box02">--%>
    <%--<h2>价格</h2>--%>
    <%--<li>--%>
    <%--<span>价&nbsp;&nbsp;&nbsp;格：</span>--%>
    <%--<p><a href="#"><input type="hidden" value="201" class="items">国内</a>--%>
    <%--<a href="#"><input type="hidden" value="202" class="items">国际</a>--%>
    <%--</p>--%>
    <%--</li>--%>
    <%--<li>--%>
    <%--<span>利&nbsp;&nbsp;&nbsp;润：</span>--%>
    <%--<p><a href="#"><input type="hidden" value="203" class="items">利润</a>--%>
    <%--</p>--%>
    <%--</li>--%>
    <%--<li>--%>
    <%--<span>套&nbsp;&nbsp;&nbsp;利：</span>--%>
    <%--<p><a href="#"><input type="hidden" value="204" class="items">套利</a>--%>
    <%--</p>--%>
    <%--</li>--%>
    <%--<li>--%>
    <%--<span>时间维度：</span>--%>
    <%--<p><a href="#"><input type="hidden" value="205" class="items">日</a>--%>
    <%--<a href="#"><input type="hidden" value="206" class="items">周</a>--%>
    <%--<a href="#"><input type="hidden" value="207" class="items">月</a>--%>
    <%--<a href="#"><input type="hidden" value="208" class="items">年</a>--%>
    <%--</p>--%>
    <%--</li>--%>
    <%--<li style="border-bottom:none;">--%>
    <%--<span>区域维度：</span>--%>
    <%--<p><a href="#"><input type="hidden" value="209" class="items">华东</a>--%>
    <%--<a href="#"><input type="hidden" value="210" class="items">华南</a>--%>
    <%--<a href="#"><input type="hidden" value="211" class="items">华北</a>--%>
    <%--<a href="#"><input type="hidden" value="212" class="items">华中</a>--%>
    <%--<a href="#"><input type="hidden" value="213" class="items">西北</a>--%>
    <%--<a href="#"><input type="hidden" value="214" class="items">西南</a>--%>
    <%--<a href="#"><input type="hidden" value="215" class="items">东北</a>--%>
    <%--<a href="#"><input type="hidden" value="216" class="items">全国</a>--%>
    <%--</p>--%>
    <%--</li>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--<div class="download_box">--%>
        <%--<div class="download_sm_box02">--%>
            <%--<h2>供需</h2>--%>
            <%--<li>--%>
                <%--<span>供&nbsp;&nbsp;&nbsp;需：</span>--%>
                <%--<p> <a href="#"><input type="hidden" value="217" class="items" id="020">产能产量开工率</a>--%>
                    <%--<a href="#" ><input type="hidden" value="218" class="items">表观需求</a>--%>
                    <%--<a href="#"><input type="hidden" value="219" class="items">下游需求</a>--%>
                    <%--<a href="#"><input type="hidden" value="220" class="items">进出口</a>--%>
                    <%--<a href="#"><input type="hidden" value="221" class="items">库存</a>--%>
                    <%--<a href="#"><input type="hidden" value="222" class="items">装置</a>--%>
                    <%--<a href="#"><input type="hidden" value="223" class="items">船期</a>--%>
                <%--</p>--%>
            <%--</li>--%>
            <%--<li>--%>
                <%--<span>时间维度：</span>--%>
                <%--<p>--%>
                    <%--<a href="#"><input type="hidden" value="207" class="items">月</a>--%>
                    <%--<a href="#"><input type="hidden" value="208" class="items">年</a>--%>
                <%--</p>--%>
            <%--</li>--%>
            <%--<li style="border-bottom:none;">--%>
                <%--<span>区域维度：</span>--%>
                <%--<p><a href="#"><input type="hidden" value="209" class="items">华东</a>--%>
                    <%--<a href="#" ><input type="hidden" value="210" class="items">华南</a>--%>
                    <%--<a href="#"><input type="hidden" value="211" class="items">华北</a>--%>
                    <%--<a href="#"><input type="hidden" value="212" class="items">华中</a>--%>
                    <%--<a href="#"><input type="hidden" value="213" class="items">西北</a>--%>
                    <%--<a href="#"><input type="hidden" value="214" class="items">西南</a>--%>
                    <%--<a href="#"><input type="hidden" value="215" class="items">东北</a>--%>
                    <%--<a href="#"><input type="hidden" value="216" class="items">全国</a>--%>
                <%--</p>--%>
            <%--</li>--%>
        <%--</div>--%>
    <%--</div>--%>

    <%--<div class="download_box">--%>
        <%--<div class="download_sm_box02">--%>
            <%--<h2>企业</h2>--%>
            <%--<li>--%>
                <%--<span>企&nbsp;&nbsp;&nbsp;业：</span>--%>
                <%--<p>   <a href="#"><input type="hidden" value="277" class="items">产能产量开工率</a>--%>
                    <%--<a href="#"><input type="hidden" value="278" class="items">装置</a>--%>
                <%--</p>--%>
            <%--</li>--%>
            <%--<li style="border-bottom:none;">--%>
                <%--<span>区域维度：</span>--%>
                <%--<p><a href="#"><input type="hidden" value="209" class="items">华东</a>--%>
                    <%--<a href="#" ><input type="hidden" value="210" class="items">华南</a>--%>
                    <%--<a href="#"><input type="hidden" value="211" class="items">华北</a>--%>
                    <%--<a href="#"><input type="hidden" value="212" class="items">华中</a>--%>
                    <%--<a href="#"><input type="hidden" value="213" class="items">西北</a>--%>
                    <%--<a href="#"><input type="hidden" value="214" class="items">西南</a>--%>
                    <%--<a href="#"><input type="hidden" value="215" class="items">东北</a>--%>
                    <%--<a href="#"><input type="hidden" value="216" class="items">全国</a>--%>
                <%--</p>--%>
            <%--</li>--%>

        <%--</div>--%>
    <%--</div>--%>

    <%--<div class="download_box">--%>
        <%--<div class="download_sm_box02">--%>
            <%--<h2>金融期货</h2>--%>
            <%--<li>--%>
                <%--<span>金融期货：</span>--%>
                <%--<p> <a href="#"><input type="hidden" value="226" class="items">PE</a>--%>
                    <%--<a href="#"><input type="hidden" value="227" class="items">PP</a>--%>
                    <%--<a href="#"><input type="hidden" value="228" class="items">PTA</a>--%>
                    <%--<a href="#"><input type="hidden" value="229" class="items">PVC</a>--%>
                    <%--<a href="#"><input type="hidden" value="230" class="items">动力煤</a>--%>
                    <%--<a href="#"><input type="hidden" value="231" class="items">甲醇</a>--%>
                    <%--<a href="#"><input type="hidden" value="232" class="items">焦煤</a>--%>
                    <%--<a href="#"><input type="hidden" value="233" class="items">焦炭</a>--%>
                    <%--<a href="#"><input type="hidden" value="234" class="items">沥青</a>--%>
                    <%--<a href="#"><input type="hidden" value="235" class="items">燃料油</a>--%>
                    <%--<a href="#"><input type="hidden" value="236" class="items">天然橡胶</a>--%>
                <%--</p>--%>
            <%--</li>--%>
            <%--<li style="border-bottom:none;">--%>
                <%--<span>时间维度：</span>--%>
                <%--<p><a href="#"><input type="hidden" value="205" class="items">日</a>--%>
                    <%--<a href="#"><input type="hidden" value="206" class="items">周</a>--%>
                    <%--<a href="#"><input type="hidden" value="207" class="items">月</a>--%>
                    <%--<a href="#"><input type="hidden" value="208" class="items">年</a>--%>
                <%--</p>--%>
            <%--</li>--%>

        <%--</div>--%>
    <%--</div>--%>
    <%--<div class="download_box">--%>
        <%--<div class="download_sm_box02">--%>
            <%--<h2>行业数据 & 其他数据</h2>--%>
            <%--<li>--%>
                <%--<span>宏观数据：</span>--%>
                <%--<p><a href="#" ><input type="hidden" value="237" class="items">汇率</a>--%>
                    <%--<a href="#" ><input type="hidden" value="238" class="items">油价</a>--%>
                    <%--<a href="#" ><input type="hidden" value="239" class="items">GDP</a>--%>
                    <%--<a href="#" ><input type="hidden" value="240" class="items">PMI</a>--%>
                    <%--<a href="#" ><input type="hidden" value="241" class="items">PPI</a>--%>
                <%--</p>--%>
            <%--</li>--%>
            <%--<li>--%>
                <%--<span>安迅思指数：</span>--%>
                <%--<p><a href="#"><input type="hidden" value="242" class="items">安迅思指数</a>--%>
                <%--</p>--%>
            <%--</li>--%>
            <%--<li>--%>
                <%--<span>房地产：</span>--%>
                <%--<p> <a href="#"><input type="hidden" value="243" class="items">商品房</a>--%>
                    <%--<a href="#"><input type="hidden" value="244" class="items">投资及景气指数</a>--%>
                    <%--<a href="#"><input type="hidden" value="245" class="items">土地开发</a>--%>
                <%--</p>--%>
            <%--</li>--%>
            <%--<li>--%>
                <%--<span>能源和化工：</span>--%>
                <%--<p>   <a href="#"><input type="hidden" value="246" class="items">能源主要指标</a>--%>
                    <%--<a href="#"><input type="hidden" value="247" class="items">石化产品进出口</a>--%>
                    <%--<a href="#"><input type="hidden" value="248" class="items">原油平衡表</a>--%>
                <%--</p>--%>
            <%--</li>--%>
            <%--<li>--%>
                <%--<span>运输和存储业：</span>--%>
                <%--<p><a href="#"><input type="hidden" value="249" class="items">主要指标</a>--%>
                <%--</p>--%>
            <%--</li>--%>
            <%--<li>--%>
                <%--<span>制造行业：</span>--%>
                <%--<p><a href="#"><input type="hidden" value="250" class="items">工业主要指标</a>--%>
                    <%--<a href="#"><input type="hidden" value="251" class="items">纺织品生产</a>--%>
                    <%--<a href="#"><input type="hidden" value="252" class="items">纺织品主要指标</a>--%>
                    <%--<a href="#"><input type="hidden" value="253" class="items">机械产品进出口</a>--%>
                    <%--<a href="#"><input type="hidden" value="254" class="items">机械产品进出口</a>--%>
                    <%--<a href="#"><input type="hidden" value="255" class="items">机械产品生产</a>--%>
                    <%--<a href="#"><input type="hidden" value="256" class="items">家电主要产品产量</a>--%>
                <%--</p>--%>
            <%--</li>--%>
            <%--<li style="border-bottom:none;">--%>
                <%--<span>时间维度：</span>--%>
                <%--<p>--%>
                    <%--<a href="#"><input type="hidden" value="207" class="items">月</a>--%>
                    <%--<a href="#"><input type="hidden" value="208" class="items">年</a>--%>
                <%--</p>--%>
            <%--</li>--%>

        <%--</div>--%>

    </div>



    <div  class="achieve"><span  class="sb"><a href="javascript:void('0')" onclick="window.history.back()">上一步</a></span><span ><a href="javascript:void('0')" onclick="nextSubmitTwo()">完成</a></span><div class="clearfix"></div></div>

<jsp:include page="../include/foot.jsp"></jsp:include>
</body>
</html>
<script>
	$("div.nav_02 > li").removeClass("mian_nav");
	$("li#sjzx").addClass("mian_nav");
</script>