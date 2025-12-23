import React from 'react';
import limenLogoSrc from '@/assets/limen-logo.png';

interface LimenLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function LimenLogo({ size = 'md', className = '' }: LimenLogoProps) {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <img 
        src={limenLogoSrc} 
        alt="Limen - Cruzar limiares" 
        className="w-full h-full object-contain rounded-full"
      />
    </div>
  );
}

export function LimenWordmark({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <LimenLogo size="md" />
      <div className="flex flex-col">
        <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-foreground">
          LIMEN
        </h1>
        <span className="text-[10px] tracking-[0.5em] text-muted-foreground/70 uppercase">
          cruzar limiares
        </span>
      </div>
    </div>
  );
}