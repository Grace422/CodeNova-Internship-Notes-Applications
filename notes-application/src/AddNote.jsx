import React, {useState} from 'react'

const API_URL = "https://codenova-internship-notes-applications.onrender.com/api/notesapp/addnote";

export default function AddNote({onAdded}) {
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [message, setMessage] = useState("");


    function handleChange(event){
        setTitle(event.target.value);
    }

    function manageChange(event){
        setDescription(event.target.value);
    }

    async function handleSubmit(event){
        event.preventDefault();
        if(!title.trim() || !description.trim()){
            setMessage("Title and description are required")
            return;
        }
        try{
            const formData = new FormData();
            formData.append("title", title.trim());
            formData.append("newNotes", description.trim())
            
            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            if(!response.ok){
                throw new Error("Failed to add note")
            }

            setTitle("")
            setDescription("")
            setMessage("Note added successfully")
            await onAdded?.();
        }catch(error){
            setMessage(error.message || "Unable to add note")
        }
    }
    
  return (
    <div>
        <form className="add-note-form" onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={title} className="addInput" placeholder="Give a title to your note" required/>
            <textarea placeholder='Describe your note here' value={description} onChange={manageChange} required/>
            <button type="submit" className="add-btn">Add Task</button>
        </form>
        {message && <p>{message}</p>}
    </div>
  )
}
