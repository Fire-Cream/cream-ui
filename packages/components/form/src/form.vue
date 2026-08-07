<template>
  <div
    :class="[
      ns.b(),
      ns.m(`label-${labelPosition}`),
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@cream-ui/hooks'
import { formProps, formEmits } from './form'
import { useForm } from './use-form'

defineOptions({
  name: 'AgForm',
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const ns = useNamespace('form')
const { validate, resetFields } = useForm(props)

defineExpose({
  validate,
  resetFields,
})
</script>
