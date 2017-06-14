var legendShowSize=4;
var maxPage=1;
var currentPage=1;
var dataSource=[];
var xh=[];//竖排表格取消选中的列数
var titleArray=[];//列表表头
var hyDetalisLegend={};
function hydatadetails(){
    var myChart_hydata = echarts.init(document.getElementById('hydataDetailsEcharts'));
    myChart_hydata.clear();
    myChart_hydata.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    var  predatacode=$("#predatacode").val();
    var  pretimetype=$("#pretimetype").val();
    if(pretimetype=="month"){
        $("#month").attr('class','hdclickdaybox');
        // 时间控件默认选上
        $('#hydataDetailsCalendarStart').datepicker('setDate',getSomeYear(1));
        $('#hydataDetailsCalendarEnd').datepicker('setDate',getNowDate());
    }
        else if(pretimetype=="year"){
        $("#hydataDetailsCalendarStart").datepicker('setDate',getSomeYear(4));
        $("#hydataDetailsCalendarEnd").datepicker('setDate',getNowDate());
        $("#year").attr('class','hdclickdaybox');

    }
    else{
        $("#hydataDetailsCalendarStart").datepicker('setDate',getSomeDate(30));
        $("#hydataDetailsCalendarEnd").datepicker('setDate',getNowDate());
        $("#week").attr('class','hdclickdaybox');

    }
    var startdate= $("#hydataDetailsCalendarStart").val();
    var enddate= $("#hydataDetailsCalendarEnd").val();

    $.ajax({
        type:"POST",
        dataType:"json",
//        url:"hydetail?datacode="+predatacode+"&startdate="+startdate+"&enddate="+enddate ,
        url:"hytab" ,
            success:function(data){
                for(var i=0;i<data.tabArrsize;i++) {
                    //去掉宏观数据
                    if(data.tabArr[i].Name.indexOf("宏观数据")>0){continue;}
                    $("#hydatadetails").append("<div class='btn-group' id='"+data.tabArr[i].IndustryDataCode+"'>"+"<button style='cursor:default' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>"+data.tabArr[i].Name+ "<span class='caret'></span></button>"+"<ul class='dropdown-menu' role='menu'></ul></div>");
                }
                $("#hydatadetails").append("<div class='clearfix'></div>");
                for(var j=0;j<data.subtabArrsize;j++){
                    $("#"+data.subtabArr[j].ParentCode).find("ul").append("<li><a onclick=\'clickCode(\""+data.subtabArr[j].IndustryDataCode+"\",0,01101);\'><input type='hidden' class='datacode' value='"+data.subtabArr[j].IndustryDataCode+  "'/>"+data.subtabArr[j].Name+"</a></li>");
                }
                clickCode(predatacode,1,01101);
//                ls.setItem("hydata",JSON.stringify(null));
                $("#hydata").find(".btn-group:first").addClass("selected");
             $("input[value='"+predatacode+"']").parents("li").attr('id','hdchina_jg');
             $("input[value='"+predatacode+"']").parents('.btn-group').find("button").attr("id","tabselected");
//            loadHydata(data,myChart_hydata);
        }
    });
    $('#day_box span').click(function(){
        $(this).addClass('hdclickdaybox');
        $(this).siblings().removeClass('hdclickdaybox');
        var startdate= $("#hydataDetailsCalendarStart").val();
        var enddate= $("#hydataDetailsCalendarEnd").val();
        var datacode=$("#hydatadetails").find(" #hdchina_jg .datacode").val();
        var timetype=$("#day_box").find('span.hdclickdaybox').text();
        var tabName=$("#hydatadetails").find(" #hdchina_jg .datacode").text();
        ga('send','event',{
            'eventCategory':'维度点击',
            'eventAction':selprdname+'-行业数据历史数据'+tabName+"-"+timetype
        });
             currentPage=currentPage-1;
        loadajax(datacode,timetype,startdate,enddate,currentPage);
    })
        }




function clickserrch(){
    var startdate= $("#hydataDetailsCalendarStart").val();
    var enddate= $("#hydataDetailsCalendarEnd").val();
    var timetype=$("#day_box").find('span.hdclickdaybox').text();
    var datacode=$("#hydatadetails").find(" #hdchina_jg .datacode").val();
    var tabName=$("#hydatadetails").find(" #hdchina_jg .datacode").text();
    ga('send','event',{
        'eventCategory':'搜索点击',
        'eventAction':selprdname+'-行业数据历史数据'+tabName+"-"+timetype
    });
    loadajax(datacode,timetype,startdate,enddate,01101);
}
    function clickAnother(){
        var datacode=$("#hdchina_jg").find(".datacode").val();
        clickCode(datacode,1,currentPage);
    }

function clickCode(datacode,type,curPage){
    if(!type){
       hyDetalisLegend=null;
    }
    $("#week").attr('class','').hide();
    var parenttype=$("input[value='"+datacode+"']").parents('.btn-group').find('button').text();
    $("input[value='"+datacode+"']").parents('li').attr('id','hdchina_jg');
    $("input[value='"+datacode+"']").parents('li').siblings().attr('id','');
    $("input[value='"+datacode+"']").parents('.btn-group').siblings().find('li').attr('id','');

    $("input[value='"+datacode+"']").parents('.btn-group').find("button").attr("id","tabselected");
    $("input[value='"+datacode+"']").parents('.btn-group').siblings().find("button").attr("id","");
    if(parenttype!='纺织行业'){
        $("#week").attr('class','').hide();
        $("#month").attr('class','hdclickdaybox');
        if($("#month").attr("class")==$("#year").attr("class")){$("#month").attr("class","")}
    }
//    else{
//         $("#week").show();
//    }
    var startdate= $("#hydataDetailsCalendarStart").val();
    var enddate= $("#hydataDetailsCalendarEnd").val();
    var timetype=$("#day_box").find('span.hdclickdaybox').text();
    var timetype=$("#day_box").find('span.hdclickdaybox').text();
    var timetype=$("#day_box").find('span.hdclickdaybox').text();
    var tabName=$("#hydatadetails").find(" #hdchina_jg .datacode").text();
    ga('send','event',{
        'eventCategory':'tab点击',
        'eventAction':selprdname+'-行业数据历史数据'+tabName+"-"+timetype
    });
    loadajax(datacode,timetype,startdate,enddate,curPage);
};



function loadajax(datacode,timetype,startdate,enddate,curPage){
    var type="";
    if(timetype=="月"){
        type="month";
    }else if(timetype=="年"){
        type="year";
    } else if(timetype=="周"){
        type="week";
    }
    //掐头去尾
    var returnTime= getTimeDate(startdate,enddate,type);
    if(returnTime&&returnTime.status!="error"){
        startdate=returnTime.status;
        enddate=returnTime.info;
    }else if(returnTime&&returnTime.status=="error"){
        alert(returnTime.info);
        return false;

    }
    var myChart_hydata = echarts.init(document.getElementById('hydataDetailsEcharts'));
    myChart_hydata.clear();
    myChart_hydata.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    clearPaginationNoFields('hydataDetailsTable'); //清除表格和分页
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"hydetail?datacode="+datacode+"&timetype="+type+"&startdate="+startdate+"&enddate="+enddate,
        success:function(data){
            if(data.legends.length){
                loadHydata(data,myChart_hydata,datacode,curPage);
//            initPagination('hydataDetailsTable',dataSource.length);
                titleArray=["日期"];
//                if(datacode.indexOf("CEIC011")!=-1){
//                    var tempArray=[];
//                    var tempArray2=[];
//                    for(var i=0;i<data.legends.length;i++){
//                        if(data.legends[i].disabled!="1"){
//                            tempArray.push(data.legends[i].name);
//                            } else{
//                            tempArray2.push(data.legends[i].name);
//                            }
//
//
//                    }
//                    Array.prototype.push.apply(tempArray,tempArray2);
//                    Array.prototype.push.apply(titleArray,tempArray);
//                } else{
                    Array.prototype.push.apply(titleArray,myChart_hydata.getOption().legend.data);
               // }

                if(hyDetalisLegend){
                    var i=1; //时间是第一列所以这里应该是1开始
                    xh=[];
                    for(var x in hyDetalisLegend){
                        if(hyDetalisLegend[x]==false){
                            xh.push(i);
                        }
                        i++;
                    }
//                    xh.push('1');
                    initPagination2(titleArray,'hydataDetailsTable',dataSource.length,xh,"desc=0");
                } else{
                    initPagination2(titleArray,'hydataDetailsTable',dataSource.length,"","desc=0");
                }

            }
            else{
                myChart_hydata.clear();
                myChart_hydata.showLoading({
                    effect:'bubble',
                    text : '暂无数据',
                    textStyle : {fontSize : 20 ,color : '#404040'},
                    effectOption: {backgroundColor: '#fefefe'}
                });
            }
        }
    });
}
function loadHydata(data,myChart_hydata,datacode,curPage){
    $("#another").hide();
       //换一批
//    if(legendShowSize<data.legends.length){
//        $("#another").show();
//    }
//    else{
//        $("#another").hide();
//    }
    if(curPage==01101){currentPage=1;}
    else{
        currentPage=currentPage+1;
    }
    maxPage=Math.ceil(data.legends.length/legendShowSize);
//    alert("curpage:"+curPage+"maxpage:"+maxPage);
    if(curPage>maxPage){currentPage=2;curPage=1}
    if(curPage==0){curPage=1;};
    var startIndex=(curPage-1)*legendShowSize;
    var endIndex=curPage*legendShowSize;
    if(startIndex>data.legends.length){
        startIndex=0;
        endIndex=legendShowSize;
    }
    if(endIndex>data.legends.length){
        endIndex=data.legends.length;
    }
    var mould_option=initOption3();
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    var size=0;
    var sizeindex=0;
    var tempArray=[];
    var xData=[];
    var xh=0;
    xData=findTimeDate("datatime","data",data.seriesData);
    xData=sortArray3(xData,0,'asc');
    for(var z=0;z<data.legends.length;z++){
        var tempData="-";
        xh++;
        legendData.push(data.legends[z].name);
        tempArray.push(data.seriesData[z]) ;
        var array=[];
        for(var i=0;i<xData.length;i++){
            if(data.seriesData[z]){

                var value="";
                for(var j=0;j<data.seriesData[z].length;j++){
                    if(data.seriesData[z][j].datatime==xData[i]){
                        value=data.seriesData[z][j].data;
                        tempData=value;
                    }
                }
                if(value==""||value==undefined){
                    array.push("");
                }else{
                    array.push(value);
                }
            }

        var barobject={
            name:data.legends[z].name,
            type:"bar",
            data:array,
            clickable:false,
            calculable:false,  //禁止拖拽图例
            symbol:0|0,
            barGap:0
        };
            var barobject1={
                name:data.legends[z].name,
                type:"bar",
                data:array ,
                symbol:'none',
                clickable:false,
                calculable:false,
                yAxisIndex:1,
                zlevel:1,
                boundaryGap:false //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
            };
            var lineobject0={
                name:data.legends[z].name,
                type:"line",
                data:array ,
                symbol:'none',
                clickable:false,
                calculable:false,  //禁止拖拽图例
                yAxisIndex:0,
                zlevel:1,
                boundaryGap:false //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
            };
            var pieobject1={
                name:data.legends[z].name,
                data:array ,
                type:'line',
                smooth:true,
                clickable:false,
                calculable:false,  //禁止拖拽图例
                yAxisIndex:1,
                symbolSize: 0|0,
                boundaryGap:false,
                itemStyle: {normal: {areaStyle: {type: 'default'}}}
            };
        var lineobject={
            name:data.legends[z].name,
            type:"line",
            data:array ,
            symbol:'none',
            clickable:false,
            calculable:false,  //禁止拖拽图例
            yAxisIndex:1 ,
            zlevel:1,            //设置层级关系：折线图在柱状图上一层
            boundaryGap:false   //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
        };
        var pieobject={
            name:data.legends[z].name,
            data:array ,
            type:'line',
            smooth:true,
            clickable:false,
            calculable:false,  //禁止拖拽图例
            symbolSize: 0|0,
            boundaryGap:false,
            itemStyle: {normal: {areaStyle: {type: 'default'}}}

        };

        var object;
        var y1;
        var y0;
        if(data.legends[z].name.indexOf("指数")>0||data.legends[z].name.indexOf("金额")>0||data.legends[z].name.indexOf("价格")>0||data.legends[z].name.indexOf("率")>0)
        {object=lineobject;
            y1=data.seriesData[z][0].unit;
            if(y1=='-'){y1=" ";}
        }
        else if(data.legends[z].name.indexOf("面积")>0){
              object=pieobject;
             y0=data.seriesData[z][0].unit;
        }
        else{
            if( data.legends[z].name=="持仓量"){
                object=pieobject1;
                y1=data.seriesData[z][0].unit;
                mould_option.xAxis[0].boundaryGap=false;
            }else if( data.legends[z].name=="结算价"){
                object=lineobject0;
                y0=data.seriesData[z][0].unit;
                mould_option.xAxis[0].boundaryGap=false;
            }
            else if(data.seriesData[z][0].unit=='%'){
                y1=data.seriesData[z][0].unit;
                object=lineobject;
            }
            else if(data.legends[z].name.indexOf('包装专用设备')>=0){
                y1=data.seriesData[z][0].unit;
                object=barobject1
            }
            else{object=barobject;
            y0=data.seriesData[z][0].unit;
            }
        }
        }
        totalData.push(object);
    }
    mould_option.xAxis[0].data=xData;
    mould_option.splitLine=false;
    mould_option.legend.data=legendData;
    mould_option.series=totalData;
    mould_option.yAxis[0].scale=true;
    mould_option.yAxis[1].scale=true;
    mould_option.yAxis[0].axisLabel.formatter=null;
    mould_option.yAxis[0].name=y0;
    mould_option.yAxis[1].name=y1;
    if((y1==undefined||y1==null||y1.length<=0)&&y0!=null){
        if(object.type=="line"){
            mould_option.xAxis[0].boundaryGap=false; //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
        }
    }

    myChart_hydata.hideLoading();
    window.onresize = myChart_hydata.resize;
    mould_option.toolbox.feature.savemsg.onclick=function(){
        var tabName=$("#tabselected").html().split("<")[0];
        var childName=$("#hdchina_jg").children("a").html().split(">")[1];
        exportEchatsImg(myChart_hydata,tabName+"_"+childName,mould_option);
    };
    mould_option.toolbox.feature.myTool.onclick=function(){
        var array=[dataSource];
        var legendlength=mould_option.legend.data.length;
        var titleName=[];
        var title=[titleArray[0]];
        for(var tlen=0;tlen<legendlength;tlen++){
            title.push(legendData[tlen]);
        }
        titleName.push(title);
        if(datacode.indexOf("CEIC011")!=-1){
            titleName=[[titleArray[0],legendData[0],legendData[1]]];
        }

        var typeselected=$("#hdchina_jg").text();
        var sheetName=new Array();
        sheetName[0]=typeselected;
        $("#titleName").val(JSON.stringify(titleName));
        $("#sheetName").val(JSON.stringify(sheetName));
        $("#excelArray").val(JSON.stringify(array));
        $('#hydetailExport').submit() ;
    }  ;
      if(hyDetalisLegend){
          mould_option.legend.selected = hyDetalisLegend;
      }
    myChart_hydata.setOption(mould_option,true);
    if(datacode.indexOf("CEIC011")!=-1){
        bandLegendClick(myChart_hydata,mould_option,2, tempArray);
        arrayToJson2(mould_option,tempArray,hyDetalisLegend);//将数据源转成表格所需要的数据源
    }else{
        bandLegendClick(myChart_hydata,mould_option,2,tempArray);
        arrayToJson2(mould_option,tempArray,hyDetalisLegend);//将数据源转成表格所需要的数据源
    }
 }

function clickSubType(code){
    var startdate= $("#hydataDetailsCalendarStart").val();
    var enddate= $("#hydataDetailsCalendarEnd").val();
    $("#"+code).find("button").attr('id',"tabselected");
    $("#"+code).siblings().find("button").attr('id',"");
    $("#"+code).find("li:first").attr('id','hdchina_jg');
    $("#"+code).find("li:first").siblings().attr('id','');
    $("#"+code).siblings().find('li').attr('id','');
    var timetype=$("#day_box").find('span.hdclickdaybox').text();
    var datacode=$("#"+code).find('#hdchina_jg .datacode').val();
    if( $("#"+code).find('.btn').text()=='纺织行业'){
        $("#week").show();
        $("#week").addClass('hdclickdaybox');
        $("#week").siblings().removeClass('hdclickdaybox');
    }
    else if($("#"+code).find('.btn').text()!='纺织行业'){
        $("#month").addClass('hdclickdaybox');
        $("#week").removeClass('hdclickdaybox');$("#week").hide();
        if($('#month').attr('class')==$('#year').attr('class')){$('#month').attr('class','');}
    }
    loadajax(datacode,timetype,startdate,enddate);

};




function arrayToJson2(mould_option,seriesData,names){

    var size=mould_option.xAxis[0].data.length;
    dataSource=[];
    if(names=="{}"&&!names){
        for(var i=0;i<size;i++){
            var temp=[];
            temp.push(seriesData.xAxis[0].data[i]);
            for(var j=0;j<mould_option.legend.data.length;j++){
                          var smallData=seriesData[j];
                          var flag=false;
                          for(var z=0;z<smallData.length;z++){
                              if(smallData[z].datatime==mould_option.xAxis[0].data[i]){
                                    temp.push(smallData[z].data);
                                  flag=true;
                                  break;
                              } else{
                                  flag=false;
                              }
                          }
                        if(!flag){
                            temp.push("");
                        }




            }
            dataSource.push(temp);
        }



    }else{
        for(var i=0;i<size;i++){
            var temp=[];
            temp.push(mould_option.xAxis[0].data[i]);
            for(var j=0;j<mould_option.legend.data.length;j++){
                var smallData=seriesData[j];
                var flag=false;
                for(var z=0;z<smallData.length;z++){
                    if(smallData[z].datatime==mould_option.xAxis[0].data[i]){
                        temp.push(smallData[z].data);
                        flag=true;
                        break;
                    } else{
                        flag=false;
                    }
                }
                 if(!flag){
                   temp.push("");
                }

            }
            dataSource.push(temp);
        }

        xh=[];
        var i=0;
        var increment=1;//前面有个时间列
        if(names)  {
            $.each(names,function(name,value) {
                if(!value){
                    xh.push(i+1);
                }
                i++;
            });
        }
    }
    dataSource= sortArray(dataSource,0,'desc');
}

function bandLegendClick(myChart_hydata,mould_option,type,seriesData){
    var ecConfig = echarts.config.EVENT;
    myChart_hydata.on(ecConfig.LEGEND_SELECTED,function(param){
        if(type==2){
            clickRefreshTable2(param.selected,mould_option,param.target,type,seriesData);
        }else{
            clickRefreshTable(param.selected,mould_option,param.target,type,seriesData);
        }
        var timetype=$("#day_box").find('span.hdclickdaybox').text();
        var tabName=$("#hydatadetails").find(" #hdchina_jg .datacode").text();
        ga('send','event',{
            'eventCategory':'图例(Legend)点击',
            'eventAction':selprdname+'-行业数据历史数据'+tabName+"-"+timetype
        });
        hyDetalisLegend=param.selected;
    });
}

/**
 * 点击图例或者取消图例刷新表格数据
 */
function clickRefreshTable(names,mould_option,target,seriesData){
    dataSource=[];
    var first=[];
    $("#hydataDetailsTable").nextAll().remove();
    $.each(names,function(name,value) {
        if(value==true){
            for(var i=0;i<mould_option.series.length;i++){
                if(name==mould_option.series[i].name){
                    for(var j=0;j<mould_option.series[i].data.length;j++){

                            if(target==name){
                                dataSource.unshift([seriesData[i][j].datatime,mould_option.series[i].name,seriesData[i][j].data]);
                            }else{
                                dataSource.unshift([seriesData[i][j].datatime,mould_option.series[i].name,seriesData[i][j].data]);
                            }



                    }
                }

            }
        }
    });
    Array.prototype.push.apply(dataSource,first);
    dataSource= sortArray(dataSource,0,'desc');
    clearPaginationNoFields('hydataDetailsTable'); //清除表格和分页
    initPagination('hydataDetailsTable',dataSource.length);

}

/**
 * 点击图例或者取消图例刷新表格数据
 */
function clickRefreshTable2(names,mould_option,target,type,seriesData){
    var temp=getSortOrder3("hydataDetailsTable");
    xh=[];
    var i=0;
    var increment=1;//前面有个时间列
    $.each(names,function(name,value) {
        if(!value){
            xh.push(i+1);
        }
        i++;
    });
    $("#hydataDetailsTable").nextAll().remove();
    clearPaginationNoFields('hydataDetailsTable'); //清除表格和分页
    initPagination2(titleArray,'hydataDetailsTable',dataSource.length,xh,temp);

}

/**
 * 对数据源进行排序
 * @param array
 * @param field
 * @param order
 */
function hydataDetailsSort(array,field,order){
    dataSource= sortArray(array,field,order);
    clearPaginationNoFields('hydataDetailsTable'); //清除表格和分页
    initPagination('hydataDetailsTable',dataSource.length);
}

/**
 * 对竖排数据源进行排序
 * @param array
 * @param field
 * @param order
 */
function upstreamDetailsSort2(obj,field,array){
    var timetype=$("#day_box").find('span.hdclickdaybox').text();
    var tabName=$("#hydatadetails").find(" #hdchina_jg .datacode").text();
    ga('send','event',{
        'eventCategory':'排序点击',
        'eventAction':selprdname+'-行业数据历史数据'+tabName+"-"+timetype
    });
    var order=getSortOrder2(obj);
    dataSource= sortArray(array,field,order);
    clearPaginationNoFields('hydataDetailsTable'); //清除表格和分页
    initPagination2(titleArray,'hydataDetailsTable',dataSource.length,xh,order+"="+field);

}


var exportExcel=function(){
    $("#excelArray").val(JSON.stringify(dataSource));
    $("#titleName").val("日期,类型,平均数据");
    $('#hyExport').submit() ;
}


