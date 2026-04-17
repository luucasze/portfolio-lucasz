import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const SectionWrapper = ({ 
    children, 
    className, 
    id, 
    overflowVisible = false 
}: { 
    children: React.ReactNode; 
    className?: string; 
    id?: string;
    overflowVisible?: boolean;
}) => {
    return (
        <section 
            id={id} 
            className={cn(
                "w-full flex flex-col items-center justify-center", 
                overflowVisible ? "overflow-visible" : "",
                className
            )}
        >
            {children}
        </section>
    );
};
