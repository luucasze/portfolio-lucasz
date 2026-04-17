import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const HighlightText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <span className={cn("text-primary font-bold", className)}>
            {children}
        </span>
    );
};
