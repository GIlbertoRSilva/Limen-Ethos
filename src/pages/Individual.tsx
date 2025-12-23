import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundShapes } from '@/components/BackgroundShapes';
import { LimenButton } from '@/components/ui/limen-button';
import { BreathingLoader } from '@/components/BreathingLoader';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, User } from 'lucide-react';
import type { EmotionalState } from '@/lib/types';
import { EMOTIONAL_LABELS } from '@/lib/types';
import { Footer } from '@/components/Footer';

// Step Components
function StepLanding({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 limen-fade-in">
      <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
        A safe space to cross<br />your mental states
      </h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-md">
        A pause. A reflection. A crossing.
      </p>
      <LimenButton onClick={onBegin} variant="default" size="lg">
        Begin when you're ready
      </LimenButton>
    </div>
  );
}

function StepMood({ onSelect }: { onSelect: (mood: EmotionalState) => void }) {
  const moods: EmotionalState[] = ['anxiety', 'overwhelm', 'confusion', 'free'];
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 limen-fade-in">
      <h2 className="text-2xl font-light text-foreground mb-3 text-center">
        What's present right now?
      </h2>
      <p className="text-muted-foreground mb-8 text-center">
        You don't need to be precise.
      </p>
      
      <div className="grid grid-cols-2 gap-4 max-w-md w-full">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => onSelect(mood)}
            className="limen-glass rounded-xl p-6 text-left transition-all hover:scale-[1.02] hover:bg-primary/10 group"
          >
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
              {EMOTIONAL_LABELS[mood].label}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {EMOTIONAL_LABELS[mood].description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepWriting({
  question,
  loadingQuestion,
  text,
  onTextChange,
  onSubmit
}: {
  question: string;
  loadingQuestion: boolean;
  text: string;
  onTextChange: (text: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 limen-fade-in">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          {loadingQuestion ? (
            <BreathingLoader 
              text="Preparing your question..." 
              subtext="Finding the right words"
            />
          ) : (
            <h2 className="text-xl font-light text-foreground italic">
              "{question}"
            </h2>
          )}
        </div>

        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Write freely, without rush..."
          className="w-full h-64 bg-card/50 border border-border/30 rounded-xl p-6 text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />

        <div className="flex justify-end mt-6">
          <LimenButton onClick={onSubmit} disabled={!text.trim()}>
            Continue
          </LimenButton>
        </div>
      </div>
    </div>
  );
}

function StepReflection({
  text,
  response,
  loading,
  onContinue
}: {
  text: string;
  response: string;
  loading: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 limen-fade-in">
      <div className="w-full max-w-2xl space-y-8">
        <div className="limen-glass rounded-xl p-6">
          <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {text}
          </p>
        </div>
        
        <div className="text-center">
          {loading ? (
            <BreathingLoader 
              text="Reflecting..." 
              subtext="Creating space for your words"
            />
          ) : (
            <div className="limen-glass rounded-xl p-8 bg-gradient-to-br from-primary/5 to-accent/5">
              <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                {response}
              </p>
            </div>
          )}
        </div>
        
        {!loading && (
          <div className="flex justify-center">
            <LimenButton onClick={onContinue}>
              Close this moment
            </LimenButton>
          </div>
        )}
      </div>
    </div>
  );
}

function StepClosing({
  mood,
  question,
  text,
  response,
  user,
  onSave,
  onDiscard,
  saving
}: {
  mood: EmotionalState;
  question: string;
  text: string;
  response: string;
  user: any;
  onSave: () => void;
  onDiscard: () => void;
  saving: boolean;
}) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [discarded, setDiscarded] = useState(false);

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 limen-fade-in">
        <h2 className="text-2xl font-light text-foreground mb-4">
          Reflection saved
        </h2>
        <p className="text-muted-foreground mb-8">
          You can access it anytime in your history.
        </p>
        <LimenButton onClick={onDiscard} variant="ghost">
          Return to home
        </LimenButton>
      </div>
    );
  }

  if (discarded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 limen-fade-in">
        <h2 className="text-2xl font-light text-foreground mb-4">
          No trace left behind
        </h2>
        <p className="text-muted-foreground mb-8">
          This moment remained just between you and the silence.
        </p>
        <LimenButton onClick={onDiscard} variant="ghost">
          Return to home
        </LimenButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 limen-fade-in">
      <h2 className="text-2xl font-light text-foreground mb-4">
        Thank you for crossing this moment
      </h2>
      <p className="text-muted-foreground mb-8">
        Would you like to save this reflection?
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {user ? (
          <LimenButton 
            onClick={async () => {
              await onSave();
              setSaved(true);
            }}
            variant="default"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save to my journey'}
          </LimenButton>
        ) : (
          <LimenButton 
            onClick={() => navigate('/auth')}
            variant="default"
          >
            <User className="w-4 h-4 mr-2" />
            Sign in to save
          </LimenButton>
        )}
        <LimenButton 
          onClick={() => {
            setDiscarded(true);
          }}
          variant="ghost"
        >
          Discard without trace
        </LimenButton>
      </div>
      
      <p className="text-xs text-muted-foreground/60 mt-8 max-w-sm">
        {user 
          ? 'Saved reflections are stored securely and you can delete them anytime.'
          : 'Creating an account is optional. You can continue using Limen anonymously.'}
      </p>
    </div>
  );
}

function IndividualFlow() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [step, setStep] = useState<'landing' | 'mood' | 'writing' | 'reflection' | 'closing'>('landing');
  const [mood, setMood] = useState<EmotionalState | null>(null);
  const [question, setQuestion] = useState('');
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [saving, setSaving] = useState(false);

  const generateQuestion = async (selectedMood: EmotionalState) => {
    setLoadingQuestion(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-reflection', {
        body: { type: 'guiding_question', mood: selectedMood }
      });
      
      if (error) throw error;
      setQuestion(data.result || 'What is present for you right now?');
    } catch (err) {
      console.error('Error generating question:', err);
      // Fallback questions
      const fallbacks: Record<EmotionalState, string> = {
        anxiety: 'What feels most uncertain right now?',
        overwhelm: 'What weighs heaviest at this moment?',
        confusion: 'What question keeps returning?',
        free: 'What would you like to express?'
      };
      setQuestion(fallbacks[selectedMood]);
    } finally {
      setLoadingQuestion(false);
    }
  };

  const generateResponse = async (writtenText: string, selectedMood: EmotionalState) => {
    setLoadingResponse(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-reflection', {
        body: { type: 'empathic_response', mood: selectedMood, text: writtenText }
      });
      
      if (error) throw error;
      setResponse(data.result || 'Thank you for sharing this.');
    } catch (err) {
      console.error('Error generating response:', err);
      setResponse('Thank you for sharing this.\nWhat you wrote shows presence.\nTake a moment to simply notice that.');
    } finally {
      setLoadingResponse(false);
    }
  };

  const handleMoodSelect = async (selectedMood: EmotionalState) => {
    setMood(selectedMood);
    setText('');
    setResponse('');
    setQuestion('');
    setStep('writing');
    await generateQuestion(selectedMood);
  };

  const handleTextSubmit = async () => {
    setStep('reflection');
    if (mood) {
      await generateResponse(text, mood);
    }
  };

  const handleSave = async () => {
    if (!user || !mood) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('reflections')
        .insert({
          user_id: user.id,
          mood: mood,
          guiding_question: question,
          text: text,
          ai_response: response,
          is_saved: true
        });
      
      if (error) throw error;
      
      toast({
        title: 'Reflection saved',
        description: 'You can access it in your history.',
      });
    } catch (err) {
      console.error('Error saving reflection:', err);
      toast({
        title: 'Error saving',
        description: 'Could not save your reflection.',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    navigate('/');
  };

  const canNavigate = !loadingQuestion && !loadingResponse && !saving;

  const handleBack = () => {
    if (!canNavigate) return;

    setStep((current) => {
      switch (current) {
        case 'mood':
          return 'landing';
        case 'writing':
          return 'mood';
        case 'reflection':
          return 'writing';
        case 'closing':
          return 'reflection';
        default:
          return 'landing';
      }
    });
  };

  return (
    <div className="relative z-10">
      {step !== 'landing' && (
        <button
          onClick={handleBack}
          disabled={!canNavigate}
          className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      {step === 'landing' && <StepLanding onBegin={() => setStep('mood')} />}
      {step === 'mood' && <StepMood onSelect={handleMoodSelect} />}
      {step === 'writing' && mood && (
        <StepWriting
          question={question}
          loadingQuestion={loadingQuestion}
          text={text}
          onTextChange={setText}
          onSubmit={handleTextSubmit}
        />
      )}
      {step === 'reflection' && (
        <StepReflection
          text={text}
          response={response}
          loading={loadingResponse}
          onContinue={() => setStep('closing')}
        />
      )}
      {step === 'closing' && mood && (
        <StepClosing
          mood={mood}
          question={question}
          text={text}
          response={response}
          user={user}
          onSave={handleSave}
          onDiscard={handleReset}
          saving={saving}
        />
      )}
    </div>
  );
}

export default function Individual() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <BackgroundShapes />
      <div className="flex-1">
        <IndividualFlow />
      </div>
      <Footer />
    </main>
  );
}
