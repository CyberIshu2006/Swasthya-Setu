import { GoogleGenAI } from '@google/genai';
import { SAATHI_SYSTEM_INSTRUCTION } from './saathi.prompt.js';

const MAX_HISTORY = 12;
const MAX_TEXT_LENGTH = 4000;

export async function sendSaathiMessage({ message, history = [] }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'PASTE_YOUR_GEMINI_API_KEY_HERE') {
    const error = new Error('Saathi is not configured yet. The service owner must add GEMINI_API_KEY to the backend environment.');
    error.status = 503;
    throw error;
  }
  if (typeof message !== 'string' || !message.trim() || message.length > MAX_TEXT_LENGTH) {
    const error = new Error(`Message must contain 1–${MAX_TEXT_LENGTH} characters.`);
    error.status = 400;
    throw error;
  }

  const safeHistory = Array.isArray(history)
    ? history.slice(-MAX_HISTORY).filter((item) =>
        item && ['user', 'model'].includes(item.role) &&
        typeof item.text === 'string' && item.text.trim() && item.text.length <= MAX_TEXT_LENGTH
      ).map((item) => ({ role: item.role, parts: [{ text: item.text }] }))
    : [];

  const ai = new GoogleGenAI({ apiKey });
  const model = process.env.GEMINI_CHAT_MODEL || process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [...safeHistory, { role: 'user', parts: [{ text: message.trim() }] }],
      config: {
        systemInstruction: SAATHI_SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 700,
      },
    });
    const reply = response.text?.trim();
    if (!reply) {
      const error = new Error('Saathi did not return a response. Please try again.');
      error.status = 502;
      throw error;
    }
    return {
      reply,
      assistant: 'Saathi',
      disclaimer: 'Saathi provides general information, not diagnosis or treatment. For medical concerns, consult a qualified healthcare professional.',
    };
  } catch (cause) {
    if (cause.status) throw cause;
    const status = Number(cause.status || cause.code);
    const error = new Error(status === 429
      ? 'Saathi has reached the AI provider quota. Please try again later.'
      : status === 503
        ? 'Saathi is temporarily unavailable. Please try again shortly.'
        : 'Saathi could not answer right now. Please try again later.');
    error.status = status === 429 ? 429 : status === 503 ? 503 : 502;
    throw error;
  }
}
