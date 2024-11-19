export type DsfrComponentTooltipProps = {
    id?: string
    label?: string
    noOutline?: boolean
    secondary?: boolean
    tertiary?: boolean
    size?: 'sm' | 'small' | 'lg' | 'large' | 'md' | 'medium' | '' | undefined
    icon: string
    iconRight?: boolean
    iconOnly?: boolean
    isLink?: boolean
    content?: string
    inline?: boolean
    href?: string
}

export type DsfrLinkTooltipProps = {
    isLink?: boolean
}
