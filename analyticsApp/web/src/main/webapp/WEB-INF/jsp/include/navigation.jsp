<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
</head>
<script>
    /**
    * 选中导航
     */
    function initNavigation(type){
        //获取菜单
        var menuCache = window.localStorage;
        var firstMenu=menuCache.getItem("firstMenu");
        if(!firstMenu){
            firstMenu= $(".product01").attr("prdcode");
            menuCache.setItem("firstMenu",firstMenu);
        }
        var secondMenu=menuCache.getItem("secondMenu");
        if(type=="login"){//产品分析
            //判断路径后面有没有productCode没有就不要再请求了
            if(window.location.href.indexOf("productCode")!=-1) {
                window.location.href="login?productCode="+firstMenu;
                menuCache.setItem("secondMenu",type);
            } else{
                var loginClass= $("div.content_box").attr("class");
                if( loginClass){
                    getModule(firstMenu);//第一次访问首页
                }else{
                    window.location.href="login?productCode="+firstMenu;
                }

                menuCache.setItem("secondMenu",type);
            }


        }
        if(type=="companyanalysis"){//企业分析
            window.location.href="companyanalysis?productCode="+firstMenu;
            menuCache.setItem("secondMenu",type);
        }
        if(type=="industryChainIndex"){//产业链分析
            window.location.href="industryChainIndex?productCode="+firstMenu;
            menuCache.setItem("secondMenu",type);
        }
    }
</script>
<div class="nav_02_box">
    <div class="nav_02">
        <li id="login"><a href="javascript:void('0')" onclick="initNavigation('login')">产品分析</a></li>
        <li id="companyanalysis"><a  href="javascript:void('0')" onclick="initNavigation('companyanalysis')">企业分析</a></li>
        <li id="industryChainIndex"><a  href="javascript:void('0')" onclick="initNavigation('industryChainIndex')">产业链分析</a></li>
        <%--<li id="sjzx"><a href="javascript:void('0')" onclick="initNavigation('dataDownLoadIndex')">数据中心</a></li>--%>
        <div class="clearfix"></div>
    </div>
</div>