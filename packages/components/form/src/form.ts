import type { PropType } from 'vue'
import type { FormItemRule } from '@cream-ui/utils'
import { FORM_INJECTION_KEY, FORM_ITEM_INJECTION_KEY } from '@cream-ui/constants'
import type { InjectionKey } from 'vue'

export interface FormProps {
  model?: Record<string, any>
  rules?: Record<string, FormItemRule[]>
  labelWidth?: string | number
  labelPosition?: 'left' | 'right' | 'top'
}

export interface FormItemProps {
  label?: string
  prop?: string
  required?: boolean
  rules?: FormItemRule[]
  labelWidth?: string | number
}

export interface FormContext {
  model: Record<string, any>
  rules: Record<string, FormItemRule[]>
  labelWidth: string | number
  labelPosition: 'left' | 'right' | 'top'
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
}

export interface FormItemContext {
  prop: string
  validate: () => Promise<boolean>
  resetField: () => void
}

export const formProps = {
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  rules: {
    type: Object as PropType<Record<string, FormItemRule[]>>,
    default: () => ({}),
  },
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  labelPosition: {
    type: String as PropType<'left' | 'right' | 'top'>,
    default: 'right',
  },
}

export const formEmits = {
  validate: (_prop: string, _valid: boolean) => true,
}

export const formItemProps = {
  label: {
    type: String,
    default: '',
  },
  prop: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array as PropType<FormItemRule[]>,
    default: () => [],
  },
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
}

export const FORM_KEY: InjectionKey<FormContext> = FORM_INJECTION_KEY as any
export const FORM_ITEM_KEY: InjectionKey<FormItemContext> = FORM_ITEM_INJECTION_KEY as any
