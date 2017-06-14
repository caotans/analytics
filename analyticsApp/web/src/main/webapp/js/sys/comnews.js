CMNWS = function(){
	
	return {
		init : function(){
			this.modelid = "comnews";
			this.modselector = $("div#"+this.modelid);
			this.companyid = $("#companyid").val();
			this.productcode = $("#productcode").val();
			this.psize =8;
			this.dataArr = [];
			this.filter = "";
			
			this.curDate;
			this.lyDate;
			
			this.changeRange('all');
//			this.firstLoad();
		},
		firstLoad : function(){
			$(".enterprise_news_box",this.modselector).empty();
			var filter = this.filter;
			var aj = $.ajax({
	            type:"POST",
	            dataType:"json",
	            url:"getNewsData?companyid=cp0000113179&productcode=330-130&ksrq="+CMNWS.lyDate
	            		+"&jsrq="+CMNWS.curDate+"&filter="+encodeURI(encodeURI(filter)),
	            timeout : 100000, //超时时间设置，单位毫秒
	            success:function(data){
	            	if(data!=null){
	            		CMNWS.dataArr = data;
	            		CMNWS.drawTable(1);
	            		var x = Math.ceil(data.length/CMNWS.psize);
	            		CMNWS.initPagination(x);
	            	}else{
	            		
	            	}
	            },
	            error:function(xhr,e){
	                console.log(xhr,e)
	            }
	        });
		},
		changeRange : function(range){
			if(range=="week"){
				this.curDate = getNowDate();
				this.lyDate = getSomeDate(7);
			}else if(range=="month"){
				this.curDate = getNowDate();
				this.lyDate = getSomeDate(31);
			}else if(range=="all"){
				this.curDate = getNowDate();
				this.lyDate = getSomeYear(1);
			}
			this.firstLoad();
		},
		drawTable : function(pindex){
			var data = this.dataArr;
			var ps = this.psize;
			var start = (pindex-1)*ps;
			var end = pindex*ps;
			var dataSrc = data.slice(start,end);
			
			var html = "";
			for(var i=0;i<dataSrc.length;i++){
				var cls = "";
				if(i%2==1){
					cls = ' class="enterprise_news_lb"';
				}else{
					cls = '';
				}
    			html += '<li'+cls+'><a onclick="CMNWS.showDetail(\''+dataSrc[i].Id+'\');">'+dataSrc[i].Title+'</a><span>'+dataSrc[i].PubDate+'</span></li>';
    		}
			$(".enterprise_news_box",this.modselector).empty();
			$(".enterprise_news_box",this.modselector).append(html);
		},
		/*
		 * 初始化分页插件
		 */
		initPagination : function(pTotal){
		    if(pTotal>0){
		    	CMNWS.pagetool = $(".enterprise_news_page > b").jqPaginator({
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
		    	    		CMNWS.drawTable(num);
		    	    	}
		    	    }
		    	});
		    }else{ //没有数据
		    	$(".enterprise_news_page > b").empty();
		    }
		},
		showDetail : function(id){
			var ls = window.localStorage;
			ls.setItem("companyid",this.companyid);
			window.location.href = "NewsDetail?id="+id;
		},
		search : function(){
			var filter = $("#comsearch").val()
			if(filter!=""){
				var fj = {
						"LeftPart":"Title",
						"RightPart":"'%"+filter+"%'",
						"Mode":6
				};
				this.filter = JSON.stringify(fj);
			}else{
				this.filter = "";
			}
			
			this.firstLoad();
		}
	}
}();
$(function(){
	CMNWS.init();
});