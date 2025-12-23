import React, { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { EMOTIONAL_LABELS, type Reflection } from '@/lib/types';
import { LimenButton } from '@/components/ui/limen-button';
import { ArrowLeft, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReflectionsViewProps {
  onClose: () => void;
}

export function ReflectionsView({ onClose }: ReflectionsViewProps) {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [selectedReflection, setSelectedReflection] = useState<Reflection | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    setReflections(storage.getReflections());
  }, []);

  const handleDelete = (id: string) => {
    storage.deleteReflection(id);
    setReflections(storage.getReflections());
    setSelectedReflection(null);
    setConfirmDelete(null);
  };

  const handleDeleteAll = () => {
    storage.deleteAllReflections();
    setReflections([]);
    setConfirmDelete(null);
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

  // Detail view of a single reflection
  if (selectedReflection) {
    return (
      <div className="min-h-screen flex flex-col px-6 py-16">
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
                  {formatDate(selectedReflection.date)}
                </p>
                <p className="text-accent mt-1">
                  {EMOTIONAL_LABELS[selectedReflection.mood].label}
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

            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {selectedReflection.text}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-16">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-light text-foreground">Your Reflections</h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Control note */}
        <p className="text-sm text-muted-foreground">
          You are in control of your data.
        </p>

        {reflections.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground">No reflections saved yet.</p>
            <LimenButton onClick={onClose} variant="soft">
              Begin a reflection
            </LimenButton>
          </div>
        ) : (
          <>
            {/* Reflections list */}
            <div className="space-y-4">
              {reflections.map((reflection, index) => (
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
                      {formatDate(reflection.date)}
                    </p>
                    <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
                      {EMOTIONAL_LABELS[reflection.mood].label}
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
  );
}
