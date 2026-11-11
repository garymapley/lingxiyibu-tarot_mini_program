package tarot_wechat_mini.utils;

import lombok.Data;
import java.io.Serializable;

/**
 * 通用返回结果类
 */
@Data
public class R<T> implements Serializable {

    /** 状态码 */
    private int code;

    /** 消息 */
    private String msg;

    /** 数据 */
    private T data;

    /**
     * 成功
     */
    public static <T> R<T> ok(T data) {
        R<T> r = new R<>();
        r.setCode(200);
        r.setMsg("成功");
        r.setData(data);
        return r;
    }

    /**
     * 失败
     */
    public static <T> R<T> error(String msg) {
        R<T> r = new R<>();
        r.setCode(500);
        r.setMsg(msg);
        return r;
    }
}