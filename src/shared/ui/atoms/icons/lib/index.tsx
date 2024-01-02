import { ReactElement } from 'react';

type IconProps<T> = {
    size?: number;
    fill?: string;
    className?: string;
    onClick?: () => void;
} & T;

export type IconType<T> = (props: IconProps<T>) => ReactElement | null;

export const withDefaultProps =
    <T extends any>(Icon: IconType<T>) =>
    ({ size = 24, fill = 'currentColor', ...props }: IconProps<T>): JSX.Element => (
        <Icon size={size} fill={fill} {...(props as IconProps<T>)} />
    );
