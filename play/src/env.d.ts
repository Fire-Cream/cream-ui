declare module 'cream-ui' {
  import type { Plugin } from 'vue'
  const CreamUI: Plugin
  export default CreamUI
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AgButton: typeof import('cream-ui')['AgButton']
    AgInput: typeof import('cream-ui')['AgInput']
    AgForm: typeof import('cream-ui')['AgForm']
    AgFormItem: typeof import('cream-ui')['AgFormItem']
  }
}

export {}
