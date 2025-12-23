import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { EmotionalState, FlowStep, LimenSession } from '@/lib/types';
import { GUIDING_QUESTIONS } from '@/lib/types';

interface LimenContextValue {
  session: LimenSession;
  generatedReflection: string | null;
  isProcessing: boolean;
  goToStep: (step: FlowStep) => void;
  selectMood: (mood: EmotionalState) => void;
  setWrittenText: (text: string) => void;
  generateReflection: (text: string) => Promise<void>;
  resetSession: () => void;
}

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const createInitialSession = (): LimenSession => ({
  currentStep: 'landing',
  selectedMood: null,
  writtenText: '',
  guidingQuestion: '',
});

const LimenContext = createContext<LimenContextValue | null>(null);

export function LimenProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<LimenSession>(createInitialSession);
  const [generatedReflection, setGeneratedReflection] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const goToStep = useCallback((step: FlowStep) => {
    setSession(prev => ({ ...prev, currentStep: step }));
  }, []);

  const selectMood = useCallback((mood: EmotionalState) => {
    const question = getRandomItem(GUIDING_QUESTIONS[mood]);
    setSession(prev => ({
      ...prev,
      selectedMood: mood,
      guidingQuestion: question,
      currentStep: 'writing',
    }));
  }, []);

  const setWrittenText = useCallback((text: string) => {
    setSession(prev => ({ ...prev, writtenText: text }));
  }, []);

  const generateReflection = useCallback(async (text: string) => {
    setIsProcessing(true);
    setGeneratedReflection(null);

    // Simula tempo de "respiração" para transição suave
    await new Promise(resolve => setTimeout(resolve, 2000));

    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

    let reflection: string;

    if (wordCount < 10) {
      // Resposta para textos curtos - honra o silêncio
      const shortResponses = [
        "Às vezes poucas palavras carregam muito.\nO que não foi dito também tem espaço aqui.",
        "O silêncio também comunica.\nO que você escreveu já é suficiente.",
        "Nem tudo precisa ser explicado.\nO que está presente, está presente.",
      ];
      reflection = getRandomItem(shortResponses);
    } else if (wordCount < 50) {
      // Resposta para textos médios
      const mediumResponses = [
        "Você colocou algo em palavras.\nIsso pede coragem.\nDeixe este momento ser suficiente.",
        "Obrigado por compartilhar isso.\nO que você escreveu mostra presença.\nReserve um momento para perceber isso.",
        "Essas palavras são suas.\nElas não precisam ser perfeitas.\nSó precisavam existir.",
      ];
      reflection = getRandomItem(mediumResponses);
    } else {
      // Resposta para textos longos - reconhece a profundidade
      const longResponses = [
        "Você atravessou algo aqui.\nHá profundidade no que escreveu.\nPermita-se reconhecer isso.",
        "Muitas camadas vieram à superfície.\nO que estava dentro agora está aqui.\nIsso importa.",
        "Você dedicou tempo a isso.\nHá presença e honestidade no que compartilhou.\nIsso merece ser notado.",
      ];
      reflection = getRandomItem(longResponses);
    }

    setGeneratedReflection(reflection);
    setIsProcessing(false);
  }, []);

  const resetSession = useCallback(() => {
    setSession(createInitialSession());
    setGeneratedReflection(null);
    setIsProcessing(false);
  }, []);

  const value = useMemo(() => ({
    session,
    generatedReflection,
    isProcessing,
    goToStep,
    selectMood,
    setWrittenText,
    generateReflection,
    resetSession,
  }), [session, generatedReflection, isProcessing, goToStep, selectMood, setWrittenText, generateReflection, resetSession]);

  return (
    <LimenContext.Provider value={value}>
      {children}
    </LimenContext.Provider>
  );
}

export function useLimen() {
  const context = useContext(LimenContext);
  if (!context) {
    throw new Error('useLimen must be used within a LimenProvider');
  }
  return context;
}
