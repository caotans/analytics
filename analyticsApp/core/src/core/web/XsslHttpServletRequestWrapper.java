package core.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public class XsslHttpServletRequestWrapper extends HttpServletRequestWrapper {
    public XsslHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
    }

    @Override
    public String getParameter(String name) {
        // 返回值之前 先进行过滤
        if(name.contains("filter")||name.contains("order")){
            return super.getParameter(name);
        }else{
            return XssShieldUtil.stripXss(super.getParameter(XssShieldUtil.stripXss(name)));
        }

    }

    @Override
    public String[] getParameterValues(String name) {
        // 返回值之前 先进行过滤
        String[] values= null;
        if(name.contains("filter")||name.contains("order")){
            values=super.getParameterValues(name);
        }else{
            values=super.getParameterValues(XssShieldUtil.stripXss(name));
            if(values != null){
                for (int i = 0; i < values.length; i++) {
                    values[i] = XssShieldUtil.stripXss(values[i]);
                }
            }

        }

        return values;
    }

}