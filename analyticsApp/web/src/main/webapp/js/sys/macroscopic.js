var charObj={};
var ls = window.localStorage;
MAROCDATA=function(){
    return {
        init:function(){
            this.liid;
            this.weidu;
            this.dtype;
            this.modelid = "macrodata";
            this.modselector = $("div#"+this.modelid);
            this.picdom = "tb_macrodata";
            this.selected;

            this.firstLoad();
        },
        firstLoad:function(){
            this.liid = $("div.data_nav_box > li.china:first",MAROCDATA.modselector).attr("id");
            this.dtype = $("div.data_nav_box > li.china:first",MAROCDATA.modselector).attr("dtype");
            this.loadWdDom(this.liid);
            this.weidu = $("div.day_box > span:first",MAROCDATA.modselector).attr("wd");
            $("li.china:first",MAROCDATA.modselector).addClass("selected");
            $("div.day_box > span:first",MAROCDATA.modselector).addClass('day_forecast');

        },
        changeLi: function(dom,tp){
            this.liid=dom;
            this.dtype=tp;
            this.loadWdDom(this.liid);
            this.weidu = $("div.day_box > span:first",MAROCDATA.modselector).attr("wd");
            $("div.day_box > span:first",MAROCDATA.modselector).addClass('day_forecast');

        },
        loadWdDom:function(lipid){
            var wdstr=$("li#"+lipid).attr("wdstr");
            var arr=wdstr.split(",");
            var html="";
            for(var i=0;i<arr.length;i++){
                var name="";
                if(arr[i]=="day"){
                    name="日";
                }else if(arr[i]=="week"){
                    name="周";
                }else if(arr[i]=="month"){
                    name="月";
                }else if(arr[i]=="quarter"){
                    name = "季";
                }else if(arr[i]=="year"){
                    name = "年";
                }
                if(this.dtype=='ecpic'){
                    html += "<span wd=\""+arr[i]+"\" onclick=\"MAROCDATA.changeWd('"+arr[i]+"');\"><a>"+name+"</a></span>";
                }
            }

            $("div#"+this.modelid+" > div.day_box").html("");
            $("div#"+this.modelid+" > div.day_box").append(html);
        },changeWd:function(wd){
            this.weidu=wd;
            ls.setItem("macrodata",JSON.stringify(charObj));

        }
    }

}();

$(function(){
    MAROCDATA.init();
});