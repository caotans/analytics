package core.web;

import core.util.AESde;
import core.util.GetDataUtil;
import core.util.ReadProperties;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.logging.Logger;

/**
 * @author Ray
 * @
 */
public class LoginFilter implements Filter {
    private static final Logger logger=Logger.getLogger("LoginFilter");
    @Override
    public void destroy() {
        // TODO Auto-generated method stub

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        try {
            String contextPath = request.getContextPath();
            HttpSession session = request.getSession();
            String url2 = request.getRequestURI();
            url2 = url2.replace(contextPath, "");
            if (session == null) {
                String url = ReadProperties.redirectPath;
                response.sendRedirect(url);
                return;
            } else {
                if(session.getAttribute("guid") == null){
                    if (!url2.contains(".")||!url2.contains("/")  ) {
                        boolean flag=isLoginDashboard2(request, response, session);
                        response.setHeader("Cache-Control", "no-cache");
                        response.setHeader("Pragma", "no-cache");
                        response.setDateHeader("expires", -1);
                        if (!flag) {
                            //调到登录dashboar登录界面
                            String url = ReadProperties.redirectPath;
                            response.sendRedirect(url);
                            return;
                        } else{
                            //登录成功但是用户没有权限提示一下
                            if(flag==true&&(session.getAttribute("user")==null||session.getAttribute("userData")==null||session.getAttribute("guid")==null)){
                                response.sendRedirect("errorPersssion");
                                return;
                            }
                        }
                    }
                }

            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

    }

    @Override
    public void init(FilterConfig arg0) throws ServletException {
        // TODO Auto-generated method stub

    }

    public boolean isLoginDashboard(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        // 获取request里面的cookie cookie里面存值方式也是 键值对的方式
        boolean isLogin = true;
        JSONArray jsonArray = new JSONArray();
        jsonArray = GetDataUtil.getPermissionService(new String[]{"UserID"}, new String[]{"386c801e-54fa-46b1-b96c-13b11d5d1c51"}, "GetUserModuleJson");
        session.setAttribute("user", jsonArray);
        session.setAttribute("guid", "386c801e-54fa-46b1-b96c-13b11d5d1c51");
        session.setAttribute("userData", "534658326@qq.com");
        return isLogin;
    }

    public boolean isLoginDashboard2(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        // 获取request里面的cookie cookie里面存值方式也是 键值对的方式
        response.setCharacterEncoding("utf-8");
        boolean isLogin = false;
        Enumeration<?> enum1 = request.getHeaderNames();
        while (enum1.hasMoreElements()) {
            String key = (String) enum1.nextElement();
            String value = request.getHeader(key);
            if(key.equals("cookie")){
                if(value.contains("china_analytics_desktop_auth")){
                    String userInfo=getValueByCookie2("china_analytics_desktop_auth", value);
                    isLogin = true;
                    logger.info("密钥===="+userInfo);
                    //解密
                    userInfo = AESde.desEncrypt(userInfo);
                    String guid = getValueByCookie2("GUID", userInfo);
                    String userData = getValueByCookie2("UserData", userInfo);
                    JSONArray jsonArray = new JSONArray();
                    jsonArray = GetDataUtil.getPermissionService(new String[]{"UserID"}, new String[]{guid}, "GetUserModuleJson");
                    session.setAttribute("user", jsonArray);
                    session.setAttribute("guid", guid);
                    session.setAttribute("userData", userData);
                    break;
                }

            }


        }



        return isLogin;
    }

    public boolean isLoginDashboard3(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        // 获取request里面的cookie cookie里面存值方式也是 键值对的方式
        response.setCharacterEncoding("utf-8");
        boolean isLogin = false;
        Enumeration<?> enum1 = request.getHeaderNames();
        while (enum1.hasMoreElements()) {
            String key = (String) enum1.nextElement();
            String value = request.getHeader(key);
            if(key.equals("cookie")){
                if(value.contains("china_analytics_desktop_auth")){
                    String userInfo=getValueByCookie2("china_analytics_desktop_auth", value);
                    isLogin = true;
                    logger.info("密钥===="+userInfo);
                    //解密
                    userInfo = AESde.desEncrypt(userInfo);
                    String guid = getValueByCookie2("GUID", userInfo);
                    String userData = getValueByCookie2("UserData", userInfo);
                    JSONArray jsonArray = new JSONArray();
                    jsonArray = GetDataUtil.getPermissionService(new String[]{"UserID"}, new String[]{guid}, "GetUserModuleJson");
                    for (int j = 0; j < jsonArray.size(); j++) {
                        JSONObject obj = (JSONObject) jsonArray.get(j);
                        if (obj.getString("productCode").equals("330-130")) {
                            ((JSONObject) jsonArray.get(j)).clear();
                        }
                    }
                    session.setAttribute("user", jsonArray);
                    session.setAttribute("guid", guid);
                    session.setAttribute("userData", userData);
                    break;
                }

            }


        }
        return isLogin;
    }

    //    public static String getValueByCookie(String key, String value) {
//        String result = "";
//        String[] temp = value.split(";");
//        for (int i = 0; i < temp.length; i++) {
//            if (key.equals(temp[i].split("=")[0].trim())) {
//                result = temp[i].split("=")[1].trim();
//                break;
//            }
//        }
//        return result;
//    }
    public static String getValueByCookie2(String key, String value) {
        String result = "";
        String[] temp = value.split(";");
        for (int i = 0; i < temp.length; i++) {
            if(temp[i].contains(key)){
                result= temp[i];
                result=result.substring(result.indexOf(key)+(key+"=").length(),result.length());
                break;
            }
        }
        return result;
    }
}
