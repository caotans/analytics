<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>数据中心</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-2.1.4.min.js"  type="text/javascript"></script>
    <script src="js/all_box.js"  type="text/javascript"></script>
    <style type="text/css">
        .download_sm_box02 li  a.download_a{background-color:#435770; padding:0 8px; border-radius:5px;}
    </style>
    <script type="text/javascript">
        $(function(){
//            alert("233");
//            $(document).on("click",'.download_sm_box02 a',function(){
//                $(this).toggleClass("download_a");
//            });

            $(".download_sm_box02 a").click(function(){
                $(this).toggleClass("download_a");
            });
            var itemsidArray=new Array();
            var itemsdataArray=new Array();
            var lxArray=new Array();
            $("#confirmss").click(function(){
//                  alert("confirmss");
                $(".download_box").find("a.download_a").find(".items").each(function(){
                    itemsidArray.push($(this).val());
//                    alert(itemsidArray);
                });

                $(".download_box").find("a.download_a").each(function(){
                    itemsdataArray.push($(this).text());
//                    alert(itemsdataArray);
                });

                $(".download_box").find("a.download_a").each(function () {
                    lxArray.push($(this).parents().find("h2").text());
//                    alert(lxArray);
                });

                $("#itemsid").val(itemsidArray);
                $("#itemsdata").val(itemsdataArray);
                $("#lx").val(lxArray);

//                alert(itemsidArray);
//                alert(itemsdataArray);
                $("#dataform").attr("action","/dc");
                dataform.submit();
            });
            //
            //
            <%--var datasize=${datasize};--%>
            <%--var mydataid=new Array();--%>
            <%--var mydata=${dataArray};--%>
            <%--for(var i=0;i<datasize;i++){--%>
                <%--mydataid.push(mydata[i]);--%>
            <%--}--%>
            <%--alert(mydataid);--%>
            <%--var itemsidArr=new Array();--%>
<%--//            var itemsdataArr=new Array();--%>
            <%--$(".download_box a").click(function(){--%>
                <%--$(this).toggleClass("download_a");--%>
            <%--});--%>

            <%--$(".download_box").find("a").find(".items").each(function(){--%>
                <%--itemsidArr.push($(this).val());--%>
                <%--//alert(itemsidArray);--%>
            <%--});--%>
            <%--for(var i=0;i<itemsidArr.length;i++){--%>
                <%--if($.inArray(itemsidArr[i],mydataid)>-1){--%>
                    <%--$("input[value="+itemsidArr[i]+"]").parent("a").addClass("download_a");--%>
                <%--}--%>
            <%--}--%>
        });
    </script>
</head>

<body>
<div class="top_bj">
    <img src="../../../images/logo.png">
    <li style=" border-left:1px solid #18222c;"><a href="https://dashboard.icis-china.com/">Dashboard</a></li>
    <li  class="top_an"><a href="#">Analytics</a></li>
    <li><a href="#">Report</a></li>
    <span class="help"></span>
    <span class="user"></span>
    <p class="ren">looeewang@icis-china.com</p>
    <p class="lx">联系我们：（+86）400-720-0222</p>
</div>
<div class="cp_box">
    <li><a>乙二醇</a></li>
    <li class="product01"><a>苯乙烯</a></li>
    <li><a>ABS</a></li>
    <li><a>UPR</a></li>
    <li><a>EPS</a></li>
    <li><a>天然气</a></li>
    <li><a>液化气</a></li>
    <li class="all"  id="selectAll" onclick="openTree();"><a  id="selectAll2">全部产品</a>

    </li>
</div>
<div class="all_box" id="productTree" >
    <dl class="all_dl_top">
        <dt>苯乙烯</dt>
        <dd>
            <a href="#">ABS</a>
            <a href="#">EPS</a>
            <a href="#">PS</a>
            <a href="#">苯乙烯</a>
            <a href="#">二乙二醇</a>
            <a href="#">工程塑料</a>
        </dd>
    </dl>
    <dl class="all_dl_top">
        <dt>醋酸</dt>
        <dd>
            <a href="#">EVA</a>
            <a href="#">冰醋酸</a>
            <a href="#">醋酸乙烯</a>
            <a href="#">乙醇 & 醋酸乙酯</a>
        </dd>
    </dl>
    <dl class="all_dl_top">
        <dt>芳烃</dt>
        <dd>
            <a href="#">纯苯</a>
            <a href="#">混合二甲苯</a>
            <a href="#">甲苯</a>
            <a href="#">顺酐</a>
        </dd>
    </dl>
    <dl class="all_dl_top">
        <dt>酚酮</dt>
        <dd>
            <a href="#">BPA & ECH & EP</a>
            <a href="#">MMA</a>
            <a href="#">苯酚</a>
            <a href="#">丙酮</a>
        </dd>
    </dl>
    <dl class="all_dl_top">
        <dt>化纤</dt>
        <dd>
            <a href="#">PTA</a>
            <a href="#">PX</a>
            <a href="#">苯酚</a>
            <a href="#">丙酮</a>
        </dd>
    </dl>
    <dl class="all_dl_top">
        <dt>聚烯烃</dt>
        <dd>
            <a href="#">管材料</a>
            <a href="#">聚丙烯</a>
            <a href="#">聚乙烯</a>
        </dd>
    </dl>
    <dl class="all_dl_top">
        <dt>烯烃</dt>
        <dd>
            <a href="#">丙烯</a>
            <a href="#">丁二烯</a>
            <a href="#">乙烯</a>
        </dd>
    </dl>
    <dl class="all_dl_top">
        <dt>橡胶</dt>
        <dd>
            <a href="#" style="color:#858585;">丁苯橡胶</a>
            <a href="#" style="color:#858585;">丁腈橡胶</a>
            <a href="#" style="color:#858585;">顺丁橡胶</a>
            <a href="#" style="color:#858585;">特种橡胶</a>
            <a href="#">天然橡胶</a>
        </dd>
    </dl>
    <dl class="all_dl_top">
        <dt>增塑剂</dt>
        <dd>
            <a href="#">DOP & DINP & DOTP</a>
            <a href="#">丙烯酸及酯</a>
            <a href="#">邻二甲苯</a>
        </dd>
    </dl>
    <dl class="all_dl_top" style=" margin-right:0px; width:133px;">
        <dt>甲醇</dt>
        <dd>
            <a href="#">甲醇</a>
        </dd>
    </dl>
    <dl>
        <dt>油品</dt>
        <dd>
            <a href="#">成品油</a>
            <a href="#">基础油</a>
            <a href="#">沥青</a>
            <a href="#">燃料油</a>
            <a href="#">石油焦</a>
            <a href="#">原油/炼厂</a>
        </dd>
    </dl>
    <dl>
        <dt>液化气</dt>
        <dd>
            <a href="#">液化气</a>
        </dd>
    </dl>
    <dl>
        <dt>天然气</dt>
        <dd>
            <a href="#">LNG</a>
            <a href="#">天然气</a>
        </dd>
    </dl>
    <div class="all_dl_bottom"></div>
</div>
<div class="nav_02_box">
    <div class="nav_02">
        <li class="mian_nav"><a href="#">产品分析</a></li>
        <li><a href="#">企业分析</a></li>
        <li><a href="#">产业链分析</a></li>
        <li><a href="#">数据中心</a></li>
    </div>
</div>
<div class="date_download">
    <form method="post" name="dataform" id="dataform">
        <input type="hidden" id="itemsid" name="itemsid">
        <input type="hidden" id="itemsdata" name="itemsdata">
        <input type="hidden" name="pageflag" value="data2">
        <input type="hidden" name="lx" id="lx">
    </form>
    <p>数据类型选择：</p>
    <div class="download_box">
        <div class="download_sm_box02">
            <h2>价格</h2>
            <li>
                <span>价&nbsp;&nbsp;&nbsp;格：</span>
                <p><a href="#"><input type="hidden" value="201" class="items">国内</a>
                    <a href="#"><input type="hidden" value="202" class="items">国际</a>
                </p>
            </li>
            <li>
                <span>利&nbsp;&nbsp;&nbsp;润：</span>
                <p><a href="#"><input type="hidden" value="203" class="items">利润</a>
                </p>
            </li>
            <li>
                <span>套&nbsp;&nbsp;&nbsp;利：</span>
                <p><a href="#"><input type="hidden" value="204" class="items">套利</a>
                </p>
            </li>
            <li>
                <span>时间维度：</span>
                <p><a href="#"><input type="hidden" value="205" class="items">日</a>
                    <a href="#"><input type="hidden" value="206" class="items">周</a>
                    <a href="#"><input type="hidden" value="207" class="items">月</a>
                    <a href="#"><input type="hidden" value="208" class="items">年</a>
                </p>
            </li>
            <li style="border-bottom:none;">
                <span>区域维度：</span>
                <p><a href="#"><input type="hidden" value="209" class="items">华东</a>
                    <a href="#"><input type="hidden" value="210" class="items">华南</a>
                    <a href="#"><input type="hidden" value="211" class="items">华北</a>
                    <a href="#"><input type="hidden" value="212" class="items">华中</a>
                    <a href="#"><input type="hidden" value="213" class="items">西北</a>
                    <a href="#"><input type="hidden" value="214" class="items">西南</a>
                    <a href="#"><input type="hidden" value="215" class="items">东北</a>
                    <a href="#"><input type="hidden" value="216" class="items">全国</a>
                </p>
            </li>
        </div>
    </div>
    <div class="download_box">
        <div class="download_sm_box02">
            <h2>供需</h2>
            <li>
                <span>供&nbsp;&nbsp;&nbsp;需：</span>
                <p> <a href="#"><input type="hidden" value="217" class="items">产能产量开工率</a>
                    <a href="#" ><input type="hidden" value="218" class="items">表观需求</a>
                    <a href="#"><input type="hidden" value="219" class="items">下游需求</a>
                    <a href="#"><input type="hidden" value="220" class="items">进出口</a>
                    <a href="#"><input type="hidden" value="221" class="items">库存</a>
                    <a href="#"><input type="hidden" value="222" class="items">装置</a>
                    <a href="#"><input type="hidden" value="223" class="items">船期</a>
                </p>
            </li>
            <li>
                <span>时间维度：</span>
                <p>
                    <a href="#"><input type="hidden" value="207" class="items">月</a>
                    <a href="#"><input type="hidden" value="208" class="items">年</a>
                </p>
            </li>
            <li style="border-bottom:none;">
                <span>区域维度：</span>
                <p><a href="#"><input type="hidden" value="209" class="items">华东</a>
                    <a href="#" ><input type="hidden" value="210" class="items">华南</a>
                    <a href="#"><input type="hidden" value="211" class="items">华北</a>
                    <a href="#"><input type="hidden" value="212" class="items">华中</a>
                    <a href="#"><input type="hidden" value="213" class="items">西北</a>
                    <a href="#"><input type="hidden" value="214" class="items">西南</a>
                    <a href="#"><input type="hidden" value="215" class="items">东北</a>
                    <a href="#"><input type="hidden" value="216" class="items">全国</a>
                </p>
            </li>
        </div>
    </div>
    <div class="download_box">
        <div class="download_sm_box02">
            <h2>金融期货</h2>
            <li>
                <span>金融期货：</span>
                <p> <a href="#"><input type="hidden" value="226" class="items">PE</a>
                    <a href="#"><input type="hidden" value="227" class="items">PP</a>
                    <a href="#"><input type="hidden" value="228" class="items">PTA</a>
                    <a href="#"><input type="hidden" value="229" class="items">PVC</a>
                    <a href="#"><input type="hidden" value="230" class="items">动力煤</a>
                    <a href="#"><input type="hidden" value="231" class="items">甲醇</a>
                    <a href="#"><input type="hidden" value="232" class="items">焦煤</a>
                    <a href="#"><input type="hidden" value="233" class="items">焦炭</a>
                    <a href="#"><input type="hidden" value="234" class="items">沥青</a>
                    <a href="#"><input type="hidden" value="235" class="items">燃料油</a>
                    <a href="#"><input type="hidden" value="236" class="items">天然橡胶</a>
                </p>
            </li>
            <li style="border-bottom:none;">
                <span>时间维度：</span>
                <p><a href="#"><input type="hidden" value="205" class="items">日</a>
                    <a href="#"><input type="hidden" value="206" class="items">周</a>
                    <a href="#"><input type="hidden" value="207" class="items">月</a>
                    <a href="#"><input type="hidden" value="208" class="items">年</a>
                </p>
            </li>

        </div>
    </div>
    <div class="download_box">
        <div class="download_sm_box02">
            <h2>行业数据 & 其他数据</h2>
            <li>
                <span>宏观数据：</span>
                <p><a href="#" ><input type="hidden" value="237" class="items">汇率</a>
                    <a href="#" ><input type="hidden" value="238" class="items">油价</a>
                    <a href="#" ><input type="hidden" value="239" class="items">GDP</a>
                    <a href="#" ><input type="hidden" value="240" class="items">PMI</a>
                    <a href="#" ><input type="hidden" value="241" class="items">PPI</a>
                </p>
            </li>
            <li>
                <span>安迅思指数：</span>
                <p><a href="#"><input type="hidden" value="242" class="items">安迅思指数</a>
                </p>
            </li>
            <li>
                <span>房地产：</span>
                <p> <a href="#"><input type="hidden" value="243" class="items">商品房</a>
                    <a href="#"><input type="hidden" value="244" class="items">投资及景气指数</a>
                    <a href="#"><input type="hidden" value="245" class="items">土地开发</a>
                </p>
            </li>
            <li>
                <span>能源和化工：</span>
                <p>   <a href="#"><input type="hidden" value="246" class="items">能源主要指标</a>
                    <a href="#"><input type="hidden" value="247" class="items">石化产品进出口</a>
                    <a href="#"><input type="hidden" value="248" class="items">原油平衡表</a>
                </p>
            </li>
            <li>
                <span>运输和存储业：</span>
                <p><a href="#"><input type="hidden" value="249" class="items">主要指标</a>
                </p>
            </li>
            <li>
                <span>制造行业：</span>
                <p><a href="#"><input type="hidden" value="250" class="items">工业主要指标</a>
                    <a href="#"><input type="hidden" value="251" class="items">纺织品生产</a>
                    <a href="#"><input type="hidden" value="252" class="items">纺织品主要指标</a>
                    <a href="#"><input type="hidden" value="253" class="items">机械产品进出口</a>
                    <a href="#"><input type="hidden" value="254" class="items">机械产品进出口</a>
                    <a href="#"><input type="hidden" value="255" class="items">机械产品生产</a>
                    <a href="#"><input type="hidden" value="256" class="items">家电主要产品产量</a>
                </p>
            </li>
            <li style="border-bottom:none;">
                <span>时间维度：</span>
                <p>
                    <a href="#"><input type="hidden" value="207" class="items">月</a>
                    <a href="#"><input type="hidden" value="208" class="items">年</a>
                </p>
            </li>

        </div>

    </div>
    <div  class="achieve"><span  class="sb"><a href="../../../data.jsp">上一步</a></span><span ><a id="confirmss">完成</a></span><div class="clearfix"></div></div>
</div>
</div>
<div  class="bottom_box">
    <li><a href="#">条款声明</a></li>
    <li><a href="#">隐私条款</a></li>
    <li><a href="#">方法论</a></li>
    <li><a href="#">发布时间</a></li>
    <li><a href="#">联系我们</a></li>
    <li><a href="#">申请试阅账号</a></li>
    <li class="bottom_li"><a href="#"></a></li>
    <div class="clearfix"></div>
</div>
</body>
</html>
<script>
	$("div.nav_02 > li").removeClass("mian_nav");
	$("li#sjzx").addClass("mian_nav");
</script>