var GA_ID = 'UA-89044313-1';
//维度的显示和隐藏
function showWeidu(vlarr,mod){
	$("[mod='"+mod+"'] > span").hide();
	for(var i=0;i<vlarr.length;i++){
        $("[mod='"+mod+"'] > span."+vlarr[i]).show();
    }
    $("[mod='"+mod+"'] > span:visible:first > a").trigger('click');
}

function getObjData(data,field){
    var array=[];
    var tempData = "-";//记录前一条数据，用来补没有的数据
    if(data){
    	for(var j=0;j<data.length;j++){
    		if(data[j][field]=="-"){
    			//array.push("-");
    			array.push(tempData);
    		}
            else{
    			array.push(data[j][field]);
                tempData=  data[j][field];
    		}
    	}
    	//以下为当数组首位开始即为‘-’时，向前补充数据的方法
    	for(var j=array.length-1;j>=0;j--){
    		if(array[j]!='-'){
            	tempData=array[j];
            }else{
            	array[j] = tempData;
            }
    	}
    }
    return array;
}
function searchFromArr2(data,ft_field,ft_value,re_field,time){
    //求出不重复的时间
    var timeTemp=[];
    var dataArray=data;
    for(var i=0;i<data.length;i++){
       timeTemp.push(data[i][time]);

    }
    //去除重复

    timeTemp=deleteRepeat(timeTemp);
    var tempData = "-";//记录前一条数据，用来补没有的数据
    var array=[];
    if(dataArray){
        for(var j=0;j<timeTemp.length;j++){
            console.log(dataArray[j]);
            console.log(dataArray[j][time]);
            console.log(timeTemp[j]);

            if(dataArray[j]&&dataArray[j][time]==timeTemp[j]){
                if(data[j][re_field]!='-'){
                    array.push(data[j][re_field]);
                    tempData=data[j][re_field];
                }else{
                    array.push(tempData);
                }
            }else{
                array.push(tempData);
            }

        }

    }
    console.log(array);
    return array;

}
//data:源数据数组，数组元素为数据json   ft_field过滤使用的字段   ft_value过滤匹配字段的值    re_field过滤后获取的某个字段的值
function searchFromArr(data,ft_field,ft_value,re_field){
	var array=[];
    var tempData = "-";//记录前一条数据，用来补没有的数据
    if(data){
    	for(var j=0;j<data.length;j++){
    		if(data[j][ft_field]==ft_value){
                if(data[j][re_field]!='-'){
                    array.push(data[j][re_field]);
                    tempData=data[j][re_field];
                }else{
                    array.push(tempData);
                }

    		}
    	}
    	//以下为当数组首位开始即为‘-’时，向前补充数据的方法
    	for(var j=array.length-1;j>=0;j--){
    		if(array[j]!='-'){
            	tempData=array[j];
            }else{
            	array[j] = tempData;
            }
    	}
    }
    return array;
}

function searchFromArr3(data,ft_field,ft_value,re_field){
    var array=[];
    var tempData = "-";//记录前一条数据，用来补没有的数据
    if(data){
        for(var j=0;j<data.length;j++){
            if(data[j][ft_field]==ft_value){
                    array.push(data[j][re_field]);
            }
        }
    }
    return array;
}

function toFixNum(s) {
	if(isNaN(s)){
		return '-';
	}
	if (s >= 0) {
		s = s.toString();
		if (/[^0-9\.]/.test(s))
			return "invalid value";
		s = s.replace(/^(\d*)$/, "$1.");
		s = (s).replace(/(\d*\.\d\d)\d*/, "$1");
		s = s.replace(".", ",");
		var re = /(\d)(\d{3},)/;
		while (re.test(s))
			s = s.replace(re, "$1,$2");
		s = s.replace(/,(\d\d)$/, ".$1");
		return s.replace(/^\./, "0.")
	}else{
		s = s*-1;
		s = s.toString();
		if (/[^0-9\.]/.test(s))
			return "invalid value";
		s = s.replace(/^(\d*)$/, "$1.");
		s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
		s = s.replace(".", ",");
		var re = /(\d)(\d{3},)/;
		while (re.test(s))
			s = s.replace(re, "$1,$2");
		s = s.replace(/,(\d\d)$/, ".$1");
		return "-"+s.replace(/^\./, "0.")
	}
}
/**
 *     @param arr
 * @returns {Array}
 */
function connectData (arr){
    var temp='-';
    var array=[];
    if(arr&&arr.length){
        for(var i=0;i<arr.length;i++){
            if(arr[i]&&arr[i]!="-"){
                array.push(arr[i]);
                temp=arr[i];
            }
            else{
                array.push(temp);
            }
        }

    }
    return array;
}