"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import EditNoteButton from './EditNoteButton'

interface Note {
  id: string;
  note: string;
  created_at: string;
}

export default function NoteList({ userId }: { userId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const supabase = createClient();
  const handleSaveNote = async (id: string, newNote: string) => {
    try {
      // Call your update API or database function to save the updated note
      // Example with Supabase
      const now:Date = new Date();
      const { error } = await supabase
        .from('notes')
        .update({ note: newNote, updated_at:now.toISOString() })
        .eq('id', id);

      if (error) {
        console.log('Error updating note:', error);
      } else {
        // Update the state after saving
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === id ? { ...note, note: newNote } : note
          )
        );
      }
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };
  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("userid", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch error:", error.message);
      } else {
        setNotes(data || []);
      }
    };

    fetchNotes();
    const notesChannel = supabase
      .channel("notes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
          filter: `userid=eq.${userId}`,
        },
        (payload) => {

          const payloadNew = payload.new as {
            id: string;
            note: string;
            created_at: string;
          };
          const payloadOld = payload.old as {
            id: string;
          };

          if (payload.eventType === "INSERT") {
            console.log("Realtime INSERT payload:", payloadNew);
            const newNote: Note = {
              id: payloadNew.id,
              note: payloadNew.note,
              created_at: payloadNew.created_at,
            };
            setNotes((prevNotes) => [newNote, ...prevNotes]);
          }
    
          else if (payload.eventType === "UPDATE") {
            const updatedNote: Note = {
              id: payloadNew.id,
              note: payloadNew.note,
              created_at: payloadNew.created_at,
            };
            setNotes((prevNotes) =>
              prevNotes.map((note) =>
                note.id === updatedNote.id ? updatedNote : note
              )
            );
          }
    
          else if (payload.eventType === "DELETE") {
            setNotes((prevNotes) =>
              prevNotes.filter((note) => note.id !== payloadOld.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notesChannel);
    };
  }, [supabase, userId]);

  return (
    <div className="space-y-4 grid gap-4">
      {notes.map((note) => (
        <Card key={note.id} className="relative">
          <CardContent className="space-y-1 pt-2">
            <p className="whitespace-pre-wrap pb-4">{note.note || 'GGWP'}</p>
            <p className="text-xs text-gray-500 mt-4">
                Created on {(new Date(note.created_at).toLocaleTimeString([], { weekday: 'long', year: 'numeric', month: 'short',day: 'numeric',hour: '2-digit', minute: '2-digit', hour12: true }))}
            </p>
          </CardContent>

          {/* Add the EditNoteButton here */}
          <EditNoteButton
            noteId={note.id}
            initialNote={note.note || 'GGWP'}
            onSave={handleSaveNote}
          />
        </Card>
      ))}

      {notes.length === 0 && <p>No notes yet. Add your first one!</p>}
    </div>
  );
}
