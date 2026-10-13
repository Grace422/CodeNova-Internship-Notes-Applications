import React, {useState} from 'react'

export default function AddNote() {
    let [value, setValue] = useState("");
    function handleChange(event){
        setValue(event.target.value);
    }
    function handleSubmit(event){
        event.preventDefault();
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
