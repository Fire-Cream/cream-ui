import type { ComponentSize, ComponentType } from '@cream-ui/utils'

export const componentSizes: ComponentSize[] = ['large', 'default', 'small']

export const componentTypes: ComponentType[] = ['primary', 'success', 'warning', 'danger', 'info']

export const FORM_ITEM_INJECTION_KEY = Symbol('form-item')
export const FORM_INJECTION_KEY = Symbol('form')
