var myChart_dsl;

var dataSource = [];
var data_deviceShip = [];
var kJbtata_deviceShip = [];     //扩建、关停数据

function selectByCompanyName(currentCycleStr){
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

function firstLoding_chuanqi(type,productTabId,currentCycleStr){

    $("li[id^='device_']").each(function(i,element){
        var id=$(element).attr("id");
        if("device_"+type==id){
            $("#"+id).attr("class","china selected") ;
        } else{
            $("#"+id).attr("class","china");
        }
    });

    var tabName;
    var productCode=$("#productCode").val();
    $("#productTabId").val(productTabId);
    $("#currentCycleStr").val(currentCycleStr);
    $("#deviceShipTab").show();
    if(type=='jx'){
        $("#jx").addClass("china selected");
        $("#cq").removeClass("china selected");
        $("#kj").removeClass("china selected");
        $("#selectDeviceShipMentDetails").val("jx");
        tabName='装置/船期-停车检修';
    }else if(type=='cq'){
        $("#jx").removeClass("china selected");
        $("#cq").addClass("china selected");
        $("#kj").removeClass("china selected");
        $("#selectDeviceShipMentDetails").val("cq");
        tabName='装置/船期-船期';
    }else if(type=='kj'){
        $("#jx").removeClass("china selected");
        $("#cq").removeClass("china selected");
        $("#kj").addClass("china selected");
        $("#selectDeviceShipMentDetails").val("kj");
        tabName='装置/船期-扩建/关停';
    }

    var filter=selectByCompanyName(currentCycleStr);

    myChart_dsl = echarts.init(document.getElementById('deviceShipTab'));
    myChart_dsl.clear();
    myChart_dsl.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
        effect: 'whirling'
    });
    $("#jx_count").hide();
    $("#cq_count").hide();
    $("#kj_count").hide();
    $.ajax({
            type:"POST",
            dataType:"json",
            url:"getDeviceShipment?type="+type+"&productCode="+productCode+"&filter="+filter+"&currentCycleStr="+currentCycleStr,
            success:function(data){
                var tabData;
                if(type=='jx'){
                    tabData = data.tcjxArray;
                     data_deviceShip = tabData;
                    var xMaxData = [];
                    var xMinData = [];
                    xMaxData = sortArray(tabData,"ExpectedEnd","desc");
                    xMinData = sortArray(tabData,"ExpectedStart","asc");
                    var jxStartTime=xMinData[0]["ExpectedStart"];  //检修开始时间
                    var jxEndTime=xMaxData[0]["ExpectedEnd"];   //检修结束时间
                    $("#jxExpectedStart").val(data.jxExpectedStart);
                    $("#jxStartTime").val(jxStartTime);
                    $("#jxEndTime").val(jxEndTime);
                    myChart_dsl.hideLoading();
                    $("#deviceShipTab").hide();
                    $("#jx_count").show();
                }else if(type=='cq'){
                    tabData = data.cqArray;
                    data_deviceShip = tabData;
                    myChart_dsl.hideLoading();
                    $("#deviceShipTab").hide();
                    $("#cq_count").show();
                }else if(type=='kj'){
                    tabData = data.kjgtArray;
                    data_deviceShip = tabData;
                    kJbtata_deviceShip = tabData;
                    var ls = window.localStorage;
                    ls.setItem("kJbtata_deviceShip", JSON.stringify(kJbtata_deviceShip));
                    $("#kjExpectedStartTime").val(data.kjExpectedStartTime);
                    $("#kjExpectedEndTime").val(data.kjExpectedEndTime);
                    myChart_dsl.hideLoading();
                    $("#deviceShipTab").hide();
                    $("#kj_count").show();
                }
                writingDeviceShipTab(tabData,type,currentCycleStr);
            }
        }
    );

    ga('send', 'event', {
        'eventCategory': '装置/船期_tab点击',
        'eventAction': tabName
    });

}

function writingDeviceShipTab(data,type,currentCycleStr){
    var productCode=$("#productCode").val();
    var dslData =  data;
    var jxContent;
    var jxTr;
    var cqContent;
    var kjContent;
    if(dslData!='' && dslData!=null && dslData!='undefined'){
        for(var i=0;i<dslData.length;i++){
            if(i%2==0){
                jxTr = '<tr class="tb_content">';
            }else{
                jxTr = '<tr>';
            }
            if(type=='jx'){
                var FiducialOperationRate = dslData[i].FiducialOperationRate;
                if(FiducialOperationRate=='' || FiducialOperationRate==null){
                    FiducialOperationRate = '-';
                }else{
                    FiducialOperationRate = FiducialOperationRate+'%';
                }
                var levelProduce;   //级别
                if(productCode=='380-030'){  //PE
                    levelProduce='<th style="width:10%;">'+dslData[i].Name+'</th>'+'<th style="width:10%;">'+dslData[i].LineNumber+'</th>';
                }else if(productCode=='380-060'){    //PP
                    levelProduce='<th style="width:10%;">'+dslData[i].LineNumber+'</th>';
                }
                jxContent=jxContent+jxTr+
                    '<th style="width:10%;">'+dslData[i].factory+'</th>'+
                    levelProduce+
                    '<th style="width:10%;">'+dslData[i].recordType+'</th>'+
                    '<th style="width:10%;">'+dslData[i].recordState+'</th>'+
                 //   '<th style="width:12%;">'+FiducialOperationRate+'</th>'+
                    '<th style="width:10%;">'+dslData[i].Capacity+'</th>'+
                    '<th style="width:13%;">'+dslData[i].ProductionImpact+'</span></th>'+
                    '<th style="width:10%;">'+dslData[i].ExpectedStart+'</th>'+
                    '<th style="width:10%;">'+dslData[i].ExpectedEnd+'</th>'+
                    '</tr>';
            }else if(type=='cq'){
                cqContent =cqContent+jxTr+
                    '<th style="width:12%;">'+dslData[i].timeETA+'</th>'+
                  /*  '<th style="width:12%;">'+dslData[i].timeETD+'</th>'+*/
                    '<th style="width:12%;">'+dslData[i].Name+'</th>'+
                    '<th style="width:13%;">'+dslData[i].VesselName+'</th>'+
                    '<th style="width:10%;">'+dslData[i].Quantity+'</th>'+
                    '<th style="width:13%;">'+dslData[i].departureCountry+'</th>'+
                    '<th style="width:17%;">'+dslData[i].city+'</th>'+
                    '<th style="width:11%;">'+dslData[i].Remark+'</th>'+
                    '</tr>';
            }else if(type=='kj'){
                var levelProduce;
                var affectYield; //影响产量
                if(productCode=='380-030'){  //PE
                    levelProduce=  '<th style="width:13%;">'+dslData[i].Name+'</th>'+ '<th style="width:13%;">'+dslData[i].LineNumber+'</th>';
                }else if( productCode=='380-060'){  //PP
                    levelProduce=  '<th style="width:13%;">'+dslData[i].LineNumber+'</th>';
                }
                if(productCode=='330-130'){  //SM

                }else{
                    affectYield=  '<th style="width:13%;">'+dslData[i].ProductionImpact+'</th>';
                }
                kjContent =kjContent+jxTr+
                    '<th style="width:13%;">'+dslData[i].ExpectedEnd+'</th>'+
                    '<th style="width:13%;">'+dslData[i].factory+'</th>'+
                    levelProduce+
                    '<th style="width:13%;">'+dslData[i].recordType+'</th>'+
                    '<th style="width:13%;">'+dslData[i].recordState+'</th>'+
                    '<th style="width:13%;">'+dslData[i].ExtendCapacity+'</th>'+
                    affectYield+
                    '</tr>';
            }
        }

        if (type=='jx'){
            if(currentCycleStr=='domestic'){   //国内
                $("#tcjx_tab").html("");
                $("#tcjx_tab").html(jxContent);
            }else if(currentCycleStr=='international'){    //国际
                $("#tcjx_tab").html("");
                $("#tcjx_tab").html(jxContent);
            }else if(currentCycleStr==""||currentCycleStr==null||currentCycleStr==undefined){
                $("#tcjx_tab").html(jxContent);
            }
        }else if(type=='cq'){
            if(currentCycleStr=='domestic'){   //国内
                $("#cq_tab").html("");
                $("#cq_tab").html(cqContent);
            }else if(currentCycleStr=='international'){    //国际
                $("#cq_tab").html("");
                $("#cq_tab").html(cqContent);
            }else if(currentCycleStr==""||currentCycleStr==null||currentCycleStr==undefined){
                $("#cq_tab").html(cqContent);
            }
        }else if(type=='kj'){
            if(currentCycleStr=='domestic'){   //国内
                $("#kjgt_tab").html("");
                $("#kjgt_tab").html(kjContent);
            }else if(currentCycleStr=='international'){    //国际
                $("#kjgt_tab").html("");
                $("#kjgt_tab").html(kjContent);
            }else if(currentCycleStr==""||currentCycleStr==null||currentCycleStr==undefined){
                $("#kjgt_tab").html(kjContent);
            }
        }

    }else{
        if (type=='jx'){
            $("#tcjx_tab").html("<div style='height:225px; top:35px; left:0; width:100%; text-align: center;vertical-align:middle;display: table-cell;'>无停车检修</div>");
        }else if(type=='cq'){
            $("#cq_tab").html("<div style='height:225px; top:35px; left:0; width:100%; text-align: center;vertical-align:middle;display: table-cell;'>无船期</div>");
        }else if(type=='kj'){
            $("#kjgt_tab").html("<div style='height:225px; top:35px; left:0; width:100%; text-align: center;vertical-align:middle;display: table-cell;'>无扩建/关停</div>");
        }

    }


}
/**
 * 对数据源进行排序
 * @param array
 * @param field
 * @param order
 */
function deviceShipmentSort(obj,field){
    var currentCycleStr=$("#currentCycleStr").val();
    var order=commonSort2(obj);
    if(data_deviceShip){
        data_deviceShip= sortArray(data_deviceShip,field,order);
        writingDeviceShipTab(data_deviceShip,$("#selectDeviceShipMentDetails").val(),currentCycleStr);
    }
    var orderDesc;
    if(order='asc'){
        orderDesc='升序';
    }else{
        orderDesc='降序';
    }
    ga('send', 'event', {
        'eventCategory': '排序功能',
        'eventAction': '装置船期'+orderDesc+"排序"
    });
}

/**
 * 跳转到首页相同的详情页
 */
function jumptToDeviceShipmentDetails(){

    ga('send', 'event', {
        'eventCategory': 'tab点击',
        'eventAction': '装置/船期历史数据'
    });

    var currentCycleStr=$("#currentCycleStr").val();    //国内或者国际
    var type=$("#selectDeviceShipMentDetails").val();
    var productCode=$("#productCode").val();
    var productTabId=$("#deviceProductTabId").val();
    var deviceModuleId=$("#deviceModuleId").val();
    var jxStartTime=$("#jxStartTime").val();
    var jxExpectedStart=$("#jxExpectedStart").val();
    var jxEndTime=$("#jxEndTime").val();
    var kjExpectedStartTime=$("#kjExpectedStartTime").val();
    var kjExpectedEndTime=$("#kjExpectedEndTime").val();
    window.location.href="deviceShipmentDt?type="+type+"&productCode="+productCode+"&productTabId="+productTabId+"&deviceModuleId="+deviceModuleId+"&currentCycleStr="+currentCycleStr+"&jxStartTime="+jxStartTime+"&jxExpectedStart="+jxExpectedStart+"&jxEndTime="+jxEndTime+"&kjExpectedStartTime="+kjExpectedStartTime+"&kjExpectedEndTime="+kjExpectedEndTime;
}


