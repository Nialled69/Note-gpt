// to handle saving the notes in supabase with same user-id but different notes.id (1:M relationship between public.profiles and public.notes)

"use client";

import { useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea";

export default function NoteForm({ userId }: { userId: string }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!text.trim()) {
      setLoading(false);
      return;
    }
    const now: Date = new Date();
    const { error } = await supabase.from("notes").insert({
      userid: userId,
      note: text,
      created_at : now.toISOString(),
      updated_at : now.toISOString()
    });

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      setText("");
    }

    setLoading(false);
  };

  return (
    <Card className="mb-4">
        <CardContent className="space-y-2 pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
                placeholder="Write your note here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Add Note"}
            </Button>
            </form>
        </CardContent>
    </Card>
  );
}
