# 灵犀一卜

一个基于微信小程序和 Spring Boot 的塔罗占卜项目，支持牌阵选择、随机抽牌、AI 解读、历史记录与收藏。

## 项目结构

```text
├─ frontend/          微信小程序前端
├─ backend/           Spring Boot 后端
├─ database/
│  └─ schema.sql      MySQL 数据库表结构
├─ .gitignore
└─ README.md
```

## 技术栈

- 前端：微信小程序、TypeScript、SCSS
- 后端：Spring Boot、MyBatis-Plus
- 数据库：MySQL、Redis
- 第三方服务：DashScope、腾讯云 COS

## 快速开始

### 1. 初始化数据库

创建 `tarot_miniapp` 数据库，并导入 `database/schema.sql`。

该文件只包含表结构，不包含用户数据。牌面、牌阵和牌义等基础数据可按需自行添加。

### 2. 启动后端

准备 JDK 25、MySQL 和 Redis，并设置以下必要环境变量：

```text
DB_URL
DB_USERNAME
DB_PASSWORD
WECHAT_APP_ID
WECHAT_APP_SECRET
DASHSCOPE_API_KEY
TENCENT_COS_SECRET_ID
TENCENT_COS_SECRET_KEY
TENCENT_COS_BUCKET
```

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

后端默认端口为 `8088`。

### 3. 运行小程序

```bash
cd frontend
npm install
```

使用微信开发者工具导入 `frontend` 目录，然后：

1. 在 `project.config.json` 中填写自己的小程序 AppID。
2. 在 `miniprogram/config.ts` 中修改后端接口地址。
3. 编译并运行项目。

## 注意事项

- 请勿提交密码、AppSecret、API Key、COS 密钥或真实用户数据。
- 小程序正式发布时，需要使用 HTTPS 接口并配置合法域名。
