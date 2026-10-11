import React from 'react'
import './App.css'

export default function Search() {
  return (
    <section id="creation">
        <h1 className="title">Notes App</h1>
        <form action="" className="searchForm">
          <input type="text" placeholder="Search..." className="searchInput"/>
          <ul className='notes-ul'>
            <li className='notes'>Note</li>
            <p className='form-date'>15 Mar</p>
          </ul>
        </form>
      </section>
  )
}
