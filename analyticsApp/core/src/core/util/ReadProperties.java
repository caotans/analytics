package core.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 16-11-23
 * Time: 下午2:03
 * To change this template use File | Settings | File Templates.
 */
public class ReadProperties {
    public static String dkUrl;//读取dk配置文件的ip地址
    public static String permissionUrl;//读取dk配置文件的ip地址
    public static String namespace;//读取dk配置文件的ip地址
    public static String redirectPath;//读取dk配置文件的ip地址
    public static String dashboardPath;//读取dk配置文件的ip地址
    public static String key;//读取dk配置文件的ip地址
    public static String iv;//读取dk配置文件的ip地址
    public static String SecretType;//读取dk配置文件的ip地址
    public static String encryptCipher;//读取dk配置文件的ip地址
    public static String desEncryptCipher;//读取dk配置文件的ip地址
    public static String exportExcelfromtable;//读取dk配置文件的ip地址
    public static String downLoadType;//读取dk配置文件的ip地址
    static {
        Properties prop=new Properties();
        try {
            InputStream in =ReadProperties .class.getClassLoader().getResourceAsStream("ws-config.properties");
            prop.load(in);
            dkUrl=prop.getProperty("dkServiceUrl");
            permissionUrl=prop.getProperty("permissionUrl");
            namespace=prop.getProperty("namespace");
            redirectPath=prop.getProperty("redirectPath");
            dashboardPath=prop.getProperty("dashboardPath");
            key=prop.getProperty("key");
            iv=prop.getProperty("iv");
            SecretType=prop.getProperty("SecretType");
            encryptCipher=prop.getProperty("encryptCipher");
            desEncryptCipher=prop.getProperty("desEncryptCipher");
            exportExcelfromtable=prop.getProperty("exportExcelfromtable");
            downLoadType=prop.getProperty("downLoadType");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static  String getDkUrl(String objid,int pIndex,int pSize){
        //String url = dkUrl+"&objid="+objid+"&PINDEX="+pIndex+"&PSIZE="+pSize;
        String url = String.valueOf(new StringBuffer(dkUrl).append("&objid=").append(objid).append("&PINDEX=").append(pIndex).append("&PSIZE=").append(pSize));
        return url;
    }

}
