import React from 'react'
import './App.css'
import AddNote from './frontend/AddNote'
import { SquarePen, Trash } from 'lucide-react'

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
                <SquarePen size={20}/>
                <Trash size={20} />
            </div>
          </ul>
        </form>
      </section>
  )
}
