// Server side logic to handle the post request send from client side to summarize the notes with DeepSeek R1 AI
// used DeepSeek R! free API from https://openrouter.ai

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type APIError = {
  response?: {
    status: number;
  };
};

function isAPIError(error: unknown): error is APIError {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { status?: unknown } }).response?.status === "number"
  );
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "",
    "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "",
  },
});

export async function POST(req: NextRequest) {
  try {
    const { note } = await req.json();

    if (!note) {
      return NextResponse.json({ error: "Note is required." }, { status: 400 });
    }
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "Missing OpenRouter API key." }, { status: 500 });
    }

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "system", // system prompt
          content: "You are a helpful assistant that summarizes user notes concisely. Just respond with the short summary output, nothing else.",
        },
        {
          role: "user", // pre-fized user prompt
          content: `Please summarize this note. Just give me the body of the summary. Here's the note -> ${note}`,
        },
      ],
    });

    const summary = completion.choices?.[0]?.message?.content;

    return NextResponse.json({ summary });

  } catch (error: unknown) {
    if (isAPIError(error)) {
      const status = error.response!.status;
  
      if (status === 401 || status === 403) {
        return NextResponse.json(
          { error: "Invalid or unauthorized OpenRouter API key." },
          { status }
        );
      }
    }
  
    console.error("Summarization error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary." },
      { status: 500 }
    );
  }    
}
