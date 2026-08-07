# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验和提交数据。

## 基础用法

```vue
<template>
  <ag-form :model="formData" :rules="rules" label-width="100px">
    <ag-form-item label="用户名" prop="username" required>
      <ag-input v-model="formData.username" placeholder="请输入用户名" />
    </ag-form-item>
    <ag-form-item label="邮箱" prop="email">
      <ag-input v-model="formData.email" placeholder="请输入邮箱" />
    </ag-form-item>
    <ag-form-item>
      <ag-button type="primary" @click="handleSubmit">提交</ag-button>
    </ag-form-item>
  </ag-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
  username: '',
  email: '',
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { pattern: /^[\w.-]+@[\w.-]+\.\w+$/, message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
}

const handleSubmit = () => {
  console.log('Form data:', formData)
}
</script>
```

## 表单验证

```vue
<template>
  <ag-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
    <ag-form-item label="密码" prop="password">
      <ag-input v-model="formData.password" type="password" show-password />
    </ag-form-item>
    <ag-form-item label="确认密码" prop="confirmPassword">
      <ag-input v-model="formData.confirmPassword" type="password" show-password />
    </ag-form-item>
    <ag-form-item>
      <ag-button type="primary" @click="handleSubmit">提交</ag-button>
      <ag-button @click="handleReset">重置</ag-button>
    </ag-form-item>
  </ag-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const formRef = ref()

const formData = reactive({
  password: '',
  confirmPassword: '',
})

const rules = {
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
  ],
}

const handleSubmit = async () => {
  const valid = await formRef.value?.validate()
  if (valid) {
    console.log('Form submitted')
  }
}

const handleReset = () => {
  formRef.value?.resetFields()
}
</script>
```

## 表单属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | `object` | — |
| rules | 表单验证规则 | `object` | — |
| label-width | 表单域标签的宽度 | `string` / `number` | — |
| label-position | 表单域标签的位置 | `left` / `right` / `top` | `right` |

## 表单方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| validate | 对整个表单进行校验 | — |
| resetFields | 对整个表单进行重置 | — |

## Form Item 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | — |
| prop | 表单域 model 字段 | `string` | — |
| required | 是否必填 | `boolean` | `false` |
| rules | 表单验证规则 | `array` | — |

## Form Item 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| validate | 对该表单项进行校验 | — |
| resetField | 对该表单项进行重置 | — |
