import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundShapes } from '@/components/BackgroundShapes';
import { LimenButton } from '@/components/ui/limen-button';
import { ArrowLeft, Vote, Heart, Users, Shield, Sparkles, ArrowRight, CheckCircle2, Home } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Footer } from '@/components/Footer';

function InfoTab() {
  return (
    <div className="space-y-8 limen-fade-in">
      <section className="limen-glass rounded-xl p-8">
        <h2 className="text-2xl font-light text-foreground mb-4">What is Ethos?</h2>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Ethos is Limen's DAO (Decentralized Autonomous Organization). It's a form of governance where decisions are made collectively by the community, not by a central authority.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          In the context of Limen, this means you, as a community member, will have an active voice in decisions about the platform's future.
        </p>
      </section>
      
      <section className="limen-glass rounded-xl p-8">
        <h2 className="text-2xl font-light text-foreground mb-4">Why Decentralize?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Transparency</h3>
              <p className="text-sm text-muted-foreground">
                All decisions are visible and auditable by the community.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Users className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Participation</h3>
              <p className="text-sm text-muted-foreground">
                Each member can propose changes and vote on important decisions.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Ethics</h3>
              <p className="text-sm text-muted-foreground">
                Decisions about privacy and data pass through community scrutiny.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Sustainability</h3>
              <p className="text-sm text-muted-foreground">
                The project belongs to the community, not external investors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ManifestoTab() {
  const principles = [
    {
      title: "Privacy is Sacred",
      description: "Your data is yours. It will never be sold, analyzed for profit, or shared without explicit consent."
    },
    {
      title: "Reflection, not Diagnosis",
      description: "Limen exists to accompany, not to categorize. We don't make diagnoses or give clinical advice."
    },
    {
      title: "Total Control",
      description: "You can delete everything at any time. No questions, no barriers, no traces."
    },
    {
      title: "Technology Serving Humanity",
      description: "AI is a mirroring tool, not an interpretation tool. It reflects, doesn't analyze."
    },
    {
      title: "Community with Care",
      description: "Social interactions are optional, anonymous, and moderated with gentleness."
    },
    {
      title: "Radical Transparency",
      description: "The code is open. Decisions are public. Algorithms are explained."
    },
    {
      title: "Accessibility as Value",
      description: "Limen must be accessible to all, regardless of financial or technical ability."
    },
    {
      title: "Collective Governance",
      description: "Limen's future is decided by those who use it, not by those who built it."
    }
  ];

  return (
    <div className="limen-fade-in">
      <div className="limen-glass rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-light text-foreground mb-4 text-center">
          Limen Manifesto
        </h2>
        <p className="text-center text-muted-foreground italic mb-8">
          "An ethical space to cross internal thresholds"
        </p>
        
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {principles.map((principle, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-sm font-medium">{index + 1}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          This manifesto is living and will be updated by the community.
        </p>
        <LimenButton variant="ghost" disabled>
          Propose changes (coming soon)
        </LimenButton>
      </div>
    </div>
  );
}

function RoadmapTab() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Foundation",
      status: "current",
      items: [
        { text: "MVP Launch", done: true },
        { text: "Individual Pillar with AI", done: true },
        { text: "Social Pillar (Community Wall)", done: true },
        { text: "Educational Pillar (Library)", done: true },
        { text: "Ethical consent system", done: true }
      ]
    },
    {
      phase: "Phase 2",
      title: "Community",
      status: "upcoming",
      items: [
        { text: "Thematic Reflection Circles", done: false },
        { text: "Active Listening System", done: false },
        { text: "Progressive guided journeys", done: false },
        { text: "Curated external resources", done: false }
      ]
    },
    {
      phase: "Phase 3",
      title: "Governance",
      status: "upcoming",
      items: [
        { text: "Ethos governance token", done: false },
        { text: "Proposal system", done: false },
        { text: "On-chain voting", done: false },
        { text: "Community treasury", done: false }
      ]
    },
    {
      phase: "Phase 4",
      title: "Autonomy",
      status: "future",
      items: [
        { text: "Complete transfer to Ethos DAO", done: false },
        { text: "Fully open code", done: false },
        { text: "Sustainability via community", done: false },
        { text: "International expansion", done: false }
      ]
    }
  ];

  return (
    <div className="limen-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-light text-foreground mb-3">Decentralization Roadmap</h2>
        <p className="text-muted-foreground">
          Limen's path towards community governance via Ethos
        </p>
      </div>
      
      <div className="space-y-6">
        {phases.map((phase, index) => (
          <div 
            key={phase.phase}
            className={`limen-glass rounded-xl p-6 ${
              phase.status === 'current' ? 'ring-2 ring-primary/50' : ''
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`px-3 py-1 rounded-full text-sm ${
                phase.status === 'current' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {phase.phase}
              </div>
              <h3 className="font-medium text-foreground">{phase.title}</h3>
              {phase.status === 'current' && (
                <span className="text-xs text-primary ml-auto">In Progress</span>
              )}
            </div>
            
            <div className="space-y-2 ml-2">
              {phase.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-muted-foreground/30 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${item.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            
            {index < phases.length - 1 && (
              <div className="flex justify-center mt-4">
                <ArrowRight className="w-4 h-4 text-muted-foreground/30 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Ethos() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen flex flex-col">
      <BackgroundShapes />
      
      <div className="relative z-10 flex-1 max-w-4xl mx-auto px-6 py-12 pb-24">
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
        
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Vote className="w-8 h-8 text-muted-foreground" />
            <h1 className="text-3xl font-light text-foreground">Ethos</h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Limen's decentralized governance. The platform's future is shaped by the community.
          </p>
        </header>
        
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/50">
            <TabsTrigger value="info">What is Ethos?</TabsTrigger>
            <TabsTrigger value="manifesto">Manifesto</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <InfoTab />
          </TabsContent>
          
          <TabsContent value="manifesto">
            <ManifestoTab />
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
