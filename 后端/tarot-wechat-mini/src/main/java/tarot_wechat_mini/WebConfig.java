package tarot_wechat_mini;

// ✅ 必须导入正确的包！
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {  // ✅ 正确实现接口

    private final TokenInterceptor tokenInterceptor;
    private final AdminInterceptor adminInterceptor;

    // ✅ 构造器注入两个拦截器
    public WebConfig(TokenInterceptor tokenInterceptor, AdminInterceptor adminInterceptor) {
        this.tokenInterceptor = tokenInterceptor;
        this.adminInterceptor = adminInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 原有：业务接口Token校验
        registry.addInterceptor(tokenInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/login/**");

        // 新增：管理员接口权限校验
        registry.addInterceptor(adminInterceptor)
                .addPathPatterns("/api/admin/**");
    }
}