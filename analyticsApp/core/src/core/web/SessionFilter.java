package core.web;


import core.util.ReadProperties;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 16-2-1
 * Time: 下午4:29
 * 防止xss攻击
 */
public class SessionFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {


    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        String clientSessionId = request.getParameter("ssid");
        if(clientSessionId!=null){
            String serverSessionId = request.getSession().getId();
            //System.out.println("=========================="+clientSessionId);
           // System.out.println("=========================="+serverSessionId);
            if (serverSessionId.equals(clientSessionId)) {
                chain.doFilter(request, response);
            } else {
                response.sendRedirect("logout");
            }
        } else{
            chain.doFilter(request, response);
        }





    }

    @Override
    public void destroy() {

    }
}
