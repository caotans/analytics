var legendShowSize=4; //Echarts显示的图例个数
var maxPage=1;         //初始化最大页数
var currentPage=1;    //当前页码
var charObj={};
var ls = window.localStorage;
function hydata2(){
    $("#week").hide();
    $("#another").hide();
    $("#month").addClass("day_forecast");
    var defaultdatacode=$("#hydata").find(".china").find(" #hychina_jg .datacode").val();
    if(!defaultdatacode){
        defaultdatacode="";
    }
    $.ajax({
        type:"POST",
        dataType:"json",
        sync:false,
        url:"hytab",
//        url:"hydata2?datacode="+defaultdatacode ,
        success:function(data){
            for(var i=0;i<data.tabArrsize;i++) {
                 //去掉宏观数据tab   宏观模块已经实现该功能
                    if(data.tabArr[i].Name.indexOf("宏观数据")>0){continue;}
                if(i==0){
                    $("#hydata").append("<div class='btn-group' id='"+data.tabArr[i].IndustryDataCode+"'>"+"<button style='cursor:default' type='button'  id='tabselected' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>"+data.tabArr[i].Name+ "<span class='caret'></span></button>"+"<ul class='dropdown-menu' role='menu'></ul></div>");
                }else{
                    $("#hydata").append("<div class='btn-group' id='"+data.tabArr[i].IndustryDataCode+"'>"+"<button style='cursor:default' type='button'  id='' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>"+data.tabArr[i].Name+ "<span class='caret'></span></button>"+"<ul class='dropdown-menu' role='menu'></ul></div>");
                }
                var xh=0;
                for(var j=0;j<data.subtabArrsize;j++){
                    if(data.tabArr[i].IndustryDataCode==data.subtabArr[j].ParentCode){
                        $("#"+data.subtabArr[j].ParentCode).find("ul").append("<li><a onclick=\'clickCode(\""+data.subtabArr[j].IndustryDataCode+"\",0,01101);\'><input type='hidden' class='datacode' value='"+data.subtabArr[j].IndustryDataCode+  "'/>"+data.subtabArr[j].Name+"</a></li>");
                        if(xh==0&&i==0){
                           // alert(data.subtabArr[j].IndustryDataCode);
                            clickCode(data.subtabArr[j].IndustryDataCode,1,1);
                        }
                        xh++;
                    }

                }
            }
            $("#hydata").append("<div class='clearfix'></div>");
            $("#hydata").find(".btn-group:first").addClass("selected");
        }
    });
    //点击时间维度控件（日周月等）出发的事件
    $('#day_box span').click(function(){
        $(this).addClass('day_forecast');
        $(this).siblings().removeClass('day_forecast');
        var timetype=$(this).text();
        if(timetype=='月'){
            timetype='month';
        }else if(timetype=='周'){
            timetype='week';
        }else if(timetype=='日'){
            timetype='day';
        }else if(timetype=='年'){
            timetype='year';
        }
        var datacode=$("#hydata").find(".btn-group").find(" #hychina_jg .datacode").val();
        var tabName= $("#hydata").find(".btn-group").find(" #hychina_jg ").text();
        currentPage=currentPage-1;
        loadajax(datacode,timetype,currentPage);
        ls.setItem("hydata",JSON.stringify(charObj));
        ga('send','event',{
            'eventCategory':'维度点击',
            'eventAction':selprdname+'-行业数据-'+tabName+"-"+timetype
        });
    })

    //点击查看详情进入详情页
    $("#hydetails").click(function(){
        ls.setItem("hyDetailsLegend",JSON.stringify(charObj));   //将图例的选中信息保存到localStorage中
        var datacode=$("#hydata").find(".btn-group").find(" #hychina_jg .datacode").val();
        var timetype=$('#day_box').find('.day_forecast').text();
        if(timetype=="月"){
            timetype="month";
        }else if(timetype=="日"){
            timetype="day";
        }  else if(timetype=="年"){
            timetype="year";
        }     else if(timetype=="周"){
            timetype="week";
        }
        var tabName= $("#hydata").find(".btn-group").find(" #hychina_jg ").text();
        ga('send','event',{
            'eventCategory':'历史数据点击',
            'eventAction':selprdname+'-行业数据-'+tabName+"-"+timetype+'-历史数据'
        });
        $(this).attr("href","hydataDetails?datacode="+datacode+"&timetype="+timetype);
    })

}
function clickSubType(code){
    $("#"+code).find("button").attr('id',"tabselected");
    $("#"+code).siblings().find("button").attr('id',"");
    $("#"+code).find("li:first").attr('id','hychina_jg');
    $("#"+code).find("li:first").siblings().attr('id','');
    $("#"+code).siblings().find('li').attr('id','');
   var timetype=$('#day_box').find('.day_forecast').text();
    var datacode=$("#"+code).find('#hychina_jg .datacode').val();
    if( $("#"+code).find('.btn').text()=='纺织行业'){
        $("#week").show();
        $("#week").addClass('day_forecast');
        $("#week").siblings().removeClass('day_forecast');
    }
    else if($("#"+code).find('.btn').text()!='纺织行业'){
        $("#month").addClass('day_forecast');
        $("#week").removeClass('day_forecast');$("#week").hide();
        if($('#month').attr('class')==$('#year').attr('class')){$('#month').attr('class','');}
    }
     loadajax(datacode,timetype);
};

//点击‘换一批’事件
      $("#anotherClick").click(function(){
          var datacode=$("#hychina_jg").find(".datacode").val();
          clickCode(datacode,1,currentPage);
      });

//点击tab下的副级tab事件
function clickCode(datacode,type,curpage){
    if(!type){charObj=null;}
    $("input[value='"+datacode+"']").parents('li').attr('id','hychina_jg');
    $("input[value='"+datacode+"']").parents('li').siblings().attr('id','');
    $("input[value='"+datacode+"']").parents('.btn-group').siblings().find('li').attr('id','');

    $("input[value='"+datacode+"']").parents('.btn-group').find("button").attr("id","tabselected");
    $("input[value='"+datacode+"']").parents('.btn-group').siblings().find("button").attr("id","");

    $("input[value='"+datacode+"']").parents('.btn-group').addClass("selected");
    $("input[value='"+datacode+"']").parents('.btn-group').siblings().removeClass("selected");

    var timetype=$('#day_box').find('.day_forecast').text();
    if(timetype=='月'){
        timetype='month';
    }else if(timetype=='周'){
        timetype='week';
    }else if(timetype=='日'){
        timetype='day';
    }else if(timetype=='年'){
        timetype='year';
    }
    var parenttype=$("input[value='"+datacode+"']").parents('.btn-group').find('button').text();
//    if(parenttype!='纺织行业'){
//        $("#week").attr('class','').hide();
//        $("#month").attr('class','day_forecast');
//        if($("#month").attr("class")==$("#year").attr("class")){$("#month").attr("class","")}
//    }
     timetype=$('#day_box').find('.day_forecast').text();
    if(timetype=='月'){
        timetype='month';
    }else if(timetype=='周'){
        timetype='week';
    }else if(timetype=='日'){
        timetype='day';
    }else if(timetype=='年'){
        timetype='year';
    }
    var tabName= $("#hydata").find(".btn-group").find(" #hychina_jg ").text();
    ga('send','event',{
        'eventCategory':'tab点击',
        'eventAction':selprdname+'-行业数据-'+tabName+"-"+timetype
    });
    loadajax(datacode,timetype,curpage);
};

function clickAnother(){
    var datacode=$("#hychina_jg").find(".datacode").val();
    clickCode(datacode,1,currentPage);
}
function loadHydata(data,myChart_hydata,curPage){
        // 换一批
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

    var mould_option=initOption4();
    //解析后台的数据
    var legendData=[];
    var totalData=[];
    var xData=[];
    xData=findTimeDate("datatime","data",data.seriesData);
    xData=sortArray3(xData,0,'asc');
    for(var z=0;z<data.legends.length;z++){
        var tempData="-";
        legendData.push(data.legends[z].name);
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
                  symbol:0|0 ,
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
              var lineobject={
                  name:data.legends[z].name,
                  type:"line",
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
                  calculable:false,
                  yAxisIndex:0,
                  zlevel:1,
                  boundaryGap:false //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
              };
              var pieobject={
                  name:data.legends[z].name,
                  data:array ,
                  type:'line',
                  smooth:true,
                  clickable:false,
                  calculable:false,
                  symbolSize: 0|0,
                  boundaryGap:false,
                  itemStyle: {normal: {areaStyle: {type: 'default'}}}
              };
              var pieobject1={
                  name:data.legends[z].name,
                  data:array ,
                  type:'line',
                  smooth:true,
                  clickable:false,
                  calculable:false,
                  yAxisIndex:1,
                  symbolSize: 0|0,
                  boundaryGap:false,
                  itemStyle: {normal: {areaStyle: {type: 'default'}}}
              };
              var object;
              var y1;
              var y0;
              if(data.legends[z].name.indexOf("指数")>0||data.legends[z].name.indexOf("金额")>0||data.legends[z].name.indexOf("价格")>0||data.legends[z].name.indexOf("率")>0||data.seriesData[z][0].unit=='%')
              {
                  object=lineobject;
                  y1=data.seriesData[z][0].unit;
                  if(y1=='-'){y1=" ";}
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
                   else if(data.legends[z].name.indexOf('包装专用设备')>=0){
                       y1=data.seriesData[z][0].unit;
                       object=barobject1;
                   }
                   else{
                      object=barobject;
                      y0=data.seriesData[z][0].unit;
                  }

              }

              if(data.legends[z].name.indexOf("面积")>0){
                  object=pieobject;
              }

         var code=$("#hychina_jg .datacode").val();
         if(code=='CEIC002-001'){
             mould_option.title={
//                 text:'数\n据\n来\n源\n .\n国\n家\n统\n计\n局',
                 text:'数据来源:国家统计局',
                 textStyle :{fontSize :12},
                 fontWeight: 'bolder',
                 color: '#333',
                 x:'center',
                 y:'top',
                 textAlign:'center'
             }
         }

             }
          totalData.push(object);
          }
        mould_option.xAxis[0].data=xData;
        mould_option.legend.data=legendData;
        mould_option.yAxis[1].name=y1;
        mould_option.series=totalData;
        mould_option.yAxis[0].scale=true;
        mould_option.yAxis[1].scale=true;
        mould_option.yAxis[1].scale=true;
        mould_option.yAxis[0].axisLabel.formatter=null;
        mould_option.yAxis[0].name=y0;
        if((y1==undefined||y1==null||y1.length<=0)&&y0!=null){
            if(object.type=="line"){
                mould_option.xAxis[0].boundaryGap=false; //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
            }
        }
    myChart_hydata.on(echarts.config.EVENT.LEGEND_SELECTED,function(e){
        charObj = e.selected;
        var timetype=$('#day_box').find('.day_forecast').text();
        var tabName= $("#hydata").find(".btn-group").find(" #hychina_jg ").text();
        ga('send','event',{
            'eventCategory':'图例(Legend)点击',
            'eventAction':selprdname+'-行业数据-'+tabName+"-"+timetype
        });
    });
        if(charObj){
            mould_option.legend.selected=charObj;
        }
        myChart_hydata.hideLoading();
        myChart_hydata.setOption(mould_option,true);


//    ls.setItem("hydata",JSON.stringify(charObj.selected));
        window.addEventListener("resize", function (){
            myChart_hydata.resize();
        });






}
  function loadajax(datacode,timetype,curpage){
      var myChart_hydata = echarts.init(document.getElementById('tb_hydata'));
      myChart_hydata.clear();
      myChart_hydata.showLoading({
          text: '正在努力的读取数据中...',    //loading话术
          effect: 'whirling'
      });
      $.ajax({
          type:"POST",
          dataType:"json",
          url:"hydata2",
          data:"datacode="+datacode+"&timetype="+timetype,
          success:function(data){
//                alert('success');
              if(data.legends.length){loadHydata(data,myChart_hydata,curpage);}
              else{
                  myChart_hydata.clear();
                  myChart_hydata.showLoading({
                      effect:'bubble',
                      text : '暂无数据',
                      textStyle :{fontSize : 20 ,color : '#404040'},
                      effectOption:{backgroundColor: '#fefefe'}
                  });
              }
          }
      });
  }