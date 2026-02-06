
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateJavaProject = async (prompt: string): Promise<ProjectData> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a complete Java Mini Project for a Library Management System based on these requirements: ${prompt}. 
    Provide the output as a structured JSON object containing:
    - projectName: A string.
    - files: An array of objects with 'name' (filename including .java) and 'content' (full source code with comments).
    - summary: A brief technical summary of the project architecture.
    - vivaTopics: A list of 5 possible Viva (oral exam) questions based on the code.
    Ensure code follows clean coding standards, proper OOP concepts (encapsulation, abstraction), and robust error handling.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projectName: { type: Type.STRING },
          summary: { type: Type.STRING },
          files: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                content: { type: Type.STRING }
              },
              required: ["name", "content"]
            }
          },
          vivaTopics: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["projectName", "files", "summary", "vivaTopics"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const getVivaAnswer = async (question: string, context: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are an expert Java professor conducting a Viva session for a student's Library Management System project.
    
    Student's Project Context:
    ${context}
    
    Question from student/examiner:
    ${question}
    
    Provide a clear, concise, and professional explanation suitable for a college viva. Focus on the 'why' behind implementation choices (e.g., why ArrayList over Array, why Encapsulation).`,
  });

  return response.text || "I'm sorry, I couldn't process that explanation.";
};
