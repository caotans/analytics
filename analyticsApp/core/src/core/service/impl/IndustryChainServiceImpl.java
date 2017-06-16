package core.service.impl;

import core.service.IndustryChainService;
import net.sf.json.JSONArray;
import org.springframework.stereotype.Service;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 16-12-6
 * Time: 上午10:09
 * To change this template use File | Settings | File Templates.
 */
@Service(value = "industryChainService")
public class IndustryChainServiceImpl implements IndustryChainService {
    /**
     * 查找产业链所有的品目和涨跌
     *
     * @return
     * @throws Exception
     */
    @Override
    public JSONArray industryChainLoad(String type) throws Exception {
        JSONArray jsonArray = new JSONArray();
        jsonArray=JSONArray.fromObject("[3,4,5]");
        return jsonArray;
    }


}

