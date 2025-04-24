// to handle all of user notes in real time, updation, deletion, summarization, everything.
// implemented cool yet minimalist and simplistic design with shadcn-ui

"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import EditNoteButton from './EditNoteButton'
import DeleteNoteButton from './DeleteNoteButton';
import SummarizeNoteButton from './SummarizeNoteButton';

interface Note {
  id: string;
  note: string;
  created_at: string;
}

export default function NoteList({ userId }: { userId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const supabase = createClient();
  const handleSaveNote = async (id: string, newNote: string) => {  //note updation logic
    try {
      const now:Date = new Date();
      const { error } = await supabase
        .from('notes')
        .update({ note: newNote, updated_at:now.toISOString() })  
        .eq('id', id);

      if (error) {
        console.log('Error updating note:', error);
      } else {
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
  const handleDeleteNote = async (id: string) => {  //note deletion logic
    const { error } = await supabase.from("notes").delete().eq("id", id);
  
    if (error) {
      console.error("Error deleting note:", error.message);
    } else {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  };
  useEffect(() => {
    const fetchNotes = async () => { //fetchin all notes based on userid
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
    const notesChannel = supabase   //realtime updates on note-list
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
          // const payloadOld = payload.old as {
          //   id: string;
          // };

          if (payload.eventType === "INSERT") {
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
            const nowUpdatedNote: Note = {
              id: payloadNew.id,
              note: payloadNew.note,
              created_at: payloadNew.created_at,
            };
            setNotes((prevNotes) =>
              prevNotes.map((note) =>
                note.id === nowUpdatedNote.id ? nowUpdatedNote : note
              )
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
          <CardContent className="space-y-1 pt-2 pr-20">
            <p className="whitespace-pre-wrap pb-4">{note.note || 'GGWP'}</p>
            <p className="text-xs text-gray-500 mt-4">
                Created on {(new Date(note.created_at).toLocaleTimeString([], { weekday: 'long', year: 'numeric', month: 'short',day: 'numeric'}))}
            </p>
          </CardContent>

          <div className="absolute top-2 right-2 flex flex-col items-center gap-2">
            <SummarizeNoteButton note={note.note} />
            <EditNoteButton
              noteId={note.id}
              initialNote={note.note || 'GGWP'}
              onSave={handleSaveNote}
            />
            <DeleteNoteButton noteId={note.id} onDelete={handleDeleteNote} />
          </div>
        </Card>
      ))}

      {notes.length === 0 && <p>No notes yet. Add your first one!</p>}
    </div>
  );
}
