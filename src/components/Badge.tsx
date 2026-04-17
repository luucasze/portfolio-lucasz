import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn("inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary uppercase tracking-widest", className)}>
            {children}
        </div>
    );
};
