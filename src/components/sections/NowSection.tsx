import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ endValue, label }: { endValue: number; label:string }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; 

  useEffect(() => {
    let startTime: number | null = null;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const currentCount = Math.floor(endValue * percentage);
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(endValue);
      }
    };
    
    if (endValue > count) {
        requestAnimationFrame(animateCount);
    } else {
        setCount(endValue);
    }
  }, [endValue]);

  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{count}{label.includes('Agents') ? '' : '+'}</p>
      <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );
};

interface NowSectionProps {
  agentsBuilt: number;
  blogsPublished: number;
}

const NowSection: React.FC<NowSectionProps> = ({ agentsBuilt, blogsPublished }) => {
  return (
    <section id="now" className="py-20 bg-gray-50 dark:bg-dark-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I'm Doing Now</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Currently, I'm focused on scaling my AI startup, exploring the frontiers of autonomous agent swarms, and writing about the practical applications of generative AI for businesses. My goal is to build tools that not only automate but also innovate.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <AnimatedCounter endValue={agentsBuilt} label="AI Agents Built" />
            <AnimatedCounter endValue={blogsPublished} label="Blogs Published" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NowSection;