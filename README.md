# 灵犀一卜

微信塔罗占卜小程序毕业设计，包含微信小程序前端、Spring Boot 后端和 MySQL 数据库表结构。

## 项目结构

```text
前端/3/                         微信小程序前端
后端/tarot-wechat-mini/         Spring Boot 后端
数据库/schema.sql               MySQL 纯表结构
```

## 本地运行

1. 在 MySQL 中创建数据库并执行 `数据库/schema.sql`。
2. 设置后端所需环境变量。
3. 在 `后端/tarot-wechat-mini` 中运行 `mvnw.cmd spring-boot:run`。
4. 使用微信开发者工具打开 `前端/3`。

后端默认监听 `8088` 端口。前端接口地址集中在 `前端/3/miniprogram/config.ts`，本地开发默认请求 `http://127.0.0.1:8088`；发布小程序时请改为已备案并配置为微信合法域名的 HTTPS 地址。

## 环境变量

| 变量 | 用途 |
| --- | --- |
| `DB_URL` | MySQL JDBC 地址 |
| `DB_USERNAME` | MySQL 用户名 |
| `DB_PASSWORD` | MySQL 密码 |
| `REDIS_HOST` | Redis 地址，默认 `127.0.0.1` |
| `REDIS_PORT` | Redis 端口，默认 `6379` |
| `WECHAT_APP_ID` | 微信小程序 AppID |
| `WECHAT_APP_SECRET` | 微信小程序 AppSecret |
| `DASHSCOPE_API_KEY` | 阿里云百炼 API Key |
| `TENCENT_COS_SECRET_ID` | 腾讯云 COS SecretId |
| `TENCENT_COS_SECRET_KEY` | 腾讯云 COS SecretKey |
| `TENCENT_COS_BUCKET` | 腾讯云 COS 存储桶名称 |
| `TENCENT_COS_REGION` | 腾讯云 COS 地域 |

真实密钥不得写入源码、提交记录或截图。建议仅通过操作系统环境变量或未纳入 Git 的本地配置提供。

## 数据库说明

仓库只保存数据库表结构，不包含 `INSERT` 数据。用户信息、微信 OpenID、会话 Token、占卜记录、收藏记录和其他真实业务数据不得提交。

