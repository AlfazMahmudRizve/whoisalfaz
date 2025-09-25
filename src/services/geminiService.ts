import { GoogleGenAI, Chat } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("VITE_API_KEY environment variable not set in your hosting provider.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Chatbot Service
let chat: Chat | null = null;

const initializeChat = () => {
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
        const response: GenerateContentResponse = await chatInstance.sendMessage({ message });
        return response.text ?? "Sorry, I'm having a bit of a digital hiccup. I couldn't generate a response.";
    } catch (error) {
        console.error("Error getting chatbot response:", error);
        return "Sorry, I'm having a bit of a digital hiccup. Try asking me again in a moment.";
    }
};