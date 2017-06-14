package core.web;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 17-1-23
 * Time: 上午10:13
 * 去掉url后的jsessionid
 */
public class DisableUrlSessionFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (!(request instanceof HttpServletRequest)) {
            chain.doFilter(request, response);
            return;
        }
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        if(httpRequest.isRequestedSessionIdFromURL()){
            HttpSession session=httpRequest.getSession();
            if(session!=null) session.invalidate();
        }
        HttpServletResponseWrapper wrappedResponse=new HttpServletResponseWrapper(httpResponse){
            public String encodeRedirectURL(String url) {
                return url;
            }

            public String encodeURL(String url) {
                return url;
            }
        };
        chain.doFilter(request, wrappedResponse);
    }

    @Override
    public void destroy() {

    }

}
