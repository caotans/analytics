<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="${ctx}/js/sys/analysisPrice.js"></script>
</head>

<script>
    priceData=${gwChartArray};
    $(function(){
        var ls = window.localStorage;
        var codeName = JSON.parse(ls.getItem("CodeName"));
        myChart_price = echarts.init(document.getElementById('tb_price'));
        myChart_price.clear();
        if(priceData==null){
            myChart_price.showLoading({
                effect:'bubble',
                text : '暂无数据',
                textStyle : {fontSize : 20 ,color : '#404040'},
                effectOption: {backgroundColor: '#fefefe'}
            });
        }else{
            myChart_price.showLoading({
                text: '正在努力的读取数据中...',    //loading话术
                effect: 'whirling'
            });
            dawPriceEchart(priceData, myChart_price, 'guowai',codeName);
        }
        myChart_price.hideLoading();
    });
</script>

