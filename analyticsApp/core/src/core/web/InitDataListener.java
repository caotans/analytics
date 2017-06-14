package core.web;
/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 17-1-10
 * Time: 下午4:25
 * 初始化 jsonObject
 */

import core.util.*;
import net.sf.json.*;
import org.apache.commons.logging.*;

import javax.servlet.*;
import java.util.*;


public class InitDataListener implements ServletContextListener {
    private static final Log Logger = LogFactory.getLog(InitDataListener.class);

    public static JSONObject jsonObjectProduct;
    public static JSONObject jsonObjectModule;
    public static JSONObject jsonObjectTab;
    public static JSONObject jsonObjectPoint;
    public static JSONObject downLoadType;

    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }

    public void contextInitialized(ServletContextEvent event) {
        initData();
    }

    private  void initData() {
        //查询所有品目对应的模块
        String allProductUrl = ReadProperties.getDkUrl("12000490",1, 10000);
        //查询所有Module品目对应的模块
        String allProductModuleUrl = ReadProperties.getDkUrl("12000492",1, 10000);
        //查询所有品目所对应的模块tab
        String allProductTabUrl = ReadProperties.getDkUrl("12000494",1, 10000);
        //查询所有品目所对应的模块ProductPricePoint
        String allProductPointUrl = ReadProperties.getDkUrl("12000496",1, 10000);
        downLoadType=JSONObject.fromObject(ReadProperties.downLoadType);

        try{
            jsonObjectProduct = new JSONObject();
            jsonObjectModule = new JSONObject();
            jsonObjectTab = new JSONObject();
            jsonObjectPoint = new JSONObject();

            if(allProductUrl!=null && allProductModuleUrl!=null && allProductTabUrl!=null && allProductPointUrl!=null){
               // JSONArray allProduct = GetDataUtil.getData(allProductUrl);
               // JSONArray allProductModule = GetDataUtil.getData(allProductModuleUrl);
              //  JSONArray allProductTab = GetDataUtil.getData(allProductTabUrl);
                JSONArray allProductPoint = GetDataUtil.getData(allProductPointUrl);

              //  Iterator iterator=allProduct.iterator();
              //  Iterator moduleIterator=allProductModule.iterator();
              //  Iterator tabIterator=allProductTab.iterator();
                Iterator pointIterator=allProductPoint.iterator();
//                while (iterator.hasNext()){
//                    JSONObject model=(JSONObject)iterator.next();
//                    String productCode=  StringHelper.null2String(model.getString("ProductCode"));
//                    String initProductUrl = ReadProperties.getDkUrl("12000491"+"&ProductCode="+productCode,1, 10000);
//                    JSONArray productModule = GetDataUtil.getData(initProductUrl);
//                    jsonObjectProduct.put(productCode,productModule);
//                }
//                while (moduleIterator.hasNext()){
//                    JSONObject model=(JSONObject)moduleIterator.next();
//                    String productCode=  StringHelper.null2String(model.getString("ProductCode"));
//                    //查询品目所对应的模块      330-130   320-020
//                    String initProductModuleUrl = ReadProperties.getDkUrl("12000493"+"&ProductCode="+productCode,1, 10000);
//                    JSONArray productModule = GetDataUtil.getData(initProductModuleUrl);
//                    jsonObjectModule.put(productCode,productModule);
//                }
//                while (tabIterator.hasNext()){
//                    JSONObject tab=(JSONObject)tabIterator.next();
//                    String pmId=  StringHelper.null2String(tab.getString("ProductModuleId"));
//                    String initProductTab = ReadProperties.getDkUrl("12000495"+"&pmId="+pmId+"&order={'TabSort':0}",1, 10000);
//                    initProductTab = initProductTab.toString().replace("\'", "%22")
//                            .replace("{", "%7b").replace("}", "%7d");
//                    JSONArray productTab = GetDataUtil.getData(initProductTab);
//                    jsonObjectTab.put(pmId,productTab);
//                }
                while (pointIterator.hasNext()){
                    JSONObject point=(JSONObject)pointIterator.next();
                    String ptId=  StringHelper.null2String(point.getString("ProductTabId"));
                    String initProductPoint = ReadProperties.getDkUrl(new StringBuffer("12000497").append("&ptId=").append(ptId).toString(),1, 10000);
                    JSONArray productTab = GetDataUtil.getData(initProductPoint);
                    jsonObjectPoint.put(ptId,productTab);
                }
            }
        }catch (Exception e){
            Logger.error(e.getMessage());
            Logger.error("缓存初始化出现错误！");
        }
    }
}
