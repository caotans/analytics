SDDT = function(){
    var oridata=[];
    var oritype;
    var mdoption = initOption();
    var myCharts;
    var ls = window.localStorage;
    var DownloadElse;
    var toolboxobj ={
        x : 'right',
        color:['#000','#000','#000','#000','#000'],
        //显示策略，可选为：true（显示） | false（隐藏），默认值为false
        show : true,
        feature : {
            //辅助线标志
            mark : {show: true},
            //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能
            dataView : {show: false, readOnly: false},
            //magicType，动态类型切换，支持直角系下的折线图、柱状图、堆积、平铺转换,'line', 'bar', 'stack', 'tiled'
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            //restore，还原，复位原始图表
            restore : {show: true},
            //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'
            savemsg : {show: true,
                title : '保存图片',
                icon : 'images/saveEcharts.png',
                onclick : null
            },
            myTool : {
                show : true,
                title : '导出Excel',
                icon : 'images/excel01.png',
                onclick : exportExcel

            }
        }
    };

    return {
        init : function(){
            this.liid;
            this.idxid;
            this.weidu;
            this.selected;
            this.productcode = $(".product01").attr("prdcode");
            this.productname = $(".product01 > a").html();
            if($("#listData").val()==""){
                this.downList = [];
            }else{
                this.downList = $.parseJSON($("#listData").val());
            }
            if($("#areaList").val()==""){
                this.areaList = [];
            }else{
                this.areaList = $.parseJSON($("#areaList").val());
            }
            this.downstr = "'"+getObjData(this.downList,'DownstreamProductCode').join("','")+"'";
            this.areastr = "'"+getObjData(this.areaList,'AreaCode').join("','")+"'";
            this.cnclkgl_option = SD_MOD.cnclkgl_option;
            this.cnclkgl_option.toolbox.show = true;
            this.bgxq_option = SD_MOD.bgxq_option;
            this.jck_option = SD_MOD.jck_option;
            this.xyxq_option = SD_MOD.xyxq_option;
            this.kucun_option = SD_MOD.kucun_option;
            this.gxyc_option = SD_MOD.gxyc_option;
            this.gxyc_nonKC_option=SD_MOD.gxyc_nonKC_option;
            this.order = "";
            this.pindex = 1;
            this.psize = 10;
            this.pagetool;

            //读取localStorage中保存的selected信息
            if(ls.getItem("sel")){
                this.selected = $.parseJSON(ls.getItem("sel"));
            }
            myCharts = drawPic("dt_picdom");


//			$("li.details_nav:first").trigger('click');
            this.firstLoad();
            //暂时隐藏pp，pe的库存tab
            if(this.productcode=='380-060'||this.productcode=='380-030'){
                $("#kc_dt").hide();
            }

        },
        changeLi : function(liid,disabled,OtherDownload){

//            if(liid=='gxyc_dt'){
//                $("#cxfw").text("查询起始日期:");
//                $("#searchend").hide();
//                $("#hx").hide();
//            }
//            else{
//                $("#cxfw").text("查询范围:");
//                $("#searchend").show();
//                $("#hx").show();
//            }
            DownloadElse=OtherDownload;
            this.liid = liid;
            this.idxid = $("li#"+this.liid+".details_nav").attr("idxid");
            $("li.details_nav").removeClass("selected");
            $("li#"+this.liid+".details_nav").addClass("selected");
            if(disabled=='false'){
                $("#sddetailPermissionLevel").show();
                $("#sddetailPermission").hide();
            }else{
                //遮罩层遮住
                $("#sddetailPermissionLevel").hide();
                $("#sddetailPermission").show();

                return;
            }
            this.loadWdDom(this.liid);
            SDDT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序

            $("div.big_wd > span:first").trigger("click");
            if(this.idxid=="cnclkgl"){
                this.selected=this.cnclkgl_option.legend.selected;
            }else if(this.idxid=="bgxq"){
                this.selected=this.bgxq_option.legend.selected;
            }else if(this.idxid=="jck"){
                this.selected=this.jck_option.legend.selected;
            }else if(this.idxid=="xyxq"){
                this.selected=this.xyxq_option.legend.selected;
            }else if(this.idxid=="kc"){
                this.selected=this.kucun_option.legend.selected;
            }else if(this.idxid=="gxyc"){
                if(SDDT.productcode=='380-030'||SDDT.productcode=='380-060'){
                    this.selected=this.gxyc_nonKC_option.selected;
                }
                else{
                    this.selected=this.gxyc_option.legend.selected;
                }

            }
            var tabName = $(".selected> a").text();
            var pm=$(".product01").text();
            var wd=$(".big_wd .wd_r>a").text();
            ga('send', 'event', {
                'eventCategory':  'tab点击(产品分析-详情)',
                'eventAction': pm+'-供需-'+tabName+'-'+wd
            });
        },
        changeWd : function(weidu){
            this.weidu = weidu;
            $("div.big_wd > span").removeClass("wd_r");
            $("div.big_wd > span[wd='"+this.weidu+"']").addClass("wd_r");
            this.drawProPic(this.idxid,this.weidu);
            var tabName = $("#" + this.liid + " > a").text();
            var pm=$(".product01").text();
            ga('send', 'event', {
                'eventCategory':  '维度选择(产品分析-详情)',
                'eventAction': pm+"-"+tabName+"-"+this.weidu

            });
        },
        showLoad : function(){
            myCharts.clear();
            myCharts.showLoading({
                text: '正在努力的读取数据中...',    //loading话术
                effect: 'whirling'
            });
        },
        drawProPic : function(l,w){
            var pd = this.picdom;
            var ksrq = $("#searchstart").val();
            var jsrq = $("#searchend").val();
            //掐头去尾
            var allowfuture='';
           if(this.weidu=="month"){
               if(this.liid=='gxyc_dt'||this.liid=='xyxq_dt'||this.liid=='jck_dt'||this.liid=='bgxq_dt'||this.liid=='cnclkgl_dt'){
                   allowfuture='true';
               }
           }
//            console.log(allowfuture)
            var returnTime= getTimeDate(ksrq,jsrq,w,allowfuture);
            if(returnTime&&returnTime.status!="error"){
                ksrq=returnTime.status;
                jsrq=returnTime.info;
            }else if(returnTime&&returnTime.status=="error"){
                alert(returnTime.info);
                return false;

            }
//            console.log(ksrq);
//            console.log(jsrq);
            this.showLoad();
            var aj = $.ajax({
                type:"POST",
                dataType:"json",
                url:"getSDDTdata?li="+l+"&wd="+w+"&ksrq="+ksrq+"&jsrq="+jsrq
                    +"&highcode="+SDDT.productcode+"&downstr="+SDDT.downstr+"&areastr="+SDDT.areastr
                   +"&allowfuture="+allowfuture,
                timeout : 600000, //超时时间设置，单位毫秒
                success:function(data){
                    if(data!=null){
                        myCharts.hideLoading();
                        var myoption;
                        var opt = {};
                        if(l=="cnclkgl"){
                            oritype="";
                            oridata=[];
                            data=getPermissionByTime(SDDT.DownloadElse,data,"YM","/",w);
                            myoption = SDDT.cnclkgl_option;
                            myoption.legend.selected = SDDT.selected;
                            myoption.xAxis[0].data = searchFromArr(data,'SDTypeId',1,'YM');
                            myoption.series[0].data=[];
                            myoption.series[1].data=[];
                            var or = [];
                            for(var i=0;i<searchFromArr(data,'SDTypeId',1,'YM').length;i++){
                                if(typeof searchFromArr(data,'SDTypeId',15,'Volume_Final')[i]=="string"){
                                    or.push((searchFromArr(data,'SDTypeId',15,'Volume_Final')[i]/searchFromArr(data,'SDTypeId',1,'Volume_Final')[i]).toFixed(2)*100);
                                }else{
                                    or.push('-');
                                }
                            }
                            var len=myoption.xAxis[0].data.length;
                            for(var xlen=0;xlen<len;xlen++){
                                if(myoption.xAxis[0].data[xlen].indexOf('预测')>=0){
                                    myoption.series[0].data.push({
                                        value: searchFromArr(data, 'SDTypeId', 1, 'Volume_Final')[xlen],
                                        itemStyle: {
                                            normal: {color: '#BB3300'}
                                        }
                                    });
                                    myoption.series[1].data.push({
                                        value: searchFromArr(data, 'SDTypeId', 15, 'Volume_Final')[xlen],
                                        itemStyle: {
                                            normal: {color: '#05507C'}
                                        }
                                    });
                                }
                                else{
                                    myoption.series[0].data.push(searchFromArr(data, 'SDTypeId', 1, 'Volume_Final')[xlen]) ;
                                    myoption.series[1].data.push(searchFromArr(data, 'SDTypeId', 15, 'Volume_Final')[xlen]) ;
                                }
                            }
                            myoption.series[2].data = or;
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"产能产量开工率",myoption);
                                var tabName = $(".selected> a").text();
                                var pm=$(".product01").text();
                                var wd=$(".big_wd .wd_r>a").text();
                                ga('send','event',{
                                    'eventCategory':'保存图片',
                                    'eventAction':pm+'-供需-'+tabName+'-'+wd
                                })
                            }  ;
                        }else if(l=="bgxq"){
                            oritype="";
                            oridata=[];
                            if(data[1]){
                                data[1]=getPermissionByTime(SDDT.DownloadElse,data[1],"YM","/",w);
                                myoption = SDDT.bgxq_option;
                                myoption.legend.selected = SDDT.selected;
                                myoption.xAxis[0].data = getObjData(data[1], 'YM');
                                myoption.series[0].data = [];
                                myoption.series[1].data = [];
                                myoption.series[2].data = [];
                                myoption.series[3].data = [];
                                var or = [];
                                for (var i = 0; i < searchFromArr(data[1], 'SDTypeId', 1, 'YM').length; i++) {
                                    if (typeof searchFromArr(data[1], 'SDTypeId', 1, 'Volume_Final')[i] == "string") {
                                        if(getObjData(data[1], 'Production')[i]==undefined){or.push('-');}
                                        else {
                                            or.push(( getObjData(data[1], 'Production')[i]/searchFromArr(data[1], 'SDTypeId', 1, 'Volume_Final')[i]).toFixed(2)*100);
                                        }
                                    } else {
                                        or.push('-');
                                    }
                                }
                                var len=myoption.xAxis[0].data.length;
                                for(var xlen=0;xlen<len;xlen++){
                                    if(myoption.xAxis[0].data[xlen].toString().indexOf('预测')>=0){
                                        myoption.series[0].data.push({
                                            value: getObjData(data[1], 'Import')[xlen],
                                            itemStyle: {
                                                normal: {color: '#BB3300'}
                                            }
                                        });
                                        myoption.series[1].data.push({
                                            value: getObjData(data[1], 'Production')[xlen],
                                            itemStyle: {
                                                normal: {color: '#05507C'}
                                            }
                                        });
                                        myoption.series[2].data.push({
                                            value: getObjData(data[1], 'Export')[xlen],
                                            itemStyle: {
                                                normal: {color: '#751E71'}
                                            }
                                        });
                                        myoption.series[3].data.push(
                                            {
                                                value: getObjData(data[1], 'ApparentDemandActual')[xlen]

                                            }
                                        )
                                    }
                                    else{
                                        myoption.series[0].data.push(getObjData(data[1], 'Import')[xlen]);
                                        myoption.series[1].data.push(getObjData(data[1], 'Production')[xlen]);
                                        myoption.series[2].data.push(getObjData(data[1], 'Export')[xlen]);
                                        myoption.series[3].data.push(getObjData(data[1], 'ApparentDemandActual')[xlen]);
                                    }
                                }
                                myoption.series[4].data = or;
                                myoption.toolbox=toolboxobj;
                                toolboxobj.feature.savemsg.onclick=function(){
                                    exportEchatsImg(myCharts,"表观需求",myoption);
                                    var tabName = $(".selected> a").text();
                                    var pm=$(".product01").text();
                                    var wd=$(".big_wd .wd_r>a").text();
                                    ga('send','event',{
                                        'eventCategory':'保存图片',
                                        'eventAction':pm+'-供需-'+tabName+'-'+wd
                                    })
                                }  ;
                            }
                            else{
                                myCharts.clear();
                                myCharts.showLoading({
                                    animation:false,
                                    text : '暂无数据',
                                    effect: 'bubble',
                                    effectOption: {backgroundColor: '#fefefe'}
                                });
                                $("#sddt_tab").empty();
                                $('#sddt_pg').jqPaginator('destroy');
                            }

                        }else if(l=="jck"){
                            //console.log(data);
                            data=getPermissionByTime(SDDT.DownloadElse,data,"YM","/",w);
                            oridata=data;
                            oritype=l;
                            myoption = SDDT.jck_option;
                            myoption.legend.selected = SDDT.selected;
                            myoption.xAxis[0].data = searchFromArr(data,'SDTypeId',5,'YM');
                            myoption.series[0].data=[];
                            myoption.series[1].data=[];
                            myoption.series[2].data=[];
                            myoption.series[3].data=[];
                            var len= myoption.xAxis[0].data.length;
                            for(var xlen=0;xlen<len;xlen++){
                                if(myoption.xAxis[0].data[xlen].toString().indexOf('预测')>=0){
                                    myoption.series[0].data.push({
                                        value: searchFromArr3(data, 'SDTypeId', 5, 'Volume_Final')[xlen],
                                        itemStyle: {
                                            normal: {color: '#BB3300'}
                                        }
                                    });
                                    myoption.series[1].data.push(searchFromArr3(data, 'SDTypeId', 6, 'Volume_Final')[xlen]);
                                    myoption.series[2].data.push({
                                        value: searchFromArr3(data, 'SDTypeId', 5, 'AvgPrice')[xlen],
                                        itemStyle: {
                                            normal: {color: '#05507C'}
                                        }
                                    });
                                    myoption.series[3].data.push(searchFromArr3(data, 'SDTypeId', 6, 'AvgPrice')[xlen]);
                                }
                                else{
                                    myoption.series[0].data.push(searchFromArr3(data, 'SDTypeId', 5, 'Volume_Final')[xlen]);
                                    myoption.series[1].data.push(searchFromArr3(data, 'SDTypeId', 6, 'Volume_Final')[xlen]);
                                    myoption.series[2].data.push(searchFromArr3(data, 'SDTypeId', 5, 'AvgPrice')[xlen]);
                                    myoption.series[3].data.push(searchFromArr3(data, 'SDTypeId', 6, 'AvgPrice')[xlen]);
                                }
                            }
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"进出口",myoption);
                                var tabName = $(".selected> a").text();
                                var pm=$(".product01").text();
                                var wd=$(".big_wd .wd_r>a").text();
                                ga('send','event',{
                                    'eventCategory':'保存图片',
                                    'eventAction':pm+'-供需-'+tabName+'-'+wd
                                })
                            };
                        }else if(l=="xyxq"){
                            oritype="";
                            oridata=[];
                            if(SDDT.downList.length==0){
                                myCharts.clear();
                                myCharts.showLoading({
                                    animation:false,
                                    text : '无下游品目',
                                    effect:'bubble',
                                    effectOption: {backgroundColor: '#fefefe'}
                                });
                                $("#sddt_tab").empty();
                                $("#sddt_pg").empty();
                                return;
                            }
                           data=getPermissionByTime(SDDT.DownloadElse,data,"YM","/",w);

                            var lgarr = getObjData(SDDT.downList,'DownstreamName');
                            var lgcdarr = getObjData(SDDT.downList,'DownstreamProductCode');

                            myoption = SDDT.xyxq_option;
                            myoption.legend.data = lgarr;
                            myoption.legend.selected = SDDT.selected;
                            myoption.xAxis[0].data = searchFromArr(data,'CommodityCode',data[0].CommodityCode,'YM'),

                                myoption.series = [];
                            for (var i = 0; i < lgarr.length; i++) {
                                myoption.series.push({
                                    name: lgarr[i],
                                    type: "bar",
                                    smooth: false,
                                    stack: true,
                                    data: [],
                                    clickable: false,
                                    symbolSize: 0 | 0
                                });
                                var len= myoption.xAxis[0].data.length;
                                for(var xlen=0;xlen<len;xlen++){
                                    if(myoption.xAxis[0].data[xlen].indexOf('预测')>=0){
                                        switch (i){
                                            case 0:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#CD2626'}}}); break;
                                            case 1:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#8E388E'}}}); break;
                                            case 2:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#006400'}}}); break;
                                            case 3:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#8B0A50'}}}); break;
                                            case 4:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#8A2BE2'}}}); break;
                                            case 5:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#EE0000'}}}); break;
                                            case 6:myoption.series[i].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[i], 'DownstreamDemand')[xlen],itemStyle: {normal:{color: '#7A378B'}}}); break;
                                        }
                                    }
                                    else{
                                        if(searchFromArr(data, 'CommodityCode', lgcdarr[i], 'DownstreamDemand')[xlen]!=undefined)
                                        {
                                            myoption.series[i].data.push(searchFromArr(data, 'CommodityCode', lgcdarr[i], 'DownstreamDemand')[xlen]);
                                        }else
                                        {
                                            myoption.series[i].data.push('-');
                                        }

                                    }
                                }

                            }
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"下游需求",myoption);
                                var tabName = $(".selected> a").text();
                                var pm=$(".product01").text();
                                var wd=$(".big_wd .wd_r>a").text();
                                ga('send','event',{
                                    'eventCategory':'保存图片',
                                    'eventAction':pm+'-供需-'+tabName+'-'+wd
                                })
                            }  ;
                        }else if(l=="kc"){
                            oritype="";
                            oridata=[];
                            if(SDDT.areaList.length==0){
                                    myCharts.clear();
                                    myCharts.showLoading({
                                        animation:false,
                                        text : '暂无数据',
                                        effect: 'bubble',
                                        effectOption: {backgroundColor: '#fefefe'}
                                    });
                                    $("#sddt_tab").empty();
                                    $('#sddt_pg').jqPaginator('destroy');
                                return;
                            }
                            data=getPermissionByTime(SDDT.DownloadElse,data,"YM","/",w);
                            var lgarr = getObjData(SDDT.areaList,'AreaName');
                            var lgcdarr = getObjData(SDDT.areaList,'AreaCode');
                            myoption = SDDT.kucun_option;
                            myoption.legend.data = lgarr;
                            myoption.legend.selected = SDDT.selected;
                            myoption.xAxis[0].data = searchFromArr(data,'AreaCode',data[0].AreaCode,'YM'),

                                myoption.series = [];
                            for(var i=0;i<lgarr.length;i++){
                                myoption.series.push({
                                    name:lgarr[i],
                                    type:"line",
                                    smooth:false,
                                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                    symbolSize: 0|0,
                                    data:searchFromArr(data,'AreaCode',lgcdarr[i],'Inventory'),
                                    clickable:false
                                });
                            }
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"库存",myoption);
                                var tabName = $(".selected> a").text();
                                var pm=$(".product01").text();
                                var wd=$(".big_wd .wd_r>a").text();
                                ga('send','event',{
                                    'eventCategory':'保存图片',
                                    'eventAction':pm+'-供需-'+tabName+'-'+wd
                                })
                            }  ;
                        }else if(l=="gxyc"){
                            oritype="";
                            oridata=[];
                            data=getPermissionByTime(SDDT.DownloadElse,data,"YM","/",w);
                            if(SDDT.productcode=='380-060'||SDDT.productcode=='380-030'){
                                myoption = SDDT.gxyc_nonKC_option;
                                myoption.legend.selected = SDDT.selected;
                                myoption.xAxis[0].data = getObjData(data, 'YM');
                                myoption.series[0].data=[];
                                myoption.series[1].data=[];
                                myoption.series[2].data=[];
                                var len=myoption.xAxis[0].data.length;
                                for(var xlen=0;xlen<len;xlen++){
                                    if(myoption.xAxis[0].data[xlen].indexOf('(预测)')>0){
                                        myoption.series[0].data.push({
                                            value: (data[xlen].Supply == "" ? "-" : data[xlen].Supply),
                                            itemStyle: {
                                                normal: {color: '#BB3300'}
                                            }
                                        });
                                        myoption.series[1].data.push({
                                            value: (data[xlen].Demand == "" ? "-" : data[xlen].Demand),
                                            itemStyle: {
                                                normal: {color: '#05507C'}
                                            }
                                        });
                                        myoption.series[2].data.push({
                                            value: (data[xlen].SDBalance == "" ? "-" : data[xlen].SDBalance),
                                            itemStyle: {
                                                normal: {color: '#751E71'}
                                            }
                                        });
                                    }
                                    else {
                                        myoption.series[0].data.push(data[xlen]['Supply']);
                                        myoption.series[1].data.push(data[xlen]['Demand']);
                                        myoption.series[2].data.push(data[xlen]['SDBalance'] );
                                    }
                                }
                            }
                            else{
                                myoption = SDDT.gxyc_option;
                                myoption.legend.selected = SDDT.selected;
                                myoption.xAxis[0].data = getObjData(data, 'YM');
                                myoption.series[0].data=[];
                                myoption.series[1].data=[];
                                myoption.series[2].data=[];
                                myoption.series[3].data =[];
                                var len=myoption.xAxis[0].data.length;
                                for(var xlen=0;xlen<len;xlen++){
                                    if(myoption.xAxis[0].data[xlen].indexOf('(预测)')>0){
                                        myoption.series[0].data.push({
                                            value: (data[xlen].Supply == "" ? "-" : data[xlen].Supply),
                                            itemStyle: {
                                                normal: {color: '#BB3300'}
                                            }
                                        });
                                        myoption.series[1].data.push({
                                            value: (data[xlen].Demand == "" ? "-" : data[xlen].Demand),
                                            itemStyle: {
                                                normal: {color: '#05507C'}
                                            }
                                        });
                                        myoption.series[2].data.push({
                                            value: (data[xlen].SDBalance == "" ? "-" : data[xlen].SDBalance),
                                            itemStyle: {
                                                normal: {color: '#751E71'}
                                            }
                                        });
                                        if(myoption.series[3]!=undefined){
                                            myoption.series[3].data.push(data[xlen].Inventory == "" ? "-" : data[xlen].Inventory);
                                        }
                                    }
                                    else {
                                        myoption.series[0].data.push(data[xlen]['Supply']);
                                        myoption.series[1].data.push(data[xlen]['Demand']);
                                        myoption.series[2].data.push(data[xlen]['SDBalance'] );
                                        myoption.series[3].data .push(data[xlen]['Inventory'] );

                                    }
                                }
                                myoption.series[3].data=connectData(myoption.series[3].data);
                            }
                            myoption.toolbox=toolboxobj;
                            toolboxobj.feature.savemsg.onclick=function(){
                                exportEchatsImg(myCharts,"供需预测",myoption);
                                var tabName = $(".selected> a").text();
                                var pm=$(".product01").text();
                                var wd=$(".big_wd .wd_r>a").text();
                                ga('send','event',{
                                    'eventCategory':'保存图片',
                                    'eventAction':pm+'-供需-'+tabName+'-'+wd
                                })
                            }  ;
                        }
//                        if((l=="jck"&&w=="month")||(l=="bgxq"&&w=="month")){
//                            SDDT.addData(l,w,myoption);
//                        }else{
//                            myCharts.setOption(myoption);
//                            myCharts.setOption({toolbox:toolboxobj});
////			            	SDDT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序
//                            SDDT.drawTable(l,w,1,true);
//                            var x = Math.ceil(myoption.series[0].data.length/SDDT.psize);
//                            SDDT.initPagination(l,w,"sddt_pg",x);
//                        }
                        myCharts.setOption(myoption);
                        myCharts.setOption({toolbox:toolboxobj});
//			            	SDDT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序
                        SDDT.drawTable(l,w,1,true);
                        var x = Math.ceil(myoption.series[0].data.length/SDDT.psize);
                        SDDT.initPagination(l,w,"sddt_pg",x);
                    }else{
                        myCharts.clear();
                        myCharts.showLoading({
                            animation:false,
                            effect:'bubble',
                            text : '暂无数据',
                            effectOption: {backgroundColor: '#fefefe'}
                        });
                        $("#sddt_tab").empty();
                        $('#sddt_pg').jqPaginator('destroy');
                    }

                },
                error:function(xhr,e){
                    console.log(xhr,e)
                }
            });
        },
        addData : function(l,w,opt){//增加预测数据
            var ksrq = $("#searchstart").val().replace(/-/g,"/");
            var jsrq = $("#searchend").val().replace(/-/g,"/");
//            alert('yuce');
            var aj = $.ajax({
                type:"POST",
                dataType:"json",
                url:"getSDFCdata?li="+l+"&wd="+w+"&highcode="+SDDT.productcode+"&ksrq="+ksrq+"&jsrq="+jsrq,
                success:function(data){
                    if(data!=null){
                        myoption = opt;
                        var datearr = myoption.xAxis[0].data;
                        var maxdate = datearr[datearr.length-1];
                        if(l=="gxyc"){
                            for(var i=0;i<data.length;i++){
//		            			if(data[i].YM.substring(0,7)>maxdate&&data[i].YM.substring(0,7)<=jsrq.substring(0,7)){
                                if(data[i].YM.substring(0,7)>maxdate){
//                                    console.log(i)
                                    myoption.xAxis[0].data.push(data[i].YM);
                                    myoption.series[0].data.push({
                                        value:data[i].Supply,
                                        itemStyle:{
                                            normal:{color:'#BB3300'}
                                        }
                                    });
                                    myoption.series[1].data.push({
                                        value:data[i].Demand,
                                        itemStyle:{
                                            normal:{color:'#05507C'}
                                        }
                                    });
                                    myoption.series[2].data.push({
                                        value:data[i].SDBalance,
                                        itemStyle:{
                                            normal:{color:'#751E71'}
                                        }
                                    });
                                    if(myoption.series[3]!=undefined){
                                        myoption.series[3].data.push(data[i].Inventory);
                                    }
                                }
                            }
                        }else if(l=="cnclkgl"){

                            var ymdata = [];
                            var cndata = [];
                            var cldata = [];
                            var or = [];
                            for(var i=0;i<searchFromArr(data,'SDTypeId',1,'YM').length;i++){
                                ymdata.push(searchFromArr(data,'SDTypeId',1,'YM')[i]);
                                cndata.push(searchFromArr(data,'SDTypeId',1,'Volume_Final')[i]);
                                cldata.push(searchFromArr(data,'SDTypeId',15,'Volume_Final')[i]);
                                if(typeof searchFromArr(data,'SDTypeId',15,'Volume_Final')[i]=="string"){
                                    or.push((searchFromArr(data,'SDTypeId',15,'Volume_Final')[i]/searchFromArr(data,'SDTypeId',1,'Volume_Final')[i]).toFixed(2)*100);
                                }else{
                                    or.push('-');
                                }
                            }
                            for(var i=0;i<ymdata.length;i++){
                                if(ymdata[i].substring(0,7)>maxdate&&ymdata[i].substring(0,7)<=jsrq.substring(0,7)){
                                    myoption.xAxis[0].data.push(ymdata[i]);
                                    myoption.series[0].data.push({
                                        value:cndata[i],
                                        itemStyle:{
                                            normal:{color:'#BB3300'}
                                        }
                                    });
                                    myoption.series[1].data.push({
                                        value:cldata[i],
                                        itemStyle:{
                                            normal:{color:'#05507C'}
                                        }
                                    });
                                    myoption.series[2].data.push({
                                        value:or[i],
                                        itemStyle:{
                                            normal:{color:'#751E71'}
                                        }
                                    });
                                }
                            }
                        }else if(l=="jck"){
                            var ymdata = searchFromArr(data,'SDTypeId',5,'YM');
                            var jcldata = searchFromArr(data,'SDTypeId',5,'Volume_Final');
                            var jcjdata = searchFromArr(data,'SDTypeId',5,'AvgPrice');
                            var ccldata = searchFromArr(data,'SDTypeId',6,'Volume_Final');
                            var ccjdata = searchFromArr(data,'SDTypeId',6,'AvgPrice');
                            for(var i=0;i<ymdata.length;i++){
                                if(ymdata[i].substring(0,7)>maxdate&&ymdata[i].substring(0,7)<=jsrq.substring(0,7)){
                                    myoption.xAxis[0].data.push(ymdata[i]);
                                    myoption.series[0].data.push({
                                        value: jcldata[i],
                                        itemStyle:{
                                            normal:{color:'#BB3300'}
                                        }
                                    });
                                    myoption.series[1].data.push(jcjdata[i]);
                                    myoption.series[2].data.push({
                                        value: ccldata[i],
                                        itemStyle:{
                                            normal:{color:'#05507C'}
                                        }
                                    });
                                    myoption.series[3].data.push(ccjdata[i]);
                                }
                            }
                        }else if(l=="bgxq"){
                            var ymdata = getObjData(data,'YM');
                            var imdata = getObjData(data,'Import');
                            var exdata = getObjData(data,'Export');
                            var prddata = getObjData(data,'Production');
                            var addata = getObjData(data,'ApparentDemandActual');
                            for(var i=0;i<ymdata.length;i++){
//                                console.log(maxdate)
//                                console.log(ymdata[i])
//                                console.log(jsrq)
//                                if(ymdata[i].substring(0,7)>maxdate&&ymdata[i].substring(0,7)<=jsrq.substring(0,7)){
                                if(ymdata[i].substring(0,7)>maxdate&&ymdata[i].substring(0,7)<=jsrq.substring(0,7)){
                                    myoption.xAxis[0].data.push(ymdata[i]);
                                    myoption.series[0].data.push({
                                        value: imdata[i],
                                        itemStyle:{
                                            normal:{color:'#BB3300'}
                                        }
                                    });
                                    myoption.series[1].data.push({
                                        value: prddata[i],
                                        itemStyle:{
                                            normal:{color:'#05507C'}
                                        }
                                    });
                                    myoption.series[2].data.push({
                                        value: exdata[i],
                                        itemStyle:{
                                            normal:{color:'#751E71'}
                                        }
                                    });
                                    myoption.series[3].data.push(addata[i]);
                                }
//                                console.log(myoption.series);
                            }
                        }
                        else if(l=='xyxq'){
                            var lgcdarr = getObjData(SDDT.downList,'DownstreamProductCode');
                            myoption.xAxis[0].data.push(data[0]['YM']);
                            for(var k=0;k<lgcdarr.length;k++){
//                                myoption.series[k].data.push({
//                                    value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand')
//                                });
                                switch (k){
                                    case 0:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand')[0],itemStyle: {normal:{color: '#7A378B'}}}); break;
                                    case 1:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand')[0],itemStyle: {normal:{color: '#EE0000'}}}); break;
                                    case 2:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand')[0],itemStyle: {normal:{color: '#8A2BE2'}}}); break;
                                    case 3:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand')[0],itemStyle: {normal:{color: '#8B0A50'}}}); break;
                                    case 4:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand')[0],itemStyle: {normal:{color: '#006400'}}}); break;
                                    case 5:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand')[0],itemStyle: {normal:{color: '#8E388E'}}}); break;
                                    case 6:myoption.series[k].data.push({ value: searchFromArr(data, 'CommodityCode',lgcdarr[k], 'DownstreamDemand')[0],itemStyle: {normal:{color: '#CD2626'}}}); break;
                                }
                            }
                        }

                        myCharts.clear();
                        myCharts.setOption(myoption);
                        myCharts.setOption({toolbox:toolboxobj});

                    }else{
                        myCharts.clear();
                        myCharts.setOption(opt);
                        myCharts.setOption({toolbox:toolboxobj});
                    }
//	            	SDDT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序
                    SDDT.drawTable(l,w,1,true);
                    var x = Math.ceil(opt.series[0].data.length/SDDT.psize);
                    SDDT.initPagination(l,w,"sddt_pg",x);
                },
                error:function(xhr,e){
                    console.log(xhr,e)
                }
            });
        },
        drawTable : function(l,w,pindex,isPaging){
            var opt = {};
            if(l=="cnclkgl"){
                opt = {
                    data : SDDT.getTableData(pindex),
                    datamap : [{
                        name : '日期', //字段中文名，绘制table时会展示在表头
                        value : 'YM', //后台的字段名
                        width : 20 , //字段所占百分比宽度
                        hidden : false ,//hidden为true时必须设置tg属性
                        tg : 0 ,//字段标识，不得重复
                        sorting : true
                    },{
                        name : '产能',
                        value : 'Capacity',
                        width : 20 ,
                        tg : 1 ,
                        sorting : true
                    },{
                        name : '产量',
                        value : 'Production',
                        width : 20 ,
                        tg : 2 ,
                        sorting : true
                    },{
                        name : '开工率',
                        value : 'OperatingRate',
                        width : 20 ,
                        tg : 3 ,
                        sorting : true ,
                        render : function(data){
                            if(typeof data=="number"){
                                if(data||data==0){return '<th tg=3>'+(Math.floor(data))+'%</th>';}
                                else{return '<th tg=3>'+'-'+'</th>';}
                            }else if(typeof data=='string'){
                                if(data.indexOf('.')==-1){
                                    return '<th tg=3>'+data+'</th>'
                                }
                                else{
                                    return '<th tg=3>'+data.substring(0,data.indexOf('.'))+'%'+'</th>';
                                }

                            }
                        }
                    }]
                };

            }else if(l=="bgxq"){
                opt = {
                    data : SDDT.getTableData(pindex),
                    datamap : [{
                        name : '日期', //字段中文名，绘制table时会展示在表头
                        value :'YM', //后台的字段名
                        width : 20 , //字段所占百分比宽度
                        hidden : false ,//hidden为true时必须设置tg属性
                        tg : 0 ,//字段标识，不得重复
                        sorting : true
                    },{
                        name : '进口量',
                        value : 'Import',
                        width : 16 ,
                        tg : 1 ,
                        sorting : true
                    },{
                        name : '产量',
                        value : 'Production',
                        width : 16 ,
                        tg : 2 ,
                        sorting : true
                    },{
                        name : '出口量',
                        value : 'Export',
                        width : 16 ,
                        tg : 3 ,
                        sorting : true,
                        render : function(data){
                            return '<th tg=3>'+(data)+'</th>';
                        }
                    },{
                        name : '表观需求量',
                        value : 'ApparentDemandActual',
                        width : 16 ,
                        tg : 4 ,
                        sorting : true
                    }
                        ,{
                            name : '开工率',
                            value : 'ApparentDemandActual',
                            width : 16 ,
                            tg : 5 ,
                            sorting : true ,
                            render : function(data){
//                                    console.log(data);
//                                    console.log(typeof data);
                                if(typeof data=="number"){
                                    if(data==NaN) {return '<th tg=5>-</th>'}
                                    else{
//                                            console.log("===")
                                        return '<th tg=5>'+(Math.floor(data))+'%</th>';
                                    }
                                }
                                else {
                                    return '<th tg=5>'+data+'</th>';
                                }
                            }
                        }
                    ]
                };
            }else if(l=="jck"){
                opt = {
                    data : SDDT.getTableData(pindex),
                    datamap : [{
                        name : '日期', //字段中文名，绘制table时会展示在表头
                        value :'MasterDateKey', //后台的字段名
                        width : 20 , //字段所占百分比宽度
                        hidden : false ,//hidden为true时必须设置tg属性
                        tg : 0 ,//字段标识，不得重复
                        sorting : true
                    },{
                        name : '进口量',
                        value : 'ImportAmount',
                        width : 20 ,
                        tg : 1 ,
                        sorting : true
                    },{
                        name : '出口量',
                        value : 'ExportAmount',
                        width : 20 ,
                        tg : 2 ,
                        sorting : true
                    },{
                        name : '进口均价',
                        value : 'ImpAvgPrice',
                        width : 20 ,
                        tg : 3 ,
                        sorting : true
                    },{
                        name : '出口均价',
                        value : 'ExpAvgPrice',
                        width : 20 ,
                        tg : 4 ,
                        sorting : true
                    }]
                };
            }else if(l=="xyxq"){
                var datamap = [{
                    name : '日期', //字段中文名，绘制table时会展示在表头
                    value :'YM', //后台的字段名
                    width : 10 , //字段所占百分比宽度
                    hidden : false ,//hidden为true时必须设置tg属性
                    tg : 0 ,//字段标识，不得重复
                    sorting : true
                }];
                var lgarr = getObjData(SDDT.downList,'DownstreamName');
                var lgcdarr = getObjData(SDDT.downList,'DownstreamProductCode');
                for(var i=0;i<lgarr.length;i++){
                    datamap.push({
                        name : lgarr[i],
                        value : lgcdarr[i],
                        width : 10 ,
                        tg : i+1 ,
                        sorting : true
                    });
                }
                opt = {
                    data : SDDT.getTableData(pindex),
                    datamap : datamap
                };
            }else if(l=="kc"){
                var datamap = [{
                    name : '日期', //字段中文名，绘制table时会展示在表头
                    value :'YM', //后台的字段名
                    width : 10 , //字段所占百分比宽度
                    hidden : false ,//hidden为true时必须设置tg属性
                    tg : 0 ,//字段标识，不得重复
                    sorting : true
                }];
                var lgarr = getObjData(SDDT.areaList,'AreaName');
                var lgcdarr = getObjData(SDDT.areaList,'AreaCode');
                for(var i=0;i<lgarr.length;i++){
                    datamap.push({
                        name : lgarr[i],
                        value : lgcdarr[i],
                        width : 10 ,
                        tg : i+1 ,
                        sorting : true
                    });
                }
                opt = {
                    data : SDDT.getTableData(pindex),
                    datamap : datamap
                };
            }else if(l=="gxyc"){
                opt = {
                    data : SDDT.getTableData(pindex),
                    datamap : [{
                        name : '日期', //字段中文名，绘制table时会展示在表头
                        value :'YM', //后台的字段名
                        width : 20 , //字段所占百分比宽度
                        hidden : false ,//hidden为true时必须设置tg属性
                        tg : 0 ,//字段标识，不得重复
                        sorting : true
                    },{
                        name : '供应量',
                        value : 'Supply',
                        width : 20 ,
                        tg : 1 ,
                        sorting : true
                    },{
                        name : '需求量',
                        value : 'Demand',
                        width : 20 ,
                        tg : 2 ,
                        sorting : true
                    },{
                        name : '供需平衡',
                        value : 'SDBalance',
                        width : 20 ,
                        tg : 3 ,
                        sorting : true
                    }

                    ]
                };
                if(SDDT.productcode=='330-130'){
                    opt.datamap.push(
                        {
                            name : '库存（右轴）',
                            value : 'Inventory',
                            width : 20 ,
                            tg : 4	 ,
                            sorting : true
                        }
                    );
                }
            }
            SDDT.drawDtTable(opt,"sddt_tab");

            myCharts.on(echarts.config.EVENT.LEGEND_SELECTED,function(e){
                var tabName = $(".selected> a").text();
                var pm=$(".product01").text();
                ga('send', 'event', {
                    'eventCategory':  '图例(Legend)点击(详情)',
                    'eventAction': pm+"-"+tabName+'-图例(Legend)点击(详情)'
                });
                var farr = [];
                SDDT.selected = e.selected;
                var map = opt.datamap;
                var sel = e.selected;
                for(var j in sel){
                    if(sel[j]==false){
                        for(var i=0;i<map.length;i++){
                            if(map[i].name==j){
                                farr.push(map[i].tg);
                            }
                        }
                    }
                }
                $("th","#sddt_tab").removeClass("tableDisable");
                for(var x=0;x<farr.length;x++){
                    $("th[tg="+farr[x]+"]","#sddt_tab").addClass("tableDisable");
                }
            });

        },
        changeOrder : function(colname){
            var tabName = $(".selected> a").text();
            var pm=$(".product01").text();
            ga('send', 'event', {
                'eventCategory':  '表格排序(详情)',
                'eventAction': pm+"-"+tabName+'-表格排序(详情)'
            });
            var oj;
            if(this.order == ""){
                oj = $.parseJSON("{"+this.order+"}");
            }else{
                oj = $.parseJSON(this.order);
            }
            if(typeof oj[colname] === "undefined"){
                oj={};  //有这一行时，只能单列排序，删除这一行，将可以多列排序
                oj[colname] = 0;
            }else if(oj[colname]==0){
                oj[colname] = 1;
            }else{
                oj[colname] = 0;
            }
            var orstr = JSON.stringify(oj);
            this.order = orstr;

            //重新绘制表格，跳转至第一页
            this.drawTable(this.idxid,this.weidu,1,false);
            //分页控件跳转至第一页
            $('#sddt_pg').jqPaginator('option', {
                currentPage: 1
            });
        },
        /*
         * 初始化分页插件
         */
        initPagination : function(l,w,id,pTotal){
            if(pTotal>0){
                SDDT.pagetool = $("#"+id).jqPaginator({
                    totalPages: pTotal,
                    visiblePages: 5,
                    currentPage: 1,
                    activeClass : "page_number_select",
                    prev: '<span class="prev"><a href="javascript:;">上一页</a></span>',
                    next: '<span class="next"><a href="javascript:;">下一页</a></span>',
                    page: '<span class="page"><a href="javascript:;">{{page}}</a></span>',
                    first:'<span class="first"><a href="javascript:;">1</a></span>',
                    last: '<span class="last"><a href="javascript:;">{{totalPages}}</a></span>',
                    omit: '<span class="disabled"><a href="javascript:;">...</a></span>',
                    onPageChange: function (num, type) {
                        if(type=="change"){
                            SDDT.drawTable(l,w,num,false);
                        }
                    }
                });
            }else{ //没有数据
                $("#"+id).empty();
            }
        },
        search : function(){
            this.drawProPic(this.idxid, this.weidu);
            var tabName = $("#" + this.liid + " > a").text();
            var pm=$(".product01").text();
            ga('send', 'event', {
                'eventCategory':  '搜索点击(产品分析-详情)',
                'eventAction': pm+"-"+tabName+"-"+this.weidu

            });
        },
        drawDtTable : function(option,tabid){
            var thead = "<thead><tr class='enterprise_bt'>";
            for(var i=0;i<option.datamap.length;i++){
                if(option.datamap[i].sorting){
                    var oj;
                    if(SDDT.order == ""){
                        oj = $.parseJSON("{"+this.order+"}");
                    }else{
                        oj = $.parseJSON(this.order);
                    }
                    var colname = option.datamap[i].tg;
                    var sorthtml = "";
                    if(typeof oj[colname] === "undefined"){
                        sorthtml += '<a class="ascending"></a><a class="descending"></a>';
                    }else if(oj[colname]==0){
                        sorthtml += '<a class="ascending"></a><a class="descending31"></a>';
                    }else{
                        sorthtml += '<a class="ascending32"></a><a class="descending"></a>';
                    }
                    thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%" style="cursor:pointer;" onclick="SDDT.changeOrder('+i+')"><span>'+option.datamap[i].name+'</span><span class="ascending_box">'+sorthtml+'</span></th>';
                }else{
                    thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%"><span>'+option.datamap[i].name+'</span></th>';
                }
            }
            thead += "</tr></thead>";

            var tbody = "";
            if(option.data){
                tbody += '<tbody>';
                for(var j=0;j<option.data.length;j++){
                    if(j%2==0){
                        tbody += '<tr>';
                    }else{
                        tbody += '<tr class="enterprise_nr01">';
                    }

                    for(var x=0;x<option.datamap.length;x++){
                        var th = '';
                        if(option.datamap[x].value){
                            th = '<th tg="'+option.datamap[x].tg+'">'+option.data[j][x]+'</th>';
                        }
                        if(option.datamap[x].render){
                            var fc = option.datamap[x].render;
                            if ( typeof fc === 'function' ){
                                th = fc(option.data[j][x]);
                            }else{
                                $("#"+tabid).empty();
                                alert("表格配置了render属性时，需指定render为function类型，并返回一段表格字段的html代码。");
                                return;
                            }
                        }
                        tbody += th;
                    }

                    tbody += '</tr>';
                }
                tbody += '</tbody>';
            }else{
                tbody += "<tbody></tbody>";
            }

            var html = thead+tbody;
            $("#"+tabid).empty();
            $("#"+tabid).append(html);


            for(var n=0;n<option.datamap.length;n++){
                if(option.datamap[n].hidden){
                    var tgn = option.datamap[n].tg;
                    $("th[tg='"+tgn+"']").hide();
                }
            }

            //处理图例取消选中需要让表格对应字段置灰的问题
            var farr = [];
            var map = option.datamap;
            var sel = SDDT.selected;
            for(var j in sel){
                if(sel[j]==false){
                    for(var i=0;i<map.length;i++){
                        if(map[i].name==j){
                            farr.push(map[i].tg);
                        }
                    }
                }
            }
            $("th","#prdt_tb").removeClass("tableDisable");
            for(var x=0;x<farr.length;x++){
                $("th[tg="+farr[x]+"]","#sddt_tab").addClass("tableDisable");
            }
        },
        loadWdDom : function(liid){
            var wdstr = $("li#"+liid).attr("wdstr");
            var arr = wdstr.split(",");
            var html = "";
            for(var i=0;i<arr.length;i++){
                var name = "";
                if(arr[i]=="day"){
                    name = "日";
                }else if(arr[i]=="week"){
                    name = "周";
                }else if(arr[i]=="month"){
                    name = "月";
                }else if(arr[i]=="year"){
                    name = "年";
                }
                html += "<span wd=\""+arr[i]+"\" onclick=\"SDDT.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
            }
            $("div.big_wd").html("");
            $("div.big_wd").append(html);
        },
        firstLoad : function(){
            this.liid = $("#pld").val();
            this.idxid = $("li#"+this.liid+".details_nav").attr("idxid");
            this.weidu = $("#pwd").val();
            $("li#"+this.liid+".details_nav").addClass("selected");
            this.loadWdDom(this.liid);
            if(this.weidu=="day"){
                this.curDate=getNowDate();
                this.lyDate=getSomeDate(30);
            }else if(this.weidu=="week"){
                this.curDate=getNowDate();
                this.lyDate=getSomeDate(56);
            }else if(this.weidu=="month"&&this.liid=='gxyc_dt'){
                this.curDate=getSomeDate(-30);
                this.lyDate=getSomeYear(1);
            }
            else if(this.weidu=="year"){
                this.curDate=getSomeDate(-30);
                this.lyDate=getSomeYear(4);
            }
            else if(this.weidu=="month"){
                this.curDate=getSomeDate(-30);
                this.lyDate=getSomeYear(1);
            }
//            if(this.idxid=='gxyc'){
//                $("#cxfw").text("查询起始日期:");
//                $("#searchend").hide();
//                $("#hx").hide();
//            }
//            else{
//                $("#cxfw").text("查询范围:");
//                $("#searchend").show();
//                $("#hx").show();
//            }

            $("#searchstart").datepicker('setDate', this.lyDate);
            $("#searchend").datepicker('setDate', this.curDate);
            $("#searchend").datepicker('setEndDate', this.curDate);
//            $("#searchstart").datepicker('setStartDate', '2014-01-01');

            SDDT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序
            $("div.big_wd > span[wd='"+this.weidu+"']").trigger('click');
        },
        backToIdx : function(){
            window.history.back();
        },
        resize : function(){
            myCharts.resize();
        },
        getDataSource : function(){
            var opt = myCharts.getOption();
            var arr = [];
            if(oritype && oritype=='jck' ) {
                for(var i=0;i<opt.series[0].data.length;i++){
                    var ai = [];
                    var title=[];//时间、进口量、出口量、进口均价、出口均价
                    title.push(opt.xAxis[0].data[i]);
                    title.push("-");
                    title.push("-");
                    title.push("-");
                    title.push("-");
                    for(var j=0;j<oridata.length;j++){
                                   if(opt.xAxis[0].data[i]==oridata[j].YM && oridata[j].SDTypeId==5){  //进口
                                       title[1]= oridata[j].Volume_Final;
                                       title[3]= oridata[j].AvgPrice;
                                   }
                                    if(opt.xAxis[0].data[i]==oridata[j].YM && oridata[j].SDTypeId==6){ //出口
                                        title[2]= oridata[j].Volume_Final;
                                        title[4]= oridata[j].AvgPrice;
                                          }
                    }
                    arr.push(title);


                }
            }else{
                for(var i=0;i<opt.series[0].data.length;i++){
                    var ai = [];
                    ai.push(opt.xAxis[0].data[i]);
                    for(var j=0;j<opt.series.length;j++){
                        if("object" == typeof opt.series[j].data[i]){
                            ai.push(opt.series[j].data[i].value);
                        }else{
                            ai.push(opt.series[j].data[i]);
                        }
                    }
                    arr.push(ai);
                }
            }

            return arr;
        },
        getXSource : function(){
            var opt = myCharts.getOption();
            var arr = [];
            arr.push("时间");
            for(var j=0;j<opt.series.length;j++){
                arr.push(opt.series[j].name);
            }
            return arr;
        },
        getTableData : function(pindex){
            var dataSrc = SDDT.getDataSource();
            var arr = [];
            var od;
            if(this.order == ""){
                od = $.parseJSON("{"+this.order+"}");
                arr = dataSrc;
            }else{
                od = $.parseJSON(this.order);
                for(var obj in od){
                    var px = od[obj];
                    if(px==0){
                        arr = sortArray(dataSrc,obj,'asc');
                    }else{
                        arr = sortArray(dataSrc,obj,'desc');
                    }
                }
            }
            var ps = this.psize;
            var start = (pindex-1)*ps;
            var end = pindex*ps;
            var res = arr.slice(start,end);
            return res;
        }
    }
}();

$(function(){
    SDDT.init();
});
window.addEventListener("resize", function () {
    SDDT.resize();
});
function exportExcel(){
    if(SDDT.DownloadElse==1){
        alert("您尚未开通下载Excel权限!");
        return;
    }else {
        var ds = SDDT.getDataSource();
        var xname = SDDT.getXSource();
        var array=ds;
        var sheetName=["供需详情"];
        var titleName=[xname];
        $("#titleName").val(JSON.stringify(titleName));
        $("#fileName").val(JSON.stringify(sheetName));
        $("#sheetName").val(JSON.stringify(sheetName));
        $("#excelArray").val(JSON.stringify([array]));
        $('#hyExport').submit();
        var tabName = $(".selected> a").text();
        var pm=$(".product01").text();
        var wd=$(".big_wd .wd_r>a").text();
        ga('send','event',{
              'eventCategory':'导出excel',
              'eventAction':pm+'-供需-'+tabName+'-'+wd
        })
    }
}