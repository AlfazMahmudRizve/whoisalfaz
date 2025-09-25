import React from 'react';
import type { BlogPost } from '../../types';

// A simple component to render Markdown-like content as HTML
const MarkdownContent = ({ content }: { content: string }) => {
    // Split content into paragraphs and render them. This is a basic implementation.
    // It handles headings (##), and paragraphs.
    const elements = content.split('\n').map((line, index) => {
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.substring(3)}</h2>;
        }
        if (line.startsWith('*   ')) {
             return <li key={index} className="ml-6 list-disc">{line.substring(4)}</li>
        }
        if (line.trim() === '') {
            return null; // Skip empty lines
        }
        return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
    }).filter(Boolean); // Filter out nulls

    return <>{elements}</>;
};


interface BlogPostPageProps {
    post: BlogPost;
    onBack: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
    return (
        <article className="animate-fade-in-up">
            <div className="container mx-auto px-6 pt-32 pb-16">
                 <button 
                    onClick={onBack}
                    className="mb-8 inline-flex items-center gap-2 text-primary hover:underline"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Blog
                </button>

                <div className="max-w-4xl mx-auto">
                    <p className="text-primary font-semibold mb-2">{post.category}</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
                    
                    <img src={post.coverImage} alt={post.title} className="w-full rounded-lg shadow-lg my-8" />
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                        <MarkdownContent content={post.content} />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPostPage;