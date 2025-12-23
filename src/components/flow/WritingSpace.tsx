import React from 'react';
import { useLimen } from '@/context/LimenContext';
import { LimenButton } from '@/components/ui/limen-button';

export function WritingSpace() {
  const { session, setWrittenText, generateReflection, goToStep } = useLimen();

  const handleContinue = async () => {
    if (session.writtenText.trim()) {
      // Primeiro vai para reflection (que mostrará "Respirando...")
      goToStep('reflection');
      // Depois gera a reflexão contextual
      await generateReflection(session.writtenText);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        {/* Pergunta Guia */}
        <div className="text-center opacity-0 animate-fade-up">
          <p className="text-2xl md:text-3xl font-light text-accent text-glow-emotional leading-relaxed">
            {session.guidingQuestion}
          </p>
        </div>

        {/* Área de Escrita */}
        <div 
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          <textarea
            value={session.writtenText}
            onChange={(e) => setWrittenText(e.target.value)}
            placeholder="Escreva livremente. Não há forma errada de fazer isso..."
            className="w-full min-h-[300px] p-6 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-500 text-lg leading-relaxed"
            autoFocus
          />
        </div>

        {/* Dica */}
        <div 
          className="text-center opacity-0 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          <p className="text-sm text-muted-foreground/60">
            Leve o tempo que precisar. Isso não é cronometrado ou rastreado.
          </p>
        </div>

        {/* Botão Continuar */}
        <div 
          className="flex justify-center opacity-0 animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          <LimenButton
            onClick={handleContinue}
            disabled={!session.writtenText.trim()}
            variant="soft"
            size="lg"
          >
            Continuar
          </LimenButton>
        </div>

        {/* Opção de voltar */}
        <div 
          className="text-center opacity-0 animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          <button 
            onClick={() => goToStep('emotional-setup')}
            className="text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
          >
            ← Escolher outro estado
          </button>
        </div>
      </div>
    </div>
  );
}
