import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { EMOTIONAL_LABELS, type EmotionalState } from '@/lib/types';
import { LimenButton } from '@/components/ui/limen-button';
import { ArrowLeft, Trash2, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Footer } from '@/components/Footer';

interface ReflectionData {
  id: string;
  text: string;
  mood: EmotionalState;
  ai_response: string | null;
  guiding_question: string;
  created_at: string;
}

export default function Reflections() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [reflections, setReflections] = useState<ReflectionData[]>([]);
  const [selectedReflection, setSelectedReflection] = useState<ReflectionData | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [moodFilter, setMoodFilter] = useState<EmotionalState | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchReflections();
    }
  }, [user, authLoading, navigate]);

  const fetchReflections = async () => {
    try {
      const { data, error } = await supabase
        .from('reflections')
        .select('*')
        .eq('is_saved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReflections(data || []);
    } catch (error) {
      console.error('Error fetching reflections:', error);
      toast.error('Failed to load reflections');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reflections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setReflections(prev => prev.filter(r => r.id !== id));
      setSelectedReflection(null);
      setConfirmDelete(null);
      toast.success('Reflection deleted');
    } catch (error) {
      console.error('Error deleting reflection:', error);
      toast.error('Failed to delete reflection');
    }
  };

  const handleDeleteAll = async () => {
    try {
      const { error } = await supabase
        .from('reflections')
        .delete()
        .eq('user_id', user?.id);

      if (error) throw error;

      setReflections([]);
      setConfirmDelete(null);
      toast.success('All reflections deleted');
    } catch (error) {
      console.error('Error deleting reflections:', error);
      toast.error('Failed to delete reflections');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredReflections = moodFilter === 'all' 
    ? reflections 
    : reflections.filter(r => r.mood === moodFilter);

  const moodOptions: (EmotionalState | 'all')[] = ['all', 'anxiety', 'overwhelm', 'confusion', 'free'];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Detail view of a single reflection
  if (selectedReflection) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 px-6 py-16">
          <div className="max-w-2xl mx-auto w-full space-y-8">
            <button
              onClick={() => setSelectedReflection(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to reflections
            </button>

            <div className="limen-glass p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedReflection.created_at)}
                  </p>
                  <p className="text-accent mt-1">
                    {EMOTIONAL_LABELS[selectedReflection.mood]?.label || selectedReflection.mood}
                  </p>
                </div>
                
                {confirmDelete === selectedReflection.id ? (
                  <div className="flex gap-2">
                    <LimenButton
                      onClick={() => handleDelete(selectedReflection.id)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                    >
                      Confirm
                    </LimenButton>
                    <LimenButton
                      onClick={() => setConfirmDelete(null)}
                      variant="ghost"
                      size="sm"
                    >
                      Cancel
                    </LimenButton>
                  </div>
                ) : (
                  <LimenButton
                    onClick={() => setConfirmDelete(selectedReflection.id)}
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </LimenButton>
                )}
              </div>

              <div className="h-px bg-border/50" />

              {/* Guiding question */}
              <div className="text-sm text-muted-foreground italic">
                "{selectedReflection.guiding_question}"
              </div>

              {/* User's text */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Your words</h4>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedReflection.text}
                </p>
              </div>

              {/* AI Response */}
              {selectedReflection.ai_response && (
                <div className="pt-4 border-t border-border/30">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Reflection</h4>
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {selectedReflection.ai_response}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 px-6 py-16">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/home')}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-light text-foreground">Your Reflections</h2>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                showFilters ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="limen-glass p-4 space-y-3 animate-fade-up">
              <p className="text-sm text-muted-foreground">Filter by mood:</p>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setMoodFilter(mood)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-all",
                      moodFilter === mood
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    {mood === 'all' ? 'All' : EMOTIONAL_LABELS[mood]?.label || mood}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Control note */}
          <p className="text-sm text-muted-foreground">
            You are in control of your data. {filteredReflections.length} reflection{filteredReflections.length !== 1 ? 's' : ''} saved.
          </p>

          {filteredReflections.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-muted-foreground">
                {moodFilter === 'all' ? 'No reflections saved yet.' : `No reflections with mood "${EMOTIONAL_LABELS[moodFilter]?.label}".`}
              </p>
              <LimenButton onClick={() => navigate('/individual')} variant="soft">
                Begin a reflection
              </LimenButton>
            </div>
          ) : (
            <>
              {/* Reflections list */}
              <div className="space-y-4">
                {filteredReflections.map((reflection, index) => (
                  <button
                    key={reflection.id}
                    onClick={() => setSelectedReflection(reflection)}
                    className={cn(
                      "w-full text-left p-6 rounded-2xl limen-glass",
                      "hover:scale-[1.01] transition-all duration-300",
                      "opacity-0 animate-fade-up"
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(reflection.created_at)}
                      </p>
                      <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
                        {EMOTIONAL_LABELS[reflection.mood]?.label || reflection.mood}
                      </span>
                    </div>
                    <p className="text-foreground line-clamp-2">
                      {reflection.text}
                    </p>
                  </button>
                ))}
              </div>

              {/* Delete all */}
              <div className="pt-8 border-t border-border/30">
                {confirmDelete === 'all' ? (
                  <div className="flex items-center justify-center gap-4">
                    <p className="text-sm text-muted-foreground">Delete all reflections?</p>
                    <LimenButton
                      onClick={handleDeleteAll}
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                    >
                      Yes, delete all
                    </LimenButton>
                    <LimenButton
                      onClick={() => setConfirmDelete(null)}
                      variant="ghost"
                      size="sm"
                    >
                      Cancel
                    </LimenButton>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete('all')}
                    className="text-sm text-muted-foreground/60 hover:text-destructive transition-colors w-full text-center"
                  >
                    Delete all reflections
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
