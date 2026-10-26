import React, { useState } from 'react'
import './App.css'

const API_URL = "https://codenova-internship-notes-applications.onrender.com/api/notesapp/searchnotes";

export default function Search({ onResults, onReset }) {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setQuery(event.target.value);
  }

  async function handleSearch(event) {
    event.preventDefault();
    if (!query.trim()) {
      onReset();
      setMessage("");
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(query.trim())}`
      )
      if (!response.ok) {
        throw new Error("Failed to update note")
      }

      const results = await response.json();
      onResults(results);
      setMessage(results.length ? `${results.length} note found` : "No matching note found")
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <section id="creation">
      <form action="" className="search-form" onSubmit={handleSearch}>
        <input type="text" placeholder="Search..." className="searchInput" onChange={handleChange} value={query} />
        <button type="submit">Search</button>
      </form>
      {message && <p className="message">{message}</p>}
    </section>
  )
}
