import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundShapes } from '@/components/BackgroundShapes';
import { LimenButton } from '@/components/ui/limen-button';
import { LimenLogo } from '@/components/LimenLogo';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { useConsent } from '@/hooks/useConsent';
import { Heart, Brain, Shield, Users, Sparkles, ArrowLeft } from 'lucide-react';

const CONSENT_KEY = 'limen_consent_given';

export default function Consent() {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { grantConsent } = useConsent();
  const navigate = useNavigate();

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'true') {
      navigate('/home');
    }
  }, [navigate]);

  const handleContinue = async () => {
    if (!accepted) return;
    
    setLoading(true);
    localStorage.setItem(CONSENT_KEY, 'true');
    
    if (user) {
      await grantConsent();
    }
    
    setLoading(false);
    navigate('/home');
  };

  const handleExit = () => {
    window.location.href = 'https://google.com';
  };

  const sections = [
    {
      icon: Heart,
      title: 'What Limen Is',
      content: 'An ethical reflection space designed for emotional processing. A threshold between thought and action, where you can pause and understand yourself.',
      color: 'text-primary',
    },
    {
      icon: Brain,
      title: 'What Limen Is NOT',
      content: 'Limen is not therapy, not a diagnosis tool, and not a substitute for professional mental health care. If you are in crisis, please seek professional help.',
      color: 'text-accent',
    },
    {
      icon: Sparkles,
      title: 'The Role of AI',
      content: 'AI in Limen acts as a mirror, not an advisor. It reflects, validates, and asks questions—but never diagnoses, interprets, or gives life advice.',
      color: 'text-foreground',
    },
    {
      icon: Users,
      title: 'Community Governance',
      content: 'Limen is governed by its community through the Ethos DAO. Major decisions are made collectively, with transparency and ethics as guiding principles.',
      color: 'text-primary',
    },
    {
      icon: Shield,
      title: 'Privacy & Data',
      content: 'Your data belongs to you. We do not sell, share, or analyze your reflections for profit. You can delete everything at any time, with no questions asked.',
      color: 'text-accent',
    },
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6">
      <BackgroundShapes />
      
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>
      
      <div className="w-full max-w-2xl limen-glass rounded-2xl p-8 limen-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <LimenLogo size="md" />
          <h1 className="text-3xl font-light text-foreground mt-4 mb-2">
            Before You Enter
          </h1>
          <p className="text-muted-foreground">
            Please read and understand what Limen is and isn't.
          </p>
        </div>
        
        {/* Content Blocks */}
        <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="p-4 rounded-xl bg-background/30 border border-border/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <section.icon className={`w-5 h-5 ${section.color}`} />
                <h2 className="font-medium text-foreground">{section.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                {section.content}
              </p>
            </div>
          ))}
          
          {/* Crisis Warning */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm text-foreground/80">
              <strong>If you are in crisis:</strong>{' '}
              Please reach out to a professional. Limen is not equipped to handle emergencies.{' '}
              <a 
                href="https://findahelpline.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline ml-1"
              >
                Find a helpline
              </a>
            </p>
          </div>
        </div>
        
        {/* Acceptance */}
        <div className="border-t border-border/30 pt-6">
          <label className="flex items-start gap-3 cursor-pointer group mb-6">
            <Checkbox
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
              className="mt-1"
            />
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
              I understand that Limen is an ethical reflection space, not a substitute for professional mental health care.
            </span>
          </label>
          
          <div className="flex gap-4">
            <LimenButton
              variant="ghost"
              onClick={handleExit}
              className="flex-1"
            >
              Exit
            </LimenButton>
            <LimenButton
              variant="default"
              onClick={handleContinue}
              disabled={!accepted || loading}
              className="flex-1"
            >
              {loading ? 'Entering...' : 'I Understand, Continue'}
            </LimenButton>
          </div>
        </div>
      </div>
    </main>
  );
}
