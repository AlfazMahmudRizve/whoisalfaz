import React from 'react';
import type { TimelineEvent } from '../../types';
import { CodeIcon, AcademicCapIcon, SparklesIcon } from '../icons';

const timelineData: TimelineEvent[] = [
  { title: 'Explored Core Tech & AI', description: 'Started diving into AI, Machine Learning, and web development while building foundational skills in programming and automation.', icon: AcademicCapIcon },
  { title: 'Hands-On Projects & Learning', description: 'Focused on practical application by building automated AI agents and developing intelligent, AI-powered websites.', icon: CodeIcon },
  { title: 'Digital Strategy & Growth', description: 'Managed social media, ran Facebook Ads campaigns, and learned automation to drive real business results.', icon: SparklesIcon },
  { title: 'Entrepreneurial Tech Solutions', description: 'Combined coding, AI, and strategy to create innovative tools, AI agents, and automation systems for impactful outcomes.', icon: SparklesIcon },
];


const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-6">
        
        <div className="grid md:grid-cols-5 gap-16 items-center mb-24">
          {/* Image Column */}
          <div className="md:col-span-2 flex justify-center items-center animate-fade-in-up">
            <div className="relative w-64 h-64 md:w-72 md:h-72 p-1 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-lg">
              <div className="bg-dark-bg p-1 rounded-full w-full h-full">
                <img 
                  src="https://iili.io/Kc953In.jpg" 
                  alt="Alfaz Mahmud Rizve"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30 pointer-events-none"></div>
            </div>
          </div>
          
          {/* Text Column */}
          <div className="md:col-span-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              I'm Alfaz Mahmud Rizve, an AI-powered problem solver. I leverage AI to run and automate businesses, build websites, social media growth, e-commerce and f-commerce consultancy. From architecting sophisticated AI agents to building scalable businesses, I thrive at the intersection of technology and innovation. My journey is driven by a relentless curiosity and a desire to turn bold ideas into impactful realities.
            </p>
          </div>
        </div>
        
        {/* My Journey Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Journey</h3>
            <div className="relative border-l-2 border-primary/30 max-w-3xl mx-auto">
              {timelineData.map((item, index) => (
                <div key={index} className="mb-10 ml-8">
                  <span className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full ring-8 ring-white dark:ring-dark-bg">
                    <item.icon className="w-5 h-5 text-primary" />
                  </span>
                  <h4 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;