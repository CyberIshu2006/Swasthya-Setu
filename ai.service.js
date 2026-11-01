import { GoogleGenAI } from "@google/genai";
import { PRESCRIPTION_PROMPT } from "./prescription.prompt.js";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function safeParseJson(text) {
  // Gemini is requested to return JSON. This fallback handles accidental fences.
  const cleaned = text.trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  return JSON.parse(cleaned);
}

export async function analyzePrescription(file) {
  if (!process.env.GEMINI_API_KEY ||
      process.env.GEMINI_API_KEY === "PASTE_YOUR_GEMINI_API_KEY_HERE") {
    const error = new Error("GEMINI_API_KEY is not configured. Add it to your .env file.");
    error.status = 500;
    throw error;
  }

  if (!file || !file.buffer || !ALLOWED_MIME_TYPES.has(file.mimetype)) {
    const error = new Error("Please upload a JPG, PNG, WEBP, or PDF prescription.");
    error.status = 400;
    throw error;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const contents = [
    {
      inlineData: {
        mimeType: file.mimetype,
        data: file.buffer.toString("base64"),
      },
    },
    { text: PRESCRIPTION_PROMPT },
  ];

  let response;
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await ai.models.generateContent({
        model,
        contents,
        config: { responseMimeType: "application/json" },
      });
      break;
    } catch (error) {
      lastError = error;
      const status = Number(error.status || error.code);

      // Retry transient errors only; don't retry invalid keys/model names.
      if (![429, 500, 502, 503, 504].includes(status) || attempt === 3) {
        break;
      }
      await sleep(1000 * (2 ** (attempt - 1)));
    }
  }

  if (!response) {
    const providerStatus = Number(lastError?.status || lastError?.code);
    console.error("Gemini request failed:", {
      status: providerStatus || "unknown",
      message: lastError?.message || "No provider message",
    });

    const error = new Error(
      providerStatus === 503
        ? "Gemini is temporarily unavailable or overloaded. Please retry shortly."
        : providerStatus === 429
          ? "Gemini API rate limit or quota reached. Check your Google AI Studio quota."
          : `Gemini request failed: ${lastError?.message || "Unknown provider error"}`
    );
    error.status = providerStatus === 429 || providerStatus === 503 ? providerStatus : 502;
    throw error;
  }

  if (!response.text) {
    const error = new Error("Gemini returned an empty response. Try a clearer file.");
    error.status = 502;
    throw error;
  }

  let extracted;
  try {
    extracted = safeParseJson(response.text);
  } catch {
    const error = new Error("Gemini returned unreadable JSON. Please retry.");
    error.status = 502;
    throw error;
  }

  return {
    ...extracted,
    requiresUserVerification: true,
    disclaimer:
      "AI extraction only, not medical advice. Verify all details with a qualified healthcare professional.",
  };
}
