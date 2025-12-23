import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundShapes } from '@/components/BackgroundShapes';
import { ArrowLeft, BookOpen, Clock, ChevronRight, Home } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Footer } from '@/components/Footer';

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  reading_time_minutes: number;
  created_at: string;
}

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'What is Liminality?',
    summary: 'Understanding the concept of transitional spaces and how they can help us process change.',
    content: `# What is Liminality?

Liminality is an anthropological concept that describes the state of being "between" two phases or conditions. The term comes from Latin "limen", meaning "threshold" or "door".

## The Three Phases of Transition

Anthropologist Arnold van Gennep identified three phases in rites of passage:

1. **Separation** - The departure from the previous state
2. **Liminality** - The intermediate, transitional state
3. **Incorporation** - Entry into a new condition

## Why Does This Matter?

In modern life, we frequently experience liminal states without recognizing them. Job loss, relationship endings, career changes — all are liminal moments.

Recognizing and honoring these moments can:
- Reduce uncertainty anxiety
- Create space for deep reflection
- Facilitate healthier transitions

## Limen as a Liminal Space

Limen was created to be exactly this: a safe space between mental states, where you can pause, reflect, and process before moving forward.`,
    category: 'Concepts',
    reading_time_minutes: 5,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Reflection vs. Rumination',
    summary: 'Understand the difference between healthy reflection and harmful repetitive thinking patterns.',
    content: `# Reflection vs. Rumination

There is an important difference between reflecting on experiences and ruminating on them.

## Reflection

Reflection is an active and constructive process of:
- Examining experiences with curiosity
- Seeking understanding and meaning
- Moving toward insights and growth

## Rumination

Rumination is a passive and repetitive pattern of:
- Repeating the same thoughts without resolution
- Focusing on negative aspects
- Getting "stuck" in mental loops

## How Limen Helps

Limen uses guided questions to direct reflection constructively, helping you:
- Name what you're feeling
- Observe without judgment
- Create internal movement

If you notice you're ruminating, consider seeking professional support.`,
    category: 'Mental Health',
    reading_time_minutes: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Self-Care Practices',
    summary: 'Simple and accessible ways to take care of yourself daily.',
    content: `# Self-Care Practices

Self-care doesn't have to be complicated or expensive. Here are some simple practices:

## Physical Practices
- Conscious breathing for 2 minutes
- A short walk outdoors
- Gentle stretching

## Emotional Practices
- Writing about what you're feeling
- Talking with someone you trust
- Allowing yourself to feel without judgment

## Mental Practices
- Regular breaks during work
- Limiting news consumption
- Setting healthy boundaries

## When to Seek Help

Self-care is important, but it doesn't replace professional help. Consider seeking a mental health professional if:
- Feelings persist for weeks
- They affect your daily functioning
- You have thoughts of harming yourself

**Crisis Support**
If you're in crisis, please reach out: findahelpline.com`,
    category: 'Self-Care',
    reading_time_minutes: 6,
    created_at: new Date().toISOString()
  }
];

function ArticleList({ articles, onSelect }: { articles: Article[]; onSelect: (article: Article) => void }) {
  const categories = [...new Set(articles.map(a => a.category))];

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category}>
          <h3 className="text-lg font-medium text-foreground mb-4">{category}</h3>
          <div className="space-y-3">
            {articles
              .filter((a) => a.category === category)
              .map((article) => (
                <button
                  key={article.id}
                  onClick={() => onSelect(article)}
                  className="w-full limen-glass rounded-xl p-5 text-left hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground/70">
                        <Clock className="w-3 h-3" />
                        <span>{article.reading_time_minutes} min read</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ArticleView({ article, onBack }: { article: Article; onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto limen-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to library</span>
      </button>
      
      <article className="limen-glass rounded-xl p-8">
        <header className="mb-8">
          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
            {article.category}
          </span>
          <h1 className="text-2xl font-light text-foreground mt-4 mb-2">
            {article.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </header>
        
        <ScrollArea className="h-[500px] pr-4">
          <div className="prose prose-invert max-w-none">
            {article.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) {
                return <h1 key={i} className="text-2xl font-light text-foreground mt-6 mb-4">{line.slice(2)}</h1>;
              }
              if (line.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-medium text-foreground mt-6 mb-3">{line.slice(3)}</h2>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="text-foreground/90 ml-4">{line.slice(2)}</li>;
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-medium text-foreground my-2">{line.slice(2, -2)}</p>;
              }
              if (line.trim()) {
                return <p key={i} className="text-foreground/90 leading-relaxed my-3">{line}</p>;
              }
              return null;
            })}
          </div>
        </ScrollArea>
      </article>
    </div>
  );
}

export default function Educational() {
  const navigate = useNavigate();
  const [articles] = useState<Article[]>(MOCK_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <main className="relative min-h-screen flex flex-col">
      <BackgroundShapes />
      
      <div className="relative z-10 flex-1 max-w-4xl mx-auto px-6 py-12 pb-24">
        {!selectedArticle && (
          <>
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
            
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-8 h-8 text-secondary" />
                <h1 className="text-3xl font-light text-foreground">Library</h1>
              </div>
              <p className="text-muted-foreground">
                Content about mental health, liminality, and self-care.
              </p>
            </header>
            
            <ArticleList articles={articles} onSelect={setSelectedArticle} />
          </>
        )}
        
        {selectedArticle && (
          <ArticleView article={selectedArticle} onBack={() => setSelectedArticle(null)} />
        )}
      </div>
      
      <Footer />
    </main>
  );
}
