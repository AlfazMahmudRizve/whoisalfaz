import React, { useState } from 'react';

const ContactSection: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thank you for subscribing, ${email}!`);
        setEmail('');
    };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50 dark:bg-dark-card relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Have a deal, an idea, or just want to say hi? Let's connect.</p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-white dark:bg-dark-bg/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-2xl font-bold mb-4">Contact Form</h3>
                    <form name="contact" method="POST">
                        <input type="hidden" name="form-name" value="contact" />
                        <div className="mb-4">
                            <input type="text" name="name" placeholder="Your Name" className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-primary" required />
                        </div>
                        <div className="mb-4">
                            <input type="email" name="email" placeholder="Your Email" className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-primary" required />
                        </div>
                        <div className="mb-4">
                            <textarea name="message" placeholder="Your Message" rows={4} className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-primary" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-8 rounded-full hover:scale-105 transform transition-transform duration-300">
                            Send Message
                        </button>
                    </form>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <h3 className="text-2xl font-bold mb-4">Or Reach Out Directly</h3>
                    <a href="https://wa.me/8801991210347" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-primary/10 text-primary p-4 rounded-lg mb-6 w-full text-center hover:bg-primary/20 transition-colors font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.505 1.905 6.385l-1.291 4.725 4.865-1.275zM9.356 8.014c-.15-.389-.302-.389-.448-.395-.146-.006-.316-.006-.486-.006s-.442.062-.668.312c-.225.25-.865.85-.865 2.078s.889 2.413 1.013 2.583c.124.17 1.76 2.822 4.27 3.78s2.008.831 2.253.774c.246-.057.778-.313.888-.621.11-.308.11-.571.077-.621s-.155-.17-.325-.297c-.17-.127-1.011-.497-1.168-.567s-.269-.104-.383.104c-.114.208-.442.566-.541.679s-.18.127-.325.042c-.146-.084-.616-.224-1.173-.718-.434-.38-.724-.858-.813-.999s-.09-.224-.015-.354c.075-.13.166-.217.247-.297s.124-.127.187-.217c.063-.09.031-.17-.015-.276s-.383-.911-.525-1.249z"></path></svg>
                        Chat on WhatsApp
                    </a>
                    
                    <h4 className="text-xl font-bold mb-4">Book a Meeting</h4>
                    <a href="mailto:a.m.rizve3905@gmail.com?subject=Meeting Request&body=Hi Alfaz, I'd like to book a meeting with you. Here are some times that work for me:" className="w-full text-center block bg-secondary/10 text-secondary font-bold py-3 px-8 rounded-full hover:bg-secondary/20 transform transition-colors duration-300 mb-6">
                        Schedule a Call
                    </a>

                    <h4 className="text-xl font-bold mb-4">Subscribe to my Newsletter</h4>
                    <form onSubmit={handleSubscribe} className="flex gap-2">
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="flex-grow w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                        <button type="submit" className="bg-primary text-dark-bg p-3 rounded-lg font-bold hover:opacity-80 transition-opacity">&rarr;</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
};

export default ContactSection;