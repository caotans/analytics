package com.tancao.controller;


import core.service.IndustryChainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 16-12-6
 * Time: 上午10:11
 * To change this template use File | Settings | File Templates.
 */
@Controller
public class IndustryChainController {
    @Autowired
    private IndustryChainService industryChainService;

    /**
     * 产业链首页
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("industryChainIndex")
    public String industryChainIndex(HttpServletRequest request, HttpServletResponse response,
                                     @RequestParam(value="productCode",required = false) String productCode) {
        try {
            request.setAttribute("list",industryChainService.industryChainLoad("333"));
            request.setAttribute("productCode", productCode);
            request.setAttribute("industryChainCode", productCode);
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        return "icisindex/icisindex";
    }


}
