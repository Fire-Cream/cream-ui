import type { PropType } from 'vue'
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
    type: String as PropType<'text' | 'password' | 'number'>,
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
    type: String as PropType<ComponentSize>,
    default: 'default',
  },
}

export const inputEmits = {
  'update:modelValue': (_value: string | number) => true,
  input: (_value: string | number) => true,
  change: (_value: string | number) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
}
