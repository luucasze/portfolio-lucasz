import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div
      className="relative z-20 w-full box-border overflow-x-clip"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    >
      {children}
    </div>
  );
};
