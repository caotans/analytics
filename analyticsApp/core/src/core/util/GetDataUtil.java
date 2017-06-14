package core.util;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.axiom.om.OMAbstractFactory;
import org.apache.axiom.om.OMElement;
import org.apache.axiom.om.OMFactory;
import org.apache.axiom.om.OMNamespace;
import org.apache.axis2.AxisFault;
import org.apache.axis2.addressing.EndpointReference;
import org.apache.axis2.client.Options;
import org.apache.axis2.client.ServiceClient;
import org.apache.commons.lang.StringEscapeUtils;
import org.owasp.esapi.ESAPI;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

public class GetDataUtil {
    // 构造一个缓存管理器
    public static ConcurrentHashMap<String, Object> dkCacheManager = new ConcurrentHashMap<String, Object>();

    /**
     * dk缓存机制
     * @param url
     * @return
     */
    public static JSONArray getData(String url) {
        SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date date=new Date();
        String nowDate=sf.format(date);
        JSONArray dataSource=new JSONArray();
        //缓存里面的取取url,只要重复的url就从缓存里面取
        JSONObject cache = (JSONObject) dkCacheManager.get(url);
        if (cache != null) {    // 如果在缓存中，则直接返回缓存的结果
            //如果缓存中， //超过15分钟的缓存清空
            String history=cache.getString("time");
            try {
                if(sf.parse(nowDate).getTime()>sf.parse(history).getTime()&&(sf.parse(nowDate).getTime()-sf.parse(history).getTime())>2*60000){
                    dkCacheManager.remove(url);//删除缓存，从数据库直接查找
                    String jsonStr = HttpClientUtil.getHttpclient(url);
                    if (jsonStr != null)
                        dataSource = JsonUtil.strToArr(jsonStr);
                    if(dataSource!=null&&dataSource.size()>0){
                        JSONObject jsonObject=new JSONObject();
                        jsonObject.put("time",nowDate);
                        jsonObject.put("data",dataSource);
                        dkCacheManager.put(url, jsonObject);
                        return dataSource;
                    }

                }else{
                      return cache.getJSONArray("data");
                }
            } catch (ParseException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            return dataSource;
        } else {  // 否则到数据库中查询
            String jsonStr = HttpClientUtil.getHttpclient(url);
            if (jsonStr != null)
                dataSource = JsonUtil.strToArr(jsonStr);
            if(dataSource!=null&&dataSource.size()>0){
                JSONObject jsonObject=new JSONObject();
                jsonObject.put("time",nowDate);
                jsonObject.put("data",dataSource);
                dkCacheManager.put(url, jsonObject);     // 将数据库查询的结果更新到缓存中
            }
            return dataSource;
        }
    }

    public static void clearCache(){
    	dkCacheManager.clear();
    }


    /*
     * url:请求的DK的URL fieldmap:字段列表 example:{"产能":"Capacity","产量":"Production"}
     */
    public static String getEchartsData(String url, Map<String, String> fieldmap) {
        String arr = null;
        JSONArray dataStr = getData(url);
        if (dataStr != null) {
            int valueSize = dataStr.size();
            int n = fieldmap.size();
            int i = 0;
            String[] legend = new String[n];
            Map<String, Object> valmap = new HashMap<String, Object>();
            Iterator<Entry<String, String>> iter = fieldmap.entrySet().iterator();
            while (iter.hasNext()) {
                Entry<String, String> entry = (Entry<String, String>) iter.next();
                String key = entry.getKey();
                String val = entry.getValue();
                legend[i] = key;
                i++;

                String[] valarr = new String[valueSize];
                for (int j = 0; j < valueSize; j++) {
                    valarr[j] = null;
                    JSONObject object = (JSONObject) dataStr.get(j);
                    String data = object.getString(val);
                    valarr[j] = data;
                }
                valmap.put(val, valarr);
            }
            valmap.put("legend", legend);
            arr = JsonUtil.map2json(valmap);
        }
        return arr;
    }
    /**
     * 获取权限webservice 数据
     * @return
     */
    public static JSONArray getPermissionService(String[] param,String[] value,String menthod) {
        JSONArray jsonArray=null;
        ServiceClient   sender=null;
        try {
            String soapBindingAddress = ReadProperties.permissionUrl;
            sender = new ServiceClient();
            EndpointReference endpointReference = new EndpointReference(
                    soapBindingAddress);
            Options options = new Options();
            options.setAction(ReadProperties.namespace+menthod);
            options.setTo(endpointReference);
            sender.setOptions(options);
            OMFactory fac = OMAbstractFactory.getOMFactory();
            // 这个和qname差不多，设置命名空间
            OMNamespace omNs = fac.createOMNamespace(ReadProperties.namespace,
                    menthod);
            OMElement data = fac.createOMElement(menthod, omNs);
            // 对应参数的节点
            String[] strs =param ;
            // 参数值
            String[] val = value;
            for (int i = 0; i < strs.length; i++) {
                OMElement inner = fac.createOMElement(strs[i], omNs);
                inner.setText(val[i]);
                data.addChild(inner);
            }
            // 发送数据，返回结果
            OMElement result = sender.sendReceive(data);

            if(result!=null&&result.toString().indexOf("[")!=-1&&result.toString().indexOf("[")!=result.toString().indexOf("]")-1){
                String valueData=result.toString();
                //解析成jsonArray
                valueData=valueData.substring(valueData.indexOf("["));
                valueData=valueData.substring(0,valueData.indexOf("</"));
                valueData= valueData.replaceAll(" ", "").replaceAll("\r\n", "<br/>")
                        .replaceAll("\r", "<br/>")
                        .replaceAll("\n", "<br/>");
                //System.out.println(valueData);
                jsonArray=JSONArray.fromObject(valueData);
            }
        } catch (AxisFault ex) {
            ex.printStackTrace();
        } finally {
            // 必须释放资源否则出错
            try {
                sender.cleanupTransport();
            } catch (AxisFault axisFault) {
                axisFault.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }
        return jsonArray;
    }
    /**
     * xss 反射式跨站攻击防御
     * @param source
     * @return
     */
    public static String xssEscape(String source){
        if(source!=null&&!"".equals(source)){
            source=(ESAPI.encoder().encodeForJavaScript(ESAPI.encoder().encodeForHTML(source))).replace("\\x2F","/").replace("\\x2D","-");
        }
        return source;
    }
    /**
     * xss 反射式跨站攻击防御
     * @param source
     * @return
     */
    public static String xssEscape2(String source){
        return  StringEscapeUtils.escapeHtml(source);
    }
    public static void main(String[] args) throws AxisFault {
        GetDataUtil s=new GetDataUtil();
        //System.out.println(s.getPermissionService(new String[]{"UserID"},new String[]{"89f5b616-e231-4b91-b644-cdd62cb2dba1"},"GetUserModuleJson"));
        System.out.println(s.getPermissionService(new String[]{"UserID","ProductModuleId","ProductCode"},new String[]{"6b3ea2ac-5ce8-461d-8267-a06462e7aaeb","5","330-130"},"GetUserTabJson"));
    }
}
