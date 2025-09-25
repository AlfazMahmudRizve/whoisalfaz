
import React from 'react';

export interface Project {
  id: number;
  category: 'AI Agents' | 'Projects' | 'Case Studies';
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  tags: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  seoDescription: string;
  content: string;
  coverImage: string; // base64 string or URL
  category: string;
}

export interface TimelineEvent {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}
