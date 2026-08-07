import type { App, Plugin } from 'vue'
import * as components from '@cream-ui/components'

export * from '@cream-ui/components'
export * from '@cream-ui/hooks'
export * from '@cream-ui/utils'
export * from '@cream-ui/constants'

const install = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    const c = component as any
    if (c.install) {
      app.use(c)
    }
  })
}

export const version = '0.1.0'

export default {
  install,
  version,
} as Plugin
