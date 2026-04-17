import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-primary text-white hover:bg-primary/90 shadow-[0_0_15px_rgba(252,79,0,0.5)] hover:shadow-[0_0_25px_rgba(252,79,0,0.8)]": variant === 'primary',
                        "border border-primary text-primary hover:bg-primary/10": variant === 'outline',
                        "hover:bg-darkAccent text-white": variant === 'ghost',
                        "h-10 px-6": size === 'md',
                        "h-8 px-4 text-xs": size === 'sm',
                        "h-14 px-10 text-lg uppercase tracking-wider font-medium": size === 'lg',
                    },
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";
