import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundShapes } from '@/components/BackgroundShapes';
import { LimenButton } from '@/components/ui/limen-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Home, Heart, Brain, Shield, Users, Sparkles } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

const consentSections = [
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

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showConsentStep, setShowConsentStep] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    try {
      emailSchema.parse(email);
    } catch {
      newErrors.email = 'Please enter a valid email';
    }
    
    try {
      passwordSchema.parse(password);
    } catch {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToConsent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowConsentStep(true);
  };

  const handleSubmit = async () => {
    if (!consentAccepted) return;
    
    setLoading(true);
    
    try {
      const { error } = await signUp(email, password, displayName || undefined);
      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'Email already registered',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Error signing up',
            description: error.message,
            variant: 'destructive'
          });
        }
        setShowConsentStep(false);
      } else {
        localStorage.setItem('limen_consent_given', 'true');
        toast({
          title: 'Account created successfully',
        });
        navigate('/home');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Invalid email or password',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Error signing in',
            description: error.message,
            variant: 'destructive'
          });
        }
      } else {
        navigate('/home');
      }
    } finally {
      setLoading(false);
    }
  };

  // Consent step for signup
  if (showConsentStep && !isLogin) {
    return (
      <main className="relative min-h-screen flex flex-col">
        <BackgroundShapes />
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 pb-24">
          <div className="w-full max-w-2xl">
            <button
              onClick={() => setShowConsentStep(false)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            
            <div className="limen-glass rounded-2xl p-8 limen-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-light text-foreground mb-2">
                  Before You Join
                </h1>
                <p className="text-muted-foreground">
                  Please read and understand what Limen is and isn't.
                </p>
              </div>
              
              <div className="space-y-4 mb-8 max-h-[350px] overflow-y-auto pr-2">
                {consentSections.map((section, index) => (
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
              
              <div className="border-t border-border/30 pt-6">
                <label className="flex items-start gap-3 cursor-pointer group mb-6">
                  <Checkbox
                    checked={consentAccepted}
                    onCheckedChange={(checked) => setConsentAccepted(checked as boolean)}
                    className="mt-1"
                  />
                  <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                    I understand that Limen is an ethical reflection space, not a substitute for professional mental health care.
                  </span>
                </label>
                
                <div className="flex gap-4">
                  <LimenButton
                    variant="ghost"
                    onClick={() => setShowConsentStep(false)}
                    className="flex-1"
                  >
                    Cancel
                  </LimenButton>
                  <LimenButton
                    variant="default"
                    onClick={handleSubmit}
                    disabled={!consentAccepted || loading}
                    className="flex-1"
                  >
                    {loading ? 'Creating...' : 'I Understand, Create Account'}
                  </LimenButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col">
      <BackgroundShapes />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-24">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-4 mb-6">
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
          
          <div className="limen-glass rounded-2xl p-8 limen-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-foreground mb-2">Limen</h1>
              <p className="text-muted-foreground">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </p>
            </div>
            
            <form onSubmit={isLogin ? handleLogin : handleProceedToConsent} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-foreground/80">
                    Display Name (optional)
                  </Label>
                  <Input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="How should we call you?"
                    className="bg-background/50 border-border/50 focus:border-primary/50"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-background/50 border-border/50 focus:border-primary/50"
                  required
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/80">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-background/50 border-border/50 focus:border-primary/50"
                  required
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>
              
              <LimenButton
                type="submit"
                variant="default"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Continue')}
              </LimenButton>
            </form>
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setShowConsentStep(false);
                  setConsentAccepted(false);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
            
            <p className="mt-8 text-xs text-center text-muted-foreground/70">
              Creating an account is optional. Limen works without login.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}