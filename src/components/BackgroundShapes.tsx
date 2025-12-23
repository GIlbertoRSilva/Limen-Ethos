import React from 'react';

export function BackgroundShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Top-right organic shape */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-gentle-pulse"
        style={{ animationDelay: '0s' }}
      />
      
      {/* Bottom-left emotional accent */}
      <div 
        className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-gentle-pulse"
        style={{ animationDelay: '2s' }}
      />
      
      {/* Center subtle glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-limen-surface/30 blur-3xl animate-gentle-pulse"
        style={{ animationDelay: '1s' }}
      />
      
      {/* Small floating orbs */}
      <div 
        className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-primary/10 blur-2xl animate-float"
        style={{ animationDelay: '0.5s' }}
      />
      <div 
        className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full bg-accent/10 blur-2xl animate-float"
        style={{ animationDelay: '1.5s' }}
      />
    </div>
  );
}
