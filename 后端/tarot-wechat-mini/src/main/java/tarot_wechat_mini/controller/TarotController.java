package tarot_wechat_mini.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/tarot")
@RestController
public class TarotController {

    @GetMapping("/query")
    public String query(){
        return "Hello World!";
    }

    @GetMapping("/purch")
    public String query2(){
        return "你好世界!";
    }
}
