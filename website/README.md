# 阅读网站

网站使用 Astro Starlight，将仓库现有 Markdown 生成静态网页；正文仍在原章节目录维护。

网站相关文件集中在本目录，保留原有章节、实验和图片目录结构：

```text
website/
  README.md             网站维护说明
  astro.config.mjs      Starlight 配置
  scripts/
    sync-content.mjs    准备 Markdown 和静态资源
  src/content/docs/     自动同步，不提交
  public/content/       自动同步，不提交
```

构建缓存、预览网页和检查报告均留在生成目录，不混入书稿或提交记录。

在仓库根目录运行：

```sh
pnpm install
pnpm run docs:build
pnpm run docs:preview
```

构建脚本会清空并重建同步目录与 `website/build/`，请勿在其中编辑正文。

书中的代码仅供显示，不会执行。首页展示仓库 README，侧栏提供前言、所有章节、独立答案、实验、附录和参考文献。章节导航保留整章阅读入口，整章页不重复进入搜索结果。

## 正式网站部署

`.github/workflows/website.yml` 是 GitHub 要求放置在固定位置的工作流入口。网站的其余文件集中在本目录。

推送到 `main` 后，工作流会安装锁定的 pnpm 依赖、校验原始文档与实验包、构建静态页面，再将 `build` 发布到 GitHub Pages。流程不提交生成文件，也不修改任何 Git 标签。

仓库设置要求：

- Settings → Pages → Source 选择 GitHub Actions。
- Settings → Environments → github-pages 中，允许 `main` 分支部署；正式部署成功后可删除旧的开发分支规则。

在仓库 Actions 页面查看 `Publish website` 运行结果和部署地址，仓库 README 顶部提供网站构建说明。

工作流通过 `main` 的 push 或 Actions 页的手动运行触发，仅允许 `main` 执行部署。网站改动仍可先在开发分支本地验证，再合并上线。
