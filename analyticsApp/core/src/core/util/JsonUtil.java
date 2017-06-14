package core.util;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 16-8-5
 * Time: 下午1:30
 * To change this template use File | Settings | File Templates.
 */
public class JsonUtil {

    public static JSONArray strToArr(String jsonStr) {
        JSONArray dataArr = null;
        try {

            jsonStr = jsonStr.replaceAll(" ", "").replaceAll("\r\n", "<br/>")
                    .replaceAll("\r", "<br/>")
                    .replaceAll("\n", "<br/>");

            if (!"\u007F".equals(jsonStr)) {
                JSONObject jsonObject = JSONObject.fromObject(jsonStr);
                String responseStr = jsonObject.getString("response");
                JSONObject responseJsonObject = JSONObject.fromObject(responseStr);

                boolean isDataReturn = responseJsonObject.containsKey("data");
                String dataStr = "";
                if (isDataReturn)
                    dataStr = responseJsonObject.getString("data");
                boolean isError = responseJsonObject.containsKey("error");

                if (isError == false) {
                    dataArr = JSONArray.fromObject(dataStr);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return dataArr;
    }

    public static String object2json(Object obj) {
        StringBuilder json = new StringBuilder();
        try {
            if (obj == null) {
                json.append("\"\"");
            } else if (obj instanceof String || obj instanceof Integer
                    || obj instanceof Float || obj instanceof Boolean
                    || obj instanceof Short || obj instanceof Double
                    || obj instanceof Long || obj instanceof BigDecimal
                    || obj instanceof BigInteger || obj instanceof Byte
                    || obj instanceof Date) {
                json.append("\"").append(string2json(obj.toString())).append("\"");
            } else if (obj instanceof Object[]) {
                json.append(array2json((Object[]) obj));
            } else if (obj instanceof List) {
                json.append(list2json((List<?>) obj));
            } else if (obj instanceof Map) {
                json.append(map2json((Map<?, ?>) obj));
            } else if (obj instanceof Set) {
                json.append(set2json((Set<?>) obj));
            } else {
                json.append(bean2json(obj));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return json.toString();
    }

    public static String bean2json(Object bean) {
        StringBuilder json = new StringBuilder();
        json.append("{");
        PropertyDescriptor[] props = null;
        try {
            props = Introspector.getBeanInfo(bean.getClass(), Object.class)
                    .getPropertyDescriptors();
        } catch (IntrospectionException e) {
        }
        if (props != null) {
            for (int i = 0; i < props.length; i++) {
                try {
                    String name = object2json(props[i].getName());
                    String value = object2json(props[i].getReadMethod().invoke(
                            bean));
                    json.append(name);
                    json.append(":");
                    json.append(value);
                    json.append(",");
                } catch (Exception e) {
                }
            }
            json.setCharAt(json.length() - 1, '}');
        } else {
            json.append("}");
        }
        return json.toString();
    }

    public static String list2json(List<?> list) {
        StringBuilder json = new StringBuilder();
        json.append("[");
        if (list != null && list.size() > 0) {
            for (Object obj : list) {
                json.append(object2json(obj));
                json.append(",");
            }
            json.setCharAt(json.length() - 1, ']');
        } else {
            json.append("]");
        }
        return json.toString();
    }

    public static String array2json(Object[] array) {
        StringBuilder json = new StringBuilder();
        json.append("[");
        if (array != null && array.length > 0) {
            for (Object obj : array) {
                json.append(object2json(obj));
                json.append(",");
            }
            json.setCharAt(json.length() - 1, ']');
        } else {
            json.append("]");
        }
        return json.toString();
    }

    public static String map2json(Map<?, ?> map) {
        StringBuilder json = new StringBuilder();
        json.append("{");
        if (map != null && map.size() > 0) {
            for (Object key : map.keySet()) {
                json.append(object2json(key));
                json.append(":");
                json.append(object2json(map.get(key)));
                json.append(",");
            }
            json.setCharAt(json.length() - 1, '}');
        } else {
            json.append("}");
        }
        return json.toString();
    }

    public static String set2json(Set<?> set) {
        StringBuilder json = new StringBuilder();
        json.append("[");
        if (set != null && set.size() > 0) {
            for (Object obj : set) {
                json.append(object2json(obj));
                json.append(",");
            }
            json.setCharAt(json.length() - 1, ']');
        } else {
            json.append("]");
        }
        return json.toString();
    }

    public static String string2json(String s) {
        if (s == null)
            return "";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            switch (ch) {
                case '\'':
                    sb.append("\\\'");
                    break;
                case '"':
                    sb.append("\\\"");
                    break;
                case '\\':
                    sb.append("\\\\");
                    break;
                case '\b':
                    sb.append("\\b");
                    break;
                case '\f':
                    sb.append("\\f");
                    break;
                case '\n':
                    sb.append("\\n");
                    break;
                case '\r':
                    sb.append("\\r");
                    break;
                case '\t':
                    sb.append("\\t");
                    break;
                case '/':
                    sb.append("\\/");
                    break;
                default:
                    if (ch >= '\u0000' && ch <= '\u001F') {
                        String ss = Integer.toHexString(ch);
                        sb.append("\\u");
                        for (int k = 0; k < 4 - ss.length(); k++) {
                            sb.append('0');
                        }
                        sb.append(ss.toUpperCase());
                    } else {
                        sb.append(ch);
                    }
            }
        }
        return sb.toString();
    }

    public static List<Map<String, Object>> parseJSON2List(String jsonStr) {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            JSONArray jsonArr = JSONArray.fromObject(jsonStr);
            Iterator<JSONObject> it = jsonArr.iterator();
            while (it.hasNext()) {
                JSONObject json2 = it.next();
                list.add(parseJSON2Map(json2.toString()));
            }
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static Map<String, Object> parseJSON2Map(String jsonStr) {
        Map<String, Object> map = new HashMap<String, Object>();
        //最外层解析
        try {
            JSONObject json = JSONObject.fromObject(jsonStr);
            for (Object k : json.keySet()) {
                Object v = json.get(k);
                //如果内层还是数组的话，继续解析
                if (v instanceof JSONArray) {
                    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
                    Iterator<JSONObject> it = ((JSONArray) v).iterator();
                    while (it.hasNext()) {
                        JSONObject json2 = it.next();
                        list.add(parseJSON2Map(json2.toString()));
                    }
                    map.put(k.toString(), list);
                } else {
                    map.put(k.toString(), v);
                }
            }
            return map;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
