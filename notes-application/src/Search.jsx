import React from 'react'
import './App.css'
import AddNote from './AddNote'
import deleteImage from './assets/delete.png'
import editImage from './assets/edit-text.png'

export default function Search() {
  return (
    <section id="creation">
        <h1 className="title">Notes App</h1>
        <form action="" className="searchForm">
            <AddNote />
          <input type="text" placeholder="Search..." className="searchInput"/>
          <ul className='notes-ul'>
            <li className='notes'>Note</li>
            <p className='form-date'>15 Mar</p>
            <div className='note-icons'>
                <img src={editImage} alt="icon" className='edit'/>
                <img src={deleteImage} alt="icon" className='delete'/>
            </div>
          </ul>
        </form>
      </section>
  )
}
