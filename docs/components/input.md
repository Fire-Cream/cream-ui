# Input 输入框

通过键盘输入内容，是最基础的表单域包装。

## 基础用法

```vue
<template>
  <ag-input v-model="value" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## 禁用状态

设置 `disabled` 属性，输入框为禁用状态。

```vue
<template>
  <ag-input placeholder="禁用状态" disabled />
</template>
```

## 可清除

设置 `clearable` 属性，输入框可清除。

```vue
<template>
  <ag-input v-model="value" placeholder="可清除" clearable />
</template>
```

## 密码输入

设置 `type="password"` 和 `show-password` 属性，输入框为密码输入。

```vue
<template>
  <ag-input
    v-model="password"
    type="password"
    placeholder="请输入密码"
    show-password
  />
</template>
```

## 输入框尺寸

使用 `size` 属性来定义输入框的尺寸。

```vue
<template>
  <ag-input placeholder="大型输入框" size="large" />
  <ag-input placeholder="默认输入框" />
  <ag-input placeholder="小型输入框" size="small" />
</template>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string` / `number` | — |
| type | 类型 | `text` / `password` / `number` | `text` |
| placeholder | 占位符 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清除 | `boolean` | `false` |
| showPassword | 是否显示密码 | `boolean` | `false` |
| size | 尺寸 | `large` / `default` / `small` | `default` |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值变化时触发 | `(value: string \| number) => void` |
| input | 输入时触发 | `(value: string \| number) => void` |
| change | 值改变时触发 | `(value: string \| number) => void` |
| focus | 获取焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 清除时触发 | `() => void` |
