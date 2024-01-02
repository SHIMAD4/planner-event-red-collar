type R = (e: React.ChangeEvent<HTMLInputElement>) => void;

export type InputProps = {
    className?: string;
    type?: string;
    id?: string;
    title?: string;
    func?: (value: string) => void;
    errorSymbols?: string;
    errorEquality?: string;
    errorRequired?: string;
    onChange?: R;
    required?: boolean;
    number?: number;
    isPasswordVisible?: boolean;
    togglePasswordVisibility?: () => void;
};
