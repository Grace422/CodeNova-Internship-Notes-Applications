import React from 'react'

export default function AddNote() {
  return (
    <div>
        <form className="addForm">
            <input type="text" className="addInput" placeholder="Type in a task" />
            <button type="submit" className="add-btn">Add Task</button>
        </form>
    </div>
  )
}
