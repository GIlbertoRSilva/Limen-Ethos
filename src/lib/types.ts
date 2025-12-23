// Limen Types — Ethical reflection space

export type EmotionalState = 'anxiety' | 'overwhelm' | 'confusion' | 'free';

export interface Reflection {
  id: string;
  date: string;
  mood: EmotionalState;
  text: string;
}

export interface LimenSession {
  currentStep: FlowStep;
  selectedMood: EmotionalState | null;
  writtenText: string;
  guidingQuestion: string;
}

export type FlowStep = 'landing' | 'emotional-setup' | 'writing' | 'reflection' | 'closing';

// Contextual guiding questions
export const GUIDING_QUESTIONS: Record<EmotionalState, string[]> = {
  anxiety: [
    "What seems to be accelerating right now?",
    "What would you like to slow down?",
    "Among so many movements, what stands out most?",
  ],
  overwhelm: [
    "What weighs heaviest right now?",
    "If you could set something aside, what would it be?",
    "Where do you feel this intensity in your body?",
  ],
  confusion: [
    "What feels uncertain right now?",
    "What question keeps coming back?",
    "What would clarity about this look like?",
  ],
  free: [
    "What is present for you right now?",
    "What do you wish to express?",
    "What are you noticing?",
  ],
};

// Emotional state labels in English
export const EMOTIONAL_LABELS: Record<EmotionalState, { label: string; description: string }> = {
  anxiety: {
    label: "Whirlwind",
    description: "Many things moving too fast.",
  },
  overwhelm: {
    label: "Storm",
    description: "Weight, intensity, and difficulty seeing the horizon.",
  },
  confusion: {
    label: "Fog",
    description: "The path is unclear right now.",
  },
  free: {
    label: "Clearing",
    description: "An open space.",
  },
};
