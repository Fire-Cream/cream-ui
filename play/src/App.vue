<template>
  <div class="playground">
    <h1>Cream UI Playground</h1>

    <section>
      <h2>Button 按钮</h2>

      <h3>1. 普通按钮</h3>
      <div class="demo">
        <ag-button>默认按钮</ag-button>
        <ag-button type="primary">主要按钮</ag-button>
        <ag-button type="success">成功按钮</ag-button>
        <ag-button type="warning">警告按钮</ag-button>
        <ag-button type="danger">危险按钮</ag-button>
        <ag-button type="info">信息按钮</ag-button>
      </div>

      <h3>2. 朴素按钮</h3>
      <div class="demo">
        <ag-button :plain="true">默认按钮</ag-button>
        <ag-button type="primary" :plain="true">主要按钮</ag-button>
        <ag-button type="success" :plain="true">成功按钮</ag-button>
        <ag-button type="warning" :plain="true">警告按钮</ag-button>
        <ag-button type="danger" :plain="true">危险按钮</ag-button>
        <ag-button type="info" :plain="true">信息按钮</ag-button>
      </div>

      <h3>3. 圆角按钮</h3>
      <div class="demo">
        <ag-button :round="true">默认按钮</ag-button>
        <ag-button type="primary" :round="true">主要按钮</ag-button>
        <ag-button type="success" :round="true">成功按钮</ag-button>
        <ag-button type="warning" :round="true">警告按钮</ag-button>
        <ag-button type="danger" :round="true">危险按钮</ag-button>
        <ag-button type="info" :round="true">信息按钮</ag-button>
      </div>

      <h3>4. 虚线按钮</h3>
      <div class="demo">
        <ag-button :dashed="true">默认按钮</ag-button>
        <ag-button type="primary" :dashed="true">主要按钮</ag-button>
        <ag-button type="success" :dashed="true">成功按钮</ag-button>
        <ag-button type="warning" :dashed="true">警告按钮</ag-button>
        <ag-button type="danger" :dashed="true">危险按钮</ag-button>
        <ag-button type="info" :dashed="true">信息按钮</ag-button>
      </div>

      <h3>5. 图标按钮</h3>
      <div class="demo">
        <ag-button :circle="true" icon="search"></ag-button>
        <ag-button type="primary" :circle="true" icon="edit"></ag-button>
        <ag-button type="success" :circle="true" icon="check"></ag-button>
        <ag-button type="warning" :circle="true" icon="warning"></ag-button>
        <ag-button type="danger" :circle="true" icon="delete"></ag-button>
        <ag-button type="info" :circle="true" icon="info"></ag-button>
      </div>

      <h3>禁用状态</h3>
      <div class="demo">
        <ag-button :disabled="true">默认按钮</ag-button>
        <ag-button type="primary" :disabled="true">主要按钮</ag-button>
        <ag-button type="success" :disabled="true">成功按钮</ag-button>
        <ag-button type="warning" :disabled="true">警告按钮</ag-button>
        <ag-button type="danger" :disabled="true">危险按钮</ag-button>
        <ag-button type="info" :disabled="true">信息按钮</ag-button>
      </div>

      <h3>按钮尺寸</h3>
      <div class="demo">
        <ag-button size="large">大型按钮</ag-button>
        <ag-button>默认按钮</ag-button>
        <ag-button size="small">小型按钮</ag-button>
      </div>

      <h3>加载状态</h3>
      <div class="demo">
        <ag-button loading>加载中</ag-button>
        <ag-button type="primary" loading>加载中</ag-button>
      </div>
    </section>

    <section>
      <h2>Input 输入框</h2>
      <div class="demo">
        <ag-input
          v-model="inputValue"
          placeholder="请输入内容"
        />
        <p>输入值: {{ inputValue }}</p>
      </div>

      <div class="demo">
        <ag-input
          v-model="passwordValue"
          type="password"
          placeholder="请输入密码"
          show-password
        />
      </div>

      <div class="demo">
        <ag-input
          v-model="clearableValue"
          placeholder="可清除"
          clearable
        />
      </div>

      <div class="demo">
        <ag-input
          placeholder="禁用状态"
          disabled
        />
      </div>

      <div class="demo">
        <ag-input
          placeholder="大型输入框"
          size="large"
        />
        <ag-input
          placeholder="默认输入框"
        />
        <ag-input
          placeholder="小型输入框"
          size="small"
        />
      </div>
    </section>

    <section>
      <h2>Form 表单</h2>
      <ag-form
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <ag-form-item
          label="用户名"
          prop="username"
          required
        >
          <ag-input
            v-model="formData.username"
            placeholder="请输入用户名"
          />
        </ag-form-item>

        <ag-form-item
          label="邮箱"
          prop="email"
        >
          <ag-input
            v-model="formData.email"
            placeholder="请输入邮箱"
          />
        </ag-form-item>

        <ag-form-item
          label="密码"
          prop="password"
        >
          <ag-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </ag-form-item>

        <ag-form-item>
          <ag-button type="primary" @click="handleSubmit">
            提交
          </ag-button>
          <ag-button @click="handleReset">
            重置
          </ag-button>
        </ag-form-item>
      </ag-form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const inputValue = ref('')
const passwordValue = ref('')
const clearableValue = ref('')

const formData = reactive({
  username: '',
  email: '',
  password: '',
})

const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { pattern: /^[\w.-]+@[\w.-]+\.\w+$/, message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' },
  ],
}

const handleSubmit = () => {
  console.log('Form data:', formData)
}

const handleReset = () => {
  formData.username = ''
  formData.email = ''
  formData.password = ''
}
</script>

<style>
.playground {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif;
}

h1 {
  color: #303133;
  margin-bottom: 30px;
}

h2 {
  color: #606266;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

section {
  margin-bottom: 40px;
}

.demo {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

p {
  color: #606266;
  margin: 10px 0;
}
</style>
