import React, { useState } from 'react';
import { useLimen } from '@/context/LimenContext';
import { LimenButton } from '@/components/ui/limen-button';
import { storage } from '@/lib/storage';
import { Check } from 'lucide-react';

export function Closing() {
  const { session, resetSession } = useLimen();
  const [saved, setSaved] = useState(false);
  const [discarded, setDiscarded] = useState(false);

  const handleSave = () => {
    if (!session.selectedMood || !session.writtenText) return;
    
    storage.saveReflection({
      id: storage.generateId(),
      date: new Date().toISOString(),
      mood: session.selectedMood,
      text: session.writtenText,
    });
    
    setSaved(true);
  };

  const handleDiscard = () => {
    setDiscarded(true);
  };

  const handleStartAgain = () => {
    resetSession();
  };

  if (saved || discarded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <div className="opacity-0 animate-fade-up">
            {saved ? (
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
            ) : null}
            
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
              {saved 
                ? "Sua reflexão foi guardada."
                : "Este momento passou."
              }
            </h2>
            
            <p className="text-muted-foreground">
              {saved 
                ? "Ela permanece apenas neste dispositivo, sob seu controle."
                : "Nenhum rastro permanece. Você escolheu deixar ir."
              }
            </p>
          </div>

          <div 
            className="opacity-0 animate-fade-up pt-8"
            style={{ animationDelay: '0.3s' }}
          >
            <LimenButton
              onClick={handleStartAgain}
              variant="soft"
            >
              Começar novamente quando estiver pronto
            </LimenButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-xl mx-auto text-center space-y-10">
        {/* Mensagem de agradecimento */}
        <div className="opacity-0 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Obrigado por atravessar
            <br />
            <span className="text-primary text-glow">este momento.</span>
          </h2>
        </div>

        {/* Escolha de persistência */}
        <div 
          className="opacity-0 animate-fade-up space-y-6"
          style={{ animationDelay: '0.3s' }}
        >
          <p className="text-lg text-muted-foreground">
            Gostaria de guardar esta reflexão?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LimenButton
              onClick={handleSave}
              variant="soft"
              size="lg"
            >
              Guardar localmente neste dispositivo
            </LimenButton>
            
            <LimenButton
              onClick={handleDiscard}
              variant="ghost"
              size="lg"
            >
              Descartar sem deixar rastros
            </LimenButton>
          </div>
        </div>

        {/* Explicação */}
        <div 
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          <p className="text-sm text-muted-foreground/60 max-w-md mx-auto">
            Reflexões salvas ficam apenas no seu navegador.
            <br />
            Você pode apagá-las a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
}
