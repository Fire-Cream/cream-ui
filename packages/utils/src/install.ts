import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T>(comp: T, name: string): SFCWithInstall<T> => {
  const c = comp as SFCWithInstall<T>
  c.install = (app: App) => {
    app.component(name, c)
  }
  return c
}

export const withInstallFunction = <T>(fn: T, name: string): SFCWithInstall<T> => {
  const f = fn as SFCWithInstall<T>
  f.install = (app: App) => {
    app.config.globalProperties[name] = fn
  }
  return f
}
