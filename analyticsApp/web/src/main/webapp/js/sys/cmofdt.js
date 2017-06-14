CMOFDT = function(){
    var dataSource;
    var mdoption = initOption();
    var ls = window.localStorage;
    var DownloadInfo;
    var option = {
        grid:{
            x : '8%',
            y : '10%',
            x2 : '8%',
            y2 : '25%',
            borderColor:'white'
        },
        legend: {
            data : [],
            y:"85%",
            selected:{}
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type:'line',
                lineStyle:{
                    type:'dotted',
                    color:'#a3a3a3'
                }
            }
        },
        //工具箱
        toolbox: {
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
        },
        xAxis : [
            {
                type : 'category',
                //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                boundaryGap:false,
                data :[''],
                axisLabel:{
                    textStyle:{
                        color:'#a3a3a3'
                    }
                },
                splitLine:{
                    show:false
                },
                axisLine:{
                    lineStyle:{
                        color: '#a3a3a3'
                    }
                },
                axisTick:{
                    lineStyle:{
                        color: '#a3a3a3'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                name:'元/吨' ,
                scale:true,
                axisLabel:{
                    textStyle:{
                        color:'#a3a3a3'
                    }
                },
                splitLine:{
                    show:false
                },
                axisLine:{
                    lineStyle:{
                        color: '#a3a3a3'
                    }
                }
            }
        ],
        series : [

        ]
    };
    var myCharts;

    return {
        init : function(){
            this.liid;
            this.idxid;
            this.weidu;
            this.option = option;
            this.filter = "";
            this.order = "";
            this.pindex = 1;
            this.psize = 10;
            this.pagetool;

            this.curDate;
            this.lyDate;

            DatePicker('#searchstart','#searchend');

            if(ls.getItem("cmofsel")&&ls.getItem("cmofsel")!="undefined"){
                this.selected = $.parseJSON(ls.getItem("cmofsel"));
            }
            if(ls.getItem("cmofcd")){
                this.codestr = ls.getItem("cmofcd");
                this.lgcode = this.codestr.replace(/'/g,"").split(",");
            }
            if(ls.getItem("cmoflg")){
                this.legendstr = ls.getItem("cmoflg");
                this.legend = this.legendstr.split(",");
            }


//			$("li.details_nav:first").trigger('click');
            myCharts = drawPic("dt_picdom");
            this.firstLoad();
        },
        changeLi : function(liid,PriceDownload){
            if(PriceDownload){
                DownloadInfo=PriceDownload;
            }
            this.liid = liid;
            this.idxid = $("li#"+this.liid+".details_nav").attr("idxid");
            this.loadWdDom(this.liid);

            $("li.details_nav").removeClass("selected");
            $("li#"+this.liid+".details_nav").addClass("selected");

            CMOFDT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序

            $("div.big_wd > span:first").trigger("click");
            var wd=$(".big_wd .wd_r>a").text();
            ga('send','event',{
                'eventCategory':'tab点击',
                'eventAction':'企业报价-'+wd
            })
        },
        changeWd : function(weidu){
            this.weidu = weidu;

            $("div.big_wd > span").removeClass("wd_r");
            $("div.big_wd > span[wd='"+this.weidu+"']").addClass("wd_r");

            this.drawProPic(this.idxid,this.weidu);
            var wd=$(".big_wd .wd_r>a").text();
            ga('send','event',{
                'eventCategory':'维度选择',
                'eventAction':'企业报价-'+wd
            })
        },
        showLoad : function(){
            myCharts.clear();
            myCharts.showLoading({
                text: '正在努力的读取数据中...',    //loading话术
                effect: 'whirling'
            });
        },
        search : function(){
            this.drawProPic(this.idxid, this.weidu);
            var wd=$(".big_wd .wd_r>a").text();
            ga('send','event',{
                'eventCategory':'搜索点击',
                'eventAction':'企业报价-'+wd
            })
        },
        drawProPic : function(l,w){
            var pd = this.picdom;
            this.showLoad();
            $("#cmsddt").empty();
            $("#cmsddt_pg").empty();
            var ksrq = $("#searchstart").val();
            var jsrq = $("#searchend").val();
            var codestr = this.codestr;
            //掐头去尾
            var returnTime= getTimeDate(ksrq,jsrq,w);
            if(returnTime&&returnTime.status!="error"){
                ksrq=returnTime.status;
                jsrq=returnTime.info;
            }else if(returnTime&&returnTime.status=="error"){
                alert(returnTime.info);
                return false;

            }

            var aj = $.ajax({
                type:"POST",
                dataType:"json",
                url:"cmofdtData?wd="+w+"&cncode="+codestr+"&ksrq="+ksrq+"&jsrq="+jsrq,
                timeout : 10000, //超时时间设置，单位毫秒
                success:function(data){
//	            	if(data.response.data){
                    if(data&&data.length){
                        data=getPermissionByTime(CMOFDT.DownloadInfo,data,"PubDate","/",w);
                        dataSource=data;
//	            		var dataArr = data.response.data;
                        var dataArr = data;
                        var lgarr = CMOFDT.legend;
                        var lgcdarr = CMOFDT.lgcode;
                        myCharts.hideLoading();
                        var myoption;
                        myoption = CMOFDT.option;
                        myoption.legend.data = lgarr;
                        myoption.legend.selected = CMOFDT.selected;
                        myoption.xAxis[0].data = searchFromArr(dataArr,'CNCode',lgcdarr[0],'PubDate');

                        myoption.series = [];
                        for(var i=0;i<lgarr.length;i++){
                            myoption.series.push({
                                name:lgarr[i],
                                type:"line",
                                data:searchFromArr(dataArr,'CNCode',lgcdarr[i],'SettlementPrice'),
                                barGap : 0,
                                symbolSize: 0|0
                            });
                        }
                        myoption.toolbox.feature.savemsg.onclick=function(){
                            exportEchatsImg(myCharts,"企业报价详情",myoption);
                        };
                        myCharts.setOption(myoption);
                        CMOFDT.drawTable(l,w,1,true);
                        var x = Math.ceil(myoption.series[0].data.length/CMOFDT.psize);
                        CMOFDT.initPagination(l,w,"cmsddt_pg",x);
                    }else{
                        myCharts.clear();
                        myCharts.showLoading({
                            text: '暂无数据',    //loading话术
                            effect: 'bubble'
                        });
                    }

                },
                error:function(xhr,e){
                    console.log(xhr,e)
                }
            });
        },
        drawTable : function(l,w,pindex,isPaging){
            var opt = {};
            opt = {
                data :CMOFDT.getTableData(pindex),
                datamap : [{
                    name : '日期', //字段中文名，绘制table时会展示在表头
                    value : 'PubDate', //后台的字段名
                    width : 5 , //字段所占百分比宽度
                    hidden : false ,//hidden为true时必须设置tg属性
                    tg : 0 , //字段标识，不得重复
                    sorting : true
                },{
                    name : '报价企业',
                    value : 'OfferingCompany',
                    width : 15 ,
                    tg : 1 ,
                    sorting : true
                }
                    ,{
                        name : '报价/挂牌价',
//                                        value : 'OfferPrice',
                        width : 8 ,
                        tg : 2 ,
                        sorting : true,
                        render : function(data){
                            return '<th tg=2 width="8%">'+data[4]+'-'+data[6]+'</th>';
                        }
                    }


                ]
            };
            var pmcode=$(".product01").attr("prdcode");
            if(pmcode=="380-030"||pmcode=="380-060"){
                opt.datamap.push(
//                    {
//                        name : '结算价',
////                                        value : 'SettlementPrice',
//                        width : 7 ,
//                        tg : 3 ,
//                        sorting : true,
//                        render : function(data){
//                            return '<th tg=4 width="7%">'+data[4]+'/'+data[6]+'</th>';
//                        }
//                    }
//                    ,
                    {
                        name : '涨跌',
//                                        value : 'minChange',
                        width : 4 ,
                        tg : 10,
                        sorting : true,
                        render : function(data){
                            return '<th tg=3 width="4%">'+(data[4]-data[5])+'/'+(data[6]-data[7])+'</th>';
                        }
                    }
                    ,{
                        name : '生产企业',
                        value : 'Producer',
                        width : 10 ,
                        tg : 4 ,
                        hidden : false  ,
                        sorting : true
                    }
                    ,{
                        name : '单位',
//                                            value : 'minChange',
                        width : 3 ,
                        tg : 6,
                        render : function(data){
                            return '<th tg=6 width="3%">元/吨</th>';
                        }
                    }
                    ,
                    {
                        name : '级别/牌号',
//                        value : 'Note',
                        width : 10 ,
                        tg : 7 ,
                        render : function(data){
                            return '<th tg=7 width="10%">'+data[8]+'</th>';
                        }
                    }
                    ,
                    {
                        name : '备注',
                        width : 7 ,
                        tg : 9  ,
                        render : function(data){
                            return '<th tg=9 width="7%">'+data[9]+'</th>';
                        }
                    }
                );
            }
            else{
                opt.datamap.push(
                    {
                        name : '涨跌',
//                                        value : 'minChange',
                        width : 6 ,
                        tg : 10,
                        sorting : true,
                        render : function(data){
                            if(!isNaN(data[4]-data[5]) || !isNaN(data[6]-data[7])) {
                                return '<th tg=3 width="6%">'+(data[4]-data[5])+'/'+(data[6]-data[7])+'</th>';
                            }  else{
                                return '<th tg=3 width="6%">'+'-/-'+'</th>';
                            }

                        }
                    }
                    ,{
                        name : '生产企业',
                        value : 'Producer',
                        width : 10 ,
                        tg : 4 ,
                        hidden : false  ,
                        sorting : true
                    }
                    ,{
                        name : '单位',
//                                            value : 'minChange',
                        width : 6 ,
                        tg : 6,
                        render : function(data){
                            return '<th tg=6 width="6%">元/吨</th>';
                        }
                    }
                );
            }
            var lgarr = CMOFDT.legend;
            //表格显示图例列（不显示）
//            for(var i=0;i<lgarr.length;i++){
//                var tg=7+i;
//                opt.datamap.push({
//                    name : lgarr[i],
//                    width : 20 ,
//                    tg : tg ,
//                    sorting : true  ,
//                    render : function(data){
//                        return '<th tg='+tg+'>'+data[2]+'</th>';
//                    }
//                });
//            }

            CMOFDT.drawDtTable(opt,"cmsddt");
            myCharts.on(echarts.config.EVENT.LEGEND_SELECTED,function(e){
                var farr = [];
                CMOFDT.selected = e.selected;
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
                $("th","#cmsddt").removeClass("tableDisable");
                for(var x=0;x<farr.length;x++){
                    $("th[tg="+farr[x]+"]","#cmsddt").addClass("tableDisable");
                }
                var wd=$(".big_wd .wd_r>a").text();
                ga('send','event',{
                    'eventCategory':'图例(Legend)点击',
                    'eventAction':'企业报价-'+wd+'-'+e['target']+'图例点击'
                })
            });

        },
        /*
         * 排序字段切换功能
         */
        changeOrder : function(colname){
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
            var wd=$(".big_wd .wd_r>a").text();
            ga('send','event',{
                'eventCategory':'排序点击',
                'eventAction':'企业报价-'+wd
            })
            //重新绘制表格，跳转至第一页
            this.drawTable(this.idxid,this.weidu,1,false);
            //分页控件跳转至第一页
            $('#cmsddt_pg').jqPaginator('option', {
                currentPage: 1
            });
        },
        drawDtTable : function(option,tabid){
            var thead = "<thead><tr class='enterprise_bt'>";
            for(var i=0;i<option.datamap.length;i++){
                if(option.datamap[i].sorting){
                    var oj;
                    if(CMOFDT.order == ""){
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
                    thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%" style="cursor:pointer;" onclick="CMOFDT.changeOrder('+option.datamap[i].tg+')"><span>'+option.datamap[i].name+'</span><span class="ascending_box">'+sorthtml+'</span></th>';
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
                            if(option.datamap[x].value=='Producer'){th = '<th tg="'+option.datamap[x].tg+'">'+option.data[j][3]+'</th>';}
                            else {th = '<th tg="'+option.datamap[x].tg+'">'+option.data[j][x]+'</th>'; }
                        }
                        else if(option.datamap[x].render){
                            var fc = option.datamap[x].render;
                            if ( typeof fc === 'function' ){
                                th = fc(option.data[j]);
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
            var sel = CMOFDT.selected;
            for(var j in sel){
                if(sel[j]==false){
                    for(var i=0;i<map.length;i++){
                        if(map[i].name==j){
                            farr.push(map[i].tg);
                        }
                    }
                }
            }
            $("th","#cmsddt").removeClass("tableDisable");
            for(var x=0;x<farr.length;x++){
                $("th[tg="+farr[x]+"]","#cmsddt").addClass("tableDisable");
            }
        },
        /*
         * 初始化分页插件
         */
        initPagination : function(l,w,id,pTotal){
            if(pTotal>0){
                CMOFDT.pagetool = $("#"+id).jqPaginator({
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
                            CMOFDT.drawTable(l,w,num,false);
                        }
                    }
                });
            }else{ //没有数据
                $("#"+id).empty();
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
                html += "<span wd=\""+arr[i]+"\" onclick=\"CMOFDT.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
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

//			if(this.weidu=="day"){
//				this.curDate=getNowDate();
//				this.lyDate=getSomeDate(30);
//			}else if(this.weidu=="week"){
//				this.curDate=getNowDate();
//				this.lyDate=getSomeDate(56);
//			}else if(this.weidu=="month"){
//				this.curDate=getNowDate();
//				this.lyDate=getSomeYear(1);
//			}else if(this.weidu=="year"){
//				this.curDate=getNowDate();
//				this.lyDate=getSomeYear(4);
//			}
            this.curDate=$("#curDate").val();
            this.lyDate=$("#lyDate").val();
            if(this.curDate=='undefined'){
                var s=this.lyDate.substring(5,7)

                if(s-1==0){
                    this.curDate=this.lyDate.substring(0,4)-1+"/12"+ this.lyDate.substring(7,10)
                }
                else{
                    this.curDate=this.lyDate.substring(0,5)+"0"+(s-1)+this.lyDate.substring(7,10)
                }
            }
            $("#searchstart").datepicker('setDate', this.curDate);
            $("#searchend").datepicker('setDate', this.lyDate);

            CMOFDT.order="{\"0\":1}";//首次加载时按照第一个字段即“日期”字段倒序排序

            $("div.big_wd > span[wd='"+this.weidu+"']").trigger('click');
        },
        backToIdx : function(){
            $("div.content_box").show();
            $("div.dt_box").hide();
        },
        resize : function(){
            myCharts.resize();
        },
        getDataSource : function(){
            var opt = myCharts.getOption();
            var tableData=[];
            var titleArr=['PubDate','OfferingCompany','SettlementPrice','Producer','MinPrice','LMinPrice','MaxPrice','LMaxPrice','Note','beizhu','Low'];
            for(var i=0;i<dataSource.length;i++){
                var arr = [];
                for(var j=0;j<titleArr.length;j++){
                    if(j==titleArr.length-1){
                        arr.push(parseFloat(dataSource[i][titleArr[j]]));
                    }else{
                        arr.push(dataSource[i][titleArr[j]]);
                    }
                }
                tableData.push(arr);

            }
            return tableData;
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
            var dataSrc = CMOFDT.getDataSource();
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
    CMOFDT.init();
});
window.addEventListener("resize", function () {
    CMOFDT.resize();
});
function exportExcel(){
    if(CMOFDT.DownloadInfo==1){
        alert("您尚未开通下载Excel权限!");
        return;
    }else {
    var ds = CMOFDT.getDataSource();
    var xname = CMOFDT.getXSource();
    var array=ds;
    var sheetName=["企业报价详情"];
    var titleName=[xname];
    $("#titleName").val(JSON.stringify(titleName));
    $("#fileName").val(JSON.stringify(sheetName));
    $("#sheetName").val(JSON.stringify(sheetName));
    $("#excelArray").val(JSON.stringify([array]));
    $('#hyExport').submit() ;
    }
}