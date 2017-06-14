<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/includes.jsp"%>
<head>
    <meta charset="utf-8" http-equiv="Pragma" content="no-cache" >
    <script type="text/javascript" src="${ctx}/js/sys/analysisPrice.js"></script>
</head>

<script>
    priceCurrArray = ${uuuPriceArray};
    createDomesticPriceTable(priceCurrArray);
    $(document).ready(function(){
        $("input[name='priceCheckboxName']").click(function() {
            var len = $("input[name=priceCheckboxName]:checked").length;
            if(len>3){
                //如果复选框选中则该复选框可以取消勾选
                $("input[name='priceCheckboxName']").each(function(){
                    if($(this).is(":checked")){
                        $(this).removeAttr("disabled");
                    }else {   //如果复选框没被选中则灰化
                        $(this).attr("disabled","true");
                    }
                })
            }else{    //小于四条则都可以勾选反选
                $("input[name='priceCheckboxName']").removeAttr("disabled")
            }

        });
    });
</script>
<div class="tb">
    <div class="tab_h">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr class="tb_title">
                <th style="width:4%"></th>
                <th style="width:24%;cursor: pointer" onclick="sort_price(this,'PubDate','uuu_price');"><span style="cursor: pointer" >日期</span>
                    <span class="ascending_box"><a  style="cursor: pointer" class="ascending01"></a><a  style="cursor: pointer" class="descending01"></a></span>
                </th>
                <th style="width:24%;cursor: pointer" onclick="sort_price(this,'CodeName','uuu_price');"><span style="cursor: pointer" >类型</span>
                    <span class="ascending_box"><a  style="cursor: pointer" class="ascending01"></a><a  style="cursor: pointer" class="descending01"></a></span>
                </th>
                <th style="width:24%;cursor: pointer" onclick="sort_price(this,'avgChange','uuu_price');"><span style="cursor: pointer" >涨跌</span>
                    <span class="ascending_box"><a  style="cursor: pointer" class="ascending01"></a><a  style="cursor: pointer" class="descending01"></a></span>
                </th>
                <th style="width:24%;cursor: pointer" onclick="sort_price(this,'Name','uuu_price');"><span style="cursor: pointer" >单位</span>
                    <span class="ascending_box"><a  style="cursor: pointer" class="ascending01"></a><a  style="cursor: pointer" class="descending01"></a></span>
                </th>
            </tr>
        </table>
    </div>
    <div class="tab_b" style="height: 230">
        <table width="100%"  border="0" cellpadding="0" cellspacing="0"  id="domestic_price">

        </table>
    </div>
</div>
