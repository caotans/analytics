   var   dataSource=[];

   var DownloadElse;
function firstLoding_chuanqiDt(type,detailCurrentCycleStr,otherDownload){
    if(otherDownload){
        DownloadElse=otherDownload;
    }
    $("#detailCurrentCycleStr").val(detailCurrentCycleStr);
    var productCode=$("#productCode").val();
    dataSource=[];

    $.ajax({
        type:"POST",
        dataType:"json",
        async:false,
        url:"deviceShipmentFindTime?type="+type+"&productCode="+productCode,
        success:function(data){
            $("#kjExpectedStartTime").val(data.jsonArray[2][0].KjExpectedStart);  //扩建开始限制日期
            $("#kjExpectedEndTime").val(data.jsonArray[2][0].KjExpectedEnd);  //扩建结束限制日期
            if(type=='jx'){
                name="tcjxDtTable";
            }else if(type=='kj'){
                name="kjgtDtTable";
            }else if(type=='cq'){
                name="cqDtTable";
            }

            clearPaginationNoFields(name); //清除表格和分页

            if(type=='jx'){
                var startTime=$("#startTime").val();
                var endTime=$("#endTime").val();
                if(startTime==''){
                    $('#startTime').datepicker('setDate',data.jsonArray[0][0].JxsStartTime);
                }
                if(endTime==''){
                    var jxEndTime=$("#jxEndTime").val();
                    $('#endTime').datepicker('setDate',jxEndTime);
                    //$('#endTime').datepicker('setDate',data.endTime);
                }
            }else if(type=='cq'){
                var cqStartTime=$("#cqStartTime").val();
                if(cqStartTime==''){
                    $('#cqStartTime').datepicker('setDate',data.jsonArray[1][0].CqExpectedStard);
                }
                var cqEndTime=$("#cqEndTime").val();
                if(cqEndTime==''){
                    $('#cqEndTime').datepicker('setDate',data.jsonArray[1][0].CqExpectedEnd);
                }
            }else if(type=='kj'){
                var kjStartTime=$("#kjStartTime").val();
                if(kjStartTime==''){
                    $('#kjStartTime').datepicker('setDate',data.jsonArray[2][0].KjStartTime);
                    $('#kjEndTime').datepicker('setDate',"");
                }
            }
        }
    });

    if(!type){
        type=$("#selectDeviceShipMentDetails").val();
    }else{
        $("#selectDeviceShipMentDetails").val(type);
    }

    getDeviceShipData(type,detailCurrentCycleStr);

    ga('send', 'event', {
        'eventCategory': '装置/船期详情_tab点击',
        'eventAction': '装置/船期详情'
    });
}

//获取数据
function getDeviceShipData(type,detailCurrentCycleStr){
    var productCode=$("#productCode").val();
    var startTime;
    var endTime;

    if(type=='jx'){
        $("#tcjxSelect").show();
        $("#cqSelect").hide();
        $("#kjgtSelect").hide();
        $("#jx").addClass("details_nav_selected");
        $("#cq").removeClass("details_nav_selected");
        $("#kj").removeClass("details_nav_selected");
        $("#tcjxTab").show();
        $("#cqTab").hide();
        $("#kjgtTab").hide();
         startTime = $("#startTime").val();
         endTime = $("#endTime").val();
    }else if(type=='cq'){
        $("#tcjxSelect").hide();
        $("#cqSelect").show();
        $("#kjgtSelect").hide();
        startTime = $("#cqStartTime").val();
        endTime = $("#cqEndTime").val();
        $("#jx").removeClass("details_nav_selected");
        $("#cq").addClass("details_nav_selected");
        $("#kj").removeClass("details_nav_selected");
        $("#tcjxTab").hide();
        $("#cqTab").show();
        $("#kjgtTab").hide();
    }else if(type=='kj'){
        $("#tcjxSelect").hide();
        $("#cqSelect").hide();
        $("#kjgtSelect").show();
        $("#jx").removeClass("details_nav_selected");
        $("#cq").removeClass("details_nav_selected");
        $("#kj").addClass("details_nav_selected");
        $("#tcjxTab").hide();
        $("#cqTab").hide();
        $("#kjgtTab").show();
        startTime = $("#kjStartTime").val();
        endTime = $("#kjEndTime").val();
    }

    var filter=selectByDeviceShipName(detailCurrentCycleStr);

    var  myChart_dslDt = echarts.init(document.getElementById('showDeviceShipmentDetails'));
    myChart_dslDt.clear();
    myChart_dslDt.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    $.ajax({
            type:"POST",
            url:"deviceShipmentDetail?type="+type+"&filter="+filter+"&detailCurrentCycleStr="+detailCurrentCycleStr+"&startTime="+startTime+"&endTime="+endTime+"&productCode="+productCode,
            success:function(data){
                var name="";
                var showContent="";
                if(type=='jx'){
                    name="tcjxDtTable";
                }else if(type=='kj'){
                    name="kjgtDtTable";
                }else if(type=='cq'){
                    name="cqDtTable";
                }

                clearPaginationNoFields(name); //清除表格和分页

                $("#showDeviceShipmentDetails").html(data);
                if(dataSource==null||dataSource==undefined){
                    var html="";
                    $("#"+name).nextAll().remove();
                    if(type=='jx'){
                        showContent="无停车检修";
                        html="<tr style='height:400px; top:35px; left:0; width:400px;'>" +
                            "<th colspan='9' style='text-align: center;font-size: 16px;'>"+showContent+"</th>" +
                            "<th></th>" +
                            "<th></th>" +
                            "<th></th>" +
                            "<th></th>" +
                            "<th></th>" +
                            "<th></th>" +
                            "<th></th>" +
                            "</tr>";
                    }else if(type=='cq'){
                        showContent="无船期";
                        html="<tr style='height:400px; top:35px; left:0; width:400px;'>" +
                        "<th colspan='7' style='text-align: center;font-size: 16px;'>"+showContent+"</th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "<th></th>" +
                        "</tr>" ;
                    }else if(type=='kj'){
                        showContent="无扩建/关停";
                        if(productCode=='330-130'){ //SM
                            html="<tr style='height:400px; top:35px; left:0; width:400px;'>" +
                                "<th colspan='5' style='text-align: center;font-size: 16px;'>"+showContent+"</th>" +
                                "</tr>";
                        }else{
                            html="<tr style='height:400px; top:35px; left:0; width:400px;'>" +
                                "<th colspan='8' style='text-align: center;font-size: 16px;'>"+showContent+"</th>" +
                                "<th></th>" +
                                "<th></th>" +
                                "<th></th>" +
                                "<th></th>" +
                                "<th></th>" +
                                "<th></th>" +
                                "</tr>";
                        }

                    }

                    $("#"+name).after(html);
                }else{
                    //时间倒序
                    if(type=='jx'){
                        deviceShipmentDetailsSort('','ExpectedStart',name)
                    }else if(type=='kj'){
                        deviceShipmentDetailsSort('','ExpectedEnd',name)
                    }else if(type=='cq'){
                        deviceShipmentDetailsSort('','timeETA',name)
                    }
                }
                myChart_dslDt.hideLoading();
            }
        }
    );

}

   function selectByDeviceShipName(currentCycleStr){
       var producerJson = {};
       var filter = "";

       if(currentCycleStr!=null&&currentCycleStr!=""){
           if(currentCycleStr=='domestic'){   //国内
               producerJson.LeftPart = "CountryCode";
               producerJson.RightPart = "CN";
               producerJson.Mode = 4;
           }else if(currentCycleStr=='international'){    //国际
               producerJson.LeftPart = "CountryCode";
               producerJson.RightPart = "'CN'";
               producerJson.Mode = 5;
           }
       }
       filter = JSON.stringify(producerJson);
       filter =  encodeURI(encodeURI(filter));
       return filter;

   }


   //查询
function searchShipMentDetail(){
    var type=$("#selectDeviceShipMentDetails").val();
    var detailCurrentCycleStr=$("#detailCurrentCycleStr").val();
    getDeviceShipData(type,detailCurrentCycleStr);
}

/**
 * 对数据源进行排序
 * @param array
 * @param field
 * @param order
 */
function deviceShipmentDetailsSort(obj,field,name){
    var productCode=$("#productCode").val();
    if(dataSource){
        var order = getSortOrder(obj);
        dataSource= sortArray(dataSource,field,order);
        clearPaginationNoFields(name); //清除表格和分页
        var filedArray;
        if(name=='tcjxDtTable'){
            var levelProduce;
            if(productCode=='380-030'){  //PE
                filedArray=['factory','Name','LineNumber','recordType','recordState','Capacity','ProductionImpact','ExpectedStart','ExpectedEnd'];
                loadInitPaginationData_tcjxDt(1,name,filedArray);
            }else if( productCode=='380-060'){  //PP
                filedArray=['factory','LineNumber','recordType','recordState','Capacity','ProductionImpact','ExpectedStart','ExpectedEnd'];
                loadInitPaginationData_tcjxDt(1,name,filedArray);
            }else{
                filedArray=['factory','recordType','recordState','Capacity','ProductionImpact','ExpectedStart','ExpectedEnd'];
                loadInitPaginationData_tcjxDt(1,name,filedArray);
            }
        }else if(name=='kjgtDtTable'){
            if(productCode=='380-030'){  //PE
                filedArray=['ExpectedEnd','factory','Name','LineNumber','recordType','recordState','ExtendCapacity','ProductionImpact'];
                loadInitPaginationData2(1,name,filedArray);
            }else if(productCode=='380-060'){  //PP
                filedArray=['ExpectedEnd','factory','LineNumber','recordType','recordState','ExtendCapacity','ProductionImpact'];
                loadInitPaginationData2(1,name,filedArray);
            }else if(productCode=='330-130'){   //SM
                filedArray=['ExpectedEnd','factory','recordType','recordState','ExtendCapacity'];
                loadInitPaginationData2(1,name,filedArray);
            }else{
                filedArray=['ExpectedEnd','factory','recordType','recordState','ExtendCapacity','ProductionImpact'];
                loadInitPaginationData2(1,name,filedArray);
            }

        }else if(name=='cqDtTable'){
            filedArray=['timeETA','Name','VesselName','Quantity','departureCountry','city','Remark'];
            loadInitPaginationData2(1,name,filedArray);
        }
        $(".page_number_box01").createPage({
            pageCount:dataSource.length,
            current:1,
            backFn:function(p){
                loadInitPaginationData2(p,name,filedArray);
            }
        });
        commonSort(obj);
    }
}

function getCurrDate(){
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var day = time.getDate();
    var startDate = (year-1)+"-"+month+"-"+day;
    var endDate = year+"-"+month+"-"+day;
    $('#startTime').datepicker('setDate',startDate);
    $('#endTime').datepicker('setDate',endDate);
   }


