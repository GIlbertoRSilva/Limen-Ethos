import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LimenButton } from '@/components/ui/limen-button';
import { LimenLogo } from '@/components/LimenLogo';

export function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    const hasConsented = localStorage.getItem('limen_consent_given') === 'true';
    if (hasConsented) {
      navigate('/home');
    } else {
      navigate('/consent');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Logo / Brand */}
        <div 
          className="opacity-0 animate-fade-up flex flex-col items-center gap-6"
          style={{ animationDelay: '0.1s' }}
        >
          <LimenLogo size="xl" />
          <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.2em] text-foreground">
            Limen
          </h1>
        </div>

        {/* Headline */}
        <div 
          className="opacity-0 animate-fade-up space-y-4"
          style={{ animationDelay: '0.3s' }}
        >
          <p className="text-2xl md:text-3xl font-light text-foreground leading-relaxed">
            A threshold between thought
            <br />
            <span className="text-primary text-glow">and silence.</span>
          </p>
        </div>

        {/* Subtext */}
        <div 
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          <p className="text-lg text-muted-foreground font-light">
            An ethical reflection space. No judgments. No tracking. Just presence.
          </p>
        </div>

        {/* CTA */}
        <div 
          className="opacity-0 animate-fade-up pt-8"
          style={{ animationDelay: '0.7s' }}
        >
          <LimenButton 
            onClick={handleStart}
            size="lg"
            className="limen-glow"
          >
            Enter Limen
          </LimenButton>
        </div>

        {/* Ethics hint */}
        <div 
          className="opacity-0 animate-fade-up pt-4"
          style={{ animationDelay: '0.9s' }}
        >
          <p className="text-sm text-muted-foreground/70">
            No account required. Your data belongs to you.
          </p>
        </div>
      </div>
    </div>
  );
}
