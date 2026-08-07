export const useNamespace = (block: string) => {
  const b = () => `ag-${block}`
  const m = (modifier: string) => `ag-${block}--${modifier}`
  const e = (element: string) => `ag-${block}__${element}`
  const is = (name: string, state: boolean = true) => (state ? `is-${name}` : '')

  return {
    b,
    m,
    e,
    is,
  }
}
