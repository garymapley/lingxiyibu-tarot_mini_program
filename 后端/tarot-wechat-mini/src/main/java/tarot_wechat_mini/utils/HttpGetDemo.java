package tarot_wechat_mini.utils;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

public class HttpGetDemo {
    static void main() {
        RestTemplate restTemplate = new RestTemplate();


        // 方式2：URL占位符传参
        String getUrl2 = "https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={js_code}";
        Map<String, Object> getParams = new HashMap<>();
        getParams.put("appid", "wx46efdbff079622a9");
        getParams.put("secret", "6697ead316f206b8ff091ad9f4c68808");
        getParams.put("js_code", "0e3lzq2w3jojH63P1D1w38N5vb0lzq2o");
        String getResult2 = restTemplate.getForObject(getUrl2, String.class, getParams);
        System.out.println("GET请求结果（占位符）：\n" + getResult2);

    }
}
