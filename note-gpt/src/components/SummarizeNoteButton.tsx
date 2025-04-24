// this page handles the AI summarization of notes with Deepseek AI.
// Server-side logic of this is present in src/app/api/summarize/route.ts (post request handling)

"use client";

import axios from 'axios'; 
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface SummarizeNoteButtonProps {
  note: string;
}

export default function SummarizeNoteButton({ note }: SummarizeNoteButtonProps) {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const loadingTexts = [  // animation illusion lol
    "Generating summary",
    "Generating summary.",
    "Generating summary..",
    "Generating summary..."
  ];

  useEffect(() => {
    if (open) {
      setSummary(null);
    }
  }, [open, note]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
  
    if (loading) {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
      }, 400);
    } else {
      setLoadingTextIndex(0);
    }
  
    return () => clearInterval(interval);
  }, [loading, loadingTexts.length]);

  const handleSummarize = async () => {
    setLoading(true);
    try {
        const response = await axios.post("/api/summarize", { note });  // server-side calling of the AI to initiate summarizing the note text
        setSummary(response.data.summary);
      } catch (error: unknown) {
        if (typeof error === 'object' && error !== null) {
          const err = error as { response?: { data?: unknown }, message?: string };
          console.error("Summarization error:", err.response?.data || err.message || error);
        } else {
          console.error("Summarization error:", error);
        }
      }
       finally {
        setLoading(false);
      }
  };

  return (  // shadcn UI components used - dialogbox, dialogcontent, etc 
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <SparklesIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Summarized Note</DialogTitle>
          <DialogDescription>
            AI-generated summarization of your note using DeepSeek
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {loading ? (
            <p className="text-sm text-muted-foreground">
              {loadingTexts[loadingTextIndex]}
            </p>
          ) : summary ? (
            <div className="flex flex-col">
              <p className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-100 mb-4">
                {summary}
              </p>
              <Button
                variant="secondary"
                onClick={handleSummarize}
                className="mt-4 ml-auto flex items-center gap-2"
              >
                <ArrowPathIcon className="h-4 w-4" />
                Regenerate Summary
              </Button>
            </div>
          ) : (
            <Button onClick={handleSummarize}>Generate Summary</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
