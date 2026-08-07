import type { ComponentSize } from '@cream-ui/utils'

export interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  size?: ComponentSize
}

export const inputProps = {
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'default',
  },
}

export const inputEmits = {
  'update:modelValue': (value: string | number) => true,
  input: (value: string | number) => true,
  change: (value: string | number) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
}
