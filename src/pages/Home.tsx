import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundShapes } from '@/components/BackgroundShapes';
import { LimenLogo } from '@/components/LimenLogo';
import { Footer } from '@/components/Footer';
import { User, Users, BookOpen, ArrowRight } from 'lucide-react';

const CONSENT_KEY = 'limen_consent_given';

export default function Home() {
  const navigate = useNavigate();
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'true') {
      setHasConsented(true);
    } else {
      navigate('/consent');
    }
  }, [navigate]);

  if (hasConsented === null || !hasConsented) {
    return null;
  }

  const modules = [
    {
      id: 'individual',
      icon: User,
      title: 'Individual',
      description: 'A private space for guided reflection. Write freely, receive empathic responses.',
      color: 'from-primary/20 to-primary/5',
      borderColor: 'border-primary/30',
      path: '/individual',
    },
    {
      id: 'social',
      icon: Users,
      title: 'Community',
      description: 'Share anonymously. Connect without exposure. Support without judgment.',
      color: 'from-accent/20 to-accent/5',
      borderColor: 'border-accent/30',
      path: '/social',
    },
    {
      id: 'educational',
      icon: BookOpen,
      title: 'Library',
      description: 'Curated resources about emotional wellness and self-understanding.',
      color: 'from-muted/30 to-muted/10',
      borderColor: 'border-muted-foreground/20',
      path: '/educational',
    },
  ];

  return (
    <main className="relative min-h-screen flex flex-col">
      <BackgroundShapes />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 opacity-0 animate-fade-up flex flex-col items-center" style={{ animationDelay: '0.1s' }}>
          <LimenLogo size="lg" />
          <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.15em] text-foreground mt-4">
            Limen
          </h1>
          <p className="text-lg text-muted-foreground mt-3 font-light">
            Choose your path
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          {modules.map((module, index) => (
            <button
              key={module.id}
              onClick={() => navigate(module.path)}
              className={`
                group relative p-8 rounded-2xl text-left transition-all duration-300
                bg-gradient-to-br ${module.color}
                border ${module.borderColor}
                hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5
                limen-glass
              `}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-background/50">
                  <module.icon className="w-6 h-6 text-foreground" />
                </div>
                <h2 className="text-xl font-light text-foreground">{module.title}</h2>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {module.description}
              </p>
              
              <div className="flex items-center gap-2 text-primary text-sm group-hover:gap-3 transition-all">
                <span>Explore</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>

        {/* Ethics reminder */}
        <div className="mt-12 text-center opacity-0 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-muted-foreground/70">
            Built with ethics at its core. Your data, your control.
          </p>
        </div>
      </div>

      <Footer onOpenAbout={() => navigate('/about')} onOpenReflections={() => navigate('/reflections')} />
    </main>
  );
}
