<template>
  <div
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('disabled', disabled),
    ]"
  >
    <div :class="ns.e('wrapper')">
      <input
        ref="_ref"
        :type="inputType"
        :class="ns.e('inner')"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span
        v-if="clearable && modelValue"
        :class="ns.e('clear')"
        @click="handleClear"
      >
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
        </svg>
      </span>
      <span
        v-if="showPassword"
        :class="ns.e('password')"
        @click="togglePasswordVisible"
      >
        <svg v-if="passwordVisible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
        </svg>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@cream-ui/hooks'
import { inputProps, inputEmits } from './input'
import { useInput } from './use-input'

defineOptions({
  name: 'AgInput',
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const ns = useNamespace('input')
const {
  _ref,
  inputType,
  handleInput,
  handleChange,
  handleFocus,
  handleBlur,
  handleClear,
  togglePasswordVisible,
  passwordVisible,
} = useInput(props, emit)
</script>
