import React, { useState } from 'react'
import './App.css'
import AddNote from './AddNote'
import Note from './Note'

const API = "http://localhost:5000/api/notesapp/searchnotes";

export default function Search({OnResults, onReset}) {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(event){
        setQuery(event.target.value);
    }

  async function handleSearch(event){
    event.preventDefault();
    if(!query.trim()){
      onReset();
      setMessage();
      return;
    }
    try{
      const response = await fetch(
        `{API_URL}/${encodedURIComponent(query.id)}`
      )
      if(!response.ok){
        throw new Error("Failed to update note")
      }

      const results = await response.json();
      OnResults(results);
      setMessage(results.lenght ? `${results.lenght} note not found` : "No matching note found")
    }catch(error){
      setMessage(error.message)
    }
  }
  function clearSearch() {
    setQuery("");
    setMessage("");
    onReset();
  }

  return (
    <section id="creation">
        <h1 className="title">Notes App</h1>
        <form action="" className="searchForm" onSubmit={handleSearch}>
            <AddNote />
          <input type="text" placeholder="Search..." className="searchInput" onChange={handleChange}/>
          <button type="submit">Search</button>
            {/* <Note /> */}
        </form>
        {message && <p className="message">{message}</p>}
      </section>
  )
}
