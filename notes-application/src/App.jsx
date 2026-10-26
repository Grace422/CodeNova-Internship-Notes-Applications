import { useState, useEffect } from 'react'
import './App.css'

import Search from './Search'
import AddNote from './AddNote'
import Note from './Note'

const API_URL = "http://localhost:5000/api/notesapp";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchNotes() {
    try {
      setError("");

      const response = await fetch(`${API_URL}/getnotes`);
      if (!response.ok) {
        throw new Error("Failed to fetch notes")
      }

      const data = await response.json();
      setNotes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <section id="creation">
        <h1 className='title'>Notes App</h1>

      <AddNote onAdded={fetchNotes} />

      <Search onResults={setNotes} onReset={fetchNotes} />

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <Note
          notes={notes}
          onUpdated={fetchNotes}
          onDeleted={fetchNotes}
        />
      )}
    </section>
  )
}

export default App;
