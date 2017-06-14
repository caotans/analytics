/**
 * Created by Administrator on 2016/11/7.
 */
var borderColor='white';//图表内的网格线颜色
var tooltipColor='#dfdfdf';//tooltip里面的线条颜色
var axisLabelColor='#a3a3a3';//坐标轴的单位字体颜色
var axisLineColor='#dfdfdf';//坐标颜色
var axisTickColor='#dfdfdf';//坐标小标记的颜色
var splitLineColor=['#dfdfdf'];//分隔线颜色
/**
 * 柱状图模板
  */
var histogram= {
    title : {
        x:'center'
    },
    grid:{
        borderColor:borderColor
    },
    toolbox: {
        color:['#000','#000','#000','#000','#000'],
        //显示策略，可选为：true（显示） | false（隐藏），默认值为false
        show : true,
        x:260,
        feature : {
            //辅助线标志
            mark : {show: true},
            padding: 0,
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
                title : '下载',
                icon : '../../images/excel01.png',
                onclick : function (){
                    alert('正在下载')
                }
            }
        }

    },
    tooltip : {

        trigger: 'axis',
        formatter:null,
        axisPointer : {
            type:'line',
            lineStyle:{
                type:'dotted',
                color:tooltipColor
            }
        }
    },
    legend: {
        data:[],
        y:"bottom"
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap:true,
            data :[],
            axisLabel:{
                textStyle:{
                    color:axisLabelColor
                }
            },
            splitLine:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color: axisLineColor
                }
            },
            axisTick:{
                lineStyle:{
                    color:axisTickColor
                }
            }
        }
    ],
    yAxis : [
        {
            name:'',
            scale:true,
            axisLabel: {
                formatter: null
            }
        }

    ],
    series : []
};
