import React, {useState, useEffect} from 'react'

export default function AddNote() {
    let [value, setValue] = useState("");
    let [notes, setNotes] = useState([]);
    const API_URL = "http://localhost:5038/api/notesapp/addnote";


    function handleChange(event){
        setValue(event.target.value);
    }
    function handleSubmit(event){
        event.preventDefault();
        const refreshNotes = async () => {
         try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setNotes(data);
        } catch (error) {
            console.error("Error loading notes:", error);
        }
    };
    useEffect(() => {
        refreshNotes();
    }, []);
        setValue('');
    }
    
  return (
    <div>
        <form className="addForm" onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={value} className="addInput" placeholder="Type in a task" />
            <button type="submit" className="add-btn">Add Task</button>
        </form>
    </div>
  )
}
