# GitHub Pages部署计划

## 一、修改配置文件

### 1. 修改 `vite.config.ts`
- 添加 `base` 路径配置，用于GitHub Pages子目录部署
- 配置示例：`base: '/<repository-name>/'`

### 2. 修改 `package.json`
- 添加 `homepage` 字段，指定GitHub Pages访问地址
- 添加 `predeploy` 和 `deploy` 脚本，用于自动化部署
- 安装 `gh-pages` 依赖包

## 二、部署步骤

### 1. 初始化Git仓库（如果尚未初始化）
- `git init`
- `git add .`
- `git commit -m "Initial commit"`

### 2. 创建GitHub仓库
- 在GitHub上创建新仓库
- 复制仓库URL

### 3. 关联本地仓库与GitHub仓库
- `git remote add origin <github-repository-url>`
- `git branch -M main`
- `git push -u origin main`

### 4. 执行部署命令
- `npm run deploy`

### 5. 配置GitHub Pages
- 在GitHub仓库设置中，找到"Pages"选项
- 选择部署源为"gh-pages"分支
- 保存配置

## 三、注意事项

- 确保仓库名称正确，影响部署后的访问URL
- 部署后可能需要几分钟时间才能在GitHub Pages上生效
- 首次部署可能需要输入GitHub凭证
- 后续更新只需执行 `npm run deploy` 即可

## 四、验证部署

- 访问 `https://<username>.github.io/<repository-name>/` 查看部署结果
- 检查所有资源是否正确加载
- 测试网站功能是否正常

## 五、常见问题及解决方案

- **资源加载失败**：检查 `base` 路径是否配置正确
- **部署后页面空白**：检查浏览器控制台错误，确认路由配置是否正确
- **部署失败**：检查GitHub凭证是否正确，或网络连接是否正常