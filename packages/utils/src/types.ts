export type ComponentSize = 'large' | 'default' | 'small'

export type ComponentType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export type FormItemRule = {
  required?: boolean
  message?: string
  trigger?: string | string[]
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (rule: any, value: any, callback: (error?: Error) => void) => void
}
