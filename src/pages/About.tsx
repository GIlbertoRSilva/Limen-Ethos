import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundShapes } from '@/components/BackgroundShapes';
import { LimenButton } from '@/components/ui/limen-button';
import { ArrowLeft, Heart, Shield, Users, Sparkles, ExternalLink, CheckCircle2, Circle, Target, Home } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Footer } from '@/components/Footer';

function AboutTab() {
  const navigate = useNavigate();

  return (
    <ScrollArea className="h-[calc(100vh-320px)]">
      <div className="space-y-8 pr-4">
        {/* What is Limen */}
        <section className="limen-glass rounded-xl p-6">
          <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            What is Limen?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Limen is a digital space for guided reflection, built around the concept of liminality — a safe threshold between inner experience and expression.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The name comes from Latin "limen", meaning "threshold" or "door". It's a place to pause, name what's present, and cross moments of emotional transition with gentleness.
          </p>
        </section>
        
        {/* What Limen is NOT */}
        <section className="limen-glass rounded-xl p-6">
          <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            What Limen is NOT
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">✗</span>
              <div>
                <strong className="text-foreground">Not Therapy</strong>
                <p className="text-sm text-muted-foreground">
                  Does not replace professional mental health care.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">✗</span>
              <div>
                <strong className="text-foreground">No Diagnosis</strong>
                <p className="text-sm text-muted-foreground">
                  Does not analyze, interpret, or categorize you.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">✗</span>
              <div>
                <strong className="text-foreground">No Advice</strong>
                <p className="text-sm text-muted-foreground">
                  Only mirrors and welcomes what you express.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">✗</span>
              <div>
                <strong className="text-foreground">No Data Monetization</strong>
                <p className="text-sm text-muted-foreground">
                  Your reflections belong only to you.
                </p>
              </div>
            </li>
          </ul>
        </section>
        
        {/* Pillars */}
        <section className="limen-glass rounded-xl p-6">
          <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary" />
            The Three Pillars
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-foreground">Individual</h3>
              <p className="text-sm text-muted-foreground">
                Guided personal reflection with AI-generated questions and empathic responses.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Social</h3>
              <p className="text-sm text-muted-foreground">
                Anonymous community wall, thematic circles, and peer listening.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Educational</h3>
              <p className="text-sm text-muted-foreground">
                Library of content about mental health, liminality, and self-care.
              </p>
            </div>
          </div>
        </section>
        
        {/* AI */}
        <section className="limen-glass rounded-xl p-6">
          <h2 className="text-xl font-medium text-foreground mb-4">About the AI</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Limen uses artificial intelligence to generate reflective questions and empathic responses.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The AI is programmed to never interpret, diagnose, or advise. It serves only as a gentle mirror for your own words.
          </p>
        </section>
        
        {/* Crisis */}
        <section className="bg-primary/10 rounded-xl p-6">
          <h2 className="text-lg font-medium text-foreground mb-3">Need Help?</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            If you are in crisis or need immediate help, please seek professional support.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://findahelpline.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <span className="font-medium">Find a helpline</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
        
        {/* DAO */}
        <section className="limen-glass rounded-xl p-6">
          <h2 className="text-xl font-medium text-foreground mb-4">The Future: DAO</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Limen is transitioning to decentralized governance (DAO).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This means the community will have an active voice in decisions about features, privacy policies, and project direction.
          </p>
          <LimenButton variant="ghost" onClick={() => navigate('/ethos')}>
            Learn more about the DAO
          </LimenButton>
        </section>
      </div>
    </ScrollArea>
  );
}

function RoadmapTab() {
  const phases = [
    {
      id: 'phase0',
      label: 'Phase 0',
      title: 'MVP (Proof of Concept)',
      status: 'Completed',
      statusType: 'done',
      objective: 'Validate the experience, AI use for reflection, and the value of social without exposure.',
      items: [
        { text: 'Linear flow (5 screens)', done: true },
        { text: 'Single session', done: true },
        { text: 'Basic AI (questions + responses)', done: true },
        { text: 'Symbolic DAO (simple votes)', done: true },
      ],
    },
    {
      id: 'phase1',
      label: 'Phase 1',
      title: 'MVP+ (Post-hackathon)',
      status: 'In Progress',
      statusType: 'current',
      objective: 'Transform the prototype into a product usable by real people.',
      items: [
        { text: 'Multiple sessions per user', done: true },
        { text: 'Private personal history', done: true },
        { text: 'Guided themes (anxiety, decision, etc.)', done: false },
        { text: 'AI language refinement', done: false },
      ],
    },
    {
      id: 'phase2',
      label: 'Phase 2',
      title: 'Structured Social',
      status: 'Planned',
      statusType: 'upcoming',
      objective: 'Create collective belonging without becoming a toxic social network.',
      items: [
        { text: 'Community thematic spaces', done: false },
        { text: 'Collective fragments by theme', done: false },
        { text: 'Reflective reactions (not likes)', done: false },
        { text: 'AI-assisted moderation', done: false },
      ],
    },
    {
      id: 'phase3',
      label: 'Phase 3',
      title: 'Functional DAO',
      status: 'Planned',
      statusType: 'upcoming',
      objective: 'Transform symbolic social into real governance.',
      items: [
        { text: 'Community proposals', done: false },
        { text: 'Transparent voting', done: false },
        { text: 'Decentralized identity (DID)', done: false },
        { text: 'Optional wallet', done: false },
      ],
    },
    {
      id: 'phase4',
      label: 'Phase 4',
      title: 'Deep Personalization',
      status: 'Vision',
      statusType: 'future',
      objective: 'Make Limen become a cognitive mirror of the user.',
      items: [
        { text: 'Reflective profiles (not psychological)', done: false },
        { text: 'AI that understands patterns', done: false },
        { text: 'Long journeys (30-90 days)', done: false },
        { text: 'Synchronized collective rituals', done: false },
      ],
    },
    {
      id: 'phase5',
      label: 'Phase 5',
      title: 'Platform / Ecosystem',
      status: 'Vision',
      statusType: 'future',
      objective: 'Transform Limen into digital reflection infrastructure.',
      items: [
        { text: 'Limen API for other platforms', done: false },
        { text: 'Use in education and enterprises', done: false },
        { text: 'DAO as maintainer', done: false },
        { text: 'International expansion', done: false },
      ],
    },
  ];

  return (
    <ScrollArea className="h-[calc(100vh-320px)]">
      <div className="pr-4 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-foreground mb-2">Development Roadmap</h2>
          <p className="text-muted-foreground">The evolution path of Limen</p>
        </div>

        {phases.map((phase) => (
          <div 
            key={phase.id}
            className={`limen-glass rounded-xl p-6 ${
              phase.statusType === 'current' ? 'ring-2 ring-primary/50' : ''
            } ${phase.statusType === 'done' ? 'opacity-80' : ''}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`px-3 py-1 rounded-full text-sm ${
                phase.statusType === 'done' 
                  ? 'bg-primary/20 text-primary' 
                  : phase.statusType === 'current'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {phase.label}
              </div>
              <h3 className="font-medium text-foreground">{phase.title}</h3>
              <span className={`text-xs ml-auto ${
                phase.statusType === 'done' ? 'text-primary' :
                phase.statusType === 'current' ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {phase.status}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 flex items-start gap-2">
              <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {phase.objective}
            </p>
            
            <div className="grid grid-cols-2 gap-2">
              {phase.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground/30 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${item.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default function About() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen flex flex-col">
      <BackgroundShapes />
      
      <div className="relative z-10 flex-1 max-w-3xl mx-auto px-6 py-12 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
        
        <header className="text-center mb-8">
          <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-light text-foreground mb-3">About Limen</h1>
          <p className="text-muted-foreground">
            An ethical space for reflection and transition
          </p>
        </header>
        
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-card/50">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about">
            <AboutTab />
          </TabsContent>
          
          <TabsContent value="roadmap">
            <RoadmapTab />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </main>
  );
}
