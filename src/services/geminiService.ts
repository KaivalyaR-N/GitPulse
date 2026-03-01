import { GoogleGenAI } from "@google/genai";
import { GitHubUser, GitHubRepo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const geminiService = {
  async analyzeProfile(user: GitHubUser, repos: GitHubRepo[]) {
    const repoSummary = repos
      .slice(0, 10)
      .map(r => `${r.name}: ${r.description || 'No description'} (${r.language})`)
      .join('\n');

    const prompt = `
      Analyze this GitHub profile and provide a professional "Developer Persona" summary.
      
      User: ${user.name || user.login}
      Bio: ${user.bio || 'No bio'}
      Location: ${user.location || 'Unknown'}
      Top Repositories:
      ${repoSummary}

      Return a JSON object with:
      - title: A creative professional title (e.g., "The Full-Stack Architect")
      - summary: A 2-3 sentence summary of their coding style and focus.
      - strengths: Array of 3 key technical strengths.
      - suggestion: A friendly suggestion for their profile or portfolio.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return null;
    }
  }
};
