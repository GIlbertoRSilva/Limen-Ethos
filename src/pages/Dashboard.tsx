import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundShapes } from '@/components/BackgroundShapes';
import { LimenButton } from '@/components/ui/limen-button';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Users, 
  BookOpen, 
  Vote,
  Heart,
  Sparkles,
  MessageCircle,
  LogOut
} from 'lucide-react';

interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

function PillarCard({ icon, title, description, color, onClick }: PillarCardProps) {
  return (
    <button
      onClick={onClick}
      className={`limen-glass rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group w-full`}
    >
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </button>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <main className="relative min-h-screen">
      <BackgroundShapes />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-light text-foreground">Limen</h1>
            <p className="text-muted-foreground mt-1">Seu espaço de reflexão</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <LimenButton variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </LimenButton>
          </div>
        </header>

        {/* Welcome Message */}
        <section className="limen-glass rounded-2xl p-8 mb-12 text-center limen-fade-in">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-light text-foreground mb-3">
            Bem-vindo ao seu limiar
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Este é um espaço seguro para pausar, refletir e cruzar momentos de transição. 
            Escolha um dos pilares abaixo para começar.
          </p>
        </section>

        {/* Pillars Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <PillarCard
            icon={<User className="w-6 h-6 text-primary-foreground" />}
            title="Individual"
            description="Reflexão pessoal guiada com perguntas que convidam à introspecção"
            color="bg-primary"
            onClick={() => navigate('/individual')}
          />
          
          <PillarCard
            icon={<Users className="w-6 h-6 text-accent-foreground" />}
            title="Social"
            description="Círculos de reflexão, mural coletivo e escuta ativa entre pares"
            color="bg-accent"
            onClick={() => navigate('/social')}
          />
          
          <PillarCard
            icon={<BookOpen className="w-6 h-6 text-secondary-foreground" />}
            title="Educacional"
            description="Biblioteca de conteúdos sobre saúde mental e liminaridade"
            color="bg-secondary"
            onClick={() => navigate('/educational')}
          />
          
          <PillarCard
            icon={<Vote className="w-6 h-6 text-foreground" />}
            title="Ethos"
            description="Governança descentralizada e o futuro do Limen"
            color="bg-muted"
            onClick={() => navigate('/ethos')}
          />
        </section>

        {/* Quick Actions */}
        <section className="grid sm:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/individual')}
            className="limen-glass rounded-xl p-4 flex items-center gap-3 hover:bg-primary/10 transition-colors"
          >
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-foreground">Nova reflexão</span>
          </button>
          
          <button 
            onClick={() => navigate('/social/wall')}
            className="limen-glass rounded-xl p-4 flex items-center gap-3 hover:bg-accent/10 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-accent" />
            <span className="text-foreground">Mural coletivo</span>
          </button>
          
          <button 
            onClick={() => navigate('/about')}
            className="limen-glass rounded-xl p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors"
          >
            <Sparkles className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">Sobre o Limen</span>
          </button>
        </section>
      </div>
    </main>
  );
}