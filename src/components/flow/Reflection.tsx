import React from 'react';
import { useLimen } from '@/context/LimenContext';
import { LimenButton } from '@/components/ui/limen-button';
import { Loader2 } from 'lucide-react';

export function Reflection() {
  const { session, generatedReflection, isProcessing, goToStep } = useLimen();

  // Tela de "Respirando..." durante o processamento
  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center space-y-6 limen-fade-in">
          <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
          <p className="text-xl font-light text-muted-foreground">
            Respirando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-2xl mx-auto w-full space-y-12">
        {/* Texto do usuário - refletido de volta */}
        <div className="opacity-0 animate-fade-up">
          <div className="limen-glass p-8 space-y-4">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              O que você escreveu
            </p>
            <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap">
              {session.writtenText}
            </p>
          </div>
        </div>

        {/* Resposta contextual - espelhando, não analisando */}
        <div 
          className="opacity-0 animate-fade-up text-center space-y-6"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <p className="text-xl md:text-2xl font-light text-primary text-glow leading-relaxed whitespace-pre-line">
            {generatedReflection}
          </p>
          
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        {/* Continuar para fechamento */}
        <div 
          className="flex justify-center opacity-0 animate-fade-up"
          style={{ animationDelay: '0.8s' }}
        >
          <LimenButton
            onClick={() => goToStep('closing')}
            size="lg"
          >
            Fechar este momento
          </LimenButton>
        </div>
      </div>
    </div>
  );
}
