<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>数据中心</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <style type="text/css">
        .download_sm_box02 li  a.download_a{background-color:#435770; padding:0 8px; border-radius:5px;}
    </style>
    <script type="text/javascript">
        $(function(){
            $('.hy_data_box').hide();
            var datasize=${datasize};
            var mydataid=new Array();
            var mydata=${dataArray};
            for(var i=0;i<datasize;i++){
                mydataid.push(mydata[i]);
            }
            alert(mydataid);
            var itemsidArray=new Array();
            var itemsdataArray=new Array();
            $(".download_box a").click(function(){
                $(this).toggleClass("download_a");
            });

            $(".download_box").find("a").find(".items").each(function(){
                itemsidArray.push($(this).val());
                //alert(itemsidArray);
            });
            for(var i=0;i<itemsidArray.length;i++){
                  if($.inArray(itemsidArray[i],mydataid)>-1){
                      $("input[value="+itemsidArray[i]+"]").parent("a").addClass("download_a");
                  }
            }
            $("#confirmss").click(function(){
                $(".download_box").find("a.download_a").each(function(){
                    itemsdataArray.push($(this).text());
                    //alert(itemsdataArray);
                });
                $("#itemsid").val(itemsidArray);
                $("#itemsdata").val(itemsdataArray);
                alert(itemsidArray);
                alert(itemsdataArray);
//                $("#dataform").attr("action","/dc");
//                dataform.submit();
            })

        });
    </script>
</head>

<body>
<div class="top_bj">
    <img src="images/logo.png">
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
    <li class="all"><a>全部产品</a>
        <div class="all_box">
            <dl class="all_dl_top">
                <dt>苯乙烯</dt>
                <dd>
                    <a href="#">ABS </a>
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
    </li>
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
<p>首次使用请设置下载偏好设置：</p>
<h1>你可下载的数据</h1>
<div class="download_box">
<form method="post" name="dataform" id="dataform">
<input type="hidden" id="itemsid" name="itemsid">
<input type="hidden" id="itemsdata" name="itemsdata">  </form>
<div class="download_sm_box01">
    <h2>品目</h2>
    <li>
        <span>苯乙烯：</span>
        <p>
            <a href="#"><input type="hidden" class="items" value="01">苯乙烯：</a>
            <a href="#" ><input type="hidden" class="items" value="03">ABS</a>
            <a href="#" ><input type="hidden" class="items" value="04">EPS</a>
            <a href="#">PS</a>
            <a href="#" ><input type="hidden" class="items" value="05">苯乙烯</a>
            <a href="#"><input type="hidden" class="items" value="06">二乙二醇</a>
            <a href="#"><input type="hidden" class="items" value="07">工程塑料</a>
        </p>
    </li>
    <li class="download_li">
        <span><a>醋&nbsp;&nbsp;&nbsp;酸：</a></span>
        <p>
            <a href="#"><input type="hidden" class="items" value="02">醋&nbsp;&nbsp;&nbsp;酸</a>
            <a href="#"><input type="hidden" class="items" value="3">EVA</a>
            <a href="#" >冰醋酸</a>
            <a href="#">醋酸乙烯</a>
            <a href="#">乙醇 & 醋酸乙酯</a>
        </p>
    </li>
    <li>
        <span>芳&nbsp;&nbsp;&nbsp;烃：</span>
        <p><a href="#">纯苯</a>
            <a href="#">混合二甲苯</a>
            <a href="#">甲苯</a>
            <a href="#">顺酐</a>
        </p>
    </li>
    <li class="download_li">
        <span>酚&nbsp;&nbsp;&nbsp;酮：</span>
        <p><a href="#">BPA & ECH & EP</a>
            <a href="#" >MMA</a>
            <a href="#">苯酚</a>
            <a href="#">丙酮</a>
        </p>
    </li>
    <li>
        <span>化&nbsp;&nbsp;&nbsp;纤：</span>
        <p><a href="#">PTA</a>
            <a href="#">PX</a>
            <a href="#">苯酚</a>
            <a href="#">丙酮</a>
        </p>
    </li>
    <li class="download_li">
        <span>聚烯烃：</span>
        <p><a href="#">管材料</a>
            <a href="#">聚丙烯</a>
            <a href="#">聚乙烯</a>
        </p>
    </li>
    <li>
        <span>烯&nbsp;&nbsp;&nbsp;烃：</span>
        <p><a href="#">丙烯</a>
            <a href="#">丁二烯</a>
            <a href="#">乙烯</a>
        </p>
    </li>
    <li class="download_li">
        <span>橡&nbsp;&nbsp;&nbsp;胶：</span>
        <p><a href="#"><input type="hidden" class="items" value="11">丁苯橡胶</a>
            <a href="#"><input type="hidden" class="items" value="12">丁腈橡胶</a>
            <a href="#">顺丁橡胶</a>
            <a href="#">特种橡胶</a>
            <a href="#">天然橡胶</a>
        </p>
    </li>
    <li>
        <span>增塑剂：</span>
        <p><a href="#">DOP & DINP & DOTP</a>
            <a href="#">丙烯酸及酯</a>
            <a href="#">邻二甲苯</a>
        </p>
    </li>
    <li class="download_li">
        <span>甲&nbsp;&nbsp;&nbsp;醇：</span>
        <p><a href="#">甲醇</a>
        </p>
    </li>
    <li>
        <span>油&nbsp;&nbsp;&nbsp;品：</span>
        <p><a href="#">成品油</a>
            <a href="#">基础油</a>
            <a href="#">沥青</a>
            <a href="#">燃料油</a>
            <a href="#">石油焦</a>
            <a href="#">原油/炼厂</a>
        </p>
    </li>
    <li class="download_li">
        <span>液化气：</span>
        <p><a href="#">液化气</a>
        </p>
    </li>
    <li style="border-bottom:none;">
        <span>天然气：</span>
        <p><a href="#">LNG</a>
            <a href="#">天然气</a>
        </p>
    </li>
    <div class="clearfix"></div>
</div>
<div class="download_sm_box02">
    <h2>数据类型</h2>
    <li>
        <span>价&nbsp;&nbsp;&nbsp;格：</span>
        <p><a href="#" class="price"><input type="hidden" class="items" value="201">国内</a>
            <a href="#" class="price"><input type="hidden" class="items" value="202">国际</a>
        </p>
    </li>
    <li>
        <span>供&nbsp;&nbsp;&nbsp;需：</span>
        <p><a href="#">产能产量开工率</a>
            <a href="#" >表观需求</a>
            <a href="#">下游需求</a>
            <a href="#">进出口</a>
            <a href="#">库存</a>
            <a href="#">装置</a>
            <a href="#">船期</a>
        </p>
    </li>
    <li>
        <span class="download_li_a"><a href="#">利&nbsp;&nbsp;&nbsp;润</a></span>
        <div class="clearfix"></div>
    </li>
    <li>
        <span  class="download_li_a"><a href="#">套&nbsp;&nbsp;&nbsp;利</a></span>
        <div class="clearfix"></div>
    </li>
    <li>
        <span  class="download_li_a"><a href="#">宏观数据</a></span>
        <div class="clearfix"></div>
    </li>
    <li>
        <span  class="download_li_a"><a href="#">安迅思指数</a></span>
        <div class="clearfix"></div>
    </li>
    <li>
        <span class="hy_span">行业数据</span>
        <div  class="hy_data_box">
            <div class="hy_data">
                <b>房地产：</b>
                <a href="#">商品房</a>
                <a href="#" >投资及景气指数</a>
                <a href="#">土地开发</a>
            </div>
            <div class="hy_data">
                <b>金融期货：</b>
                <a href="#">PE</a>
                <a href="#">PP</a>
                <a href="#">PTA</a>
                <a href="#">PVC</a>
                <a href="#">动力煤</a>
                <a href="#">甲醇</a>
                <a href="#">焦煤</a>
                <a href="#">焦炭</a>
                <a href="#">沥青</a>
                <a href="#">燃料油</a>
                <a href="#">天然橡胶</a>
            </div>
            <div class="hy_data">
                <b>能源和化工：</b>
                <a href="#">能源主要指标</a>
                <a href="#">石化产品进出口</a>
                <a href="#">原油平衡表</a>
            </div>
            <div class="hy_data">
                <b>运输和存储业：</b>
                <a href="#">主要指标</a>
            </div>
            <div class="hy_data">
                <b>制造行业：</b>
                <a href="#">工业主要指标</a>
                <a href="#">纺织品生产</a>
                <a href="#">纺织品主要指标</a>
                <a href="#">机械产品进出口</a>
                <a href="#">机械产品进出口</a>
                <a href="#">机械产品生产</a>
                <a href="#">家电主要产品产量</a>
            </div>
        </div>
    </li>
    <li>
        <span>时间维度：</span>
        <p id="timeDimension"><a href="#">日</a>
            <a href="#">周</a>
            <a href="#">月</a>
            <a href="#">年</a>
        </p>
    </li>
    <li style="border-bottom:none;">
        <span>区域维度：</span>
        <p id="areaDimension"><a href="#">华东</a>
            <a href="#" >华南</a>
            <a href="#">华北</a>
            <a href="#">华中</a>
            <a href="#">西北</a>
            <a href="#">西南</a>
            <a href="#">东北</a>
            <a href="#">全国</a>
        </p>
    </li>
</div>
</div>
<%--<div onclick="location.href = '数据中心02.html';"  class="achieve"><a>完成</a></div>--%>
<%--<div class="achieve"><a id="confirmss">确认</a></div>--%>
</div>
<div><img src="images/bottom.png"></div>
</body>
</html>
<script>
	$("div.nav_02 > li").removeClass("mian_nav");
	$("li#sjzx").addClass("mian_nav");
</script>