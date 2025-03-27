export type DsfrCheckboxProps = {
    id?: string
    name: string
    required?: boolean
    value: unknown
    checked?: boolean
    modelValue: Array<unknown>
    small?: boolean
    inline?: boolean
    label?: string
    errorMessage?: string
    validMessage?: string
    hint?: string
}