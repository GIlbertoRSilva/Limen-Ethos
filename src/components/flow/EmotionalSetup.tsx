import React from 'react';
import { useLimen } from '@/context/LimenContext';
import { EMOTIONAL_LABELS, type EmotionalState } from '@/lib/types';
import { cn } from '@/lib/utils';

const moodOrder: EmotionalState[] = ['anxiety', 'overwhelm', 'confusion', 'free'];

export function EmotionalSetup() {
  const { selectMood, goToStep } = useLimen();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-2xl mx-auto w-full space-y-12">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 opacity-0 animate-fade-up">
          <h2 className="text-2xl md:text-3xl font-light text-foreground">
            O que te traz aqui?
          </h2>
          <p className="text-muted-foreground text-sm">
            Você não precisa ser preciso.
          </p>
        </div>

        {/* Cards de Humor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moodOrder.map((mood, index) => {
            const { label, description } = EMOTIONAL_LABELS[mood];
            const isEmotional = mood !== 'free';
            
            return (
              <button
                key={mood}
                onClick={() => selectMood(mood)}
                className={cn(
                  "opacity-0 animate-fade-up group",
                  "p-6 rounded-2xl text-left transition-all duration-500",
                  "limen-glass hover:scale-[1.02]",
                  isEmotional 
                    ? "hover:border-accent/50 hover:bg-accent/10" 
                    : "hover:border-primary/50 hover:bg-primary/10"
                )}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <h3 className={cn(
                  "text-xl font-medium mb-2 transition-colors duration-300",
                  isEmotional 
                    ? "text-accent group-hover:text-glow-emotional" 
                    : "text-primary group-hover:text-glow"
                )}>
                  {label}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Opção de voltar */}
        <div className="text-center opacity-0 animate-fade-up" style={{ animationDelay: '0.7s' }}>
          <button 
            onClick={() => goToStep('landing')}
            className="text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
          >
            ← Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
}
