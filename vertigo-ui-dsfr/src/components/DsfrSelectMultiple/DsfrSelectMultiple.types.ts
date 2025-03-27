export type DsfrSelectOption = string | number | null | undefined;
export type DsfrSelectMultipleProps = {
    required?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    description?: string;
    modelValue?: DsfrSelectOption[];
    label?: string;
    options?: (
        | DsfrSelectOption
        | { value: DsfrSelectOption; label: string; disabled?: boolean }
        )[];
    successMessage?: string;
    errorMessage?: string;
    comboHasFilter?: boolean;
    comboHasButton?: boolean
    comboLabel?: string;
    comboDescription?: string;
};
