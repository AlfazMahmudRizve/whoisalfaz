import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/layout/Header';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ShowcaseSection from './components/sections/ShowcaseSection';
import BlogSection from './components/sections/BlogSection';
import BlogPostPage from './components/sections/BlogPostPage';
import NowSection from './components/sections/NowSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import Chatbot from './components/Chatbot';
import type { BlogPost } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [typedSequence, setTypedSequence] = useState('');
  const targetSequence = 'who is alfaz?';

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // SEO Defaults - these should match index.html for consistency and for when returning to the main page.
  const defaultTitle = "whoisalfaz.me | Alfaz Mahmud Rizve's Portfolio";
  const defaultDescription = "A personal portfolio website for Alfaz, showcasing AI agents, businesses, and ideas brought to reality.";
  const defaultOgImage = "https://iili.io/Kc953In.jpg";

  const updateMetaTags = useCallback((title: string, description: string, imageUrl: string) => {
    document.title = title;
    const selectors = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="twitter:title"]': title,
      'meta[property="og:description"]': description,
      'meta[property="twitter:description"]': description,
      'meta[property="og:image"]': imageUrl,
      'meta[property="twitter:image"]': imageUrl,
    };

    for (const [selector, content] of Object.entries(selectors)) {
      const element = document.querySelector(selector) as HTMLMetaElement | null;
      if (element) {
        element.content = content;
      }
    }
  }, []);

  useEffect(() => {
    if (selectedPost) {
      updateMetaTags(
        `${selectedPost.title} | whoisalfaz.me`,
        selectedPost.seoDescription,
        selectedPost.coverImage
      );
    } else {
      updateMetaTags(defaultTitle, defaultDescription, defaultOgImage);
    }
  }, [selectedPost, updateMetaTags, defaultTitle, defaultDescription, defaultOgImage]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const metaResponse = await fetch('/metadata.json');
        if (!metaResponse.ok) {
          throw new Error('Failed to load application configuration.');
        }
        const config = await metaResponse.json();
        
        if (!config.blogPostsUrl) {
          throw new Error('Blog posts URL is not configured in metadata.json.');
        }

        const response = await fetch(config.blogPostsUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts from the specified URL.');
        }
        const data: BlogPost[] = await response.json();
        setPosts(data.sort((a, b) => b.id - a.id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const nextTypedSequence = (typedSequence + event.key).toLowerCase();
    
    if (targetSequence.startsWith(nextTypedSequence)) {
      setTypedSequence(nextTypedSequence);
      if (nextTypedSequence === targetSequence) {
        setChatbotOpen(true);
        setTypedSequence(''); 
      }
    } else {
      setTypedSequence(event.key.toLowerCase());
    }
  }, [typedSequence]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleNavClick = () => {
    if (selectedPost) {
      setSelectedPost(null);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-200 font-sans transition-colors duration-500">
      <Header theme={theme} toggleTheme={toggleTheme} onNavClick={handleNavClick} />
        {selectedPost ? (
            <BlogPostPage post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
            <main>
                <HeroSection />
                <AboutSection />
                <NowSection agentsBuilt={3} blogsPublished={posts.length} />
                <ShowcaseSection />
                <BlogSection 
                    posts={posts}
                    isLoading={isLoading}
                    error={error}
                    onPostSelect={setSelectedPost}
                />
                <ContactSection />
            </main>
        )}
      <Footer />
      {isChatbotOpen && <Chatbot onClose={() => setChatbotOpen(false)} />}
    </div>
  );
};

export default App;
