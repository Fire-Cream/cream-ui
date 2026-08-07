# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type` 属性来定义按钮的类型。

```vue
<template>
  <ag-button>默认按钮</ag-button>
  <ag-button type="primary">主要按钮</ag-button>
  <ag-button type="success">成功按钮</ag-button>
  <ag-button type="warning">警告按钮</ag-button>
  <ag-button type="danger">危险按钮</ag-button>
  <ag-button type="info">信息按钮</ag-button>
</template>
```

## 朴素按钮

设置 `plain` 属性，按钮为朴素样式。

```vue
<template>
  <ag-button plain>朴素按钮</ag-button>
  <ag-button type="primary" plain>主要按钮</ag-button>
</template>
```

## 圆角按钮

设置 `round` 属性，按钮为圆角样式。

```vue
<template>
  <ag-button round>圆角按钮</ag-button>
  <ag-button type="primary" round>主要按钮</ag-button>
</template>
```

## 禁用状态

设置 `disabled` 属性，按钮为禁用状态。

```vue
<template>
  <ag-button disabled>禁用按钮</ag-button>
  <ag-button type="primary" disabled>主要按钮</ag-button>
</template>
```

## 加载状态

设置 `loading` 属性，按钮为加载状态。

```vue
<template>
  <ag-button loading>加载中</ag-button>
</template>
```

## 按钮尺寸

使用 `size` 属性来定义按钮的尺寸。

```vue
<template>
  <ag-button size="large">大型按钮</ag-button>
  <ag-button>默认按钮</ag-button>
  <ag-button size="small">小型按钮</ag-button>
</template>
```

## 图标按钮

使用 `icon` 属性来为按钮添加图标。

```vue
<template>
  <ag-button icon="search">搜索</ag-button>
</template>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `primary` / `success` / `warning` / `danger` / `info` | — |
| size | 按钮尺寸 | `large` / `default` / `small` | `default` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| icon | 图标 | `string` | — |
| round | 是否圆角 | `boolean` | `false` |
| plain | 是否朴素 | `boolean` | `false` |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击事件 | `(event: MouseEvent) => void` |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |
