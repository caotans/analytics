package core.util;


import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 17-4-1
 * Time: 下午2:50
 * To change this template use File | Settings | File Templates.
 */
public class AESde {


    public static void main(String[] args) throws Exception {
        AESde se = new AESde();
       // String data = "mRjoH9gqZekGwjy1c8uLoQAxruA0JgSnHp3ZTDBEsUB5PiPlI7etzjn41PMLnvtmhpndgoKoFEKWRKw++oLPNmuvUl6wCueIzGBAZHOpSsAOxYPQqTTJF+mC3BTXmkfOyJvDQSCPdwHkwgwHN2d7O+oLobxCgOzFHxBowzK8uRm1oTsm1cXcLk4Hbds0IjbJyemMq1dURQkUgeTeRdZLh/UhO7d/zXyY12yB462BnljAdIfeHcaXzd/JCw0oCBHNblz1amzZJ7bBAJHA8ENUGw==";
        //String data = "REX3vgPL3mnrDLfdUekCS9aTmJDEVV2qezFFb++TieCOtMLvw42sL76zV0WLmXoYo5N9cqYJIsCyt/+UWfwM0jaa+IWgQs2GSP2OkOEMsaC9q4G8cM0iHYppuczB4y4eQr/z/spVF3n75IGRzh9+LNMqauU00/DYxDKFzmat8DTgszT0Yqjcv1xvEXRSG8yMv1ea6nNXCYDoq2RnKJmMic0SHZcQyXLj0CWSgwvyvRV4L5rWRcQBPZSEdA57sEITxWYMhxR59pkHD3zcSPaz3Vw";
       // String data = "zlNvpTuNcvOK2OM626TJRM/ojV91YoMDC+Qr8+JqxtjISiJJ5XieWJfmzWjF+40kuRVoRAKy1La1NPiypPooE4HI6Xee59bq8oY0DthEQvAaxLaLyH6nZZZtyeuz7Xc9U+OHSP82RjS4ZobGUSkgEo3R5dCz1evS78yHOg8EXVZzZejjwqzZXbPcXcaRtlhwu/okLPkhXGKjy8dCLu7n61vSLXdrWvd1zvUdzC6ytSpPu0gyFaFJ+nvutSMyUGuH";
       // String data = "zlNvpTuNcvOK2OM626TJRElhC7by7V0X9BrSg4vMdAxiCskgAv3hqT4gbyLnf+PVKxAGUnvsEniKVtb5UqSa1fK/iL/l0rDjB49JiUBv25O8iGo9i9afeCuQaLxQhjiGahDA8MIowSPFpkDs6Gx3MdvjtVRepWirHvzxFstQtPOIkCwT5gJwTeiYRKWAr7CrmllngajOsvZ2dQqhj74RYIfjPdcCPKOMBxl0yeJucKk=";
        //String data = "zlNvpTuNcvOK2OM626TJRM/ojV91YoMDC+Qr8+JqxtjISiJJ5XieWJfmzWjF+40kuRVoRAKy1La1NPiypPooE4HI6Xee59bq8oY0DthEQvAaxLaLyH6nZZZtyeuz7Xc9U+OHSP82RjS4ZobGUSkgEo3R5dCz1evS78yHOg8EXVZzZejjwqzZXbPcXcaRtlhwu/okLPkhXGKjy8dCLu7n61vSLXdrWvd1zvUdzC6ytSpPu0gyFaFJ+nvutSMyUGuH";
       // System.out.println(se.desEncrypt(data));
       //System.out.println(encrypt(data, "utf-8", "thisisnowexactly32characterslong", "it's16characters"));
    }
    // 加密
    public static String encrypt(String sSrc, String encodingFormat, String sKey, String ivParameter) throws Exception {
        Cipher cipher = Cipher.getInstance(ReadProperties.encryptCipher);
        byte[] raw = sKey.getBytes();
        SecretKeySpec skeySpec = new SecretKeySpec(raw, ReadProperties.SecretType);
        IvParameterSpec iv = new IvParameterSpec(ivParameter.getBytes());//使用CBC模式，需要一个向量iv，可增加加密算法的强度
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);
        byte[] encrypted = cipher.doFinal(sSrc.getBytes(encodingFormat));
        return new BASE64Encoder().encode(encrypted);//此处使用BASE64做转码。
    }
    public static String desEncrypt(String content) throws Exception {
        try {

            String data = content;
            String key = ReadProperties.key;
            String iv = ReadProperties.iv;

            byte[] encrypted1 = new BASE64Decoder().decodeBuffer(data);

            Cipher cipher = Cipher.getInstance(ReadProperties.desEncryptCipher);
            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), ReadProperties.SecretType);
            IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());

            cipher.init(Cipher.DECRYPT_MODE, keyspec, ivspec);

            byte[] original = cipher.doFinal(encrypted1);
            String originalString = new String(original);
            return originalString;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
