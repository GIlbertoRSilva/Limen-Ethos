import React from 'react';
import { Info, BookOpen, User, Vote, Users, Library, Home, LogOut, FileText } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface FooterProps {
  onOpenAbout?: () => void;
  onOpenReflections?: () => void;
}

export function Footer({ onOpenAbout, onOpenReflections }: FooterProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleReflections = () => {
    if (onOpenReflections) {
      onOpenReflections();
    } else {
      navigate('/reflections');
    }
  };

  const handleAbout = () => {
    if (onOpenAbout) {
      onOpenAbout();
    } else {
      navigate('/about');
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const isLanding = location.pathname === '/';

  return (
    <footer className="relative z-10 p-4 flex flex-col items-center gap-3 mt-auto">
      <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
        {!isLanding && (
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        )}
        
        <button
          onClick={handleReflections}
          className="flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Reflections</span>
        </button>
        
        <button
          onClick={handleAbout}
          className="flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
        >
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">About</span>
        </button>
        
        <Link
          to="/social"
          className="flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
        >
          <Users className="w-4 h-4" />
          <span className="hidden sm:inline">Community</span>
        </Link>
        
        <Link
          to="/educational"
          className="flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
        >
          <Library className="w-4 h-4" />
          <span className="hidden sm:inline">Library</span>
        </Link>
        
        <Link
          to="/ethos"
          className="flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
        >
          <Vote className="w-4 h-4" />
          <span className="hidden sm:inline">Ethos</span>
        </Link>

        {user && (
          <Link
            to="/consent"
            className="flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Consent</span>
          </Link>
        )}
        
        {!user ? (
          <Link
            to="/auth"
            className="flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </div>
    </footer>
  );
}
