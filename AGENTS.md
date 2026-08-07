# cream-ui

Vue 3 前端 UI 组件库. Apache 2.0 licensed.

## 技术栈

- **包管理**: pnpm workspaces
- **构建工具**: Vite + Rollup
- **语言**: TypeScript
- **样式**: SCSS + BEM
- **测试**: Vitest
- **文档**: VitePress

## 项目结构

```
cream-ui/
├── packages/
│   ├── cream-ui/          # 主包（发布入口）
│   ├── components/        # 所有 UI 组件
│   ├── hooks/             # 组合式函数
│   ├── utils/             # 工具函数
│   ├── theme-chalk/       # 主题样式
│   └── constants/         # 共享常量
├── play/                  # 开发调试 playground
├── docs/                  # 文档站
├── internal/
│   └── build/             # 构建配置
├── pnpm-workspace.yaml
└── package.json
```

## 组件命名规范

- **前缀**: `ag` (用户选择)
- **组件名**: `AgButton`, `AgInput`, `AgForm`
- **CSS 类名**: `ag-button`, `ag-input`, `ag-form`
- **文件名**: `button.vue`, `input.vue`

## 常用命令

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
# 启动 playground
pnpm dev

# 启动文档站
pnpm docs:dev
```

### 构建

```bash
# 构建组件库
pnpm build

# 构建文档站
pnpm docs:build
```

### 代码质量

```bash
# ESLint 检查
pnpm lint

# Prettier 格式化
pnpm format

# 运行测试
pnpm test
```

## 组件实现模式

### 组件目录结构

每个组件遵循统一的目录结构（以 Button 为例）：

```
packages/components/button/
├── index.ts              # 组件入口，负责导出和注册
├── src/
│   ├── button.vue        # SFC 模板（<script setup>）
│   ├── button.ts         # Props/Emits 定义 + 类型
│   ├── use-button.ts     # 组合式函数（核心逻辑）
├── style/
│   └── index.ts          # 样式入口
```

### 组件注册模式（`index.ts`）

```typescript
import { withInstall } from '@cream-ui/utils'
import Button from './src/button.vue'

export const AgButton = withInstall(Button, 'AgButton')
export default AgButton

export * from './src/button'
export * from './src/use-button'
```

### SFC 组件实现模式（以 Button 为例）

```vue
<template>
  <button :class="[ns.b(), ns.m(type)]">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { useNamespace } from '@cream-ui/hooks'
import { buttonProps } from './button'

defineOptions({
  name: 'AgButton',
})

const props = defineProps(buttonProps)
const ns = useNamespace('button')
</script>
```

### Hooks（组合式函数）

`packages/hooks/` 导出了核心 composable：

| Hook | 用途 |
|------|------|
| `useNamespace` | BEM CSS 类名生成器 |
| `useSize` | 组件尺寸注入 |

## 主题系统

主题样式使用 SCSS 编写，遵循 BEM 命名规范：

```scss
@include b('button') {
  @include m('primary') {
    color: #fff;
    background-color: $--color-primary;
  }
}
```

## 验证清单

### 基础验证

- [ ] `pnpm install` 成功安装依赖
- [ ] `pnpm dev` 启动 playground
- [ ] Button 组件正确渲染
- [ ] Input 组件双向绑定工作
- [ ] Form 组件表单验证工作

### 构建验证

- [ ] `pnpm build` 成功构建
- [ ] ESM 产物正确导出
- [ ] CJS 产物正确导出
- [ ] TypeScript 类型声明生成

### 样式验证

- [ ] 主题变量正确覆盖
- [ ] 组件样式正确加载
- [ ] 响应式尺寸变化

## 扩展计划

完成基础框架后，可扩展：
- 更多组件（Select, Table, Modal 等）
- 国际化支持
- 暗黑模式
- 文档站完善
