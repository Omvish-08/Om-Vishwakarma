
import { GoogleGenAI, Type } from "@google/genai";
import { PoemResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateNewYearMessage(name: string): Promise<PoemResponse> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a beautiful, romantic, and short New Year poem and a special message for my girlfriend named ${name}. 
      Include feelings of eternal love and excitement for the upcoming year together. 
      The tone should be deeply affectionate and poetic.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            poem: { type: Type.STRING, description: "A 4-6 line romantic poem." },
            message: { type: Type.STRING, description: "A sweet personal new year message." }
          },
          required: ["poem", "message"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return data as PoemResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      poem: "To Bhumi, my light, my shining star,\nI'm grateful for everything you are.\nIn this new year, and those yet to be,\nYou are the only world for me.",
      message: "Happy New Year, my love. Every second with you is a gift I cherish forever."
    };
  }
}
