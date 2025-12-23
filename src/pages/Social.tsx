import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BackgroundShapes } from '@/components/BackgroundShapes';
import { LimenButton } from '@/components/ui/limen-button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Users, MessageCircle, Headphones, Heart, Plus, Loader2, LogIn, Home } from 'lucide-react';
import type { EmotionalState } from '@/lib/types';
import { EMOTIONAL_LABELS } from '@/lib/types';
import { Footer } from '@/components/Footer';

interface CommunityPost {
  id: string;
  content: string;
  mood: EmotionalState | null;
  anonymous_name: string;
  hearts_count: number;
  created_at: string;
  user_has_hearted?: boolean;
}

function CommunityWall() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [selectedMood, setSelectedMood] = useState<EmotionalState | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchPosts = async () => {
    try {
      // Use the safe view that doesn't expose user_id for anonymity
      const { data: postsData, error } = await supabase
        .from('community_posts_safe')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;

      if (user && postsData) {
        const { data: hearts } = await supabase
          .from('post_hearts')
          .select('post_id')
          .eq('user_id', user.id);
        
        const heartedIds = new Set(hearts?.map(h => h.post_id) || []);
        
        setPosts(postsData.map(post => ({
          ...post,
          user_has_hearted: heartedIds.has(post.id)
        })));
      } else {
        setPosts(postsData || []);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const handleSubmitPost = async () => {
    if (!user || !newPost.trim()) return;
    
    setSubmitting(true);
    try {
      const anonymousNames = [
        'Wandering Soul', 'Roaming Heart', 'Free Spirit', 
        'Curious Mind', 'Present Being', 'Awakened Conscience'
      ];
      const randomName = anonymousNames[Math.floor(Math.random() * anonymousNames.length)];

      const { error } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          content: newPost,
          mood: selectedMood,
          anonymous_name: randomName
        });
      
      if (error) throw error;
      
      setNewPost('');
      setSelectedMood(null);
      setShowForm(false);
      fetchPosts();
      
      toast({
        title: 'Shared',
        description: 'Your reflection has been added to the wall.',
      });
    } catch (err) {
      console.error('Error posting:', err);
      toast({
        title: 'Error',
        description: 'Could not share your reflection.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleHeart = async (postId: string, hasHearted: boolean) => {
    if (!user) {
      toast({
        title: 'Sign in to interact',
        description: 'You need to be signed in to heart posts.',
      });
      return;
    }
    
    try {
      if (hasHearted) {
        await supabase
          .from('post_hearts')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('post_hearts')
          .insert({ post_id: postId, user_id: user.id });
      }
      fetchPosts();
    } catch (err) {
      console.error('Error toggling heart:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-foreground">Community Wall</h2>
          <p className="text-muted-foreground mt-1">Anonymous reflections from the community</p>
        </div>
        {user ? (
          <LimenButton onClick={() => setShowForm(!showForm)} variant="default" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Share
          </LimenButton>
        ) : (
          <Link to="/auth">
            <LimenButton variant="ghost" size="sm">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </LimenButton>
          </Link>
        )}
      </div>

      {!user && (
        <div className="limen-glass rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-muted-foreground">Sign in to interact with the community.</p>
        </div>
      )}

      {showForm && user && (
        <div className="limen-glass rounded-xl p-6 mb-8 limen-fade-in">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share an anonymous reflection..."
            className="w-full h-32 bg-background/50 border border-border/30 rounded-lg p-4 text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          
          <div className="flex flex-wrap gap-2 mt-4 mb-4">
            {(['anxiety', 'overwhelm', 'confusion', 'free'] as EmotionalState[]).map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedMood === mood 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {EMOTIONAL_LABELS[mood].label}
              </button>
            ))}
          </div>
          
          <div className="flex justify-end gap-2">
            <LimenButton variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </LimenButton>
            <LimenButton 
              onClick={handleSubmitPost}
              disabled={!newPost.trim() || submitting}
            >
              {submitting ? 'Sharing...' : 'Share'}
            </LimenButton>
          </div>
          
          <p className="text-xs text-muted-foreground/60 mt-4">
            Your real name will not be shown. An anonymous name will be assigned.
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          The wall is still silent. Be the first to share.
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="limen-glass rounded-xl p-6">
              <p className="text-foreground/90 leading-relaxed mb-4">
                {post.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{post.anonymous_name}</span>
                  {post.mood && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {EMOTIONAL_LABELS[post.mood].label}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleHeart(post.id, post.user_has_hearted || false)}
                  className={`flex items-center gap-1 transition-colors ${
                    post.user_has_hearted ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                  disabled={!user}
                >
                  <Heart className={`w-4 h-4 ${post.user_has_hearted ? 'fill-current' : ''}`} />
                  <span className="text-sm">{post.hearts_count}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SocialNav({ active, onChange }: { active: string; onChange: (tab: string) => void }) {
  const tabs = [
    { id: 'circles', label: 'Circles', icon: Users },
    { id: 'wall', label: 'Wall', icon: MessageCircle },
    { id: 'listening', label: 'Listening', icon: Headphones },
  ];

  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
            active === id 
              ? 'bg-accent text-accent-foreground' 
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

function CirclesView() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <Users className="w-12 h-12 text-accent mx-auto mb-4" />
      <h2 className="text-2xl font-light text-foreground mb-3">Reflection Circles</h2>
      <p className="text-muted-foreground mb-8">
        Thematic spaces to share reflections with people going through similar moments.
      </p>
      <p className="text-sm text-muted-foreground/70">
        This feature will be available soon.
      </p>
    </div>
  );
}

function ListeningView() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <Headphones className="w-12 h-12 text-accent mx-auto mb-4" />
      <h2 className="text-2xl font-light text-foreground mb-3">Active Listening</h2>
      <p className="text-muted-foreground mb-8">
        Connect with someone from the community for mutual support and empathic listening.
      </p>
      <p className="text-sm text-muted-foreground/70">
        This feature will be available soon.
      </p>
    </div>
  );
}

export default function Social() {
  const navigate = useNavigate();
  const { loading } = useAuth();
  const [activeTab, setActiveTab] = useState('wall');

  if (loading) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <BackgroundShapes />
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

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
        
        <SocialNav active={activeTab} onChange={setActiveTab} />
        
        {activeTab === 'circles' && <CirclesView />}
        {activeTab === 'wall' && <CommunityWall />}
        {activeTab === 'listening' && <ListeningView />}
      </div>
      
      <Footer />
    </main>
  );
}
