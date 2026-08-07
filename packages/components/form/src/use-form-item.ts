import { ref, inject, onMounted, onUnmounted, computed } from 'vue'
import type { FormContext, FormItemContext, FormItemProps } from './form'
import { FORM_KEY } from './form'
import type { FormItemRule } from '@cream-ui/utils'

export const useFormItem = (props: FormItemProps) => {
  const form = inject<FormContext>(FORM_KEY)
  const validateMessage = ref('')
  const validateState = ref('')

  const fieldValue = computed(() => {
    if (!form || !props.prop) return undefined
    return form.model[props.prop]
  })

  const getRules = (): FormItemRule[] => {
    const formRules = (props.prop && form?.rules?.[props.prop]) || []
    const selfRules = props.rules || []
    return [...formRules, ...selfRules]
  }

  const validate = async (): Promise<boolean> => {
    const rules = getRules()
    if (rules.length === 0) return true

    const value = fieldValue.value
    for (const rule of rules) {
      if (rule.required && (value === undefined || value === null || value === '')) {
        validateMessage.value = rule.message || `${props.label || props.prop} is required`
        validateState.value = 'error'
        return false
      }

      if (rule.pattern && !rule.pattern.test(String(value))) {
        validateMessage.value = rule.message || `${props.label || props.prop} is invalid`
        validateState.value = 'error'
        return false
      }

      if (rule.min !== undefined && typeof value === 'string' && value.length < rule.min) {
        validateMessage.value = rule.message || `${props.label || props.prop} must be at least ${rule.min} characters`
        validateState.value = 'error'
        return false
      }

      if (rule.max !== undefined && typeof value === 'string' && value.length > rule.max) {
        validateMessage.value = rule.message || `${props.label || props.prop} must be at most ${rule.max} characters`
        validateState.value = 'error'
        return false
      }
    }

    validateMessage.value = ''
    validateState.value = 'success'
    return true
  }

  const resetField = () => {
    if (form && props.prop) {
      form.model[props.prop] = undefined
    }
    validateMessage.value = ''
    validateState.value = ''
  }

  const formItemContext: FormItemContext = {
    prop: props.prop || '',
    validate,
    resetField,
  }

  onMounted(() => {
    if (form && props.prop) {
      form.addField(formItemContext)
    }
  })

  onUnmounted(() => {
    if (form && props.prop) {
      form.removeField(formItemContext)
    }
  })

  return {
    validateMessage,
    validateState,
    validate,
    resetField,
  }
}
