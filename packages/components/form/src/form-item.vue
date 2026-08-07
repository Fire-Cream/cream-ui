<template>
  <div
    :class="[
      ns.b(),
      ns.is('required', required || isRequired),
    ]"
  >
    <label
      v-if="label"
      :class="ns.e('label')"
      :style="labelStyle"
    >
      {{ label }}
    </label>
    <div :class="ns.e('content')">
      <slot />
      <div
        v-if="validateMessage"
        :class="ns.e('error')"
      >
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useNamespace } from '@cream-ui/hooks'
import { formItemProps, FORM_KEY } from './form'
import { useFormItem } from './use-form-item'
import type { FormContext } from './form'

defineOptions({
  name: 'AgFormItem',
})

const props = defineProps(formItemProps)

const ns = useNamespace('form-item')
const form = inject<FormContext>(FORM_KEY)

const { validateMessage, validate, resetField } = useFormItem(props)

const isRequired = computed(() => {
  const rules = (props.prop && form?.rules?.[props.prop]) || []
  return rules.some((rule) => rule.required)
})

const labelStyle = computed(() => {
  if (!form) return {}
  const width = props.labelWidth ?? form.labelWidth
  if (width) {
    return { width: typeof width === 'number' ? `${width}px` : width }
  }
  return {}
})

defineExpose({
  validate,
  resetField,
})
</script>
