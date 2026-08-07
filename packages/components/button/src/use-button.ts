import { ref } from 'vue'
import type { SetupContext } from 'vue'
import type { ButtonProps } from './button'

export const useButton = (
  props: ButtonProps,
  emit: SetupContext<typeof import('./button')['buttonEmits']>['emit']
) => {
  const _ref = ref<HTMLElement>()

  const handleClick = (evt: MouseEvent) => {
    if (props.disabled || props.loading) return
    emit('click', evt)
  }

  return {
    _ref,
    handleClick,
  }
}
