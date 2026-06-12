import React from 'react';
import './Button.css';
import { ButtonHTMLAttributes, ReactNode } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    children: ReactNode;
}
declare function Button({ variant, children, className, ...props }: ButtonProps): React.JSX.Element;
export default Button;
