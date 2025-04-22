const { PencilIcon } = require('@heroicons/react/24/outline');
import { useState } from 'react';

interface EditNoteButtonProps {
  noteId: string;
  initialNote: string;
  onSave: (id: string, newNote: string) => void;
}

const EditNoteButton = ({ noteId, initialNote, onSave }: EditNoteButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(initialNote);

  const handleSave = () => {
    onSave(noteId, editedNote);
    setIsEditing(false); 
  };

  return (
    <div className="relative">
      {/* Pencil Icon */}
      <button
        className="absolute bottom-2 right-2 p-2 bg-gray-100 rounded-full text-gray-600 hover:text-blue-600"
        onClick={() => setIsEditing(true)}
      >
        <PencilIcon className="h-5 w-5" />
      </button>

      {isEditing && (
        <div className="absolute bottom-14 right-2 bg-white p-6 rounded-lg shadow-lg w-80">
            <textarea
            className="w-full p-3 border border-gray-300 rounded-md"
            value={editedNote}
            onChange={(e) => setEditedNote(e.target.value)}
            rows={5}  // Adjusts the height of the textarea
            />
            <div className="flex justify-end space-x-3 mt-4">
            <button className="px-6 py-3 bg-gray-200 rounded-md" onClick={() => setIsEditing(false)}>
                Cancel
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md" onClick={handleSave}>
                Save
            </button>
            </div>
        </div>
        )}
    </div>
  );
};

export default EditNoteButton;