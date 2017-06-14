(function($){
    var ms = {
        init:function(obj,args){
            return (function(){
                ms.fillHtml(obj,args);
                ms.bindEvent(obj,args);
            })();
        },
        //填充html
        fillHtml:function(obj,args){
            return (function(){
                obj.empty();
                //上一页
                if(args.current > 1){
                    obj.append('<span><a href="javascript:;" class="prevPage">上一页</a></span>');
                }else{
                    obj.remove('.prevPage');
                    obj.append('<span class="disabled">上一页</span>');
                }
                //中间页码
                if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
                    obj.append('<span><a href="javascript:;" class="tcdNumber">'+1+'</a></span>');
                }
                if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
                    obj.append('<span>...</span>');
                }
                var start = args.current -2,end = args.current+2;
                if((start > 1 && args.current < 4)||args.current == 1){
                    end++;
                }
                if(args.current > args.pageCount-4 && args.current >= args.pageCount){
                    start--;
                }
                for (;start <= end; start++) {
                    if(start <= args.pageCount && start >= 1){
                        if(start != args.current){
                            obj.append('<span><a href="javascript:;" class="tcdNumber">'+ start +'</a></span>');
                        }else{
                            obj.append('<span class="page_number_select">'+ start +'</span>');
                        }
                    }
                }
                if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
                    obj.append('<span>...</span>');
                }
                if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
                    obj.append('<span><a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a></span>');
                }
                //下一页
                if(args.current < args.pageCount){
                    obj.append('<span><a href="javascript:;" class="nextPage">下一页</a></span>');
                }else{
                    obj.remove('.nextPage');
                    obj.append('<span class="disabled">下一页</span>');
                }
            })();
        },
        //绑定事件
        bindEvent:function(obj,args){
            return (function(){

                obj.on("click","a.tcdNumber",function(){
                    var current = parseInt($(this).text());
                    ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current);
                    }
                });
                //上一页
                obj.on("click","a.prevPage",function(){
                    var current = parseInt(obj.children("span.page_number_select").text());
                    ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current-1);
                    }
                });
                //下一页
                obj.on("click","a.nextPage",function(){
                    var current = parseInt(obj.children("span.page_number_select").text());
                    ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current+1);
                    }
                });
            })();
        }
    }
    $.fn.removeEvent=function(){
         $(this).off("click","a.prevPage");
         $(this).off("click","a.nextPage");
         $(this).off("click","a.tcdNumber");
    };
    $.fn.createPage = function(options){
        var args = $.extend({
            pageCount : 5,
            current : 1,
            backFn : function(p){

            }
        },options);
        if(args.pageCount%pageSize==0){
            args.pageCount=parseInt(args.pageCount/pageSize);
        } else{
            args.pageCount=parseInt((args.pageCount/pageSize))+1;
        }

        ms.init(this,args);
    }
})(jQuery);
var pageSize=12;
/**
 * 创建动态表格内容
 * @param currentPage
 */
function loadInitPaginationData(currentPage,id){
    $("#"+id).nextAll().remove();
    var html="";
    var startIndex=(currentPage-1)*pageSize;
    var end=(startIndex+pageSize);
    if(end>dataSource.length){
        end= dataSource.length;
    }
    var tempDataSource=dataSource.slice(startIndex,end);
    for(var i=0;i<tempDataSource.length;i++){
        var str="";
        for(var j=0;j<tempDataSource[i].length;j++){
            str+='<th>'+tempDataSource[i][j]+'</th>';
        }
        if(i%2==0){
            html+=' <tr>'+str+' </tr> ';
        }else{
            html+='  <tr class="details_bottom_t01">'+str+'  </tr>';
        }

    }
    $("#"+id).after(html);
}
/**
 * 传入一个jsonkey,转成你需要的分页数组
 * @param currentPage
 */
function loadInitPaginationData2(currentPage,id,filedArray){
    $("#"+id).nextAll().remove();
    var html="";
    var startIndex=(currentPage-1)*pageSize;
    var end=(startIndex+pageSize);
    if(end>dataSource.length){
        end= dataSource.length;
    }
    var tempDataSource=dataSource.slice(startIndex,end);
    for(var i=0;i<tempDataSource.length;i++){
        var str="";
        for(var j=0;j<filedArray.length;j++){
            var key= filedArray[j];
            str+='<th>'+tempDataSource[i][key]+'</th>';
        }
        if(i%2==0){
            html+=' <tr style="cursor:default ">'+str+' </tr> ';
        }else{
            html+='  <tr style="cursor:default " class="details_bottom_t01">'+str+'  </tr>';
        }

    }
    $("#"+id).after(html);
}

//产品分析-企业报价详情表格绘制
function loadInitPaginationData_qiyeDt(currentPage,id,filedArray,dataSource){
    $("#"+id).nextAll().remove();
    var html="";
    var startIndex=(currentPage-1)*pageSize;
    var end=(startIndex+pageSize);
    if(end>dataSource.length){
        end= dataSource.length;
    }
    var tempDataSource=dataSource.slice(startIndex,end);
    for(var i=0;i<tempDataSource.length;i++){
        var str="";
        for(var j=0;j<filedArray.length;j++){
            var key= filedArray[j];
            if(key=='quotoPrice'){
                str+='<th>'+tempDataSource[i]['quotoPrice']+'</th>';
            }else if(key=='hightLows'){
                str+='<th>'+tempDataSource[i]['hightLows']+'</th>';
            }else if(key!='MaxPrice' && key!='Change'){
                str+='<th>'+tempDataSource[i][key]+'</th>';
            }
        }

        if(i%2==0){
            html+=' <tr style="cursor:default ">'+str+' </tr> ';
        }else{
            html+='  <tr style="cursor:default " class="details_bottom_t01">'+str+'  </tr>';
        }
    }
    $("#"+id).after(html);
}

//产品分析-外盘报价详情表格绘制
function loadInitPaginationData_wpbjDt(currentPage,id,filedArray,dataSource){
    $("#"+id).nextAll().remove();
    var html="";
    var startIndex=(currentPage-1)*pageSize;
    var end=(startIndex+pageSize);
    if(end>dataSource.length){
        end= dataSource.length;
    }
    var tempDataSource=dataSource.slice(startIndex,end);
    for(var i=0;i<tempDataSource.length;i++){
        var str="";
        for(var j=0;j<filedArray.length;j++){
            var key= filedArray[j];
            if(key=='PubDate'){    //报价日期
                str+='<th>'+tempDataSource[i]['PubDate']+'</th>';
            }
            if(key=='level_name'){   //级别、牌号
                str+='<th>'+tempDataSource[i]['level_name']+'</th>';
            }
            if(key=='company_name'){   //生产商
                str+='<th>'+tempDataSource[i]['company_name']+'</th>';
            }
            if(key=='ProducingArea'){   //产地
                str+='<th>'+tempDataSource[i]['ProducingArea']+'</th>';
            }
            if(key=='PriceTerm'){    //价格条款
                str+='<th>'+tempDataSource[i]['PriceTerm']+'</th>';
            }
            if(key=='quotoPrice'){    //报价
                str+='<th>'+tempDataSource[i]['quotoPrice']+'</th>';
            }
            if(key=='hightLows'){    //涨跌
                str+='<th>'+tempDataSource[i]['hightLows']+'</th>';
            }
            if(key=='DsNote'){   //装船期
                str+='<th>'+tempDataSource[i]['DsNote']+'</th>';
            }
            if(key=='Note'){    //备注
                str+='<th>'+tempDataSource[i]['Note']+'</th>';
            }
        }
        if(i%2==0){
            html+=' <tr style="cursor:default ">'+str+' </tr> ';
        }else{
            html+='  <tr style="cursor:default " class="details_bottom_t01">'+str+'  </tr>';
        }

    }
    $("#"+id).after(html);
}

/**
 * 竖排表格 ,xh当前选中的是第几列
 * @param currentPage
 */
function loadInitPaginationData3(titleArray,currentPage,id,xh,order){
    $("#"+id).nextAll().remove();
    $("#"+id).empty();
    var paixu=order.split("=")[0];//正序还是倒序
    var idIndex=order.split("=")[1];//表头的id
//    alert("========="+order);
    var html2="";
    var percen=100/titleArray.length;
    for(var i=0;i<titleArray.length;i++){
        if(xh.indexOf(i)!=-1){
            if(i==idIndex){
                 if(paixu=="asc"){
                     html2+='<th  width="'+percen+'%" onclick=\'upstreamDetailsSort2(this,'+i+',dataSource)\' style="cursor: pointer"><span class="tableDisable" id=\'upstreamDetailsJCK'+i+'\' >'+titleArray[i]+'</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending12"></a><a style="cursor: pointer" href="javascript:void(\'0\')" class="descending51 "></a></span></th>';
                 }
                if(paixu=="desc"){
                    html2+='<th  width="'+percen+'%" onclick=\'upstreamDetailsSort2(this,'+i+',dataSource)\' style="cursor: pointer"><span class="tableDisable" id=\'upstreamDetailsJCK'+i+'\' >'+titleArray[i]+'</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending52"></a><a style="cursor: pointer" href="javascript:void(\'0\')" class="descending11 "></a></span></th>';
                }
            } else{
                html2+='<th  width="'+percen+'%" onclick=\'upstreamDetailsSort2(this,'+i+',dataSource)\' style="cursor: pointer"><span class="tableDisable" id=\'upstreamDetailsJCK'+i+'\' >'+titleArray[i]+'</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')"  class="ascending12"></a><a style="cursor: pointer" href="javascript:void(\'0\')" class="descending11"></a></span></th>';
            }

        } else{
            if(i==idIndex){
                if(paixu=="asc"){
                    html2+='<th width="'+percen+'%" onclick=\'upstreamDetailsSort2(this,'+i+',dataSource)\' style="cursor: pointer"><span id=\'upstreamDetailsJCK'+i+'\' >'+titleArray[i]+'</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')" class="ascending"></a><a style="cursor: pointer" href="javascript:void(\'0\')" class="descending31"></a></span></th>';
                }
                if(paixu=="desc"){
                    html2+='<th width="'+percen+'%" onclick=\'upstreamDetailsSort2(this,'+i+',dataSource)\' style="cursor: pointer"><span id=\'upstreamDetailsJCK'+i+'\' >'+titleArray[i]+'</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')" class="ascending32"></a><a style="cursor: pointer" href="javascript:void(\'0\')" class="descending"></a></span></th>';
                }

            }else{
                html2+='<th width="'+percen+'%" onclick=\'upstreamDetailsSort2(this,'+i+',dataSource)\' style="cursor: pointer"><span id=\'upstreamDetailsJCK'+i+'\' >'+titleArray[i]+'</span><span class="ascending_box"><a style="cursor: pointer" href="javascript:void(\'0\')" class="ascending"></a><a style="cursor: pointer" href="javascript:void(\'0\')" class="descending"></a></span></th>';
            }

        }
    }
    $("#"+id).html(html2);
    var html="";
    var startIndex=(currentPage-1)*pageSize;
    var end=(startIndex+pageSize);
    if(end>dataSource.length){
        end= dataSource.length;
    }
    var tempDataSource=dataSource.slice(startIndex,end);
    for(var i=0;i<tempDataSource.length;i++){
        var str="";
        for(var j=0;j<tempDataSource[i].length;j++){
            if(xh.indexOf(j)!=-1){
                str+='<th class="tableDisable">'+tempDataSource[i][j]+'</th>';
            } else{
                str+='<th>'+tempDataSource[i][j]+'</th>';
            }
        }
        if(i%2==0){
            html+=' <tr>'+str+' </tr> ';
        }else{
            html+='  <tr class="details_bottom_t01">'+str+'  </tr>';
        }

    }
    $("#"+id).after(html);
}

function loadInitPaginationData2_out(currentPage,id,filedArray){
    $("#"+id).nextAll().remove();
    var html="";
    var startIndex=(currentPage-1)*pageSize;
    var end=(startIndex+pageSize);
    if(end>dataSource.length){
        end= dataSource.length;
    }
    var tempDataSource=dataSource.slice(startIndex,end);
    for(var i=0;i<tempDataSource.length;i++){
        var str="";
        for(var j=0;j<filedArray.length;j++){
            var key= filedArray[j];
            str+='<th>'+tempDataSource[i][key]+'</th>';
        }
        if(i%2==0){
            html+=' <tr style="cursor:pointer">'+str+' </tr> ';
        }else{
            html+='  <tr class="details_bottom_t02">'+str+'  </tr>';
        }

    }
    $("#"+id).after(html);
}

function loadInitPaginationData_tcjxDt(currentPage,id,filedArray){
    $("#"+id).nextAll().remove();
    var html="";
    var startIndex=(currentPage-1)*pageSize;
    var end=(startIndex+pageSize);
    if(end>dataSource.length){
        end= dataSource.length;
    }
    var tempDataSource=dataSource.slice(startIndex,end);
    for(var i=0;i<tempDataSource.length;i++){
        var str="";
        for(var j=0;j<filedArray.length;j++){
            var key= filedArray[j];
            var keyDate = tempDataSource[i][key];
            if(key=='FiducialOperationRate'){
                if(keyDate=='' || keyDate==null){
                   keyDate='-';
                }else{
                    keyDate = keyDate+'%';
                }
            }
            str+='<th>'+keyDate+'</th>';
        }
        if(i%2==0){
            html+=' <tr style="cursor:default ">'+str+' </tr> ';
        }else{
            html+='  <tr style="cursor:default " class="details_bottom_t01">'+str+'  </tr>';
        }

    }
    $("#"+id).after(html);
}
/**
 * 加载分页控件
 */
function initPagination(id,pageCount){
    if(pageCount>0){
        loadInitPaginationData(1,id);
        $(".page_number_box01").createPage({
            pageCount:pageCount,
            current:1,
            backFn:function(p){
                loadInitPaginationData(p,id);
            }
        });
    }else{ //没有数据
        $(".page_number_box01").empty();
    }

}
/**
 * 竖排表格分页方式  xh代表当前选中第几列
 */
function initPagination2(titleArray,id,pageCount,xh,order){
    if(pageCount>0){
        loadInitPaginationData3(titleArray,1,id,xh,order);
        $(".page_number_box01").createPage({
            pageCount:pageCount,
            current:1,
            backFn:function(p){
                loadInitPaginationData3(titleArray,p,id,xh,order);
            }
        });
    }else{ //没有数据
        $(".page_number_box01").empty();
    }

}
/**
 * 清除分页和table
 * @param id
 */
function clearPagination(id){
    $(".page_number_box01").removeEvent();
    $(".page_number_box01").empty();
    $("#"+id).nextAll().remove();
    $("#"+id).empty();
}

/**
 * 清除分页和table内容表头不清除
 * @param id
 */
function clearPaginationNoFields(id){
    $(".page_number_box01").removeEvent();
    $(".page_number_box01").empty();
    $("#"+id).nextAll().remove();
}

/**
 * 清除分页和table内容 class可传入
 * @param id
 */
function clearPaginationNoFields_out(id,tabClass){
    $("."+tabClass).removeEvent();
    $("."+tabClass).empty();
    $("#"+id).nextAll().remove();
}