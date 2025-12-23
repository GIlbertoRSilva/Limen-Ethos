// Limen Storage — Ethical, explicit, local-only persistence

import type { Reflection } from './types';

const STORAGE_KEY = 'limen_reflections';

export const storage = {
  /**
   * Get all saved reflections from localStorage
   * Returns empty array if none exist
   */
  getReflections(): Reflection[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  /**
   * Save a new reflection to localStorage
   * Explicit opt-in only — never called automatically
   */
  saveReflection(reflection: Reflection): void {
    const existing = this.getReflections();
    const updated = [reflection, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  /**
   * Delete a specific reflection by ID
   * Immediate and irreversible
   */
  deleteReflection(id: string): void {
    const existing = this.getReflections();
    const updated = existing.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  /**
   * Delete all reflections
   * Complete data removal — user is in control
   */
  deleteAllReflections(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  /**
   * Generate a unique ID for a reflection
   */
  generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  },
};
