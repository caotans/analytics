CMA = function(){
	var ls = window.localStorage;
	
	return {
		init : function(){
            this.dataLen=1;
			this.psize = 15;
			this.ptotal;
			this.pagetool;
			this.order = "";
			this.filter = "";
			this.productcode = selprdcode;
			
			ga('set', 'dimension2', this.productcode);
			
			this.loadTable(1,true);
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
            var area=$("#query_area").find("option:selected").text();
            var comsearch=$("#query_comp").val();
            var year=$("#query_year").find("option:selected").text();
            var month=$("#query_month").find("option:selected").text();
            ga('send', 'event', {
                'eventCategory': '排序点击',
                'eventAction': '对'+area+'-'+year+'年'+month+'月'+ comsearch+'的查询结果排序'
            });
			//重新绘制表格，跳转至第一页
			this.loadTable(1,false);
			//分页控件跳转至第一页
            if(this.dataLen){
                $('#pagebox').jqPaginator('option', {
                    currentPage: 1
                });
            };
		},
		/*
		 * 加载table数据，并调用drawTable方法绘制table
		 */
		loadTable : function(pindex,isPaging){
			var aj = $.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"getComAnaData?productcode="+CMA.productcode+"&pindex="+pindex+"&psize="+CMA.psize+"&order="+encodeURI(encodeURI(CMA.order))+"&filter="+encodeURI(encodeURI(CMA.filter))+"&query_year="+$("#query_year").val()+"&query_month="+$("#query_month").val(),
	            timeout : 10000, //超时时间设置，单位毫秒
	            success:function(data){
	            	var opt = {
	            		data : CMA.getTableData(data,pindex),
	            		datamap : [{
	            			name : '企业ID', //字段中文名，绘制table时会展示在表头
	            			value : 'DM', //后台的字段名
	            			width : 10 , //字段所占百分比宽度
	            			hidden : true ,//hidden为true时必须设置tg属性
	            			tg : 0 //字段标识，不得重复
	            		}
                            ,{
                            name : '公司简称',
                            value : 'MC',
                            width : 20 ,
                            tg : 1
                        }]
	            	};
                    //pp
                     if(CMA.productcode=='380-060'){
                         opt.datamap.push({
                             name : '级别',
                             value : 'LineNumber',
                             width : 10 ,
                             tg : 2 ,
                             sorting : true
                         });
                     }
                    //pe
                    else if(CMA.productcode=='380-030'){
                         opt.datamap.push({
                             name : '级别',
                             value : 'Name',
                             width : 10 ,
                             tg : 2 ,
                             sorting : true
                         });
                     }

                    opt.datamap.push({
                            name : '产能',
                            value : 'Capacity',
                            width : 20 ,
                            tg : 3 ,
                            sorting : true
                        },{
                            name : '产量',
                            value : 'Production',
                            width : 20 ,
                            tg : 4 ,
                            sorting : true
                        },{
                            name : '开工率',
                            value : 'OperatingRate',
                            width : 20 ,
                            tg : 5 ,
                            sorting : true
                        }
                    )
	            	CMA.drawTable("comana_tab",opt);
	            	if(isPaging){
	            		var ptotal;
                        if(data!=null && data!=undefined){
                            ptotal= Math.ceil(data.length/CMA.psize);
                        }
	            		CMA.initPagination("pagebox",ptotal);
	            	}
                    if (data) {
                        $("#comana_tab > tbody >tr").bind('click',function(){
                            var tr = $(this);
                            var dmtg = 0;
                            var companyid = $("th[tg='"+dmtg+"']",tr).html();
                            var companyname=$("th[tg='1']",tr).html();
                            ls.setItem("companyid",companyid);
                            CMA.showComDetail(companyid,companyname);
                        });
                    }

	            },
	            error:function(xhr,e){
	                console.log(xhr,e)
	            }
	        });
		},
		//查询条件设置
		query : function(){
			var filterjson = {};
			var areajson = {};
			var compnamejson = {};
			this.filter = "";
			var area = $("#query_area").val();
			var compname = $("#query_comp").val();
			if(area!=null&&area!=""){
				areajson.LeftPart = "AreaCode";
				areajson.RightPart = area;
				areajson.Mode = 4;
			}
			if(compname!=null&&compname!=""){
				compnamejson.LeftPart = "MC";
				compnamejson.RightPart = "N'%"+compname+"%'";
				compnamejson.Mode = 6;
			}
			//此处DK读取出现 字段名不存在 的错误，大致情况是：原列名可用，经过转换后的重命名的列名有问题
			if(area!=""&&compname==""){
				filterjson=areajson;
			}else if(area==""&&compname!=""){
				filterjson=compnamejson;
			}else if(area!=""&&compname!=""){
				filterjson.LeftPart = JSON.stringify(areajson);
				filterjson.RightPart = JSON.stringify(compnamejson);
				filterjson.Mode = 9;
			}
			this.filter = JSON.stringify(filterjson);
			this.loadTable(1,true);
			var area=$("#query_area").find("option:selected").text();
            var comsearch=$("#query_comp").val();
            var year=$("#query_year").find("option:selected").text();
            var month=$("#query_month").find("option:selected").text();
                 ga('send', 'event', {
				'eventCategory': '搜索点击',
				'eventAction': '搜索企业条件-'+area+'-'+year+'年'+month+'月'+ comsearch
			});
		},
		showComDetail : function(companyid,companyname){
			var url = "CompanyDetail?companyid="+companyid+"&productCode="+ls.getItem("firstMenu");
			ls.setItem("companyproduct",this.productcode);
            var area=$("#query_area").find("option:selected").text();
            var comsearch=$("#query_comp").val();
            var year=$("#query_year").find("option:selected").text();
            var month=$("#query_month").find("option:selected").text();
            ga('send', 'event', {
                'eventCategory': '企业查看',
                'eventAction': '查看:'+area+'-'+year+'年'+month+'月'+ comsearch+'的查询结果中的企业:'+companyname
            });
			window.location.href = url;
		},
		/*
		 * 初始化分页插件
		 */
		initPagination : function(id,pTotal){
		    if(pTotal>0){
		    	CMA.pagetool = $("#"+id).jqPaginator({
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
		    	    		CMA.loadTable(num,false);
		    	    	}
		    	    }
		    	});
		    }else{ //没有数据
		        $("#"+id).empty();
		    }
		},
		/*
		 * @param : option : { data : arr[dataobj], datamap : [{name:'报价',value:'BJ'},{...}]}  之后考虑datamap中加入是否排序、是否显示的标识或返回特殊内容等
		 * 绘制table的方法
		 */
		drawTable : function(tabid,option){
			var thead = "<thead><tr class='enterprise_bt'>";
			for(var i=0;i<option.datamap.length;i++){
				if(option.datamap[i].sorting){
					var oj;
					if(CMA.order == ""){
						oj = $.parseJSON("{"+this.order+"}");
					}else{
						oj = $.parseJSON(this.order);
					}
					var colname = option.datamap[i].value;
					var sorthtml = "";
					if(typeof oj[colname] === "undefined"){
						sorthtml += '<a class="ascending"></a><a class="descending"></a>';
					}else if(oj[colname]==0){
						sorthtml += '<a class="ascending"></a><a class="descending31"></a>';
					}else{
						sorthtml += '<a class="ascending32"></a><a class="descending"></a>';
					}
					thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%" style="cursor:pointer;" onclick="CMA.changeOrder(\''+option.datamap[i].value+'\')"><span>'+option.datamap[i].name+'</span><span class="ascending_box">'+sorthtml+'</span></th>';
				}else{
					thead += '<th tg="'+option.datamap[i].tg+'" width="'+option.datamap[i].width+'%"><span>'+option.datamap[i].name+'</span></th>';
				}
			}
			thead += "</tr></thead>";

			var tbody = "";
			if(option.data&&option.data.length){
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
                this.dataLen=1;
			}else{
                tbody += "<tr style='height:200px; left:100; width:200px; border:0px solid;'>" +
                    "<th colspan='6' style='text-align: center;font-size: 16px; cursor: default;'>无企业分析数据</th>" +
                    "</tr>";
                this.dataLen=0;
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
		getTableData : function(dataSrc,pindex){
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
			var res;
            if(arr!=null && arr!=undefined){
                res= arr.slice(start,end);
            }
			return res;
		}
	}
}();

$(function(){
	CMA.init();
	$('#query_comp').bind('keyup', function(event) {
		if (event.keyCode == "13") {
			//回车执行查询
			CMA.query();
		}
	});
});