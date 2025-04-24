// to update note with shadcn update dialog box when clicked on pencil icon

import { PencilIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogFooter} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface EditNoteButtonProps {
  noteId: string;
  initialNote: string;
  onSave: (id: string, newNote: string) => void;
}

const EditNoteButton = ({ noteId, initialNote, onSave }: EditNoteButtonProps) => {
  const [open, setOpen] = useState(false);
  const [editedNote, setEditedNote] = useState(initialNote);

  const handleSave = () => {
    onSave(noteId, editedNote);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-blue-600"
        >
          <PencilIcon className="h-5 w-5"/>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit your note</DialogTitle>
        </DialogHeader>
        <Textarea
          value={editedNote}
          onChange={(e) => setEditedNote(e.target.value)}
          rows={6}
          className="mt-2"
        />
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditNoteButton;