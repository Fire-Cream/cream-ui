import { inject, computed } from 'vue'
import type { ComponentSize } from '@cream-ui/utils'

export const SIZE_KEY = Symbol('size')

export const useSize = (props: { size?: ComponentSize }) => {
  const injectedSize = inject<ComponentSize>(SIZE_KEY)

  const size = computed(() => props.size || injectedSize || 'default')

  return {
    size,
  }
}
