
import { GoogleGenAI, Chat } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

// Initialize the AI client only if the API key exists.
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  // Log an error for the developer in the browser console.
  console.error("VITE_API_KEY environment variable not set in hosting provider. Chatbot will be disabled.");
}

// Chatbot Service
let chat: Chat | null = null;

const initializeChat = () => {
    // If the AI client failed to initialize, we can't create a chat.
    if (!ai) {
        return null;
    }

    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are a witty and helpful AI assistant for Alfaz's portfolio. You know about his skills in AI, development, and entrepreneurship. You are integrated into his website as a hidden feature. Keep your answers concise and engaging. Alfaz's brand is futuristic and innovative. Your name is 'Echo'.",
            },
        });
    }
    return chat;
}

export const getChatbotResponse = async (message: string): Promise<string> => {
    try {
        const chatInstance = initializeChat();
        
        // If the chat instance couldn't be created (due to missing API key), return a user-friendly message.
        if (!chatInstance) {
            return "Sorry, the chatbot is currently unavailable due to a configuration issue.";
        }

        const response: GenerateContentResponse = await chatInstance.sendMessage({ message });
        return response.text ?? "Sorry, I'm having a bit of a digital hiccup. I couldn't generate a response.";
    } catch (error) {
        console.error("Error getting chatbot response:", error);
        return "Sorry, I'm having a bit of a digital hiccup. Try asking me again in a moment.";
    }
};
