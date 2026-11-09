package tarot_wechat_mini.utils;

import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.model.ObjectMetadata;
import com.qcloud.cos.model.PutObjectRequest;
import com.qcloud.cos.region.Region;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Component
public class CosUtil {
    @Value("${tencent.cos.secret-id}")
    private String secretId;

    @Value("${tencent.cos.secret-key}")
    private String secretKey;

    @Value("${tencent.cos.bucket}")
    private String bucketName;

    @Value("${tencent.cos.region}")
    private String region;

    /**
     * 上传头像到 COS。
     *
     * @param file 前端上传的图片文件
     * @return COS 公网访问地址
     */
    public String uploadAvatar(MultipartFile file) {
        COSCredentials credentials = new BasicCOSCredentials(secretId, secretKey);
        ClientConfig clientConfig = new ClientConfig(new Region(region));
        COSClient cosClient = new COSClient(credentials, clientConfig);

        String fileName = "avatar/" + UUID.randomUUID().toString().replace("-", "") + ".jpg";

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());

            PutObjectRequest putObjectRequest = new PutObjectRequest(
                    bucketName,
                    fileName,
                    file.getInputStream(),
                    metadata
            );
            cosClient.putObject(putObjectRequest);
        } catch (Exception exception) {
            throw new RuntimeException("头像上传 COS 失败：" + exception.getMessage(), exception);
        } finally {
            cosClient.shutdown();
        }

        return "https://" + bucketName + ".cos." + region + ".myqcloud.com/" + fileName;
    }
}
