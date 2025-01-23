
export type DsfrMenuProps = {
    label?: string;
    icon?: string;
    id?: string;
    size?: 'sm' | 'small' | 'lg' | 'large' | 'md' | 'medium' | '' | undefined
    disabled?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
}

export type DsfrMenuButtonProps = {
    label: string;
    icon?: string;
    url?: string;
}