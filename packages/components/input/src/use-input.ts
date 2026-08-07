import { ref, computed } from 'vue'
import type { SetupContext } from 'vue'
import type { InputProps } from './input'

export const useInput = (
  props: InputProps,
  emit: SetupContext<typeof import('./input')['inputEmits']>['emit']
) => {
  const _ref = ref<HTMLInputElement>()
  const isFocused = ref(false)
  const passwordVisible = ref(false)

  const inputType = computed(() => {
    if (props.showPassword) {
      return passwordVisible.value ? 'text' : 'password'
    }
    return props.type
  })

  const handleInput = (evt: Event) => {
    const value = (evt.target as HTMLInputElement).value
    emit('update:modelValue', value)
    emit('input', value)
  }

  const handleChange = (evt: Event) => {
    const value = (evt.target as HTMLInputElement).value
    emit('change', value)
  }

  const handleFocus = (evt: FocusEvent) => {
    isFocused.value = true
    emit('focus', evt)
  }

  const handleBlur = (evt: FocusEvent) => {
    isFocused.value = false
    emit('blur', evt)
  }

  const handleClear = () => {
    emit('update:modelValue', '')
    emit('clear')
  }

  const togglePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value
  }

  return {
    _ref,
    isFocused,
    passwordVisible,
    inputType,
    handleInput,
    handleChange,
    handleFocus,
    handleBlur,
    handleClear,
    togglePasswordVisible,
  }
}
