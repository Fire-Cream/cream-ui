import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Cream UI',
  description: 'Vue 3 前端 UI 组件库',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/components/button' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickstart' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'Form 表单', link: '/components/form' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/cream-ui' },
    ],
    footer: {
      message: 'Released under the Apache License.',
    },
  },
})
