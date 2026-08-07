import { withInstall } from '@cream-ui/utils'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

export const AgForm = withInstall(Form, 'AgForm')
export const AgFormItem = withInstall(FormItem, 'AgFormItem')

export default AgForm

export * from './src/form'
export * from './src/use-form'
export * from './src/use-form-item'
