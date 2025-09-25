import React, { useState, useEffect } from 'react';
import type { Project } from '../../types';
import Card3D from '../ui/Card3D';

const ShowcaseSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI Agents' | 'Projects' | 'Case Studies'>('All');
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error('Failed to fetch projects.');
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);


  const filters: ('All' | 'AI Agents' | 'Projects' | 'Case Studies')[] = ['All', 'AI Agents', 'Projects', 'Case Studies'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);
    
  const renderContent = () => {
    if (isLoading) {
        return <p className="text-center col-span-full text-gray-500">Loading projects...</p>;
    }
    if (error) {
        return <p className="text-center col-span-full text-red-500">Error: {error}</p>;
    }
    if (filteredProjects.length === 0 && !isLoading) {
        return <p className="text-center col-span-full text-gray-500">No projects found for this category.</p>;
    }
    return filteredProjects.map((project, index) => (
        <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
            <Card3D project={project} />
        </div>
    ));
  };


  return (
    <section id="showcase" className="py-20 md:py-32 bg-gray-50 dark:bg-dark-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold">Showcase</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">A selection of my work.</p>
        </div>
        <div className="flex justify-center mb-12 space-x-2 md:space-x-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 md:px-6 md:py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${activeFilter === filter ? 'bg-primary text-dark-bg' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;