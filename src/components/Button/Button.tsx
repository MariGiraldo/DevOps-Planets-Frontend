import './Button.css'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`custom-button ${variant} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
