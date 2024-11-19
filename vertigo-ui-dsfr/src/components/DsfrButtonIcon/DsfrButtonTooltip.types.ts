export type DsfrButtonTooltipProps = {
    id?: string
    label?: string
    noOutline?: boolean
    secondary?: boolean
    tertiary?: boolean
    size?: 'sm' | 'small' | 'lg' | 'large' | 'md' | 'medium' | '' | undefined
    icon: string
    iconRight?: boolean
    iconOnly?: boolean
    content: string
}