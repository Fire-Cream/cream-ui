# 快速开始

## 完整引入

```typescript
import { createApp } from 'vue'
import CreamUI from 'cream-ui'
import 'cream-ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(CreamUI)
app.mount('#app')
```

## 按需引入

```typescript
import { createApp } from 'vue'
import { AgButton, AgInput } from 'cream-ui'
import 'cream-ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(AgButton)
app.use(AgInput)
app.mount('#app')
```

## 使用组件

```vue
<template>
  <ag-button type="primary">主要按钮</ag-button>
  <ag-input v-model="value" placeholder="请输入" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## TypeScript 支持

Cream UI 提供完整的 TypeScript 类型定义：

```typescript
import type { ButtonProps, InputProps } from 'cream-ui'
```
