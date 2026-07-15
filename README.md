# 贾瑶瑶 · 智能座舱测试经理个人主页

这是一个无需后端、无需安装依赖、可直接部署到 GitHub Pages 的静态个人简历网站。

## 已包含功能

- 深色 / 浅色主题切换，并记住访客选择
- 核心能力标签页与键盘方向键操作
- 职业经历按“管理岗位 / 座舱测试 / OTA专项”筛选
- 项目详情展开与收起
- 职业数据滚动动效
- 当前章节导航高亮
- 手机号复制、邮件联系、PDF/Word简历下载
- 网页打印样式，可直接打印或另存为 PDF
- 适配电脑、平板和手机

## 文件结构

```text
.
├─ index.html
├─ styles.css
├─ script.js
├─ .nojekyll
├─ README.md
└─ assets/
   ├─ jiayaoyao-resume.pdf
   └─ jiayaoyao-resume.docx
```

以上文件均需要上传到 GitHub 仓库，目录结构不要改变。

## 部署到 GitHub Pages

1. 在 GitHub 新建一个公开仓库，例如 `jiayaoyao-profile`。
2. 将本文件夹内的所有文件上传到仓库根目录。
3. 打开仓库的 `Settings` → `Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/ (root)`，然后保存。
6. 等待一至两分钟，GitHub Pages 会显示公开访问地址。

通常访问地址为：

```text
https://你的GitHub用户名.github.io/仓库名/
```

## 本地预览

直接双击 `index.html` 即可预览。也可以使用任意静态文件服务器打开本目录。

## 后续修改

- 修改网页文字：编辑 `index.html`
- 修改颜色或排版：编辑 `styles.css`
- 修改交互逻辑：编辑 `script.js`
- 替换简历：保持 `assets/jiayaoyao-resume.pdf` 和 `assets/jiayaoyao-resume.docx` 文件名不变并覆盖
