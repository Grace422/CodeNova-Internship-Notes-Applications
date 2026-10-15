import React, { useState, useEffect} from 'react'
import Note from './Note';

const API_URL = "http://localhost:5038/api/notesapp/editnotes"

export default function EditNote() {
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
      
    </div>
  )
}
