// JavaScript Document

function openTree(){
   $(".all_box").show();
   
}
 $(document).mouseover(function (e) {
                var obj = $(e.target);
					  if($(obj).parents(".all_box").attr("id")!="productTree"){
                          if($(obj).attr("class")!="all_box"&&$(obj).attr("class")!="all"&&$(obj).attr("class")!="selectAll2"){
                              $(".all_box").hide();
                          }
						  }


				return false;
            });