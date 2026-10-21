import React, { useState } from 'react'
import { SquarePen, Trash } from 'lucide-react'
import './App.css'

const API_URL = "http://localhost:5000/api/notesapp"

export default function Note({ notes, onUpdated, onDeleted }) {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [message, setMessage] = useState("");
  let [editId, setEditId] = useState(null);

  function startEditing(note) {
    setEditId(note.id);
    setTitle(note.title || "");
    setDescription(note.description || "");
    setMessage("")
  }

  
async function saveEdit(id) {
    const updatedTitle = title.trim();
    const updatedDescription = description.trim();

    if (!updatedTitle || !updatedDescription) {
        setMessage("Title and description are required.");
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}/editnote/${encodeURIComponent(id)}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: updatedTitle,
                    description: updatedDescription,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to update note.");
        }

        setEditId(null);
        setMessage("Note updated successfully.");

        await onUpdated?.();
    } catch (error) {
        setMessage(error.message || "Unable to update note.");
    }
}


  async function deleteNote(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/deletenote/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(data.error || `Update failed: ${response.status}`)
      }

      setMessage("Note deleted suceessfully")
      onDeleted?.();
    } catch (error) {
      setMessage(error.message || "Unable to update note.")
    }

  }
  return (
    <section className="panel">
      {notes.length === 0 ? (
        <p>No notes to display.</p>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <article className="note-card" key={note.id}>
              {editId === note.id ? (
                <>
                  <input
                    value={title}
                    onChange={(event) =>
                      setTitle(event.target.value)
                    }
                    placeholder="Note title"
                  />

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    placeholder="Note description"
                    rows="4"
                  />

                  <div className="note-actions">
                    <button
                      type="button"
                      onClick={() => {
                        saveEdit(note.id)
                      }}
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{note.title || "Untitled Note"}</h3>
                  <p>{note.description}</p>

                  <div className="note-actions">
                    <button
                      type="button"
                      onClick={() => startEditing(note)}
                      aria-label="Edit note"
                      title="Edit note"
                    >
                      <SquarePen size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteNote(note.id)}
                      aria-label="Delete note"
                      title="Delete note"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}