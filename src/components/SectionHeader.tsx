import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { cn } from './SectionWrapper';

interface SectionHeaderProps {
    label?: string;
    title: React.ReactNode;
    subtitle?: string;
    className?: string;
}

export const SectionHeader = ({ label, title, subtitle, className }: SectionHeaderProps) => {
    return (
        <div className={cn("flex flex-col items-center text-center w-full mb-10 space-y-5", className)}>
            {label && (
                <RevealOnScroll delay={0}>
                    <span className="text-[12px] tracking-[2px] uppercase text-[#E8540A] font-bold">
                        {label}
                    </span>
                </RevealOnScroll>
            )}
            
            <RevealOnScroll delay={100}>
                <h2 className="text-[clamp(28px,4vw,40px)] font-bold leading-tight text-white max-w-[600px] mx-auto">
                    {title}
                </h2>
            </RevealOnScroll>

            {subtitle && (
                <RevealOnScroll delay={200}>
                    <p className="text-[15px] font-light text-white/55 leading-relaxed max-w-[560px] mx-auto">
                        {subtitle}
                    </p>
                </RevealOnScroll>
            )}
        </div>
    );
};
