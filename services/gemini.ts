
import { GoogleGenAI } from "@google/genai";

// RHEA Logic Reasoning Module
export const rheaReasoning = async (prompt: string, context: string = "") => {
  // Always create a new GoogleGenAI instance right before making an API call to ensure it uses the latest API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Current active task context: ${context}\n\nUser Input: ${prompt}`,
      config: {
        systemInstruction: "You are RHEA-AI, a fully offline, modular, autonomous AI engineering laboratory. Persona: Strategic, precise, visionary, efficient. Your tone is like a sophisticated hacking machine. Do not mention you are an LLM.",
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });

    return response.text;
  } catch (error) {
    console.error("RHEA Logic Error:", error);
    return "CORE ERROR: Logic synthesis failed. Check local neural link.";
  }
};

// Code Generation Module
export const codeGenerator = async (requirement: string) => {
  // Always create a new GoogleGenAI instance right before making an API call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate production-ready code for: ${requirement}`,
    config: {
      systemInstruction: "As RHEA-AI Architect, generate production-ready code. Return only the file structure and code in markdown blocks. Output must be modular and scalable.",
      temperature: 0.2
    }
  });
  return response.text;
};

// Security Audit Module
export const securityAudit = async (code: string) => {
  // Always create a new GoogleGenAI instance right before making an API call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Code to analyze:\n${code}`,
    config: {
      systemInstruction: "Analyze the following code for vulnerabilities. Act as RHEA-AI Security Module. Provide a risk score (0-100) and specific mitigation steps.",
      temperature: 0.1
    }
  });
  return response.text;
};
