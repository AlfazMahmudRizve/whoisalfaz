import React, { useState } from 'react';
import type { Project } from '../../types';

interface Card3DProps {
  project: Project;
}

const Card3D: React.FC<Card3DProps> = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setRotate({ x: y * -15, y: x * 15 });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 });
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
    transition: 'transform 0.1s ease-out',
  };

  const flippedStyle = {
    transform: 'rotateY(180deg)',
  };

  return (
    <div
      className="relative w-full h-[450px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{ transformStyle: 'preserve-3d', ...(isFlipped ? flippedStyle : {}) }}
      >
        {/* Front of Card */}
        <div className="absolute w-full h-full backface-hidden" style={cardStyle}>
          <div className="w-full h-full bg-white dark:bg-dark-bg rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col border border-white/10">
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
            <p className="text-primary font-semibold text-sm mb-2">{project.category}</p>
            <p className="text-gray-600 dark:text-gray-400 flex-grow">{project.description}</p>
            <p className="text-xs text-gray-500 mt-4 text-center">Click to see details</p>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute w-full h-full backface-hidden" style={{
          transition: cardStyle.transition,
          transform: `rotateY(180deg) ${cardStyle.transform}`
        }}>
          <div className="w-full h-full bg-white dark:bg-dark-bg rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col border border-white/10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.longDescription}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="bg-primary/20 text-primary text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
              ))}
            </div>
             <p className="text-xs text-gray-500 mt-4 text-center">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card3D;
