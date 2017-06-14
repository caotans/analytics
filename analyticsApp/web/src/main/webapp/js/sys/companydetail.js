
var conf = ["comsd","companyoffer","cdor","comtcjx"/*,"companyNews"*/];

var comCache =  window.localStorage;
var companyproduct=stripscript(comCache.getItem("companyproduct"));

$.ajaxSetup({
    cache: false //close AJAX cache
});
$(function(){
	var cachecode = stripscript(comCache.getItem("companyproduct"));
	if($(".enterprise_product > a[prdcode='"+cachecode+"']").length>0){
		//companyproduct = comCache.getItem("companyproduct");
	}else{
		companyproduct = $(".enterprise_product > a:first").attr("prdcode");
		comCache.setItem("companyproduct",companyproduct);
	}
	$("#productcode").val(companyproduct);
	$(".enterprise_product > a[prdcode='"+companyproduct+"']").addClass("enterprise_product_a");
	for(var i=0;i<conf.length;i++){
		$("div.enterprise_details_box").append("<div id=\""+conf[i]+"cddiv"+"\"></div>");
		var url = conf[i]+"?comprd="+stripscript(companyproduct);
		$("div#"+conf[i]+"cddiv"+"").load(url);
	}
});

function changeComProuduct(productcode){
	comCache.setItem("companyproduct",productcode);
	window.location.reload();
}