<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>数据中心</title>
    <link href="css/css.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-2.1.4.min.js"  type="text/javascript"></script>
    <%--<script type="text/javascript" src="js/sys/data.js"></script>--%>
    <style type="text/css">
        .download_sm_box02 li  a.download_a {
            background-color: #435770;
            padding: 0 8px;
            border-radius: 5px;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(  function(){
                    initdata();
                    $(".download_sm_box01 a").click(function () {
                        $(this).toggleClass("download_a");
                    });

                    //勾选已经配置过的
                    var allCodeChecked=$("#allCodeChecked").val().split(",");
                    if(allCodeChecked){
                        $(".download_sm_box01").find("a").find(".items").each(function () {
                            console.log(allCodeChecked.indexOf($(this).val()));
                            if(allCodeChecked.indexOf($(this).val())!=-1){
                                $(this).parent().addClass("download_a");
                            }
                        });
                    }

            }

        );

        function nextSubmit() {
                   //遍历获得所有已选择的数据
            var allCode="";
            var pmname="";
            $(".download_sm_box01").find("a.download_a").find(".items").each(function () {
                if(allCode==""){
                    allCode=$(this).val() ;
                }else{
                    allCode=allCode+"," +$(this).val() ;
                }
                if(pmname==""){
                    pmname=$(this).parent().text() ;
                }else{
                    pmname=pmname+"," +$(this).parent().text();
                    $("#pmname").val(pmname);
                }
                $("#allCode").val(allCode);
                $("#dataform").attr("action", "lxo");
                $("#dataform").submit();

            });
                 }
        function  initdata(){
            var allProduct=${allProduct};
            var html="";
            for(var i=0;i<allProduct.length;i++){
                html+="<div class='download_sm_box01'>";
                html+=" <h2>"+allProduct[i].modelName+"</h2>";
                for(var j=0;j<allProduct[i].flData.length;j++){
                    if(j%2==0){html+="<div class='pm_left_box'>";}
                    if(j%2!=0){html+="<div class='pm_right_box'>";}
                html+="<li>";
                html+="<span>"+allProduct[i].flData[j].flName+":</span>";
                html+="<p>";
                    for(var k=0;k<allProduct[i].flData[j].childData.length;k++){
                         html+="<a href='javascript:void(\'0\')'><input type='hidden' class='items' value='"+allProduct[i].modelCode+';'+allProduct[i].flData[j].flCode+';'+allProduct[i].flData[j].childData[k].productCode+"'>"+allProduct[i].flData[j].childData[k].productName+"</a>";
                    }
                    html+="</p> "      ;
                    html+="  </li>"   ;
                    html+="  </div>"  ;
                }
                html+=" </div>";
                $("#dataform").after(html);
            }







        }
    </script>
</head>

<body>
<jsp:include page="../include/top.jsp"></jsp:include>
<jsp:include page="../include/menu.jsp"></jsp:include>
<jsp:include page="../include/navigation.jsp"></jsp:include>

<div class="date_download">
    <p>首次使用请设置下载偏好设置：</p>

    <div class="download_box">
        <!--被选的数据-->
        <input type="hidden" id="allCodeChecked" value="${allCodeChecked}">
        <form method="post" name="dataform" id="dataform">
            <!--所有被选的数据-->
            <input type="hidden" id="allCode" name="allCode">
            <input type="hidden" id="pmname" name="pmname">
        </form>
            <div class="clearfix"></div>
        </div>
    </div>
    <div class="achieve"><span class="xb"><a href="javascript:void ('0')" onclick="nextSubmit()">下一步</a></span>

        <div class="clearfix"></div>
    </div>
</div>
<div class="dt_box" style="display : none"></div>
<jsp:include page="../include/foot.jsp"></jsp:include>

</body>
</html>
<script>
	$("div.nav_02 > li").removeClass("mian_nav");
	$("li#sjzx").addClass("mian_nav");
</script>
