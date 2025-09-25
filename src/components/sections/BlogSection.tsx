import React from 'react';
import type { BlogPost } from '../../types';

const BlogCard = ({ post, onPostSelect }: { post: BlogPost; onPostSelect: (post: BlogPost) => void; }) => (
    <div 
        onClick={() => onPostSelect(post)}
        className="bg-white dark:bg-dark-card rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
    >
        <div className="overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-6">
            <p className="text-sm text-primary font-semibold mb-2">{post.category}</p>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{post.seoDescription}</p>
        </div>
    </div>
);

interface BlogSectionProps {
    posts: BlogPost[];
    isLoading: boolean;
    error: string | null;
    onPostSelect: (post: BlogPost) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts, isLoading, error, onPostSelect }) => {
    
    const renderContent = () => {
        if (isLoading) {
            return <p className="text-center col-span-full text-gray-500">Loading posts...</p>;
        }
        if (error) {
            return <p className="text-center col-span-full text-red-500">Error: {error}</p>;
        }
        if (posts.length === 0) {
            return <p className="text-center col-span-full text-gray-500">No blog posts yet. Check back soon!</p>;
        }
        return posts.map((post, index) => (
           <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <BlogCard post={post} onPostSelect={onPostSelect} />
           </div>
        ));
    };
    
    return (
        <section id="blog" className="py-20 md:py-32 bg-white dark:bg-dark-bg">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold">From the Blog</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Insights on AI, technology, and entrepreneurship.</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
