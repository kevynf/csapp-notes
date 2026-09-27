import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

const chapters = [
  ['chapter-01-computer-systems', '第 1 章 计算机系统漫游'],
  ['chapter-02-representing-and-manipulating-information', '第 2 章 信息的表示和处理'],
  ['chapter-03-machine-level-representation', '第 3 章 程序的机器级表示'],
  ['chapter-04-processor-architecture', '第 4 章 处理器体系结构'],
  ['chapter-05-optimizing-program-performance', '第 5 章 优化程序性能'],
  ['chapter-06-memory-hierarchy', '第 6 章 存储器层次结构'],
  ['chapter-07-linking', '第 7 章 链接'],
  ['chapter-08-exceptional-control-flow', '第 8 章 异常控制流'],
  ['chapter-09-virtual-memory', '第 9 章 虚拟内存'],
  ['chapter-10-system-level-io', '第 10 章 系统级 I/O'],
  ['chapter-11-network-programming', '第 11 章 网络编程'],
  ['chapter-12-concurrent-programming', '第 12 章 并发编程']
]

const labs = [
  ['Data Lab', '/labs/datalab-zh/datalab-zh/'],
  ['Bomb Lab', '/labs/bomblab-zh/bomblab-zh/'],
  ['Attack Lab', '/labs/attacklab-zh/attacklab-zh/'],
  ['Architecture Lab', '/labs/archlab-zh/archlab-zh/'],
  ['Cache Lab', '/labs/cachelab-zh/cachelab-zh/'],
  ['Shell Lab', '/labs/shlab-zh/shlab-zh/'],
  ['Malloc Lab', '/labs/malloclab-zh/malloclab-zh/'],
  ['Proxy Lab', '/labs/proxylab-zh/proxylab-zh/']
]

export default defineConfig({
  outDir: './build',
  base: process.env.BASE_PATH || '/',
  site: process.env.SITE_URL || 'http://localhost:4321/',
  integrations: [starlight({
    title: 'CSAPP 中文阅读',
    description: '深入理解计算机系统中文 Markdown 学习资料',
    defaultLocale: 'root',
    locales: { root: { label: '简体中文', lang: 'zh-CN' } },
    lastUpdated: false,
    sidebar: [
      {
        label: '正文',
        items: [
          { label: '序章', link: '/preface/' },
          ...chapters.map(([slug, label]) => ({ label, link: `/${slug}/` })),
          { label: '附录 A 错误处理', link: '/appendix-a-error-handling/' },
          { label: '参考文献', link: '/bibliography/' },
          { label: '答案编校说明', link: '/answer-editorial-notes/' }
        ]
      },
      {
        label: '实验',
        items: [
          { label: '实验资料', link: '/labs/' },
          ...labs.map(([label, link]) => ({ label, link })),
          { label: 'Y86-64 处理器模拟器指南', link: '/labs/archlab-zh/simguide-zh/' },
          { label: '实验包来源与校验值', link: '/labs/packages/' },
          { label: '自学实验包与说明模板的差异', link: '/labs/compatibility/' }
        ]
      },
      { label: '维护工具', items: [{ autogenerate: { directory: 'tools' } }] }
    ]
  })]
})
