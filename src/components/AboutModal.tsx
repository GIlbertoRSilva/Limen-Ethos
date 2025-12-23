import React from 'react';
import { LimenButton } from '@/components/ui/limen-button';
import { X } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative max-w-lg w-full limen-glass p-8 space-y-6 opacity-0 animate-fade-up">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-light text-foreground">About Limen</h2>
          <button
            onClick={onClose}
            className="p-2 -m-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p>
            <span className="text-primary">Limen</span> is a digital threshold — 
            a space for pause and self-reflection.
          </p>
          
          <p className="font-medium text-foreground">What Limen is not:</p>
          
          <ul className="space-y-2 pl-4">
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>Limen is <strong>not therapy</strong>. It does not replace professional mental health support.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>Limen <strong>does not diagnose</strong>. It offers no interpretation or clinical assessment.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>Limen <strong>does not track you</strong>. No analytics, no metrics, no hidden data collection.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>Limen <strong>does not monetize emotional data</strong>. Your reflections are yours alone.</span>
            </li>
          </ul>

          <div className="h-px bg-border/50 my-6" />

          <p>
            Limen exists to offer a <span className="text-primary">safe reflective threshold</span> — 
            a moment of stillness in a world that rarely pauses.
          </p>

          <p className="text-sm text-muted-foreground/70">
            All data stays on your device. You can delete everything at any time.
          </p>
        </div>

        <div className="pt-4">
          <LimenButton onClick={onClose} variant="soft" className="w-full">
            Close
          </LimenButton>
        </div>
      </div>
    </div>
  );
}
