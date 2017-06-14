<%@ page import="net.sf.json.JSONArray" %>
<%@ page import="net.sf.json.JSONObject" %>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="js/init.js"></script>
</head>

<%
    HttpSession userSession=request.getSession();
    if(userSession!=null&&userSession.getAttribute("user")!=null){
        JSONArray jsonArray=(JSONArray)userSession.getAttribute("user");
        request.setAttribute("user",jsonArray);
    }
%>

<div class="clearfix"></div>
<div  class="bottom_box">
    <li><a onclick="window.open('http://www.icis-china.com/info/terms.aspx');">条款声明</a></li>
    <li><a onclick="window.open('http://www.icis-china.com/info/terms.aspx');">隐私条款</a></li>
    <li><a onclick="window.open('http://www.icis-china.com/Chemease/zAssessmentPrice/index.aspx');">方法论</a></li>
    <li><a onclick="window.open('http://www.icis-china.com/Chemease/News/5472452,196,0,0,0.htm');">发布时间</a></li>
    <li><a onclick="window.open('http://www.icis-china.com/Info/ContactUs.aspx');">联系我们</a></li>
    <li><a onclick="window.open('http://www.icis-china.com/c1/board/B_dlmadd.aspx?id=97');">申请试阅账号</a></li>
    <li class="bottom_li"><a onclick="window.open('http://www.relx.com/Pages/Home.aspx');"></a></li>
    <div class="clearfix"></div>
</div>
<script>
    var all=document.getElementsByName("allProduct");
    allProduct=[];
    obj=[];
    productByUser=[];
    for(i=0;i<all.length;i++){
        var value=all[i].id;
        allProduct.push({index:value.split("_")[0],productCode:value.split("_")[1]});
    }
    allProduct=sortArray(allProduct,0,"asc");

    //加载用户的菜单 根据wam权限
    if(allProduct){
       var  productByUser=${user};
        if(productByUser){
            //客户有哪些品目

            if(productByUser.length>4){
                $(".cp_box").width(1200);
            }
            var html="";   //进行排序
            for(var i=0;i<allProduct.length;i++){
                var flag=false;
                for(var j=0;j<productByUser.length;j++){
                    if(productByUser[j].productCode==allProduct[i].productCode){
                        // html+="<a prdcode="+obj[j].productCode+" value="+obj[j].productCode+" onclick=\"checkModule('"+obj[j].productCode+"')\">"+obj[j].name+"</a>";
                        obj.push(productByUser[j]);
                        flag=true;
                        break;
                    }
                }

                if(!flag){
                    $("#"+allProduct[i].index+"_"+allProduct[i].productCode).attr("class","productDisabled");
                    $("#"+allProduct[i].index+"_"+allProduct[i].productCode).attr("onclick","");
                }


            }
            if(obj){
                //苯乙烯代替，需要改成根据点选的品目获取到品目的code以及name
                initMenu('${productCode}');
            }

        }

    }

    $(".content").mCustomScrollbar({
        axis:"x"
    });
    document.onreadystatechange = statechange;
    function statechange(){
        if(document.readyState == 'complete'&&typeof ga=="function"){
            setTimeout(function(){
                var timing = window.performance.timing;
                var loadTime = timing.loadEventEnd-timing.navigationStart;

                ga('send','event',{
                    'eventCategory': 'Site Speed',
                    'eventAction': location.href,
                    'eventLabel':loadTime,
                    'eventValue':loadTime
                })
            },'100');
        }
    }
</script>