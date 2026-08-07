import type { PropType } from 'vue'
import type { ComponentSize, ComponentType } from '@cream-ui/utils'

export interface ButtonProps {
  type?: ComponentType
  size?: ComponentSize
  disabled?: boolean
  loading?: boolean
  icon?: string
  round?: boolean
  plain?: boolean
  dashed?: boolean
  circle?: boolean
}

export const buttonProps = {
  type: {
    type: String as PropType<ComponentType>,
    default: '',
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  round: {
    type: Boolean,
    default: false,
  },
  plain: {
    type: Boolean,
    default: false,
  },
  dashed: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
}

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
