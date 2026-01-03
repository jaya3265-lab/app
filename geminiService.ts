
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

// Accessing the key provided by the Vite define config
const API_KEY = process.env.API_KEY;

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  if (!API_KEY) throw new Error("API_KEY is not defined in environment variables");
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 5 multiple-choice questions for NCC cadets on the topic: "${topic}". 
               Target audience: Cadets preparing for Certificate B and C exams in Kerala. 
               The tone should be professional and factual.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
};

export const explainTopic = async (topicTitle: string, userQuery?: string): Promise<string> => {
  if (!API_KEY) throw new Error("API_KEY is not defined in environment variables");
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = userQuery 
    ? `Explain the following query about "${topicTitle}" for an NCC cadet: ${userQuery}`
    : `Give a detailed but concise summary of the NCC topic "${topicTitle}" for a cadet studying for Certificate exams. Use bullet points where appropriate.`;
    
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });

  return response.text || "I couldn't generate an explanation at this time.";
};
