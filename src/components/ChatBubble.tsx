import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ChatBubbleProps {
    message: string;
    isSender?: boolean;
    className?: string;
}

export const ChatBubble = ({ message, isSender = false, className }: ChatBubbleProps) => {
    return (
        <div className={cn("flex w-full mb-4", isSender ? "justify-end" : "justify-start", className)}>
            <div className={cn(
                "max-w-[85%] sm:max-w-[70%] rounded-2xl px-5 py-3 text-sm md:text-base shadow-sm",
                isSender
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-darkAccent text-gray rounded-bl-sm",
            )}>
                {message}
            </div>
        </div>
    );
};
