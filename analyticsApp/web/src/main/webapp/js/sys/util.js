$.ajaxSetup({
    cache: false, //close AJAX cache
    method: "POST",
    timeout : 600000, //超时时间设置，单位毫秒
});
/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 16-12-1
 * Time: 下午5:25
 * To change this template use File | Settings | File Templates.
 */
/**
 * 传参数对数组进行排序
 * arr 支持数组[[],[]]
 * field 数组的下标
 * order asc/desc
 */
function sortArray(arr, field, order, model) {
    var refer = [], result = [], order = order == 'asc' ? 'asc' : 'desc', index, type;
    if(arr){
        for (var i = 0; i < arr.length; i++) {
            if (model) {
                if (typeof (arr[i][0][field]) == "number" && i == 0) {
                    type = "number";
                } else if (typeof (arr[i][0][field]) == "string" && i == 0) {
                    type = "string";
                }
            }
            else {
                if (typeof (arr[i][field]) == "number" && i == 0) {
                    type = "number";
                } else if (typeof (arr[i][field]) == "string" && i == 0) {
                    type = "string";
                }
            }

            if (model == 'gx') {
                refer[i] = arr[i][0][field] + ':' + i;
            }
            else {
                refer[i] = arr[i][field] + ':' + i;
            }
        }
    }
    if (type && type == "string") {
        refer.sort();
        if (order == 'desc') refer.reverse();
    } else if (type && type == "number") {
        refer.sort(function sortNumber(a, b) {
            return a.split(':')[0] - b.split(':')[0]
        });
        if (order == 'desc') refer.reverse();
    }

    for (i = 0; i < refer.length; i++) {
        index = refer[i].split(':')[1];
        result[i] = arr[index];
    }
    return result;
}
function sortArray2(arr, field, order) {
    var refer = [], result = [], order = order == 'asc' ? 'asc' : 'desc', index, type;
    for (var i = 0; i < arr.length; i++) {

        if (typeof (arr[i][field]) == "number") {
            type = "number";
        } else if (typeof (arr[i][field]) == "string") {
            type = "string";
        }
        refer[i] = arr[i][field] + ':' + i;
    }
    if (type && type == "string") {
        refer.sort();
        if (order == 'desc') refer.reverse();
    } else if (type && type == "number") {
        refer.sort(function sortNumber(a, b) {
            return a.split(':')[0] - b.split(':')[0]
        });
        if (order == 'desc') refer.reverse();
    }

    for (i = 0; i < refer.length; i++) {
        index = refer[i].split(':')[1];
        result[i] = arr[index];
    }
    return result;
}
/**
 * [1,2,3,5]
 *        一维数组
 * * */
function sortArray3(arr, field, order) {
    var refer = [], result = [], order = order == 'asc' ? 'asc' : 'desc', index, type;
    for (var i = 0; i < arr.length; i++) {

        if (typeof (arr[i]) == "number") {
            type = "number";
        } else if (typeof (arr[i]) == "string") {
            type = "string";
        }
        refer[i] = arr[i] + ':' + i;
    }
    if (type && type == "string") {
        refer.sort();
        if (order == 'desc') refer.reverse();
    } else if (type && type == "number") {
        refer.sort(function sortNumber(a, b) {
            return a.split(':')[0] - b.split(':')[0]
        });
        if (order == 'desc') refer.reverse();
    }

    for (i = 0; i < refer.length; i++) {
        index = refer[i].split(':')[1];
        result[i] = arr[index];
    }
    return result;
}
function formatDate(date, format) {
    var paddNum = function (num) {
        num += "";
        return num.replace(/^(\d)$/, "0$1");
    }
    //指定格式字符
    var cfg = {
        yyyy: date.getFullYear() //年 : 4位
        , yy: date.getFullYear().toString().substring(2)//年 : 2位
        , M: date.getMonth() + 1  //月 : 如果1位的时候不补0
        , MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
        , d: date.getDate()   //日 : 如果1位的时候不补0
        , dd: paddNum(date.getDate())//日 : 如果1位的时候补0
        , hh: date.getHours()  //时
        , mm: date.getMinutes() //分
        , ss: date.getSeconds() //秒
    }
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function (m) {
        return cfg[m];
    });
}

function blockElement(obj, msg) {
    if (msg == null) {
        msg = '正在努力的读取数据中...';
    }
    var subMsgBox = '<div style="text-align:center;color:#666;padding:8px 0px;line-height:35px"><div>' + msg + '</div><div><img style="margin-left: 97px;" src="img/loading_1.gif" alt=""/></div></div>';
    $(obj).block({
        message: subMsgBox,
        fadeIn: 0,
        fadeOut: 0,
        showOverlay: true,
        centerY: true,
        css: {
            width: '300px',
            padding: '2px',
            '-webkit-border-radius': '5px',
            '-moz-border-radius': '5px',
            color: '#ddd',
            border: '2px solid #aaa',
            left: '50%',
            'margin-left': '0px'
        },
        overlayCSS: {opacity: 0.1, backgroundColor: '#eee', cursor: "default"
        }
    });
}

function unblockElement(obj) {
    $(obj).unblock();
}

/**
 * 导出echarts图片
 * @param myChart_downstream
 * @param fileName
 */
function exportEchatsImg(myChart_downstream, fileName, mould_option) {
    mould_option.toolbox.show = false; //隐藏工具箱
    myChart_downstream._setOption(mould_option);
    var image = myChart_downstream.getDataURL("image/png").replace("image/png", "image/octet-stream;Content-Disposition: attachment;");
//    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
//    save_link.href = image;
//    save_link.download = fileName+".png";
//    var event = document.createEvent('MouseEvents');
//    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//    save_link.dispatchEvent(event);

    myChart_downstream.getOption().toolbox.show = true;
    mould_option.toolbox.show = true;
    myChart_downstream._setOption(mould_option);

    $("#imageDataFileName").val(fileName);
    $("#imageDataUrl").val(image.split(",")[1]);
    $("#exportEchartsImg").submit();
}

function DatePicker(beginSelector, endSelector) {
    // 仅选择日期
    $(beginSelector).datepicker(
        {
            language: "zh-CN",
            autoclose: true,
            startView: 0,
            format: "yyyy-mm-dd",
            clearBtn: true,
            todayBtn: false,
            endDate: new Date()
        }).on('changeDate', function (ev) {
            if (ev.date) {
                $(endSelector).datepicker('setStartDate', new Date(ev.date.valueOf()))
            } else {
                $(endSelector).datepicker('setStartDate', null);
            }
        })

    $(endSelector).datepicker(
        {
            language: "zh-CN",
            autoclose: true,
            startView: 0,
            format: "yyyy-mm-dd",
            clearBtn: true,
            todayBtn: false,
            endDate: new Date()
        }).on('changeDate', function (ev) {
            if (ev.date) {
                $(beginSelector).datepicker('setEndDate', new Date(ev.date.valueOf()))
            } else {
                $(beginSelector).datepicker('setEndDate', new Date());
            }

        })
}


/**
 * 查出图例中有效的时间
 * @param args
 * @returns {*}
 */
function findTimeDate(filedName, filedValue, data) {
    var length = 0; //算出日期最多的那个图例,sql语句需要过滤掉有日期但是值为空或者0的数据
    for (var i = 0; i < data.length; i++) {
        if (data[i].length - length > 0) {
            length = data[i].length;
        }
    }
    var xData = [];
    for (var i = 0; i < length; i++) {
        var flag = false;
        for (var j = 0; j < data.length; j++) {
            if (data[j][i]) {
                if (data[j][i][filedValue] != 0 && data[j][i][filedValue] != "") {
                    //alert(data[j][i][filedValue]);
                    xData.push(data[j][i][filedName]);
                    break;
                }
            }
        }

    }

    var temp = []; //一个新的临时数组
    //遍历当前数组
    for (var i = 0; i < xData.length; i++) {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (temp.indexOf(xData[i]) == -1) temp.push(xData[i]);
    }
    xData = sortArray(temp, filedName, "asc")
    return xData;
}

/**
 * 获取之前某年
 * @returns {string}
 */
function getSomeYear(year) {
    var dt = new Date();
    dt.setYear(dt.getFullYear() - year);
    return formatDate(dt, "yyyy/MM/dd");
}

/**
 * 获取之前某天/某周
 * @returns {string}
 */
function getSomeDate(day) {
    var dt = new Date();
    dt.setDate(dt.getDate() - day);
    return formatDate(dt, "yyyy/MM/dd");
}
/**
 * 获取当前日期
 * @returns {string}
 */
function getNowDate() {
    var dt = new Date();
    return formatDate(dt, "yyyy/MM/dd");

}

/**
 * 公用排序效果  --首页
 * @obj 当前元素
 * @ 数组
 * @ 字段名称
 * @ funName 方法名称
 * @datasource  数据源名称
 */
function commonSort(obj) {
    var upOrDown = "";
    if (obj == '' || obj == null) {
        upOrDown = 'desc';
    } else {
        var up = $(obj).children("span:first-child").next().children(".ascending32").attr("class");
        var down = $(obj).children("span:first-child").next().children(".descending31").attr("class");
        if (down) {
            //降序
            $(obj).children("span:first-child").next().find("a:nth-child(1)").attr("class", "ascending32");
            $(obj).children("span:first-child").next().find("a:nth-child(2)").attr("class", "descending");
            upOrDown = "desc";
        }
        if (up) {
            //升序
            $(obj).children("span:first-child").next().find("a:nth-child(1)").attr("class", "ascending");
            $(obj).children("span:first-child").next().find("a:nth-child(2)").attr("class", "descending31");
            upOrDown = "asc";
        }
        if (!down && !up) {
            //默认正序
            $(obj).children("span:first-child").next().find("a:nth-child(1)").attr("class", "ascending");
            $(obj).children("span:first-child").next().find("a:nth-child(2)").attr("class", "descending31");
            upOrDown = "asc";
        }

        //遍历其他元素进行重置
        $(obj).nextAll().find("a:nth-child(1)").attr("class", "ascending");
        $(obj).nextAll().find("a:nth-child(2)").attr("class", "descending");
        $(obj).prevAll().find("a:nth-child(1)").attr("class", "ascending");
        $(obj).prevAll().find("a:nth-child(2)").attr("class", "descending");
    }
}


/**
 * 公用排序效果  --详情
 * @obj 当前元素
 * @ 数组
 * @ 字段名称
 * @ funName 方法名称
 * @datasource  数据源名称
 */
function commonSort2(obj) {
    var upOrDown = "";
    //直接判断当前表头里面是否是既有上又有下箭头
    var up = $(obj).children("span:first-child").next().children(".ascending42").attr("class");
    var down = $(obj).children("span:first-child").next().children(".descending41").attr("class");
    if (down) {
        //降序
        $(obj).children("span:first-child").next().find("a:nth-child(1)").attr("class", "ascending42");
        $(obj).children("span:first-child").next().find("a:nth-child(2)").attr("class", "descending01");
        upOrDown = "desc";
    }
    if (up) {
        //升序
        $(obj).children("span:first-child").next().find("a:nth-child(1)").attr("class", "ascending01");
        $(obj).children("span:first-child").next().find("a:nth-child(2)").attr("class", "descending41");
        upOrDown = "asc";
    }
    if (!down && !up) {
        //默认正序
        $(obj).children("span:first-child").next().find("a:nth-child(1)").attr("class", "ascending01");
        $(obj).children("span:first-child").next().find("a:nth-child(2)").attr("class", "descending41");
        upOrDown = "asc";
    }

    //遍历其他元素进行重置
    $(obj).nextAll().find("a:nth-child(1)").attr("class", "ascending01");
    $(obj).nextAll().find("a:nth-child(2)").attr("class", "descending01");
    $(obj).prevAll().find("a:nth-child(1)").attr("class", "ascending01");
    $(obj).prevAll().find("a:nth-child(2)").attr("class", "descending01");
    return upOrDown;
}
/**
 * 查找当前是倒序还是正序--详情
 * @obj 当前元素
 * @ 数组
 * @ 字段名称
 * @ funName 方法名称
 * @datasource  数据源名称
 */
function getSortOrder(obj) {
    var upOrDown = "";
    //若obj为空 则返回'desc'
    if (obj == '' || obj == null) {
        upOrDown = 'desc';
    } else {
        //直接判断当前表头里面是否是既有上又有下箭头
        var up = $(obj).children("span:first-child").next().children(".ascending32").attr("class");
        var down = $(obj).children("span:first-child").next().children(".descending31").attr("class");
        if (down) {
            //降序
            upOrDown = "desc";
        }
        if (up) {
            //升序
            upOrDown = "asc";
        }
        if (!down && !up) {
            //默认正序
            upOrDown = "asc";
        }
    }
    return upOrDown;
}


/**
 * 查找当前是倒序还是正序--上游进出口
 * @obj 当前元素
 * @ 数组
 * @ 字段名称
 * @ funName 方法名称
 * @datasource  数据源名称
 */
function getSortOrder2(obj) {
    var upOrDown = "";
    //直接判断当前表头里面是否是既有上又有下箭头
    var up = $(obj).children("span:first-child").next().children(".ascending32").attr("class");
    var down = $(obj).children("span:first-child").next().children(".descending31").attr("class");
    if (!up && !down) {
        up = $(obj).children("span:first-child").next().children(".ascending52").attr("class");
        down = $(obj).children("span:first-child").next().children(".descending51").attr("class");
        if (down) {
            //降序
            upOrDown = "desc";
        }
        if (up) {
            //升序
            upOrDown = "asc";
        }
        if (!down && !up) {
            //默认正序
            upOrDown = "asc";
        }
    } else {
        if (down) {
            //降序
            upOrDown = "desc";
        }
        if (up) {
            //升序
            upOrDown = "asc";
        }
        if (!down && !up) {
            //默认正序
            upOrDown = "asc";
        }
    }


    return upOrDown;
}

/**
 * 查找当前是倒序还是正序--上游进出口点击图例
 * @obj 当前元素
 * @ 数组
 * @ 字段名称
 * @ funName 方法名称
 * @datasource  数据源名称
 */
function getSortOrder3(id) {
    var upstreamDetailsJCK = "";
    //直接判断当前表头里面是否是既有上又有下箭头
    var up = $("#" + id).find(".ascending32").attr("class");
    var down = $("#" + id).find(".descending31").attr("class");
    if (!up && !down) {
        up = $("#" + id).find(".ascending52").attr("class");
        down = $("#" + id).find(".descending51").attr("class");
        if (up) {
            upstreamDetailsJCK = $("#" + id).find(".ascending52").parent().prev().attr("id");
            return "desc=" + upstreamDetailsJCK.split("upstreamDetailsJCK")[1];
        }
        if (down) {
            upstreamDetailsJCK = $("#" + id).find(".descending51").parent().prev().attr("id");
            return "asc=" + upstreamDetailsJCK.split("upstreamDetailsJCK")[1];
        }
    } else {
        if (up) {
            upstreamDetailsJCK = $("#" + id).find(".ascending32").parent().prev().attr("id");
            return "desc=" + upstreamDetailsJCK.split("upstreamDetailsJCK")[1];
        }
        if (down) {
            upstreamDetailsJCK = $("#" + id).find(".descending31").parent().prev().attr("id");
            return "asc=" + upstreamDetailsJCK.split("upstreamDetailsJCK")[1];
        }
    }

}
function connectNulls(arr) {

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == '-') {
            if (i == 0) {//当第一个值是'-',复制后面有值得一个数据
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j] != '-') {
                        arr[i] = arr[j]
                        break;
                    }
                }
            } else {
                arr[i] = arr[i - 1]
            }
        }
    }
    return arr
}
//var arr=['-','-',3,4,'-',6,7,'-','-'];
//connectNulls(arr);
//for(var i=0;i<arr.length;i++){
//    document.write(arr[i] + "<br>");
//}


/**
 *  掐头去尾时间算法
 * @param time           维度
 * @param startTime       开始时间
 * @param endTime         结束时间
 * @param returnType     返回开始还是结束时间
 * @param allowfu   3允许结束时间超过当前时间
 */
function getTimeDate(startTime, endTime, dateDimension, allowfuture) {
    var result;
    if (dateDimension != "day" && dateDimension != "") {
        $.ajax({
            type: "POST",
            dataType: "text",
            async: false,
            url: "returnTime?startTime=" + startTime + "&endTime=" + endTime + "&dateDimension=" + dateDimension + "&allowfuture=" + allowfuture,
            success: function (data) {
                if (data) {
                    result = {'status': data.split("_")[0], 'info': data.split("_")[1]};
                }
            }
        });
    }
    return result;

}
/**
 * 在权限tab缓存中获取相对应的值
 * @param detailBabList
 * @param tabType
 * @param type
 * @returns {*}
 */
function getPermission(detailBabList, tabType, type) {
    for (var i = 0; i < detailBabList.length; i++) {
        if (detailBabList[i]['Remark'] == tabType) {
            return  detailBabList[i][type];
        }
    }
}
/**
 * 根据时间下载数据，对数据进行时间过滤
 * @param type
 */
function getPermissionByTime(type, dataSource, field, formatter, time) {
    var date;
    var newDataSource = [];
    if (type == 3) { //两年下载
        date = getSomeYear(2);
    } else if (type == 2) { //三个月下载
        //date= getSomeDate(90);
        date = getSomeYear(2);

    } else if (type == 1) {//不能下载
        date = getSomeYear(2);
    } else if (type == 4) {
        return dataSource;
    }
    if (time == "day") {
        date=date.substring(0, 4)+"/01/01";
    } else if (time == "week") {
        date=date.substring(0, 4)+"/01/01";
    } else if (time == "month") {
        //2015/05/16--取到的格式
//        if (formatter == "/") {
//            date = date.substring(0, 7);
//        } else {
//            date = date.substring(0, 7);
//        }
        date=date.substring(0, 4)+"/01";
    } else if (time == "quarter") {
        date=date.substring(0, 4)+"/01";
    } else if (time == "year") {
        date=date.substring(0, 4);
//        if (formatter == "/") {
//            date = date.substring(0, 4);
//        } else {
//            date = date.substring(0, 4);
//        }
    }
    //对数据源进行操作
    for (var i = 0; i < dataSource.length; i++) {
        var temp=dataSource[i][field].toString();
         if(temp.indexOf("-")!=-1){
               date=date.replace("/","-").replace("/","-").replace("/","-");
         }
        if (temp >= date) {
            newDataSource.push(dataSource[i]);
        }
    }

    return newDataSource;
}

/**
 * 根据时间下载数据，对数据进行时间过滤
 * @param type
 */
function getPermissionByTime2(type, dataSource, field, formatter, time) {
    var date;
    var newDataSource = [];
    if (type == 3) { //两年下载
        date = getSomeYear(2);
    } else if (type == 2) { //三个月下载
        //date= getSomeDate(90);
        date = getSomeYear(2);

    } else if (type == 1) {//不能下载
        date = getSomeYear(2);
    } else if (type == 4) {
        return dataSource;
    }
    if (time == "day") {
        date=date.substring(0, 4)+"/01/01";
    } else if (time == "week") {
        date=date.substring(0, 4)+"/01/01";
    } else if (time == "month") {
        date=date.substring(0, 4)+"/01";

    } else if (time == "quarter") {
        date=date.substring(0, 4)+"/01";
        date = date.substring(0, 7);
    } else if (time == "year") {
        date=date.substring(0, 4);
    }
    //对数据源进行操作
    for (var j = 0; j < dataSource.length; j++) {
        var array = [];
        for (var i = 0; i < dataSource[j].length; i++) {
            var temp=dataSource[j][i][field].toString();
            if(temp.indexOf("-")!=-1){
                date=date.replace("/","-").replace("/","-").replace("/","-");
            }
            if (temp >= date) {
                array.push(dataSource[j][i]);
            }
        }
        newDataSource.push(array);
    }


    return newDataSource;
}


/**
 * 根据时间下载数据，对数据进行时间过滤
 * @param type
 */
function getPermissionByTime3(type, dataSource, field, time) {
    var date;
    var newDataSource = [];
    if (type == 3) { //两年下载
        date = getSomeYear(2);
    } else if (type == 2) { //三个月下载
        //date= getSomeDate(90);
        date = getSomeYear(2);

    } else if (type == 1) {//不能下载
        date = getSomeYear(2);
    } else if (type == 4) {
        return dataSource;
    }
    if (time == "month") {
        date=date.substring(0, 4)+"/01";
    } else if (time == "year") {
        date=date.substring(0, 4);
    }
    //对数据源进行操作
    for (var i = 0; i < dataSource.length; i++) {
        var temp=dataSource[i][field].toString();
        if(temp.indexOf("-")!=-1){
            date=date.replace("/","-").replace("/","-").replace("/","-");
        }
        if (temp >= date) {
            newDataSource.push(dataSource[i]);
        }
    }
    return newDataSource;
}
/**
 *  qu处重复
 * @returns {Array}
 */
function deleteRepeat(ar) {
    var ret = [];
    for (var i = 0, j = ar.length; i < j; i++) {
        if (ret.indexOf(ar[i]) === -1) {
            ret.push(ar[i]);
        }
    }

    return ret;
}
/**
 * xss js脚本编码代码
 * @param s
 * @returns {string}
 */
function stripscript(s)
{
    if(s){
        var pattern = new RegExp("[%`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]")        //格式 RegExp("[在中间定义特殊过滤字符]")
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs+s.substr(i, 1).replace(pattern, '');
        }
    }
    return rs;
}
