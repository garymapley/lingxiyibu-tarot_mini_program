package tarot_wechat_mini.utils;

import java.util.UUID;

public class UUIDDemo {
    static void main() {
        String token =  UUID.randomUUID().toString().replace("-", "");
        System.out.println("token为:" + token);
    }
}
