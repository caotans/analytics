PRFT = function(){
    var firstClickTl=true;
    var mdoption = initOption();
    var  option = {
        grid:{
            x : '8%',
            y : '10%',
            x2 : '8%',
            y2 : '25%',
            borderColor:'white'
        },
        tooltip : {
            trigger: 'axis',
            formatter: function(param){
                var ft = param[0].name+"<br>";
                for(var i=0;i<param.length;i++){
                    if(param[i].seriesName=="毛利润变化率"&&(typeof param[i].value == "number")){
                        ft += param[i].seriesName+":"+Math.floor(param[i].value*100 *100)/100+"%";
                    }else{
                        ft += param[i].seriesName+":"+param[i].data+"<br>";
                    }
                }
                return ft;
            },
            axisPointer : {
                type:'line',
                lineStyle:{
                    type:'dotted',
                    color:'#a3a3a3'
                }
            }
        },
        legend: {
            data:['毛利润','毛利润变化率'],
            y:"85%",
            selected:{
                '毛利润':true,
                '毛利润变化率':true
            }
        },
        //工具箱
        toolbox: {
            x : 730,
            color:['#000','#000','#000','#000','#000'],
            //显示策略，可选为：true（显示） | false（隐藏），默认值为false
            show : false,
            feature : {
                //辅助线标志
                mark : {show: true},
                //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能
                dataView : {show: true, readOnly: false},
                //magicType，动态类型切换，支持直角系下的折线图、柱状图、堆积、平铺转换,'line', 'bar', 'stack', 'tiled'
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                //restore，还原，复位原始图表
                restore : {show: true},
                //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'
//                saveAsImage : {show: true},
                myTool : {
                    show : true,
                    title : '导出Excel',
                    icon : 'images/excel01.png',
                    onclick : function(){
                        alert("下载Excel");
                    }
                }
            }
        },
        calculable : true,
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
                //不显示网格
                axisLabel:{
                    formatter:null,
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

            },
            {
                type : 'value',
                name:'百分比',
                scale:true,
                //不显示网格
                axisLine:{
                    lineStyle:{
                        color: '#a3a3a3'
                    }
                },
                splitLine:{
                    show:false
                },
                axisLabel : {
                    formatter: function(param){
                        return param*100+"%";
                    },
                    textStyle:{
                        color:'#a3a3a3'
                    }
                }
            }

        ],
        series : [
            {
                name:"毛利润",
                zlevel : 0,
                type:"line",
                smooth:false,
                data:[0],
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                //标志图形大小
                symbolSize: 0|0
            },
            {
                name:"毛利润变化率",
                zlevel : 1,
                type:"line",
                smooth:false,
                data:[0],
                symbolSize: 0|0,
                yAxisIndex:1
            }
        ]
    };
    var  option2 = {
        grid:{
            x : '8%',
            y : '10%',
            x2 : '8%',
            y2 : '25%',
            borderColor:'white'
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
        legend: {
            data:['进口VS国内','进口VS美国','进口VS韩国'],
            y:"85%",
            selected:{
            }
        },
        //工具箱
        toolbox: {
            x : 730,
            color:['#000','#000','#000','#000','#000'],
            //显示策略，可选为：true（显示） | false（隐藏），默认值为false
            show : false,
            feature : {
                //辅助线标志
                mark : {show: true},
                //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能
                dataView : {show: true, readOnly: false},
                //magicType，动态类型切换，支持直角系下的折线图、柱状图、堆积、平铺转换,'line', 'bar', 'stack', 'tiled'
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                //restore，还原，复位原始图表
                restore : {show: true},
                //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'
                saveAsImage : {show: true},
                myTool : {
                    show : true,
                    title : '导出Excel',
                    icon : 'images/excel01.png',
                    onclick : function(){
                        alert("下载Excel");
                    }
                }
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                //边界间隙 true为有间隙 false为无间隙，从X轴最左侧开始
                boundaryGap:false,
                data :[''],
                splitLine:{
                    show:false
                },
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
                name:'美元/吨' ,
                scale:true,
                axisLabel:{
                    formatter:null,
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
            {
                name:"进口VS国内",
                zlevel : 0,
                type:"line",
                smooth:false,
                data:[0],
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                symbolSize: 0|0
            },
            {
                name:"进口VS美国",
                zlevel : 1,
                type:"line",
                smooth:false,
                data:[0],
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                symbolSize: 0|0
            },
            {
                name:"进口VS韩国",
                zlevel : 1,
                type:"line",
                smooth:false,
                data:[0],
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                symbolSize: 0|0
            }
        ]
    };
    var myCharts = drawPic("tb_lr");
    return {
        init : function(){
            this.liid;
            this.weidu;
            this.dtype;
            this.productcode = selprdcode;
            this.productname = selprdname;
            this.modelcode = $("#pfmoduleId").val();
            if($("#pflist").val()==""){
                this.pflist = [];
            }else{
                this.pflist = $.parseJSON($("#pflist").val());
            }
            this.pfcodestr = "'"+getObjData(this.pflist,'PACode').join("','")+"'";
            this.pfnamestr = "'"+getObjData(this.pflist,'PAName').join("','")+"'";
            if($("#lrlist").val()==""){
                this.lrlist = [];
            }else{
                this.lrlist = $.parseJSON($("#lrlist").val());
            }
            this.lrcodestr = "'"+getObjData(this.lrlist,'PACode').join("','")+"'";
            this.lrnamestr = "'"+getObjData(this.lrlist,'PAName').join("','")+"'";
            this.modelid = "profit";
            this.modselector = $("div#"+this.modelid);
            this.picdom = "tb_lr";
            this.selected;
            this.option = option;
            this.option2 = option2;

            this.order = "";

            myCharts.on(echarts.config.EVENT.LEGEND_SELECTED,function(e){
                PRFT.selected = e.selected;
            });

//			this.initDom();
            this.firstLoad();
        },
        showLoad : function(){
            myCharts.clear();
            myCharts.showLoading({
                text: '正在努力的读取数据中...',    //loading话术
                effect: 'whirling'
            });
        },
        drawDom : function(l,w,t){
            if(t=="ecpic"){
                $("div.qh_box","#"+PRFT.modelid).hide();
                $("#proftDiv").show();
                PRFT.drawProPic(l,w);
            }else if(t=="dttb"){
                $("div.qh_box","#"+PRFT.modelid).show();
                $("#proftDiv").show();
            }
        },
        drawProPic : function(l,w){
            var pd = this.picdom;
            $("div#"+pd,PRFT.modselector).show();
            $("div.grd",PRFT.modselector).hide();
            PRFT.resize();
            this.showLoad();
            var aj = $.ajax({
                type:"POST",
                dataType:"json",
                url:"getprofitdata?li="+l+"&wd="+w+"&type=pic"+"&productcode="+PRFT.productcode,
                timeout : 100000, //超时时间设置，单位毫秒
                success:function(data){
                    if(data!=null){
                        myCharts.hideLoading();
                        var myoption;
                        if(l=="lr"){
                            if(PRFT.lrlist.length==0){
                                myCharts.clear();
                                myCharts.showLoading({
                                    animation:false,
                                    text : '暂无数据',
                                    textStyle : {fontSize : 20 ,color : '#404040'},
                                    effectOption: {backgroundColor: '#fefefe'}
                                });
                                return;
                            }
                            var lgarr = getObjData(PRFT.lrlist,'PAName');
                            var lgcdarr = getObjData(PRFT.lrlist,'PACode');
                            myoption = option;
                            myoption.legend.data = lgarr;
                            myoption.legend.selected = PRFT.selected;
                            myoption.xAxis[0].data = searchFromArr(data,'PACode',data[0].PACode,'DataDate'),

                                myoption.series = [];
                            for(var i=0;i<lgarr.length;i++){
                                if(lgarr[i].indexOf("变化率")>0){
                                    myoption.series.push({
                                        name:lgarr[i],
                                        zlevel : 1,
                                        type:"line",
                                        smooth:false,
                                        data:searchFromArr(data,'PACode',lgcdarr[i],'DataValue'),
                                        symbolSize: 0|0,
                                        yAxisIndex:1
                                    });
                                }else{
                                    myoption.series.push({
                                        name:lgarr[i],
                                        zlevel : 0,
                                        type:"line",
                                        smooth:false,
                                        data:searchFromArr(data,'PACode',lgcdarr[i],'DataValue'),
                                        itemStyle: {
                                            normal: {
                                                areaStyle: {
                                                    type: 'default'
                                                }
                                            }
                                        },
                                        //标志图形大小
                                        symbolSize: 0|0
                                    });
                                }
                            }
                        }else if(l=="tl"){
                            if(PRFT.pflist.length==0){
                                myCharts.clear();
                                myCharts.showLoading({
                                    animation:false,
                                    text : '暂无数据',
                                    textStyle : {fontSize : 20 ,color : '#404040'},
                                    effectOption: {backgroundColor: '#fefefe'}
                                });
                                return;
                            }
                            var lgarr=[];
                            lgarr = getObjData(PRFT.pflist,'PAName');
                            var lgcdarr = getObjData(PRFT.pflist,'PACode');

                            myoption = option2;
                            myoption.legend.data = lgarr;
                            myoption.legend.selected = PRFT.selected;
                            myoption.xAxis[0].data = searchFromArr(data,'PACode',data[0].PACode,'DataDate'),
                            //myoption.xAxis[0].data = searchFromArr2(data,'PACode',data[0].PACode,'DataDate'),
                                myoption.series = [];
                            for(var i=0;i<lgarr.length;i++){
                                //先隐藏掉期限对比的数据
                                if(lgcdarr[i]=='PACODE006'||lgcdarr[i]=='PACODE009'){continue;}
                                myoption.series.push({
                                    name:lgarr[i],
                                    zlevel : 1,
                                    type:"line",
                                    smooth:false,
                                    data:searchFromArr(data,'PACode',lgcdarr[i],'DataValue'),
                                    itemStyle: {
                                        normal: {
                                            areaStyle: {
                                                type: 'default'
                                            }
                                        }
                                    },
                                    symbolSize: 0|0
                                });
                            }
                        }
                        var legend=myoption.legend.data;
                        for(var k=0;k<legend.length;k++){
                            if(legend[k].indexOf('期现对比')>0){legend.splice($.inArray(legend[k],legend),1);}
                        }
                        myCharts.setOption(myoption);
                        PRFT.selected = myCharts.getOption().legend.selected;
                    }else{
                        myCharts.clear();
                        myCharts.showLoading({
                            animation:false,
                            text : '暂无数据',
                            textStyle : {fontSize : 20 ,color : '#404040'},
                            effectOption: {backgroundColor: '#fefefe'}
                        });
                    }
                },
                error:function(xhr,e){
                    var err = '读取数据出错';
                    if(e=="parsererror"){
                        err = '数据获取地址出错，请联系管理员';
                    }else if(e=="timeout"){
                        err = "读取数据超时";
                    }
                    myCharts.showLoading({
                        text: err,    //loading话术
                        effect: 'whirling'
                    });
                }
            });
            this.initDom();
        },
        drawTa : function(l,w){
            var pd = this.picdom;
            $("div.grd",PRFT.modselector).show();
            $("div#"+pd,PRFT.modselector).hide();
            this.showLoad();
            var pd = this.picdom;
            $.ajax({
                type:"POST",
                dataType:"json",
                url:"getprofitdata?li="+l+"&wd="+w+"&productcode="+PRFT.productcode
                    +"&order="+encodeURI(encodeURI(PRFT.order))+"&type=tab",
                success:function(data){
                    myCharts.hideLoading();
                    $("div#"+pd,PRFT.modselector).hide();
                    $("div.grd",PRFT.modselector).show();
                    //以下加载表格数据
                    var opt = {
                        data : data,
                        datamap : [{
                            name : '日期', //字段中文名，绘制table时会展示在表头
                            value : 'PubDate', //后台的字段名
                            width : 20 , //字段所占百分比宽度
                            tg : 0 , //字段标识，不得重复
                            sorting : true
                        },{
                            name : '类型',
                            value : 'LX',
                            width : 35 ,
                            tg : 1,
                            sorting : true
                        },{
                            name : '套利空间',
                            value : 'CJ',
                            width : 15 ,
                            tg : 2 ,
                            sorting : true
                        },{
                            name : '变化',
                            value : 'BH',
                            width : 15 ,
                            tg : 3 ,
                            sorting : true,
                            render : function(data){
                                var value = 0;
                                if(data.BH&&typeof data.BH=="number"){
                                    value = parseFloat(data.BH);
                                }
                                var str = "";
                                if(value>0){
                                    str =  '<th><span style="color:#ff0000;">+'+value+'</span></th>';
                                }else if(value<0){
                                    str = '<th><span style="color:#00c533;">'+value+'</span></th>';
                                }else{
                                    str = '<th><span>'+value+'</span></th>';
                                }
                                return str;
                            }
                        },{
                            name : '单位',
                            value : 'DW',
                            width : 15 ,
                            tg : 4
                        }]
                    };
                    PRFT.drawTable("profit_tab",opt);
                    $("#profit_tab > tbody >tr").css("cursor","pointer");
                    $("#profit_tab > tbody >tr").bind('click',function(){
                        $("#proftDiv").show();
                        $("div.qh_box > a","#"+PRFT.modelid).html("切换为表");
                        var tr = $(this);
                        var dmtg = 1;
                        var lx = $("th[tg='"+dmtg+"']",tr).html();
                        PRFT.showTabPic(PRFT.liid,PRFT.weidu,lx);
//	            		PRFT.resize();
                    });
                },
                error:function(e){
                    //alert("系统错误,请联系管理员！");
                }
            });
            this.initDom();
        },
        showTabPic : function(l,w,t){
            var selected = {};
            var opt;
            var lgarr = [];
            if(l=="tl"){
                lgarr = getObjData(PRFT.pflist,'PAName');
            }
            for(var i=0;i<lgarr.length;i++){
                selected[lgarr[i]]=false;
            }
            selected[t] = true;
            this.drawProPic(l, w);
            this.selected = selected;
        },
        changeLi : function(dom){
            $("div.grd","#"+PRFT.modelid).attr("style","display:none")
            this.liid = dom;

//			this.dtype = tp;
            if(dom=='tl'){
                this.dtype = 'dttb';
//				this.loadWdDom(this.liid);
            }else{
                this.dtype = 'ecpic';
            }
            this.loadWdDom(this.liid);
            if(dom=='tl'){
                $("div.day_box > span:first",PRFT.modselector).addClass('day_forecast');
                this.weidu = $("div.day_box > span:first",PRFT.modselector).attr("wd");
                this.backToPic();
            }
            $("div.day_box > span:first",PRFT.modselector).addClass('day_forecast');
            this.weidu = $("div.day_box > span:first",PRFT.modselector).attr("wd");
//			this.drawProPic(this.liid,this.weidu);
            this.drawDom(this.liid,this.weidu, this.dtype);
            if(dom=="lr"){
                this.selected=option.legend.selected;
            }else if(dom=="tl"){
                this.order = "{\"LX\":1}";
                this.selected=option2.legend.selected;
            }
            var clickName = $("#" + dom + " > a", PRFT.modselector).html();
            var prdName = this.productname;
            var wd=$("#proftDiv .day_forecast").text();
            ga('send', 'event', {
                'eventCategory': 'tab点击',
                'eventAction': clickName+'-'+wd
            });
        },
        changeWd : function(wd){
            this.weidu = wd;
//			this.drawProPic(this.liid,this.weidu);
            this.drawDom(this.liid,this.weidu, this.dtype);
            var clickName = $("[wd='" + wd + "']", PRFT.modselector).text();
            var tabName = $("#" + this.liid + " > a", "#profit").html();
            var prdName = this.productname;
            ga('send', 'event', {
                'eventCategory': '维度选择',
                'eventAction': tabName+'-'+clickName,
                'dimension3': tabName
            });
        },
        changeTbWd : function(wd){
            this.weidu = wd;
            if($("div.grd","#"+PRFT.modelid).is(":visible")){
                PRFT.drawTa(PRFT.liid, PRFT.weidu);
            }else{
                PRFT.drawProPic(PRFT.liid, PRFT.weidu);
            }
            var clickName = $("[wd='" + wd + "']", PRFT.modselector).text();
            var tabName = $("#" + this.liid + " > a", "#profit").html();
            var prdName = this.productname;
            ga('send', 'event', {
                'eventCategory': '维度选择',
                'eventAction': tabName+'-'+clickName,
                'dimension3': tabName
            });
//			this.drawProPic(this.liid, this.weidu);
        },
        backToPic : function(){
            var firstWD= $("#proftDiv> span:first").attr("wd");
            if(firstClickTl){
                this.weidu=firstWD;firstClickTl=false;
            }
            else{this.weidu=this.weidu}
            if($("div.grd","#"+PRFT.modelid).is(":visible")){
                $(".day_box","#"+PRFT.modelid).show();
                $("div.qh_box > a","#"+PRFT.modelid).html("切换为表");
                this.drawProPic(this.liid, this.weidu);
            }else{
                $(".day_box","#"+PRFT.modelid).show();
                $("div.qh_box > a","#"+PRFT.modelid).html("切换为图");
                this.drawTa(this.liid, this.weidu);
            }
            var clickName = $("#proftDiv .day_forecast").text();
            var tabName = $("#" + this.liid + " > a", "#profit").html();
            var prdName = this.productname;
            ga('send', 'event', {
                'eventCategory': '图表切换',
                'eventAction': tabName+'-'+clickName,
                'dimension3': tabName
            });
        },
        initDom : function(){
            $("div.data_nav_box > li.china",PRFT.modselector).bind("click",function(){
                $("li.china",$(this).parent()).removeClass("selected");
                $(this).addClass("selected");
            });

            $("div.data_nav_box > li.china > dl >dd",PRFT.modselector).bind("click",function(){
                $("dd",$(this).parent().parent().parent()).removeClass("selected");
                $(this).addClass("selected");
            });

            $("div.day_box > span",PRFT.modselector).bind("click",function(){
                $("span",$(this).parent()).removeClass('day_forecast');
                $(this).addClass('day_forecast');
            });

        },
        firstLoad : function(){
            this.liid = $("div.data_nav_box > li.china:first",PRFT.modselector).attr("id");
            this.dtype = $("div.data_nav_box > li.china:first",PRFT.modselector).attr("dtype");
            this.loadWdDom(this.liid);
            $("li.china:first",PRFT.modselector).addClass("selected");
            $("#proftDiv > span:first").addClass('day_forecast');

//			this.drawProPic(this.liid,this.weidu);
//		    this.drawDom(this.liid,this.weidu, this.dtype);
            $("li.china:first",PRFT.modselector).trigger('click');
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
                if(this.dtype=='ecpic'){
                    html += "<span wd=\""+arr[i]+"\" onclick=\"PRFT.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
                }else if(this.dtype=='dttb'){
                    html += "<span wd=\""+arr[i]+"\" onclick=\"PRFT.changeTbWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
                }
            }
            $("div#"+this.modelid+" > div.day_box").html("");
            $("div#"+this.modelid+" > div.day_box").append(html);
        },
        showDetail : function(modcode){
            var ls = window.localStorage;
            ls.setItem("sel",JSON.stringify(this.selected));   //将图例的选中信息保存到localStorage中
            var tabName=$('#'+this.liid+'>a').text();
            ga('send','event',{
                'eventCategory':'历史数据点击',
                'eventAction': tabName+'-'+this.weidu+'点击'
                })
            window.location.href = "prodetail?productCode="+this.productcode+"&moduleId="+this.modelcode+"&pld="+this.liid+"_dt"+"&pwd="+this.weidu;
        },
        resize : function(){
            if($(myCharts.dom).is(':visible')){
                myCharts.resize();
            }
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
            //重新绘制表格，跳转至第一页
            this.drawTa(this.liid,this.weidu);
            var pm=this.productname;
            var wd=$("#proftDiv .day_forecast").text();
                 ga('send', 'event', {
                'eventAction': '表格排序',
                'eventCategory': pm+'-利润-套利排序-'+wd
            });
        },
        drawTable : function(tabid,option){
            var thead = "<thead><tr class='tb_title'>";
            for(var i=0;i<option.datamap.length;i++){
                if(option.datamap[i].sorting){
                    var oj;
                    if(PRFT.order == ""){
                        oj = $.parseJSON("{"+this.order+"}");
                    }else{
                        oj = $.parseJSON(this.order);
                    }
                    var colname = option.datamap[i].value;
                    var sorthtml = "";
                    if(typeof oj[colname] === "undefined"){
                        sorthtml += '<a class="ascending01"></a><a class="descending01"></a>';
                    }else if(oj[colname]==0){
                        sorthtml += '<a class="ascending01"></a><a class="descending41"></a>';
                    }else{
                        sorthtml += '<a class="ascending42"></a><a class="descending01"></a>';
                    }
                    thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%" style="cursor:hand;" onclick="PRFT.changeOrder(\''+option.datamap[i].value+'\')"><span>'+option.datamap[i].name+'</span><span class="ascending_box">'+sorthtml+'</span></th>';
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
                        tbody += '<tr class="tb_content">';
                    }

                    for(var x=0;x<option.datamap.length;x++){
                        var th = '';
                        if(option.datamap[x].value){
                            var colvalue = option.datamap[x].value;
                            th = '<th tg="'+option.datamap[x].tg+'">'+option.data[j][colvalue]+'</th>';
                        }
                        if(option.datamap[x].render){
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
        },
        KcTable: function (newArray_price) {
            var wb1 = 1;
            var wb2 = 1;
            var tr_price;
            var content_kc;
            if (newArray_price != '' && newArray_price != null && newArray_price != 'undefined') {
                for (var i = 0; i <newArray_price.length; i++) {
                    var value = 0;
                    if (newArray_price[i].Inventory) {
                        value = (newArray_price[i].rise).toFixed(2);
                        //添加一个属性
                    }
                    var str = "";
                    if (value > 0) {
                        str = '<th style="width:20%;"><span style="color:#ff0000;">+' + value + '</span></th>';
                    }
                    else if(value<0) {
                        str = '<th style="width:20%;"><span style="color:#00c533;">' + value + '</span></th>';
                    }
                    else{
                        str = '<th style="width:20%;"><span>+' + value + '</span></th>';
                    }
                    var codeName = newArray_price[i].LX;
                    if (wb1 == 1) {
                        tr_price = '<tr style="cursor:pointer" class="tb_content">';
                        wb1 = wb1 + 1;
                    } else if (wb1 == 2) {
                        tr_price = '<tr style="cursor:pointer">';
                        wb1 = wb1 - 1;
                    }
                    content_kc = content_kc + tr_price +
                        '<th style="width:20%;">' + newArray_price[i].PubDate + '</th>' +
                        '<th style="width:20%;" class="codename">' + codeName + '</th>' +
                        '<th style="width:20%;">' + newArray_price[i].CJ + '</th>' +
                        str +
                        '<th style="width:20%;">' + newArray_price[i].DW + '</th>' +
                        '</tr>';
                    /* }else{*/
                    if (wb2 == 1) {
                        tr_price = '<tr style="cursor:default" class="tb_content" >';
                        wb2 = wb2 + 1;
                    } else if (wb2 == 2) {
                        tr_price = '<tr style="cursor:default" >';
                        wb2 = wb2 - 1;
                    }

                }

            }
            else {
                content_kc = "<div style='height:260px; top:35px; left:0; width:100%; text-align: center;vertical-align:middle;display: table-cell;'>无数据</div>";
                $("#gongxu_tab>th").remove();
            }
            $("#gongxu_tab>tbody").html(content_kc);
        },
        //排序方法
        sort_price: function (obj, field,modle) {
            var order = commonSort2(obj);
            KcArr = sortArray2(KcArr, field, order);
            this.KcTable(KcArr);
            var pm=this.productname;
            ga('send', 'event', {
                'eventAction': '表格排序',
                'eventCategory': pm+'-利润-套利排序'
            });
        }

    }
}();
$(function(){
    PRFT.init();
});
window.addEventListener("resize", function () {
    PRFT.resize();
});