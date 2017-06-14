package core.web;


import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
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
public class XSSFilter implements Filter {
    private List<String> whiteList;
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

        whiteList=new ArrayList<String>();
        whiteList.add("exportExcelUtils");//上传
        whiteList.add("exportEchartsImg");//上传
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request=(HttpServletRequest)req;
        StringBuffer url= request.getRequestURL();
        //System.out.println(url.toString());
        //过滤请求
        if(whiteList!=null){
            boolean receptor=true;
            //白名单
            for(int i=0;i<whiteList.size();i++){
                if(url.indexOf(whiteList.get(i))!=-1){
                    receptor=false;
                    break;
                }
            }
            if(receptor==true){
                //黑名单
                request = new XsslHttpServletRequestWrapper(request);
                chain.doFilter(request, res);
            } else{
                chain.doFilter(request, res);
            }

        }


    }

    @Override
    public void destroy() {

    }
}
