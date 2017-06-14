/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 17-2-10
 * Time: 下午2:00
 * To change this template use File | Settings | File Templates.
 */
//模块缓存，tab页缓存，价格点缓存
var jsonObjectModule,jsonObjectPoint,downLoadType;
var allProduct=[]; //全部产品
var obj=[];                 //自己权限内的产品
 //菜单
var menuCache = window.localStorage;
var firstMenu=stripscript(menuCache.getItem("firstMenu"));
var secondMenu=stripscript(menuCache.getItem("secondMenu"));
/**
 * 根据品目ID获得模块
 */
function getModule(productCode){
    if(productCode){
        //点哪个品目就去加载这个品目的权限json
        for(var i=0;i<obj.length;i++){
                if(obj[i].productCode==productCode){
                    jsonObjectModule=obj[i].productData;
                    //console.log(jsonObjectModule);
                    break;
                }
        }

        $("div.content_box").empty();
        var conf=jsonObjectModule;
        for(var i=0;i<conf.length;i++){
            if(conf[i]['Disabled']=='false'){
                $("div.content_box").append("<div id=\""+conf[i]["Remark"]+"div"+"\"></div>");
                var url=conf[i]['Remark']+"?moduleId="+conf[i]['ProductModuleId']+"&productCode="+conf[i]['ProductCode']+"&randomTime="+new Date().getTime();
                $("div#"+conf[i]["Remark"]+"div"+"").load(url);
            }

        }

    }else{
    	initNavigation(secondMenu);
    }

}

/**
 * 选中某个菜单
 * @param productCode
 */
function checkModule(productCode){
    //判断是什么二级菜单
    var secondMenu=$(".mian_nav").attr("id");
    menuCache.setItem("firstMenu",productCode);
    menuCache.setItem("secondMenu",secondMenu);
    if(secondMenu=="login"){//产品分析
        window.location.href="login?productCode="+productCode;
    }
    if(secondMenu=="companyanalysis"){//企业分析
        window.location.href="companyanalysis?productCode="+productCode;
    }
    if(secondMenu=="industryChainIndex"){//产业链分析
        window.location.href="industryChainIndex?productCode="+productCode;
    }

}
/**
 * 初始化菜单
 */
function initMenu(productCode){

    if((!firstMenu&&!secondMenu)){
        selprdcode = obj[0].productCode;
        selprdname =obj[0].name;
        firstMenu=selprdcode;
        secondMenu= $(".nav_02").children("li:first-child").attr("id");
        menuCache.setItem("firstMenu",firstMenu); //这两个不能去掉，去掉了切换账号的时候另一个账号到页面来显示空白因为productcode没有
        menuCache.setItem("secondMenu",secondMenu);
        var html="";
        var index=0;
        for(var i=0;i<allProduct.length;i++){
            var flag=false;
            for(var j=0;j<obj.length;j++){
                if(obj[j].productCode==allProduct[i].productCode){
                    index++;
                    if(index==1){
                        html+="<a class='product01 productSmall' prdcode="+obj[j].productCode+" value="+obj[j].productCode+" onclick=\"checkModule('"+obj[j].productCode+"')\">"+obj[j].name+"</a>";
                    }else{
                        html+="<a class='productSmall' prdcode="+obj[j].productCode+" value="+obj[j].productCode+" onclick=\"checkModule('"+obj[j].productCode+"')\">"+obj[j].name+"</a>";
                    }

                    flag=true;
                    break;
                }
            }
        }
        if(html!=""){
            $(".cp_box").html(html);
        }
        $(".nav_02").children("li:first-child").addClass("mian_nav");
        getModule();
    }else{
       // alert(firstMenu+"==========="+secondMenu);
           firstMenu=stripscript(menuCache.getItem("firstMenu"));
             if(firstMenu){
                 productCode=firstMenu;
             }else{
                 if(!productCode){
                     productCode= obj[0].productCode;
                 }
             }
            $(".cp_box").empty() ;
            //重新从缓存里面加载菜单
            var top=[];
            var center=[];
            var bottom=[];
            for(var i=0;i<obj.length;i++){
                if(obj[i].productCode==productCode){
                    selprdcode =obj[i].productCode;
                    selprdname = obj[i].name;
                    center.push(obj[i]);
                }else if(center.length==0){
                    top.push(obj[i]);
                }else if(center.length>0){
                    bottom.push(obj[i]);
                }

            }

            //三个数组从中间到后面到前面开始合并
            center=center.concat( bottom );
            center=center.concat(top);
            var html="";
            var index=0;
           for(var j=0;j<center.length;j++){
                   index++;
                     if(index==1){
                            html+="<a class='product01 productSmall' prdcode="+center[j].productCode+" value="+center[j].productCode+" onclick=\"checkModule('"+center[j].productCode+"')\">"+center[j].name+"</a>";
                        }else{
                            html+="<a class='productSmall' prdcode="+center[j].productCode+" value="+center[j].productCode+" onclick=\"checkModule('"+center[j].productCode+"')\">"+center[j].name+"</a>";
                        }

                    }


            if(html!=""){
               $(".cp_box").html(html);
            }
//        }else{
//            $(".cp_box>a").removeClass("product01") ;
//               //遍历缓存然后默认勾选 --一级菜单
//            $(".cp_box>a").each(function(i,element){
//                var prdcode=$(element).attr("prdcode");
//                if(prdcode==firstMenu){
//                    $(element).addClass("product01");
//                    selprdcode =prdcode
//                    selprdname = $(element).children("a").text();
//
//                }
//            });
//
//        }
        $("div.nav_02 > li").removeClass("mian_nav");
        //遍历缓存然后默认勾选 --二级菜单
        $(".nav_02>li").each(function(i,element){
            var prdcode=$(element).attr("id");
            if(prdcode==secondMenu){
                $(element).addClass("mian_nav");
            }
        });
//        if(secondMenu=="login"){
//            getModule(firstMenu);
//        } else{
//            if(!productCode){ //重启服务后打开地址
////                if(secondMenu=="companyanalysis"){//企业分析
////                    window.location.href="companyanalysis?productCode="+firstMenu;
////                }
//                if(secondMenu=="industryChainIndex"){//产业链分析
//                    window.location.href="industryChainIndex?productCode="+firstMenu;
//                }
//            }
//
//        }
    }
}



