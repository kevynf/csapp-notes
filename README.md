# CSAPP 中文 Markdown 学习资料

《深入理解计算机系统》（CS:APP，第 3 版）中文学习资料，包含按章节整理的正文、练习题答案、附录、参考文献和八个配套实验说明。正文与实验资料以 Markdown 保存，网站由 Astro Starlight 生成静态页面。

## 快速入口

- [开始阅读](chapter-01-computer-systems/README.md)
- [前言](preface/README.md)
- [实验资料](labs/README.md)
- [网站构建与部署说明](website/README.md)

## 阅读目录

| 内容 | 入口 |
| --- | --- |
| 前言 | [出版说明、序言与阅读建议](preface/README.md) |
| 第 1 章 | [计算机系统漫游](chapter-01-computer-systems/README.md) |
| 第 2 章 | [信息的表示和处理](chapter-02-representing-and-manipulating-information/README.md) |
| 第 3 章 | [程序的机器级表示](chapter-03-machine-level-representation/README.md) |
| 第 4 章 | [处理器体系结构](chapter-04-processor-architecture/README.md) |
| 第 5 章 | [优化程序性能](chapter-05-optimizing-program-performance/README.md) |
| 第 6 章 | [存储器层次结构](chapter-06-memory-hierarchy/README.md) |
| 第 7 章 | [链接](chapter-07-linking/README.md) |
| 第 8 章 | [异常控制流](chapter-08-exceptional-control-flow/README.md) |
| 第 9 章 | [虚拟内存](chapter-09-virtual-memory/README.md) |
| 第 10 章 | [系统级 I/O](chapter-10-system-level-io/README.md) |
| 第 11 章 | [网络编程](chapter-11-network-programming/README.md) |
| 第 12 章 | [并发编程](chapter-12-concurrent-programming/README.md) |
| 附录 A | [错误处理](appendix-a-error-handling/README.md) |
| 参考文献 | [全书参考文献](bibliography.md) |

每章目录中的 `README.md` 用于按小节阅读，`chapter.md` 用于整章连续阅读；练习题答案和家庭作业入口位于对应章节目录。

## 网站预览

需要 Node.js 20 或更高版本和 pnpm：

```sh
pnpm install
pnpm run dev
```

构建静态文件：

```sh
pnpm run docs:build
```

详细的 Astro、GitHub Pages 和内容同步说明见[网站文档](website/README.md)。

## 实验资料

[实验资料](labs/README.md)包含 Data Lab、Bomb Lab、Attack Lab、Architecture Lab、Cache Lab、Shell Lab、Malloc Lab 和 Proxy Lab 的中文说明，以及官方自学实验包。实验包来源、校验值和自学包差异见该目录中的 [PACKAGES.md](labs/PACKAGES.md) 与 [COMPATIBILITY.md](labs/COMPATIBILITY.md)。

实验说明保留官方模板中的课程信息和占位内容；实验包面向自学使用，不包含实验解答。运行实验前请按说明和自学包 README 配置环境。

## 仓库信息

- 当前仓库：[kevynf/csapp-notes](https://github.com/kevynf/csapp-notes/)
- 书籍官网：[CS:APP 3e](https://csapp.cs.cmu.edu/3e/)
- 官方实验页面：[CS:APP Labs](https://csapp.cs.cmu.edu/3e/labs.html)

本仓库只维护中文 Markdown 源文件和网站构建配置；`website/src/content/docs/`、`website/public/content/` 和 `website/build/` 均为构建生成目录。资料用于学习和阅读，请保留原始资料的版权与来源信息。
