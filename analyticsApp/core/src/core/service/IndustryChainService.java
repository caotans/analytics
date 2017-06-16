package core.service;

import com.sun.deploy.net.HttpResponse;
import net.sf.json.JSONArray;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 16-12-6
 * Time: 上午10:10
 * To change this template use File | Settings | File Templates.
 */
public interface IndustryChainService {
    /**
     * 查找产业链所有的品目和涨跌
     * @return
     * @throws Exception
     */
    public JSONArray industryChainLoad(String type)throws Exception;


}
