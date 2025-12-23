import React from 'react';

interface BreathingLoaderProps {
  text?: string;
  subtext?: string;
}

export function BreathingLoader({ 
  text = "Breathing...", 
  subtext = "Take a moment"
}: BreathingLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 limen-fade-in">
      {/* Breathing circles animation */}
      <div className="relative w-24 h-24 mb-8">
        {/* Outer ring - slowest */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[pulse_4s_ease-in-out_infinite]" />
        
        {/* Middle ring */}
        <div className="absolute inset-2 rounded-full border-2 border-primary/30 animate-[pulse_3s_ease-in-out_infinite_0.5s]" />
        
        {/* Inner ring */}
        <div className="absolute inset-4 rounded-full border-2 border-primary/40 animate-[pulse_2.5s_ease-in-out_infinite_1s]" />
        
        {/* Center glow */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 animate-[pulse_2s_ease-in-out_infinite]">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-[pulse_3s_ease-in-out_infinite]" />
        </div>
        
        {/* Core */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 animate-[pulse_1.5s_ease-in-out_infinite]" />
      </div>
      
      {/* Text */}
      <p className="text-lg text-foreground/80 font-light animate-[pulse_3s_ease-in-out_infinite]">
        {text}
      </p>
      <p className="text-sm text-muted-foreground/60 mt-2">
        {subtext}
      </p>
    </div>
  );
}
