import React from 'react';
import { BackgroundShapes } from '@/components/BackgroundShapes';
import { Landing } from '@/components/flow/Landing';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <main className="relative min-h-screen flex flex-col">
      <BackgroundShapes />
      <div className="flex-1">
        <Landing />
      </div>
      <Footer />
    </main>
  );
};

export default Index;
