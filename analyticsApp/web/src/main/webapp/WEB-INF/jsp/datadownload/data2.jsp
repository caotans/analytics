<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>数据中心_下载</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-2.1.4.min.js"  type="text/javascript"></script>
    <script src="js/all_box.js"  type="text/javascript"></script>

</head>

<body>
<jsp:include page="../include/top.jsp"></jsp:include>
<jsp:include page="../include/menu.jsp"></jsp:include>
<jsp:include page="../include/navigation.jsp"></jsp:include>
<%--<div  class="fh_box"><a href="">&nbsp;&nbsp;返回</a></div>--%>
<div  class="fh_box"></div>
<div class="sj_box">
    <div class="date_download01">
        <div class="details_top">
            <p>查询范围：</p>
            <div class="calendar">
                <div class="start"></div>
                <span></span>
                <div class="end"></div>
                <div class="calendar_ss"><a href="#">搜索</a></div>
                <div class="pianh"><a href="#">下载</a></div>

            </div>
            <div class="pianh01"><a href="dataDownLoadSet">偏好设置</a></div>
            <div class="clearfix"></div>
            <div class="date_download_lb">
                <h1><i><input checked="checked" id="checkbox-01" class="regular-checkbox01" type="checkbox"><label for="checkbox-01"></label></i>全选</h1>
                <div class="date_download_lb_box">
                    <li class="hk">
                        <i><input checked="checked" id="checkbox-02" class="regular-checkbox01" type="checkbox"><label for="checkbox-02"></label></i>
                        <a href="">苯乙烯华东价格周度数据</a>
                        <span>2016/10/26</span>
                    </li>
                    <li>
                        <i><input checked="checked" id="checkbox-03" class="regular-checkbox01" type="checkbox"><label for="checkbox-03"></label></i>
                        <a href="">苯乙烯华南供需月度数据</a>
                        <span>2016/10/26</span>
                    </li>
                    <li>
                        <i><input checked="checked" id="checkbox-04" class="regular-checkbox01" type="checkbox"><label for="checkbox-04"></label></i>
                        <a href="">苯乙烯华南供需年度数据</a>
                        <span>2016/10/26</span>
                    </li>
                    <li>
                        <i><input checked="checked" id="checkbox-05" class="regular-checkbox01" type="checkbox"><label for="checkbox-05"></label></i>
                        <a href="">苯乙烯华南利润月度数据</a>
                        <span>2016/10/26</span>
                    </li>
                    <li>
                        <i><input checked="checked" id="checkbox-06" class="regular-checkbox01" type="checkbox"><label for="checkbox-06"></label></i>
                        <a href="">苯乙烯华南利润年度数据</a>
                        <span>2016/10/26</span>
                    </li>
                    <li>
                        <i><input checked="checked" id="checkbox-07" class="regular-checkbox01" type="checkbox"><label for="checkbox-07"></label></i>
                        <a href="">苯乙烯国际利润周度数据</a>
                        <span>2016/10/26</span>
                    </li>
                    <li>
                        <i><input checked="checked" id="checkbox-08" class="regular-checkbox01" type="checkbox"><label for="checkbox-08"></label></i>
                        <a href="">苯乙烯国际利润月度数据</a>
                        <span>2016/10/26</span>
                    </li>
                    <li>
                        <i><input checked="checked" id="checkbox-09" class="regular-checkbox01" type="checkbox"><label for="checkbox-09"></label></i>
                        <a href="">苯乙烯国际利润年度数据</a>
                        <span>2016/10/26</span>
                    </li>
                    <li>
                        <i><input checked="checked" id="checkbox-10" class="regular-checkbox01" type="checkbox"><label for="checkbox-10"></label></i>
                        <a href="">苯乙烯国际产能产量开工率周度数据</a>
                        <span>2016/10/26</span>
                    </li>
                    <li>
                        <i><input checked="checked" id="checkbox-11" class="regular-checkbox01" type="checkbox"><label for="checkbox-11"></label></i>
                        <a href="">苯乙烯华南商品房年度报告</a>
                        <span>2016/10/26</span>
                    </li>
                    <li>
                        <i><input checked="checked" id="checkbox-12" class="regular-checkbox01" type="checkbox"><label for="checkbox-12"></label></i>
                        <a href="">苯乙烯华北商品房年度报告</a>
                        <span>2016/10/26</span>
                    </li>
                </div>
                <div class="enterprise_news_page">
                    <span><a href="">上一页</a></span>
                    <span><a href="">1</a></span>
                    <span><a href="">2</a></span>
                    <span><a href="">3</a></span>
                    <span><a href="">4</a></span>
                    <span>...</span>
                    <span><a href="">10</a></span>
                    <span><a href="">下一页</a></span>
                </div>
            </div>


        </div>
    </div>
</div>
<jsp:include page="../include/foot.jsp"></jsp:include>
</body>
</html>
<script>
	$("div.nav_02 > li").removeClass("mian_nav");
	$("li#sjzx").addClass("mian_nav");
</script>