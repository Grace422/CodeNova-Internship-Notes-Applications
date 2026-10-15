import React from 'react'
import { SquarePen, Trash } from 'lucide-react'
import './App.css'
import DeleteNote from './DeleteNote'
const API_URL = "http://localhost:5038/api/notesapp/editnotes"

export default function Note({notes, onDelete}) {
    let [title, setTitle] = useState(Note.title || "");
    let [description, setDescription] = useState(Note.description || "");
    let [message, setMessage] = useState("");
    
    async function handleSubmit(event){
        event.preventDefault()
        if(!title.trim() || !description.trim()){
            setMessage("Title and description are required")
            return;
        }
        try{
            const fromData = new formData();
            formData.append("title", title.trim());
            formData.append("description", description.trim());
    
            const response = await fetch(
                `{API_URL}/${encodedURIComponent(note.id)}`, {
                method: "PUT",
                body: "formData"
            })
            if(!response.ok){
                throw new Error("Failed to update note")
            }
            await onUpdated();
            } catch(error){
                setMessage(error.message)
            }
        }
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <ul className='notes-ul'>
                <li className='notes'>Note</li>
                <p className='form-date'>15 Mar</p>
                <div className='note-icons'>
                    <SquarePen size={20} onClick={() => onEdit(note)}/>
                    <Trash size={20} noteId={note.id} onClick={() => onDelete={onDelete}}/>
                </div>
            </ul>
        </div>
      ))}
    </div>
  )
}
