import { GoogleGenAI, Type } from "@google/genai";
import { UserData, AIResponse } from "../types";

export const generateCareerRoadmap = async (userData: UserData): Promise<AIResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please set REACT_APP_GEMINI_API_KEY in your environment.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Act as an expert career counselor and life coach for students in India.
    User Profile:
    - Name: ${userData.name}
    - Current Status: ${userData.type}
    - Interests/Skills: ${userData.skills}
    - Ultimate Goal: ${userData.goal}

    Based on this, generate a highly personalized career roadmap, a weekly schedule, and a motivational quote.
    Include specific resources (websites, courses, exams) relevant to India (e.g., NPTEL, Swayam, JEE, GATE, etc.) where applicable, as well as global resources (Coursera, Udemy, etc.).
    
    The response must be in valid JSON format matching the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            motivationalQuote: { type: Type.STRING, description: "A powerful, personalized quote for the user." },
            careerSummary: { type: Type.STRING, description: "A brief analysis of their profile and potential." },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Step title (e.g., 'Learn Python Basics')" },
                  description: { type: Type.STRING, description: "Detailed action item." },
                  timeline: { type: Type.STRING, description: "Estimated time to complete (e.g., '2 Months')" },
                  resources: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING, description: "Name of resource (e.g., 'CS50 on YouTube')" },
                        url: { type: Type.STRING, description: "URL to the resource" }
                      }
                    }
                  }
                }
              }
            },
            weeklySchedule: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING, description: "Day of the week" },
                  task: { type: Type.STRING, description: "Specific activity to do" },
                  focusArea: { type: Type.STRING, description: "Category of task (e.g., 'Learning', 'Practice')" }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};