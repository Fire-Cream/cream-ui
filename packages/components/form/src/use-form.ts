import { ref, provide } from 'vue'
import type { FormContext, FormItemContext } from './form'
import { FORM_KEY } from './form'
import type { FormProps } from './form'

export const useForm = (props: FormProps) => {
  const fields = ref<FormItemContext[]>([])

  const addField = (field: FormItemContext) => {
    fields.value.push(field)
  }

  const removeField = (field: FormItemContext) => {
    const index = fields.value.indexOf(field)
    if (index > -1) {
      fields.value.splice(index, 1)
    }
  }

  const validate = async (): Promise<boolean> => {
    let valid = true
    for (const field of fields.value) {
      const fieldValid = await field.validate()
      if (!fieldValid) {
        valid = false
      }
    }
    return valid
  }

  const resetFields = () => {
    fields.value.forEach((field) => field.resetField())
  }

  const formContext: FormContext = {
    model: props.model || {},
    rules: props.rules || {},
    labelWidth: props.labelWidth || '',
    labelPosition: props.labelPosition || 'right',
    addField,
    removeField,
  }

  provide(FORM_KEY, formContext)

  return {
    validate,
    resetFields,
  }
}
